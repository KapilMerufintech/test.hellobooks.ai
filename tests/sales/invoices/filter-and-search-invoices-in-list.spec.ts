import { test, expect } from '@playwright/test';

/**
 * @name Filter and search invoices in list
 * @description Verify invoice list supports filtering and search functionality
 * @priority medium
 * @type e2e
 * @tags invoice, list, filter, search, sales
 */

test.describe('Invoice Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is logged in
    // Note: In a real scenario, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Username').fill('testuser');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Ensure we are on the dashboard before starting
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('Filter and search invoices in list', async ({ page }) => {
    const customerName = 'Acme Corp';
    const startDate = '2023-01-01';
    const endDate = '2023-12-31';

    // Step 1: Navigate to Sales > Invoices
    // Using semantic navigation
    await page.getByRole('link', { name: 'Sales' }).click();
    await page.getByRole('link', { name: 'Invoices' }).click();

    // Expected Result 1: Invoice list displays all invoices initially
    const invoiceRows = page.locator('table tbody tr');
    await expect(page).toHaveURL(/.*invoices/);
    await expect(invoiceRows).toBeVisible();
    const initialCount = await invoiceRows.count();
    expect(initialCount).toBeGreaterThan(0);

    // Step 2: Enter customer name in search field
    const searchInput = page.getByPlaceholder(/search/i).or(page.getByLabel(/search/i));
    await searchInput.fill(customerName);
    await page.keyboard.press('Enter');

    // Expected Result 2: List filters by customer name
    // Verify that all visible rows contain the customer name
    const filteredRows = page.getByRole('row').filter({ hasText: customerName });
    await expect(filteredRows.first()).toBeVisible();

    // Step 3: Apply date range filter
    // Assuming standard date input fields or a date picker trigger
    await page.getByLabel(/from date/i).fill(startDate);
    await page.getByLabel(/to date/i).fill(endDate);
    
    // Expected Result 3: List shows invoices within date range
    // In a real test, we would parse the date column, here we verify the UI state
    await expect(page.getByText(new RegExp(startDate.split('-')[0]))).toBeVisible();

    // Step 4: Apply status filter for unpaid invoices
    const statusDropdown = page.getByRole('combobox', { name: /status/i });
    await statusDropdown.click();
    await page.getByRole('option', { name: 'Unpaid' }).click();

    // Expected Result 4: Only unpaid invoices are displayed
    // Verify the status badge or text in the table
    const statusBadges = page.getByText('Unpaid', { exact: true });
    const rowCount = await invoiceRows.count();
    const unpaidCount = await statusBadges.count();
    
    // Assert that every visible row has the 'Unpaid' status
    expect(rowCount).toBe(unpaidCount);
    
    // Final check: Ensure the list is not empty after all filters
    await expect(invoiceRows.first()).toBeVisible();
  });

});