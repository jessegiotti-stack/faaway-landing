"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { springs, heroDelays } from "@/lib/motion";
import { UnderlineLink } from "./UnderlineLink";

/**
 * Hero institucional Fa.Away — galeria atmosférica em rotação.
 *
 * Spec A (motion):
 *  - Primeira imagem (hero-aerial-swimmer) entra com a timeline Futrue intacta:
 *    scale 1.4 → 1.0, spring 173/65/1, sem delay.
 *  - Após ~1.8s a rotação automática começa.
 *  - Crossfade de 1.2s entre imagens + scale spring pontual 1.05 → 1.0
 *    (stiffness 80, damping 60) — quase imperceptível, só dá presença.
 *  - 7s de pausa em cada quadro.
 *  - Pause-on-hover: mouse no hero → para. Sai → retoma.
 *
 * Curadoria (lp_novas — alta-resolução, sem retrato, sem repetição):
 *  - hero-01-turquoise-deep (5504×3072) — aérea mulher nadando em turquesa
 *    profundo. Entrada com a timeline Futrue intacta.
 *  - hero-02-suspension-dusk (1152×2048) — mulher flutuando entardecer.
 *    Fonte vertical; object-cover/center recorta topo e base mantendo a
 *    figura central visível.
 *  - hero-03-greek-alt (2048×1152) — beco grego porta azul, plano alternativo
 *    ao hf_015147 original (que vinha com vinheta cinematográfica baked-in,
 *    visível como faixa preta no topo/base do hero). Este é o hf_014916,
 *    mesma cena, figura de branco caminhando, sem barras.
 */
const HERO_GALLERY = [
  { src: "/photos/hero-01-turquoise-deep.png", alt: "" },
  { src: "/photos/hero-02-suspension-dusk.png", alt: "" },
  { src: "/photos/hero-03-greek-alt.png", alt: "" },
] as const;

const ROTATION_INTERVAL_MS = 7000;
const INITIAL_DELAY_MS = 1800;
const CROSSFADE_DURATION_S = 1.2;
const CROSSFADE_EASE = [0.4, 0, 0.2, 1] as const;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [rotationArmed, setRotationArmed] = useState(false);
  const reduce = useReducedMotion();

  // Aguarda a timeline Futrue inicial completar antes de armar a rotação.
  // Sob prefers-reduced-motion: nunca arma — fica apenas no primeiro quadro.
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setRotationArmed(true), INITIAL_DELAY_MS);
    return () => clearTimeout(t);
  }, [reduce]);

  // Loop de rotação. Pausado enquanto isHovered ou sob reduced-motion.
  useEffect(() => {
    if (reduce || !rotationArmed || isHovered) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_GALLERY.length);
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduce, rotationArmed, isHovered]);

  const isFirstFrame = index === 0;

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-[100svh] w-full overflow-hidden bg-bg-deep text-bg"
    >
      {/* Galeria background — stack absoluto com crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            initial={
              isFirstFrame
                ? { scale: 1.4, opacity: 1 }
                : { scale: 1.05, opacity: 0 }
            }
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: CROSSFADE_DURATION_S,
                ease: CROSSFADE_EASE,
              },
            }}
            transition={
              isFirstFrame
                ? { ...springs.bgScale, delay: heroDelays.bg }
                : {
                    scale: {
                      type: "spring",
                      stiffness: 80,
                      damping: 60,
                      mass: 1,
                    },
                    opacity: {
                      duration: CROSSFADE_DURATION_S,
                      ease: CROSSFADE_EASE,
                    },
                  }
            }
            className="absolute inset-0"
          >
            <Image
              src={HERO_GALLERY[index].src}
              alt={HERO_GALLERY[index].alt}
              fill
              priority={isFirstFrame}
              quality={92}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Veil sutil — leitura tipográfica garantida */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/40" />
      </div>

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
              Fa.Away — Consultoria de viagens
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
