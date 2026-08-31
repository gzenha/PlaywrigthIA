import { test, expect } from '@playwright/test';

test('titulo da pagina', async ({ page }) => {
  // Usa baseURL do playwright.config (http://localhost:5173)
  await page.goto('/');

  await expect(page.getByTestId('header-logo').getByRole('img', { name: 'Velô' })).toBeVisible();
  await expect(page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' })).toBeVisible();
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page).toHaveURL(/\/lookup/);
});
