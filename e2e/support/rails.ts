import { execFileSync } from 'child_process'

export function railsRunner(script: string, ...args: string[]): string {
  const output = execFileSync('bin/rails', ['runner', script, ...args])
  return output.toString().trim().split('\n').pop()!
}
