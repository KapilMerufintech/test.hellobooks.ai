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
test.describe('Authentication @S3cr6fgf6', () => {

  test('@Tvoa7ivvp @login MODULE-001: Verify login failure with invalid credentials', async ({ page }) => {

    //
    // STEP 1: Navigate to the login page
    //
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
    await page.goto('/login', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    const loginForm = page.getByTestId('login-form');
    await loginForm.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(loginForm).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 2: Enter invalid username in the username field
    //
    const suffix = Date.now().toString(36);
    const invalidUsername = "invalid_user_" + suffix;
    const usernameInput = page.getByTestId('username-input');
    await usernameInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await usernameInput.fill(invalidUsername, { timeout: ACTION_TIMEOUT });
    await expect(usernameInput).toHaveValue(invalidUsername, { timeout: EXPECT_TIMEOUT });

    //
    // STEP 3: Enter invalid password in the password field
    //
    const invalidPassword = "InvalidPass_" + suffix;
    const passwordInput = page.getByTestId('password-input');
    await passwordInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await passwordInput.fill(invalidPassword, { timeout: ACTION_TIMEOUT });
    await expect(passwordInput).toHaveAttribute('type', 'password', { timeout: EXPECT_TIMEOUT });

    //
    // STEP 4: Click the Login button
    //
    const loginButton = page.getByTestId('login-button');
    await loginButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await loginButton.click({ timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    await page.waitForURL(/\/login/, { timeout: ACTION_TIMEOUT });

    //
    // STEP 5: Verify error message displayed and user remains on login page
    //
    const loginError = page.getByTestId('login-error');
    await loginError.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(loginError).toBeVisible({ timeout: EXPECT_TIMEOUT });

  });

});