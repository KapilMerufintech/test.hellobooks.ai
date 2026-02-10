import { test, expect } from '@playwright/test';
import type { Page, TestInfo } from '@playwright/test';

/* ======================================================
   GLOBAL TIMEOUTS (3–5 MINUTES)
====================================================== */
test.setTimeout(5 * 60 * 1000); // 5 minutes per test

const ACTION_TIMEOUT = 3 * 60 * 1000;
const EXPECT_TIMEOUT = 3 * 60 * 1000;

/* ======================================================
   SEED CREDENTIALS
====================================================== */
const VALID_EMAIL = 'fapopi7433@feanzier.com';

/* ======================================================
   HELPERS
====================================================== */
async function openLoginPage(page: Page) {
  await page.goto('/login', { timeout: ACTION_TIMEOUT });

  await expect(
    page.getByRole('heading', { name: /login|sign in/i })
      .or(page.locator('form').first())
  ).toBeVisible({ timeout: EXPECT_TIMEOUT });
}

async function fillLoginForm(page: Page, email: string, password: string) {
  // Email
  const emailInput = page
    .getByTestId('login-email')
    .or(page.getByRole('textbox', { name: /email|username/i }).first());

  await emailInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
  await emailInput.fill(email);

  // Password
  const passwordInput = page
    .getByTestId('login-password')
    .or(page.getByRole('textbox', { name: /password/i }).first());

  await passwordInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
  await passwordInput.fill(password);
}

async function submitLogin(page: Page) {
  const submitButton = page
    .getByRole('button', { name: /login|sign in/i })
    .or(page.locator('button[type="submit"]').first());

  await submitButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
  await submitButton.click();
}

async function expectLoginFailure(page: Page) {
  // 🔒 STRICT-MODE SAFE: single toast container
  const errorToast = page.getByTestId('toast-error');

  await expect(errorToast).toBeVisible({ timeout: EXPECT_TIMEOUT });

  await expect(errorToast).toContainText(
    /error|invalid|incorrect|locked|failed/i,
    { timeout: EXPECT_TIMEOUT }
  );

  await expect(page).toHaveURL(/login|sign/i, { timeout: EXPECT_TIMEOUT });
}

/* ======================================================
   TEST SUITE
====================================================== */
test.describe('Authentication @S5f0wmufw', () => {

  test(
    '@Trmef410f @login Authentication-001: Login fails with invalid password',
    async ({ page }, testInfo: TestInfo) => {

      const invalidPassword = `WrongPass-${testInfo.testId.slice(0, 6)}!`;

      // Step 1: Open login page (NO pre-login)
      await openLoginPage(page);
      await page.screenshot({ path: '01-login-page.png' });

      // Step 2: Fill valid email + invalid password
      await fillLoginForm(page, VALID_EMAIL, invalidPassword);
      await page.screenshot({ path: '02-login-filled.png' });

      // Step 3: Submit login
      await submitLogin(page);
      await page.screenshot({ path: '03-login-submitted.png' });

      // Step 4: Verify login failure
      await expectLoginFailure(page);
      await page.screenshot({ path: '04-login-error.png' });
    }
  );

});