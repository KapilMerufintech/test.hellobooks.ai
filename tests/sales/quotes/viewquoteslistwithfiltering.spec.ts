import { test, expect } from '@playwright/test';

/**
 * Test Scenario: View quotes list with filtering
 * Test ID: TEST-1769769927536
 */

test.describe('Quotes Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: In a real environment, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Email').fill('admin@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('View quotes list with filtering TEST-1769769927536', async ({ page }) => {
    // Step 1: Navigate to Sales > Quotes from sidebar
    // Using semantic selectors to navigate the menu
    await page.getByRole('button', { name: /sales/i }).click();
    await page.getByRole('link', { name: /quotes/i }).click();

    // Step 2: Verify quotes list is displayed
    // Expected Result 1 & 2: Page loads and columns are visible
    await expect(page).toHaveURL(/.*quotes/);
    await expect(page.getByRole('heading', { name: /quotations/i })).toBeVisible();
    
    const table = page.getByRole('table');
    await expect(table).toBeVisible();
    
    // Verify column headers
    const headers = ['Quote Number', 'Customer', 'Amount', 'Date', 'Status'];
    for (const header of headers) {
      await expect(table.getByRole('columnheader', { name: header, exact: false })).toBeVisible();
    }

    // Step 3: Apply status filter (Draft/Sent/Accepted/Declined)
    // Expected Result 3: List filters by selected status
    await page.getByLabel('Filter by Status').click();
    await page.getByRole('option', { name: 'Sent' }).click();
    
    // Verify that all visible rows have the 'Sent' status
    const statusCells = page.locator('tbody tr td:nth-child(5)'); // Assuming 5th column is status
    const rowCount = await statusCells.count();
    for (let i = 0; i < rowCount; i++) {
      await expect(statusCells.nth(i)).toHaveText(/Sent/i);
    }

    // Step 4: Apply date range filter
    // Expected Result 4: List filters by date range
    await page.getByPlaceholder('Start Date').fill('2023-01-01');
    await page.getByPlaceholder('End Date').fill('2023-12-31');
    await page.keyboard.press('Enter');
    
    // Verify list updates (checking for visibility of results)
    await expect(page.getByRole('row').nth(1)).toBeVisible();

    // Step 5: Search by quote number or customer name
    // Expected Result 5: Search results show matching quotes
    const searchTerm = 'QT-1001';
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.clear();
    await searchInput.fill(searchTerm);
    await page.keyboard.press('Enter');

    // Verify the specific quote appears in the results
    await expect(page.getByRole('cell', { name: searchTerm })).toBeVisible();
    
    // Verify that non-matching results are hidden
    const rows = page.locator('tbody tr');
    const finalCount = await rows.count();
    if (finalCount > 0) {
        for (let i = 0; i < finalCount; i++) {
            await expect(rows.nth(i)).toContainText(searchTerm);
        }
    }
  });
});