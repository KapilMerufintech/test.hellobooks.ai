import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Bill variance review and resolution
 * Description: Verify variance between bill and PO/GRN can be reviewed and resolved
 * Priority: high
 * Type: e2e
 * Tags: @bills, @variance, @review, @3-way-match
 */

test.describe('Bill Variance Management', () => {
  const billId = 'BILL-VAR-001';
  const reviewUrl = `/bills/review/${billId}`;

  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: Assuming auth state is handled via playwright.config.ts or global setup
    await page.goto('/bills');
    
    // Precondition 3: Ensure user has review permissions (Implicitly verified by UI access)
  });

  test('Verify variance between bill and PO/GRN can be reviewed and resolved', async ({ page }) => {
    // Step 1: Navigate to bill with variance > Open Bill Details Drawer
    const billRow = page.getByRole('row').filter({ hasText: billId });
    await billRow.click();

    // Expected Result 1: Drawer shows 3-way match variance indicators
    const drawer = page.getByRole('dialog', { name: /bill details/i });
    await expect(drawer).toBeVisible();
    await expect(drawer.getByText(/variance detected/i)).toBeVisible();
    await expect(drawer.getByTestId('variance-indicator')).toBeVisible();

    // Step 2: Click Review button to go to /bills/review/:billId
    await drawer.getByRole('button', { name: /review/i }).click();
    await expect(page).toHaveURL(new RegExp(reviewUrl));

    // Expected Result 2: Review page displays variance analysis
    await expect(page.getByRole('heading', { name: /variance analysis/i })).toBeVisible();
    await expect(page.getByTestId('po-grn-comparison-table')).toBeVisible();

    // Step 3: Review variance details and select Accept/Reject action
    // We will select 'Accept' for this scenario
    await page.getByRole('radio', { name: /accept variance/i }).check();
    await page.getByPlaceholder(/reason for resolution/i).fill('Price difference within acceptable threshold');

    // Step 4: Complete bill review
    // Intercept the resolution API call to verify Expected Result 3
    const resolutionPromise = page.waitForResponse(response => 
      response.url().includes(`/api/bills/${billId}/resolve`) && response.status() === 200
    );

    await page.getByRole('button', { name: /complete review/i }).click();

    // Expected Result 3: Variance resolution API called successfully
    const response = await resolutionPromise;
    expect(response.ok()).toBeTruthy();

    // Expected Result 4: Bill status updated based on resolution
    // Usually redirects back to list or shows success state
    await expect(page.getByText(/review completed successfully/i)).toBeVisible();
    
    // Verify status in the list or detail view
    await page.goto(`/bills/${billId}`);
    const statusBadge = page.getByTestId('bill-status');
    await expect(statusBadge).toHaveText(/approved|resolved/i);
  });
});