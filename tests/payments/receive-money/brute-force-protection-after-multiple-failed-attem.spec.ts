import { test, expect } from '@playwright/test';

/**
 * @test-id: SECURITY-001
 * @priority: high
 * @tags: login, security, brute-force
 * @description: Verify account lockout or CAPTCHA after consecutive failed login attempts
 */

test.describe('Security: Brute Force Protection', () => {
  const VALID_EMAIL = 'testuser@example.com';
  const WRONG_PASSWORD = 'WrongPassword123!';
  const MAX_ATTEMPTS = 5;

  test.beforeEach(async ({ page }) => {
    // Precondition: User is on the login page
    await page.goto('/login');
  });

  test('Brute force protection after multiple failed attempts', async ({ page }) => {
    const emailInput = page.getByRole('textbox', { name: /email|username/i });
    const passwordInput = page.getByRole('textbox', { name: /password/i });
    const loginButton = page.getByRole('button', { name: /log in|sign in/i });

    // Step 1 & 2: Enter valid email and wrong password 5 times consecutively
    for (let i = 1; i <= MAX_ATTEMPTS; i++) {
      await emailInput.fill(VALID_EMAIL);
      await passwordInput.fill(WRONG_PASSWORD);
      await loginButton.click();

      // Optional: Assert that an error message appears for each failed attempt
      // to ensure the UI has processed the request before the next iteration
      await expect(page.getByText(/invalid/i).first()).toBeVisible();
    }

    // Step 3: Attempt 6th login
    await emailInput.fill(VALID_EMAIL);
    await passwordInput.fill(WRONG_PASSWORD);
    await loginButton.click();

    // Expected Result 1: Account temporarily locked or CAPTCHA displayed
    // We check for common security indicators
    const lockoutMessage = page.getByText(/locked|too many attempts|try again later/i);
    const captcha = page.locator('iframe[title*="reCAPTCHA"], .g-recaptcha, #captcha');

    const isLockoutVisible = await lockoutMessage.isVisible();
    const isCaptchaVisible = await captcha.isVisible();

    expect(isLockoutVisible || isCaptchaVisible).toBeTruthy();

    // Expected Result 2: Security warning message shown
    // Asserting that the UI specifically informs the user about the security restriction
    await expect(page.locator('role=alert').or(page.locator('.error-message'))).toContainText(
      /security|locked|suspended|minutes|captcha/i
    );
  });
});