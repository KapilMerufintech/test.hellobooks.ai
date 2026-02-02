import { test, expect } from '@playwright/test';

test.describe('Purchases @Ssolk5g4m', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is logged in
    // Note: In a real scenario, authentication state is usually handled in global setup or via a storage state.
    // For this script, we assume the session is active or handled by the test environment.
    
    // Navigate to the Bills list page
    await page.goto('/list-bills');
    await expect(page).toHaveURL(/.*list-bills/);
  });

  test('Delete Bill from Bills List via Row Action @Tniaf5l45', async ({ page }) => {
    // 1. Navigate to /list-bills (Handled in beforeEach)
    // 2. Locate a bill row that is eligible for deletion (Draft status)
    // We look for a row that contains the text 'Draft' to ensure it's deletable
    const billRow = page.locator('tr', { hasText: 'Draft' }).first();
    await expect(billRow).toBeVisible();

    // Capture the Bill ID or Reference to verify removal later
    const billReference = await billRow.locator('td').first().innerText();

    // 3. Click on the row action menu (three dots or context menu)
    // Using getByRole for accessibility-friendly selection
    const actionMenuButton = billRow.getByRole('button', { name: /menu|actions/i });
    await actionMenuButton.click();

    // 4. Select 'Delete' option from the context menu
    const deleteOption = page.getByRole('menuitem', { name: /delete/i });
    await expect(deleteOption).toBeVisible();
    
    // Intercept the delete API call to verify backend communication
    const deletePromise = page.waitForResponse(response => 
      response.url().includes('/api/bills') && response.request().method() === 'DELETE'
    );

    await deleteOption.click();

    // 5. Confirm the deletion in the confirmation dialog
    const confirmButton = page.getByRole('button', { name: /^confirm$|^delete$/i });
    await expect(confirmButton).toBeVisible();
    await confirmButton.click();

    // Expected Result: deleteBillAPI is called successfully
    const response = await deletePromise;
    expect(response.status()).toBeLessThan(400);

    // Expected Result: Bill is removed from the list
    // We verify the specific bill reference is no longer visible in the table
    await expect(page.locator('table')).not.toContainText(billReference);

    // Optional: Verify success toast message
    const successToast = page.getByText(/successfully deleted|bill deleted/i);
    await expect(successToast).toBeVisible();
  });
});