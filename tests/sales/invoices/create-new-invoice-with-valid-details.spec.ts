import { test, expect } from '@playwright/test';

/**
 * @name Create new invoice with valid details
 * @description Verify user can create a new invoice with all required fields
 * @priority high
 * @type e2e
 * @tags invoice, create, sales, positive
 */

test.describe('Invoice Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: Assuming authentication state is handled via global setup or storageState
    await page.goto('/');
    
    // Precondition 2 & 3: Customer and Chart of Accounts are assumed to exist per requirements
  });

  test('should create a new invoice with valid details', async ({ page }) => {
    // 1. Navigate to Sales > Invoices
    await page.getByRole('link', { name: 'Sales' }).click();
    await page.getByRole('link', { name: 'Invoices' }).click();
    
    // Expected Result 1: Invoice list page is displayed
    await expect(page).toHaveURL(/.*\/invoices/);
    await expect(page.getByRole('heading', { name: 'Invoices' })).toBeVisible();

    // 2. Click Create Invoice button
    await page.getByRole('button', { name: /create invoice|new invoice/i }).click();

    // Expected Result 2: Create invoice form opens
    await expect(page).toHaveURL(/.*\/invoices\/new/);
    await expect(page.getByRole('heading', { name: /new invoice|create invoice/i })).toBeVisible();

    // 3. Select customer from dropdown
    const customerName = 'Acme Corp';
    await page.getByLabel(/customer|select customer/i).click();
    await page.getByRole('option', { name: customerName }).click();

    // Expected Result 3: Customer details auto-populate (e.g., billing address)
    // Checking if a common field like 'Billing Address' is no longer empty
    const billingAddress = page.getByLabel(/billing address/i);
    await expect(billingAddress).not.toBeEmpty();

    // 4. Add line items with description, quantity, and rate
    const lineItem = {
      description: 'Consulting Services',
      qty: '10',
      rate: '150'
    };

    const row = page.locator('tr.line-item').first(); // Adjusting selector based on common table structures
    await row.getByPlaceholder(/description/i).fill(lineItem.description);
    await row.getByPlaceholder(/qty|quantity/i).fill(lineItem.qty);
    await row.getByPlaceholder(/rate|price/i).fill(lineItem.rate);

    // Expected Result 4: Line item totals calculate correctly
    const expectedTotal = (Number(lineItem.qty) * Number(lineItem.rate)).toLocaleString();
    await expect(page.locator('text=Total')).toBeVisible();
    await expect(page.locator('.total-amount')).toContainText(expectedTotal);

    // 5. Set invoice date and due date
    const today = new Date().toISOString().split('T')[0];
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    const dueDateString = dueDate.toISOString().split('T')[0];

    await page.getByLabel(/invoice date/i).fill(today);
    await page.getByLabel(/due date/i).fill(dueDateString);

    // Expected Result 5: Dates are validated and accepted
    await expect(page.getByLabel(/invoice date/i)).toHaveValue(today);
    await expect(page.getByLabel(/due date/i)).toHaveValue(dueDateString);

    // 6. Click Save Invoice
    await page.getByRole('button', { name: /save|submit/i }).click();

    // Expected Result 6: Invoice is saved and appears in invoice list
    await expect(page).toHaveURL(/.*\/invoices/);
    await expect(page.getByText('Invoice created successfully')).toBeVisible();
    
    // Verify the new invoice appears in the list (using a unique identifier or customer name)
    await expect(page.getByRole('table')).toContainText(customerName);
    await expect(page.getByRole('table')).toContainText(expectedTotal);
  });
});