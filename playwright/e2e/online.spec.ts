import { test, expect } from '@playwright/test';

test('titulo da pagina', async ({ page }) => {
  await page.goto('http://localhost:5174');

  // Expect a title "to contain" a substring.
  await page.getByTestId('header-logo').getByRole('img', { name: 'Velô by Papito' }).click();
  await page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' }).click();
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
});


