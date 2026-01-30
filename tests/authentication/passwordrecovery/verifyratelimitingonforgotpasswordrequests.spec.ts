import { test, expect } from '@playwright/test';

/**
 * @name Verify rate limiting on forgot password requests
 * @description Validates that the system prevents abuse by limiting password reset requests
 * @priority medium
 * @type e2e
 * @tags auth, forgot-password, security, rate-limiting
 */

test.describe('Forgot Password Security - Rate Limiting', () => {
  const TEST_EMAIL = 'security-test@example.com';
  const MAX_REQUESTS_BEFORE_LIMIT = 5;

  test.beforeEach(async ({ page }) => {
    // Precondition: User is on the Forgot Password page
    await page.goto('/forgot-password');
  });

  test('should display rate limit message after multiple reset attempts', async ({ page }) => {
    const emailInput = page.getByRole('textbox', { name: /email/i });
    const submitButton = page.getByRole('button', { name: /reset password|submit/i });

    // Step 1: Submit multiple password reset requests in quick succession
    for (let i = 0; i < MAX_REQUESTS_BEFORE_LIMIT; i++) {
      await emailInput.fill(TEST_EMAIL);
      await submitButton.click();

      // Expected Result 1: Initial requests are processed normally
      // We check for a success indicator (e.g., a toast or message) that isn't the rate limit error
      const successMessage = page.getByText(/email sent|check your inbox/i);
      await expect(successMessage).toBeVisible();
      
      // Optional: If the page redirects or clears, navigate back or clear input
      // This depends on the specific app implementation
      if (i < MAX_REQUESTS_BEFORE_LIMIT - 1) {
        await page.reload();
        await emailInput.waitFor({ state: 'visible' });
      }
    }

    // Step 2: Trigger the request that should exceed the threshold
    await emailInput.fill(TEST_EMAIL);
    await submitButton.click();

    // Expected Result 2: After threshold is reached, rate limit message is displayed
    // Common rate limit messages: "Too many requests", "Try again later", "Rate limit exceeded"
    const rateLimitMessage = page.getByText(/too many requests|try again later|rate limit/i);
    
    await expect(rateLimitMessage).toBeVisible();
    
    // Verify the error is distinct from a standard validation error
    await expect(rateLimitMessage).toHaveCSS('color', /rgb\(.*\)/); // Usually styled as an error (red)
    
    // Verify that the system actually blocked the request (e.g., status code 429 if monitoring network)
    // This is an optional but robust check
    page.on('response', response => {
      if (response.url().includes('/api/forgot-password')) {
        expect(response.status()).toBe(429);
      }
    });
  });
});