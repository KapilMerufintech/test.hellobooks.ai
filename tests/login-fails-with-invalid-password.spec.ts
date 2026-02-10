import { test, expect } from '@playwright/test';
import type { Page, TestInfo } from '@playwright/test';

// ================================
// GLOBAL TIMEOUTS (3–5 MINUTES)
// ================================
test.setTimeout(5 * 60 * 1000); // 5 minutes per test

const ACTION_TIMEOUT = 3 * 60 * 1000; // 3 minutes for actions
const EXPECT_TIMEOUT = 3 * 60 * 1000; // 3 minutes for assertions

// ================================
// SEED CREDENTIALS
// ================================
const seedCredentials = {
  email: 'fapopi7433@feanzier.com',
  password: 'Kapil08dangar@'
};

// ================================
// HELPERS
// ================================
async function openLoginPage(page: Page) {
  await page.goto('/login', { timeout: ACTION_TIMEOUT });
  await expect(
    page.getByRole('heading', { name: /login|sign in/i })
      .or(page.locator('form'))
  ).toBeVisible({ timeout: EXPECT_TIMEOUT });
}

async function fillLogin(page: Page, email: string, password: string) {
  const emailField = page.getByRole('textbox', { name: /email|username/i });
  await emailField.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
  await emailField.fill(email);

  const passwordField = page.getByRole('textbox', { name: /password/i });
  await passwordField.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
  await passwordField.fill(password);
}

async function submitLogin(page: Page) {
  const submitButton = page.getByRole('button', { name: /login|sign in/i });
  await submitButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
  await submitButton.click();
}

async function expectInvalidLogin(page: Page) {
  const errorMessage = page
    .getByRole('alert')
    .or(page.getByText(/invalid|incorrect|failed|error/i));

  await expect(errorMessage).toBeVisible({ timeout: EXPECT_TIMEOUT });
  await expect(page).toHaveURL(/login|sign/i, { timeout: EXPECT_TIMEOUT });
}

// ================================
// TEST SUITE
// ================================
test.describe('Authentication @S5f0wmufw', () => {

  test(
    '@Trmef410f @login Authentication-001: Login fails with invalid password',
    async ({ page }, testInfo: TestInfo) => {

      // Unique invalid password per run
      const invalidPassword = `WrongPass-${testInfo.testId.slice(0, 6)}!`;

      // Step 1: Open login page (NO pre-login)
      await openLoginPage(page);
      await page.screenshot({ path: 'login-page.png' });

      // Step 2: Enter valid email + invalid password
      await fillLogin(page, seedCredentials.email, invalidPassword);
      await page.screenshot({ path: 'login-filled.png' });

      // Step 3: Submit login
      await submitLogin(page);
      await page.screenshot({ path: 'login-submitted.png' });

      // Step 4: Verify login fails
      await expectInvalidLogin(page);
      await page.screenshot({ path: 'login-error.png' });
    }
  );

});