import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'

test('the owner sees board analytics', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}/analytics`)

  const items = page.locator('.stat-tile', { hasText: 'Items' })
  await expect(items).toContainText('1')
  await expect(
    page.getByRole('region', { name: 'Items by status' }),
  ).toContainText('New1')
  await expect(page.getByText('No visitor tracking')).toBeVisible()
})
