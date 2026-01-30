import { test, expect } from '@playwright/test';

/**
 * @name Submit forgot password request with unregistered email
 * @description Verifies system behavior when an unregistered email is submitted for password reset
 * @priority high
 * @type e2e
 * @tags auth, forgot-password, negative-test, security
 */

test.describe('Forgot Password Flow', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is on the Forgot Password page
    // Replace '/forgot-password' with the actual URL of your application
    await page.goto('/forgot-password');
  });

  test('Submit forgot password request with unregistered email @auth @forgot-password @negative-test @security', async ({ page }) => {
    const unregisteredEmail = `unregistered-${Date.now()}@example.com`;

    // Step 1: Enter an email address that is not registered in the system
    // Using getByLabel or getByRole is preferred for accessibility and reliability
    const emailInput = page.getByRole('textbox', { name: /email/i });
    await emailInput.fill(unregisteredEmail);

    // Expected Result 1: Email field accepts the input
    await expect(emailInput).toHaveValue(unregisteredEmail);

    // Step 2: Click the 'Submit' or 'Reset Password' button
    // Using getByRole to target the button specifically
    const submitButton = page.getByRole('button', { name: /submit|reset password/i });
    await submitButton.click();

    /**
     * Expected Result 2: Appropriate error message is displayed or generic success message for security.
     * Note: Modern security best practices often suggest showing a generic success message 
     * to prevent "User Enumeration" attacks.
     */
    
    // Option A: Check for a generic success message (Security Best Practice)
    const successMessage = page.getByText(/if that email exists/i).or(page.getByText(/email has been sent/i));
    
    // Option B: Check for an error message (If the business requirement specifically demands it)
    const errorMessage = page.getByText(/user not found|invalid email/i);

    // We assert that at least one form of feedback is visible to the user
    await expect(successMessage.or(errorMessage)).toBeVisible();
    
    // Example of a specific assertion for a generic security message:
    // await expect(page.getByText(/If an account exists for that email, you will receive a password reset link/i)).toBeVisible();
  });
});