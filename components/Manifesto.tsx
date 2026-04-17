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

/**
 * Seção 02 — Manifesto.
 * Define o que Fa.Away é antes de explicar quem ou como.
 * Composição assimétrica: texto em coluna esquerda estreita,
 * imagem vertical-cropada offset à direita.
 *
 * FASE D: aderiu ao sistema de reveals com stagger.
 *  - Container orquestra: rótulo → headline (linha 1, linha 2) → corpo →
 *    imagem (scale 1.04 → 1.0, paralelo) → caption.
 *  - Spring base 80/25/1, viewport -20%, once: true.
 */

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative bg-bg px-6 py-28 text-text md:px-10 md:py-40"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        variants={revealContainer}
        className="mx-auto grid max-w-[1280px] grid-cols-12 gap-x-6 gap-y-14 md:gap-y-20"
      >
        {/* Editorial label + divisor — Low Tide system */}
        <motion.div
          variants={revealItem}
          className="col-span-12 flex items-baseline gap-4"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            02 — Manifesto
          </span>
          <span aria-hidden className="h-px flex-1 bg-line" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text/40">
            (o que)
          </span>
        </motion.div>

        {/* Coluna texto — esquerda, estreita, generosa de respiração */}
        <div className="col-span-12 md:col-start-1 md:col-span-7 lg:col-start-2 lg:col-span-6">
          <motion.h2
            variants={revealLineContainer}
            className="font-display text-[clamp(48px,8vw,108px)] font-light uppercase leading-[0.86] tracking-[-0.038em] text-text"
          >
            <motion.span variants={revealLine} className="block">
              Devagar,
            </motion.span>
            <motion.span
              variants={revealLine}
              className="block italic font-light normal-case tracking-[-0.025em]"
            >
              com nome.
            </motion.span>
          </motion.h2>

          <motion.div
            variants={revealItem}
            className="mt-10 max-w-[440px] space-y-5 font-body text-[15px] font-light leading-[1.62] text-text md:mt-14 md:text-[16px]"
          >
            <p>
              Não vendemos pacotes. Desenhamos viagens como quem desenha
              qualquer coisa que precisa durar — uma conversa, um livro, um
              vinho.
            </p>
            <p>
              Devagar, com nome, com erro, com refazer.
              <span className="font-mono text-[12px] tracking-[0.04em] text-text-muted">
                {" "}(é mais lento. é melhor.)
              </span>
            </p>
          </motion.div>
        </div>

        {/* Imagem — coluna direita, vertical 2:3, offset (não toca borda) */}
        <div className="col-span-12 md:col-start-9 md:col-span-4 md:-mt-8 lg:col-start-9 lg:col-span-3 lg:-mt-16">
          <motion.div
            variants={revealImage}
            className="relative aspect-[2/3] w-full overflow-hidden bg-bg-deep"
          >
            <Image
              src="/photos/manifesto-greek-still.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
              quality={92}
              className="object-cover"
            />
          </motion.div>
          <motion.p
            variants={revealCaption}
            className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted"
          >
            (passagem · still)
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
