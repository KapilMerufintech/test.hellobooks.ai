import { test, expect } from '@playwright/test';

/**
 * Scenario: Delete Vendor from Vendor List
 * Description: Verify that a user can successfully delete an existing vendor from the system
 */
test.describe('Accounting Masters @Sesf66l3o', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: In a real environment, authentication is often handled in global setup
    await page.goto('/login');
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Login' }).click();
  });

  test('Delete Vendor from Vendor List TEST-1769844342860', async ({ page }) => {
    const vendorName = 'Test Vendor to Delete';

    // 1. Navigate to Accounting Masters > Contacts > List Contacts
    // Using semantic navigation
    await page.getByRole('menuitem', { name: 'Accounting Masters' }).click();
    await page.getByRole('menuitem', { name: 'Contacts' }).click();
    await page.getByRole('link', { name: 'List Contacts' }).click();

    // Expected Result 1: Vendor list is displayed
    await expect(page.getByRole('heading', { name: 'Contacts' })).toBeVisible();

    // 2. Filter or search for the vendor to be deleted
    const searchInput = page.getByPlaceholder('Search contacts...');
    await searchInput.fill(vendorName);
    await page.keyboard.press('Enter');

    // Expected Result 2: Target vendor is found and displayed
    const vendorRow = page.getByRole('row').filter({ hasText: vendorName });
    await expect(vendorRow).toBeVisible();

    // 3. Click on the vendor row to select it
    await vendorRow.click();

    // Expected Result 3: Vendor row is highlighted or selected
    // (Checking for a common 'selected' class or attribute)
    await expect(vendorRow).toHaveClass(/selected|active/);

    // 4. Click on the Delete action from the context menu or action button
    // Assuming an 'Actions' dropdown or a direct 'Delete' button appears on selection
    await page.getByRole('button', { name: 'Delete' }).click();

    // Expected Result 4: Confirmation dialog appears
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Are you sure you want to delete');

    // 5. Confirm the deletion in the confirmation dialog
    await dialog.getByRole('button', { name: 'Confirm' }).click();

    // Expected Result 5: Vendor is removed and success message is displayed
    await expect(page.getByText('Vendor deleted successfully')).toBeVisible();
    
    // Verify the vendor is no longer in the list
    await searchInput.fill(vendorName);
    await page.keyboard.press('Enter');
    await expect(page.getByRole('row').filter({ hasText: vendorName })).not.toBeVisible();
  });

});