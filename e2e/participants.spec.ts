import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'

test('the owner sees and searches board participants', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}/participants`)

  const row = page.getByRole('row', { name: new RegExp(board.email) })
  await expect(row.getByRole('cell').nth(1)).toHaveText('1')
  await expect(row.getByRole('cell').nth(2)).toHaveText('0')

  await page.getByLabel('Search participants').fill('nobody like this')
  await expect(page.getByText('No participants found.')).toBeVisible()
})
