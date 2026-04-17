"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Seção 02 — Manifesto.
 * Define o que Fa.Away é antes de explicar quem ou como.
 * Composição assimétrica: texto em coluna esquerda estreita,
 * imagem vertical-cropada offset à direita.
 *
 * Doutrina aplicada:
 *  - Sem reveals agressivos. Fade pontual no display headline.
 *  - Imagem entra como âncora atmosférica estática.
 *  - Spring de entrada 1.05 → 1.0 (stiffness 80, damping 60, mass 1)
 *    quando a imagem entra no viewport pela primeira vez. Depois disso,
 *    o quadro fica estável.
 *
 * Histórico: passou de vídeo (loop 7s) para still extraído do mesmo mp4
 * (1920×1040 após crop de segurança das bordas pretas baked-in).
 * Decisão editorial: o silêncio do still acompanha melhor o ritmo
 * contemplativo do bloco.
 */

const ENTRY_SPRING = {
  type: "spring" as const,
  stiffness: 80,
  damping: 60,
  mass: 1,
};

export function Manifesto() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // IntersectionObserver dispara o spring de entrada UMA única vez.
  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="manifesto"
      className="relative bg-bg px-6 py-28 text-text md:px-10 md:py-40"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-12 gap-x-6 gap-y-14 md:gap-y-20">
        {/* Editorial label + divisor — Low Tide system */}
        <div className="col-span-12 flex items-baseline gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            02 — Manifesto
          </span>
          <span aria-hidden className="h-px flex-1 bg-line" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text/40">
            (o que)
          </span>
        </div>

        {/* Coluna texto — esquerda, estreita, generosa de respiração */}
        <div className="col-span-12 md:col-start-1 md:col-span-7 lg:col-start-2 lg:col-span-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="font-display text-[clamp(48px,8vw,108px)] font-light uppercase leading-[0.86] tracking-[-0.038em] text-text"
          >
            Devagar,
            <br />
            <span className="italic font-light normal-case tracking-[-0.025em]">
              com nome.
            </span>
          </motion.h2>

          <div className="mt-10 max-w-[440px] space-y-5 font-body text-[15px] font-light leading-[1.62] text-text md:mt-14 md:text-[16px]">
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
          </div>
        </div>

        {/* Imagem — coluna direita, vertical 2:3, offset (não toca borda) */}
        <div className="col-span-12 md:col-start-9 md:col-span-4 md:-mt-8 lg:col-start-9 lg:col-span-3 lg:-mt-16">
          <motion.div
            ref={wrapperRef}
            initial={{ scale: 1.05 }}
            animate={inView ? { scale: 1 } : { scale: 1.05 }}
            transition={ENTRY_SPRING}
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
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
            (passagem · still)
          </p>
        </div>
      </div>
    </section>
  );
}
