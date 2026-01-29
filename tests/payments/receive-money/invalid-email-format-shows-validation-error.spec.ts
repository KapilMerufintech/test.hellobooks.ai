import { test, expect } from '@playwright/test';

/**
 * @name Invalid email format shows validation error
 * @description Verify email field validates proper email format
 * @priority medium
 * @type e2e
 * @tags login, validation, negative, email
 */

test.describe('Login Validation Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is on login page
    // Replace '/' with the actual login route if different
    await page.goto('/login');
  });

  test('Invalid email format shows validation error @login @validation @negative @email', async ({ page }) => {
    // Step 1: Enter invalid email format
    // Using getByLabel or getByRole is best practice for accessibility and reliability
    const emailInput = page.getByRole('textbox', { name: /email/i });
    await emailInput.fill('invalidemail');

    // Step 2: Enter valid password
    const passwordInput = page.getByLabel(/password/i);
    await passwordInput.fill('Password123!');

    // Step 3: Click Login button
    await page.getByRole('button', { name: /log in|login/i }).click();

    // Expected Result 1 & 2: Validation error displayed with correct message
    // We check for common validation patterns (HTML5 validation or UI error messages)
    
    // Check for UI-based error message
    const errorMessage = page.locator('text=/invalid email|format|provide a valid email/i');
    
    // If the application uses HTML5 validation, we can check validity state
    const isNativeInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.checkValidity());
    
    if (await errorMessage.isVisible()) {
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText(/email/i);
    } else {
        // Fallback to checking HTML5 validation if no UI element is found
        expect(isNativeInvalid).toBe(true);
    }
  });

});