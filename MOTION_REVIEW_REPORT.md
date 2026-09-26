# Life OS Landing — revisão P2 e Premium Dynamic

Data: 26/09/2026. Projeto: `C:\life_os_landing`.

Os dois P2 foram corrigidos. A evolução Premium Dynamic preserva a arquitetura Next.js, a composição aprovada, os tokens e a copy. A rodada terminou com os cinco comandos obrigatórios aprovados e os dois estados SEO verificados em builds locais de produção. Nenhum commit foi realizado; a versão está pronta para revisão humana.

## Correções

1. **Causa raiz do menu:** o painel dentro do header fixo não limitava sua altura ao espaço disponível nem oferecia rolagem própria. Em landscape baixo, o fim da navegação ficava fora da tela; rolar a página não resolvia.
2. **Solução:** header em coluna flex, limitado por `100dvh`, com fallback `100vh`; linha superior sem encolhimento e painel com `min-height: 0`, altura máxima calculada a partir da viewport e do header, `overflow-y: auto` e contenção de overscroll. Safe areas entram nos cálculos e paddings. O botão de fechar permanece na linha superior, fora da região rolável. Escape e seleção de links devolvem o foco ao botão com `preventScroll`. Clique externo respeita o foco do alvo clicado. Não existe altura de painel específica para os dois casos da auditoria.
3. **Arquivos da correção:** `src/components/layout/header.tsx`, `src/app/globals.css`, `scripts/verify-browser.mjs`. A lista completa da rodada está no item 36.
4. **568×256: PASS.** O painel cabe abaixo do header de 74 px, com aproximadamente 182 px disponíveis antes da borda. Há rolagem interna; o último item é alcançável. Abertura por teclado, fechamento, Escape, foco, Tab com item rolado para dentro da região visível, wheel e swipe por toque foram aprovados. O botão de fechar permanece visível durante o scroll. Sem overflow horizontal.
5. **568×320: PASS.** Aproximadamente 246 px disponíveis abaixo do header. O conteúdo excedente rola dentro do menu. Os mesmos testes de teclado, foco, fechamento, acesso ao fim e limites do painel passaram. O swipe adicional foi exercitado no caso mais restrito, 568×256.
6. **Causa raiz SEO:** o estado com URL pública usava `Disallow` para páginas que também tinham `noindex`. Isso impedia o crawler de ler a instrução de indexação no HTML. A distinção segue a [documentação do Google sobre noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing).
7. **Solução:** com origem pública, o robots permite crawling de todas as rotas. As quatro páginas institucionais continuam com `noindex` e fora do sitemap. Esses três controles são independentes. Sem origem, a pré-publicação continua conservadora. Não houve mudança de conteúdo jurídico.
8. **Robots sem URL — cenário A:**

   ```text
   User-Agent: *
   Disallow: /
   ```

   Home com `noindex`, sem canonical, JSON-LD ou origem social presumida. Sitemap sem URLs.
9. **Robots com URL fictícia — cenário B:**

   ```text
   User-Agent: *
   Allow: /

   Sitemap: https://life-os-landing.test/sitemap.xml
   ```

   `https://life-os-landing.test` existe apenas no ambiente dos processos de teste; não foi gravado em `.env` nem na configuração pública normal. A suíte valida canonical da home, metadata, Open Graph, imagem social e JSON-LD `WebSite`, limitado aos campos permitidos. O teste utiliza exclusivamente servidores locais; não acessa esse domínio.
10. **Noindex: PASS nos dois cenários.** `/privacy`, `/terms`, `/support` e `/account-deletion` retornam HTTP 200 e incluem `noindex` no HTML entregue a uma requisição com user agent Googlebot. No cenário B, cada canonical institucional usa a origem fictícia. A home passa a ser indexável somente no cenário com origem.
11. **Sitemap: PASS.** Cenário A: nenhuma URL. Cenário B: somente `https://life-os-landing.test/`. As quatro rotas pendentes permanecem ausentes. Imagem social PNG, âncoras locais e resposta 404 também foram verificados.

## Premium Dynamic

