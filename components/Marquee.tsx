"use client";

import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { revealItem, revealViewport } from "@/lib/motion";

/**
 * Marquee atmosférico — entre seções 04 e 05.
 *
 * Spec C:
 *  - Faixa horizontal contínua, 3 imagens únicas neste momento.
 *  - Direção: direita → esquerda. Loop infinito.
 *  - Velocidade: lenta. Ciclo 80s (~13s por imagem visível) — ajustado para
 *    compensar menor número de quadros sem acelerar a passagem.
 *  - Implementação: Framer Motion via useAnimationFrame + motion value.
 *    Não é CSS animation (precisamos de pause/resume suave).
 *  - Hover: rampa suave de speed 1 → 0 em 0.8s. Mouse out: rampa 0 → 1 em 0.8s.
 *  - Sem overlay, sem caption, sem texto. É puro respiro atmosférico.
 *  - Background neutro #EDE7DC (creme úmido, contraste sutil com bg principal).
 *
 * Curadoria (3 únicas, sem repetição com outras seções):
 *  - marquee-01-greek-bluedoor (2048×1152) — beco grego porta azul.
 *  - marquee-02-chair-coffee (736×920) — cadeira de praia + dois cafés ao
 *    mar prateado. Pinterest scrape, baixa res; em 480×300 fica 2x justo
 *    (necessário 960px nativo, temos 736 — borderline aceito).
 *  - hero-aerial-swimmer (legacy 735×1308) — em 480×300 atende o critério 2x.
 */

const MARQUEE_PHOTOS = [
  { src: "/photos/marquee-01-greek-bluedoor.png", alt: "" },
  { src: "/photos/marquee-02-chair-coffee.png", alt: "" },
  { src: "/photos/hero-aerial-swimmer.jpg", alt: "" },
] as const;

// Dobra para o loop ininterrupto. Reset acontece no ponto onde
// a segunda metade casa exatamente com a primeira.
const TRACK = [...MARQUEE_PHOTOS, ...MARQUEE_PHOTOS];

// Dimensões em px.
const FRAME_WIDTH = 480;
const FRAME_HEIGHT = 300; // ~16:10
const GAP = 48;
const CYCLE_DURATION_S = 80;

// Largura de uma metade (uma cópia completa da galeria, com gaps inclusive
// o gap após a última imagem para emendar com a próxima cópia).
const HALF_WIDTH = MARQUEE_PHOTOS.length * (FRAME_WIDTH + GAP);
const PIXELS_PER_SECOND = HALF_WIDTH / CYCLE_DURATION_S;

export function Marquee() {
  const x = useMotionValue(0);
  const speed = useMotionValue(1);
  const [, setReady] = useState(false);
  const mountedRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  // Pausa o rAF quando o marquee sai do viewport. Margem 100px cria
  // buffer — começa a animar um pouco antes de aparecer e continua
  // um pouco depois de sair, evitando flicker nos limites.
  const inView = useInView(sectionRef, { margin: "100px" });
  const reduce = useReducedMotion();

  // Garantir que useAnimationFrame só roda client-side.
  useEffect(() => {
    mountedRef.current = true;
    setReady(true);
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useAnimationFrame((_t, delta) => {
    // Early exit se: desmontado, reduced-motion, ou fora do viewport.
    // O último caso economiza 60fps de rAF + sub no scroll quando o
    // usuário está no Contato (seção 07) e o marquee (entre 04 e 05)
    // está atrás sem ser visto.
    if (!mountedRef.current || reduce || !inView) return;
    const dx = (delta / 1000) * PIXELS_PER_SECOND * speed.get();
    let next = x.get() - dx;
    // Reset suave quando completou uma metade — o quadro final
    // alinha com o primeiro da segunda metade, salto é invisível.
    if (next <= -HALF_WIDTH) {
      next += HALF_WIDTH;
    }
    x.set(next);
  });

  return (
    <section
      ref={sectionRef}
      aria-hidden
      onMouseEnter={() => {
        if (!reduce) animate(speed, 0, { duration: 0.8, ease: [0.4, 0, 0.2, 1] });
      }}
      onMouseLeave={() => {
        if (!reduce) animate(speed, 1, { duration: 0.8, ease: [0.4, 0, 0.2, 1] });
      }}
      className="relative w-full overflow-hidden bg-[#EDE7DC] py-10 md:py-14"
    >
      {/* Linha editorial superior — micro-rótulo Low Tide.
          Rótulo recebe reveal sutil; o trilho de fotos NÃO entra em stagger
          porque já carrega motion contínuo próprio. */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        variants={revealItem}
        className="group mx-auto mb-8 flex max-w-[1280px] items-baseline gap-4 px-6 md:mb-10 md:px-10"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted transition-colors duration-300 group-hover:text-text">
          (passagem)
        </span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </motion.div>

      <motion.div
        style={{ x }}
        className="flex w-max items-center"
        // gap entre quadros via marginRight em cada child
      >
        {TRACK.map((photo, i) => (
          <div
            key={`${photo.src}-${i}`}
            style={{
              width: FRAME_WIDTH,
              height: FRAME_HEIGHT,
              marginRight: GAP,
              flexShrink: 0,
            }}
            className="relative overflow-hidden bg-bg-deep"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="480px"
              quality={92}
              className="object-cover"
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
