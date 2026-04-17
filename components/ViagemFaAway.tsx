"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";
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
 * Seção 06 — O que faz uma viagem Fa.Away.
 *
 * NÃO é portfólio. São três atributos metodológicos não-negociáveis,
 * ancorados em fotos atmosféricas. Composição vertical assimétrica:
 *  - Atributo 01: foto à direita (offset alto), texto à esquerda.
 *  - Atributo 02: foto à esquerda (offset baixo), texto à direita.
 *  - Atributo 03: foto centralizada e menor, texto abaixo curto.
 *
 * FASE D — sistemas integrados:
 *  - Reveals com stagger por bloco (revealContainer + revealItem/Image/Caption).
 *  - Parallax sutil em Tempo + Acesso (intensity 6).
 *  - Hover cross-card: o atributo sob cursor escala 1.01 + brightness 1.03;
 *    os outros dois desaturam para opacity 0.6 ao longo de 500ms. Estado
 *    içado para o componente raiz para coordenar entre cards.
 *  - Hover de imagem (scale 1.02 + brightness) é adicionado dentro do frame
 *    via group/group-hover na própria <Image>.
 *
 * Atributos 01 (Tempo) e 02 (Acesso) integram fotos editoriais (Pinterest
 * scrape, baixa-res). Para respeitar o critério 2x retina, os spans de
 * display foram comprimidos:
 *  - Tempo:  lg:col-span-3 (~320px display) com fonte 736×920 → 2x ok.
 *  - Acesso: lg:col-span-3 (~320px display) com fonte 612×755 → ~5% short,
 *            borderline aceito (gesto contemplativo carrega o quadro).
 * Atributo 03 (Presença) mantém vídeo amanhecer-canoa.
 */

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

/**
 * Bloco de imagem com reveal scale + opacity. Aceita src ou null (placeholder).
 * Se `parallax` for número > 0, envelopa a imagem em <Parallax intensity={..}>.
 */
function PhotoFrame({
  src,
  alt,
  aspect,
  caption,
  parallax = 0,
}: {
  src: string | null;
  alt: string;
  aspect: string;
  caption: string;
  parallax?: number;
}) {
  const img = src ? (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 40vw, 100vw"
      quality={90}
      className="object-cover transition-[transform,filter] duration-[400ms] ease-out group-hover:scale-[1.02] group-hover:brightness-[1.03]"
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
  );

  return (
    <>
      <motion.div
        variants={revealImage}
        className="group relative w-full overflow-hidden bg-bg-deep"
        style={{ aspectRatio: aspect }}
      >
        {parallax > 0 ? <Parallax intensity={parallax}>{img}</Parallax> : img}
      </motion.div>
      <motion.p
        variants={revealCaption}
        className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted"
      >
        {caption}
      </motion.p>
    </>
  );
}

/**
 * VideoFrame — mesma mecânica visual do PhotoFrame, mas com <video> em loop.
 * autoplay + loop + muted + playsInline + preload metadata + sem controles.
 * Hover scale + brightness aplicado no próprio video element.
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
    <>
      <motion.div
        variants={revealImage}
        className="group relative w-full overflow-hidden bg-bg-deep"
        style={{ aspectRatio: aspect }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={poster}
          className="absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-[400ms] ease-out group-hover:scale-[1.02] group-hover:brightness-[1.03]"
        >
          <source src={src} type="video/mp4" />
        </video>
      </motion.div>
      <motion.p
        variants={revealCaption}
        className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted"
      >
        {caption}
      </motion.p>
    </>
  );
}

/** Bloco de texto com reveal item (rise + fade), orquestrado pelo container. */
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
    <motion.div variants={revealContainer} className="space-y-5">
      <motion.span
        variants={revealItem}
        className="block font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted"
      >
        {n}
      </motion.span>
      <motion.h3
        variants={revealItem}
        className="font-display text-[clamp(36px,5vw,64px)] font-light uppercase leading-[0.92] tracking-[-0.03em] text-text"
      >
        {titulo}
      </motion.h3>
      <motion.p
        variants={revealItem}
        className="max-w-[420px] font-body text-[15px] font-light leading-[1.62] text-text md:text-[16px]"
      >
        {corpo}
      </motion.p>
    </motion.div>
  );
}