12. **Hero:** base `#070B14` preservada, com dois gradientes radiais grandes e de baixa opacidade em `#B026FF` e `#5D0EFF`. Máscaras suavizam as bordas da iluminação. Título, ações e hierarquia permanecem os mesmos.
13. **Ambient glow:** iluminação compartilhada visualmente entre Hero e preview; presença menor nos recursos, concentrada no centro do mapa, um pouco mais presente em AI Companion e retomada no CTA. Offline-first, privacidade e FAQ mantêm sobriedade. Breathing decorativo usa escala máxima `1.035` e pequena variação de opacidade, em ciclos de 12 s, 13 s e 14 s conforme o elemento.
14. **Scroll reveal:** mantido um único Intersection Observer. Padrão: 16 px e 600 ms; pequeno: 8 px e 450 ms; easing `cubic-bezier(.22, 1, .36, 1)`. Sem bounce, rotações ou deslocamentos grandes. Elementos já visíveis na hidratação não são escondidos.
15. **Stagger:** grupos usam 0/85/170/255 ms, reiniciando a sequência nos grupos seguintes. Headings e descrições têm entrada separada. Wrappers dos cards separam o transform de reveal do transform de hover, preservando o bento e evitando conflito entre os efeitos.
16. **Hover:** somente para `hover: hover` e `pointer: fine`. Elevação de 3 px em 225 ms, borda e fundo discretamente mais claros e sombra pequena. O teste mede a elevação e confirma largura/altura estáveis. Mobile não depende de hover.
17. **Spotlight:** não implementado. A iluminação existente já fornece profundidade; acompanhar o cursor acrescentaria listeners e atualizações contínuas sem benefício visual suficiente para esta composição.
18. **Header dinâmico:** mais transparente no topo; após 24 px de scroll, fundo escuro translúcido, blur leve e borda discreta. A altura permanece estável, sem mudança de layout. O menu aberto tem seu próprio estado de fundo.
19. **Tudo Conectado:** centro inicia primeiro; pontos periféricos a partir de 100 ms, linhas em 200 ms e labels a partir de 235 ms, com incrementos pequenos entre nós. Halo central lento em 13 s. O mapa permanece uma representação conceitual de áreas reunidas, sem fluxo de dados animado nem indicação de controle automático entre módulos.
20. **Offline-first:** composição e copy qualificadas preservadas. Reveal pequeno no painel, sem pulsação de sincronização, tráfego simulado ou promessa de sincronização permanente/instantânea.
21. **AI Companion:** glow difuso roxo e entradas pequenas no texto. A relação com Premium, contexto, consentimento e privacidade permanece explícita. O aviso “Visual conceitual · sem análise de dados reais” tem 11 px no mobile e 12 px no desktop. Sem chatbot, robôs, partículas ou novas capacidades.
22. **CTA final:** retoma suavemente os dois tons de iluminação do Hero, em breathing de 14 s. Continua “Em breve no Google Play”, sem URL falsa ou `href="#"`.
23. **Mobile:** bento continua em uma coluna no mobile, duas no tablet e na distribuição aprovada no desktop. O preview tem floating vertical máximo de 4 px em 8 s, em wrapper separado do reveal. Avisos conceituais usam 11–12 px; em 320 px, o label superior pode quebrar para outra linha sem cortar conteúdo. Glows são contidos e não produzem overflow.
24. **Reduced motion: PASS.** Floating, breathing, transições e smooth scroll são removidos. Reveals e partes do mapa ficam imediatamente visíveis. Foram testadas a preferência inicial e a troca em runtime nas duas direções, inclusive conteúdo que ainda estava aguardando entrada.
25. **Sem JavaScript: PASS.** Textos, cards e seções são renderizados no servidor e permanecem visíveis. A classe que oculta conteúdo só é aplicada pelo observer quando apropriado. FAQ nativo com `details/summary` continua abrindo e fechando; o conteúdo não depende das animações.
26. **Performance:** nenhuma dependência adicionada; `package-lock.json` permaneceu intacto. As animações contínuas alteram apenas opacity/transform de elementos decorativos; não animam width, height, top, left ou filtros. O blur do header é estático. Não foram acrescentados eventos de mousemove ou componentes cliente para cada card. O build permanece estático. Não foi realizado benchmark em hardware móvel físico nem medição comparativa de Core Web Vitals; a avaliação de impacto é estrutural e funcional, sem alegação de ganho percentual.
27. **Efeitos considerados e omitidos:** spotlight pelo motivo acima; linhas de sincronização/fluxo pulsantes para evitar sugerir automações ou garantias; parallax e rotações do preview por não agregarem legibilidade. Privacidade tem reveal pequeno e FAQ tem entrada do grupo, mantendo as perguntas estáveis. Não surgiu necessidade de reorganização significativa das seções; nenhuma recomendação estrutural opcional foi necessária.

## Validação

