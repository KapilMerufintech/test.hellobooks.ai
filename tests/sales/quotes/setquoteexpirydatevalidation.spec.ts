import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Set quote expiry date validation
 * Description: Verify expiry date cannot be before quote date
 * Test ID: TEST-1769770047405
 */

test.describe('Quote Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: In a real scenario, this would use a global setup or a login helper
    await page.goto('/login');
    await page.getByLabel('Username').fill('test_user');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: /log in/i }).click();
    
    // Precondition 2: Quote creation form is open
    await page.goto('/quotes/new');
  });

  test('Set quote expiry date validation TEST-1769770047405', async ({ page }) => {
    // Helper to format dates as YYYY-MM-DD for input fields
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    // Step 1: Open new quote form (Handled in beforeEach)
    await expect(page.getByRole('heading', { name: /create new quote/i })).toBeVisible();

    // Step 2: Set quote date to today
    const quoteDateInput = page.getByLabel(/quote date/i);
    await quoteDateInput.fill(formatDate(today));
    await quoteDateInput.press('Enter');

    // Step 3: Try to set expiry date to yesterday
    const expiryDateInput = page.getByLabel(/expiry date/i);
    await expiryDateInput.fill(formatDate(yesterday));
    await expiryDateInput.press('Tab'); // Trigger validation

    // Step 4: Verify validation error
    // We look for a semantic error message or an alert
    const errorMessage = page.getByText(/expiry date cannot be before quote date|must be after/i);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveCSS('color', /rgb\(.*(255|error).*\)/); // Optional: check if it looks like an error

    // Step 5: Set valid expiry date in future
    await expiryDateInput.fill(formatDate(tomorrow));
    await expiryDateInput.press('Tab');

    // Expected Result 5: Valid expiry date is accepted (Error message should disappear)
    await expect(errorMessage).not.toBeVisible();
    
    // Final check: Ensure the form is ready for submission
    const submitButton = page.getByRole('button', { name: /save|create/i });
    await expect(submitButton).toBeEnabled();
  });
});