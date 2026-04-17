"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UnderlineLink } from "./UnderlineLink";
import { Logo } from "./Logo";
import { springs, heroDelays } from "@/lib/motion";
import { WHATSAPP } from "@/lib/contact";

const NAV_ITEMS = [
  { num: "01", label: "Manifesto", href: "#manifesto" },
  { num: "02", label: "Método", href: "#metodo" },
  { num: "03", label: "Flávia", href: "#flavia" },
  { num: "04", label: "Filosofia", href: "#filosofia" },
  { num: "05", label: "Contato", href: "#contato" },
];

/**
 * Navegação principal — wordmark à esquerda, menu trigger à direita.
 * Painel abre com backdrop-filter blur(20px) ancorado top-left.
 */
export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springs.cta, delay: heroDelays.header }}
        className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 text-text md:px-10 md:py-7"
      >
        {/* Logo oficial — tone light + mix-blend-difference adapta ao
            que estiver atrás (hero foto, bg claro, bg escuro Filosofia). */}
        <Logo tone="light" height={36} className="mix-blend-difference" />

        {/* Menu trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-bg mix-blend-difference"
          aria-expanded={open}
          aria-controls="nav-panel"
        >
          {open ? "Fechar ×" : "Menu →"}
        </button>
      </motion.header>

      {/* Menu panel — top-left blur */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="nav-panel"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed left-5 right-5 top-5 z-50 max-w-[420px] border border-line bg-white/20 p-7 backdrop-blur-[20px] md:left-10 md:top-10 md:p-9"
          >
            <p className="mb-7 font-mono text-[10px] uppercase tracking-[0.18em] text-text/60">
              (navegação)
            </p>
            <ul className="space-y-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.num} className="flex items-baseline gap-4 text-text">
                  <span className="font-mono text-[11px] tracking-[0.08em] text-text/50">
                    {item.num}.
                  </span>
                  <UnderlineLink
                    href={item.href}
                    className="font-display text-[28px] font-light leading-none tracking-[-0.025em] md:text-[34px]"
                  >
                    {item.label}
                  </UnderlineLink>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex items-center justify-between border-t border-line pt-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text/60">
                Belo Horizonte | MG
              </span>
              <UnderlineLink
                href={WHATSAPP.url}
                external
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-text"
              >
                WhatsApp →
              </UnderlineLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
