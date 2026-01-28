import { test, expect } from '@playwright/test';

/**
 * @name Validate required fields on invoice creation
 * @description Verify system validates mandatory fields when creating invoice
 * @priority high
 * @type e2e
 * @tags invoice, validation, negative, sales
 */

test.describe('Invoice Validation Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is logged in
    // Note: In a real scenario, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Username').fill('test_user');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: /log in/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('Validate required fields on invoice creation', async ({ page }) => {
    // 1. Navigate to Sales > Invoices
    await page.getByRole('link', { name: 'Sales' }).click();
    await page.getByRole('link', { name: 'Invoices' }).click();
    
    // Expected Result 1: Invoice list page displayed
    await expect(page).toHaveURL(/.*sales\/invoices/);
    await expect(page.getByRole('heading', { name: 'Invoices' })).toBeVisible();

    // 2. Click Create Invoice
    await page.getByRole('button', { name: /create invoice/i }).click();

    // Expected Result 2: Create invoice form opens
    await expect(page).toHaveURL(/.*invoices\/create/);
    await expect(page.getByRole('heading', { name: /new invoice/i })).toBeVisible();

    // 3. Leave customer field empty
    const customerSelect = page.getByLabel(/customer/i);
    await expect(customerSelect).toHaveValue('');

    // Expected Result 3: Customer field shows empty
    // (Already verified by the assertion above)

    // 4. Leave line items empty
    const lineItemsTable = page.getByRole('table', { name: /line items/i });
    // Assuming an empty state shows no rows or a specific placeholder
    const rowCount = await page.locator('tr.line-item-row').count();
    
    // Expected Result 4: Line items section is empty
    expect(rowCount).toBe(0);

    // 5. Click Save Invoice
    await page.getByRole('button', { name: /save invoice/i }).click();

    // Expected Result 5: Validation errors displayed for required fields
    // Checking for generic validation messages or specific field errors
    const customerError = page.getByText(/customer is required/i);
    const itemsError = page.getByText(/at least one line item is required/i);

    await expect(customerError).toBeVisible();
    await expect(itemsError).toBeVisible();
    
    // Verify we are still on the creation page (form didn't submit)
    await expect(page).toHaveURL(/.*invoices\/create/);
  });
});