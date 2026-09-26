import { test, expect } from '@playwright/test'
import { readFileSync } from 'fs'
import { createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'

test('the owner exports the filtered items as CSV', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}/items`)
  await page.getByLabel('Kind', { exact: true }).selectOption({ label: 'Idea' })

  const downloading = page.waitForEvent('download')
  await page.getByRole('button', { name: 'More actions' }).click()
  await page.getByRole('menuitem', { name: 'Export CSV' }).click()
  const download = await downloading

  expect(download.suggestedFilename()).toMatch(/^e2e-board-items-.*\.csv$/)
  const csv = readFileSync(await download.path(), 'utf8')
  expect(csv).toContain('ID,Title,Description,Kind,Status')
  expect(csv).toContain('Dark mode,,Idea,New')
  await expect(page.getByRole('menu')).toHaveCount(0)
})
