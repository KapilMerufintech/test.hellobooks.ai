import { test, expect } from '@playwright/test';

/**
 * @name Bill approval workflow submission
 * @description Verify bill can be submitted for approval and status changes correctly
 * @priority high
 * @type e2e
 * @tags bills, approval, workflow, status
 */

test.describe('Bill Approval Workflow', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Assuming authentication state is handled via global setup or a login helper
    await page.goto('/login');
    await page.getByLabel('Username').fill('test-user');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Precondition 2: Approval rules configured
    // (Usually handled via API setup or assumed environment state)
    
    // Precondition 3: Draft bill exists
    // Navigate to the bills list
    await page.goto('/bills');
  });

  test('should submit a draft bill for approval and verify status change', async ({ page }) => {
    // Step 1: Open existing draft bill for editing
    const draftBillRow = page.getByRole('row').filter({ hasText: 'Draft' }).first();
    await draftBillRow.getByRole('button', { name: 'Edit' }).click();

    // Expected Result 1: Bill opens in edit mode
    await expect(page.getByRole('heading', { name: /Edit Bill/i })).toBeVisible();
    await expect(page.getByRole('textbox', { name: /Bill Number/i })).not.toBeDisabled();

    // Step 2: Click 'Save & Submit for Approval'
    await page.getByRole('button', { name: 'Save & Submit for Approval' }).click();

    // Expected Result 2: Approval workflow triggered
    // Verify success notification or modal if applicable
    await expect(page.getByText(/Submitted for approval/i)).toBeVisible();

    // Step 3: Verify bill status changes to Awaiting Approval
    // Expected Result 3: Status badge shows 'Awaiting Approval'
    const statusBadge = page.getByTestId('bill-status-badge');
    await expect(statusBadge).toHaveText('Awaiting Approval');

    // Step 4: Check bill appears in Awaiting Approval tab
    await page.goto('/bills');
    await page.getByRole('tab', { name: 'Awaiting Approval' }).click();

    // Expected Result 4: Bill visible in Awaiting Approval tab filter
    // We use a unique identifier (like a bill number) if available, otherwise check the list
    const billInList = page.getByRole('cell', { name: 'Awaiting Approval' }).first();
    await expect(billInList).toBeVisible();
  });

  test.afterEach(async ({ page }) => {
    // Teardown: Clean up created data if necessary
  });
});