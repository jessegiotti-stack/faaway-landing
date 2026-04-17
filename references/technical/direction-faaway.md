# Direção de Arte — LP Institucional Fa.Away

> Documento consolidado e travado em 2026-04-16. Autossuficiente para Claude Code executar build sem clarificações.

---

## Cliente e produto

LP institucional Fa.Away. Consultoria boutique de luxo, modelo fee-based. Serviço: viagens personalizadas com acompanhamento cuidadoso e atenção ao detalhe. Flávia Werneck como consultora especializada. Aspiração: território boutique de luxo editorial, operação autoral fee-based. Lema: *"fazer à mão"*.

## Função da LP

Apresentação institucional da agência e da consultora. **Não é campanha de produto específico** — é identidade.

## Antagonistas estéticos (a LP NÃO pode parecer)

- *Luxo clichê dourado/preto:* paleta preto+dourado, Didone ultra-contrastada, fotografia de champagne e piscinas infinitas, vocabulário "exclusive/bespoke".
- *Travel planner genérico moderno:* branco puro, sans-serif limpa, fotos stock de mochilas e passaportes, paleta terrosa safe, ícones minimalistas de avião, estética Squarespace.
- *Boutique hotel institucional europeu pleno (secundário):* sépia/creme, serifa clássica centralizada, ritmo lento frio, Aman/Belmond institucional integral.
- *Travel content creator feminino:* paleta pêssego/rosé/creme, script ou serifa delicada fina, vibe Pinterest.

## Semente conceitual — "fazer à mão"

Evocar artesania, curadoria manual, marca do autor — SEM literalismo. Nada de texturas de papel, handwriting falso, elementos "craft". "Fazer à mão" aparece no rigor da composição, no cuidado com cada detalhe de espaço e tipografia, na assinatura estética que afirma autoria. É o oposto de template.

---

## Corpo estético

**Território:** naturalismo contemplativo brasileiro contemporâneo (referências de mood: Studio Cajú e ATUM). Paisagem e atmosfera dessaturadas, grão cinematográfico, silêncio editorial, respiração generosa de espaço.

### Vetores de autoria (três dominantes, coordenados)

**1. Tipografia como provocação.** Serifa condensada em caps em escala muito grande no hero. Peso leve (light/thin). Line-height comprimido (80–90%). Letter-spacing negativo (-0.02 a -0.04em). A tipografia carrega peso autoral sem precisar de acento de cor. Dupla tipográfica: serifa condensed (espírito Kepler Std Condensed Display, Canela Condensed, GT Sectra Display) para display + monospace editorial (espírito Commuters-Sans, GT America Mono, JetBrains Mono) como voz autoral em asides, numeração e rótulos.

**2. Composição assimétrica como afirmação.** Grid deliberadamente assimétrico. Alinhamentos variados entre seções — às vezes esquerda, às vezes direita, às vezes fora-de-centro. Uso ousado de espaço vazio. Evitar centralização safe. A composição é quem afirma "design studio aplicado a luxo travel".

**3. Fotografia como âncora atmosférica.** Fotografia curada pelo cliente. Tratamento: editorial, grão cinematográfico, paisagem e atmosfera. Operar com o que chegar — não aplicar filtros CSS pesados; se a foto é boa, ela carrega sozinha.

### Regra operacional de curadoria fotográfica (estabelecida 2026-04-16)

**Aceitar:** figura humana em pausa íntima, detalhe curado, gesto contemplativo, paisagem como protagonista, naturalismo dessaturado.

**Rejeitar:** ícone de luxo ostensivo no fundo (iate, helicóptero, resort tropical reconhecível, montanha-cartão-postal de brochure), travel planner Squarespace, tropical genérico sem moldura autoral.

---

## Referências

### Contrato técnico — movimento
- *Futrue (futrue.framer.website):* timing/springs do hero, underline hover, menu blur. Ver bloco "Movimento" abaixo.

### Contrato parcial — sistema editorial
- *Low Tide (lowtide.co):* numeração "01.", setas "→", parênteses mono, pipes "|", em-dash "—". Wordmark como SVG dedicado.

### Mood atmosférico
- *Studio Cajú* + *ATUM* (mood dominante): naturalismo brasileiro, paisagem dessaturada com grão.
- *Puli* (pontual): temperatura âmbar/penumbra apenas em UMA seção se narrativa pedir.
- *Aman* (parcial): rigor de diagramação editorial texto-imagem em seções internas.

