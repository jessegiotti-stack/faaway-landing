"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { springs, heroDelays } from "@/lib/motion";
import { UnderlineLink } from "./UnderlineLink";

/**
 * Hero institucional fa.Away.
 * Timeline orquestrada (contrato Futrue, ver direction-faaway.md).
 *
 * Foto background: hero-aerial-swimmer.jpg (aérea, água verde-profunda).
 * Caso ainda não tenha sido dropada em assets/photos/, fica fundo escuro.
 */
export function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-bg-deep text-bg">
      {/* Background com scale */}
      <motion.div
        initial={{ scale: 1.4 }}
        animate={{ scale: 1 }}
        transition={{ ...springs.bgScale, delay: heroDelays.bg }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/photos/hero-aerial-swimmer.jpg"
          alt=""
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover"
          // Se a imagem não existir ainda, next/image vai 404; o fallback fica o bg-bg-deep abaixo
        />
        {/* Veil sutil para garantir leitura tipográfica */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/40" />
      </motion.div>

      {/* Conteúdo */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 pb-12 pt-28 md:px-10 md:pb-16 md:pt-32">
        {/* Headline display — assimétrico à esquerda, com rise */}
        <div className="flex flex-1 items-center">
          <motion.h1
            initial={{ y: 600, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...springs.headlineRise, delay: heroDelays.headline }}
            className="font-display text-[clamp(72px,14vw,200px)] font-light uppercase leading-[0.84] tracking-[-0.04em] text-bg"
          >
            fazer
            <br />
            <span className="italic font-light">à mão</span>
          </motion.h1>
        </div>

        {/* Bottom row — editorial aside + CTA */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          {/* Editorial aside (esquerda) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.editorial, delay: heroDelays.editorial }}
            className="max-w-[360px] space-y-3"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bg/70">
              fa.Away — Consultoria de viagens
            </p>
            <p className="font-body text-[14px] font-light leading-[1.55] text-bg/90 md:text-[15px]">
              Roteiros desenhados para quem entende viagem como autoria —
              <span className="font-mono text-[11px] tracking-[0.04em] text-bg/70">
                {" "}(uma curadoria por Flávia Werneck)
              </span>
              .
            </p>
          </motion.div>

          {/* CTA (direita) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...springs.cta, delay: heroDelays.cta }}
            className="flex flex-col items-start gap-3 md:items-end"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bg/60">
              (próximo passo)
            </span>
            <UnderlineLink
              href="#contato"
              className="font-display text-[32px] font-light leading-none tracking-[-0.02em] text-bg md:text-[40px]"
            >
              Agendar conversa →
            </UnderlineLink>
          </motion.div>
        </div>
      </div>

      {/* Coordenada/assinatura canto — detalhe Low Tide */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springs.editorial, delay: heroDelays.editorial + 0.1 }}
        className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.22em] text-bg/40 md:bottom-7"
      >
        01 | Florianópolis — Mundo
      </motion.div>
    </section>
  );
}
