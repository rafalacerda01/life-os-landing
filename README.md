# Life OS Landing Page

Este repositório contém **somente a landing page do Life OS**. O aplicativo Flutter e o backend são projetos separados. Não modificar `C:\life_os` ou `C:\life_os\backend` durante trabalhos neste repositório.

Diretório oficial: `C:\life_os_landing`. Não é um monorepo. Não há autenticação, banco de dados, SDK do app ou conexão com o backend.

## Desenvolvimento

Requisitos: Node.js compatível com a versão instalada de Next.js (consulte `package-lock.json`) e npm. O ambiente desta execução usa Node 24.

```powershell
npm ci
npm run dev
```

Abrir http://127.0.0.1:3000. Para validar:

```powershell
npm run lint
npm run typecheck
npm run build
npm run start
```

Execute `npm run test:browser` para validar **os dois estados SEO** em builds de produção locais e isolados. O script gera `.next-test-prepublication` sem URL pública e `.next-test-public` com `https://life-os-landing.test`, uma origem reservada exclusivamente a testes. Sobe servidores somente em `127.0.0.1`, em portas livres, e os encerra ao terminar. Não escreve `.env`, não configura domínio e não publica nada. Os caminhos de tipos eventualmente gerados pelo Next.js são restaurados ao fim. Artefatos ficam em `artifacts/premium-dynamic/`, ignorados pelo Git.

O navegador usa `playwright-core` apenas em desenvolvimento e um Chrome/Edge instalado, sem download adicional. Se necessário, configure `BROWSER_EXECUTABLE_PATH` ou `BROWSER_CDP_URL`. Para inspecionar somente um servidor já ativo, use `npm run test:browser:current`: `TEST_BASE_URL` indica o servidor e `TEST_SITE_ORIGIN` informa a origem esperada para o SEO (vazia por padrão).

A suíte cobre 568×256, 568×320, 320×568, 390×844, 768×1024, 1440×1000 e 1920×1080. Inclui scroll interno do menu baixo, Tab/Space/Enter/Escape, foco, gestos de toque, FAQ, scroll/reveal, todas as seções, quatro rotas institucionais, conteúdo sem JavaScript, mudança de reduced motion em runtime, canonical, metadata, JSON-LD, robots, sitemap e console/runtime/requisições.

## Arquitetura

- `src/app`: App Router, home, páginas institucionais, metadata, ícone, imagem Open Graph, manifest, robots e sitemap.
- `src/components/layout`: header, footer, container e layout institucional.
- `src/components/sections`: seções independentes da narrativa da home, renderizadas no servidor.
- `src/components/ui`: ícones SVG próprios, marca provisória tipográfica, CTA, primitives de seção e controlador de movimento.
- `src/content/home.ts`: copy de recursos e FAQ.
- `src/lib/site-config.ts`: origem pública, Google Play, preços, contato e redes sociais.
- `src/lib/metadata.ts`: metadata consistente das páginas institucionais.
- `public/mockups`: reservado para assets reais aprovados.

Server Components por padrão. JavaScript próprio do cliente limitado ao header interativo e ao controlador de reveal. O FAQ usa `details`/`summary` nativos. Sem biblioteca de motion ou de componentes. Tailwind 4 configura os tokens de identidade e utilitários; CSS próprio implementa as composições visuais. Manrope é servida por `next/font/local` a partir do subset latino de `@fontsource-variable/manrope`, sem requisição de fonte a terceiros no navegador e com preload/ajuste de fallback.

ESLint 9.39.5 está fixado por compatibilidade: o plugin React atualmente usado por `eslint-config-next` falha com ESLint 10. Há aviso de fim de suporte da série 9 na instalação; acompanhar a atualização desse plugin antes de migrar o lint.

## Movimento e acessibilidade

**Life OS Motion Language: Premium Dynamic.** Um `IntersectionObserver` observa elementos server-rendered marcados com `data-reveal`. O conteúdo nasce visível, inclusive sem JavaScript; somente elementos abaixo do viewport recebem preparação para reveal. Reveal padrão: 16 px/600 ms; pequeno: 8 px/450 ms; easing `cubic-bezier(.22, 1, .36, 1)`. Descrições entram após os títulos; cards têm stagger de 0/85/170/255 ms. Wrappers separam reveal do hover para preservar o timing de ambos sem mudar a distribuição do bento.