### Referências descartadas
- *Maria Bowler / Low Tide print Pinterest:* desfigurada (rebrand). **Amarelo neon NÃO entra na paleta.**

---

## Vocabulário visual

### Tipografia (escolhas para primeira execução)

- **Display:** Fraunces (Google Fonts, variable). Peso 300, opsz 144, tracking -0.035em, line-height 0.85, uppercase. *TODO swap eventual:* Kepler/Canela/GT Sectra Condensed via Adobe Fonts se Typekit estiver disponível.
- **Body:** Inter Tight (Google Fonts). Pesos 300/400/500.
- **Mono autoral:** JetBrains Mono (Google Fonts). Caps com tracking 0.04em em rótulos; caixa mista em parênteses.

### Paleta (hex calibrados)

| Token | Hex | Uso |
|-------|-----|-----|
| `--bg` | `#F2EDE4` | Off-white quente, fundo dominante |
| `--bg-deep` | `#1B1810` | Sombra escura, fundos pontuais e overlays |
| `--text` | `#2A2218` | Marrom-sombra near-black com temperatura (texto principal) |
| `--text-muted` | `#5C4F3D` | Texto secundário, asides |
| `--line` | `rgba(42,34,24,0.16)` | Divisores, bordas sutis |
| `--moss` | `#3F4A35` | Verde-musgo profundo (acento natural) |
| `--amber` | `#7A5A2E` | Penumbra quente pontual (UMA seção apenas) |
| `--cream` | `#D9CFB8` | Bege úmido, blocos secundários |

**Sem amarelo neon. Sem dourado. Sem branco puro #FFF dominante. Sem #000 puro como texto.**

### Tratamento fotográfico
- Sem filtros CSS pesados (grayscale integral, sépia heavy, contraste exagerado).
- Aceitar grão e temperatura originais.
- Verticais 4:5 e 2:3 prioritárias. Border-radius: 0.

### Densidade de espaço
- Generosa. Texto ocupa proporção pequena, imagem e vazio dominam.

### Detalhes editoriais (Low Tide)
- Numeração "01.", "02." prefixando seções e nav.
- Setas "→" ao fim de labels caps e CTAs.
- Parênteses mono como aside autoral, uso comedido.
- Pipes "|" em micro-copy de header.
- Em-dash "—" em body.
- Wordmark Fa.Away: SVG/PNG dedicado, não H1 de texto.

---

## Movimento (contrato Futrue)

### Scroll global
Lenis 1.1.9 no `<html>`, modo pass-through. Amortização sutil. Sem snap, sem parallax, sem scroll-jacking.

### Hero — timeline orquestrada (~1.8s total)

| t | elemento | propriedade | spring/transição |
|---|----------|-------------|------------------|
| 0.0s | imagem fundo | scale 1.4 → 1.0 | spring stiffness 173, damping 65, mass 1 |
| 0.0s | header (wordmark + nav) | opacity 0 → 1 | spring bounce 0.2, duration 0.4 |
| 0.0s | headline display | y 600 → 0 | spring stiffness 108, damping 30, mass 1 |
| 0.6s | card secundário (omitir se hero limpo) | scale 0.85 → 1 | spring stiffness 242, damping 59, mass 1 |
| 1.5s | subtitle/tag editorial | opacity 0 → 1 | spring stiffness 140, damping 53, mass 1 |
| 1.8s | CTA principal | opacity 0 → 1 | spring bounce 0.2, duration 0.4 |

### Hover em CTAs
Underline de duas barras de 1px:
- Barra 1: width fixa = texto.
- Barra 2: 0% → 110% width no hover, ~250ms.

### Menu de navegação
Painel `backdrop-filter: blur(20px)` sobre `rgba(255,255,255,0.2)`. Ancorado top-left, padding 20px do viewport. Sobreposição sem empurrar. Abertura <300ms.

### Seções internas
- Sem reveals agressivos.
- Revelações pontuais (números grandes, citações): fade curto opacity 0 → 1 em 0.4s.

### NÃO implementar
Cursor custom. Parallax scroll-linked. Split-text char/word. Ticker/marquee. Cards 3D / WebGL / canvas. Page transitions hard route. Buy button flutuante. Skeletons / shimmers / pulses em loop.

---

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind v4 (PostCSS plugin)
- Framer Motion (motion namespace)
- Lenis 1.1.9
- Hospedagem: Netlify
- Versionamento: Git (repo dedicado `faaway-landing`)
