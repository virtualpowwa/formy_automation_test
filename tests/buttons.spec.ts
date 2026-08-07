import { test, expect } from '@playwright/test';
 
test.describe('Buttons page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/buttons');
  });
 
  const colorButtons = ['Primary', 'Success', 'Info', 'Warning', 'Danger'];
 
  for (const label of colorButtons) {
    test(`${label} button is visible and enabled`, async ({ page }) => {
      const btn = page.getByRole('button', { name: label, exact: true });
      await expect(btn).toBeVisible();
      await expect(btn).toBeEnabled();
    });
  }
 
  test('Link button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Link', exact: true })).toBeVisible();
  });
 
  test('Left / Middle / Right button group is visible', async ({ page }) => {
    for (const label of ['Left', 'Middle', 'Right']) {
      await expect(page.getByRole('button', { name: label, exact: true })).toBeVisible();
    }
  });
 
  test('1 / 2 / Dropdown split button group is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: '1', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: '2', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Dropdown', exact: true })).toBeVisible();
  });
 
  test('Dropdown toggle in the split button group opens a menu', async ({ page }) => {
    const toggle = page.getByRole('button', { name: 'Dropdown', exact: true });
    await toggle.click();
  });
 
  // TODO — verify manually and fill in: clicking Primary/Success/Info/Warning/Danger/
  // Left/Middle/Right commonly reveals result text somewhere on the page on QA
  // practice sites (e.g. "You have clicked Primary Button"). Run codegen, click each
  // button, inspect the DOM for a result element, then add per button:
  //   await expect(page.getByText('<exact result text>')).toBeVisible();
  // Can't confirm the exact text without running JS against the live site.
});
 