"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Hook de reveal por scroll com fallback para deep-link.
 *
 * Resolve o caso onde o usuário abre /#contato direto (ou qualquer
 * âncora no meio/fim da página). Seções acima do viewport inicial
 * nunca intersectam a janela central de `whileInView` (margin
 * `-20% 0px -20% 0px`) — ficam presas em `hidden` (opacity 0 + y).
 * Ao rolar para cima, o usuário vê seções vazias.
 *
 * Estratégia:
 *  - No primeiro render, mede `getBoundingClientRect()`.
 *  - Se `rect.top < window.innerHeight`, a seção JÁ está em/acima do
 *    viewport — força `show` sem esperar IntersectionObserver.
 *  - Caso contrário, segue o comportamento padrão via `useInView`.
 *
 * Uso:
 *   const reveal = useScrollReveal();
 *   <motion.div {...reveal} variants={revealContainer}>...
 *
 * O spread aplica `ref`, `initial="hidden"` e `animate` corretos.
 * Props restantes (className, variants, onMouseEnter, style etc.)
 * continuam livres no motion.div.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  // Mesma margem do revealViewport em lib/motion.ts — useInView tipa
  // `margin` como template literal estrito, então inline aqui para
  // satisfazer o type-checker sem cast.
  const inView = useInView(ref, {
    once: true,
    margin: "-20% 0px -20% 0px",
  });
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Seção está em ou acima do viewport no mount → revelar imediatamente.
    if (rect.top < window.innerHeight) {
      setForceShow(true);
    }
  }, []);

  return {
    ref,
    initial: "hidden" as const,
    animate: (forceShow || inView ? "show" : "hidden") as "show" | "hidden",
  };
}
