"use client";

import { motion } from "framer-motion";

/**
 * Seção 05 — Filosofia.
 * Eixo único: "fazer à mão" como diferencial autônomo. Sem validação
 * externa de rede. Sem menção a redes ou selos.
 *
 * Esta é a ÚNICA seção autorizada a usar penumbra âmbar (--amber / bg-deep).
 * Aqui é temperatura, não brilho.
 *
 * Composição:
 *  - Fundo escuro (bg-deep). Texto em creme (bg).
 *  - Display em duas linhas.
 *  - Parágrafo principal + aside mono + fechamento em coluna deslocada.
 *  - Coluna assinatura inferior direita substituída por aside mono curto.
 */
export function Filosofia() {
  return (
    <section
      id="filosofia"
      className="relative overflow-hidden bg-bg-deep px-6 py-32 text-bg md:px-10 md:py-44"
    >
      {/* Penumbra âmbar — gradient radial sutil canto direito */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] top-0 h-[120%] w-[80%]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(122,90,46,0.28) 0%, rgba(122,90,46,0.10) 35%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-12 gap-x-6 gap-y-14">
        {/* Editorial label + divisor */}
        <div className="col-span-12 flex items-baseline gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bg/60">
            05 — Filosofia
          </span>
          <span aria-hidden className="h-px flex-1 bg-bg/15" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bg/40">
            (por que)
          </span>
        </div>

        {/* Citação display — coluna esquerda estreita */}
        <div className="col-span-12 md:col-start-1 md:col-span-9 lg:col-start-2 lg:col-span-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="font-display text-[clamp(40px,6.5vw,88px)] font-light uppercase leading-[0.92] tracking-[-0.035em] text-bg"
          >
            Fazer à mão
            <br />
            <span className="italic font-light normal-case tracking-[-0.025em] text-bg/85">
              é decidir o que não entra.
            </span>
          </motion.h2>
        </div>

        {/* Bloco texto — coluna deslocada */}
        <div className="col-span-12 md:col-start-3 md:col-span-7 lg:col-start-4 lg:col-span-6">
          <div className="space-y-5 font-body text-[15px] font-light leading-[1.65] text-bg/85 md:text-[16px]">
            <p>
              A maior parte da decisão acontece antes. O que não reservamos, o
              que não incluímos, onde não vamos. A viagem começa por subtração.
            </p>
            <p>
              <span className="font-mono text-[12px] tracking-[0.04em] text-bg/60">
                (consultoria, não plataforma. relação, não transação.)
              </span>
            </p>
            <p>Cada roteiro responde pelo nome de quem desenhou.</p>
          </div>
        </div>

        {/* Aside mono inferior direita */}
        <div className="col-span-12 mt-6 md:col-start-9 md:col-span-4 md:mt-10 md:text-right lg:col-start-10 lg:col-span-3">
          <p className="font-mono text-[10px] uppercase leading-[1.8] tracking-[0.18em] text-bg/55">
            (autoria
            <br />
            não catálogo)
          </p>
        </div>
      </div>
    </section>
  );
}
