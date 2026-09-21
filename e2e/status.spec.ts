import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'

test('visitors see no status dropdown and no Rejected tab', async ({
  page,
}) => {
  const board = createOwnedBoard()
  await page.goto(`/b/${board.pid}/ideas`)

  await expect(page.getByText('Dark mode')).toBeVisible()
  await expect(page.getByLabel('Status')).toHaveCount(0)
  await expect(page.getByRole('tab', { name: 'Rejected' })).toHaveCount(0)
})

test('the owner sees no status dropdown on the public board', async ({
  page,
}) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/b/${board.pid}/ideas`)

  await expect(page.getByText('Dark mode')).toBeVisible()
  await expect(page.getByLabel('Status')).toHaveCount(0)
})
