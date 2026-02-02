import { test, expect } from '@playwright/test';

test.describe('Purchases @S4q89bl51', () => {
  test('Create a new bill with complete details @T76mmwglx', async ({ page }) => {
    // --- STEP 1: MANDATORY LOGIN FLOW ---
    await page.goto('https://dev.hellobooks.ai/login');

    // Fill login credentials using specific selectors to avoid strict mode violations
    await page.locator('input[type="email"]').first().fill('harshpadaliya@merufintech.net');
    await page.locator('input[type="password"]').first().fill('Harsh@12345');

    // Click sign in button
    await page.getByRole('button', { name: /sign in/i }).click();

    // Wait for successful login - wait until URL no longer contains /login
    await page.waitForFunction(() => !window.location.pathname.includes('/login'), { timeout: 30000 });

    // --- STEP 2: NAVIGATE TO PURCHASES > BILLS ---
    // Click on Purchases in sidebar then Bills
    await page.getByRole('link', { name: /purchases/i }).click();
    await page.getByRole('link', { name: /bills/i }).click();
    
    // Verify Bills list page loads
    await expect(page).toHaveURL(/.*list-bills/);

    // --- STEP 3: CLICK NEW BILL ---
    await page.getByRole('button', { name: /new bill/i }).click();
    await expect(page).toHaveURL(/.*create-bills/);

    // --- STEP 4: SELECT VENDOR ---
    // Using a generic selector for the vendor dropdown/combobox
    const vendorDropdown = page.getByPlaceholder(/select vendor/i).or(page.locator('.ant-select-selection-search-input')).first();
    await vendorDropdown.click();
    // Select the first available vendor from the dropdown list
    await page.locator('.ant-select-item-option-content').first().click();

    // --- STEP 5: ENTER BILL HEADER DETAILS ---
    const billNumber = `BILL-${Date.now()}`;
    await page.getByPlaceholder(/bill number/i).fill(billNumber);
    
    // Dates (Handling Ant Design or standard date pickers)
    // Issue Date
    await page.locator('input[placeholder="Select date"]').first().click();
    await page.locator('.ant-picker-today-btn').click();
    
    // Due Date
    await page.locator('input[placeholder="Select date"]').last().click();
    await page.locator('.ant-picker-today-btn').click();

    // --- STEP 6: ADD LINE ITEM DETAILS ---
    // Fill Description
    await page.locator('textarea[placeholder="Description"]').first().fill('Consulting Services');
    
    // Select Expense Account
    await page.locator('.ant-select-selection-search-input').nth(1).click();
    await page.locator('.ant-select-item-option-content').filter({ hasText: /Expense/i }).first().click();

    // Fill Quantity
    await page.locator('input[type="number"]').nth(0).fill('2');
    
    // Fill Rate
    await page.locator('input[type="number"]').nth(1).fill('500');

    // Select Tax (if applicable)
    const taxDropdown = page.locator('.ant-select-selection-search-input').last();
    await taxDropdown.click();
    await page.locator('.ant-select-item-option-content').first().click();

    // --- STEP 7: VERIFY CALCULATED TOTALS ---
    // Subtotal should be 1000 (2 * 500)
    const subtotal = page.locator('text=/subtotal/i').locator('xpath=following-sibling::*');
    // We check if the value is present (exact selector depends on UI structure)
    await expect(page.getByText('1,000.00')).toBeVisible();

    // --- STEP 8: SAVE AS DRAFT ---
    await page.getByRole('button', { name: /save draft/i }).click();

    // --- STEP 9: FINAL ASSERTIONS ---
    // Verify redirection back to list
    await expect(page).toHaveURL(/.*list-bills/);
    
    // Verify the bill appears in the list with Draft status
    const firstRow = page.locator('table tbody tr').first();
    await expect(firstRow).toContainText(billNumber);
    await expect(firstRow).toContainText(/draft/i);
  });
});