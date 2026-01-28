import { test, expect } from '@playwright/test';

/**
 * @name Verify login fails with invalid password
 * @description Verifies that login is rejected when user enters incorrect password
 * @priority high
 * @tags auth, login, negative, security
 */

test.describe('Authentication - Negative Tests', () => {
  
  // Precondition: User is on the login page
  test.beforeEach(async ({ page }) => {
    // Step 1: Navigate to the login page
    await page.goto('/login');
    
    // Expected Result 1: Login page loads successfully
    await expect(page).toHaveURL(/.*login/);
    await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();
  });

  test('Verify login fails with invalid password', async ({ page }) => {
    const validUsername = 'testuser_existing';
    const invalidPassword = 'WrongPassword123!';

    // Step 2: Enter valid username in the username field
    const usernameField = page.getByRole('textbox', { name: /username|email/i });
    await usernameField.fill(validUsername);
    
    // Expected Result 2: Username is accepted in the field
    await expect(usernameField).toHaveValue(validUsername);

    // Step 3: Enter invalid/incorrect password in the password field
    const passwordField = page.getByLabel(/password/i);
    await passwordField.fill(invalidPassword);

    // Expected Result 3: Password is masked and accepted
    await expect(passwordField).toHaveAttribute('type', 'password');
    await expect(passwordField).toHaveValue(invalidPassword);

    // Step 4: Click the Login button
    await page.getByRole('button', { name: /log in|sign in/i }).click();

    // Expected Result 4: Error message displayed and user remains on login page
    const errorMessage = page.getByText(/invalid credentials|incorrect username or password/i);
    await expect(errorMessage).toBeVisible();
    
    // Verify user remains on the login page (URL hasn't changed to dashboard)
    await expect(page).toHaveURL(/.*login/);
    
    // Verify that sensitive elements like dashboard navigation are not present
    const dashboardHeader = page.getByRole('heading', { name: /dashboard/i });
    await expect(dashboardHeader).not.toBeVisible();
  });
});