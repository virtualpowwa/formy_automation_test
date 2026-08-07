import { test, expect } from '@playwright/test';
import { randomDateWithinMonths } from './utils/test-data';

test.describe('Datepicker page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/datepicker');
  });

  test('input is visible with the correct placeholder', async ({ page }) => {
    await expect(page.getByPlaceholder('mm/dd/yyyy')).toBeVisible();
  });

  test('clicking the input opens the calendar', async ({ page }) => {
    await page.getByPlaceholder('mm/dd/yyyy').click();
    await expect(page.locator('.datepicker')).toBeVisible();
  });

  test('next/previous month navigation updates the header', async ({ page }) => {
    await page.getByPlaceholder('mm/dd/yyyy').click();

    const header = page.locator('.datepicker-days .datepicker-switch');
    const currentLabel = await header.textContent();

    await page.locator('.datepicker-days .next').click();
    await expect(header).not.toHaveText(currentLabel ?? '');

    await page.locator('.datepicker-days .prev').click();
    await expect(header).toHaveText(currentLabel ?? '');
  });

  test('selecting a randomly generated date fills the input correctly', async ({ page }) => {
    const target = randomDateWithinMonths(3); // random date within +/- 3 months of today
    const input = page.getByPlaceholder('mm/dd/yyyy');

    await input.click();

    // bootstrap-datepicker shows one month at a time; .next/.prev step by one month.
    const navSelector = target.monthDiff >= 0 ? '.datepicker-days .next' : '.datepicker-days .prev';
    for (let i = 0; i < Math.abs(target.monthDiff); i++) {
      await page.locator(navSelector).click();
    }

    // :not(.old):not(.new) excludes greyed-out days from adjacent months.
    await page
      .locator('.datepicker-days td.day:not(.old):not(.new)', {
        hasText: new RegExp(`^${target.day}$`),
      })
      .click();

    await expect(input).toHaveValue(target.formatted);
  });
});
