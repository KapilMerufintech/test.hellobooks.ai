import { test, expect } from '@playwright/test';

/**
 * @name Delete and restore bill
 * @description Verify bill can be deleted and restored from archived tab
 * @priority low
 * @type e2e
 * @tags bills, delete, restore, archive
 */

test.describe('Bill Management - Delete and Restore', () => {
  const billName = `Draft Bill ${Date.now()}`;

  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: Assuming authentication state is handled via global setup or storageState
    await page.goto('/bills');

    // Precondition 2: Draft bill exists
    // Creating a draft bill via UI or API to ensure test isolation
    await page.getByRole('button', { name: /create/i }).click();
    await page.getByLabel(/bill name/i).fill(billName);
    await page.getByRole('button', { name: /save as draft/i }).click();
    await expect(page.getByText('Bill created successfully')).toBeVisible();
  });

  test('should delete a draft bill and restore it from the archived tab', async ({ page }) => {
    // 1. Navigate to Bills list > Click row action menu > Delete
    const billRow = page.getByRole('row').filter({ hasText: billName });
    await billRow.getByRole('button', { name: /actions/i }).click();
    await page.getByRole('menuitem', { name: /delete/i }).click();

    // 2. Confirm deletion in dialog
    // Expected Result 1: Delete confirmation appears
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText(/are you sure/i);
    
    await dialog.getByRole('button', { name: /confirm/i }).click();

    // Expected Result 2: Bill removed from active list
    await expect(page.getByText('Bill deleted successfully')).toBeVisible();
    await expect(billRow).not.toBeVisible();

    // 3. Navigate to Archived tab > Find deleted bill
    await page.getByRole('tab', { name: /archived/i }).click();
    
    // Expected Result 3: Bill appears in Archived tab
    const archivedRow = page.getByRole('row').filter({ hasText: billName });
    await expect(archivedRow).toBeVisible();

    // 4. Click Restore action
    await archivedRow.getByRole('button', { name: /actions/i }).click();
    await page.getByRole('menuitem', { name: /restore/i }).click();

    // Expected Result 4: Restored bill returns to original status
    await expect(page.getByText('Bill restored successfully')).toBeVisible();
    await page.getByRole('tab', { name: /active/i }).click();
    
    const restoredRow = page.getByRole('row').filter({ hasText: billName });
    await expect(restoredRow).toBeVisible();
    await expect(restoredRow).toContainText(/draft/i);
  });

  test.afterEach(async ({ page }) => {
    // Cleanup: Delete the bill if it exists to keep the environment clean
    try {
        await page.goto('/bills');
        const billRow = page.getByRole('row').filter({ hasText: billName });
        if (await billRow.isVisible()) {
            await billRow.getByRole('button', { name: /actions/i }).click();
            await page.getByRole('menuitem', { name: /delete/i }).click();
            await page.getByRole('button', { name: /confirm/i }).click();
        }
    } catch (e) {
        console.log('Cleanup failed or bill already removed');
    }
  });
});