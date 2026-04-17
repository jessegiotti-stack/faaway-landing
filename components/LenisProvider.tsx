"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

/**
 * Lenis 1.1.9 em pass-through. Amortização sutil do wheel.
 * Sem snap, sem scroll-jacking. Cliente-side apenas.
 *
 * FASE D — a11y:
 *  - Quando prefers-reduced-motion estiver ativo, NÃO instancia Lenis.
 *    O scroll nativo do navegador assume — sem amortização adicional,
 *    sem rAF rodando para nada, sem surpresa cinemática.
 *
 * FASE E — interceptação de âncora:
 *  - A instância do Lenis é exposta via LenisContext.
 *  - Consumidores (ex: UnderlineLink) usam useLenis() para chamar
 *    lenis.scrollTo(target) em links de âncora — evita briga entre
 *    scroll nativo do browser e rAF do Lenis.
 *  - Quando prefers-reduced-motion está ativo, o contexto devolve null
 *    e os consumidores caem no fallback nativo (href âncora comum).
 */

const LenisContext = createContext<Lenis | null>(null);

/** Hook de consumo. Devolve a instância do Lenis ou null (reduced-motion / SSR). */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reduce) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      smoothWheel: true,
    });
    setLenis(instance);

    let rafId: number;
    function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, [reduce]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
