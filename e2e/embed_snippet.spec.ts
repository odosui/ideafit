import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'

test.use({ permissions: ['clipboard-read', 'clipboard-write'] })

test('the owner copies the embed snippet from the share page', async ({
  page,
  baseURL,
}) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}`)

  await page.getByRole('button', { name: 'Copy snippet' }).click()

  await expect(page.getByRole('button', { name: 'Copied' })).toBeVisible()
  const clipboard = await page.evaluate(() => navigator.clipboard.readText())
  expect(clipboard).toBe(
    `<script id="ideafit" src="${baseURL}/embed.js" data-board="${board.pid}"></script>\n` +
      `<button onclick="IdeaFit.show()">Feedback</button>`,
  )
})
