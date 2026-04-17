"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { useLenis } from "./LenisProvider";

/**
 * Underline hover de duas barras (contrato Futrue).
 * Barra 1: width fixa. Barra 2: 0% → 110% no hover, ~260ms.
 *
 * Aceita `onClick` pass-through — usado por componentes que precisam
 * reagir ao clique (fechamento do menu Nav, tracking etc.). O click
 * nativo do link segue funcionando a menos que o handler chame
 * preventDefault.
 *
 * FASE E — interceptação de âncora:
 *  - Se href começa com "#", tenta resolver destino via querySelector
 *    e usa lenis.scrollTo() — scroll suave consistente com a amortização
 *    já aplicada ao wheel. Evita briga entre scroll nativo do browser
 *    e rAF do Lenis (que gerava jank visível).
 *  - Se Lenis não está disponível (reduced-motion, SSR, target ausente),
 *    delega para comportamento nativo: onClick original roda, Link segue
 *    navegação default do Next.js, browser aplica scroll nativo.
 */
type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

export function UnderlineLink({
  href,
  children,
  className = "",
  external = false,
  onClick,
}: Props) {
  const lenis = useLenis();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Delega primeiro ao handler do consumidor (fecha menu, tracking etc.).
    onClick?.(e);

    // Se consumidor chamou preventDefault, respeita.
    if (e.defaultPrevented) return;

    // Intercepta âncoras internas quando Lenis está ativo.
    if (href.startsWith("#") && lenis && typeof window !== "undefined") {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.2 });
        // Atualiza o hash sem disparar scroll nativo — o hashchange event
        // ainda dispara, o que permite ao Nav fechar o painel via listener.
        if (window.location.hash !== href) {
          window.history.pushState(null, "", href);
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        }
      }
    }
  };

  const inner = (
    <span className="group relative inline-block">
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[3px] left-0 h-px w-full bg-current opacity-90"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[3px] left-0 h-px w-0 bg-current transition-[width] duration-[260ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-[110%]"
      />
    </span>
  );

  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={handleClick}>
      {inner}
    </Link>
  );
}
