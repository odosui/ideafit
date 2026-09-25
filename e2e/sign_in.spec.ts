import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { magicLinkFor } from './support/magicLink'

function uniqueEmail() {
  return `e2e-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`
}

test('a visitor signs in from the board with a magic link', async ({
  page,
}) => {
  const board = createOwnedBoard()
  const email = uniqueEmail()
  const boardPath = `/b/${board.pid}/ideas`

  await page.goto(boardPath)
  await page.getByRole('button', { name: 'Add Idea' }).click()
  await page.getByLabel('Your Email').fill(email)
  await page.getByRole('button', { name: 'Email me a sign-in link' }).click()
  // E2E runs without SMTP, so the link goes to the server logs
  await expect(
    page.getByRole('heading', { name: 'Find your link in the server logs' }),
  ).toBeVisible()

  await page.goto(magicLinkFor(email, boardPath))

  await expect(page).toHaveURL(new RegExp(`/b/${board.pid}/ideas$`))
  await expect(page.getByText(email)).toBeVisible()
})

test('a magic link works only once', async ({ page, context }) => {
  const { email } = createOwnedBoard()
  const link = magicLinkFor(email)

  await page.goto(link)
  await context.clearCookies()
  await page.goto(link)

  await expect(page.getByText('invalid or has expired')).toBeVisible()
})
