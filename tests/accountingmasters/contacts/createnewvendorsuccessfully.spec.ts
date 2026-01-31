import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Create New Vendor Successfully
 * Test ID: TEST-1769842499641
 * Description: Verify that a user can create a new vendor with valid details
 */

test.describe('Vendor Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in with appropriate permissions
    // Note: Assuming authentication state is handled via global setup or a login helper
    await page.goto('/');
    
    // Precondition 2: User has access to the Purchases module
    // Navigate to the base URL and ensure the dashboard/sidebar is visible
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('Create New Vendor Successfully TEST-1769842499641', async ({ page }) => {
    const vendorData = {
      name: `Automated Vendor ${Date.now()}`,
      email: `vendor_${Date.now()}@example.com`,
      phone: '1234567890',
      address: '123 Automation St, Tech City, 54321'
    };

    // Step 1: Navigate to Purchases > Vendors from the sidebar
    // We use a combination of clicking the parent menu and then the sub-item
    const purchasesMenu = page.getByRole('button', { name: /purchases/i });
    await purchasesMenu.click();
    
    const vendorsLink = page.getByRole('link', { name: /vendors/i });
    await vendorsLink.click();

    // Expected Result 1: Vendors list page is displayed
    await expect(page).toHaveURL(/.*vendors/);
    await expect(page.getByRole('heading', { name: /vendors/i })).toBeVisible();

    // Step 2: Click on 'Create Vendor' or 'New Vendor' button
    const createButton = page.getByRole('button', { name: /(create|new) vendor/i });
    await createButton.click();

    // Expected Result 2: Create Vendor form opens successfully
    await expect(page.getByRole('heading', { name: /create vendor/i })).toBeVisible();

    // Step 3: Enter valid vendor name in the Name field
    const nameInput = page.getByLabel(/name/i);
    await nameInput.fill(vendorData.name);
    // Expected Result 3: Vendor name is accepted
    await expect(nameInput).toHaveValue(vendorData.name);

    // Step 4: Enter vendor email address
    const emailInput = page.getByLabel(/email/i);
    await emailInput.fill(vendorData.email);
    // Expected Result 4: Email field accepts valid email format
    await expect(emailInput).toHaveValue(vendorData.email);

    // Step 5: Enter vendor phone number
    const phoneInput = page.getByLabel(/phone/i);
    await phoneInput.fill(vendorData.phone);
    // Expected Result 5: Phone number is accepted
    await expect(phoneInput).toHaveValue(vendorData.phone);

    // Step 6: Enter vendor address details
    const addressInput = page.getByLabel(/address/i);
    await addressInput.fill(vendorData.address);
    // Expected Result 6: Address details are saved (verified via value check before submission)
    await expect(addressInput).toHaveValue(vendorData.address);

    // Step 7: Click 'Save' button
    const saveButton = page.getByRole('button', { name: /save/i });
    await saveButton.click();

    // Expected Result 7: Vendor is created successfully and appears in the vendors list with a success message
    
    // Check for success toast/notification
    const successMessage = page.locator('text=/successfully|created/i');
    await expect(successMessage).toBeVisible();

    // Verify redirection back to list or detail view
    await expect(page.getByRole('heading', { name: /vendors/i })).toBeVisible();

    // Verify the new vendor appears in the list
    const vendorRow = page.getByRole('row').filter({ hasText: vendorData.name });
    await expect(vendorRow).toBeVisible();
  });
});