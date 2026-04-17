"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  revealCaption,
  revealContainer,
  revealItem,
  revealLine,
  revealLineContainer,
  revealViewport,
} from "@/lib/motion";

/**
 * Spring pontual para a foto do Método. scale 1.05 → 1.0, perfil
 * calmo (stiffness 80, damping 60) — diferente do preset revealImage
 * (mais ágil) para deixar a janela contemplativa respirar.
 */
const metodoImageVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 80, damping: 60, mass: 1 },
  },
};

/**
 * Seção 04 — Método.
 * Três etapas numeradas. Não é "processo de venda" — é descrição
 * editorial de como uma viagem nasce.
 *
 * FASE D: aderiu ao sistema de reveals com stagger.
 *  - Container externo orquestra: rótulo → headline (linhas) → corpo etapas
 *    (sub-stagger por etapa) → imagem placeholder → caption.
 */

const ETAPAS = [
  {
    n: "01.",
    titulo: "Conversa",
    corpo:
      "Antes de qualquer destino. Entender quem viaja, o que cansa, o que ainda não foi nomeado.",
  },
  {
    n: "02.",
    titulo: "Curadoria",
    corpo:
      "Roteiro desenhado à mão. Hotéis escolhidos pelo que são, não pelo que aparecem. Cada noite tem razão.",
  },
  {
    n: "03.",
    titulo: "Acompanhamento",
    corpo:
      "Antes, durante, depois. Resolver o que aparece. Estar disponível no fuso de quem está fora.",
  },
] as const;

export function Metodo() {
  return (
    <section
      id="metodo"
      className="relative bg-bg px-6 py-28 text-text md:px-10 md:py-40"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        variants={revealContainer}
        className="mx-auto grid max-w-[1280px] grid-cols-12 gap-x-6 gap-y-14 md:gap-y-20"
      >
        {/* Editorial label + divisor */}
        <motion.div
          variants={revealItem}
          className="group col-span-12 flex items-baseline gap-4"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted transition-colors duration-300 group-hover:text-text">
            04 — Método
          </span>
          <span aria-hidden className="h-px flex-1 bg-line" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text/40 transition-colors duration-300 group-hover:text-text">
            (como)
          </span>
        </motion.div>

        {/* Headline + etapas — coluna esquerda, larga */}
        <div className="col-span-12 md:col-start-1 md:col-span-7 lg:col-start-2 lg:col-span-7">
          <motion.h2
            variants={revealLineContainer}
            className="font-display text-[clamp(48px,8vw,104px)] font-light uppercase leading-[0.86] tracking-[-0.038em] text-text"
          >
            <motion.span variants={revealLine} className="block">
              Três
            </motion.span>
            <motion.span
              variants={revealLine}
              className="block italic font-light normal-case tracking-[-0.025em]"
            >
              tempos.
            </motion.span>
          </motion.h2>

          <motion.div
            variants={revealContainer}
            className="mt-14 grid gap-12 md:mt-20 md:gap-16"
          >
            {ETAPAS.map((etapa) => (
              <motion.div
                key={etapa.n}
                variants={revealItem}
                className="grid grid-cols-12 items-baseline gap-x-6 border-t border-line pt-8"
              >
                <span className="col-span-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
                  {etapa.n}
                </span>
                <div className="col-span-10 space-y-4">
                  <h3 className="font-display text-[clamp(28px,3.6vw,44px)] font-light uppercase leading-[0.95] tracking-[-0.025em] text-text">
                    {etapa.titulo}
                  </h3>
                  <p className="max-w-[440px] font-body text-[15px] font-light leading-[1.62] text-text md:text-[16px]">
                    {etapa.corpo}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Foto — coluna direita, vertical, ofset baixo.
           Pausa íntima — livro cobrindo rosto, beira de piscina.
           Gesto de interrupção deliberada, não de fuga. */}
        <div className="col-span-12 md:col-start-9 md:col-span-4 md:mt-32 lg:col-start-10 lg:col-span-3 lg:mt-48">
          <motion.div
            variants={metodoImageVariants}
            className="relative aspect-[2/3] w-full overflow-hidden bg-bg-deep"
          >
            <Image
              src="/photos/metodo-pool-book.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
              quality={90}
              className="object-cover"
            />
          </motion.div>
          <motion.p
            variants={revealCaption}
            className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted"
          >
            (método · pausa)
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
