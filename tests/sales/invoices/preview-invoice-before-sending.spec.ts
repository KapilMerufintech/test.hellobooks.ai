import { test, expect } from '@playwright/test';

/**
 * @name Preview invoice before sending
 * @description Verify invoice preview displays correct formatted output
 * @priority medium
 * @type e2e
 * @tags invoice, preview, sales
 */

test.describe('Sales - Invoice Preview', () => {
  
  // Precondition: User is logged in
  // Note: Assuming authentication state is handled via global setup or storageState
  test.beforeEach(async ({ page }) => {
    // Navigate to the base URL
    await page.goto('/');
  });

  test('Preview invoice before sending @invoice @preview @sales', async ({ page }) => {
    // 1. Navigate to Sales > Invoices
    // Using semantic navigation
    await page.getByRole('link', { name: 'Sales' }).click();
    await page.getByRole('link', { name: 'Invoices' }).click();

    // Expected Result 1: Invoice list is displayed
    await expect(page.getByRole('heading', { name: 'Invoices' })).toBeVisible();
    const invoiceTable = page.getByRole('table');
    await expect(invoiceTable).toBeVisible();

    // 2. Select an invoice from the list
    // Selecting the first available invoice row
    const firstInvoiceRow = page.getByRole('row').nth(1);
    const invoiceNumber = await firstInvoiceRow.locator('td').first().innerText();
    await firstInvoiceRow.click();

    // Expected Result 2: Invoice is selected (often indicated by a detail view or highlight)
    // Here we assume clicking the row navigates to details or enables actions
    await expect(page.getByText(`Details for ${invoiceNumber}`)).toBeVisible();

    // 3. Click Preview button
    await page.getByRole('button', { name: /preview/i }).click();

    // Expected Result 3: Preview modal/page opens
    const previewContainer = page.getByRole('dialog').or(page.locator('.invoice-preview-container'));
    await expect(previewContainer).toBeVisible();

    // 4. Verify all invoice details in preview
    // Expected Result 4: Preview shows customer info, line items, totals, and dates correctly
    
    // Verify Customer Info
    await expect(previewContainer.getByText(/Bill To|Customer/i)).toBeVisible();
    
    // Verify Dates
    const datePattern = /\d{1,2}\/\d{1,2}\/\d{4}|\w+ \d{1,2}, \d{4}/;
    await expect(previewContainer.getByText(datePattern).first()).toBeVisible();

    // Verify Line Items Table
    const lineItems = previewContainer.getByRole('table').locator('tr');
    await expect(lineItems.count()).toBeGreaterThan(0);

    // Verify Totals (Subtotal, Tax, Total)
    await expect(previewContainer.getByText(/Total/i)).toBeVisible();
    // Check for currency format (e.g., $1,234.56)
    await expect(previewContainer.getByText(/\$\d{1,3}(,\d{3})*(\.\d{2})?/)).toBeVisible();

    // Close preview if it's a modal
    const closeButton = page.getByRole('button', { name: /close|exit/i });
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }
  });
});