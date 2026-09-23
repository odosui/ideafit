// E2E runs its own Rails server against its own database,
// so tests never touch development data.
export const E2E_PORT = Number(process.env.E2E_PORT ?? 3100)
export const E2E_URL = `http://localhost:${E2E_PORT}`

export const e2eEnv = {
  DEV_DATABASE: 'if_e2e',
  PORT: String(E2E_PORT),
  PIDFILE: 'tmp/pids/e2e.pid',
  APP_URL: E2E_URL,
}
