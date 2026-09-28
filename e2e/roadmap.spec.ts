import { test, expect } from '@playwright/test'
import { addItem } from './support/item'
import { createOwnedBoard } from './support/ownedBoard'

test('the roadmap groups items of every kind by progress', async ({ page }) => {
  const board = createOwnedBoard()
  addItem(board.pid, 'idea', 'Offline mode', 'planned')
  addItem(board.pid, 'bug', 'Slow search', 'in_progress')
  addItem(board.pid, 'idea', 'Themes', 'ready')
  addItem(board.pid, 'question', 'Is there an API?', 'done')
  addItem(board.pid, 'idea', 'Crypto payments', 'rejected')

  await page.goto(`/b/${board.pid}/ideas`)
  await page.getByRole('link', { name: 'Roadmap' }).click()
  await expect(page).toHaveURL(new RegExp(`/b/${board.pid}/roadmap$`))

  const column = (name: string) => page.getByRole('region', { name })
  await expect(column('Planned').getByText('Offline mode')).toBeVisible()
  await expect(column('In progress').getByText('Slow search')).toBeVisible()
  await expect(column('In progress').getByText('Themes')).toBeVisible()
  await expect(column('In progress').getByText('Ready to ship')).toBeVisible()
  await expect(column('Done').getByText('Is there an API?')).toBeVisible()
  await expect(page.getByText('Dark mode')).toBeHidden()
  await expect(page.getByText('Crypto payments')).toBeHidden()
})

test('the roadmap has its own link', async ({ page }) => {
  const board = createOwnedBoard()
  await page.goto(`/b/${board.pid}/roadmap`)

  await expect(page.getByRole('region', { name: 'Planned' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Roadmap' })).toHaveAttribute(
    'aria-current',
    'page',
  )
})
