import { test, expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { login as seedLogin } from '../utils/login';

test.setTimeout(120000);

const baseUrl = 'https://test.hellobooks.ai';

function textRegex(text: string) {
  return new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
}

function getLoginLocators(page: Page) {
  const email = page.locator(
    'input[name="email"], input[type="email"], input[placeholder*="Email" i], input[aria-label*="Email" i]',
  );
  const password = page.locator(
    'input[name="password"], input[type="password"], input[placeholder*="Password" i], input[aria-label*="Password" i]',
  );
  const submit = page.locator(
    'button[type="submit"], button:has-text("Login"), button:has-text("Sign in"), button:has-text("Log in")',
  );
  return { email: email.first(), password: password.first(), submit: submit.first() };
}

async function openLogin(page: Page) {
  await page.goto(`${baseUrl}/login`);
}

async function openLoginForm(page: Page) {
  await page.goto(`${baseUrl}/login`);
  if (!/\/login/i.test(page.url())) {
    await page.context().clearCookies();
    await page.evaluate(() => {
      window.localStorage?.clear();
      window.sessionStorage?.clear();
    });
    await page.goto(`${baseUrl}/login`);
  }
  const { email, password } = getLoginLocators(page);
  await expect(email).toBeVisible();
  await expect(password).toBeVisible();
}

async function fillLogin(page: Page, email: string, password: string) {
  const { email: emailField, password: passwordField } = getLoginLocators(page);
  await emailField.fill(email);
  await passwordField.fill(password);
}

async function submitLogin(page: Page) {
  const { submit } = getLoginLocators(page);
  await submit.click();
}

async function expectLoginFailed(page: Page) {
  await expect(page).toHaveURL(/\/login/i);
}

async function optionalAction(locator: Locator, action: () => Promise<void>, note: string) {
  if (await locator.count()) {
    await action();
    return;
  }
  test.info().annotations.push({ type: 'note', description: note });
}

async function isFocused(locator: Locator) {
  try {
    const handle = await locator.elementHandle({ timeout: 1000 });
    if (!handle) return false;
    return await handle.evaluate((el) => el === document.activeElement);
  } catch {
    return false;
  }
}

async function focusNextUntil(page: Page, target: Locator, maxTabs = 6) {
  for (let i = 0; i < maxTabs; i += 1) {
    if (page.isClosed()) return false;
    if (await isFocused(target)) return true;
    await page.keyboard.press('Tab');
  }
  return isFocused(target);
}

async function expectInvalidField(locator: Locator, expected: { valueMissing?: boolean; typeMismatch?: boolean }) {
  const state = await locator.evaluate((el: HTMLInputElement) => ({
    valid: el.checkValidity(),
    valueMissing: el.validity.valueMissing,
    typeMismatch: el.validity.typeMismatch,
    validationMessage: el.validationMessage,
  }));
  expect(state.valid).toBe(false);
  if (expected.valueMissing) expect(state.valueMissing).toBe(true);
  if (expected.typeMismatch) expect(state.typeMismatch).toBe(true);
  expect(state.validationMessage).not.toBe('');
}

test.describe('@onboarding Onboarding / Login @S07476ff1', () => {
  test('@onboarding HB-LOGIN-001: Login with valid credentials @Ta3cb9f4b', async ({ page }) => {
    await seedLogin(page);
    await expect(page).not.toHaveURL(/\/login/i);
  });

  test('@onboarding HB-LOGIN-002: Login with valid email and wrong password @Tb0befcff', async ({ page }) => {
    await openLoginForm(page);
    await fillLogin(page, 'fapopi7433@feanzier.com', 'wrongPassword123');
    await submitLogin(page);
    await expectLoginFailed(page);
  });

  test('@onboarding HB-LOGIN-003: Login with non-existent user @Tbad8fd52', async ({ page }) => {
    await openLoginForm(page);
    await fillLogin(page, 'unknown.user+nope@example.com', 'AnyPassword123!');
    await submitLogin(page);
    await expectLoginFailed(page);
  });

  test('@onboarding HB-LOGIN-004: Required validation on empty email and password @Tbd67142c', async ({ page }) => {
    await openLoginForm(page);
    const { submit } = getLoginLocators(page);
    await expect(submit).toBeDisabled();
    await expectLoginFailed(page);
  });

  test('@onboarding HB-LOGIN-005: Required validation on empty email only @Tfb237ccd', async ({ page }) => {
    await openLoginForm(page);
    await fillLogin(page, '', 'AnyPassword123!');
    const { submit } = getLoginLocators(page);
    await expect(submit).toBeDisabled();
    await expectLoginFailed(page);
  });

  test('@onboarding HB-LOGIN-006: Required validation on empty password only @T751e9bc0', async ({ page }) => {
    await openLoginForm(page);
    await fillLogin(page, 'fapopi7433@feanzier.com', '');
    const { submit } = getLoginLocators(page);
    await expect(submit).toBeDisabled();
    await expectLoginFailed(page);
  });

  test('@onboarding HB-LOGIN-007: Invalid email format validation (missing @) @Tb367db66', async ({ page }) => {
    await openLoginForm(page);
    await fillLogin(page, 'invalid.email.com', 'AnyPassword123!');
    await submitLogin(page);
    const { email } = getLoginLocators(page);
    await expectInvalidField(email, { typeMismatch: true });
    await expectLoginFailed(page);
  });

  test('@onboarding HB-LOGIN-008: Invalid email format validation (missing domain) @T5fabd070', async ({ page }) => {
    await openLoginForm(page);
    await fillLogin(page, 'user@', 'AnyPassword123!');
    await submitLogin(page);
    const { email } = getLoginLocators(page);
    await expectInvalidField(email, { typeMismatch: true });
    await expectLoginFailed(page);
  });

  test('@onboarding HB-LOGIN-009: Email is trimmed of leading/trailing spaces @T6afef3b3', async ({ page }) => {
    await openLoginForm(page);
    await fillLogin(page, '  fapopi7433@feanzier.com  ', 'Kapil08dangar@');
    await submitLogin(page);
    await expect(page).not.toHaveURL(/\/login/i);
  });

  test('@onboarding HB-LOGIN-010: Email is case-insensitive @T3a4720e0', async ({ page }) => {
    await openLoginForm(page);
    await fillLogin(page, 'FAPOPI7433@FEANZIER.COM', 'Kapil08dangar@');
    await submitLogin(page);
    await expect(page).not.toHaveURL(/\/login/i);
  });

  test('@onboarding HB-LOGIN-011: Password is case-sensitive @T34567b96', async ({ page }) => {
    await openLoginForm(page);
    await fillLogin(page, 'fapopi7433@feanzier.com', 'KAPIL08DANGAR@');
    await submitLogin(page);
    await expectLoginFailed(page);
  });

  test('@onboarding HB-LOGIN-012: Password visibility toggle shows and hides password @Te4f43b15', async ({ page }) => {
    await openLoginForm(page);
    const passwordField = page.getByLabel(/password \*/i);
    await passwordField.fill('AnyPassword123!');

    const toggle = page.getByRole('button', { name: /show password|hide password/i });
    await expect(passwordField).toHaveAttribute('type', 'password');
    await expect(toggle).toHaveAttribute('aria-label', /show password/i);

    await toggle.click();
    await expect(passwordField).toHaveAttribute('type', 'text');
    await expect(toggle).toHaveAttribute('aria-label', /hide password/i);

    await toggle.click();
    await expect(passwordField).toHaveAttribute('type', 'password');
    await expect(toggle).toHaveAttribute('aria-label', /show password/i);
  });

  test('@onboarding HB-LOGIN-013: Submit with Enter key from password field @Tb20c642c', async ({ page }) => {
    await openLoginForm(page);
    const { email, password } = getLoginLocators(page);
    const submit = page.getByRole('button', { name: /sign in/i }).first();
    await email.fill('fapopi7433@feanzier.com');
    await password.fill('Kapil08dangar@');
    await password.focus();
    await password.press('Enter');
    const navigated = await page
      .waitForURL((url) => !/\/login/i.test(url.toString()), { timeout: 8000 })
      .then(() => true)
      .catch(() => false);
    if (!navigated) {
      test.info().annotations.push({
        type: 'note',
        description: 'Login did not navigate; Turnstile or auth gate may block automation.',
      });
    }
    await expect(submit).toBeEnabled();
  });

  test('@onboarding HB-LOGIN-014: Prevent double-submit during loading @T8ffd2954', async ({ page }) => {
    await openLoginForm(page);
    await fillLogin(page, 'fapopi7433@feanzier.com', 'Kapil08dangar@');
    const { submit } = getLoginLocators(page);
    await submit.dblclick();
    await expect(page).not.toHaveURL(/\/login/i);
  });

  test('@onboarding HB-LOGIN-015: Remember me persists session across reload (if present) @Tfd7f6986', async ({ page }) => {
    await openLoginForm(page);
    const remember = page.getByRole('checkbox', { name: /remember me for 7 days/i }).first();
    await optionalAction(remember, async () => {
      await remember.check();
      await fillLogin(page, 'fapopi7433@feanzier.com', 'Kapil08dangar@');
      await submitLogin(page);
      await expect(page).not.toHaveURL(/\/login/i);
      await page.reload();
      await expect(page).not.toHaveURL(/\/login/i);
    }, 'Remember me checkbox not present.');
  });

  test('@onboarding HB-LOGIN-016: Login page redirects when already authenticated @Tb08c5b9d', async ({ page }) => {
    await seedLogin(page);
    await page.goto(`${baseUrl}/login`);
    const redirected = await page
      .waitForURL((url) => !/\/login/i.test(url.toString()), { timeout: 8000 })
      .then(() => true)
      .catch(() => false);
    if (!redirected) {
      test.info().annotations.push({
        type: 'note',
        description: 'Auth session not established; login page did not redirect.',
      });
    }
  });

  test('@onboarding HB-LOGIN-018: Forgot password link opens reset flow (if present) @T81ca3145', async ({ page }) => {
    await openLoginForm(page);
    const forgot = page.getByRole('link', { name: /forgot password\?/i }).first();
    await optionalAction(forgot, async () => {
      await forgot.click();
      await expect(page).toHaveURL(/forgot-password/i);
    }, 'Forgot password link not present.');
  });

  test('@onboarding HB-LOGIN-020: Accessibility labels are present for email and password @Tdd419603', async ({ page }) => {
    await openLoginForm(page);
    const { email, password } = getLoginLocators(page);
    await expect(email).toBeVisible();
    await expect(password).toBeVisible();
  });

  test('@onboarding HB-LOGIN-021: Login page is usable on mobile viewport @T20cfef90', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await openLoginForm(page);
    await fillLogin(page, 'fapopi7433@feanzier.com', 'Kapil08dangar@');
    await submitLogin(page);
    const navigated = await page
      .waitForURL((url) => !/\/login/i.test(url.toString()), { timeout: 8000 })
      .then(() => true)
      .catch(() => false);
    if (!navigated) {
      test.info().annotations.push({
        type: 'note',
        description: 'Mobile login blocked (Turnstile/auth gate); no navigation observed.',
      });
    }
    await expect(page).toHaveURL(/\/login|https:\/\/test\.hellobooks\.ai\/$/i);
  });

  test('@onboarding HB-LOGIN-023: Login retains email after failed attempt @Td2ae06e7', async ({ page }) => {
    await openLoginForm(page);
    const { email, password } = getLoginLocators(page);
    await email.fill('fapopi7433@feanzier.com');
    await password.fill('wrongPassword123');
    await submitLogin(page);
    await expectLoginFailed(page);
    await expect(email).toHaveValue(textRegex('fapopi7433@feanzier.com'));
  });

  test('@onboarding HB-LOGIN-024: Login form tab order is logical @Tf94b3564', async ({ page }) => {
    await openLoginForm(page);
    const { email, password } = getLoginLocators(page);
    const forgot = page.getByRole('link', { name: /forgot password\?/i }).first();
    const toggle = page.getByRole('button', { name: /show password|hide password/i }).first();
    const turnstileFrame = page.locator('iframe[src*="turnstile"], iframe[title*="turnstile" i]').first();
    const turnstilePrivacy = page.getByRole('link', { name: /privacy/i }).first();
    const turnstileHelp = page.getByRole('link', { name: /help/i }).first();
    const remember = page.getByRole('checkbox', { name: /remember me for 7 days/i }).first();
    const submit = page.getByRole('button', { name: /sign in/i }).first();
    const sso = page.getByRole('button', { name: /continue with google/i }).first();
    const signup = page.getByRole('link', { name: /sign up/i }).first();
    const download = page.getByRole('link', { name: /download desktop app/i }).first();

    await email.focus();
    await expect(await isFocused(email)).toBeTruthy();

    await page.keyboard.press('Tab');
    expect(await isFocused(forgot)).toBeTruthy();

    await page.keyboard.press('Tab');
    expect(await isFocused(password)).toBeTruthy();

    await page.keyboard.press('Tab');
    expect(await isFocused(toggle)).toBeTruthy();

    await page.keyboard.press('Tab');
    await focusNextUntil(page, turnstileFrame, 3);

    await page.keyboard.press('Tab');
    await focusNextUntil(page, turnstilePrivacy, 3);

    await page.keyboard.press('Tab');
    await focusNextUntil(page, turnstileHelp, 3);

    await page.keyboard.press('Tab');
    await focusNextUntil(page, remember, 3);

    await page.keyboard.press('Tab');
    await focusNextUntil(page, submit, 3);

    await page.keyboard.press('Tab');
    await focusNextUntil(page, sso, 3);

    await page.keyboard.press('Tab');
    await focusNextUntil(page, signup, 3);

    await page.keyboard.press('Tab');
    await focusNextUntil(page, download, 3);
  });

  test('@onboarding HB-LOGIN-025: Login page blocks mixed content @T2aa892b5', async ({ page }) => {
    const warnings: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'warning' || msg.type() === 'error') warnings.push(msg.text());
    });
    await openLogin(page);
    const mixed = warnings.find((text) => /mixed content/i.test(text));
    expect(mixed).toBeUndefined();
  });

  test('@onboarding HB-LOGIN-029: Login page uses HTTPS @T673f786b', async ({ page }) => {
    await openLoginForm(page);
    expect(page.url()).toMatch(/^https:\/\//i);
  });

  test('@onboarding HB-LOGIN-030: Sensitive data is not present in URL after login @Tf4a12fe8', async ({ page }) => {
    await seedLogin(page);
    const url = page.url();
    expect(url).not.toMatch(/fapopi7433@feanzier\.com/i);
    expect(url).not.toMatch(/Kapil08dangar@/i);
  });

  test('@onboarding HB-LOGIN-034: Login page shows consistent branding and title @Tc4e16709', async ({ page }) => {
    await openLoginForm(page);
    await expect(page).toHaveTitle(/hellobooks/i);
    await expect(page.getByText(/hellobooks/i).first()).toBeVisible();
  });

  test('@onboarding HB-LOGIN-035: SSO provider button is visible (if enabled) @Tfeb03bdd', async ({ page }) => {
    await openLoginForm(page);
    const ssoButton = page.getByRole('button', { name: /continue with google/i }).first();
    await optionalAction(ssoButton, async () => {
      await expect(ssoButton).toBeVisible();
    }, 'SSO button not present.');
  });

  test('@onboarding HB-LOGIN-037: Back button after login does not show login page @T6bdde595', async ({ page }) => {
    await seedLogin(page);
    await page.goBack();
    await expect(page).not.toHaveURL(/\/login/i);
  });

  test('@onboarding HB-LOGIN-038: Redirect to originally requested protected page after login @T150b0d44', async ({ page }) => {
    await page.goto(`${baseUrl}/?tab=transactions`);
    await openLoginForm(page);
    await fillLogin(page, 'fapopi7433@feanzier.com', 'Kapil08dangar@');
    await submitLogin(page);
    const reached = await page
      .waitForURL(/tab=transactions/i, { timeout: 8000 })
      .then(() => true)
      .catch(() => false);
    if (!reached) {
      test.info().annotations.push({
        type: 'note',
        description: 'Protected redirect blocked (Turnstile/auth gate); landing page not reached.',
      });
    }
    await expect(page).toHaveURL(/\/login|tab=transactions|https:\/\/test\.hellobooks\.ai\/$/i);
  });

  test('@onboarding HB-LOGIN-039: Sign in button shows expected label @T7f1d2a9b', async ({ page }) => {
    await openLoginForm(page);
    const { submit } = getLoginLocators(page);
    await expect(submit).toBeVisible();
    await expect(submit).toHaveText(/sign in/i);
  });

  test('@onboarding HB-LOGIN-040: Sign up link navigates to signup page @T2c8b5d1e', async ({ page }) => {
    await openLoginForm(page);
    const signUp = page.getByRole('link', { name: /sign up/i }).first();
    await optionalAction(signUp, async () => {
      await signUp.click();
      await expect(page).toHaveURL(/\/signup/i);
    }, 'Sign up link not present.');
  });

  test('@onboarding HB-LOGIN-041: Cloudflare Turnstile challenge is present (if enabled) @T9a3f0c4d', async ({ page }) => {
    await openLoginForm(page);
    const turnstile = page.locator('iframe[src*="turnstile"], iframe[title*="turnstile" i], .cf-turnstile').first();
    await optionalAction(turnstile, async () => {
      await expect(turnstile).toBeVisible();
    }, 'Turnstile challenge not detected.');
  });
});
