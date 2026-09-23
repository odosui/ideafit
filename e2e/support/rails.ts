import { execFileSync } from 'child_process'
import { e2eEnv } from './env'

export function railsRunner(script: string, ...args: string[]): string {
  const output = execFileSync('bin/rails', ['runner', script, ...args], {
    env: { ...process.env, ...e2eEnv },
  })
  return output.toString().trim().split('\n').pop()!
}