28. **`npm run lint`: PASS**, exit code 0.
29. **`npm run typecheck`: PASS**, exit code 0.
30. **`npm run build`: PASS**, exit code 0. Next.js 16.3.6; todas as rotas geradas como conteúdo estático. Os dois builds separados da suíte também passaram.
31. **`npm run test:browser`: PASS**, exit code 0, nos cenários A e B. O comando agora prepara e encerra servidores próprios, com diretórios de build separados. Restaura os arquivos de configuração/tipos que Next.js atualiza durante builds com `distDir` alternativo; nenhuma origem de teste vaza para o desenvolvimento normal. Evidências em `artifacts/premium-dynamic/prepublication/verification.json` e `artifacts/premium-dynamic/public-origin/verification.json`.
32. **`npm ls --all`: PASS**, exit code 0, sem dependências inválidas. Saída completa em `artifacts/premium-dynamic-npm-ls.txt`.
33. **Console/runtime: PASS.** Zero erros de console ou página e zero falhas HTTP inesperadas nos dois cenários. Auditoria adicional axe 4.12.1 em 390×844 e 1440×1000 encontrou zero violações. Existe uma categoria de contraste inconclusiva por gradientes/pseudo-elementos; isso não foi tratado como aprovação automática de contraste. Foi feita inspeção visual e cálculo dos tokens principais: CTA 4,60:1–7,07:1, texto secundário/surface 6,52:1, Hero 5,92:1 e texto secundário/Premium 6,15:1. JSONs em `artifacts/premium-dynamic/accessibility-mobile.json` e `accessibility-desktop.json`.
34. **Responsividade e inspeção visual: PASS.** 568×256, 568×320, 320×568, 390×844, 768×1024, 1440×1000 e 1920×1080. Suíte sem overflow horizontal e com limites das seções verificados. Capturas e inspeção de Hero, preview, bento, mapa, offline, AI Companion, privacidade, Free/Premium, FAQ, CTA e footer; glows refinados para eliminar limites retos perceptíveis. Capturas isoladas das seções ocultam o header apenas durante a captura para não encobrir o conteúdo; testes funcionais continuam com o header presente. Navegadores locais Chromium/Edge, incluindo emulação de toque; não é uma certificação em dispositivos físicos ou em todos os engines.
35. **Git:** `No commits yet on main`. Arquivos continuam não rastreados porque o projeto ainda não recebeu o primeiro commit. `git remote -v` não retorna entradas; `.vercel` não existe. Como não havia commit base para diff, a lista da rodada foi obtida comparando SHA-256 dos arquivos com o inventário salvo antes das alterações em `artifacts/round-2-baseline.json`. `next-env.d.ts` voltou ao estado original. O relatório histórico `REVIEW_REPORT.md` não foi alterado.
36. **Lista completa de alterações de código/documentação nesta rodada:** 18 arquivos existentes modificados e 2 novos:

   | Arquivo, relativo a `C:\life_os_landing` | Alteração |
   | --- | --- |
   | `.gitignore` | Ignorar builds isolados da suíte |
   | `README.md` | Documentar motion, menu e testes SEO em dois estados |
   | `eslint.config.mjs` | Ignorar artefatos gerados dos builds de teste |
   | `next.config.ts` | Separar diretórios de build somente para os dois cenários de teste |
   | `package.json` | Novo comando orquestrado de browser e comando para servidor atual |
   | `scripts/verify-browser.mjs` | Cobertura de menu baixo, toque, motion, SEO A/B e evidências visuais |
   | `src/app/globals.css` | Menu limitado/rolável, glows, timings, hover, mapa e labels |
   | `src/app/robots.ts` | Permitir crawling no estado com origem pública |
   | `src/components/layout/header.tsx` | Fechamento e restauração de foco |
   | `src/components/sections/ai-companion.tsx` | Classe ambiental e reveal pequeno |
   | `src/components/sections/connected-life.tsx` | Reveal em etapas no mapa |
   | `src/components/sections/faq.tsx` | Reveal pequeno no grupo nativo |
   | `src/components/sections/features.tsx` | Wrappers e stagger sem mudar a grade aprovada |
   | `src/components/sections/offline-first.tsx` | Reveal pequeno |
   | `src/components/sections/privacy.tsx` | Reveal pequeno |
   | `src/components/sections/product-preview.tsx` | Wrapper de floating independente |
   | `src/components/ui/section.tsx` | Heading e descrição com reveals separados |
   | `tsconfig.json` | Excluir tipos dos dois builds de teste |
   | `scripts/test-browser.mjs` — novo | Builds/servidores locais A/B, logs e restauração da configuração |
   | `MOTION_REVIEW_REPORT.md` — novo | Este relatório da rodada |

   Evidências regeneráveis e ignoradas pelo Git: logs, JSONs e PNGs em `artifacts/premium-dynamic/`, a árvore npm e o inventário de hashes. Diretórios `.next/` e `.next-test-*` contêm somente resultados gerados. Nenhum desses resultados foi adicionado ao Git.

## Isolamento e entrega

As alterações de projeto ficaram exclusivamente em `C:\life_os_landing`. `C:\life_os` e `C:\life_os\backend` permaneceram intactos; Flutter e `life-os-backend` não foram alterados. Não foi criado backend, formulário funcional, analytics, Firebase ou autenticação. Não foram adicionados preços, promessas, depoimentos, domínio público ou URL de loja.

Nenhum `.vercel`, remote, commit, push ou deploy. Nenhuma conexão à Vercel. A página pode ser revisada em `http://127.0.0.1:3000`. Trabalho encerrado para revisão humana antes do primeiro commit.
