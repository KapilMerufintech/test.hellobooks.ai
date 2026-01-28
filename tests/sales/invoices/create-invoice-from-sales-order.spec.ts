import { test, expect } from '@playwright/test';

/**
 * @name Create invoice from sales order
 * @description Verify invoice can be generated from existing sales order
 * @priority high
 * @type e2e
 * @tags invoice, sales-order, conversion, sales
 */

test.describe('Sales to Invoice Conversion', () => {
  
  // Precondition: User is logged in
  // Note: Assuming authentication state is handled via global setup or storageState
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Create invoice from existing approved sales order', async ({ page }) => {
    // 1. Navigate to Sales > Invoices > Create Invoice
    // Using semantic navigation
    await page.getByRole('menuitem', { name: 'Sales' }).click();
    await page.getByRole('menuitem', { name: 'Invoices' }).click();
    await page.getByRole('button', { name: 'Create Invoice' }).click();

    // Expected Result 1: Create invoice page opens
    await expect(page).toHaveURL(/.*\/invoices\/create/);
    await expect(page.getByRole('heading', { name: 'Create Invoice' })).toBeVisible();

    // 2. Click Select Sales Order option
    await page.getByRole('button', { name: 'Select Sales Order' }).click();

    // Expected Result 2: Sales order selection modal appears
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Select Sales Order');

    // 3. Choose sales order from list
    // Precondition: Approved sales order exists. We select the first available approved order.
    const firstOrderRow = modal.getByRole('row').filter({ hasText: 'Approved' }).first();
    const orderId = await firstOrderRow.locator('td').first().innerText();
    await firstOrderRow.click();
    await modal.getByRole('button', { name: 'Confirm' }).click();

    // Expected Result 3: Sales order is selected
    await expect(modal).not.toBeVisible();

    // 4. Verify auto-populated details
    // Expected Result 4: Invoice fields populate from sales order
    // We check common fields like Customer and Total Amount
    await expect(page.getByLabel('Customer')).not.toBeEmpty();
    await expect(page.getByLabel('Total Amount')).not.toHaveValue('0');
    
    // Verify the link to the sales order is visible
    await expect(page.getByText(`Linked to: ${orderId}`)).toBeVisible();

    // 5. Click Save Invoice
    await page.getByRole('button', { name: 'Save Invoice', exact: true }).click();

    // Expected Result 5: Invoice is created linked to sales order
    // Verify success message and redirection to detail view
    await expect(page.getByText('Invoice created successfully')).toBeVisible();
    await expect(page).toHaveURL(/.*\/invoices\/view/);
    await expect(page.getByText(orderId)).toBeVisible();
  });
});