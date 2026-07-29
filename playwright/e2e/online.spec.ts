import { test, expect } from '@playwright/test';

test('titulo da pagina', async ({ page }) => {
  await page.goto('http://localhost:5174');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Velô by Papito/);
});


