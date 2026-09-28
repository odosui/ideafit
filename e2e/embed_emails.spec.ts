import { test, expect } from '@playwright/test'
import { addEmbedFollower } from './support/follower'
import { signIn } from './support/magicLink'
import { createOwnedBoard } from './support/ownedBoard'

test("the site's users get emails once the admin trusts their emails", async ({
  page,
}) => {
  const board = createOwnedBoard()
  const follower = addEmbedFollower(board.pid, 'Dark mode')
  await signIn(page, board.email)

  await page.goto(`/db/boards/${board.pid}/items`)
  await page
    .getByLabel('Status of Dark mode')
    .selectOption({ label: 'Planned' })
  await expect(page.getByText('Status changed to Planned')).toBeVisible()
  await page.goto(`/db/boards/${board.pid}/outbox`)
  await expect(page.getByText('No one to email')).toBeVisible()

  await page.goto(`/db/boards/${board.pid}`)
  await page
    .getByLabel('Email status updates to the address in the token')
    .check()
  await page
    .getByLabel('Page on your site with this board')
    .fill('https://example.com/feedback')
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByText('Saved')).toBeVisible()

  await page.reload()
  await expect(
    page.getByLabel('Email status updates to the address in the token'),
  ).toBeChecked()
  await expect(
    page.getByLabel('Page on your site with this board'),
  ).toHaveValue('https://example.com/feedback')

  await page.goto(`/db/boards/${board.pid}/outbox`)
  await page.getByText('To 1 person').click()
  await expect(page.getByText(follower)).toBeVisible()
})
