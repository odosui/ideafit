import { test, expect, Page } from '@playwright/test'
import { signIn } from './support/magicLink'
import { createOwnedBoard } from './support/ownedBoard'

const counterOf = (page: Page, section: string) =>
  page
    .getByRole('navigation', { name: 'Board sections' })
    .getByRole('link', { name: section })
    .locator('.sidebar-counter')

test('the sidebar counts new items, participants and changes to send', async ({
  page,
}) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)

  await page.goto(`/db/boards/${board.pid}/items`)
  await expect(counterOf(page, 'Items')).toHaveText('1')
  await expect(counterOf(page, 'Participants')).toHaveText('1')
  await expect(counterOf(page, 'Outbox')).toHaveCount(0)

  await page
    .getByLabel('Status of Dark mode')
    .selectOption({ label: 'Planned' })
  await expect(counterOf(page, 'Outbox')).toHaveText('1')
  await expect(counterOf(page, 'Outbox')).toHaveClass(/sidebar-counter--action/)
  await expect(counterOf(page, 'Items')).toHaveCount(0)

  await page.goto(`/db/boards/${board.pid}/outbox`)
  await page.getByRole('button', { name: "Don't send Dark mode" }).click()
  await page.getByRole('button', { name: 'Drop' }).click()
  await expect(counterOf(page, 'Outbox')).toHaveCount(0)
})
