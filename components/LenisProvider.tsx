"use client";

import { useEffect } from "react";
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
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reduce]);

  return <>{children}</>;
}
