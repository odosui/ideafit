import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'

test('a visitor who votes is asked to sign in', async ({ page }) => {
  const board = createOwnedBoard()
  await page.goto(`/b/${board.pid}/ideas`)

  await page
    .locator('.item', { hasText: 'Dark mode' })
    .locator('.voter')
    .click()

  await expect(
    page.getByRole('heading', { name: 'Sign in to post and vote' }),
  ).toBeVisible()
})

test('a signed-in user votes and takes the vote back', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/b/${board.pid}/ideas`)
  const voter = page
    .locator('.item', { hasText: 'Dark mode' })
    .locator('.voter')

  await voter.click()
  await expect(voter).toHaveText('1')
  await page.reload()
  await expect(voter).toHaveText('1')

  await voter.click()
  await expect(voter).toHaveText('0')
})

test('the owner deletes an item from the public board', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/b/${board.pid}/ideas`)

  page.once('dialog', (dialog) => dialog.accept())
  await page
    .locator('.item', { hasText: 'Dark mode' })
    .getByRole('button', { name: 'Delete' })
    .click()

  await expect(page.getByText('Idea successfully deleted!')).toBeVisible()
  await expect(page.locator('.item', { hasText: 'Dark mode' })).toHaveCount(0)
})
