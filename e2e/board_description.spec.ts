import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'

test('a board without a description shows the default text', async ({ page }) => {
  const board = createOwnedBoard()
  await page.goto(`/b/${board.pid}/ideas`)

  await expect(page.getByText('Submit and vote on ideas here.')).toBeVisible()
})

test('a description set in board settings shows on the board', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}`)

  await page.getByLabel('Description').fill('Tell us what to build next')
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByText('Saved')).toBeVisible()

  await page.goto(`/b/${board.pid}/ideas`)
  await expect(page.getByText('Tell us what to build next')).toBeVisible()
  await expect(page.getByText('Submit and vote on ideas here.')).toBeHidden()
})
