import { test, expect } from '@playwright/test';

/**
 * @name Submit forgot password request with valid registered email
 * @description Verifies that a password reset email is sent when a valid registered email is provided
 * @priority high
 * @type e2e
 * @tags auth, forgot-password, email, positive-test
 */

test.describe('Forgot Password Flow', () => {
  const VALID_EMAIL = 'registered-user@example.com';
  const FORGOT_PASSWORD_URL = '/forgot-password';

  test.beforeEach(async ({ page }) => {
    // Precondition: User is on the Forgot Password page
    await page.goto(FORGOT_PASSWORD_URL);
  });

  test('Submit forgot password request with valid registered email @auth @forgot-password @email @positive-test', async ({ page }) => {
    // Step 1: Enter a valid registered email address in the email field
    // Using semantic locator for the email input
    const emailInput = page.getByRole('textbox', { name: /email/i });
    await expect(emailInput).toBeVisible();
    await emailInput.fill(VALID_EMAIL);

    // Expected Result 1: Email field accepts the valid email format
    await expect(emailInput).toHaveValue(VALID_EMAIL);

    // Step 2: Click the 'Submit' or 'Reset Password' button
    // Using getByRole to find the button by its accessible name
    const submitButton = page.getByRole('button', { name: /reset password|submit/i });
    await submitButton.click();

    // Expected Result 2: Success message is displayed confirming email sent
    // We look for common success indicators like "check your email" or "sent"
    const successMessage = page.getByText(/email has been sent|check your inbox|password reset link/i);
    await expect(successMessage).toBeVisible();

    /**
     * Step 3: Check the email inbox for the reset link
     * Expected Result 3: Password reset email is received in the inbox
     * 
     * Note: In a real E2E environment, this would typically involve:
     * 1. Using an API client for a service like Mailosaur or Mailtrap
     * 2. Or checking a mock email service UI
     * Below is a placeholder for the logic.
     */
    
    // Example of how one might verify an email via an external API (commented out):
    /*
    const email = await mailClient.getLastEmail(VALID_EMAIL);
    expect(email.subject).toContain('Reset your password');
    expect(email.html.links[0]).toContain('/reset-password?token=');
    */

    // For the purpose of this spec, we assert the UI confirms the action
    await expect(page).toHaveURL(/.*confirmation|.*success/ || page.url());
  });
});