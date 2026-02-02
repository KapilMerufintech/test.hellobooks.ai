import { test, expect } from '@playwright/test';

test.describe('Accounting Masters @Suin3nvv6', () => {
  test('Create new tax rate with valid details @T4x61du2l', async ({ page }) => {
    // --- STEP 1: MANDATORY LOGIN FLOW ---
    await page.goto('https://dev.hellobooks.ai/login');

    // Fill login credentials using specific selectors to avoid strict mode violations
    await page.locator('input[type="email"], input#input_email, input[name="email"]').first().fill('harshpadaliya@merufintech.net');
    await page.locator('input[type="password"], input#input_password').first().fill('Harsh@12345');

    // Click sign in button
    await page.getByRole('button', { name: /sign in/i }).click();

    // Wait for successful login - wait for navigation away from login page to dashboard
    await page.waitForURL('**/dashboard**', { timeout: 15000 });

    // --- STEP 2: NAVIGATE TO TAX RATES ---
    // Navigate to Accounting Masters > Tax Rates
    // Assuming a direct URL navigation for stability, or clicking through the sidebar
    await page.goto('https://dev.hellobooks.ai/accounting/tax-rates');
    
    // Verify Tax Rates page loads
    await expect(page).toHaveURL(/.*tax-rates/);

    // --- STEP 3: CLICK CREATE BUTTON ---
    // Click on 'Create Tax Rate' or 'Add New' button
    const createButton = page.getByRole('button', { name: /create|add/i }).first();
    await createButton.click();

    // Verify form/modal opens
    const taxNameInput = page.getByPlaceholder(/tax name/i).or(page.locator('input[name="name"]'));
    await expect(taxNameInput).toBeVisible();

    // --- STEP 4: FILL TAX DETAILS ---
    const uniqueTaxName = `GST 18% - ${Date.now()}`;
    
    // Enter a valid tax name
    await taxNameInput.fill(uniqueTaxName);

    // Enter the tax rate percentage
    const rateInput = page.getByPlaceholder(/rate|percentage/i).or(page.locator('input[type="number"]'));
    await rateInput.fill('18');

    // Select the tax type (e.g., Sales Tax)
    // Using a generic approach for dropdowns if specific IDs aren't provided
    const typeDropdown = page.getByLabel(/tax type/i).or(page.locator('select[name="type"]')).or(page.locator('.v-select'));
    await typeDropdown.click();
    await page.getByText('Sales Tax', { exact: false }).first().click();

    // --- STEP 5: SAVE AND VERIFY ---
    // Click 'Save' or 'Create' button
    const saveButton = page.getByRole('button', { name: /save|create/i }).filter({ hasText: /save|create/i });
    await saveButton.click();

    // Verify success message appears
    // We look for a toast or alert containing "success" or "created"
    await expect(page.locator('text=/successfully|created/i').first()).toBeVisible();

    // Verify new tax rate appears in the list
    await expect(page.getByText(uniqueTaxName)).toBeVisible();
  });
});