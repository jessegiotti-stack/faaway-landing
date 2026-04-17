"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Seção 06 — O que faz uma viagem Fa.Away.
 *
 * NÃO é portfólio. São três atributos metodológicos não-negociáveis,
 * ancorados em fotos atmosféricas. Composição vertical assimétrica:
 *  - Atributo 01: foto à direita (offset alto), texto à esquerda.
 *  - Atributo 02: foto à esquerda (offset baixo), texto à direita.
 *  - Atributo 03: foto centralizada e menor, texto abaixo curto.
 *
 * Spec B (motion):
 *  - Foto: scale 1.08 → 1.0 spring (stiffness 120, damping 55, mass 1, ~1s)
 *    quando entra no viewport.
 *  - Texto: delay 0.3s sobre a foto, y: 40 → 0, opacity 0 → 1, 0.8s,
 *    ease cubic-bezier(0.22, 0.61, 0.36, 1).
 *  - Cada atributo dispara independente via whileInView (once: true).
 *
 * Foto pendente (frame-window-palms) não chegou — atributo 03 fica com
 * placeholder atmosférico escuro até o arquivo ser dropado.
 */

const PHOTO_SPRING = {
  type: "spring" as const,
  stiffness: 120,
  damping: 55,
  mass: 1,
};
const TEXT_TRANSITION = {
  duration: 0.8,
  ease: [0.22, 0.61, 0.36, 1] as const,
  delay: 0.3,
};
const VIEWPORT = { once: true, margin: "-12%" };

const ATRIBUTOS = [
  {
    n: "01.",
    titulo: "Tempo",
    corpo:
      "Cada itinerário é refeito quantas vezes precisar. Não há pressa de fechar — há pressa de acertar.",
  },
  {
    n: "02.",
    titulo: "Acesso",
    corpo:
      "Hotéis que respondem pelo nome de quem indica. Mesa onde a reserva pública diz não. O que não está em catálogo.",
  },
  {
    n: "03.",
    titulo: "Presença",
    corpo:
      "Acompanhamento em tempo real, no fuso de quem viaja. Resolver o que aparece — e o que não deveria ter aparecido.",
  },
] as const;

/** Bloco de imagem com scale spring em scroll. Aceita src ou null (placeholder). */
function PhotoFrame({
  src,
  alt,
  aspect,
  caption,
}: {
  src: string | null;
  alt: string;
  aspect: string;
  caption: string;
}) {
  return (
    <motion.div
      initial={{ scale: 1.08 }}
      whileInView={{ scale: 1 }}
      viewport={VIEWPORT}
      transition={PHOTO_SPRING}
      className="origin-center"
    >
      <div
        className="relative w-full overflow-hidden bg-bg-deep"
        style={{ aspectRatio: aspect }}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            quality={90}
            className="object-cover"
          />
        ) : (
          // Placeholder atmosférico — penumbra âmbar sutil
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 35%, rgba(122,90,46,0.18) 0%, transparent 60%)",
            }}
          />
        )}
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
        {caption}
      </p>
    </motion.div>
  );
}

/**
 * VideoFrame — mesma mecânica visual do PhotoFrame, mas com <video> em loop.
 * autoplay + loop + muted + playsInline + preload metadata + sem controles.
 * O scale spring de entrada continua igual (1.08 → 1.0); depois disso o
 * loop nativo assume e nada anima sobre ele.
 */
function VideoFrame({
  src,
  poster,
  aspect,
  caption,
}: {
  src: string;
  poster: string;
  aspect: string;
  caption: string;
}) {
  return (
    <motion.div
      initial={{ scale: 1.08 }}
      whileInView={{ scale: 1 }}
      viewport={VIEWPORT}
      transition={PHOTO_SPRING}
      className="origin-center"
    >
      <div
        className="relative w-full overflow-hidden bg-bg-deep"
        style={{ aspectRatio: aspect }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={poster}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
        {caption}
      </p>
    </motion.div>
  );
}

/** Bloco de texto com rise + fade, delay sobre a foto. */
function AtributoTexto({
  n,
  titulo,
  corpo,
}: {
  n: string;
  titulo: string;
  corpo: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={TEXT_TRANSITION}
      className="space-y-5"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
        {n}
      </span>
      <h3 className="font-display text-[clamp(36px,5vw,64px)] font-light uppercase leading-[0.92] tracking-[-0.03em] text-text">
        {titulo}
      </h3>
      <p className="max-w-[420px] font-body text-[15px] font-light leading-[1.62] text-text md:text-[16px]">
        {corpo}
      </p>
    </motion.div>
  );
}

export function ViagemFaAway() {
  return (
    <section
      id="viagem"
      className="relative bg-bg px-6 py-28 text-text md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Editorial label + divisor */}
        <div className="mb-20 flex items-baseline gap-4 md:mb-28">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            06 — Viagem Fa.Away
          </span>
          <span aria-hidden className="h-px flex-1 bg-line" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text/40">
            (o que faz)
          </span>
        </div>

        {/* Headline introdutório */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="mb-32 max-w-[780px] font-display text-[clamp(40px,6.5vw,84px)] font-light uppercase leading-[0.92] tracking-[-0.035em] text-text md:mb-44"
        >
          O que faz
          <br />
          <span className="italic font-light normal-case tracking-[-0.025em]">
            uma viagem nossa.
          </span>
        </motion.h2>

        {/* Atributo 01 — foto à direita (offset alto), texto à esquerda */}
        <div className="mb-32 grid grid-cols-12 gap-x-6 gap-y-10 md:mb-44">
          <div className="col-span-12 md:col-start-1 md:col-span-5 md:mt-32 lg:col-start-2 lg:col-span-4 lg:mt-40">
            <AtributoTexto {...ATRIBUTOS[0]} />
          </div>
          <div className="col-span-12 md:col-start-7 md:col-span-6 lg:col-start-8 lg:col-span-4">
            <PhotoFrame
              src={null}
              alt=""
              aspect="3 / 4"
              caption="(tempo · arquivo pendente)"
            />
          </div>
        </div>

        {/* Atributo 02 — foto à esquerda (offset baixo), texto à direita */}
        <div className="mb-32 grid grid-cols-12 gap-x-6 gap-y-10 md:mb-44">
          <div className="col-span-12 md:col-start-1 md:col-span-6 lg:col-start-2 lg:col-span-5">
            <PhotoFrame
              src={null}
              alt=""
              aspect="4 / 5"
              caption="(acesso · arquivo pendente)"
            />
          </div>
          <div className="col-span-12 md:col-start-8 md:col-span-5 md:mt-48 lg:col-start-8 lg:col-span-4 lg:mt-56">
            <AtributoTexto {...ATRIBUTOS[1]} />
          </div>
        </div>

        {/* Atributo 03 — vídeo centralizado menor, texto abaixo */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-start-4 md:col-span-6 lg:col-start-5 lg:col-span-4">
            <VideoFrame
              src="/videos/presenca-dawn-canoe.mp4"
              poster="/videos/presenca-dawn-canoe-poster.jpg"
              aspect="16 / 9"
              caption="(presença · amanhecer)"
            />
          </div>
          <div className="col-span-12 md:col-start-4 md:col-span-6 lg:col-start-5 lg:col-span-4">
            <AtributoTexto {...ATRIBUTOS[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}
