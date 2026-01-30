import { test, expect } from '@playwright/test';

/**
 * @name Create a new bill with line items and save as draft
 * @priority high
 * @type e2e
 * @tags bills, create, draft, purchases, smoke
 */

test.describe('Purchases: Bill Creation', () => {
    
    test.beforeEach(async ({ page }) => {
        // Precondition: User is logged in
        // In a real scenario, this would use a storageState or a login helper
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
        // Note: Using getByRole('combobox') or getByLabel as per semantic best practices
        await page.getByLabel('Vendor').click();
        await page.getByRole('option').first().click(); 

        // Expected Result: Vendor is selected and currency auto-populates
        await expect(page.locator('input[name="currency"]')).not.toBeEmpty();

        // 4. Enter bill number, issue date, and due date
        const billNumber = `BILL-${Date.now()}`;
        await page.getByLabel('Bill Number').fill(billNumber);
        await page.getByLabel('Issue Date').fill('2023-10-01');
        await page.getByLabel('Due Date').fill('2023-10-31');

        // 5. Add a line item with description, quantity, rate, and tax
        // Assuming a table structure for line items
        const row = page.locator('table#line-items-table tbody tr').first();
        await row.getByPlaceholder('Description').fill('Consulting Services');
        await row.getByPlaceholder('Qty').fill('2');
        await row.getByPlaceholder('Rate').fill('100');
        
        // Select Tax
        await row.locator('.tax-selector').click();
        await page.getByRole('option', { name: 'VAT 10%' }).click();

        // 6. Select an expense account for the line item
        await row.locator('.account-selector').click();
        await page.getByRole('option', { name: 'Professional Fees' }).click();

        // Expected Result: Line item is added with calculated totals
        // (2 * 100) + 10% tax = 220
        await expect(page.locator('.total-amount')).toHaveText(/220/);

        // 7. Click 'Save Draft' button
        await page.getByRole('button', { name: 'Save Draft' }).click();

        // Expected Result: Bill is saved with Draft status and user is redirected to /list-bills
        await expect(page).toHaveURL(/\/list-bills/);
        
        // Verify the record exists in the list with Draft status
        const firstRow = page.getByRole('row').filter({ hasText: billNumber });
        await expect(firstRow).toBeVisible();
        await expect(firstRow).toContainText('Draft');
    });
});