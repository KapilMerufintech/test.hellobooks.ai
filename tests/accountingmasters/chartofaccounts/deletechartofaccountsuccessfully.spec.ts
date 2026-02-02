import { test, expect } from '@playwright/test';

test.describe('Accounting Masters @Speekp3h4', () => {
  test('Delete Chart of Account Successfully @Ttszty9fh', async ({ page }) => {
    // --- STEP 1: MANDATORY LOGIN FLOW ---
    await page.goto('https://dev.hellobooks.ai/login');

    // Fill login credentials
    await page.getByLabel('Email').fill('harshpadaliya@merufintech.net');
    await page.getByLabel('Password').fill('Harsh@12345');

    // Click sign in button
    await page.getByRole('button', { name: /sign in/i }).click();

    // Wait for successful login - wait until we're NOT on the login page
    await page.waitForURL(/.*(?!login).*/);

    // --- STEP 2: NAVIGATE TO CHART OF ACCOUNTS ---
    // Navigate to the specific module
    await page.goto('https://dev.hellobooks.ai/accounting/chart-of-accounts');
    
    // Verify the Chart of Accounts list is displayed
    await expect(page.getByRole('heading', { name: /Chart of Accounts/i })).toBeVisible();

    // --- STEP 3: LOCATE AND DELETE ACCOUNT ---
    // We look for an account row. For this test, we assume an account exists.
    // We target the first available delete button in the table/list.
    const firstAccountRow = page.locator('table tbody tr').first();
    const accountName = await firstAccountRow.locator('td').first().innerText();
    
    // Click the delete action button (usually represented by a trash icon or 'Delete' text)
    const deleteButton = firstAccountRow.getByRole('button', { name: /delete/i }).or(firstAccountRow.locator('.fa-trash')).first();
    await deleteButton.click();

    // --- STEP 4: CONFIRM DELETION ---
    // A confirmation dialog should appear
    const confirmDialog = page.getByRole('dialog');
    await expect(confirmDialog).toBeVisible();
    
    // Click the confirmation button (e.g., "Yes", "Confirm", or "Delete")
    await page.getByRole('button', { name: /^yes|^confirm|^delete/i }).click();

    // --- STEP 5: VERIFY RESULTS ---
    // Verify success message/toast notification
    await expect(page.getByText(/successfully deleted|deleted successfully/i)).toBeVisible();

    // Verify the account is removed from the list
    // We check that the specific account name we captured earlier is no longer present in the table
    await expect(page.locator('table')).not.toContainText(accountName);
  });
});