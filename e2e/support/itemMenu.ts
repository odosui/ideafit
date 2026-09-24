import { Locator } from '@playwright/test'

export async function openItemMenu(item: Locator) {
  await item.getByRole('button', { name: 'More actions' }).click()
}

export async function chooseItemAction(item: Locator, action: string) {
  await openItemMenu(item)
  await item.getByRole('menuitem', { name: action }).click()
}
