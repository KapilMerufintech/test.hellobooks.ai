import { test, expect } from '@playwright/test';

test.describe('Accounting Masters @S25ws4ft4', () => {
  test('Create New Vendor with Required Fields @Tlewikr7i', async ({ page }) => {
    // STEP 1: Login (MANDATORY)
    await page.goto('https://dev.hellobooks.ai/login');
    
    // Fill login credentials using specific selectors to avoid strict mode violations
    await page.locator('input[type="email"]').first().fill('harshpadaliya@merufintech.net');
    await page.locator('input[type="password"]').first().fill('Harsh@12345');

    // Click sign in button
    await page.getByRole('button', { name: /sign in/i }).click();

    // Wait for successful login - wait until URL no longer contains /login
    await page.waitForFunction(() => !window.location.pathname.includes('/login'), { timeout: 30000 });

    // STEP 2: Navigate to Accounting Masters > Contacts section
    // Assuming navigation via sidebar or direct URL as per standard Playwright practices
    await page.goto('https://dev.hellobooks.ai/contacts/vendors');
    await expect(page).toHaveURL(/.*vendors/);

    // STEP 3: Click on Create Vendor button
    // Using getByRole for semantic selection
    const createVendorBtn = page.getByRole('button', { name: /create vendor/i }).or(page.getByRole('button', { name: /add vendor/i }));
    await createVendorBtn.click();

    // STEP 4: Enter vendor name in the required field
    const vendorName = `Automation Vendor ${Date.now()}`;
    await page.getByLabel(/vendor name/i).or(page.locator('input[name="name"]')).fill(vendorName);

    // STEP 5: Enter vendor contact email address
    await page.getByLabel(/email/i).or(page.locator('input[name="email"]')).fill(`test-${Date.now()}@example.com`);

    // STEP 6: Enter vendor phone number
    await page.getByLabel(/phone/i).or(page.locator('input[name="phone"]')).fill('9876543210');

    // STEP 7: Enter vendor billing address
    await page.getByLabel(/address/i).or(page.locator('textarea[name="address"]')).fill('123 Business Park, Tech City');

    // STEP 8: Select payment terms from dropdown
    // Clicking the dropdown and selecting an option (e.g., Net 30)
    const paymentTermsDropdown = page.getByLabel(/payment terms/i).or(page.locator('.v-select'));
    await paymentTermsDropdown.click();
    await page.getByText(/Net 30/i).first().click();

    // STEP 9: Click Save button to create the vendor
    await page.getByRole('button', { name: /save/i }).click();

    // EXPECTED RESULTS:
    // 1. Verify success message/toast appears
    const successToast = page.getByText(/successfully/i);
    await expect(successToast).toBeVisible();

    // 2. Verify vendor appears in the list
    // We search for the unique vendor name created in Step 4
    await expect(page.getByText(vendorName)).toBeVisible();
  });
});