import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'

test('voting follows the item, and unfollowing keeps the vote', async ({
  page,
}) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/b/${board.pid}/ideas`)
  const item = page.locator('.item', { hasText: 'Dark mode' })

  await expect(item.getByRole('button', { name: 'Follow' })).toBeVisible()
  await item.locator('.voter').click()
  await expect(item.getByRole('button', { name: 'Unfollow' })).toBeVisible()

  await item.getByRole('button', { name: 'Unfollow' }).click()
  await page.reload()

  await expect(item.getByRole('button', { name: 'Follow' })).toBeVisible()
  await expect(item.locator('.voter')).toHaveText('1')
})

test('a visitor who follows is asked to sign in', async ({ page }) => {
  const board = createOwnedBoard()
  await page.goto(`/b/${board.pid}/ideas`)

  await page
    .locator('.item', { hasText: 'Dark mode' })
    .getByRole('button', { name: 'Follow' })
    .click()

  await expect(
    page.getByRole('heading', { name: 'Sign in to post and vote' }),
  ).toBeVisible()
})
