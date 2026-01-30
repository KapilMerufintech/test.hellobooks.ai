import { test, expect } from '@playwright/test';

/**
 * @name Create a new bill with line items and save as draft
 * @priority high
 * @type e2e
 * @tags bills, create, draft, purchases, smoke-test
 */

test.describe('Bills Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is logged in
    // Note: In a real scenario, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Email').fill('admin@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should create a new bill with line items and save as draft', async ({ page }) => {
    // 1. Navigate to Purchases > Bills from the sidebar
    await page.getByRole('navigation').getByText('Purchases').click();
    await page.getByRole('link', { name: 'Bills' }).click();
    
    // Expected Result: Bills list page loads
    await expect(page).toHaveURL(/\/list-bills/);

    // 2. Click on 'New Bill' button
    await page.getByRole('button', { name: 'New Bill' }).click();
    
    // Expected Result: Create bill form opens
    await expect(page).toHaveURL(/\/create-bills/);

    // 3. Select a vendor from the vendor dropdown
    const vendorDropdown = page.getByLabel('Vendor', { exact: true });
    await vendorDropdown.click();
    // Selecting the first available vendor from the list
    await page.getByRole('option').first().click();
    
    // Expected Result: Vendor is selected
    await expect(vendorDropdown).not.toBeEmpty();

    // 4. Enter bill number, issue date, and due date
    const billNumber = `BILL-${Date.now()}`;
    await page.getByLabel('Bill Number').fill(billNumber);
    
    // Using fill for dates as it's more reliable in automation than pickers
    await page.getByLabel('Issue Date').fill('2023-10-01');
    await page.getByLabel('Due Date').fill('2023-10-31');

    // 5. Add a line item with description, quantity, rate, and tax
    // 6. Select an expense account for the line item
    const lineItemRow = page.locator('tr.line-item').first();
    
    await lineItemRow.getByPlaceholder('Description').fill('Consulting Services');
    await lineItemRow.getByPlaceholder('Quantity').fill('2');
    await lineItemRow.getByPlaceholder('Rate').fill('100');
    
    // Select Expense Account
    await lineItemRow.getByLabel('Account').click();
    await page.getByRole('option', { name: 'Professional Fees' }).click();

    // Select Tax (e.g., 10%)
    await lineItemRow.getByLabel('Tax').click();
    await page.getByRole('option', { name: 'VAT (10%)' }).click();

    // 7. Verify the total amount is calculated correctly
    // Calculation: (2 * 100) + 10% tax = 220
    const totalAmount = page.locator('.total-amount-display');
    await expect(totalAmount).toHaveText(/220\.00/);

    // 8. Click 'Save Draft' button
    await page.getByRole('button', { name: 'Save Draft' }).click();

    // Expected Result: Bill is saved with Draft status and redirected to list
    await expect(page).toHaveURL(/\/list-bills/);
    
    // Verify the record exists in the list with correct status
    const firstRow = page.locator('table tbody tr').first();
    await expect(firstRow).toContainText(billNumber);
    await expect(firstRow).toContainText('Draft');
  });
});