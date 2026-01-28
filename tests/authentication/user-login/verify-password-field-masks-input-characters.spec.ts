import { test, expect } from '@playwright/test';

/**
 * @name Verify password field masks input characters
 * @description Verifies that password field hides the entered characters for security
 * @priority medium
 * @type e2e
 * @tags auth, login, security, ui
 */

test.describe('Authentication Security', () => {
  
  test('Verify password field masks input characters', async ({ page }) => {
    const testPassword = 'SecretPassword123!';

    // Step 1: Navigate to the login page
    // Using a generic login path; replace with your specific URL
    await test.step('Navigate to the login page', async () => {
      await page.goto('/login');
      // Expected Result 1: Login page loads successfully
      await expect(page).toHaveURL(/.*login/);
    });

    // Step 2: Click on the password field
    await test.step('Click on the password field', async () => {
      const passwordInput = page.getByLabel(/password/i);
      await passwordInput.click();
      
      // Expected Result 2: Password field is focused
      await expect(passwordInput).toBeFocused();
    });

    // Step 3: Enter password characters
    await test.step('Enter password characters', async () => {
      const passwordInput = page.getByLabel(/password/i);
      await passwordInput.fill(testPassword);
      
      // Expected Result 3: Characters are entered successfully
      await expect(passwordInput).toHaveValue(testPassword);
    });

    // Step 4: Observe the password field display
    await test.step('Verify password field masking', async () => {
      const passwordInput = page.getByLabel(/password/i);
      
      /**
       * Expected Result 4: All entered characters are masked.
       * In HTML, <input type="password"> is the standard way to ensure 
       * characters are masked by the browser (dots/asterisks).
       */
      await expect(passwordInput).toHaveAttribute('type', 'password');
      
      // Additional check: Ensure the text is not visible as plain text in the computed style if possible,
      // though 'type=password' is the primary security requirement for UI masking.
      const isMasked = await passwordInput.evaluate((el: HTMLInputElement) => {
        return window.getComputedStyle(el).webkitTextSecurity === 'disc' || el.type === 'password';
      });
      
      expect(isMasked).toBe(true);
    });
  });
});