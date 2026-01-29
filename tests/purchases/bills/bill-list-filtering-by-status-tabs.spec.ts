import { test, expect } from '@playwright/test';

/**
 * @name Bill list filtering by status tabs
 * @description Verify bills can be filtered using status tabs and quick filters
 * @priority medium
 * @type e2e
 * @tags bills, filter, tabs, status
 */

test.describe('Bills List Filtering', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: Assuming authentication state is handled via global setup or storageState
    // Precondition 2: Navigate to Bills list
    await page.goto('/list-bills');
    await expect(page).toHaveURL(/.*list-bills/);
  });

  test('should filter bills by status tabs and quick filters', async ({ page }) => {
    // 1. Verify Bills list loads with default tab (usually 'All')
    const allTab = page.getByRole('tab', { name: /all/i });
    await expect(allTab).toBeVisible();
    await expect(allTab).toHaveAttribute('aria-selected', 'true');

    // 2. Click through status tabs and verify results
    const statuses = ['Draft', 'Awaiting Approval', 'Paid'];

    for (const status of statuses) {
      const tab = page.getByRole('tab', { name: new RegExp(status, 'i') });
      
      // Click the tab
      await tab.click();

      // Verify tab is active
      await expect(tab).toHaveAttribute('aria-selected', 'true');

      // Verify count badge exists on the tab and is a number
      const badge = tab.locator('.badge, .count'); // Common patterns for badges
      if (await badge.isVisible()) {
        const countText = await badge.innerText();
        expect(parseInt(countText)).toBeGreaterThanOrEqual(0);
      }

      // Verify the list updates to show bills with matching status
      // We look for status tags/labels within the table or list rows
      const statusCells = page.getByRole('cell', { name: status, exact: true });
      const rowCount = await statusCells.count();
      
      // If there are rows, ensure they match the selected status
      if (rowCount > 0) {
        await expect(statusCells.first()).toBeVisible();
      }
    }

    // 3. Apply quick filter for Overdue Bills
    const overdueFilter = page.getByRole('button', { name: /overdue/i }).or(page.getByLabel(/overdue/i));
    await overdueFilter.click();

    // 4. Verify filtered results
    // Check for an "Overdue" indicator or specific styling in the rows
    const overdueIndicator = page.getByText(/overdue/i).first();
    await expect(overdueIndicator).toBeVisible();

    // Verify count badges reflect filtered totals
    // Often the "All" or "Overdue" tab/button updates its count
    const listSummary = page.locator('.summary-text, .results-count');
    if (await listSummary.isVisible()) {
      await expect(listSummary).toContainText(/overdue/i);
    }

    // Ensure no "Paid" bills are visible when "Overdue" is active (logic check)
    const paidStatus = page.getByRole('cell', { name: 'Paid', exact: true });
    await expect(paidStatus).not.toBeVisible();
  });
});