import { test, expect } from '@playwright/test';

/**
 * @name Create bill from GRN for 3-way matching
 * @description Verify bill can be created from Goods Receipt Note for 3-way match
 * @priority high
 * @type e2e
 * @tags bills, grn, 3-way-match, goods-receipt
 */

test.describe('Purchase Bills - 3-Way Matching', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: Assuming auth state is handled via global setup or storageState
    await page.goto('/');
  });

  test('Create bill from GRN for 3-way matching', async ({ page }) => {
    // 1. Navigate to /purchase/bills/select-grn
    // Expected Result 1: GRN list loads via getGRNs API
    const grnResponsePromise = page.waitForResponse(response => 
      response.url().includes('/api/getGRNs') && response.status() === 200
    );
    
    await page.goto('/purchase/bills/select-grn');
    await grnResponsePromise;

    // 2. Select a GRN from the list
    // We look for a row that represents a received GRN
    const grnRow = page.getByRole('row').filter({ hasText: 'Received' }).first();
    const grnNumber = await grnRow.locator('td').first().innerText();
    
    await grnRow.getByRole('button', { name: /select|create bill/i }).click();

    // 3. Verify bill form populated with GRN data
    // Expected Result 2: Selected GRN data maps to bill line items
    // Expected Result 3: Quantities match received goods
    await expect(page.getByRole('heading', { name: /create bill/i })).toBeVisible();
    
    // Verify the GRN reference is visible in the form
    await expect(page.locator('form')).toContainText(grnNumber);

    // Verify line items exist and have non-zero quantities
    const lineItems = page.getByTestId('bill-line-item');
    const firstItemQty = lineItems.first().locator('input[name*="quantity"]');
    
    await expect(lineItems).toBeVisible();
    await expect(firstItemQty).not.toHaveValue('0');

    // 4. Save bill with GRN reference
    const saveButton = page.getByRole('button', { name: /save|submit/i });
    
    // Intercept the create bill API call to verify payload contains GRN link
    const createBillPromise = page.waitForResponse(response => 
      response.url().includes('/api/bills') && response.request().method() === 'POST'
    );

    await saveButton.click();
    
    const response = await createBillPromise;
    const requestBody = JSON.parse(response.request().postData() || '{}');

    // Expected Result 4: Bill linked to GRN for 3-way matching
    expect(response.status()).toBe(201);
    expect(requestBody).toMatchObject({
      grnReference: expect.any(String),
      matchType: '3-way'
    });

    // Final UI verification
    await expect(page.getByText(/bill created successfully/i)).toBeVisible();
    await expect(page).toHaveURL(/\/purchase\/bills\/\d+/);
  });
});