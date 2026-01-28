import { test, expect } from '@playwright/test';

/**
 * @name Edit existing invoice
 * @description Verify user can modify an existing draft invoice
 * @priority high
 * @type e2e
 * @tags invoice, edit, sales, positive
 */

test.describe('Invoice Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: In a real scenario, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Username').fill('testuser');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Precondition 2: Ensure a draft invoice exists
    // This step assumes the environment is seeded or navigates to a state where data exists
  });

  test('Edit existing draft invoice', async ({ page }) => {
    // 1. Navigate to Sales > Invoices
    await page.getByRole('link', { name: 'Sales' }).click();
    await page.getByRole('link', { name: 'Invoices' }).click();

    // Expected Result 1: Invoice list displays all invoices
    await expect(page.getByRole('heading', { name: 'Invoices' })).toBeVisible();
    const invoiceTable = page.getByRole('table');
    await expect(invoiceTable).toBeVisible();

    // 2. Click on existing draft invoice
    // We look for a row that contains the 'Draft' status
    const draftInvoiceRow = page.locator('tr').filter({ hasText: 'Draft' }).first();
    await draftInvoiceRow.getByRole('link').first().click();

    // Expected Result 2: Invoice details page opens in edit mode
    await expect(page.getByRole('heading', { name: /Edit Invoice/i })).toBeVisible();

    // 3. Modify line item quantity
    const quantityInput = page.getByLabel('Quantity').first();
    const unitPrice = await page.getByLabel('Unit Price').first().inputValue();
    const initialTotal = await page.locator('[data-testid="total-amount"]').textContent();
    
    await quantityInput.fill('5');
    
    // Expected Result 3: Totals recalculate automatically
    // Assuming unitPrice is 100, total should now reflect 500
    const newTotal = page.locator('[data-testid="total-amount"]');
    await expect(newTotal).not.toHaveText(initialTotal || '');
    
    // 4. Update due date
    const newDate = '2025-12-31';
    const dueDateInput = page.getByLabel('Due Date');
    await dueDateInput.fill(newDate);

    // Expected Result 4: New due date is accepted
    await expect(dueDateInput).toHaveValue(newDate);

    // 5. Click Save Changes
    await page.getByRole('button', { name: 'Save Changes' }).click();

    // Expected Result 5: Changes are saved successfully
    // Verify success toast or redirection back to list/view mode
    await expect(page.getByText(/Invoice updated successfully/i)).toBeVisible();
    
    // Final verification of data persistence
    await expect(page.locator('[data-testid="display-due-date"]')).toHaveText(newDate);
  });
});