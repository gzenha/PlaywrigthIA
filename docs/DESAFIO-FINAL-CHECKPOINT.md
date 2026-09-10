# Desafio Final — Checkpoint (salvar progresso)

Última atualização: 2026-09-09

## Status

| Etapa | Status |
|-------|--------|
| 1. Supabase preview criado | ✅ `velo-sprint-preview` |
| 2. Migrations no preview (`db push`) | ✅ |
| 3. Edge Functions no preview | ✅ |
| 4. CLI linkado no preview | ✅ |
| 5. Vars Vercel Production vs Preview | ✅ |
| 6. Redeploy Vercel Production | ✅ |
| 7. Secrets GitHub (VERCEL_*) | ✅ |
| 8. Pipeline CD (preview + E2E + rebuild prod) | ✅ arquivo `cd.yml` |
| 9. Push / validar Actions | ✅ verde (`f7f08b7` e anteriores) |
| 10. Documentar decisão do promote no PR | ✅ `docs/DECISAO-PROMOTE.md` + PR de entrega |

---

## Projetos Supabase

### Produção (não mexer em testes E2E)
- **Nome:** Velo
- **Ref:** `ybqeosvelitqiznkhgtm`
- **URL:** `https://ybqeosvelitqiznkhgtm.supabase.co`
- **Region:** sa-east-1 (São Paulo)

### Preview (isolado — testes E2E)
- **Nome:** velo-sprint-preview
- **Ref:** `ubgnvjzntixjpruphcsm`
- **URL:** `https://ubgnvjzntixjpruphcsm.supabase.co`
- **Region:** us-east-1 (North Virginia)
- **CLI:** estava **linked** aqui (●) após o `db push`

> Antes de qualquer `db push` / `functions deploy`, conferir:
> `yarn supabase projects list`

---

## Vercel

- **Team:** Gisele
- **Projeto:** `velo-sprint`
- **GitHub:** https://github.com/gzenha/PlaywrigthIA
- Domínio de produção costuma ser algo como `playwrigth-ia.vercel.app` / `velo-sprint.vercel.app`
- URLs longas (`…-ex3vm649w-….vercel.app`) = deploy de preview (normal)

### O que falta nas Environment Variables

Hoje as `VITE_SUPABASE_*` ainda podem estar iguais em Production **e** Preview.

Separar assim:

| Variável | Production | Preview |
|----------|------------|---------|
| `VITE_SUPABASE_URL` | `https://ybqeosvelitqiznkhgtm.supabase.co` | `https://ubgnvjzntixjpruphcsm.supabase.co` |
| `VITE_SUPABASE_PROJECT_ID` | `ybqeosvelitqiznkhgtm` | `ubgnvjzntixjpruphcsm` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | key do projeto **Velo** (Settings → API) | key do **velo-sprint-preview** (Settings → API) |

Passos:
1. Vercel → `velo-sprint` → **Settings** → **Environment Variables**
2. Remover/editar as 3 atuais que estão em “Production and Preview”
3. Recriar cada var **só Production** e **só Preview** (não os dois juntos)
4. **Deployments** → ⋯ → **Redeploy**

---

## Comandos já usados (preview)

```bash
yarn supabase link --project-ref ubgnvjzntixjpruphcsm
yarn supabase db push
yarn supabase functions deploy
yarn supabase projects list
```

---

## Ponto crítico do desafio (lembrar amanhã)

Variáveis `VITE_*` entram no **bundle no build**.

- `vercel pull --environment=preview` + build → bundle com Supabase **preview**
- `vercel promote` do **mesmo** build para produção → produção ainda falaria com o banco de **preview**
- Precisa de estratégia no PR: **rebuild de production** com vars de Production (caminho mais comum), ou outro fluxo documentado

O repo ainda pode não ter o `cd.yml` completo do professor — amanhã comparar com o fluxo do enunciado e ajustar o pipeline.

---

## Links úteis

- GitHub (entrega): https://github.com/gzenha/PlaywrigthIA
- Supabase dashboard: https://supabase.com/dashboard
- Vercel team: https://vercel.com/gisele (ou gisele8)

---

## Quando voltar

1. Separar vars na Vercel (tabela acima)
2. Redeploy
3. Abrir um preview deployment e confirmar que usa `ubgnvjzntixjpruphcsm`
4. Resolver promote / CD + documentar no PR
5. Não commitar `.env` / senhas
