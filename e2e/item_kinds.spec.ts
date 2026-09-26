import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'

test('the bugs tab speaks about bugs and adds bugs', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/b/${board.pid}/bugs`)

  await expect(page.getByText('Be the first to add a bug!')).toBeVisible()

  await page.getByRole('button', { name: 'Add Bug' }).click()
  await page.getByPlaceholder('Title').fill('Save button does nothing')
  await page.getByPlaceholder('Description').fill('Clicking it has no effect.')
  await page.getByRole('button', { name: 'Add Bug' }).click()
  await expect(page.getByText('Bug added!')).toBeVisible()

  await page.goto(`/b/${board.pid}/bugs`)
  await expect(page.getByText('Save button does nothing')).toBeVisible()

  await page.goto(`/b/${board.pid}/ideas`)
  await expect(page.getByText('Dark mode')).toBeVisible()
  await expect(page.getByText('Save button does nothing')).toBeHidden()
})

test('an empty filter says what is missing', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/b/${board.pid}/questions`)

  await page.getByRole('tab', { name: 'Done' }).click()
  await expect(page.getByText('No questions are done yet.')).toBeVisible()

  await page.getByRole('tab', { name: 'Rejected' }).click()
  await expect(page.getByText('No rejected questions.')).toBeVisible()

  await page.getByRole('tab', { name: 'All' }).click()
  await expect(page.getByText('Be the first to add a question!')).toBeVisible()
})
