import { test, expect } from '@playwright/test';

/**
 * @description Validates that a user can successfully create a new account entry in the Chart of Accounts with all required fields
 * @priority high
 * @type e2e
 */
test.describe('Accounting Masters - Chart of Accounts', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is logged in and organization is set up
    // Note: In a real scenario, authentication state is usually handled in global setup or a login helper
    await page.goto('/');
    // Assuming a login helper or existing session is active
  });

  test('Verify user can create a new account in Chart of Accounts TEST-1769843444492', async ({ page }) => {
    // 1. Navigate to Accounting Masters > Chart Of Accounts
    // Using navigation menu or direct URL if applicable
    await page.getByRole('link', { name: 'Accounting Masters' }).click();
    await page.getByRole('link', { name: 'Chart Of Accounts' }).click();

    // Expected Result: Chart of Accounts list page is displayed
    await expect(page).toHaveTitle(/Chart of Accounts/i);
    await expect(page.getByRole('heading', { name: 'Chart of Accounts' })).toBeVisible();

    // 2. Click on Create New Account button
    await page.getByRole('button', { name: /Create New Account|Add Account/i }).click();

    // Expected Result: Create Account form opens successfully
    await expect(page.getByRole('heading', { name: /New Account|Create Account/i })).toBeVisible();

    // 3. Enter Account Name as Test Operating Account
    const nameInput = page.getByLabel(/Account Name/i);
    await nameInput.fill('Test Operating Account');
    
    // Expected Result: Account Name field accepts the input
    await expect(nameInput).toHaveValue('Test Operating Account');

    // 4. Select Account Type as Expense
    // Expected Result: Account Type dropdown shows available options and selection is applied
    const typeDropdown = page.getByLabel(/Account Type/i);
    await typeDropdown.selectOption({ label: 'Expense' });
    await expect(typeDropdown).toHaveValue(/Expense/i);

    // 5. Enter Account Code as 5001
    const codeInput = page.getByLabel(/Account Code/i);
    await codeInput.fill('5001');
    
    // Expected Result: Account Code field accepts numeric input
    await expect(codeInput).toHaveValue('5001');

    // 6. Add optional description for the account
    const descInput = page.getByLabel(/Description/i);
    await descInput.fill('This is a test account for operating expenses');
    
    // Expected Result: Description field accepts text input
    await expect(descInput).toHaveValue('This is a test account for operating expenses');

    // 7. Click Save button
    await page.getByRole('button', { name: /Save|Submit/i }).click();

    // Expected Result: Account is created successfully and appears in the accounts list with correct details
    // We look for a success toast or the record in the table
    await expect(page.getByText(/Account created successfully/i)).toBeVisible();
    
    // Verify the new account exists in the list view
    const accountRow = page.getByRole('row', { name: 'Test Operating Account' });
    await expect(accountRow).toBeVisible();
    await expect(accountRow).toContainText('5001');
    await expect(accountRow).toContainText('Expense');
  });
});