/**
 * AtributoBloco — wrapper externo que carrega:
 *  - reveal stagger via revealContainer + viewport
 *  - hover cross-card via classes condicionais (state içado)
 * O quadro inteiro (texto + foto) é o trigger.
 */
function AtributoBloco({
  index,
  hovered,
  onHover,
  onLeave,
  className,
  children,
}: {
  index: number;
  hovered: number | null;
  onHover: (i: number) => void;
  onLeave: () => void;
  className: string;
  children: ReactNode;
}) {
  const isSelf = hovered === index;
  const isOther = hovered !== null && hovered !== index;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      variants={revealContainer}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      className={`${className} transition-[transform,opacity,filter] duration-500 ease-out`}
      style={{
        transform: isSelf ? "scale(1.01)" : "scale(1)",
        opacity: isOther ? 0.6 : 1,
        filter: isSelf ? "brightness(1.03)" : "brightness(1)",
        transformOrigin: "center",
      }}
    >
      {children}
    </motion.div>
  );
}

export function ViagemFaAway() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="viagem"
      className="relative bg-bg px-6 py-28 text-text md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Editorial label + divisor */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          variants={revealContainer}
          className="mb-20 md:mb-28"
        >
          <motion.div
            variants={revealItem}
            className="group flex items-baseline gap-4"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted transition-colors duration-300 group-hover:text-text">
              06 — Viagem Fa.Away
            </span>
            <span aria-hidden className="h-px flex-1 bg-line" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text/40 transition-colors duration-300 group-hover:text-text">
              (o que faz)
            </span>
          </motion.div>
        </motion.div>

        {/* Headline introdutório — stagger linha-a-linha */}
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          variants={revealLineContainer}
          className="mb-32 max-w-[780px] font-display text-[clamp(40px,6.5vw,84px)] font-light uppercase leading-[0.92] tracking-[-0.035em] text-text md:mb-44"
        >
          <motion.span variants={revealLine} className="block">
            O que faz
          </motion.span>
          <motion.span
            variants={revealLine}
            className="block italic font-light normal-case tracking-[-0.025em]"
          >
            uma viagem nossa.
          </motion.span>
        </motion.h2>

        {/* Atributo 01 — foto à direita (offset alto), texto à esquerda */}
        <AtributoBloco
          index={0}
          hovered={hovered}
          onHover={setHovered}
          onLeave={() => setHovered(null)}
          className="mb-32 grid grid-cols-12 gap-x-6 gap-y-10 md:mb-44"
        >
          <div className="col-span-12 md:col-start-1 md:col-span-5 md:mt-32 lg:col-start-2 lg:col-span-4 lg:mt-40">
            <AtributoTexto {...ATRIBUTOS[0]} />
          </div>
          <div className="col-span-12 md:col-start-8 md:col-span-5 lg:col-start-9 lg:col-span-3">
            <PhotoFrame
              src="/photos/viagem-01-tempo.png"
              alt=""
              aspect="4 / 5"
              caption="(tempo · pausa)"
              parallax={6}
            />
          </div>
        </AtributoBloco>

        {/* Atributo 02 — foto à esquerda (offset baixo), texto à direita */}
        <AtributoBloco
          index={1}
          hovered={hovered}
          onHover={setHovered}
          onLeave={() => setHovered(null)}
          className="mb-32 grid grid-cols-12 gap-x-6 gap-y-10 md:mb-44"
        >
          <div className="col-span-12 md:col-start-1 md:col-span-5 lg:col-start-2 lg:col-span-3">
            <PhotoFrame
              src="/photos/viagem-02-acesso.png"
              alt=""
              aspect="4 / 5"
              caption="(acesso · gesto)"
              parallax={6}
            />
          </div>
          <div className="col-span-12 md:col-start-7 md:col-span-6 md:mt-48 lg:col-start-7 lg:col-span-5 lg:mt-56">
            <AtributoTexto {...ATRIBUTOS[1]} />
          </div>
        </AtributoBloco>

        {/* Atributo 03 — vídeo centralizado menor, texto abaixo */}
        <AtributoBloco
          index={2}
          hovered={hovered}
          onHover={setHovered}
          onLeave={() => setHovered(null)}
          className="grid grid-cols-12 gap-x-6 gap-y-8"
        >
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
        </AtributoBloco>
      </div>
    </section>
  );
}
