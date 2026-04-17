import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {/*
          Próximas seções entram aqui após aprovação da estrutura.
          Reservas:
            - <Manifesto id="manifesto" />
            - <Metodo id="metodo" />
            - <Flavia id="flavia" />
            - <Filosofia id="filosofia" />
            - <Portfolio id="portfolio" />
            - <Contato id="contato" />
        */}
        <section
          id="placeholder"
          className="flex h-[60svh] items-center justify-center border-t border-line bg-bg px-10"
        >
          <p className="max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-text-muted">
            (próximas seções aguardando aprovação da estrutura — ver mensagem do
            agente)
          </p>
        </section>
      </main>
    </>
  );
}
