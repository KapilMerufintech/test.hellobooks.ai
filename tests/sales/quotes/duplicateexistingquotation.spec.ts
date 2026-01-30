import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Duplicate existing quotation
 * Test ID: TEST-1769770039014
 */

test.describe('Sales Quotation Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: In a real environment, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Username').fill('sales_user');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
  });

  test('Duplicate existing quotation TEST-1769770039014', async ({ page }) => {
    // Step 1: Navigate to Sales > Quotes
    await page.getByRole('link', { name: 'Sales' }).click();
    await page.getByRole('link', { name: 'Quotes' }).click();
    
    // Expected Result 1: Quotes list displays
    await expect(page.getByRole('heading', { name: 'Quotations' })).toBeVisible();
    const quoteRow = page.locator('table tbody tr').first();
    await expect(quoteRow).toBeVisible();

    // Step 2: Open an existing quote
    const originalQuoteId = await quoteRow.locator('td').first().innerText();
    await quoteRow.getByRole('link').click();

    // Expected Result 2: Quote preview opens
    await expect(page.getByText(`Quote: ${originalQuoteId}`)).toBeVisible();

    // Step 3: Click 'Copy' or 'Duplicate' action
    // Using a flexible selector to match common naming conventions
    const duplicateBtn = page.getByRole('button', { name: /Duplicate|Copy/i });
    await duplicateBtn.click();

    // Expected Result 3 & 4: New quote form opens with copied data
    await expect(page.getByRole('heading', { name: /New Quote|Create Quote/i })).toBeVisible();
    
    // Verify data is copied (e.g., Customer field should not be empty)
    const customerValue = await page.getByLabel('Customer').inputValue();
    expect(customerValue).not.toBe('');

    // Step 5: Modify quote number if needed
    // Many systems auto-generate, but if manual entry is allowed:
    const quoteNumberInput = page.getByLabel(/Quote Number|Reference/i);
    if (await quoteNumberInput.isVisible() && !(await quoteNumberInput.isDisabled())) {
      const newQuoteRef = `QT-${Date.now()}`;
      await quoteNumberInput.clear();
      await quoteNumberInput.fill(newQuoteRef);
    }

    // Step 6: Save the duplicated quote
    await page.getByRole('button', { name: /Save|Submit/i }).click();

    // Expected Result 6: New quote is created successfully
    // Verify success message or redirection to the new quote view
    await expect(page.getByText(/successfully created|saved/i)).toBeVisible();
    
    // Verify we are no longer on the original quote
    const currentUrl = page.url();
    expect(currentUrl).not.toContain(originalQuoteId);
  });
});