Glows difusos iluminam hero/preview, recursos, centro do ecossistema e AI Companion. Breathing entre 12 e 14 s, variação de escala de 3,5%; preview com floating de 4 px em 8 s. Tudo Conectado revela centro, pontos, linhas e labels em etapas, como representação das áreas reunidas — não de automações entre módulos. Offline-first e privacidade usam reveal menor; FAQ mantém interação nativa estável. Hover apenas com pointer preciso, elevação de 3 px/225 ms e glow discreto. Nenhum spotlight por cursor, parallax, partículas ou biblioteca extra de motion.

`prefers-reduced-motion` desativa floating, breathing, transições e scroll suave. O controlador também verifica mudanças dessa preferência em tempo real e remove qualquer preparação de reveal. Header mobile com `aria-expanded`, botão rotulado, Escape e retorno de foco. Header/painel limitados a `100dvh` (fallback `100vh`), faixa superior sem encolhimento, safe areas e `overflow-y: auto`/overscroll contido no painel. Fechar permanece visível em landscape baixo. Foco visível, skip link, headings semânticos e FAQ operável por teclado.

## Dados ainda não confirmados

`googlePlayUrl`, `pricing` e `contactEmail` começam em `null`. Redes sociais começam vazias. O CTA pendente é um texto visual, sem link falso ou botão sem ação. O lançamento inicial é Android; não se anuncia iOS.

O preview e os microelementos são composições **conceituais**, não screenshots do aplicativo. O símbolo tipográfico é provisório, feito para esta landing; confirmar o logo oficial na revisão. Para adicionar screenshots, seguir `public/mockups/README.md` e manter `next/image`, dimensões e `sizes` apropriados.

## SEO e documentos institucionais

`NEXT_PUBLIC_SITE_URL` deve receber **somente a URL real confirmada** no site normal. Não existe domínio presumido. Sem essa configuração, não são emitidos canonical ou structured data com origem inventada; o sitemap é vazio, a home recebe `noindex` e robots bloqueia crawling no estado de pré-publicação. `robots.txt` não é controle de acesso nem substitui `noindex`. A metadata inclui título com template, descrição, locale e cards sociais. A imagem Open Graph é gerada localmente por `next/og`.

Após configurar a URL, a home passa a ter canonical absoluto, sitemap e JSON-LD do tipo `WebSite`, sem avaliações, ofertas ou organização inventadas. `robots.txt` permite crawling de todas as rotas, incluindo as institucionais, para que o crawler possa ler seu `noindex`. Enquanto pendentes, essas páginas continuam fora do sitemap. Quando os documentos forem aprovados, atualizar o conteúdo, retirar o flag `pending` em suas chamadas de `pageMetadata` e incluí-las em `sitemap.ts` conforme a decisão de publicação. [Referência: Google Search Central](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

`/privacy` e `/terms` são estruturas editoriais **sem validade como documentos oficiais**. `/support` ainda não recebe mensagens. `/account-deletion` ainda não recebe ou executa solicitações. Confirmar responsável, canal oficial, procedimento, retenção, prazos e condições antes do lançamento. A estrutura atual não deve ser apresentada à Google Play como uma política ou fluxo de exclusão concluído.

## Deploy e isolamento

**Não houve commit, push, deploy ou conexão com a Vercel nesta primeira execução.** A revisão humana precede essas ações.

O futuro projeto da landing deverá ser independente, com nome lógico desejado `life-os-landing`. Nunca reutilizar ou alterar `life-os-backend`, sua Root Directory, variáveis, aliases ou domínios. Não compartilhar configuração de deploy.

No primeiro deploy autorizado, registrar o nome real do projeto, a URL `*.vercel.app` efetivamente atribuída, a branch de produção e o repositório conectado. Não presumir `life-os-landing.vercel.app`. Um domínio `.com.br` requer autorização explícita.
