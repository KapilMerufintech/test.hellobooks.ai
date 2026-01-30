import { test, expect } from '@playwright/test';

/**
 * @name Reset password with mismatched password confirmation
 * @description Validates that password reset fails when confirmation password does not match
 * @priority medium
 * @type e2e
 * @tags auth, forgot-password, validation, negative-test
 */

test.describe('Password Reset Validation', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is on the password reset page via valid link
    // Using a mock token for the reset URL
    await page.goto('/reset-password?token=valid-reset-token-123');
  });

  test('should show error when passwords do not match', async ({ page }) => {
    const newPassword = 'SecurePassword123!';
    const mismatchedPassword = 'DifferentPassword456!';

    // Step 1: Enter a new password in the password field
    const passwordInput = page.getByLabel(/new password/i);
    await passwordInput.fill(newPassword);
    
    // Expected Result 1: Password field accepts input
    await expect(passwordInput).toHaveValue(newPassword);

    // Step 2: Enter a different password in the confirm password field
    const confirmPasswordInput = page.getByLabel(/confirm password/i);
    await confirmPasswordInput.fill(mismatchedPassword);

    // Expected Result 2: Confirm password field accepts input
    await expect(confirmPasswordInput).toHaveValue(mismatchedPassword);

    // Step 3: Click 'Reset Password' button
    const submitButton = page.getByRole('button', { name: /reset password/i });
    await submitButton.click();

    // Expected Result 3: Error message is displayed indicating passwords do not match
    // We check for common validation message patterns
    const errorMessage = page.getByText(/passwords do not match|must match/i);
    await expect(errorMessage).toBeVisible();
    
    // Additional check: Ensure the URL hasn't changed to a success page
    await expect(page).not.toHaveURL(/success|login/);
  });
});