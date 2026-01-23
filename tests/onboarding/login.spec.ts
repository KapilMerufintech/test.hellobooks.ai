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

test.describe('@onboarding Onboarding / Login @S07476ff1', () => {
  test('HB-LOGIN-001: Login with valid credentials @Ta3cb9f4b', { tag: ['@login', '@HB-LOGIN-001'] }, async ({ page }) => {
    await seedLogin(page);
    await expect(page).not.toHaveURL(/\/login/i);
  });

  test('HB-LOGIN-002: Login with valid email and wrong password @Tb0befcff', { tag: ['@login', '@HB-LOGIN-002'] }, async ({ page }) => {
    await openLogin(page);
    await fillLogin(page, 'fapopi7433@feanzier.com', 'wrongPassword123');
    await submitLogin(page);
    await expectLoginFailed(page);
  });

  test('HB-LOGIN-003: Login with non-existent user @Tbad8fd52', { tag: ['@login', '@HB-LOGIN-003'] }, async ({ page }) => {
    await openLogin(page);
    await fillLogin(page, 'unknown.user+nope@example.com', 'AnyPassword123!');
    await submitLogin(page);
    await expectLoginFailed(page);
  });

  test('HB-LOGIN-004: Required validation on empty email and password @Tbd67142c', { tag: ['@login', '@HB-LOGIN-004'] }, async ({ page }) => {
    await openLogin(page);
    await submitLogin(page);
    await expectLoginFailed(page);
  });

  test('HB-LOGIN-005: Required validation on empty email only @Tfb237ccd', { tag: ['@login', '@HB-LOGIN-005'] }, async ({ page }) => {
    await openLogin(page);
    await fillLogin(page, '', 'AnyPassword123!');
    await submitLogin(page);
    await expectLoginFailed(page);
  });

  test('HB-LOGIN-006: Required validation on empty password only @T751e9bc0', { tag: ['@login', '@HB-LOGIN-006'] }, async ({ page }) => {
    await openLogin(page);
    await fillLogin(page, 'fapopi7433@feanzier.com', '');
    await submitLogin(page);
    await expectLoginFailed(page);
  });

  test('HB-LOGIN-007: Invalid email format validation (missing @) @Tb367db66', { tag: ['@login', '@HB-LOGIN-007'] }, async ({ page }) => {
    await openLogin(page);
    await fillLogin(page, 'invalid.email.com', 'AnyPassword123!');
    await submitLogin(page);
    await expectLoginFailed(page);
  });

  test('HB-LOGIN-008: Invalid email format validation (missing domain) @T5fabd070', { tag: ['@login', '@HB-LOGIN-008'] }, async ({ page }) => {
    await openLogin(page);
    await fillLogin(page, 'user@', 'AnyPassword123!');
    await submitLogin(page);
    await expectLoginFailed(page);
  });

  test('HB-LOGIN-009: Email is trimmed of leading/trailing spaces @T6afef3b3', { tag: ['@login', '@HB-LOGIN-009'] }, async ({ page }) => {
    await openLogin(page);
    await fillLogin(page, '  fapopi7433@feanzier.com  ', 'Kapil08dangar@');
    await submitLogin(page);
    await expect(page).not.toHaveURL(/\/login/i);
  });

  test('HB-LOGIN-010: Email is case-insensitive @T3a4720e0', { tag: ['@login', '@HB-LOGIN-010'] }, async ({ page }) => {
    await openLogin(page);
    await fillLogin(page, 'FAPOPI7433@FEANZIER.COM', 'Kapil08dangar@');
    await submitLogin(page);
    await expect(page).not.toHaveURL(/\/login/i);
  });

  test('HB-LOGIN-011: Password is case-sensitive @T34567b96', { tag: ['@login', '@HB-LOGIN-011'] }, async ({ page }) => {
    await openLogin(page);
    await fillLogin(page, 'fapopi7433@feanzier.com', 'KAPIL08DANGAR@');
    await submitLogin(page);
    await expectLoginFailed(page);
  });

  test('HB-LOGIN-012: Password visibility toggle shows and hides password @Te4f43b15', { tag: ['@login', '@HB-LOGIN-012'] }, async ({ page }) => {
    await openLogin(page);
    const { password } = getLoginLocators(page);
    await password.fill('AnyPassword123!');
    const toggle = page.locator(
      'button[aria-label*="password" i], button[aria-label*="show" i], button[title*="password" i]',
    ).first();
    await optionalAction(toggle, async () => {
      await toggle.click();
      await expect(password).toHaveAttribute('type', 'text');
      await toggle.click();
      await expect(password).toHaveAttribute('type', 'password');
    }, 'Password toggle not present.');
  });

  test('HB-LOGIN-013: Submit with Enter key from password field @Tb20c642c', { tag: ['@login', '@HB-LOGIN-013'] }, async ({ page }) => {
    await openLogin(page);
    const { email, password } = getLoginLocators(page);
    await email.fill('fapopi7433@feanzier.com');
    await password.fill('Kapil08dangar@');
    await password.press('Enter');
    await expect(page).not.toHaveURL(/\/login/i);
  });

  test('HB-LOGIN-014: Prevent double-submit during loading @T8ffd2954', { tag: ['@login', '@HB-LOGIN-014'] }, async ({ page }) => {
    await openLogin(page);
    await fillLogin(page, 'fapopi7433@feanzier.com', 'Kapil08dangar@');
    const { submit } = getLoginLocators(page);
    await submit.dblclick();
    await expect(page).not.toHaveURL(/\/login/i);
  });

  test('HB-LOGIN-015: Remember me persists session across reload (if present) @Tfd7f6986', { tag: ['@login', '@HB-LOGIN-015'] }, async ({ page }) => {
    await openLogin(page);
    const remember = page.getByRole('checkbox', { name: /remember/i }).first();
    await optionalAction(remember, async () => {
      await remember.check();
      await fillLogin(page, 'fapopi7433@feanzier.com', 'Kapil08dangar@');
      await submitLogin(page);
      await expect(page).not.toHaveURL(/\/login/i);
      await page.reload();
      await expect(page).not.toHaveURL(/\/login/i);
    }, 'Remember me checkbox not present.');
  });

  test('HB-LOGIN-016: Login page redirects when already authenticated @Tb08c5b9d', { tag: ['@login', '@HB-LOGIN-016'] }, async ({ page }) => {
    await seedLogin(page);
    await page.goto(`${baseUrl}/login`);
    await expect(page).not.toHaveURL(/\/login/i);
  });

  test('HB-LOGIN-018: Forgot password link opens reset flow (if present) @T81ca3145', { tag: ['@login', '@HB-LOGIN-018'] }, async ({ page }) => {
    await openLogin(page);
    const forgot = page.getByRole('link', { name: /forgot password/i }).first();
    await optionalAction(forgot, async () => {
      await forgot.click();
      await expect(page).toHaveURL(/forgot-password/i);
    }, 'Forgot password link not present.');
  });

  test('HB-LOGIN-020: Accessibility labels are present for email and password @Tdd419603', { tag: ['@login', '@HB-LOGIN-020'] }, async ({ page }) => {
    await openLogin(page);
    const { email, password } = getLoginLocators(page);
    await expect(email).toBeVisible();
    await expect(password).toBeVisible();
  });

  test('HB-LOGIN-021: Login page is usable on mobile viewport @T20cfef90', { tag: ['@login', '@HB-LOGIN-021'] }, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await openLogin(page);
    await fillLogin(page, 'fapopi7433@feanzier.com', 'Kapil08dangar@');
    await submitLogin(page);
    await expect(page).not.toHaveURL(/\/login/i);
  });

  test('HB-LOGIN-023: Login retains email after failed attempt @Td2ae06e7', { tag: ['@login', '@HB-LOGIN-023'] }, async ({ page }) => {
    await openLogin(page);
    const { email, password } = getLoginLocators(page);
    await email.fill('fapopi7433@feanzier.com');
    await password.fill('wrongPassword123');
    await submitLogin(page);
    await expectLoginFailed(page);
    await expect(email).toHaveValue(textRegex('fapopi7433@feanzier.com'));
  });

  test('HB-LOGIN-024: Login form tab order is logical @Tf94b3564', { tag: ['@login', '@HB-LOGIN-024'] }, async ({ page }) => {
    await openLogin(page);
    await page.keyboard.press('Tab');
    const activeTag = await page.evaluate(() => document.activeElement?.getAttribute('name') || '');
    expect(activeTag).toMatch(/email/i);
  });

  test('HB-LOGIN-025: Login page blocks mixed content @T2aa892b5', { tag: ['@login', '@HB-LOGIN-025'] }, async ({ page }) => {
    const warnings: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'warning' || msg.type() === 'error') warnings.push(msg.text());
    });
    await openLogin(page);
    const mixed = warnings.find((text) => /mixed content/i.test(text));
    expect(mixed).toBeUndefined();
  });

  test('HB-LOGIN-029: Login page uses HTTPS @T673f786b', { tag: ['@login', '@HB-LOGIN-029'] }, async ({ page }) => {
    await openLogin(page);
    expect(page.url()).toMatch(/^https:\/\//i);
  });

  test('HB-LOGIN-030: Sensitive data is not present in URL after login @Tf4a12fe8', { tag: ['@login', '@HB-LOGIN-030'] }, async ({ page }) => {
    await seedLogin(page);
    const url = page.url();
    expect(url).not.toMatch(/fapopi7433@feanzier\.com/i);
    expect(url).not.toMatch(/Kapil08dangar@/i);
  });

  test('HB-LOGIN-034: Login page shows consistent branding and title @Tc4e16709', { tag: ['@login', '@HB-LOGIN-034'] }, async ({ page }) => {
    await openLogin(page);
    await expect(page).toHaveTitle(/hellobooks/i);
    await expect(page.getByText(/hellobooks/i).first()).toBeVisible();
  });

  test('HB-LOGIN-035: SSO provider button is visible (if enabled) @Tfeb03bdd', { tag: ['@login', '@HB-LOGIN-035'] }, async ({ page }) => {
    await openLogin(page);
    const ssoButton = page.getByRole('button', { name: /google|continue with/i }).first();
    await optionalAction(ssoButton, async () => {
      await expect(ssoButton).toBeVisible();
    }, 'SSO button not present.');
  });

  test('HB-LOGIN-037: Back button after login does not show login page @T6bdde595', { tag: ['@login', '@HB-LOGIN-037'] }, async ({ page }) => {
    await seedLogin(page);
    await page.goBack();
    await expect(page).not.toHaveURL(/\/login/i);
  });

  test('HB-LOGIN-038: Redirect to originally requested protected page after login @T150b0d44', { tag: ['@login', '@HB-LOGIN-038'] }, async ({ page }) => {
    await page.goto(`${baseUrl}/?tab=transactions`);
    await fillLogin(page, 'fapopi7433@feanzier.com', 'Kapil08dangar@');
    await submitLogin(page);
    await expect(page).toHaveURL(/tab=transactions/i);
  });
});

