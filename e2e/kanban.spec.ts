import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'

test('the owner drags a card to another column', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}/kanban`)

  const fresh = page.getByRole('region', { name: 'New' })
  const planned = page.getByRole('region', { name: 'Planned' })
  await expect(fresh.getByText('Dark mode')).toBeVisible()

  await fresh.getByText('Dark mode').dragTo(planned)

  await expect(planned.getByText('Dark mode')).toBeVisible()
  await expect(page.getByText('Status changed to Planned')).toBeVisible()

  await page.reload()
  await expect(planned.getByText('Dark mode')).toBeVisible()
})

test('the owner moves a card with its status menu', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}/kanban`)

  await page
    .getByLabel('Status of Dark mode')
    .selectOption({ label: 'In progress' })

  const inProgress = page.getByRole('region', { name: 'In progress' })
  await expect(inProgress.getByText('Dark mode')).toBeVisible()
})
