import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'

test('the owner changes an item status from the items page', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}/items`)

  const status = page.getByLabel('Status of Dark mode')
  await status.selectOption({ label: 'Planned' })
  await expect(page.getByText('Status changed to Planned')).toBeVisible()

  await page.reload()
  await expect(page.getByLabel('Status of Dark mode')).toHaveValue('planned')

  await page.goto(`/b/${board.pid}/ideas`)
  await expect(page.getByText('Planned')).toBeVisible()
})

test('the owner filters and searches items', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}/items`)
  await expect(page.getByText('Dark mode')).toBeVisible()

  await page.getByLabel('Status', { exact: true }).selectOption({ label: 'Declined' })
  await expect(page.getByText('No items found.')).toBeVisible()

  await page.getByLabel('Status', { exact: true }).selectOption({ label: 'All' })
  await page.getByLabel('Search items').fill('nothing like this')
  await expect(page.getByText('No items found.')).toBeVisible()

  await page.getByLabel('Search items').fill('dark')
  await expect(page.getByText('Dark mode')).toBeVisible()
})
