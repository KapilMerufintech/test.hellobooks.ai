import { test, expect } from '@playwright/test';

/**
 * @name Submit forgot password with invalid email format
 * @description Validates email format validation on the forgot password form
 * @priority medium
 * @type e2e
 * @tags auth, forgot-password, validation, negative-test
 */

test.describe('Forgot Password Validation', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is on the Forgot Password page
    // Note: Replace '/forgot-password' with the actual URL of your application
    await page.goto('/forgot-password');
  });

  const invalidEmails = ['invalidemail', 'test@', '@domain.com'];

  for (const invalidEmail of invalidEmails) {
    test(`should show validation error for invalid email format: "${invalidEmail}"`, async ({ page }) => {
      // Step 1: Enter an invalid email format
      const emailInput = page.getByRole('textbox', { name: /email/i });
      await emailInput.fill(invalidEmail);

      // Step 2: Click the 'Submit' or 'Reset Password' button
      // Using a regex to match common button labels for this feature
      const submitButton = page.getByRole('button', { name: /submit|reset password/i });
      await submitButton.click();

      // Expected Result 1: Form validation error is displayed
      // We check for common validation patterns: HTML5 validation or UI error messages
      const isNativeInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.checkValidity());
      
      if (isNativeInvalid) {
        // Assertion for HTML5 validation
        expect(isNativeInvalid).toBe(true);
      } else {
        // Expected Result 2: User is prompted to enter a valid email format via UI message
        const errorMessage = page.getByText(/enter a valid email|invalid email/i);
        await expect(errorMessage).toBeVisible();
      }

      // Additional check: Ensure the URL hasn't changed to a success page
      await expect(page).not.toHaveURL(/success|confirmation/);
    });
  }
});