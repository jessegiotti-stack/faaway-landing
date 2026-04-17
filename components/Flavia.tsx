"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  revealCaption,
  revealContainer,
  revealImage,
  revealItem,
  revealLine,
  revealLineContainer,
  revealViewport,
} from "@/lib/motion";
import { Parallax } from "./Parallax";

/**
 * Seção 03 — Flávia.
 * Apresentação da consultora. Terceira pessoa, registro editorial.
 * Composição: retrato vertical à esquerda, texto em coluna estreita à direita,
 * deslocado para baixo (assimetria — não alinhar topo).
 *
 * FASE D: aderiu ao sistema de reveals com stagger.
 *  - Container orquestra: rótulo → imagem (paralelo) → caption →
 *    headline (linha 1 + 2) → corpo.
 */
export function Flavia() {
  return (
    <section
      id="flavia"
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
            03 — Flávia
          </span>
          <span aria-hidden className="h-px flex-1 bg-line" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text/40 transition-colors duration-300 group-hover:text-text">
            (quem)
          </span>
        </motion.div>

        {/* Retrato — coluna esquerda, vertical 4:5, ancora a seção */}
        <div className="col-span-12 md:col-start-1 md:col-span-5 lg:col-start-2 lg:col-span-4">
          <motion.div
            variants={revealImage}
            className="group relative aspect-[4/5] w-full overflow-hidden bg-bg-deep"
          >
            <Parallax intensity={8}>
              <Image
                src="/photos/portrait-flavia.jpg"
                alt="Retrato de Flávia Werneck"
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 42vw, 100vw"
                quality={92}
                className="object-cover transition-[transform,filter] duration-[400ms] ease-out group-hover:scale-[1.02] group-hover:brightness-[1.03]"
              />
            </Parallax>
          </motion.div>
          <motion.p
            variants={revealCaption}
            className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted"
          >
            (Flávia Werneck · consultora)
          </motion.p>
        </div>

        {/* Texto — coluna direita, deslocada para baixo */}
        <div className="col-span-12 md:col-start-7 md:col-span-6 md:mt-24 lg:col-start-8 lg:col-span-4 lg:mt-32">
          <motion.h2
            variants={revealLineContainer}
            className="font-display text-[clamp(40px,6vw,76px)] font-light uppercase leading-[0.9] tracking-[-0.035em] text-text"
          >
            <motion.span variants={revealLine} className="block">
              Flávia
            </motion.span>
            <motion.span
              variants={revealLine}
              className="block italic font-light normal-case tracking-[-0.025em]"
            >
              Werneck.
            </motion.span>
          </motion.h2>

          <motion.div
            variants={revealItem}
            className="mt-8 space-y-5 font-body text-[15px] font-light leading-[1.62] text-text md:mt-12 md:text-[16px]"
          >
            <p>
              Vinte anos atrás escolheu o ofício de planejar o que outros fariam
              em silêncio. Não largou desde então.
            </p>
            <p>
              Atende um número curto de clientes por ano —
              <span className="font-mono text-[12px] tracking-[0.04em] text-text-muted">
                {" "}(é uma escolha, não uma limitação)
              </span>
              . Cada roteiro passa por mãos, telefonemas e versões antes de
              virar viagem.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
              Baseada em Belo Horizonte — opera no mundo.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
