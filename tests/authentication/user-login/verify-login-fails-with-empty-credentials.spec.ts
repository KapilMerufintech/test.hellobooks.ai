import { test, expect } from '@playwright/test';

/**
 * @name Verify login fails with empty credentials
 * @description Verifies that login is rejected when username and password fields are left empty
 * @priority medium
 * @type e2e
 * @tags auth, login, negative, validation
 */

test.describe('Authentication - Negative Tests', () => {
  
  test('Verify login fails with empty credentials @auth @login @negative @validation', async ({ page }) => {
    // Precondition: User is on the login page
    // Step 1: Navigate to the login page
    await test.step('Navigate to the login page', async () => {
      await page.goto('/login');
      
      // Expected Result 1: Login page loads successfully
      await expect(page).toHaveURL(/.*login/);
      await expect(page.getByRole('heading', { name: /login|sign in/i })).toBeVisible();
    });

    // Step 2 & 3: Leave username and password fields empty
    await test.step('Leave credentials fields empty', async () => {
      const usernameInput = page.getByRole('textbox', { name: /username|email/i });
      const passwordInput = page.getByLabel(/password/i);

      // Ensure fields are empty (clearing if necessary, though they should be empty on load)
      await usernameInput.clear();
      await passwordInput.clear();

      // Expected Result 2 & 3: Fields remain empty
      await expect(usernameInput).toHaveValue('');
      await expect(passwordInput).toHaveValue('');
    });

    // Step 4: Click the Login button
    await test.step('Click the Login button', async () => {
      // Using getByRole for the button as it is the most accessible and robust selector
      const loginButton = page.getByRole('button', { name: /log in|sign in/i });
      await loginButton.click();
    });

    // Expected Result 4: Validation error messages displayed and login prevented
    await test.step('Verify validation errors and prevented login', async () => {
      // Check for generic or specific validation messages (common patterns in web apps)
      const errorMessage = page.getByText(/required|empty|invalid/i);
      
      // Assert that at least one validation message is visible
      await expect(errorMessage.first()).toBeVisible();

      // Verify we are still on the login page (login was prevented)
      await expect(page).toHaveURL(/.*login/);
    });
  });
});