import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Convert quotation to sales order
 * Test ID: TEST-1769769969031
 */

test.describe('Sales Workflow', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: In a real environment, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Username').fill('test_user');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
  });

  test('Convert quotation to sales order TEST-1769769969031', async ({ page }) => {
    // Step 1: Navigate to Sales > Quotes
    await page.getByRole('link', { name: 'Sales' }).click();
    await page.getByRole('link', { name: 'Quotes' }).click();
    
    // Expected Result 1: Quotes list displays
    await expect(page.getByRole('heading', { name: 'Quotations' })).toBeVisible();

    // Step 2: Open an accepted quote
    // We look for a row that has the "Accepted" status badge
    const acceptedQuoteRow = page.locator('tr').filter({ hasText: 'Accepted' }).first();
    await acceptedQuoteRow.getByRole('link').first().click();

    // Expected Result 2: Quote preview opens
    await expect(page.getByText('Quote Details')).toBeVisible();
    
    // Capture quote data for verification later (e.g., Customer Name and Total)
    const customerName = await page.locator('[data-testid="customer-name"]').textContent();
    const quoteTotal = await page.locator('[data-testid="quote-total"]').textContent();

    // Step 3: Click 'Convert to Sales Order' option
    await page.getByRole('button', { name: 'Actions' }).click();
    await page.getByRole('menuitem', { name: 'Convert to Sales Order' }).click();

    // Expected Result 3: Sales order creation form opens
    await expect(page.getByRole('heading', { name: 'New Sales Order' })).toBeVisible();

    // Step 4: Verify data is pre-populated in sales order form
    // Expected Result 4: All quote data transfers to sales order
    await expect(page.getByLabel('Customer')).toHaveValue(customerName || '');
    await expect(page.locator('[data-testid="so-total"]')).toHaveText(quoteTotal || '');

    // Step 5: Save the sales order
    await page.getByRole('button', { name: 'Save Sales Order' }).click();

    // Expected Result 5: Sales order is created and linked to quote
    await expect(page.getByText(/Sales Order .* created successfully/)).toBeVisible();
    await expect(page.getByRole('link', { name: 'View Linked Quote' })).toBeVisible();
    
    // Verify the status is now "Converted" or "Ordered"
    await expect(page.locator('[data-testid="order-status"]')).toContainText('Ordered');
  });
});