"use client";

import { motion } from "framer-motion";

/**
 * Seção 04 — Método.
 * Três etapas numeradas. Não é "processo de venda" — é descrição
 * editorial de como uma viagem nasce.
 *
 * Composição:
 *  - Bloco texto à esquerda: três etapas em grid vertical, numeração mono.
 *  - Foto âncora à direita (pause-pool-book), vertical 2:3, ofset baixo.
 *
 * Doutrina:
 *  - Sem ícones. Sem cards.
 *  - Numeração editorial Low Tide, não numeração de checkout.
 *  - Reveal pontual no headline. Etapas entram com stagger sutil de opacity.
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
      <div className="mx-auto grid max-w-[1280px] grid-cols-12 gap-x-6 gap-y-14 md:gap-y-20">
        {/* Editorial label + divisor */}
        <div className="col-span-12 flex items-baseline gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            04 — Método
          </span>
          <span aria-hidden className="h-px flex-1 bg-line" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text/40">
            (como)
          </span>
        </div>

        {/* Headline + etapas — coluna esquerda, larga */}
        <div className="col-span-12 md:col-start-1 md:col-span-7 lg:col-start-2 lg:col-span-7">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="font-display text-[clamp(48px,8vw,104px)] font-light uppercase leading-[0.86] tracking-[-0.038em] text-text"
          >
            Três
            <br />
            <span className="italic font-light normal-case tracking-[-0.025em]">
              tempos.
            </span>
          </motion.h2>

          <div className="mt-14 grid gap-12 md:mt-20 md:gap-16">
            {ETAPAS.map((etapa, i) => (
              <motion.div
                key={etapa.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 0.61, 0.36, 1],
                  delay: i * 0.12,
                }}
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
          </div>
        </div>

        {/* Foto — coluna direita, vertical, ofset baixo.
           Placeholder atmosférico dark até novo ativo chegar. */}
        <div className="col-span-12 md:col-start-9 md:col-span-4 md:mt-32 lg:col-start-10 lg:col-span-3 lg:mt-48">
          <div
            aria-hidden
            className="relative aspect-[2/3] w-full overflow-hidden bg-bg-deep"
          >
            {/* Penumbra sutil para não ficar quadrado plano */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 30%, rgba(122,90,46,0.18) 0%, transparent 60%)",
              }}
            />
          </div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
            (método · arquivo pendente)
          </p>
        </div>
      </div>
    </section>
  );
}
