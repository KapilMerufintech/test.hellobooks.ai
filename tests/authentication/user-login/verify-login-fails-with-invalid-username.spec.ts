import { test, expect } from '@playwright/test';

/**
 * @name Verify login fails with invalid username
 * @description Verifies that login is rejected when user enters non-existent username
 * @priority high
 * @type e2e
 * @tags auth, login, negative, security
 */

test.describe('Authentication - Negative Tests', () => {
  
  test('Verify login fails with invalid username', async ({ page }) => {
    // Precondition: User is on the login page
    // Step 1: Navigate to the login page
    await test.step('Navigate to the login page', async () => {
      await page.goto('/login');
      
      // Expected Result 1: Login page loads successfully
      await expect(page).toHaveURL(/.*login/);
      await expect(page.getByRole('heading', { name: /login|sign in/i })).toBeVisible();
    });

    // Step 2: Enter non-existent username in the username field
    await test.step('Enter non-existent username', async () => {
      const usernameField = page.getByRole('textbox', { name: /username|email/i });
      const nonExistentUser = 'non_existent_user_999';
      
      await usernameField.fill(nonExistentUser);
      
      // Expected Result 2: Username is accepted in the field
      await expect(usernameField).toHaveValue(nonExistentUser);
    });

    // Step 3: Enter any password in the password field
    await test.step('Enter password', async () => {
      const passwordField = page.getByLabel(/password/i);
      await passwordField.fill('Password123!');
      
      // Expected Result 3: Password is masked and accepted
      await expect(passwordField).toHaveAttribute('type', 'password');
      await expect(passwordField).not.toHaveValue('');
    });

    // Step 4: Click the Login button
    await test.step('Click the Login button', async () => {
      await page.getByRole('button', { name: /login|sign in/i }).click();
    });

    // Expected Result 4: Error message displayed and user remains on login page
    await test.step('Verify error message and page state', async () => {
      // Check for common error message patterns
      const errorMessage = page.locator('text=/invalid|incorrect|failed|not found/i');
      await expect(errorMessage).toBeVisible();
      
      // Verify user remains on the login page (URL hasn't changed to a dashboard)
      await expect(page).toHaveURL(/.*login/);
      
      // Verify login button is still present (session not established)
      await expect(page.getByRole('button', { name: /login|sign in/i })).toBeVisible();
    });
  });

});