/**
 * Canais de contato Fa.Away — fonte única de verdade.
 *
 * `number` em formato E.164 sem "+" (wa.me exige assim).
 * `display` para uso em texto legível (inclusive read-aloud de screen reader).
 * `url` pronto para href — não rebuildar dinamicamente em componentes.
 */
export const WHATSAPP = {
  number: "5531991234994",
  display: "+55 31 99123-4994",
  url: "https://wa.me/5531991234994",
} as const;
