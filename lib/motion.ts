import type { Transition } from "framer-motion";

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
