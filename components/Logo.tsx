"use client";

import Link from "next/link";

/**
 * Logo oficial Fa.Away — wordmark "FA. AWAY · TRAVEL — PLANNER".
 *
 * Implementação via mask-image: o PNG cropado em assets/brand/ entra como
 * máscara sobre um fundo de cor sólida. Vantagem sobre <img> + filter:
 *  - Cor exata por contexto (var(--text) em fundo claro, var(--bg) em escuro).
 *  - Sem artefatos de antialiasing comuns ao filter chain invert/brightness.
 *  - Edges preservadas mesmo em sizes pequenos (32–56px).
 *
 * Aspecto do PNG cropado: 3200×1300 (~2.46:1).
 *
 * Props:
 *  - tone: "dark" → fundo claro (#F2EDE4), wordmark vira #2A2218.
 *          "light" → fundo escuro (#1B1810), wordmark vira #F2EDE4.
 *  - height: altura em px. width é derivada do aspecto.
 *  - href:  destino do link. Default "/" (volta ao topo).
 */

const LOGO_SRC = "/brand/logo-faaway.png";
const ASPECT = 3200 / 1300;

type Tone = "dark" | "light";

type Props = {
  tone: Tone;
  height?: number;
  href?: string;
  className?: string;
};

export function Logo({
  tone,
  height = 36,
  href = "/",
  className = "",
}: Props) {
  const width = Math.round(height * ASPECT);
  // Usa as CSS custom properties cruas declaradas em :root (globals.css).
  const color = tone === "dark" ? "var(--text)" : "var(--bg)";

  const mark = (
    <span
      role="img"
      aria-label="Fa.Away — início"
      className={`block ${className}`}
      style={{
        width,
        height,
        backgroundColor: color,
        WebkitMaskImage: `url(${LOGO_SRC})`,
        maskImage: `url(${LOGO_SRC})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );

  if (!href) return mark;

  return (
    <Link
      href={href}
      aria-label="Fa.Away — início"
      className="inline-flex items-center"
    >
      {mark}
    </Link>
  );
}
