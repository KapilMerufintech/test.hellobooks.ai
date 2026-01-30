import { test, expect } from '@playwright/test';

/**
 * @name Verify single-use password reset link
 * @description Validates that a password reset link can only be used once
 * @priority high
 * @type e2e
 * @tags auth, forgot-password, security, single-use
 */

test.describe('Password Reset Security', () => {
  // Mocking the reset token/URL for the test scenario
  const resetToken = 'unique-secure-token-123';
  const resetUrl = `/reset-password?token=${resetToken}`;

  test('should invalidate the password reset link after a single successful use', async ({ page }) => {
    // Step 1: Use the password reset link to successfully reset password
    await page.goto(resetUrl);

    // Fill in the new password details
    await page.getByLabel('New Password', { exact: true }).fill('NewSecurePassword123!');
    await page.getByLabel('Confirm New Password').fill('NewSecurePassword123!');
    
    // Submit the form
    await page.getByRole('button', { name: /update password|reset password/i }).click();

    // Expected Result 1: First password reset is successful
    // We expect a success message or a redirect to the login page
    await expect(page.getByText(/password has been reset successfully/i)).toBeVisible();
    await expect(page).toHaveURL(/.*login/);

    // Step 2: Attempt to use the same reset link again
    await page.goto(resetUrl);

    // Expected Result 2: Second attempt shows error indicating link has already been used
    // Common security patterns show an error message or redirect to a "Link Expired" page
    const errorMessage = page.locator('text=/link has already been used|link is invalid or expired/i');
    await expect(errorMessage).toBeVisible();

    // Ensure the password fields are either not present or the submit button is disabled/hidden
    const submitButton = page.getByRole('button', { name: /update password|reset password/i });
    await expect(submitButton).not.toBeVisible();
  });
});

/**
 * Setup/Teardown Note:
 * In a real-world CI environment, the 'resetToken' would typically be retrieved 
 * via an API call to the backend or by using a tool like Mailosaur to fetch 
 * the link from a real email inbox before the test starts.
 */