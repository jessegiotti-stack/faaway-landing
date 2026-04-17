import type { Transition, Variants } from "framer-motion";

/**
 * Viewport opts compartilhados para reveal por scroll.
 * Tipado como any-friendly para casar com a assinatura aceita por
 * `whileInView` (margin pode ser string CSS).
 */
type RevealViewport = {
  once?: boolean;
  margin?: string;
  amount?: number | "some" | "all";
};

/**
 * Spring presets — contrato Futrue para LP Fa.Away.
 * Não tunar sem revisar direction-faaway.md (seção Movimento).
 */
export const springs: Record<string, Transition> = {
  // Imagem de fundo do hero: zoom-out inicial generoso
  bgScale: { type: "spring", stiffness: 173, damping: 65, mass: 1 },

  // Headline display: rise vertical de baixo
  headlineRise: { type: "spring", stiffness: 108, damping: 30, mass: 1 },

  // Card/caixa secundária (caso usado em hero — omitir se hero limpo)
  cardScale: { type: "spring", stiffness: 242, damping: 59, mass: 1 },

  // Elementos editoriais de segundo plano (subtítulo, tag, rótulo)
  editorial: { type: "spring", stiffness: 140, damping: 53, mass: 1 },

  // CTA principal e header (wordmark + nav)
  cta: { type: "spring", bounce: 0.2, duration: 0.4 },
};

/**
 * Delays escalonados para timeline do hero (em segundos).
 * Princípio: NÃO sincronizar tudo em 0s.
 */
export const heroDelays = {
  bg: 0,
  header: 0,
  headline: 0,
  secondary: 0.6,
  editorial: 1.5,
  cta: 1.8,
} as const;

/* ============================================================
   FASE D — Sistema de Reveal por Scroll
   ============================================================
   Doutrina: cada seção pós-hero entra em ordem editorial.
     rótulo (00ms) → headline (120ms) → corpo (240ms) →
     imagem (scale 1.04 → 1.0, paralelo) → captions (400ms)
   Spring base: stiffness 80, damping 25, mass 1 — ~0.8s percebido.
   Trigger: 20% do viewport. Once: true (sem re-trigger).
   Headlines multilinha: per-line span stagger 80ms.
   ============================================================ */

/** Spring base do reveal de texto/elementos editoriais. */
export const revealSpring: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 25,
  mass: 1,
};

/** Spring específico do reveal de imagem (mais lento, mais suave). */
export const imageRevealSpring: Transition = {
  type: "spring",
  stiffness: 70,
  damping: 30,
  mass: 1,
};

/** Viewport padrão de scroll reveal — 20% gatilho, fire-once. */
export const revealViewport: RevealViewport = {
  once: true,
  margin: "-20% 0px -20% 0px",
};

/** Variants do container de uma seção. Orquestra stagger entre filhos. */
export const revealContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0,
    },
  },
};

/** Variants do bloco de texto/elemento editorial — y: 24 → 0 + opacity. */
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: revealSpring,
  },
};

/** Variants para imagens — scale 1.04 → 1.0, opacity sutil. */
export const revealImage: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  show: {
    opacity: 1,
    scale: 1,
    transition: imageRevealSpring,
  },
};

/** Variants para captions — entram após imagem assentar (delay extra). */
export const revealCaption: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { ...revealSpring, delay: 0.28 },
  },
};

/** Stagger por linha para headlines display multilinha. */
export const revealLineContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const revealLine: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: revealSpring,
  },
};
