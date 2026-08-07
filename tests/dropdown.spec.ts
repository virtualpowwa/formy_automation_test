import { test, expect } from '@playwright/test';

// Note: this list has 15 items (includes "File Download") — one more than the
// header Components dropdown's 14. Worth flagging as a content-consistency
// check: the two menus should probably match, and currently don't.
const items = [
  'Autocomplete',
  'Buttons',
  'Checkbox',
  'Datepicker',
  'Drag and Drop',
  'Dropdown',
  'Enabled and disabled elements',
  'File Upload',
  'File Download',
  'Key and Mouse Press',
  'Modal',
  'Page Scroll',
  'Radio Button',
  'Switch Window',
  'Complete Web Form',
];

test.describe('Dropdown page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dropdown');
  });

  test('Dropdown button is visible and closed by default', async ({ page }) => {
    const toggle = page.getByRole('button', { name: 'Dropdown button', exact: true });
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('clicking opens the menu and shows all 15 items', async ({ page }) => {
    const toggle = page.getByRole('button', { name: 'Dropdown button', exact: true });
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    for (const item of items) {
      await expect(page.getByRole('link', { name: item, exact: true })).toBeVisible();
    }
  });

  test('File Download item does not error on click', async ({ page }) => {
    await page.getByRole('button', { name: 'Dropdown button', exact: true }).click();
    await page.getByRole('link', { name: 'File Download', exact: true }).click();
  });
});
