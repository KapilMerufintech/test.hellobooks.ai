import { test, expect } from '@playwright/test';
import type { TestInfo } from '@playwright/test';

test.setTimeout(5 * 60 * 1000);
const ACTION_TIMEOUT = 3 * 60 * 1000;
const EXPECT_TIMEOUT = 3 * 60 * 1000;

test.describe('Authentication @Seod058di', () => {
  test('@T8fkdsyfg @login AUTH-001: Successful login with valid credentials', async ({ page }) => {
    const username = 'valid.user@example.com';
    const password = 'ValidPassword123';

    // Navigate to login page
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    const loginForm = page.getByTestId('login-form');
    await loginForm.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(loginForm).toBeVisible({ timeout: EXPECT_TIMEOUT });
    await page.screenshot({ path: 'debug-login-page-loaded.png' });

    // Fill username
    const usernameInput = page.getByTestId('login-username');
    await usernameInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await usernameInput.fill(username);
    await expect(usernameInput).toHaveValue(username, { timeout: EXPECT_TIMEOUT });

    // Fill password
    const passwordInput = page.getByTestId('login-password');
    await passwordInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await passwordInput.fill(password);
    await expect(passwordInput).toHaveValue(password, { timeout: EXPECT_TIMEOUT });
    await expect(passwordInput).toHaveAttribute('type', 'password', { timeout: EXPECT_TIMEOUT });
    await page.screenshot({ path: 'debug-login-form-filled.png' });

    // Click login
    const loginButton = page.getByTestId('login-submit');
    await loginButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await loginButton.click();
    await page.waitForLoadState('networkidle');
    await page.waitForURL(/\/(dashboard|home)/, { timeout: ACTION_TIMEOUT });

    // Verify dashboard/home page is visible
    const dashboardHome = page.getByTestId('dashboard-home');
    await dashboardHome.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(dashboardHome).toBeVisible({ timeout: EXPECT_TIMEOUT });
    await page.screenshot({ path: 'debug-dashboard-loaded.png' });
  });
});