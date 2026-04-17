"use client";

import Script from "next/script";

/**
 * Carrega o embed.js do Tally e força re-scan do DOM após hidratação.
 *
 * Por que um wrapper client-only:
 *  - O embed.js do Tally auto-ancora listeners em elementos com
 *    data-tally-open na sua inicialização. Quando o script roda antes da
 *    hidratação do React (Next.js SSR), os botões ainda não existem no
 *    DOM hidratado — ou existem mas a delegação não pega o evento de
 *    maneira confiável. Resultado: clique não abre o popup.
 *  - A solução oficial do Tally é chamar window.Tally.loadEmbeds() depois
 *    que a página estiver montada. O hook onLoad do <Script> dispara após
 *    o script baixar e executar; nesse ponto Tally já expos a API e o
 *    DOM hidratado está pronto — loadEmbeds re-escaneia e anexa listeners
 *    em todos os data-tally-open presentes.
 *  - onLoad exige callback de cliente — daí "use client" neste wrapper
 *    em vez de colocar <Script> direto no layout.tsx (server component).
 *
 * Strategy afterInteractive: carrega após hidratação, fora do caminho
 * crítico do LCP do hero. Tally é ferramenta de conversão, não de
 * first paint — pode esperar alguns ms.
 */
declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
      openPopup: (formId: string, options?: Record<string, unknown>) => void;
      closePopup: (formId: string) => void;
    };
  }
}

export function TallyScript() {
  return (
    <Script
      src="https://tally.so/widgets/embed.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== "undefined" && window.Tally?.loadEmbeds) {
          window.Tally.loadEmbeds();
        }
      }}
    />
  );
}
