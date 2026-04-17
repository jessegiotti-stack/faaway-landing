"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Seção 03 — Flávia.
 * Apresentação da consultora. Terceira pessoa, registro editorial.
 * Composição: retrato vertical à esquerda, texto em coluna estreita à direita,
 * deslocado para baixo (assimetria — não alinhar topo).
 *
 * Doutrina:
 *  - Retrato é âncora atmosférica, não "headshot corporativo".
 *  - Texto curto. Carrega autoria, não currículo.
 *  - Numeração editorial Low Tide ("03 — Flávia").
 *  - Único reveal pontual no nome em display.
 */
export function Flavia() {
  return (
    <section
      id="flavia"
      className="relative bg-bg px-6 py-28 text-text md:px-10 md:py-40"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-12 gap-x-6 gap-y-14 md:gap-y-20">
        {/* Editorial label + divisor */}
        <div className="col-span-12 flex items-baseline gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            03 — Flávia
          </span>
          <span aria-hidden className="h-px flex-1 bg-line" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text/40">
            (quem)
          </span>
        </div>

        {/* Retrato — coluna esquerda, vertical 4:5, ancora a seção */}
        <div className="col-span-12 md:col-start-1 md:col-span-5 lg:col-start-2 lg:col-span-4">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg-deep">
            <Image
              src="/photos/portrait-flavia.jpg"
              alt="Retrato de Flávia Werneck"
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 42vw, 100vw"
              quality={92}
              className="object-cover"
            />
          </div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
            (Flávia Werneck · consultora)
          </p>
        </div>

        {/* Texto — coluna direita, deslocada para baixo */}
        <div className="col-span-12 md:col-start-7 md:col-span-6 md:mt-24 lg:col-start-8 lg:col-span-4 lg:mt-32">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="font-display text-[clamp(40px,6vw,76px)] font-light uppercase leading-[0.9] tracking-[-0.035em] text-text"
          >
            Flávia
            <br />
            <span className="italic font-light normal-case tracking-[-0.025em]">
              Werneck.
            </span>
          </motion.h2>

          <div className="mt-8 space-y-5 font-body text-[15px] font-light leading-[1.62] text-text md:mt-12 md:text-[16px]">
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
              Baseada em Florianópolis — opera no mundo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
