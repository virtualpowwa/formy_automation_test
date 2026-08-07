import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
 
test.describe('Autocomplete page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/autocomplete');
  });
 
  test('all address fields are visible with correct placeholders', async ({ page }) => {
    await expect(page.getByPlaceholder('Enter address')).toBeVisible();
    await expect(page.getByPlaceholder('Street address', { exact: true })).toBeVisible();
    await expect(page.getByPlaceholder('Street address 2')).toBeVisible();
    await expect(page.getByPlaceholder('City')).toBeVisible();
    await expect(page.getByPlaceholder('State')).toBeVisible();
    await expect(page.getByPlaceholder('Zip code')).toBeVisible();
    await expect(page.getByPlaceholder('Country')).toBeVisible();
  });
 
  test('fills each field independently and retains the typed value', async ({ page }) => {
    const data = {
      address: faker.location.streetAddress(),
      street2: faker.location.secondaryAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      country: faker.location.country(),
    };
 
    await page.getByPlaceholder('Enter address').fill(data.address);
    await page.getByPlaceholder('Street address 2').fill(data.street2);
    await page.getByPlaceholder('City').fill(data.city);
    await page.getByPlaceholder('State').fill(data.state);
    await page.getByPlaceholder('Zip code').fill(data.zip);
    await page.getByPlaceholder('Country').fill(data.country);
 
    await expect(page.getByPlaceholder('Enter address')).toHaveValue(data.address);
    await expect(page.getByPlaceholder('City')).toHaveValue(data.city);
    await expect(page.getByPlaceholder('State')).toHaveValue(data.state);
    await expect(page.getByPlaceholder('Zip code')).toHaveValue(data.zip);
    await expect(page.getByPlaceholder('Country')).toHaveValue(data.country);
  });
 
  // TODO — verify manually: if typing into "Enter address" triggers a real
  // suggestion dropdown (e.g. Google Places), the screenshot didn't show one
  // rendered, so this may just be a plain input. If it does exist, add:
  //   await page.getByPlaceholder('Enter address').fill('New Yo');
  //   await expect(page.locator('.pac-container')).toBeVisible(); // adjust selector
  // and a test that selecting a suggestion auto-fills City/State/Zip/Country.
});
 