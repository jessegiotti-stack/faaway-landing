import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { MotionRoot } from "@/components/MotionRoot";

/**
 * Tipografia (primeira execução — ver direction-faaway.md):
 *  - Display: Fraunces (variable, Google Fonts) — peso 300, opsz alto, tracking apertado
 *  - Body:    Inter Tight (Google Fonts)
 *  - Mono:    JetBrains Mono — voz autoral em rótulos, asides, numeração
 *
 * TODO eventual: trocar Fraunces por Kepler/Canela/GT Sectra Condensed via Adobe Fonts.
 */
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fa.Away — Consultoria de viagens",
  description:
    "Roteiros desenhados para quem entende viagem como autoria. Consultoria boutique de luxo por Flávia Werneck.",
  metadataBase: new URL("https://faaway.com"),
  openGraph: {
    title: "Fa.Away — Consultoria de viagens",
    description: "Viagens feitas à mão. Por Flávia Werneck.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-svh bg-bg text-text antialiased">
        <MotionRoot>
          <LenisProvider>{children}</LenisProvider>
        </MotionRoot>
      </body>
    </html>
  );
}
