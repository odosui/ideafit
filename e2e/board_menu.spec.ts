import { test, expect } from '@playwright/test'
import { addBoard, createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'

test('the owner switches board sections from the sidebar', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}`)

  const sections = page.getByRole('navigation', { name: 'Board sections' })
  await sections.getByRole('link', { name: 'Kanban' }).click()
  await expect(page).toHaveURL(new RegExp(`/db/boards/${board.pid}/kanban$`))
  await expect(page.getByText('This section is coming soon.')).toBeVisible()

  await sections.getByRole('link', { name: 'Settings' }).click()
  await expect(page.getByLabel('Name')).toBeVisible()
})

test('the owner switches to another board keeping the section', async ({ page }) => {
  const board = createOwnedBoard()
  const other = addBoard(board.email, 'Other board')
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}/items`)

  await page.getByRole('button', { name: /Switch board/ }).click()
  await page.getByRole('menuitem', { name: 'Other board' }).click()

  await expect(page).toHaveURL(new RegExp(`/db/boards/${other.pid}/items$`))
  await expect(page.getByRole('button', { name: /Switch board, current: Other board/ })).toBeVisible()
})

test('the owner opens the public board in a new tab from the sidebar', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}`)

  const popup = page.waitForEvent('popup')
  await page.getByRole('link', { name: 'Public board' }).click()
  const publicPage = await popup

  await expect(publicPage).toHaveURL(new RegExp(`/b/${board.pid}`))
  await expect(publicPage.getByText('Dark mode')).toBeVisible()
})
