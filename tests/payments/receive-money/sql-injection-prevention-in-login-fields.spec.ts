import { test, expect } from '@playwright/test';

/**
 * @name SQL injection prevention in login fields
 * @description Verify login form is protected against SQL injection attacks
 * @priority high
 * @type e2e
 * @tags login, security, sql-injection
 */

test.describe('Security: Login SQL Injection Protection', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is on login page
    // Replace '/' with the actual login route if different
    await page.goto('/login');
  });

  test('should prevent login via SQL injection in email field', async ({ page }) => {
    const sqlInjectionPayload = "' OR '1'='1";
    const dummyPassword = 'Password123!';

    // Step 1: Enter SQL injection string in Email field
    const emailInput = page.getByRole('textbox', { name: /email|user/i });
    await emailInput.fill(sqlInjectionPayload);

    // Step 2: Enter any password
    const passwordInput = page.getByRole('textbox', { name: /password/i });
    await passwordInput.fill(dummyPassword);

    // Step 3: Click Login button
    await page.getByRole('button', { name: /log in|sign in|login/i }).click();

    // Expected Result 1: Login fails
    // We verify we are either still on the login page or an error message is shown
    // and definitely NOT redirected to a dashboard/home area.
    await expect(page).not.toHaveURL(/.*dashboard|.*home|.*account/);

    // Expected Result 2: No database error exposed
    // Check that common SQL error strings are not present in the DOM
    const bodyText = await page.locator('body').innerText();
    const sqlErrorKeywords = [
      'SQL syntax', 
      'mysql_fetch', 
      'ORA-', 
      'PostgreSQL query failed', 
      'SQLite3::Exception',
      'unclosed quotation mark'
    ];
    
    for (const error of sqlErrorKeywords) {
      expect(bodyText.toLowerCase()).not.toContain(error.toLowerCase());
    }

    // Expected Result 3: Input is sanitized / Handled safely
    // Verify that a generic "Invalid credentials" message is shown rather than a system crash
    const errorMessage = page.getByText(/invalid|incorrect|failed/i);
    await expect(errorMessage).toBeVisible();
    
    // Verify the input field still contains the payload (proving it wasn't executed as code)
    // or is cleared, but the system remains stable.
    await expect(emailInput).toHaveValue(sqlInjectionPayload);
  });

});