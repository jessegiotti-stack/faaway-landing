"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Parallax editorial sutil — vertical only.
 *
 * FASE D — Regime 2:
 *  - Wrapper recebe ref para useScroll. Translado vertical do filho
 *    conforme o scroll passa pela viewport.
 *  - Faixa: progress 0 (entra na viewport) → +intensity%
 *           progress 1 (sai da viewport) → -intensity%
 *  - Headroom interno: o filho é over-renderizado em (100 + intensity*2)%
 *    e ancorado em top: -intensity% para que a translação NUNCA exponha
 *    o background do frame externo.
 *  - Vertical only. Sem scale, sem rotation, sem horizontal.
 *  - will-change: transform (preventivo para repaint barato).
 *
 * Uso esperado:
 *   <div className="relative aspect-[4/5] overflow-hidden bg-bg-deep">
 *     <Parallax intensity={8}>
 *       <Image fill ... />
 *     </Parallax>
 *   </div>
 *
 * O frame externo PRECISA ter overflow-hidden e position relative.
 */
export function Parallax({
  intensity = 6,
  children,
}: {
  /** Magnitude do deslocamento em % (1–12 saudável). */
  intensity?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${intensity}%`, `-${intensity}%`]
  );

  // a11y: prefers-reduced-motion → renderizar sem o wrapper de over-render,
  // sem useScroll consumindo rAF. A imagem fill ocupa o frame original.
  if (reduce) {
    return <>{children}</>;
  }

  // Container over-renderizado + ancorado, garantindo headroom para o translate.
  const overshootTop = `-${intensity}%`;
  const overshootHeight = `${100 + intensity * 2}%`;

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-x-0"
      style={{ top: overshootTop, height: overshootHeight }}
    >
      <motion.div
        style={{ y, willChange: "transform" }}
        className="pointer-events-auto absolute inset-0"
      >
        {children}
      </motion.div>
    </div>
  );
}
