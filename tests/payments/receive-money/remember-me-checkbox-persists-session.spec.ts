import { test, expect, chromium } from '@playwright/test';

/**
 * @name Remember Me checkbox persists session
 * @description Verify Remember Me keeps user logged in after browser restart
 * @priority medium
 * @type e2e
 * @tags login, session, remember-me
 */

test.describe('Authentication Session Persistence', () => {
  const LOGIN_URL = 'https://example.com/login';
  const DASHBOARD_URL = 'https://example.com/dashboard';
  const STORAGE_STATE_PATH = 'auth-state.json';

  test('User remains logged in after browser restart when Remember Me is checked', async ({ browser }) => {
    // 1. Create a fresh browser context for the initial login
    const context = await browser.newContext();
    const page = await context.newPage();

    // Precondition: User is on login page
    await page.goto(LOGIN_URL);

    // Step 1: Enter valid credentials
    await page.getByLabel(/username|email/i).fill('testuser@example.com');
    await page.getByLabel(/password/i).fill('Password123!');

    // Step 2: Check Remember Me checkbox
    await page.getByRole('checkbox', { name: /remember me/i }).check();

    // Step 3: Click Login
    await page.getByRole('button', { name: /log in|sign in/i }).click();

    // Verify initial login success
    await expect(page).toHaveURL(DASHBOARD_URL);
    await expect(page.getByText(/welcome/i)).toBeVisible();

    // Save storage state (cookies, local storage) to simulate persistence
    await context.storageState({ path: STORAGE_STATE_PATH });

    // Step 4: Close browser (context)
    await context.close();

    // Step 4 (continued): Reopen browser with the saved storage state
    const persistentContext = await browser.newContext({ storageState: STORAGE_STATE_PATH });
    const newPage = await persistentContext.newPage();

    // Step 5: Navigate to application
    await newPage.goto(DASHBOARD_URL);

    // Expected Result 1 & 2: User remains logged in and session persists
    // We verify we are not redirected back to login and dashboard content is visible
    await expect(newPage).toHaveURL(DASHBOARD_URL);
    await expect(newPage.getByRole('button', { name: /logout|sign out/i })).toBeVisible();
    
    // Cleanup
    await persistentContext.close();
  });
});