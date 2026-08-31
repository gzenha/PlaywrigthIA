# Code Challenge — CT03 (guia organizado)

## O que entregar

Automatizar **CT03 – Opcionais e cálculo de preço**, depois refatorar com **Feature Actions**.

## Estrutura pronta neste projeto

```
docs/
  tests/
    CT03.md                 ← cenário do desafio (resumo)
    test-cases.md           ← documento completo do professor
  prompts/
    prompt-qa-playwright-automator.md  ← prompt para gerar a 1ª automação
    feature-actions.md                 ← prompt para refatorar com Actions

playwright/
  e2e/
    online.spec.ts          ← teste antigo (pode ignorar no desafio)
    ct03-opcionais.spec.ts  ← SEU arquivo do desafio (preencher)
  support/
    fixtures.ts             ← fixture `app` (já pronta)
    actions/
      configuratorActions.ts  ← aula anterior (reuse/estenda)
      checkoutActions.ts      ← mínimo p/ validar /order no passo 4
  DESAFIO-CT03.md           ← este guia
```

## Passo a passo (ordem do desafio)

### 1. Ler o cenário
- Abra `docs/tests/CT03.md` (ou CT03 em `test-cases.md`).

### 2. Gerar a automação inicial com IA
- Use o conteúdo de `docs/prompts/prompt-qa-playwright-automator.md` como system/prompt.
- Peça: *“Automatize o CT03 conforme docs/tests/CT03.md”*.
- Salve o resultado em `playwright/e2e/ct03-opcionais.spec.ts` (versão “crua”, com `page` direto).

### 3. Rodar e validar
```bash
yarn dev                 # se o webServer do Playwright não subir sozinho
yarn test:e2e playwright/e2e/ct03-opcionais.spec.ts --headed
```

### 4. Refatorar com Feature Actions
- Use `docs/prompts/feature-actions.md` como guia.
- Troque `import { test } from '@playwright/test'` por:
  ```ts
  import { test } from '../support/fixtures'
  ```
- Use `app.configurator.*` e `app.checkout.*` em vez de seletores soltos no spec.
- Reaproveite `configuratorActions.ts` (`checkOptional`, `uncheckOptional`, `expectPrice`, `finishConfigurator`).

### 5. Checklist de asserts do CT03

| Passo | Assert |
|-------|--------|
| Início | preço `R$ 40.000,00` |
| + Precision Park | `R$ 45.500,00` |
| + Flux Capacitor | `R$ 50.500,00` |
| Desmarcar os dois | `R$ 40.000,00` |
| Monte o Seu | URL `/order` + total no resumo `R$ 40.000,00` |

## Dicas rápidas

- Preferir `getByRole('checkbox', { name: /Precision Park/i })`.
- Preço: `getByTestId('total-price')` (já encapsulado em `expectPrice`).
- No checkout: `getByTestId('summary-total-price')`.
- Sem `waitForTimeout` — confiar no auto-wait do Playwright.
- `baseURL` já aponta para `http://localhost:5173`.

## Quando pedir ajuda ao agente

Cole isto no chat:

> Siga `docs/prompts/prompt-qa-playwright-automator.md` e implemente o CT03 de `docs/tests/CT03.md` em `playwright/e2e/ct03-opcionais.spec.ts`. Depois refatore com `docs/prompts/feature-actions.md` usando `playwright/support`.
