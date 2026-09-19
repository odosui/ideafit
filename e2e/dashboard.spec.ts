import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'
import { createUser } from './support/user'

test('an owner with a board can create another one', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto('/')

  await expect(page.getByPlaceholder('New board name')).toHaveCount(0)
  await page.getByRole('button', { name: 'New board' }).click()
  await page.getByPlaceholder('New board name').fill('Second board')
  await page.getByRole('button', { name: 'Create' }).click()

  await expect(page.locator('.db-board-card')).toHaveCount(2)
  await expect(page.getByText('Second board')).toBeVisible()
  await expect(page.getByPlaceholder('New board name')).toHaveCount(0)
})

test('someone without boards sees the form right away', async ({ page }) => {
  await signIn(page, createUser())
  await page.goto('/')

  await expect(page.getByPlaceholder('New board name')).toBeVisible()
  await expect(page.getByRole('button', { name: 'New board' })).toHaveCount(0)
})
