"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { preload } from "react-dom";
import { springs, heroDelays } from "@/lib/motion";
import { TallyButton } from "./TallyButton";

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
/**
 * `headlineOffset` opcional por frame — em vez de recortar a imagem para
 * tirar o rosto do eixo do display (abordagem anterior com objectPosition),
 * o próprio HEADLINE sobe alguns px quando aquela imagem está ativa.
 * Mantém a composição editorial da foto intacta e resolve a colisão visual.
 *
 * Hero-02 (mulher flutuando entardecer, vertical): a figura fica no
 * centro-vertical da imagem e bate no eixo das três linhas do display.
 * headlineOffset -100px sobe o bloco de texto para cima da figura,
 * liberando o corpo da composição. Hero-01 (aérea turquesa) e hero-03
 * (beco grego) não têm colisão — ficam em 0.
 */
const HERO_GALLERY = [
  { src: "/photos/hero-01-turquoise-deep.png", alt: "" },
  {
    src: "/photos/hero-02-suspension-dusk.png",
    alt: "",
    headlineOffset: -100,
  },
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

  // Preload dos quadros 2 e 3 enquanto o quadro 1 está em tela.
  // Sem isso, o primeiro crossfade (aos ~7s) mostra flash de loading
  // porque as imagens só começam a baixar quando o <Image> monta.
  // React 19 `preload` injeta <link rel="preload" as="image"> no head
  // e deduplica chamadas. Pula sob reduced-motion (rotação desarmada).
  useEffect(() => {
    if (reduce) return;
    preload("/photos/hero-02-suspension-dusk.png", { as: "image" });
    preload("/photos/hero-03-greek-alt.png", { as: "image" });
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
  // Narrowing via `in` — `as const` deixa `headlineOffset` apenas no tipo
  // do item 02; união de literais não compartilha a chave, então precisamos
  // desse guard pra TS.
  const activeImage = HERO_GALLERY[index];
  const headlineOffset =
    "headlineOffset" in activeImage ? activeImage.headlineOffset : 0;

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
        {/* Headline display — três linhas editoriais em cascata descendente
            com deslocamento horizontal escalonado. Escala reduzida (~50%
            do valor anterior) para ceder espaço visual à galeria hero.
             - Linha 1 (VIAGENS)      → offset 0
             - Linha 2 (DESENHADAS)   → pl-[4%] mobile, pl-[10%] desktop
             - Linha 3 (À MÃO. italic)→ pl-[8%] mobile, pl-[22%] desktop
            Todas em caixa alta (uppercase herdado do h1). Italic só na
            última. Mesma escala e line-height (0.84) nas três — ritmo
            vem só do translateX + stagger 80ms reforçando a descida
            (spring headlineRise: y:600→0, stiffness 108, damping 30).

            Container externo (motion.div) aplica deslocamento vertical
            reativo por imagem ativa. Quando a rotação chega no hero-02
            (mulher flutuando vertical, figura no centro), o headline
            sobe -100px para liberar a figura. Hero-01 e hero-03 mantêm 0.
            Animação 0.8s easeOut acompanha o crossfade de 1.2s da galeria
            — texto sobe antes da nova imagem completar fade-in, chegando
            na posição quando o novo quadro está nítido. Essa camada é
            independente da timeline de entrada inicial (y:600→0 spring
            aplicada a cada <motion.span>). */}
        <div className="flex flex-1 items-center w-full">
          <motion.div
            animate={{ y: headlineOffset }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <motion.h1
              className="font-display text-[clamp(36px,7vw,100px)] font-light uppercase leading-[0.84] tracking-[-0.04em] text-bg w-full"
              aria-label="Viagens desenhadas à mão"
            >
              <motion.span
                initial={{ y: 600, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  ...springs.headlineRise,
                  delay: heroDelays.headline,
                }}
                className="block"
              >
                Viagens
              </motion.span>
              <motion.span
                initial={{ y: 600, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  ...springs.headlineRise,
                  delay: heroDelays.headline + 0.08,
                }}
                className="block pl-[4%] md:pl-[10%]"
              >
                desenhadas
              </motion.span>
              <motion.span
                initial={{ y: 600, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  ...springs.headlineRise,
                  delay: heroDelays.headline + 0.16,
                }}
                className="block italic font-light pl-[8%] md:pl-[22%]"
              >
                à mão.
              </motion.span>
            </motion.h1>
          </motion.div>
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
            <TallyButton
              formId="vGx2xv"
              className="font-display text-[32px] font-light leading-none tracking-[-0.02em] text-bg md:text-[40px]"
            >
              Agendar conversa →
            </TallyButton>
          </motion.div>
        </div>
      </div>

      {/* Coordenada/assinatura canto — detalhe Low Tide */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springs.editorial, delay: heroDelays.editorial + 0.1 }}
        className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.22em] text-bg/60 md:bottom-7"
      >
        01 | Belo Horizonte — Mundo
      </motion.div>
    </section>
  );
}
