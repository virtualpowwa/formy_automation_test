import { test, expect } from '@playwright/test';

const checkboxes = [
  { label: 'Checkbox1', id: 'checkbox-1' },
  { label: 'Checkbox2', id: 'checkbox-2' },
  { label: 'Checkbox3', id: 'checkbox-3' },
];

test.describe('Checkbox page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/checkbox');
  });

  test('all checkboxes are visible and unchecked by default', async ({ page }) => {
    for (const { id } of checkboxes) {
      const box = page.locator(`#${id}`);
      await expect(box).toBeVisible();
      await expect(box).not.toBeChecked();
    }
  });

  for (const { label, id } of checkboxes) {
    test(`${label} can be checked and unchecked independently of the others`, async ({ page }) => {
      const target = page.locator(`#${id}`);
      const others = checkboxes.filter((c) => c.id !== id);

      await target.check();
      await expect(target).toBeChecked();

      for (const other of others) {
        await expect(page.locator(`#${other.id}`)).not.toBeChecked();
      }

      await target.uncheck();
      await expect(target).not.toBeChecked();
    });
  }

  test('all three can be checked at the same time', async ({ page }) => {
    for (const { id } of checkboxes) {
      await page.locator(`#${id}`).check();
    }
    for (const { id } of checkboxes) {
      await expect(page.locator(`#${id}`)).toBeChecked();
    }
  });
});

