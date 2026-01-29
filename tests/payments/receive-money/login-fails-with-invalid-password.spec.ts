import { test, expect } from '@playwright/test';

/**
 * @name Login fails with invalid password
 * @description Verify appropriate error message when password is incorrect
 * @priority high
 * @type e2e
 * @tags login, negative, validation
 */

test.describe('Login Validation Tests', () => {
  
  // Preconditions: User is on login page
  test.beforeEach(async ({ page }) => {
    // Replace with the actual login URL of the application
    await page.goto('/login');
  });

  test('Login fails with invalid password @login @negative @validation', async ({ page }) => {
    const validEmail = 'user@example.com';
    const invalidPassword = 'WrongPassword123!';

    // Step 1: Enter valid email
    // Using getByLabel as it's more accessible and robust
    await page.getByLabel(/email|username/i).fill(validEmail);

    // Step 2: Enter incorrect password
    await page.getByLabel(/password/i).fill(invalidPassword);

    // Step 3: Click Login button
    await page.getByRole('button', { name: /log in|sign in/i }).click();

    // Expected Result 1 & 2: Login fails and 'Invalid credentials' error message is displayed
    const errorMessage = page.getByText('Invalid credentials');
    await expect(errorMessage).toBeVisible();

    // Expected Result 3: User remains on login page
    // We verify this by checking the URL or the presence of the login heading
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole('heading', { name: /log in|sign in/i })).toBeVisible();
    
    // Additional check: Ensure the email field still contains the entered email (common UI behavior)
    await expect(page.getByLabel(/email|username/i)).toHaveValue(validEmail);
  });
});