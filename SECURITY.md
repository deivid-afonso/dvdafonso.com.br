# Segurança

## Comunicação responsável

Não publique credenciais, tokens, senhas ou informações privadas em issues ou pull requests.

Para reportar uma vulnerabilidade, entre em contato pelo e-mail `contato@dvdafonso.com.br` com:

- descrição do problema;
- impacto potencial;
- passos para reproduzir;
- evidências mínimas, sem dados pessoais.

O site não armazena mensagens do formulário. O endpoint PHP valida os dados e encaminha o conteúdo por e-mail.

## Proteções do projeto

- Branch `main` protegida contra push direto.
- Pull requests e validações automatizadas.
- CodeQL para JavaScript.
- Gitleaks para detecção de segredos versionados.
- Dependabot para atualizar GitHub Actions.
- Credenciais de deploy somente em GitHub Secrets.
