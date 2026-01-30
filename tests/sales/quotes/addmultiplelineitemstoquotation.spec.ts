import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Add multiple line items to quotation
 * Test ID: TEST-1769770015336
 */

test.describe('Sales Quotation Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is logged in
    // Note: In a real-world scenario, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Username').fill('sales_user');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
  });

  test('Add multiple line items to quotation TEST-1769770015336', async ({ page }) => {
    // 1. Navigate to Sales > Quotes
    await page.getByRole('link', { name: 'Sales' }).click();
    await page.getByRole('link', { name: 'Quotes' }).click();
    
    // Expected Result: Quotes list displays
    await expect(page.getByRole('heading', { name: 'Quotations' })).toBeVisible();

    // 2. Click 'New Quote' button
    await page.getByRole('button', { name: 'New Quote' }).click();

    // Expected Result: Create quote form opens
    await expect(page.getByRole('heading', { name: 'Create New Quote' })).toBeVisible();

    // 3. Select customer
    await page.getByLabel('Customer').click();
    await page.getByRole('option', { name: 'Acme Corp' }).click();
    
    // Expected Result: Customer selected
    await expect(page.getByLabel('Customer')).toHaveValue(/Acme Corp/);

    // 4. Add first line item with product A
    await page.getByRole('button', { name: 'Add Item' }).click();
    const row1 = page.locator('.line-item-row').nth(0);
    await row1.getByPlaceholder('Select Product').fill('Product A');
    await page.getByRole('option', { name: 'Product A' }).click();
    await row1.getByLabel('Quantity').fill('2');
    
    // Expected Result: First line item added with correct rate (assuming rate is $50)
    await expect(row1.getByLabel('Rate')).toHaveValue('50.00');
    await expect(row1.getByLabel('Amount')).toHaveValue('100.00');

    // 5. Add second line item with product B
    await page.getByRole('button', { name: 'Add Item' }).click();
    const row2 = page.locator('.line-item-row').nth(1);
    await row2.getByPlaceholder('Select Product').fill('Product B');
    await page.getByRole('option', { name: 'Product B' }).click();
    await row2.getByLabel('Quantity').fill('1');
    
    // Expected Result: Second line item added (assuming rate is $75)
    await expect(row2.getByLabel('Rate')).toHaveValue('75.00');

    // 6. Add third line item as custom description
    await page.getByRole('button', { name: 'Add Item' }).click();
    const row3 = page.locator('.line-item-row').nth(2);
    await row3.getByPlaceholder('Description').fill('Custom Consulting Service');
    await row3.getByLabel('Quantity').fill('1');
    await row3.getByLabel('Rate').fill('200.00');

    // Expected Result: Custom line item added
    await expect(row3.getByPlaceholder('Description')).toHaveValue('Custom Consulting Service');

    // 7. Verify subtotal and total calculations
    // Calculations: (2 * 50) + (1 * 75) + (1 * 200) = 100 + 75 + 200 = 375
    const subtotal = page.locator('[data-testid="quote-subtotal"]');
    const tax = page.locator('[data-testid="quote-tax"]'); // Assuming 10% tax = 37.50
    const total = page.locator('[data-testid="quote-total"]');

    // Expected Result: All totals calculate correctly
    await expect(subtotal).toHaveText('$375.00');
    await expect(tax).toHaveText('$37.50');
    await expect(total).toHaveText('$412.50');

    // Finalize the quote
    await page.getByRole('button', { name: 'Save Quote' }).click();
    await expect(page.getByText('Quote created successfully')).toBeVisible();
  });
});