import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'

test('the owner changes the color scheme in board settings', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/b/${board.pid}/ideas`)
  await expect(page.locator('body')).toHaveAttribute('data-color-scheme', 'teal')

  await page.getByRole('link', { name: 'Board settings' }).click()
  await page.getByText('Plum').click()
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByText('Saved')).toBeVisible()

  await page.goto(`/b/${board.pid}/ideas`)
  await expect(page.locator('body')).toHaveAttribute('data-color-scheme', 'plum')
})

test('the dashboard card opens the board', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto('/')

  await page.locator('.db-board-card__link').click()
  await expect(page).toHaveURL(new RegExp(`/db/boards/${board.pid}$`))
  await expect(page.getByRole('heading', { name: 'Public link' })).toBeVisible()
})

test('visitors see no settings link', async ({ page }) => {
  const board = createOwnedBoard()
  await page.goto(`/b/${board.pid}/ideas`)

  await expect(page.getByText('Dark mode')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Board settings' })).toHaveCount(0)
})

test('the owner goes back to all boards from the board switcher', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}`)

  await page.getByRole('button', { name: /Switch board/ }).click()
  await page.getByRole('menuitem', { name: 'All boards' }).click()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('button', { name: 'New board' })).toBeVisible()
})
