import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Flavia } from "@/components/Flavia";
import { Metodo } from "@/components/Metodo";
import { Marquee } from "@/components/Marquee";
import { Filosofia } from "@/components/Filosofia";
import { ViagemFaAway } from "@/components/ViagemFaAway";
import { Contato } from "@/components/Contato";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Flavia />
        <Metodo />
        <Marquee />
        <Filosofia />
        <ViagemFaAway />
        <Contato />
      </main>
    </>
  );
}
