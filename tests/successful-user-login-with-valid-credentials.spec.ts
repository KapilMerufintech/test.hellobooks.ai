import { test, expect } from '@playwright/test';
import type { TestInfo } from '@playwright/test';

test.setTimeout(5 * 60 * 1000);
const ACTION_TIMEOUT = 3 * 60 * 1000;
const EXPECT_TIMEOUT = 3 * 60 * 1000;

test.describe('Authentication @S3j9f3rp7', () => {
  test('@Tvpm7p37y @login MODULE-001: Successful user login with valid credentials', async ({ page }) => {
    const username = 'valid.user@example.com';
    const password = 'ValidPassword123';

    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    const loginPage = page.getByTestId('login-page');
    await loginPage.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(loginPage).toBeVisible({ timeout: EXPECT_TIMEOUT });

    const usernameInput = page.getByTestId('username-input');
    await usernameInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await usernameInput.fill(username, { timeout: ACTION_TIMEOUT });
    await expect(usernameInput).toHaveValue(username, { timeout: EXPECT_TIMEOUT });

    const passwordInput = page.getByTestId('password-input');
    await passwordInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await passwordInput.fill(password, { timeout: ACTION_TIMEOUT });
    await expect(passwordInput).toHaveAttribute('type', 'password', { timeout: EXPECT_TIMEOUT });

    await page.screenshot({ path: 'debug-login-filled.png' });

    const loginButton = page.getByTestId('login-button');
    await loginButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await loginButton.click({ timeout: ACTION_TIMEOUT });

    await page.waitForURL(/dashboard|home/, { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');

    const dashboardContainer = page.getByTestId('dashboard-page');
    await dashboardContainer.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(dashboardContainer).toBeVisible({ timeout: EXPECT_TIMEOUT });

    await page.screenshot({ path: 'debug-dashboard-loaded.png' });
  });
});