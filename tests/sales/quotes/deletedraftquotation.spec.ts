import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Delete draft quotation
 * Test ID: TEST-1769770000210
 */

test.describe('Sales Quotations Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: In a real environment, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Username').fill('test_user');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: /log in/i }).click();
    
    // Precondition 2: Ensure a draft quote exists
    // This step assumes the environment is seeded or a quote is created via API/UI
  });

  test('Delete draft quotation TEST-1769770000210', async ({ page }) => {
    // Step 1: Navigate to Sales > Quotes
    // Using navigation menu or direct URL
    await page.getByRole('link', { name: 'Sales' }).click();
    await page.getByRole('link', { name: 'Quotes' }).click();
    
    // Expected Result 1: Quotes list displays
    await expect(page.getByRole('heading', { name: /quotes/i })).toBeVisible();
    const quotesTable = page.getByRole('table');
    await expect(quotesTable).toBeVisible();

    // Step 2: Select a draft quote
    // We look for a row that contains the status 'Draft'
    const draftRow = page.locator('tr').filter({ hasText: 'Draft' }).first();
    const quoteId = await draftRow.locator('td').first().innerText(); // Capture ID to verify removal later
    
    // Expected Result 2: Quote is selected
    await expect(draftRow).toBeVisible();

    // Step 3: Click 'Delete' action from row menu
    // Assuming a common pattern of an action menu button in the row
    await draftRow.getByRole('button', { name: /actions|menu/i }).click();
    await page.getByRole('menuitem', { name: /delete/i }).click();

    // Expected Result 3: Delete confirmation modal appears
    const confirmationModal = page.getByRole('dialog');
    await expect(confirmationModal).toBeVisible();
    await expect(confirmationModal).toContainText(/are you sure/i);

    // Step 4: Confirm deletion in modal
    // Expected Result 4: Deletion is confirmed
    await confirmationModal.getByRole('button', { name: /confirm|delete/i }).click();

    // Step 5: Verify quote is removed from list
    // Expected Result 5: Quote no longer appears in list
    // We wait for the network/UI to update and then assert the specific ID is gone
    await expect(page.getByText('Quotation deleted successfully')).toBeVisible();
    await expect(page.locator('tr')).not.toContainText(quoteId);
  });
});