import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'

test('the owner deletes a board from its settings', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}/settings`)

  page.once('dialog', (dialog) => dialog.accept())
  await page.getByRole('button', { name: 'Delete board' }).click()

  await expect(page).toHaveURL(/\/$/)
  await expect(page.locator('.db-board-card')).toHaveCount(0)

  const response = await page.goto(`/b/${board.pid}`)
  expect(response?.status()).toBe(404)
})

test('dismissing the confirmation keeps the board', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}/settings`)

  page.once('dialog', (dialog) => dialog.dismiss())
  await page.getByRole('button', { name: 'Delete board' }).click()

  await expect(page).toHaveURL(new RegExp(`/db/boards/${board.pid}/settings$`))
  await page.goto('/')
  await expect(page.locator('.db-board-card')).toHaveCount(1)
})
