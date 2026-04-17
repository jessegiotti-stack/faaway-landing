"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, type FormEvent } from "react";
import { UnderlineLink } from "./UnderlineLink";
import { Logo } from "./Logo";

/**
 * Seção 07 — Contato.
 *
 * Não é "fale conosco". É começo de uma conversa.
 *
 * Composição:
 *  - Headline display assimétrico à esquerda.
 *  - Form curto (nome, e-mail, mensagem) na coluna central, larga.
 *  - WhatsApp + endereço editorial no rodapé.
 *
 * Form: front-end only. Submit faz fade-out do form, mostra estado de
 * sucesso editorial. Sem backend ainda.
 */

const WHATSAPP_URL = "https://wa.me/5548999999999"; // placeholder — trocar quando confirmado

export function Contato() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="contato"
      className="relative bg-bg px-6 pt-28 pb-12 text-text md:px-10 md:pt-40 md:pb-16"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-12 gap-x-6 gap-y-14 md:gap-y-20">
        {/* Editorial label + divisor */}
        <div className="col-span-12 flex items-baseline gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            07 — Contato
          </span>
          <span aria-hidden className="h-px flex-1 bg-line" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text/40">
            (começo)
          </span>
        </div>

        {/* Headline display */}
        <div className="col-span-12 md:col-start-1 md:col-span-9 lg:col-start-2 lg:col-span-9">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="font-display text-[clamp(48px,8vw,108px)] font-light uppercase leading-[0.86] tracking-[-0.038em] text-text"
          >
            Conversemos
            <br />
            <span className="italic font-light normal-case tracking-[-0.025em]">
              antes da viagem.
            </span>
          </motion.h2>
        </div>

        {/* Form — coluna central larga */}
        <div className="col-span-12 md:col-start-1 md:col-span-8 lg:col-start-2 lg:col-span-7">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                onSubmit={onSubmit}
                className="space-y-10"
              >
                <Field
                  id="nome"
                  label="01 — Nome"
                  type="text"
                  required
                  autoComplete="name"
                />
                <Field
                  id="email"
                  label="02 — E-mail"
                  type="email"
                  required
                  autoComplete="email"
                />
                <Field
                  id="whatsapp"
                  label="03 — WhatsApp (opcional)"
                  type="tel"
                  autoComplete="tel"
                />
                <FieldTextarea
                  id="mensagem"
                  label="04 — Conta um pouco"
                  required
                />

                <div className="pt-4">
                  <button
                    type="submit"
                    className="group relative inline-flex items-baseline font-display text-[28px] font-light uppercase leading-none tracking-[-0.02em] text-text transition-opacity hover:opacity-70 md:text-[36px]"
                  >
                    <span className="relative">
                      Enviar
                      <span className="absolute -bottom-1 left-0 h-px w-full bg-text" />
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-text transition-[width] duration-[260ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-[110%]" />
                    </span>
                    <span className="ml-3">→</span>
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                className="space-y-6"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                  (recebido)
                </span>
                <p className="font-display text-[clamp(32px,4.5vw,52px)] font-light uppercase leading-[0.95] tracking-[-0.03em] text-text">
                  Obrigada.
                  <br />
                  <span className="italic font-light normal-case tracking-[-0.02em]">
                    Respondo em até 48 horas.
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* WhatsApp aside — direita */}
        <div className="col-span-12 md:col-start-9 md:col-span-4 lg:col-start-10 lg:col-span-3">
          <div className="space-y-4 border-t border-line pt-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
              (atalho)
            </span>
            <UnderlineLink
              href={WHATSAPP_URL}
              external
              className="font-display text-[24px] font-light leading-tight tracking-[-0.02em] text-text md:text-[28px]"
            >
              WhatsApp →
            </UnderlineLink>
            <p className="max-w-[260px] font-body text-[13px] font-light leading-[1.55] text-text-muted md:text-[14px]">
              Para conversa direta. Resposta em fuso de Florianópolis.
            </p>
          </div>
        </div>
      </div>

      {/* Rodapé editorial — assinatura final, layout 2 colunas */}
      <div className="mx-auto mt-32 grid max-w-[1280px] grid-cols-12 items-end gap-x-6 gap-y-8 border-t border-line pt-10 md:mt-44">
        {/* Logo + endereço — esquerda */}
        <div className="col-span-12 md:col-span-6 lg:col-start-2 lg:col-span-5">
          <Logo tone="dark" height={52} className="mb-4" />
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            Florianópolis — Mundo
          </p>
        </div>
        {/* Créditos — direita */}
        <div className="col-span-12 md:col-span-6 md:text-right lg:col-start-7 lg:col-span-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            © 2026 Fa.Away · Flávia Werneck
          </p>
        </div>
      </div>
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
        className="w-full border-b border-line bg-transparent pb-3 font-body text-[18px] font-light text-text placeholder:text-text/30 focus:border-text focus:outline-none md:text-[20px]"
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
        className="w-full resize-none border-b border-line bg-transparent pb-3 font-body text-[18px] font-light leading-[1.5] text-text placeholder:text-text/30 focus:border-text focus:outline-none md:text-[20px]"
      />
    </div>
  );
}
