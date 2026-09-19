import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'

test.use({ permissions: ['clipboard-read', 'clipboard-write'] })

const readClipboard = (page) =>
  page.evaluate(() => navigator.clipboard.readText())

test('the owner copies the public link from the dashboard', async ({
  page,
  baseURL,
}) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto('/')

  await page.getByRole('button', { name: 'Copy public link' }).click()

  await expect(page.getByRole('button', { name: 'Link copied' })).toBeVisible()
  expect(await readClipboard(page)).toBe(`${baseURL}/b/${board.pid}`)
})

test('the owner copies the public link from board settings', async ({
  page,
  baseURL,
}) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}`)

  await page.getByRole('button', { name: 'Copy public link' }).click()

  await expect(page.getByText('Copied')).toBeVisible()
  expect(await readClipboard(page)).toBe(`${baseURL}/b/${board.pid}`)
})
