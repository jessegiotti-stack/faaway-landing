"use client";

import { motion } from "framer-motion";
import { UnderlineLink } from "./UnderlineLink";
import { Logo } from "./Logo";
import { TallyButton } from "./TallyButton";
import {
  revealContainer,
  revealItem,
  revealLine,
  revealLineContainer,
} from "@/lib/motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { WHATSAPP } from "@/lib/contact";

/**
 * Seção 07 — Contato.
 *
 * Não é "fale conosco". É começo de uma conversa.
 *
 * Composição (pós-refactor Tally):
 *  - Headline display assimétrico à esquerda.
 *  - Copy editorial introduzindo o gesto + CTA grande disparando popup Tally.
 *  - WhatsApp atalho permanece como alternativa direta (coluna à direita).
 *  - Rodapé editorial com logo, cidade, copyright.
 *
 * Decisão editorial: o formulário inline (Nome/E-mail/WhatsApp/Mensagem) foi
 * substituído por popup Tally único (formId vGx2xv) acionado também pelo
 * CTA do hero. Centraliza fluxo de lead num único formulário gerenciado fora
 * do repositório — Flávia edita campos via dashboard Tally sem deploy.
 *
 * FASE D — sistema de reveals com stagger preservado:
 *  - Container orquestra: rótulo → headline (linhas) → copy/CTA/aside.
 */

// Número real da Flávia vive em lib/contact.ts — fonte única de verdade.

export function Contato() {
  const mainReveal = useScrollReveal();
  const footerReveal = useScrollReveal();

  return (
    <section
      id="contato"
      className="relative bg-bg px-6 pt-28 pb-12 text-text md:px-10 md:pt-40 md:pb-16"
    >
      <motion.div
        {...mainReveal}
        variants={revealContainer}
        className="mx-auto grid max-w-[1280px] grid-cols-12 gap-x-6 gap-y-14 md:gap-y-20"
      >
        {/* Editorial label + divisor */}
        <motion.div
          variants={revealItem}
          className="group col-span-12 flex items-baseline gap-4"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted transition-colors duration-300 group-hover:text-text">
            07 — Contato
          </span>
          <span aria-hidden className="h-px flex-1 bg-line" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text/60 transition-colors duration-300 group-hover:text-text">
            (começo)
          </span>
        </motion.div>

        {/* Headline display */}
        <div className="col-span-12 md:col-start-1 md:col-span-9 lg:col-start-2 lg:col-span-9">
          <motion.h2
            variants={revealLineContainer}
            className="font-display text-[clamp(48px,8vw,108px)] font-light uppercase leading-[0.86] tracking-[-0.038em] text-text"
          >
            <motion.span variants={revealLine} className="block">
              Conversemos
            </motion.span>
            <motion.span
              variants={revealLine}
              className="block italic font-light normal-case tracking-[-0.025em]"
            >
              antes da viagem.
            </motion.span>
          </motion.h2>
        </div>

        {/* Copy editorial + CTA principal — coluna larga à esquerda */}
        <motion.div
          variants={revealItem}
          className="col-span-12 md:col-start-1 md:col-span-8 lg:col-start-2 lg:col-span-7"
        >
          <div className="space-y-14 md:space-y-20">
            <p className="max-w-[520px] font-body text-[16px] font-light leading-[1.62] text-text md:text-[18px]">
              Antes de qualquer itinerário, uma conversa — aberta, sem pressa.
              Entender o lugar, o tempo e o pretexto antes de desenhar a viagem.
            </p>

            <div>
              <span className="mb-5 block font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                (próximo passo)
              </span>
              <TallyButton
                formId="vGx2xv"
                className="font-display text-[clamp(36px,5.5vw,56px)] font-light uppercase leading-none tracking-[-0.025em] text-text"
              >
                Agendar conversa →
              </TallyButton>
            </div>
          </div>
        </motion.div>

        {/* WhatsApp aside — direita, mantido como alternativa direta */}
        <motion.div
          variants={revealItem}
          className="col-span-12 md:col-start-9 md:col-span-4 lg:col-start-10 lg:col-span-3"
        >
          <div className="space-y-4 border-t border-line pt-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
              (atalho)
            </span>
            <UnderlineLink
              href={WHATSAPP.url}
              external
              className="font-display text-[24px] font-light leading-tight tracking-[-0.02em] text-text md:text-[28px]"
            >
              WhatsApp →
            </UnderlineLink>
            <p className="max-w-[260px] font-body text-[13px] font-light leading-[1.55] text-text-muted md:text-[14px]">
              Para uma troca rápida, em tempo real.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Rodapé editorial — assinatura final, layout 2 colunas */}
      <motion.div
        {...footerReveal}
        variants={revealContainer}
        className="mx-auto mt-32 grid max-w-[1280px] grid-cols-12 items-end gap-x-6 gap-y-8 border-t border-line pt-10 md:mt-44"
      >
        {/* Logo + endereço — esquerda */}
        <motion.div
          variants={revealItem}
          className="col-span-12 md:col-span-6 lg:col-start-2 lg:col-span-5"
        >
          <Logo tone="dark" height={52} className="mb-4" />
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            Belo Horizonte — Mundo
          </p>
        </motion.div>
        {/* Créditos — direita */}
        <motion.div
          variants={revealItem}
          className="col-span-12 md:col-span-6 md:text-right lg:col-start-7 lg:col-span-5"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            © 2026 Fa.Away · Flávia Werneck
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Form fields ---------- */

function Field({
  id,
  label,
  type = "text",
  required,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-3">
      <label
        htmlFor={id}
        className="block font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full border-b border-line bg-transparent pb-3 font-body text-[18px] font-light text-text placeholder:text-text/30 transition-colors duration-200 hover:border-text-muted focus:border-text focus:outline-none md:text-[20px]"
      />
    </div>
  );
}

function FieldTextarea({
  id,
  label,
  required,
}: {
  id: string;
  label: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-3">
      <label
        htmlFor={id}
        className="block font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        required={required}
        rows={4}
        className="w-full resize-none border-b border-line bg-transparent pb-3 font-body text-[18px] font-light leading-[1.5] text-text placeholder:text-text/30 transition-colors duration-200 hover:border-text-muted focus:border-text focus:outline-none md:text-[20px]"
      />
    </div>
  );
}
