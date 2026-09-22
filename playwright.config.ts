import { defineConfig, devices } from '@playwright/test'

const PORT = Number(process.env.E2E_PORT ?? 5100)
const baseURL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Boots Vite + Rails (same as `bin/dev`). Reuses an already-running
  // dev server locally so the test suite starts instantly.
  webServer: {
    // CI has no foreman, so it starts Rails alone and lets Vite build on demand.
    command: process.env.E2E_SERVER_COMMAND ?? 'bin/dev',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
