import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'

const FILE = {
  format: 'ideafit',
  version: 1,
  users: [{ id: 'u1', name: 'Ada' }],
  items: [
    { kind: 'idea', title: 'Offline mode', author: 'u1', voters: ['u1'] },
  ],
}

test('the owner imports a file and sees the items on the board', async ({
  page,
}) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}/settings`)

  await page.getByLabel('Ideafit JSON file').setInputFiles({
    name: 'board.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(FILE)),
  })

  await expect(
    page.getByText('Imported 1 items, 1 votes and 1 people.'),
  ).toBeVisible()
  await page.goto(`/b/${board.pid}/ideas`)
  await expect(
    page.locator('.item', { hasText: 'Offline mode' }).locator('.voter'),
  ).toHaveText('1')
})

test('the owner exports the board as JSON', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}/settings`)

  const download = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Export JSON' }).click()

  expect((await download).suggestedFilename()).toMatch(/^e2e-board-.*\.json$/)
})
