import { expect, test } from '@playwright/test'

test('home shows the evidence board and opens case 01', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Debug like a detective.')
  await expect(page.locator('#cases ol > li')).toHaveCount(8)
  await expect(page.locator('#cases')).toContainText("KeyError: 'croissant '")

  await page.getByRole('link', { name: 'Open case 01' }).click()
  await expect(page).toHaveURL(/\/workshop\/01-read-the-traceback$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Read the traceback')
})

test('the workshop lists every case and pages through', async ({ page }) => {
  await page.goto('/workshop')
  await expect(page.locator('main ol > li')).toHaveCount(8)

  await page.locator('main ol > li').nth(3).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('breakpoint() and pdb')
  await page.getByRole('link', { name: /Next/ }).click()
  await expect(page).toHaveURL(/05-divide-and-conquer$/)
})

test('nothing scrolls sideways', async ({ page }) => {
  for (const path of ['/', '/workshop', '/workshop/07-profile-dont-guess']) {
    await page.goto(path)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow, path).toBeLessThanOrEqual(0)
  }
})

test('back to top returns to the top', async ({ page }) => {
  await page.goto('/workshop/08-assumptions-lie')
  await page.evaluate(() => window.scrollTo(0, 3000))
  const button = page.getByRole('button', { name: 'Back to top' })

  await expect(button).toBeVisible()
  await button.click()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})
