# Dayle Games

Dayle Games é uma aplicação web construída com Next.js para descoberta, busca e navegação de jogos. O projeto consome uma API externa de catálogo, destaca um jogo do dia, exibe cards de recomendação, permite busca por título e possui uma área de perfil com cards de jogos favoritos.

## Demonstração

O repositório não contém URL de deploy pública registrada.

Uma prévia visual do projeto está disponível em [public/preview.png](public/preview.png).

## Tecnologias Utilizadas

- Next.js 15 com App Router
- React 19
- TypeScript
- Tailwind CSS v4
- React Icons
- next/image e next/link
- next/font com Geist e Geist Mono
- Fetch nativo do Next.js com revalidação de cache

## Funcionalidades

- Exibição de um jogo em destaque na página inicial
- Listagem de jogos com cards clicáveis
- Busca de jogos por título
- Página de detalhes do jogo com descrição, plataformas, categorias e data de lançamento
- Metadata dinâmica para SEO e compartilhamento social
- Área de perfil com cards de favoritos e ação de busca interna por jogo
- Imagens remotas otimizadas via `next/image`

## Arquitetura

O projeto segue a estrutura do App Router do Next.js e separa responsabilidades entre rotas, componentes reutilizáveis e utilitários de tipo.

### Organização de pastas

- `src/app` concentra as rotas, layouts e páginas do sistema.
- `src/app/page.tsx` é a home e atua como página principal de descoberta.
- `src/app/game/[id]/page.tsx` renderiza o detalhe de um jogo específico.
- `src/app/game/search/[title]/page.tsx` trata a busca por título.
- `src/app/profile/page.tsx` representa a área de perfil do usuário.
- `src/components` reúne componentes compartilhados como header, container, input e game card.
- `src/utils/types/game.ts` define o contrato de dados do jogo usado em toda a interface.

### Fluxo da aplicação

1. O layout global carrega a tipografia, o header e os metadados base.
2. A home consulta a API externa para buscar o jogo do dia e a lista principal de jogos.
3. O componente de busca redireciona para a rota dinâmica de pesquisa por título.
4. A página de detalhes carrega o jogo por ID e também busca uma recomendação adicional.
5. A área de perfil exibe cards de favoritos com interação local em cliente.

### Padrões utilizados

- Componentização reutilizável para elementos de interface recorrentes
- Server Components nas páginas que consomem API
- Client Components apenas quando há estado local ou interação, como busca e favoritos
- Roteamento dinâmico por parâmetros na URL
- Metadata dinâmica para SEO e preview social

### Separação de responsabilidades

- Páginas: composição de tela e integração com dados
- Componentes: UI reutilizável
- Tipos: contrato de dados e consistência de payload
- Configurações: imagens remotas, fontes e metadados globais

## Rotas

- `/` página inicial com jogo em destaque e listagem geral
- `/game/[id]` página de detalhes do jogo
- `/game/search/[title]` resultados da busca por título
- `/profile` área de perfil e favoritos

Observação: o header referencia `/games`, mas não há rota correspondente implementada no projeto atual.

## APIs e Backend

Este projeto não possui backend próprio, rotas de API internas nem camada de persistência local. O conteúdo é obtido de uma API externa hospedada em `https://sujeitoprogramador.com`.

Endpoints consumidos:

- `GET /next-api/?api=game_day` para obter o jogo do dia
- `GET /next-api/?api=games` para obter a listagem principal
- `GET /next-api/?api=game&id={id}` para detalhes por ID
- `GET /next-api/?api=game&title={title}` para busca por título

## Banco de Dados

Não há banco de dados local, ORM ou migrations neste repositório. Toda a base de jogos vem da API externa consumida pelo frontend.

## Segurança

O projeto é uma aplicação frontend/SSR simples e não implementa autenticação, autorização, JWT, rate limiting, hashing ou middlewares de segurança próprios.

O que foi encontrado:

- Validação de imagens remotas permitidas no `next.config.ts`
- `robots` e `openGraph` configurados em metadados para SEO e compartilhamento
- Uso de variáveis de ambiente para separar URL da API e URL pública do projeto

O que não existe no código atual:

- Login e gerenciamento de sessão
- Controle de acesso por perfil ou permissões
- Proteção de rotas autenticadas
- Camada de segurança de API própria

## Variáveis de Ambiente

O projeto usa um arquivo `.env.local` com as seguintes variáveis:

```env
NEXT_API_URL=https://sujeitoprogramador.com
PROJECT_URL=http://localhost:3000
```

Finalidade:

- `NEXT_API_URL`: base URL da API externa de jogos
- `PROJECT_URL`: URL base usada na metadata para gerar imagem de preview

## Dependências

### Dependências de produção

- `next`: framework principal da aplicação
- `react`: biblioteca de UI
- `react-dom`: integração do React com o DOM
- `react-icons`: ícones usados na interface

### Dependências de desenvolvimento

- `typescript`: tipagem estática
- `tailwindcss`: utilitários de estilo
- `@tailwindcss/postcss`: integração do Tailwind com PostCSS
- `@types/node`, `@types/react`, `@types/react-dom`: tipagens

## Scripts

O `package.json` contém os seguintes scripts:

```bash
npm run dev    # inicia o servidor de desenvolvimento
npm run build  # gera a build de produção
npm start      # executa a aplicação após o build
```

## Instalação

```bash
git clone <URL_DO_REPOSITORIO>
cd daylegames
npm install
npm run dev
```

Depois disso, acesse [http://localhost:3000](http://localhost:3000).

## Configuração

Antes de executar o projeto, verifique se o arquivo `.env.local` existe na raiz do projeto com os valores esperados.

Se quiser alterar o host da API ou a URL pública usada nos metadados, ajuste:

```env
NEXT_API_URL=https://sujeitoprogramador.com
PROJECT_URL=http://localhost:3000
```

## Docker

Não há Dockerfile nem `docker-compose` no estado atual do repositório.

## Observações Técnicas

- O projeto usa renderização no servidor em várias páginas para buscar dados antes do envio ao cliente.
- As páginas com interatividade local usam `use client` apenas onde há estado e eventos.
- As imagens externas foram liberadas explicitamente em `next.config.ts` para o domínio `sujeitoprogramador.com`.
- O projeto está tipado com TypeScript em modo estrito.

## Estrutura Resumida

```text
src/
  app/
    page.tsx
    layout.tsx
    globals.css
    game/
      [id]/page.tsx
      [id]/components/label/index.tsx
      search/[title]/page.tsx
    profile/page.tsx
    profile/components/favorite/index.tsx
  components/
    container/index.tsx
    gameCard/index.tsx
    header/index.tsx
    input/index.tsx
  utils/
    types/game.ts
```

## Público-Alvo

Este README foi organizado para facilitar a leitura de recrutadores e desenvolvedores, destacando arquitetura, escopo técnico, dependências e forma de execução.

## Melhorias Futuras

- Implementar uma rota `/games` para alinhar com o link do header
- Criar tratamento de estados de carregamento e erro
- Adicionar autenticação e persistência para favoritos
- Introduzir testes automatizados e linting no fluxo de CI
- Evoluir o projeto para consumir uma camada própria de backend, se necessário