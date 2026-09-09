import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 60_000,
  expect: {
    timeout: 5_000,
  },
  testDir: './playwright/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5173',
    trace: 'on-first-retry',
    actionTimeout: 5_000,
    navigationTimeout: 30_000,
    /* Desafio: rode com --headed ou descomente headless: false */
    // headless: false,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  /* Só sobe Vite local se NÃO estiver testando uma URL remota (preview/prod). */
  ...(process.env.BASE_URL && !/localhost|127\.0\.0\.1/.test(process.env.BASE_URL)
    ? {}
    : {
        webServer: {
          command: 'yarn dev',
          url: 'http://localhost:5173',
          reuseExistingServer: !process.env.CI,
        },
      }),
});