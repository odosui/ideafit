import { test, expect, Page } from '@playwright/test'
import { addFollower } from './support/follower'
import { signIn } from './support/magicLink'
import { createOwnedBoard } from './support/ownedBoard'

async function planDarkMode(page: Page, pid: string) {
  await page.goto(`/db/boards/${pid}/items`)
  await page
    .getByLabel('Status of Dark mode')
    .selectOption({ label: 'Planned' })
  await expect(page.getByText('Status changed to Planned')).toBeVisible()
  await page.goto(`/db/boards/${pid}/outbox`)
}

test('status changes wait in the outbox until sent twice-confirmed', async ({
  page,
}) => {
  const board = createOwnedBoard()
  const follower = addFollower(board.pid, 'Dark mode')
  await signIn(page, board.email)

  await page.goto(`/db/boards/${board.pid}/outbox`)
  await expect(page.getByText('Nothing to send')).toBeVisible()

  await planDarkMode(page, board.pid)
  await expect(page.getByText('1 status change not sent yet')).toBeVisible()
  await page.getByText('To 1 person').click()
  await expect(page.getByText(follower)).toBeVisible()

  await page.getByRole('button', { name: 'Send 1 email' }).click()
  await page.getByRole('button', { name: 'Cancel' }).click()
  await page.getByRole('button', { name: 'Send 1 email' }).click()
  await expect(
    page.getByText('Email 1 person about 1 status change?'),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Yes, continue' }).click()
  await page.getByRole('button', { name: 'Send now' }).click()

  await expect(page.getByText('Sent 1 email')).toBeVisible()
  await expect(page.getByText('Nothing to send')).toBeVisible()
})

test('the owner drops a change so no one hears about it', async ({ page }) => {
  const board = createOwnedBoard()
  addFollower(board.pid, 'Dark mode')
  await signIn(page, board.email)

  await planDarkMode(page, board.pid)
  await page.getByRole('button', { name: "Don't send Dark mode" }).click()
  await page.getByRole('button', { name: 'Keep' }).click()
  await page.getByRole('button', { name: "Don't send Dark mode" }).click()
  await page.getByRole('button', { name: 'Drop', exact: true }).click()

  await expect(page.getByText("“Dark mode” won't be sent")).toBeVisible()
  await expect(page.getByText('Nothing to send')).toBeVisible()
})
