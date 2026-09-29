import { test, expect } from '@playwright/test'
import {
  embedSecretFor,
  identityJwt,
  trustEmbedEmails,
} from './support/embedIdentity'
import { openHostSite } from './support/hostSite'
import { createOwnedBoard } from './support/ownedBoard'

test("the site's user is asked once, and can change their mind", async ({
  page,
  baseURL,
}) => {
  const board = createOwnedBoard()
  const token = identityJwt(embedSecretFor(board.pid), {
    id: 'shop-user-1',
    email: 'shopper@example.com',
  })
  trustEmbedEmails(board.pid)
  const open = () =>
    openHostSite(page, { baseURL: baseURL!, pid: board.pid, token })

  let frame = await open()
  await expect(frame.getByText('Get email updates?')).toBeVisible()
  await expect(frame.getByText('shopper@example.com')).toBeVisible()
  await frame.getByRole('button', { name: 'No thanks' }).click()
  await expect(frame.getByText('Get email updates?')).toBeHidden()
  await frame.getByRole('link', { name: 'Settings' }).click()
  await expect(frame.getByLabel('Email updates')).not.toBeChecked()

  frame = await open()
  await expect(frame.getByText('Dark mode')).toBeVisible()
  await expect(frame.getByText('Get email updates?')).toBeHidden()
  await frame.getByRole('link', { name: 'Settings' }).click()
  await frame.getByLabel('Email updates').check()

  frame = await open()
  await frame.getByRole('link', { name: 'Settings' }).click()
  await expect(frame.getByLabel('Email updates')).toBeChecked()
})

test('nothing is asked while the workspace ignores site emails', async ({
  page,
  baseURL,
}) => {
  const board = createOwnedBoard()
  const token = identityJwt(embedSecretFor(board.pid), {
    id: 'shop-user-1',
    email: 'shopper@example.com',
  })

  const frame = await openHostSite(page, {
    baseURL: baseURL!,
    pid: board.pid,
    token,
  })
  await expect(frame.getByText('Dark mode')).toBeVisible()
  await expect(frame.getByText('Get email updates?')).toBeHidden()
  await expect(frame.getByRole('link', { name: 'Settings' })).toHaveCount(0)
})
