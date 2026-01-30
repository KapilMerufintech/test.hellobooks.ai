import { test, expect } from '@playwright/test';

/**
 * @name Verify password reset link expiration
 * @description Validates that the password reset link expires after the configured time period
 * @priority high
 * @type e2e
 * @tags auth, forgot-password, security, expiration
 */

test.describe('Password Reset Security', () => {
  
  test('should show error message when reset link has expired', async ({ page }) => {
    // 1. Request a password reset email
    await page.goto('/forgot-password');
    
    await page.getByLabel(/email/i).fill('testuser@example.com');
    await page.getByRole('button', { name: /send reset link/i }).click();

    // Assertion: Reset email is triggered/received (UI confirmation)
    await expect(page.getByText(/reset link has been sent/i)).toBeVisible();

    /**
     * 2. Wait for the link expiration period to pass
     * In a real E2E test, we wouldn't literally wait 24 hours.
     * Best Practice: Use a "magic" token that is pre-expired in the test environment 
     * or manipulate the application clock if the framework supports it.
     * For this script, we simulate navigating to a known expired token URL.
     */
    const expiredToken = 'expired-token-12345';
    const resetUrl = `/reset-password?token=${expiredToken}`;

    // 3. Click on (navigate to) the expired reset link
    await page.goto(resetUrl);

    // Expected Result: Error message is displayed indicating the link has expired
    const errorMessage = page.getByText(/this password reset link has expired/i);
    
    await expect(errorMessage).toBeVisible();
    
    // Ensure the user cannot see the password reset form fields
    await expect(page.getByLabel(/new password/i)).not.toBeVisible();
    
    // Verify a call to action to request a new link exists
    await expect(page.getByRole('link', { name: /request a new link/i })).toBeVisible();
  });

});

/**
 * Mocking/Setup Note:
 * In a production-ready CI environment, you would typically:
 * 1. Use an API call to generate a reset token.
 * 2. Manually expire that token in the database via a helper/utility.
 * 3. Navigate to the UI using that specific token.
 */