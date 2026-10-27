# Histórico do projeto dvdafonso.com.br

Registro consolidado das decisões, implementações, validações e próximos passos do site pessoal de Deivid Afonso.

> **Segurança:** senhas, tokens, secrets do GitHub e credenciais de e-mail/FTP não são registrados neste documento. Eles devem permanecer somente nos secrets da hospedagem ou do GitHub.

## 1. Objetivo

Criar e publicar um site pessoal profissional para [dvdafonso.com.br](https://dvdafonso.com.br), com:

- apresentação profissional baseada no currículo atualizado;
- portfólio de projetos e experiências;
- contato por formulário, e-mail, telefone e WhatsApp;
- aparência moderna, responsiva e profissional;
- tema escuro padrão e tema claro opcional;
- recursos de acessibilidade;
- SEO técnico;
- código hospedado no GitHub;
- validações automáticas;
- análise de segurança;
- deploy automático para a Hostinger.

## 2. Identidade e conteúdo

O conteúdo foi baseado no currículo atualizado fornecido pelo proprietário do site. A apresentação destaca a atuação como Engenheiro Backend Sênior e a experiência com:

- C# e .NET;
- APIs e integrações;
- AWS e ambientes cloud;
- mensageria e processamento assíncrono;
- Redis;
- SQL Server e Oracle;
- Docker;
- Clean Code e SOLID;
- arquitetura e manutenção de sistemas.

Também foram incluídos:

- projetos e experiências profissionais;
- seção de competências;
- notas de bancada para conteúdos técnicos;
- links para GitHub e LinkedIn;
- telefone e WhatsApp;
- e-mail profissional `contato@dvdafonso.com.br`.

## 3. Evolução visual

### 3.1 Primeira versão

A primeira versão utilizava uma paleta verde-amarelada. Essa direção foi descartada por não atender à preferência visual do proprietário.

### 3.2 Direção editorial

Foi criada uma alternativa com referências editoriais, usando:

- grafite;
- terracota;
- azul petróleo;
- fundo claro;
- composição mais autoral.

Essa etapa também adicionou projetos, experiências, competências e notas técnicas.

### 3.3 Direção atual

Após pesquisa de referências de sites pessoais de desenvolvedores e análise do modelo de developer personal website da Miro, a estrutura foi refinada para:

- tema escuro como padrão;
- carvão como base;
- terracota como cor de destaque;
- azul mineral como cor complementar;
- tema claro opcional;
- hierarquia visual mais forte;
- chamadas para ação mais claras;
- apresentação, projetos, experiência, competências e contato em uma página única;
- layout responsivo para desktop e celular.

O objetivo foi evitar uma aparência genérica de template de inteligência artificial e criar uma identidade mais profissional e pessoal.

## 4. Funcionalidades implementadas

### 4.1 Página principal

- navegação por âncoras;
- seção inicial com apresentação profissional;
- chamadas para contato;
- projetos;
- experiência;
- competências;
- notas técnicas;
- seção de contato;
- links sociais;
- rodapé.

### 4.2 Contato

O formulário envia os dados para `contact.php` e possui:

- validação de campos;
- validação do formato de e-mail;
- proteção por campo honeypot;
- envio da mensagem ao proprietário;
- tentativa de resposta automática ao visitante;
- envio assíncrono pelo JavaScript;
- mensagens de sucesso e erro para o usuário.

O envio real depende do funcionamento do `mail()` e da entregabilidade configurada na Hostinger. A resposta automática no WhatsApp não foi implementada, pois exigiria a WhatsApp Business Platform/API. O link do WhatsApp abre uma conversa com mensagem inicial pré-preenchida.

### 4.3 Acessibilidade

Foram implementados:

- link “Pular para o conteúdo”;
- foco visual para navegação por teclado;
- `aria-label` nos controles;
- `aria-pressed` no controle de tema;
- títulos de ajuda nos botões;
- ícones SVG inline;
- botão de tema com ícones de sol/lua;
- botão para diminuir o texto;
- botão para aumentar o texto;
- três níveis de escala: menor, normal e maior;
- desabilitação dos controles nos limites;
- persistência das preferências no `localStorage`;
- suporte a `prefers-reduced-motion`.

O botão de alto contraste foi removido conforme solicitado. A lógica e os estilos relacionados a `high-contrast` não fazem parte da versão atual.

### 4.4 Idiomas

O JavaScript possui alternância entre português e inglês para os textos previstos na página.

## 5. SEO

Foram adicionados:

- `title` e descrição;
- canonical;
- Open Graph;
- Twitter Cards;
- dados estruturados JSON-LD com `Person`;
- `robots.txt`;
- `sitemap.xml`;
- URLs públicas consistentes;
- conteúdo profissional com termos relacionados à experiência técnica.

Melhorias futuras previstas:

- adicionar dados estruturados `ProfilePage`, `WebSite`, `Article` e `BreadcrumbList`;
- criar páginas individuais para artigos e estudos de caso;
- adicionar favicon;
- adicionar imagem Open Graph profissional;
- cadastrar o domínio no Google Search Console;
- enviar o sitemap ao Google;
- solicitar indexação da página inicial.

## 6. Infraestrutura e publicação

### 6.1 Domínio e DNS

O domínio está registrado no Registro.br e utiliza os nameservers do Cloudflare:

- `jihoon.ns.cloudflare.com`;
- `paris.ns.cloudflare.com`.

Foi decidido manter o DNS no Cloudflare, sem trocar os nameservers para a Hostinger. O domínio deve permanecer associado ao site da Hostinger e possuir os registros necessários apontando para a hospedagem.

Os registros de e-mail existentes, incluindo MX, SPF, DKIM e DMARC, não devem ser removidos ou substituídos durante alterações de DNS.

### 6.2 Hostinger

O site utiliza o plano Cloud Start da Hostinger. A publicação ocorre na pasta:

```text
public_html
```

O deploy usa FTPS na porta 21. O servidor e o usuário FTP ficam configurados nos secrets/variáveis do GitHub e não devem ser documentados em arquivos públicos.

O PHP é necessário para o formulário de contato. Node.js não é necessário no ambiente de produção da Hostinger.

### 6.3 Cache

Foi identificado que o navegador/CDN continuava exibindo arquivos antigos após alterações visuais. Para evitar esse problema, os assets passaram a usar versionamento:

```text
styles.css?v=4
script.js?v=4
```

Esse versionamento forçou a atualização dos arquivos no navegador e resolveu a exibição da interface antiga.

## 7. GitHub e CI/CD

Repositório:

[github.com/deivid-afonso/dvdafonso.com.br](https://github.com/deivid-afonso/dvdafonso.com.br)

Branch de produção:

```text
main
```

O repositório foi configurado com:

- GitHub Actions;
- proteção da branch principal;
- checks obrigatórios de validação;
- CodeQL;
- Dependabot;
- `.gitignore`;
- `SECURITY.md`;
- deploy automático;
- revisão sem exigência de outro aprovador, pois o projeto é mantido por uma única pessoa.

### 7.1 Workflow de validação

O workflow [.github/workflows/validate.yml](./.github/workflows/validate.yml) verifica:

- arquivos obrigatórios;
- sintaxe JavaScript;
- sintaxe PHP;
- testes Playwright;
- validação HTML;
- detecção de secrets com Gitleaks.

### 7.2 Workflow de segurança

O workflow [.github/workflows/codeql.yml](./.github/workflows/codeql.yml) executa análise CodeQL para JavaScript.

### 7.3 Workflow de deploy

O workflow [.github/workflows/deploy.yml](./.github/workflows/deploy.yml):

- executa após push para `main`;
- pode ser acionado manualmente por `workflow_dispatch`;
- usa `SamKirkland/FTP-Deploy-Action@v4.3.5`;
- publica via FTPS;
- envia os arquivos para `/public_html/`;
- depende da variável de habilitação de deploy;
- usa secrets para os dados FTP.

O primeiro deploy falhou porque o usuário FTP ainda não estava configurado. Depois da inclusão do secret, os deploys seguintes foram concluídos com sucesso.

## 8. Testes e validação

### 8.1 Testes locais

Foi criada uma suíte Playwright com seis testes aprovados no último resultado local.

Os testes cobrem:

- carregamento da página inicial;
- navegação;
- idioma português/inglês;
- menu mobile;
- formulário e opções de contato;
- SEO e JSON-LD;
- alternância de tema;
- presença dos ícones;
- aumento real do tamanho do texto;
- redução real do tamanho do texto.

Arquivos principais:

- [tests/e2e/homepage.spec.mjs](./tests/e2e/homepage.spec.mjs);
- [tests/e2e/contact-and-seo.spec.mjs](./tests/e2e/contact-and-seo.spec.mjs);
- [tests/e2e/language-and-responsive.spec.mjs](./tests/e2e/language-and-responsive.spec.mjs);
- [playwright.config.mjs](./playwright.config.mjs).

O servidor local de testes utiliza Python em `127.0.0.1:4173`. O projeto não requer build para abrir a página localmente.

### 8.2 Validação do PHP

Como o PHP não estava instalado diretamente no Windows, a sintaxe foi validada usando PHP 8.3 em Docker.

### 8.3 Testes remotos

Os checks finais confirmados foram:

- Validate website: aprovado;
- CodeQL: aprovado;
- deploy FTPS: aprovado.

O deploy final foi confirmado no workflow `40466559583`.

### 8.4 Correções realizadas durante a validação

- correção de falhas de HTML Validate;
- correção de detecção de secrets;
- ajustes para CodeQL;
- correção dos nomes dos checks obrigatórios;
- remoção de marcador de conflito Git que havia sido inserido no HTML;
- correção do secret de usuário FTP;
- correção de cache por versionamento de assets;
- remoção completa da lógica de alto contraste;
- separação dos controles de aumentar e diminuir texto;
- substituição de caracteres por ícones SVG;
- ajuste dos testes para limpar o `localStorage` antes de validar acessibilidade.

## 9. Estado atual

O projeto está publicado e funcionando com:

- site respondendo em HTTPS;
- interface escura como padrão;
- tema claro opcional;
- ícones de acessibilidade;
- controles de tamanho de texto;
- formulário PHP;
- WhatsApp e telefone;
- SEO técnico inicial;
- GitHub configurado;
- CI/CD configurado;
- CodeQL configurado;
- deploy automático para a Hostinger;
- testes E2E aprovados;
- assets versionados como `v4`.

O último merge relevante foi o PR #11, referente à publicação dos ícones e ajustes finais de acessibilidade.

## 10. Checklist operacional atual

- [x] Domínio registrado e associado ao projeto.
- [x] DNS mantido no Cloudflare.
- [x] Site hospedado na Hostinger.
- [x] Pasta de publicação definida como `public_html`.
- [x] Repositório público criado.
- [x] Branch `main` protegida.
- [x] Validação automática configurada.
- [x] CodeQL configurado.
- [x] Deploy automático configurado.
- [x] Tema escuro padrão publicado.
- [x] Tema claro publicado.
- [x] Alto contraste removido.
- [x] Controles de fonte separados.
- [x] Ícones SVG publicados.
- [x] Testes E2E aprovados.
- [ ] Confirmar envio real do formulário em produção.
- [ ] Confirmar resposta automática do formulário.
- [ ] Configurar Google Search Console.
- [ ] Enviar sitemap ao Google.
- [ ] Criar favicon.
- [ ] Criar imagem Open Graph.
- [ ] Publicar estudos de caso e artigos técnicos.

## 11. Próximos passos recomendados

### Prioridade 1 — validar o contato

Enviar uma mensagem real pelo formulário e confirmar:

1. recebimento em `contato@dvdafonso.com.br`;
2. resposta automática ao visitante;
3. ausência de falhas de entregabilidade;
4. ausência de dados sensíveis na URL.

### Prioridade 2 — Google Search Console

1. Adicionar `dvdafonso.com.br`.
2. Validar o domínio pelo DNS do Cloudflare.
3. Enviar `https://dvdafonso.com.br/sitemap.xml`.
4. Solicitar indexação da página principal.

### Prioridade 3 — presença profissional

Criar:

- favicon;
- imagem Open Graph de 1200 x 630 px;
- estudos de caso de projetos;
- artigos técnicos;
- páginas individuais com URLs indexáveis.

Sugestões de artigos:

- Retry ou fila: como escolher em integrações?
- Boas práticas para APIs .NET em produção.
- Quando usar Redis em uma aplicação backend.
- Como evitar gargalos em integrações com APIs externas.
- Hangfire: quando utilizar processamento em background.

### Prioridade 4 — manutenção

- revisar o Search Console mensalmente;
- acompanhar os PRs do Dependabot;
- manter currículo e projetos atualizados;
- executar os testes antes de cada publicação;
- preservar os secrets fora do código;
- atualizar o versionamento dos assets quando necessário para invalidar cache.

## 12. Arquivos principais

- [index.html](./index.html) — página principal, conteúdo, SEO e controles de acessibilidade.
- [styles.css](./styles.css) — identidade visual, temas, responsividade e acessibilidade.
- [script.js](./script.js) — idioma, menu, tema, escala de texto e formulário.
- [contact.php](./contact.php) — endpoint do formulário.
- [robots.txt](./robots.txt) — regras para rastreadores.
- [sitemap.xml](./sitemap.xml) — sitemap do domínio.
- [README.md](./README.md) — documentação operacional resumida.
- [SECURITY.md](./SECURITY.md) — política de segurança.
- [package.json](./package.json) — scripts e dependências de teste.
- [playwright.config.mjs](./playwright.config.mjs) — configuração dos testes E2E.

## 13. Como publicar uma alteração

Depois de editar o projeto:

```powershell
git add .
git commit -m "Describe the change"
git push
```

O GitHub Actions executará as validações e, após o push para `main`, publicará automaticamente na Hostinger.

Nunca versionar:

- senhas;
- tokens;
- arquivos `.env`;
- credenciais SMTP;
- credenciais FTP;
- dados pessoais desnecessários;
- arquivos locais fora do escopo.

