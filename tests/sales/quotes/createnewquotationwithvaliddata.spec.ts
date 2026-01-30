import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Create new quotation with valid data
 * Test ID: TEST-1769769895979
 */

test.describe('Sales Quotation Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is logged in
    // Note: In a real-world scenario, this would use a global setup or a login helper
    await page.goto('/login');
    await page.getByLabel('Email').fill('admin@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('Create new quotation with valid data TEST-1769769895979', async ({ page }) => {
    // 1. Navigate to Sales > Quotes from sidebar
    await page.getByRole('link', { name: 'Sales' }).click();
    await page.getByRole('link', { name: 'Quotes' }).click();
    
    // Expected Result: Quotes list page loads successfully
    await expect(page).toHaveURL(/.*quotes/);
    await expect(page.getByRole('heading', { name: 'Quotations' })).toBeVisible();

    // 2. Click on 'New Quote' button
    await page.getByRole('button', { name: 'New Quote' }).click();

    // Expected Result: Create quote form opens
    await expect(page).toHaveURL(/.*quotes\/create/);
    await expect(page.getByRole('heading', { name: 'Create Quote' })).toBeVisible();

    // 3. Select a customer from dropdown
    // Expected Result: Customer is selected and details populated
    await page.getByLabel('Customer').click();
    await page.getByRole('option').first().click(); 
    await expect(page.locator('input[name="customer_id"]')).not.toBeEmpty();

    // 4. Enter quote date and expiry date
    // Expected Result: Dates are accepted and validated
    const today = new Date().toISOString().split('T')[0];
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);
    const expiryStr = expiry.toISOString().split('T')[0];

    await page.getByLabel('Quote Date').fill(today);
    await page.getByLabel('Expiry Date').fill(expiryStr);

    // 5. Add line items with description, quantity, and rate
    // 6. Select tax rate for line items
    // Expected Result: Line items are added with calculated totals and tax applied
    const lineItemRow = page.locator('.line-item-row').first();
    await lineItemRow.getByPlaceholder('Description').fill('Consulting Services');
    await lineItemRow.getByPlaceholder('Qty').fill('10');
    await lineItemRow.getByPlaceholder('Rate').fill('100');
    
    // Select Tax (e.g., 10%)
    await lineItemRow.locator('select[name="tax_id"]').selectOption({ label: 'VAT 10%' });

    // Assertion for calculation: 10 * 100 = 1000. With 10% tax = 1100.
    await expect(page.locator('.total-amount')).toContainText('1,100.00');

    // 7. Add notes and terms
    // Expected Result: Notes and terms are saved
    await page.getByLabel('Notes').fill('Thank you for your business.');
    await page.getByLabel('Terms').fill('Payment due within 30 days.');

    // 8. Click 'Save' button
    await page.getByRole('button', { name: 'Save' }).click();

    // Expected Result: Quote is created and appears in quotes list
    await expect(page).toHaveURL(/.*quotes/);
    await expect(page.getByText('Quotation created successfully')).toBeVisible();
    
    // Verify the new quote exists in the list (checking for the customer or total)
    await expect(page.getByRole('table')).toContainText('Consulting Services');
  });
});