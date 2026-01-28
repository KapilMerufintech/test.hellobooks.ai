import { test, expect } from '@playwright/test';

/**
 * @name Verify successful login with valid credentials
 * @description Verifies that a user can successfully log in with correct username and password
 * @priority high
 * @type e2e
 * @tags auth, login, positive, smoke
 */

test.describe('Authentication Tests', () => {
  
  // Preconditions: User account exists and is active (Assumed via environment variables)
  const VALID_USERNAME = process.env.LOGIN_USER || 'standard_user';
  const VALID_PASSWORD = process.env.LOGIN_PASSWORD || 'secret_sauce';
  const BASE_URL = 'https://www.saucedemo.com';

  test('Verify successful login with valid credentials @auth @login @smoke', async ({ page }) => {
    
    // Step 1: Navigate to the login page
    await test.step('Navigate to the login page', async () => {
      await page.goto(BASE_URL);
      
      // Expected Result 1: Login page loads successfully
      await expect(page).toHaveTitle(/Swag Labs/i);
      await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
    });

    // Step 2: Enter valid username in the username field
    await test.step('Enter valid username', async () => {
      const usernameInput = page.getByPlaceholder('Username');
      await usernameInput.fill(VALID_USERNAME);
      
      // Expected Result 2: Username is accepted in the field
      await expect(usernameInput).toHaveValue(VALID_USERNAME);
    });

    // Step 3: Enter valid password in the password field
    await test.step('Enter valid password', async () => {
      const passwordInput = page.getByPlaceholder('Password');
      await passwordInput.fill(VALID_PASSWORD);
      
      // Expected Result 3: Password is masked and accepted
      await expect(passwordInput).toHaveAttribute('type', 'password');
      await expect(passwordInput).not.toHaveValue('');
    });

    // Step 4: Click the Login button
    await test.step('Click the Login button', async () => {
      await page.getByRole('button', { name: /login/i }).click();
    });

    // Expected Result 4: User is redirected to dashboard/home page
    await test.step('Verify redirection to dashboard', async () => {
      // Verify URL change (common dashboard indicator)
      await expect(page).toHaveURL(/.*inventory.html/);
      
      // Verify success indicator (e.g., Header or Products title)
      const headerTitle = page.getByText('Products');
      await expect(headerTitle).toBeVisible();
      
      // Verify logout button exists in menu to confirm authenticated state
      await page.getByRole('button', { name: /open menu/i }).click();
      await expect(page.getByRole('link', { name: /logout/i })).toBeVisible();
    });
  });

  test.afterEach(async ({ page }) => {
    // Teardown: Ensure clean state if necessary
    await page.close();
  });
});