import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

/**
 * Underline hover de duas barras (contrato Futrue).
 * Barra 1: width fixa. Barra 2: 0% → 110% no hover, ~260ms.
 *
 * Aceita `onClick` pass-through — usado por componentes que precisam
 * reagir ao clique (fechamento do menu Nav, interceptação de âncora
 * para scroll Lenis etc.). O click nativo do link segue funcionando
 * a menos que o handler chame preventDefault.
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
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {inner}
    </Link>
  );
}
