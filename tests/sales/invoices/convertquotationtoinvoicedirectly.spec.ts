import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Convert quotation to invoice directly
 * Test ID: TEST-1769769976770
 */

test.describe('Sales Conversion Flow', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: In a real environment, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Email').fill('admin@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('Convert quotation to invoice directly TEST-1769769976770', async ({ page }) => {
    // Step 1: Navigate to Sales > Quotes
    await page.getByRole('link', { name: 'Sales' }).click();
    await page.getByRole('link', { name: 'Quotes' }).click();
    
    // Expected Result 1: Quotes list displays
    await expect(page.getByRole('heading', { name: 'Quotations' })).toBeVisible();

    // Step 2: Open an accepted quote
    // Precondition 2: An accepted quote exists. We look for a row with 'Accepted' status.
    const acceptedQuoteRow = page.locator('tr').filter({ hasText: 'Accepted' }).first();
    await expect(acceptedQuoteRow).toBeVisible();
    await acceptedQuoteRow.getByRole('link').first().click();

    // Expected Result 2: Quote preview opens
    await expect(page.getByText('Quote Details')).toBeVisible();
    
    // Capture quote data to verify transfer later (e.g., Amount and Client)
    const quoteAmount = await page.locator('[data-testid="quote-total"]').innerText();
    const clientName = await page.locator('[data-testid="client-name"]').innerText();

    // Step 3: Click 'Convert to Invoice' option
    await page.getByRole('button', { name: 'More Actions' }).click();
    await page.getByRole('menuitem', { name: 'Convert to Invoice' }).click();

    // Expected Result 3: Invoice creation form opens
    await expect(page).toHaveURL(/.*invoices\/create/);
    await expect(page.getByRole('heading', { name: 'Create Invoice' })).toBeVisible();

    // Step 4: Verify data is pre-populated in invoice form
    // Expected Result 4: All quote data transfers to invoice
    await expect(page.getByLabel('Client')).toHaveValue(clientName);
    await expect(page.locator('[data-testid="invoice-total"]')).toHaveText(quoteAmount);

    // Step 5: Save the invoice
    await page.getByRole('button', { name: 'Save Invoice' }).click();

    // Expected Result 5: Invoice is created and linked to quote
    await expect(page.getByText('Invoice created successfully')).toBeVisible();
    await expect(page.getByText(`Linked Quote: ${quoteAmount}`)).toBeVisible();
    
    // Verify the status is now 'Invoiced' or similar in the system
    await expect(page.locator('[data-testid="invoice-status"]')).toContainText('Draft');
  });
});