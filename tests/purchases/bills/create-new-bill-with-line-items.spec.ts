import { test, expect } from '@playwright/test';

/**
 * @name Create new bill with line items
 * @description Verify user can create a new bill with vendor, line items, and save as draft
 * @priority high
 * @type e2e
 * @tags bills, create, draft, line-items
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
    const billNumber = `BILL-${Math.floor(Math.random() * 10000)}`;
    
    // Step 1: Navigate to Purchases > Bills > Click New Bill
    await page.getByRole('link', { name: 'Purchases' }).click();
    await page.getByRole('link', { name: 'Bills', exact: true }).click();
    await page.getByRole('button', { name: 'New Bill' }).click();

    // Expected Result 1: Bill form opens at /create-bills
    await expect(page).toHaveURL(/.*create-bills/);

    // Step 2: Select vendor and enter bill number, issue date, due date
    await page.getByLabel('Vendor').click();
    await page.getByRole('option', { name: 'Acme Corp' }).click();
    
    await page.getByLabel('Bill Number').fill(billNumber);
    await page.getByLabel('Issue Date').fill('2023-10-01');
    await page.getByLabel('Due Date').fill('2023-10-15');

    // Expected Result 2: Vendor and dates populated correctly
    await expect(page.getByLabel('Bill Number')).toHaveValue(billNumber);

    // Step 3: Add line items with description, qty, rate, tax, account
    // First Line Item
    const row1 = page.locator('tr').filter({ hasText: '1' });
    await row1.getByPlaceholder('Description').fill('Consulting Services');
    await row1.getByPlaceholder('Qty').fill('2');
    await row1.getByPlaceholder('Rate').fill('100');
    await row1.getByLabel('Account').click();
    await page.getByRole('option', { name: 'Professional Fees' }).click();
    await row1.getByLabel('Tax').click();
    await page.getByRole('option', { name: 'VAT 10%' }).click();

    // Expected Result 3: Line items calculate totals correctly
    // (2 * 100) + 10% tax = 220
    await expect(page.locator('text=Total: $220.00')).toBeVisible();

    // Step 4: Click Save Draft
    await page.getByRole('button', { name: 'Save Draft' }).click();

    // Expected Result 4: Bill saved with Draft status and appears in list
    await expect(page).toHaveURL(/.*bills/);
    
    const billRow = page.getByRole('row', { name: billNumber });
    await expect(billRow).toBeVisible();
    await expect(billRow.getByText('Draft')).toBeVisible();
    await expect(billRow.getByText('$220.00')).toBeVisible();
  });
});