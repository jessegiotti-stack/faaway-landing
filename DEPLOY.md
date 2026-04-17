# Deploy

Documentação da configuração de deploy contínuo (CD) do projeto `faaway-landing`.

## Repositórios e URLs

- **Repositório GitHub:** https://github.com/jessegiotti-stack/faaway-landing
- **Site em produção (Netlify):** https://faaway-landing.netlify.app
- **Dashboard Netlify:** https://app.netlify.com/projects/faaway-landing

## Fluxo de CD

O deploy é disparado automaticamente pelo Netlify a cada push na branch `main`:

1. `git push origin main` (ou merge de PR em `main`)
2. Netlify detecta o push via webhook do GitHub
3. Netlify clona o repositório em infraestrutura própria
4. Executa `npm install` e o build command configurado
5. Publica o resultado na URL de produção

Não há etapa de upload manual — todo o build roda remoto na infra do Netlify.

## Como parar o auto-deploy

Se for necessário pausar os deploys automáticos (ex: durante manutenção ou freeze de release):

1. Acesse o dashboard: https://app.netlify.com/projects/faaway-landing/deploys
2. Clique no botão **Lock to stop auto publishing**
3. Para retomar, clique em **Unlock** na mesma tela

Enquanto travado, commits em `main` continuam gerando builds, mas não são promovidos para a URL de produção automaticamente.

## Configuração de build

| Item | Valor |
| --- | --- |
| Branch de deploy | `main` |
| Base directory | (raiz do repositório) |
| Build command | `npm run build` |
| Publish directory | `.next` |
| Runtime | Next.js (auto-detectado pelo Netlify) |
| Plugin | `@netlify/plugin-nextjs` (instalado e ativo) |

As configurações são definidas no `netlify.toml` na raiz do projeto e refletidas no dashboard do Netlify em **Project configuration → Build & deploy**.

## Data da configuração inicial

17 de abril de 2026.

## Avisos pendentes

Itens conhecidos que **ainda não estão prontos para produção real** — o deploy atual serve como staging funcional, não como release final:

- **Assets não otimizados para produção:** imagens e mídia no repositório ainda não passaram por pipeline de otimização (compressão, formatos modernos como AVIF/WebP, responsive srcset). Tamanho de payload está acima do ideal.
- **Responsivo mobile não validado:** layout foi desenvolvido priorizando desktop. Breakpoints e comportamento em viewports menores (< 768px) precisam de QA visual e correções antes de divulgação pública.
- **Copy ainda placeholder:** textos das seções são rascunhos/lorem, sujeitos a revisão editorial. Não utilizar o site atual como referência para conteúdo final.
