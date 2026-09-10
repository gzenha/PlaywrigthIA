import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://localhost:5173';
const isRemote = !/localhost|127\.0\.0\.1/.test(baseURL);

const bypassHeaders = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
  ? {
      'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
      'x-vercel-set-bypass-cookie': 'true',
    }
  : undefined;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  testDir: './playwright/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
    actionTimeout: 10_000,
    navigationTimeout: 60_000,
    extraHTTPHeaders: bypassHeaders,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  /* Só sobe Vite local se NÃO estiver testando uma URL remota (preview/prod). */
  ...(isRemote
    ? {}
    : {
        webServer: {
          command: 'yarn dev',
          url: 'http://localhost:5173',
          reuseExistingServer: !process.env.CI,
        },
      }),
});
