import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Create New Vendor with Required Fields
 * Test ID: TEST-1769842842407
 * Description: Verify that a user can successfully create a new vendor by providing all required information
 */

test.describe('Accounting Masters - Vendor Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1 & 2: User is logged in and has access to Accounting Masters
    // Note: Assuming authentication is handled via global setup or storage state.
    // If not, login logic would be placed here.
    await page.goto('/dashboard');
  });

  test('Create New Vendor with Required Fields TEST-1769842842407', async ({ page }) => {
    // Step 1: Navigate to Accounting Masters > Contacts section
    await page.getByRole('link', { name: /Accounting Masters/i }).click();
    await page.getByRole('link', { name: /Contacts/i }).click();
    
    // Step 2: Click on Create Vendor button
    const createVendorBtn = page.getByRole('button', { name: /Create Vendor/i });
    await expect(createVendorBtn).toBeVisible();
    await createVendorBtn.click();

    // Expected Result 1 & 2: Form opens and required fields are displayed
    await expect(page.getByRole('heading', { name: /New Vendor/i })).toBeVisible();
    await expect(page.getByLabel(/Vendor Name/i)).toBeVisible();
    await expect(page.getByLabel(/Email/i)).toBeVisible();

    // Generate unique data to satisfy Precondition 3 (No duplicate vendor)
    const uniqueId = Date.now();
    const vendorName = `Automation Vendor ${uniqueId}`;
    const vendorEmail = `vendor_${uniqueId}@example.com`;

    // Step 3: Enter vendor name
    await page.getByLabel(/Vendor Name/i).fill(vendorName);

    // Step 4: Enter vendor email address
    await page.getByLabel(/Email/i).fill(vendorEmail);

    // Step 5: Enter vendor phone number
    await page.getByLabel(/Phone/i).fill('1234567890');

    // Step 6: Select payment terms from dropdown
    await page.getByLabel(/Payment Terms/i).click();
    await page.getByRole('option', { name: /Net 30/i }).click();

    // Step 7: Enter billing address details
    await page.getByLabel(/Billing Address/i).fill('123 Automation St, Tech City, 54321');

    // Step 8: Click Save button
    await page.getByRole('button', { name: /Save/i }).click();

    // Expected Result 4: Vendor is created successfully with confirmation message
    const successMessage = page.getByText(/Vendor created successfully/i);
    await expect(successMessage).toBeVisible();

    // Expected Result 5: New vendor appears in the vendor list
    // We navigate back or check the list view
    await page.getByRole('link', { name: /Back to List/i }).click();
    const vendorRow = page.getByRole('row', { name: vendorName });
    await expect(vendorRow).toBeVisible();

    // Expected Result 6: Vendor details are saved correctly and can be viewed
    await vendorRow.getByRole('link').first().click();
    await expect(page.getByText(vendorName)).toBeVisible();
    await expect(page.locator('input[name="email"], [id="email"]')).toHaveValue(vendorEmail);
  });

});