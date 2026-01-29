import { test, expect } from '@playwright/test';

/**
 * @name Login API failure shows user-friendly error
 * @description Verify graceful handling when backend API is unavailable
 * @priority medium
 * @type integration
 * @tags login, api, error-handling, negative
 */

test.describe('Login Error Handling', () => {
  
  test('should display user-friendly error when backend API is unreachable', async ({ page }) => {
    // Precondition: User is on login page
    await page.goto('/login');

    // Precondition: Mock the backend API to simulate a failure (503 Service Unavailable or Connection Refused)
    // We intercept the login POST request to simulate the backend being down
    await page.route('**/api/login', async (route) => {
      await route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Service Unavailable' }),
      });
    });

    // Step 1: Enter valid credentials
    await page.getByLabel(/username|email/i).fill('testuser@example.com');
    await page.getByLabel(/password/i).fill('Password123!');

    // Step 2: Click Login button
    await page.getByRole('button', { name: /log in|login/i }).click();

    // Expected Result 1: User-friendly error message displayed
    const errorMessage = page.getByText(/unable to connect|please try again later|temporary issue/i);
    await expect(errorMessage).toBeVisible();

    // Expected Result 2: No technical error details exposed
    // Verify that common technical strings (stack traces, DB errors, internal paths) are NOT present
    const pageContent = await page.content();
    const technicalTerms = ['stacktrace', 'Internal Server Error', 'SQL', 'at /usr/src/app', 'exception'];
    technicalTerms.forEach(term => {
      expect(pageContent.toLowerCase()).not.toContain(term.toLowerCase());
    });

    // Expected Result 3: Retry option available
    // This could be the login button being enabled again or a specific "Retry" button
    const retryButton = page.getByRole('button', { name: /retry|try again|log in/i });
    await expect(retryButton).toBeVisible();
    await expect(retryButton).toBeEnabled();
  });

});