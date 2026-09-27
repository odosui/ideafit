import { test, expect } from '@playwright/test'
import { createOwnedBoard } from './support/ownedBoard'
import { embedSecretFor, identityJwt } from './support/embedIdentity'
import { openHostSite } from './support/hostSite'
import { signIn } from './support/magicLink'

test('a user signed in on the host site votes without signing in again', async ({
  page,
  baseURL,
}) => {
  const board = createOwnedBoard()
  const token = identityJwt(embedSecretFor(board.pid), {
    id: 'shop-user-1',
    name: 'Shopper',
  })

  let frame = await openHostSite(page, {
    baseURL: baseURL!,
    pid: board.pid,
    token,
  })
  const voter = () =>
    frame.locator('.item', { hasText: 'Dark mode' }).locator('.voter')
  await voter().click()
  await expect(voter()).toHaveText('1')

  await page.reload()
  await page.getByRole('button', { name: 'Feedback' }).click()
  frame = page.frameLocator('iframe')
  await expect(voter()).toHaveClass(/voter--voted/)
})

test('a token signed with another secret signs no one in', async ({
  page,
  baseURL,
}) => {
  const board = createOwnedBoard()
  const token = identityJwt('not-the-secret', { id: 'shop-user-1' })

  const frame = await openHostSite(page, {
    baseURL: baseURL!,
    pid: board.pid,
    token,
  })
  await frame
    .locator('.item', { hasText: 'Dark mode' })
    .locator('.voter')
    .click()

  await expect(
    frame.getByRole('heading', { name: 'Sign in to post and vote' }),
  ).toBeVisible()
})

test('the owner generates the signing secret on the share page', async ({
  page,
}) => {
  const board = createOwnedBoard()
  await signIn(page, board.email)
  await page.goto(`/db/boards/${board.pid}`)

  await page.getByRole('button', { name: 'Show signing secret' }).click()
  await page.getByRole('button', { name: 'Generate signing secret' }).click()

  await expect(page.getByLabel('Signing secret')).toHaveValue(/^[0-9a-f]{64}$/)
  await page.getByRole('tab', { name: 'Python' }).click()
  await expect(page.getByLabel('Python signing example')).toContainText(
    'algorithm="HS256"',
  )
})
