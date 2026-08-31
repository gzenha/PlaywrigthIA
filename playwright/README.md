# Playwright — Velo

Cheatsheet de comandos úteis. Use como referência rápida para não esquecer o que cada um faz.

> **Antes de testar a app local:** suba o Vite em outro terminal com `yarn dev` (porta padrão `5173`).

---

## Comandos

### `yarn playwright codegen http://localhost:5173`

Abre o navegador e o **Playwright Inspector** na sua app rodando localmente.

- Clique nos elementos da página para **capturar o seletor** (locator) de cada um.
- O Playwright gera o código do teste automaticamente (cliques, preenchimentos, asserts).
- Use quando estiver escrevendo testes e quiser “pegar” os elementos da tela sem adivinhar o seletor.

**Atalho no projeto:**

```bash
yarn codegen
```

---

### `yarn openprint`

Abre o **relatório HTML** da última execução de testes (`playwright-report/`).

- Só funciona **depois** de rodar `yarn test:e2e` pelo menos uma vez.
- Mostra quais testes passaram/falharam, traces, screenshots e tempo de execução.

```bash
yarn test:e2e      # roda os testes e gera o relatório
yarn openprint     # abre o relatório no navegador
```

---

### `yarn test:e2e`

Roda todos os testes E2E em `playwright/e2e/`.

```bash
yarn test:e2e
```

---

### `yarn test:e2e:ui`

Abre a **UI Mode** do Playwright: roda testes com interface visual, passo a passo, sem depender só do relatório HTML.

```bash
yarn test:e2e:ui
```

---

### `yarn playwright install`

Instala os browsers (Chromium, Firefox, WebKit). Rode na **primeira vez** ou após atualizar o Playwright.

```bash
yarn playwright install
```

---

### `yarn playwright test playwright/e2e/online.spec.ts`

Roda **apenas um arquivo** de teste.

```bash
yarn playwright test playwright/e2e/online.spec.ts
```

---

### `yarn playwright test --headed`

Roda os testes **com o navegador visível** (útil para debug).

```bash
yarn playwright test --headed
```

---

### `yarn playwright test --debug`

Roda em modo **debug**: pausa no Playwright Inspector para inspecionar passo a passo.

```bash
yarn playwright test --debug
```

---

## Estrutura

```
playwright/
├── README.md
├── DESAFIO-CT03.md
├── e2e/
│   ├── configurator.spec.ts   ← CT02 + CT03 (challenge)
│   └── online.spec.ts
└── support/
    ├── fixtures.ts            ← fixture `app`
    └── actions/
        ├── configuratorActions.ts  ← finishConfigurator (não goToCheckout)
        ├── checkoutActions.ts
        ├── heroActions.ts
        └── orderLookupActions.ts
```

Docs do desafio: `docs/tests/` e `docs/prompts/`.  
Configuração global: `playwright.config.ts` (na raiz do projeto).

---

## Adicionar novos comandos

Copie o template abaixo e preencha quando aprender um comando novo:

```markdown
### `yarn SEU_COMANDO_AQUI`

O que faz em uma frase.

Detalhes ou passos extras, se precisar.

\`\`\`bash
yarn SEU_COMANDO_AQUI
\`\`\`
```

**Exemplo:**

```markdown
### `yarn playwright screenshot http://localhost:5173 tela.png`

Tira um screenshot da página e salva como `tela.png`.

\`\`\`bash
yarn playwright screenshot http://localhost:5173 tela.png
\`\`\`
```
