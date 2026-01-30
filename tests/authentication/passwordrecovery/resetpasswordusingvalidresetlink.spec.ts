import { test, expect } from '@playwright/test';

/**
 * @name Reset password using valid reset link
 * @description Verifies successful password reset using a valid reset link
 * @priority high
 * @type e2e
 * @tags auth, forgot-password, password-reset, positive-test
 */

test.describe('Password Reset Flow', () => {
  // Mocking the reset token for the test environment
  const VALID_RESET_TOKEN = 'abc-123-xyz-789';
  const RESET_URL = `/reset-password?token=${VALID_RESET_TOKEN}`;
  const NEW_PASSWORD = 'NewSecurePassword123!';

  test('should successfully reset password with a valid link', async ({ page }) => {
    // Precondition: User has received a valid password reset email and clicks the link
    // Step 1: Click on the password reset link in the email (Navigating directly to the URL)
    await test.step('Navigate to reset password page', async () => {
      await page.goto(RESET_URL);
      
      // Expected Result 1: Reset password page loads successfully
      await expect(page).toHaveURL(/.*reset-password/);
      await expect(page.getByRole('heading', { name: /reset password/i })).toBeVisible();
    });

    // Step 2: Enter a new valid password
    await test.step('Enter new password', async () => {
      const passwordInput = page.getByLabel(/new password/i);
      await passwordInput.fill(NEW_PASSWORD);
      
      // Expected Result 2: New password is accepted (checking input value)
      await expect(passwordInput).toHaveValue(NEW_PASSWORD);
    });

    // Step 3: Confirm the new password
    await test.step('Confirm new password', async () => {
      const confirmInput = page.getByLabel(/confirm password/i);
      await confirmInput.fill(NEW_PASSWORD);

      // Expected Result 3: Password confirmation matches
      await expect(confirmInput).toHaveValue(NEW_PASSWORD);
    });

    // Step 4: Click 'Reset Password' or 'Submit' button
    await test.step('Submit password reset form', async () => {
      await page.getByRole('button', { name: /reset password|submit/i }).click();
    });

    // Expected Result 4: Success message is displayed
    await test.step('Verify success message and login capability', async () => {
      const successMessage = page.getByText(/password has been reset successfully|success/i);
      await expect(successMessage).toBeVisible();

      // Verify redirection to login or presence of login button
      const loginButton = page.getByRole('button', { name: /log in|sign in/i });
      await expect(loginButton).toBeVisible();

      // Optional: Verify user can login with new password
      await page.getByLabel(/email|username/i).fill('testuser@example.com');
      await page.getByLabel(/password/i).fill(NEW_PASSWORD);
      await loginButton.click();

      // Final assertion: User is redirected to dashboard/home after login
      await expect(page).toHaveURL(/.*dashboard|.*home/);
    });
  });
});