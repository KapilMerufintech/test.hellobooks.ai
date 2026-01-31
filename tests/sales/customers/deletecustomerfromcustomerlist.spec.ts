import { test, expect } from '@playwright/test';

test.describe('Customer Management @S3ypsiopa', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is logged in
    // Note: In a real scenario, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Login' }).click();
  });

  test('Delete Customer from Customer List @Tba7tad15', async ({ page }) => {
    const customerName = 'John Doe';

    // 1. Navigate to Sales > Customers from the sidebar
    await page.getByRole('link', { name: 'Sales' }).click();
    await page.getByRole('link', { name: 'Customers' }).click();

    // Expected Result 1: Customer list page loads successfully
    await expect(page).toHaveURL(/.*customers/);
    await expect(page.getByRole('heading', { name: 'Customer List' })).toBeVisible();

    // 2. Locate the customer to be deleted in the customer list
    // Expected Result 2: Target customer is visible in the list
    const customerRow = page.locator('tr').filter({ hasText: customerName });
    await expect(customerRow).toBeVisible();

    // 3. Click on the actions menu (three dots) for the selected customer
    // Expected Result 3: Actions menu opens with Delete option available
    await customerRow.getByRole('button', { name: 'Actions' }).click();
    const deleteOption = page.getByRole('menuitem', { name: 'Delete' });
    await expect(deleteOption).toBeVisible();

    // 4. Select 'Delete' option from the context menu
    await deleteOption.click();

    // 5. Confirm the deletion in the confirmation dialog
    // Expected Result 4: Confirmation dialog appears
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Are you sure you want to delete');

    // Click 'Confirm' or 'Yes'
    await dialog.getByRole('button', { name: /confirm|yes/i }).click();

    // Expected Result 5: Customer is removed from the list and success message is displayed
    await expect(page.getByText(/successfully deleted/i)).toBeVisible();
    await expect(page.locator('tr').filter({ hasText: customerName })).not.toBeVisible();
  });
});