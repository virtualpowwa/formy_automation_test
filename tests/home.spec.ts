import { test, expect } from '@playwright/test';

// Define the list of page components and their corresponding paths
const page_components = [
  { name: 'Autocomplete', path: '/autocomplete' },
  { name: 'Buttons', path: '/buttons' },
  { name: 'Checkbox', path: '/checkbox' },
  { name: 'Datepicker', path: '/datepicker' },
  { name: 'Drag and Drop', path: '/dragdrop' },
  { name: 'Dropdown', path: '/dropdown' },
  { name: 'Enabled and disabled elements', path: '/enabled' },
  { name: 'File Upload', path: '/fileupload' },
  { name: 'Key and Mouse Press', path: '/keypress' },
  { name: 'Modal', path: '/modal' },
  { name: 'Page Scroll', path: '/scroll' },
  { name: 'Radio Button', path: '/radiobutton' },
  { name: 'Switch Window', path: '/switch-window' },
  { name: 'Complete Web Form', path: '/form' },
];


// 1. Homepage title and content
test('Homepage contains title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Formy/);
})


test('Homepage contains headings and paragraph', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Welcome to Formy' })
  ).toBeVisible();

  await expect(
    page.getByText(
      'This is a simple site that has form components that can be used for testing purposes.'
    )
  ).toBeVisible();
});

// 2. Header and navigation links
test('Header Formy link navigates to homepage', async ({ page }) => {
  await page.goto('/form');

  await page.getByRole('link', { name: 'Formy' }).click();

  await expect(page).toHaveURL('/');
});



test('Header Form link navigates to form', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'Form', exact: true }).click();

  await expect(page).toHaveURL('/form');
});


test('Components menu opens correctly', async ({ page }) => {
  await page.goto('/');

  const componentsButton =  page.getByRole('link', { name: 'Components' });

  await componentsButton.click();

  await expect(componentsButton)
    .toHaveAttribute('aria-expanded', 'true');

  const componentsMenu = page.locator(
    '[aria-labelledby="navbarDropdownMenuLink"]'
  );

  await expect(componentsMenu).toBeVisible();

  for (const item of page_components) {
    const menuItem = componentsMenu.getByRole('link', {
      name: item.name,
      exact: true
    });

    console.log('count in menu:', await menuItem.count());
    await expect(menuItem).toBeVisible();
  }

});

//Header components  
for (const item of page_components) {
  test(`Components menu - ${item.name} navigates correctly`, async ({ page }) => {
    await page.goto('/');

    const componentsButton = page.getByRole('link', { name: 'Components', exact: true });
    const componentsMenu = page.locator('[aria-labelledby="navbarDropdownMenuLink"]');

    await componentsButton.click();
    await expect(componentsButton).toHaveAttribute('aria-expanded', 'true');
    await expect(componentsMenu).toBeVisible();

    const menuItem = componentsMenu.getByRole('link', { name: item.name, exact: true });

    await expect(menuItem).toBeVisible();
    await expect(menuItem).toHaveAttribute('href', new RegExp(`${item.path}$`));

    await menuItem.click();
    await expect(page).toHaveURL(new RegExp(`${item.path}$`));
  });
}


// Check if navbar hidden on mobile and tablet widths
test.describe('Responsive navbar', () => {
  test('nav links hidden on mobile width', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    await expect(page.getByRole('link', { name: 'Form', exact: true })).toBeHidden();
    await expect(page.getByRole('button', { name: 'Components', exact: true })).toBeHidden();
  });

  test('nav links hidden on tablet width', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    await expect(page.getByRole('link', { name: 'Form', exact: true })).toBeHidden();
    await expect(page.getByRole('button', { name: 'Components', exact: true })).toBeHidden();
  });
});



//Components on body  
for (const item of page_components) {
  test(`${item.name} link navigates to correct URL`, async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: item.name }).click();

    await expect(page).toHaveURL(new RegExp(`${item.path}$`));
  });
}