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
test.describe('Authentication @Sqwgcis6p', () => {

  test('@Tjjwqz6gj @login MODULE-001: Failed login with invalid credentials', async ({ page }) => {

    const invalidUsername = "invalid.user@example.com";
    const invalidPassword = "InvalidPassword123";

    //
    // STEP 1: Navigate to the login page (Verify login page loads successfully)
    //
    await page.goto('/login', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    const loginForm = page.getByTestId('login-form');
    await loginForm.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(loginForm).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 2: Enter invalid username in the username field (Verify username is entered)
    //
    const usernameInput = page.getByTestId('username-input');
    await usernameInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await usernameInput.fill(invalidUsername, { timeout: ACTION_TIMEOUT });
    await expect(usernameInput).toHaveValue(invalidUsername, { timeout: EXPECT_TIMEOUT });

    //
    // STEP 3: Enter invalid password in the password field (Verify password is masked and entered)
    //
    const passwordInput = page.getByTestId('password-input');
    await passwordInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await passwordInput.fill(invalidPassword, { timeout: ACTION_TIMEOUT });
    await expect(passwordInput).toHaveValue(invalidPassword, { timeout: EXPECT_TIMEOUT });
    await expect(passwordInput).toHaveAttribute('type', 'password', { timeout: EXPECT_TIMEOUT });

    //
    // STEP 4: Click the Login button (Verify error message is displayed indicating invalid credentials)
    //
    const loginButton = page.getByTestId('login-button');
    await loginButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await loginButton.click({ timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    const errorMessage = page.getByTestId('toast-error');
    await errorMessage.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(errorMessage).toBeVisible({ timeout: EXPECT_TIMEOUT });

  });

});