"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * MotionRoot — wrapper Framer Motion para a aplicação inteira.
 *
 * FASE D — acessibilidade:
 *  - reducedMotion="user" lê prefers-reduced-motion do SO/navegador.
 *    Quando ativo, Framer Motion descarta automaticamente animações
 *    de transform (y, x, scale, rotate) e mantém APENAS opacity.
 *    Resultado: scroll reveals, line stagger e card hovers via Framer
 *    viram fade puros, sem movimento.
 *  - Não afeta CSS transitions (gerenciadas em globals.css via @media)
 *    nem useScroll/useTransform (Parallax, Marquee, Hero — tratados
 *    individualmente via useReducedMotion).
 */
export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
