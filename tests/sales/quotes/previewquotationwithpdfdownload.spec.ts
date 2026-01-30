import { test, expect } from '@playwright/test';

/**
 * Scenario: Preview quotation with PDF download
 * Test ID: TEST-1769769962116
 */
test.describe('Sales Quotation Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: In a real environment, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Username').fill('test_user');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('Preview quotation with PDF download TEST-1769769962116', async ({ page }) => {
    // Step 1: Navigate to Sales > Quotes
    // Using semantic navigation
    await page.getByRole('link', { name: 'Sales' }).click();
    await page.getByRole('link', { name: 'Quotes' }).click();
    
    // Expected Result 1: Quotes list displays
    await expect(page.getByRole('heading', { name: 'Quotations' })).toBeVisible();
    const quoteRow = page.getByRole('row').nth(1); // Select the first available quote row
    await expect(quoteRow).toBeVisible();

    // Step 2: Click on a quote row to open preview
    await quoteRow.click();

    // Expected Result 2: Quote preview page opens
    await expect(page).toHaveURL(/.*quotes\/view/);

    // Step 3: Verify quote details are displayed correctly
    // Expected Result 3: All quote details shown: customer, items, totals, terms
    await expect(page.locator('section#quote-details')).toBeVisible();
    await expect(page.getByText(/Customer:/i)).toBeVisible();
    await expect(page.getByRole('table', { name: 'Line Items' })).toBeVisible();
    await expect(page.getByText(/Total Amount/i)).toBeVisible();
    await expect(page.getByText(/Terms and Conditions/i)).toBeVisible();

    // Step 4: Click 'Download PDF' button
    // Step 5: Verify PDF is downloaded
    // Expected Result 4 & 5: PDF download initiates and file is captured
    const downloadPromise = page.waitForEvent('download');
    
    await page.getByRole('button', { name: /Download PDF/i }).click();
    
    const download = await downloadPromise;

    // Verify the download was successful
    expect(download.suggestedFilename()).toContain('.pdf');
    
    // Optional: Verify file exists by saving it to a temporary path
    const path = await download.path();
    expect(path).not.toBeNull();
    
    console.log(`Successfully downloaded: ${download.suggestedFilename()}`);
  });
});