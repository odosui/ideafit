import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'
import { chooseItemAction, openItemMenu } from './support/itemMenu'

test('the author edits an item and it shows up in the history', async ({
  page,
}) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/b/${board.pid}/ideas`)

  await chooseItemAction(
    page.locator('.item', { hasText: 'Dark mode' }),
    'Edit',
  )
  const form = page.getByRole('form', { name: 'Edit Dark mode' })
  await form.getByPlaceholder('Title').fill('Night mode')
  await form.getByPlaceholder('Description').fill('Easier on the eyes')
  await form.getByRole('button', { name: 'Save' }).click()

  await expect(page.getByText('Idea updated!')).toBeVisible()
  const item = page.locator('.item', { hasText: 'Night mode' })
  await expect(item).toContainText('Easier on the eyes')

  await page.reload()
  await expect(item).toContainText('Easier on the eyes')

  await page.goto(`/db/boards/${board.pid}/items`)
  await page.getByRole('link', { name: 'Night mode' }).click()
  await page.getByRole('link', { name: 'History' }).click()
  await expect(
    page.getByLabel('History of Night mode').getByRole('listitem'),
  ).toHaveText([/Edited/, /Created/])
})

test('a cancelled edit keeps the item as it was', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/b/${board.pid}/ideas`)
  const item = page.locator('.item')

  await chooseItemAction(item, 'Edit')
  await item.getByPlaceholder('Title').fill('Something else')
  await item.getByRole('button', { name: 'Cancel' }).click()

  await expect(item.locator('.item__title')).toHaveText('Dark mode')
})

test('the author can no longer edit once the status changed', async ({
  page,
}) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}/items`)
  await page
    .getByLabel('Status of Dark mode')
    .selectOption({ label: 'Planned' })
  await expect(page.getByText('Status changed to Planned')).toBeVisible()

  await page.goto(`/b/${board.pid}/ideas`)
  const item = page.locator('.item', { hasText: 'Dark mode' })
  await openItemMenu(item)
  await expect(item.getByRole('menuitem', { name: 'Delete' })).toBeVisible()
  await expect(item.getByRole('menuitem', { name: 'Edit' })).toHaveCount(0)
})
