import { test, expect } from '@playwright/test';

//
// GLOBAL CONFIGURATION
//
test.setTimeout(5 * 60 * 1000); // 5 minutes per test

const ACTION_TIMEOUT = 3 * 60 * 1000;
const EXPECT_TIMEOUT = 3 * 60 * 1000;

//
// TEST SUITE
//
test.describe('Authentication @Sm1cbaj03', () => {

  test('@T20zrjfv3 @login MODULE-001: Successful login with valid credentials', async ({ page }) => {

    //
    // STEP 1: Navigate to the login page and verify it loads successfully
    //
    await page.goto('/login', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    const loginPage = page.getByTestId('login-page');
    await loginPage.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(loginPage).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 2: Enter valid username and verify it is accepted
    //
    const usernameInput = page.getByTestId('username-input');
    await usernameInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await usernameInput.fill('valid.user@example.com', { timeout: ACTION_TIMEOUT });
    await expect(usernameInput).toHaveValue('valid.user@example.com', { timeout: EXPECT_TIMEOUT });

    //
    // STEP 3: Enter valid password and verify it is masked and accepted
    //
    const passwordInput = page.getByTestId('password-input');
    await passwordInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await passwordInput.fill('ValidPassword123!', { timeout: ACTION_TIMEOUT });
    await expect(passwordInput).toHaveAttribute('type', 'password', { timeout: EXPECT_TIMEOUT });
    await expect(passwordInput).toHaveValue('ValidPassword123!', { timeout: EXPECT_TIMEOUT });

    //
    // STEP 4: Click the Login button and verify redirection to dashboard/home page
    //
    const loginButton = page.getByTestId('login-button');
    await loginButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await loginButton.click({ timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    await page.waitForURL(/dashboard|home/, { timeout: ACTION_TIMEOUT });
    const dashboardPage = page.getByTestId('dashboard-page');
    await dashboardPage.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(dashboardPage).toBeVisible({ timeout: EXPECT_TIMEOUT });

  });

});