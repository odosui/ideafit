import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'

test('a bare board URL shows ideas', async ({ page }) => {
  const board = createOwnedBoard()
  await page.goto(`/b/${board.pid}`)

  await expect(page).toHaveURL(new RegExp(`/b/${board.pid}/ideas$`))
  await expect(page.getByText('Dark mode')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'E2E board' })).toBeVisible()
})

test('an old #/ hash link moves to the clean URL', async ({ page }) => {
  const board = createOwnedBoard()
  await page.goto(`/b/${board.pid}#/bugs`)

  await expect(page).toHaveURL(new RegExp(`/b/${board.pid}/bugs$`))
})

test('kind tabs switch the list and the URL', async ({ page }) => {
  const board = createOwnedBoard()
  await page.goto(`/b/${board.pid}/ideas`)
  await expect(page.getByText('Dark mode')).toBeVisible()

  await page.getByRole('link', { name: 'Bugs' }).click()
  await expect(page).toHaveURL(new RegExp(`/b/${board.pid}/bugs$`))
  await expect(page.getByText('Dark mode')).toBeHidden()

  await page.goBack()
  await expect(page).toHaveURL(new RegExp(`/b/${board.pid}/ideas$`))
  await expect(page.getByText('Dark mode')).toBeVisible()
})
