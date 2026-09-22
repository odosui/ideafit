import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { signIn } from './support/magicLink'

test('the owner changes an item status from the items page', async ({
  page,
}) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}/items`)

  const status = page.getByLabel('Status of Dark mode')
  await status.selectOption({ label: 'Planned' })
  await expect(page.getByText('Status changed to Planned')).toBeVisible()

  await page.reload()
  await expect(page.getByLabel('Status of Dark mode')).toHaveValue('planned')

  await page.goto(`/b/${board.pid}/ideas`)
  await expect(page.getByText('Planned')).toBeVisible()
})

test('the owner filters and searches items', async ({ page }) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}/items`)
  await expect(page.getByText('Dark mode')).toBeVisible()

  await page
    .getByLabel('Status', { exact: true })
    .selectOption({ label: 'Declined' })
  await expect(page.getByText('No items found.')).toBeVisible()

  await page
    .getByLabel('Status', { exact: true })
    .selectOption({ label: 'All' })
  await page.getByLabel('Search items').fill('nothing like this')
  await expect(page.getByText('No items found.')).toBeVisible()

  await page.getByLabel('Search items').fill('dark')
  await expect(page.getByText('Dark mode')).toBeVisible()
})

test('the owner opens an item and sees its status history', async ({
  page,
}) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}/items`)

  await page.getByRole('link', { name: 'Dark mode' }).click()
  await expect(page.getByRole('heading', { name: 'Dark mode' })).toBeVisible()
  await expect(page.getByText('No description.')).toBeVisible()

  await page
    .getByLabel('Status of Dark mode')
    .selectOption({ label: 'Planned' })
  await expect(page.getByText('Status changed to Planned')).toBeVisible()

  await page.getByRole('link', { name: 'History' }).click()
  await expect(page).toHaveURL(/\/history$/)
  const history = page.getByLabel('Status history of Dark mode')
  await expect(history.getByText('Created')).toBeVisible()
  const planned = history.getByRole('listitem').filter({ hasText: 'Planned' })
  await expect(planned).toContainText(`by ${board.email}`)

  await page
    .getByLabel('Status of Dark mode')
    .selectOption({ label: 'Shipped' })
  await expect(history.getByRole('listitem')).toHaveText([
    /Shipped/,
    /Planned/,
    /Created/,
  ])

  await page.getByRole('link', { name: 'All items' }).click()
  await expect(page).toHaveURL(new RegExp(`/db/boards/${board.pid}/items$`))
})
