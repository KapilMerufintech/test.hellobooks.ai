import { test, expect } from '@playwright/test';

/**
 * @name Apply tax rates to invoice line items
 * @description Verify tax calculations apply correctly to invoice items
 * @priority high
 * @type e2e
 * @tags invoice, tax, calculation, sales
 */

test.describe('Invoice Tax Calculations', () => {
  
  // Preconditions: User is logged in, Tax rates configured, Customer exists
  test.beforeEach(async ({ page }) => {
    // Assuming authentication state is handled via global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Email').fill('admin@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should correctly calculate tax and total for invoice line items', async ({ page }) => {
    const testData = {
      customerName: 'Acme Corp',
      itemDescription: 'Consulting Services',
      unitPrice: 1000,
      taxRatePercent: 15,
      expectedTaxAmount: 150,
      expectedTotal: 1150
    };

    // 1. Navigate to Create Invoice
    await test.step('Navigate to Create Invoice', async () => {
      await page.getByRole('link', { name: 'Invoices' }).click();
      await page.getByRole('button', { name: 'Create Invoice' }).click();
      
      // Expected Result: Create invoice form opens
      await expect(page.getByRole('heading', { name: 'New Invoice' })).toBeVisible();
    });

    // 2. Select customer
    await test.step('Select customer', async () => {
      await page.getByLabel('Select Customer').click();
      await page.getByRole('option', { name: testData.customerName }).click();
      
      // Expected Result: Customer is selected
      await expect(page.getByLabel('Select Customer')).toHaveValue(/.*Acme Corp.*/);
    });

    // 3. Add line item with amount
    await test.step('Add line item with amount', async () => {
      await page.getByRole('button', { name: 'Add Item' }).click();
      
      const row = page.locator('tr.invoice-line-item').last();
      await row.getByPlaceholder('Description').fill(testData.itemDescription);
      await row.getByPlaceholder('Price').fill(testData.unitPrice.toString());
      
      // Expected Result: Line item is added
      await expect(row.getByPlaceholder('Description')).toHaveValue(testData.itemDescription);
    });

    // 4. Select applicable tax rate
    await test.step('Select applicable tax rate', async () => {
      const row = page.locator('tr.invoice-line-item').last();
      
      // Selecting tax rate (e.g., VAT 15%)
      await row.getByRole('combobox', { name: 'Tax Rate' }).selectOption({ label: `VAT (${testData.taxRatePercent}%)` });
      
      // Expected Result: Tax rate is applied to line item
      await expect(row.getByRole('combobox', { name: 'Tax Rate' })).toContainText(`${testData.taxRatePercent}%`);
    });

    // 5. Verify tax and total calculations
    await test.step('Verify tax and total calculations', async () => {
      // Locators for summary fields
      const taxAmountDisplay = page.getByTestId('summary-tax-amount');
      const grandTotalDisplay = page.getByTestId('summary-grand-total');

      // Expected Result: Tax amount and grand total calculate correctly
      // We use regex to handle currency symbols like $150.00
      await expect(taxAmountDisplay).toContainText(testData.expectedTaxAmount.toLocaleString());
      await expect(grandTotalDisplay).toContainText(testData.expectedTotal.toLocaleString());
      
      // Final form submission to ensure state is valid
      await page.getByRole('button', { name: 'Save Invoice' }).click();
      await expect(page.getByText('Invoice created successfully')).toBeVisible();
    });
  });
});