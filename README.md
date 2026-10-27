# dvdafonso.com.br

Site pessoal de Deivid Afonso, desenvolvido como uma página estática responsiva, com identidade editorial em papel, grafite e terracota. Além do portfólio, a página inclui uma área de notas de bancada para publicar aprendizados curtos sobre arquitetura, performance e IA.

## Estrutura

```text
.
├── index.html                 # Página principal e SEO estruturado
├── styles.css                 # Identidade visual responsiva
├── script.js                  # Idioma, menu e envio assíncrono do formulário
├── contact.php                # Recebe mensagens e envia confirmação automática
├── robots.txt                 # Regras para rastreadores
├── sitemap.xml                # Sitemap para mecanismos de busca
└── .github/workflows/         # Validação automática no GitHub
```

O GitHub funciona como repositório e histórico do projeto. A execução do PHP acontece na Hostinger, não no GitHub Pages.

## Publicação na Hostinger

1. Faça o upload de `index.html`, `styles.css` e `script.js` para a pasta `public_html`.
2. No hPanel, confirme que o domínio `dvdafonso.com.br` está associado à hospedagem.
3. Ative o SSL gratuito e force HTTPS.
4. No Registro.br, use os nameservers informados pela Hostinger ou mantenha o DNS atual e aponte o registro `A` para o IP da hospedagem.
5. Confirme que `robots.txt` e `sitemap.xml` estão na raiz pública e cadastre `https://dvdafonso.com.br/sitemap.xml` no Google Search Console.

O formulário envia para `contact.php`, que valida os dados, encaminha a mensagem para `contato@dvdafonso.com.br` e envia uma confirmação automática ao visitante usando o recurso de e-mail da hospedagem. O arquivo PHP deve ser publicado junto com os demais arquivos. O botão de WhatsApp abre uma conversa com uma mensagem inicial pré-preenchida; automação de resposta no WhatsApp exigiria a WhatsApp Business Platform/API.

## Atualização do site

Depois de editar os arquivos:

```powershell
git add .
git commit -m "Describe the change"
git push
```

Após o push, envie os arquivos atualizados para `public_html` na Hostinger ou configure a implantação Git da Hostinger para este repositório. Nunca versionar senhas, tokens SMTP ou arquivos `.env`.

## Desenvolvimento local

Abra `index.html` no navegador. O projeto não requer build ou dependências.
