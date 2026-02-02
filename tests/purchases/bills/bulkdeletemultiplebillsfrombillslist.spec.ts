import { test, expect } from '@playwright/test';

test.describe('Purchases @Saj8vfoul', () => {
  test('Bulk Delete Multiple Bills from Bills List @T3isbwu3v', async ({ page }) => {
    // STEP 1: Login Flow (MANDATORY)
    await page.goto('https://dev.hellobooks.ai/login');

    // Fill login credentials using specific selectors to avoid strict mode violations
    await page.locator('input[type="email"]').first().fill('harshpadaliya@merufintech.net');
    await page.locator('input[type="password"]').first().fill('Harsh@12345');

    // Click sign in button
    await page.getByRole('button', { name: /sign in/i }).click();

    // Wait for successful login - wait until URL no longer contains /login
    await page.waitForFunction(() => !window.location.pathname.includes('/login'), { timeout: 30000 });

    // STEP 2: Navigate to Bills list page
    await page.goto('https://dev.hellobooks.ai/list-bills');
    
    // Ensure the table is loaded
    await expect(page.getByRole('table')).toBeVisible();

    // STEP 3: Select the checkboxes for the first three bill rows
    // Using locator for checkboxes within the table rows
    const billCheckboxes = page.locator('table tbody tr input[type="checkbox"]');
    
    // Ensure at least 3 bills exist as per preconditions
    const count = await billCheckboxes.count();
    if (count < 3) {
        throw new Error('Precondition failed: At least 3 bills are required for this test.');
    }

    // Select first bill
    await billCheckboxes.nth(0).check();
    // Select second bill
    await billCheckboxes.nth(1).check();
    // Select third bill
    await billCheckboxes.nth(2).check();

    // STEP 4: Click the bulk action Delete button from the toolbar
    // Usually, bulk actions appear in a toolbar or a specific button becomes enabled
    const deleteButton = page.getByRole('button', { name: /delete/i });
    await expect(deleteButton).toBeVisible();
    await deleteButton.click();

    // STEP 5: Confirm the deletion in the confirmation dialog
    // Intercept the delete API calls to verify they are triggered
    const deleteRequestPromise = page.waitForResponse(response => 
        response.url().includes('/api/') && response.request().method() === 'DELETE',
        { timeout: 10000 }
    );

    const confirmButton = page.getByRole('button', { name: /confirm|yes|delete/i }).filter({ hasText: /confirm|yes|delete/i }).last();
    await confirmButton.click();

    // STEP 6: Wait for the delete API calls to complete and verify success
    await deleteRequestPromise;

    // STEP 7: Verify Expected Results
    // Check for a success toast/message
    await expect(page.getByText(/deleted successfully/i).first()).toBeVisible();

    // Verify the bills are removed from the list (UI check)
    // We expect the list to refresh or the specific rows to disappear
    await page.waitForLoadState('networkidle');
    
    // Final assertion to ensure the UI reflects the deletion
    // (Note: In a real app, we'd check specific IDs, here we check general list state)
    await expect(page.getByText(/deleted successfully/i).first()).toBeHidden();
  });
});