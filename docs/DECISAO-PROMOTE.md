# Decisão: por que não usamos `vercel promote` do preview

## Problema
Variáveis `VITE_*` são embutidas no JavaScript **no momento do build**.

Fluxo inseguro (enunciado original):
1. `vercel pull --environment=preview` → build com Supabase **preview**
2. E2E ok contra o preview
3. `vercel promote` do **mesmo** deployment → produção continuaria falando com o banco de **preview**

## Solução escolhida
Após o E2E no preview, o job `deploy-production`:
1. `vercel pull --environment=production` (vars do Supabase **Velo** / prod)
2. `vercel build --prod`
3. `vercel deploy --prebuilt --prod`

Assim:
- Preview e E2E usam `ubgnvjzntixjpruphcsm` (isolado)
- Produção usa `ybqeosvelitqiznkhgtm` (produção)
- Não reaproveitamos o artifact de preview em prod
