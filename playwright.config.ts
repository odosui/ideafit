import { defineConfig, devices } from '@playwright/test'
import { E2E_URL, e2eEnv } from './e2e/support/env'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: E2E_URL,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // A dedicated Rails server on the e2e database. Assets come from the
  // running Vite dev server when there is one, otherwise Vite builds them.
  webServer: {
    command: 'bin/rails db:prepare && bin/rails server',
    env: e2eEnv,
    url: E2E_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
