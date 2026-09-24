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

  const follow = item.locator('.follow-toggle')

  await expect(follow).toHaveAttribute('aria-pressed', 'false')
  await item.locator('.voter').click()
  await expect(follow).toHaveAttribute('aria-pressed', 'true')
  await expect(follow).toHaveAccessibleName('Following')

  await follow.hover()
  await expect(follow).toHaveAccessibleName('Unfollow')
  await follow.click()
  await page.reload()

  await expect(follow).toHaveAttribute('aria-pressed', 'false')
  await expect(item.locator('.voter')).toHaveText('1')
})

test('a visitor who follows is asked to sign in', async ({ page }) => {
  const board = createOwnedBoard()
  await page.goto(`/b/${board.pid}/ideas`)

  await page
    .locator('.item', { hasText: 'Dark mode' })
    .getByRole('button', { name: 'Follow', exact: true })
    .click()

  await expect(
    page.getByRole('heading', { name: 'Sign in to post and vote' }),
  ).toBeVisible()
})
