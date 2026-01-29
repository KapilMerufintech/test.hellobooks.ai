import { test, expect } from '@playwright/test';

/**
 * @name Create bill from Purchase Order
 * @description Verify bill can be created by selecting existing PO with auto-populated data
 * @priority high
 * @type e2e
 * @tags bills, purchase-order, 3-way-match, conversion
 */

test.describe('Bills Management', () => {
  
  // Precondition: User is logged in
  // Note: Assuming storageState is handled in playwright.config.ts or a global setup
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Create bill from Purchase Order @high @bills @purchase-order @conversion', async ({ page }) => {
    // Step 1: Navigate to Bills list > Click New Bill dropdown > Select 'New Bill from PO'
    await page.getByRole('link', { name: 'Bills' }).click();
    await expect(page).toHaveURL(/.*\/purchase\/bills/);

    await page.getByRole('button', { name: /new bill/i }).click();
    await page.getByRole('menuitem', { name: /new bill from po/i }).click();

    // Expected Result 1: Route navigates to /purchase/bills/select-po
    await expect(page).toHaveURL(/\/purchase\/bills\/select-po/);

    // Step 2: Select a Purchase Order from the list
    // Precondition: Approved Purchase Order exists. We select the first available one.
    const firstPORow = page.locator('table tbody tr').first();
    const poNumber = await firstPORow.locator('td').first().innerText();
    
    // Capture PO data for verification later (e.g., Amount/Vendor)
    const expectedTotal = await firstPORow.getByTestId('po-total-amount').innerText();
    
    await firstPORow.getByRole('button', { name: /select/i }).click();

    // Expected Result 2: PO selection populates bill with PO line items
    // Verify we are on the Bill Creation form
    await expect(page).toHaveURL(/\/purchase\/bills\/create/);
    
    // Verify PO reference is linked
    const poReferenceBadge = page.getByText(poNumber);
    await expect(poReferenceBadge).toBeVisible();

    // Step 3: Verify line items are pre-populated from PO
    const lineItems = page.locator('.bill-line-item');
    await expect(lineItems).count().toBeGreaterThan(0);

    // Expected Result 3: Quantities and rates match PO data
    // We verify the total matches the PO total as a summary check of rates/quantities
    const billTotal = page.getByTestId('bill-total-amount');
    await expect(billTotal).toHaveText(expectedTotal);

    // Step 4: Save and submit bill
    await page.getByRole('button', { name: /save and submit/i }).click();

    // Expected Result 4: Bill created with PO reference linked
    // Verify success toast or navigation to details page
    await expect(page.getByText(/bill created successfully/i)).toBeVisible();
    
    // Final verification on the Bill Detail page
    await expect(page).toHaveURL(/\/purchase\/bills\/view\/\d+/);
    await expect(page.locator('dt:has-text("Source PO") + dd')).toContainText(poNumber);
  });
});