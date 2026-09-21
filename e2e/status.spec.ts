import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'

test('the owner rejects an item and finds it in the Rejected tab', async ({
  page,
}) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/b/${board.pid}/ideas`)

  const item = page.locator('.item', { hasText: 'Dark mode' })
  await item.getByLabel('Status').selectOption('in_progress')
  await expect(item.getByLabel('Status')).toHaveValue('in_progress')

  await item.getByLabel('Status').selectOption('rejected')
  await expect(page.getByText('Dark mode')).toBeHidden()

  await page.getByRole('tab', { name: 'Rejected' }).click()
  await expect(page.getByText('Dark mode')).toBeVisible()
})

test('visitors see no status dropdown and no Rejected tab', async ({
  page,
}) => {
  const board = createOwnedBoard()
  await page.goto(`/b/${board.pid}/ideas`)

  await expect(page.getByText('Dark mode')).toBeVisible()
  await expect(page.getByLabel('Status')).toHaveCount(0)
  await expect(page.getByRole('tab', { name: 'Rejected' })).toHaveCount(0)
})
