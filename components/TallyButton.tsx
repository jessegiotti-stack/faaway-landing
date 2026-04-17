"use client";

import type { ReactNode } from "react";

/**
 * Botão que dispara popup Tally via data-attributes.
 *
 * O script tally.so/widgets/embed.js (carregado em app/layout.tsx) faz
 * delegation no <body> — qualquer elemento com data-tally-open="<formId>"
 * abre o popup correspondente. Nao precisa de onClick, nao precisa de
 * ref para instancia JS do Tally.
 *
 * Matching visual do UnderlineLink (duas barras sublinhadas):
 *  - Barra 1 fixa w-full, opacity 90
 *  - Barra 2 hover 0% -> 110%, transition 260ms cubic-bezier Futrue
 * Render como <button type="button"> — nao e anchor, nao navega, nao
 * aparece como link em leitores de tela; e acao.
 *
 * Atributos Tally fixos nesta LP:
 *  - layout: modal
 *  - overlay: 1 (escurece a pagina atras)
 *  - width: 640
 *  - auto-close: 0 (nao fecha sozinho apos submit — Flavia decide fluxo pos-envio)
 */
type Props = {
  formId: string;
  children: ReactNode;
  className?: string;
};

export function TallyButton({ formId, children, className = "" }: Props) {
  return (
    <button
      type="button"
      data-tally-open={formId}
      data-tally-layout="modal"
      data-tally-overlay="1"
      data-tally-width="640"
      data-tally-auto-close="0"
      className={`${className} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current`}
    >
      <span className="group relative inline-block">
        <span className="relative z-10">{children}</span>
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-[3px] left-0 h-px w-full bg-current opacity-90"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-[3px] left-0 h-px w-0 bg-current transition-[width] duration-[260ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-[110%]"
        />
      </span>
    </button>
  );
}
