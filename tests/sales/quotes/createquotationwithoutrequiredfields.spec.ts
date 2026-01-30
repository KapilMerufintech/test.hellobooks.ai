import { test, expect } from '@playwright/test';

/**
 * Scenario: Create quotation without required fields
 * Test ID: TEST-1769769983576
 * Description: Verify validation errors when creating quote without required fields
 */

test.describe('Sales Quotes Validation', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1 & 2: User is logged in and has permissions
    // Note: In a real environment, authentication is often handled in global setup or via cookies
    await page.goto('/login');
    await page.getByLabel('Username').fill('sales_user');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: /log in/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('Create quotation without required fields TEST-1769769983576', async ({ page }) => {
    // Step 1: Navigate to Sales > Quotes
    // Assuming a navigation menu structure
    await page.getByRole('link', { name: 'Sales' }).click();
    await page.getByRole('link', { name: 'Quotes' }).click();

    // Expected Result 1: Quotes list displays
    await expect(page).toHaveURL(/.*quotes/);
    await expect(page.getByRole('heading', { name: 'Quotes' })).toBeVisible();

    // Step 2: Click 'New Quote' button
    await page.getByRole('button', { name: /new quote/i }).click();

    // Expected Result 2: Create quote form opens
    await expect(page.getByRole('heading', { name: /create quote/i })).toBeVisible();

    // Step 3: Leave customer field empty
    // Expected Result 3: Customer field shows empty
    const customerInput = page.getByLabel(/customer/i);
    await expect(customerInput).toBeEmpty();

    // Step 4: Leave line items empty
    // Expected Result 4: Line items section is empty
    // Assuming a table or list structure for line items
    const lineItems = page.locator('.line-items-row, [data-testid="line-item"]');
    await expect(lineItems).toHaveCount(0);

    // Step 5: Click 'Save' button
    await page.getByRole('button', { name: /save|submit/i }).click();

    // Expected Result 5: Validation errors display for required fields
    // Checking for common validation patterns (error messages or aria-invalid states)
    const customerError = page.getByText(/customer is required/i);
    const itemsError = page.getByText(/at least one item is required/i);

    await expect(customerError).toBeVisible();
    await expect(itemsError).toBeVisible();
    
    // Alternative check: ensure the URL hasn't changed to a success page
    await expect(page).toHaveURL(/.*create/);
  });
});