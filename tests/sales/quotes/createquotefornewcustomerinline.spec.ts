import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Create quote for new customer inline
 * Description: Verify user can create a new customer while creating a quote
 * Priority: medium
 * Tags: quotes, sales, customer, inline-create
 */

test.describe('Sales Quotes', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is logged in
    // Note: In a real environment, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Username').fill('test-user');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('Create quote for new customer inline TEST-1769770098914', async ({ page }) => {
    const customerName = `Auto Customer ${Date.now()}`;
    const customerEmail = `test-${Date.now()}@example.com`;

    // 1. Open new quote form
    await page.goto('/quotes/new');
    await expect(page.getByRole('heading', { name: 'Create New Quote' })).toBeVisible();

    // 2. Click on customer dropdown
    const customerDropdown = page.getByLabel('Customer', { exact: true });
    await customerDropdown.click();

    // 3. Click 'Add New Customer' option
    // Using getByRole or getByText based on common UI patterns for inline creation
    const addNewBtn = page.getByRole('button', { name: /Add New Customer/i });
    await expect(addNewBtn).toBeVisible();
    await addNewBtn.click();

    // 4. Fill in customer details in modal
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(modal.getByRole('heading')).toContainText(/Customer/i);

    await modal.getByLabel('Full Name').fill(customerName);
    await modal.getByLabel('Email').fill(customerEmail);
    await modal.getByLabel('Phone').fill('555-0123');

    // 5. Save customer
    await modal.getByRole('button', { name: 'Save' }).click();

    // Verify modal closes
    await expect(modal).not.toBeVisible();

    // 6. Verify customer is selected in quote
    // Check if the dropdown/select now displays the newly created customer name
    await expect(customerDropdown).toHaveValue(customerName);
    
    // Alternative check if it's a custom search/select component
    const selectedValue = page.locator('.customer-select-container .selected-item');
    if (await selectedValue.isVisible()) {
        await expect(selectedValue).toContainText(customerName);
    }

    // Final assertion to ensure the form is ready for the next step
    await expect(page.getByRole('button', { name: 'Submit Quote' })).toBeEnabled();
  });
});