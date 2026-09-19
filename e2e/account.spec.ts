import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'

test('a user sets their name in settings', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto('/')

  const header = page.locator('.app-header')
  await expect(header.getByText(board.email)).toBeVisible()

  await page.getByRole('link', { name: 'Settings' }).click()
  await expect(page).toHaveURL(/\/db\/settings$/)
  await page.getByLabel('Name').fill('Ada Lovelace')
  await page.getByRole('button', { name: 'Save' }).click()

  await expect(page.getByText('Saved')).toBeVisible()
  await expect(header.getByText('Ada Lovelace')).toBeVisible()

  await page.goto(`/b/${board.pid}/ideas`)
  await expect(header.getByText('Ada Lovelace')).toBeVisible()
})

test('the name in the header leads to settings', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/b/${board.pid}/ideas`)

  await page.locator('.app-header').getByText(board.email).click()

  await expect(page).toHaveURL(/\/db\/settings$/)
  await expect(page.getByLabel('Email')).toHaveValue(board.email)
})
