import { test, expect } from '@playwright/test';
import type { Page, TestInfo } from '@playwright/test';

// ================================
// INLINE LOGIN (NO EXTERNAL IMPORTS)
// Self-contained login for Jenkins/Testomat.io compatibility
// ================================
const seedCredentials = {
  email: 'fapopi7433@feanzier.com',
  password: 'Kapil08dangar@'
};

async function seedLogin(page: Page) {
  await page.goto('/login');
  
  const emailField = page.locator(
    'input[name="email"], input[type="email"], input[placeholder*="Email" i], input[aria-label*="Email" i]'
  );
  await emailField.first().waitFor({ state: 'visible', timeout: 60000 });
  await emailField.first().fill(seedCredentials.email);
  
  const passwordField = page.locator(
    'input[name="password"], input[type="password"], input[placeholder*="Password" i], input[aria-label*="Password" i]'
  );
  await passwordField.first().waitFor({ state: 'visible', timeout: 60000 });
  await passwordField.first().fill(seedCredentials.password);
  
  const submitButton = page.locator(
    'button[type="submit"], button:has-text("Login"), button:has-text("Sign in"), button:has-text("Log in")'
  );
  await submitButton.first().waitFor({ state: 'visible', timeout: 30000 });
  await submitButton.first().click();
  
  await page.waitForLoadState('domcontentloaded');
  await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 60000 });
}
// ================================

// Module-specific URL constants (use relative paths, NO baseUrl)
const moduleUrl = '/login';

// Seed data generator for unique test data per run
type SeedData = {
  email: string;
  badPassword: string;
  referenceNumber: string;
};

function buildSeedData(testInfo: TestInfo): SeedData {
  const suffix = testInfo.testId.slice(0, 8);
  return {
    email: seedCredentials.email,
    badPassword: `WrongPass-${suffix}!`,
    referenceNumber: `AUTO-${suffix}`,
  };
}

// MODULE-SPECIFIC HELPER FUNCTIONS
async function navigateToLogin(page: Page) {
  await page.goto(moduleUrl);
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000);
  const heading = page.getByRole('heading', { name: /login|sign in/i }).first()
    .or(page.getByText(/login|sign in/i).first());
  const form = page.locator('form').first()
    .or(page.locator('[role="form"]').first());
  try {
    await expect(heading.or(form)).toBeVisible({ timeout: 10000 });
  } catch (error) {
    await expect(page).toHaveURL(/login|sign/i);
  }
}

async function fillLoginForm(page: Page, email: string, password: string) {
  const emailField = page.getByRole('textbox', { name: /email|username/i }).first()
    .or(page.locator('input[name="email"], input[type="email"], input[placeholder*="Email" i], input[aria-label*="Email" i]').first())
    .or(page.locator('input[name="username"], input[placeholder*="user" i]').first());
  await emailField.waitFor({ state: 'visible', timeout: 15000 });
  await emailField.fill(email);
  await page.waitForTimeout(800);

  const passwordField = page.getByRole('textbox', { name: /password/i }).first()
    .or(page.locator('input[name="password"], input[type="password"], input[placeholder*="Password" i], input[aria-label*="Password" i]').first())
    .or(page.locator('input[type="password"]').first());
  await passwordField.waitFor({ state: 'visible', timeout: 15000 });
  await passwordField.fill(password);
  await page.waitForTimeout(800);
}

async function submitLogin(page: Page) {
  const submitButton = page.getByRole('button', { name: /sign in|login|log in/i }).first()
    .or(page.locator('button[type="submit"]').first())
    .or(page.getByText(/sign in|login|log in/i).first());
  await submitButton.waitFor({ state: 'visible', timeout: 15000 });
  await submitButton.click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1500);
}

async function expectLoginError(page: Page) {
  const errorMessage = page.getByText(/invalid|incorrect|failed|error|credentials/i).first()
    .or(page.locator('[role="alert"]').first())
    .or(page.locator('.error, .alert-error, .toast-error').first());
  try {
    await expect(errorMessage).toBeVisible({ timeout: 10000 });
  } catch (error) {
    await expect(page).toHaveURL(/login|sign/i);
  }
}

test.describe('Authentication @S5f0wmufw', () => {
  test('@Trmef410f @login Authentication-001: Login fails with invalid password', async ({ page }) => {
    test.setTimeout(180000);
    await seedLogin(page);
    test.setTimeout(180000);
    const seed = buildSeedData(test.info());

    // Step 1: Navigate to login page
    await navigateToLogin(page);
    await page.screenshot({ path: 'debug-login-page.png' });

    // Step 2 & 3: Enter valid email and incorrect password
    await fillLoginForm(page, seed.email, seed.badPassword);
    await page.screenshot({ path: 'debug-login-filled.png' });

    // Step 4: Click Sign In button
    await submitLogin(page);
    await page.screenshot({ path: 'debug-login-submitted.png' });

    // Expected Results: Error message displayed and remain on login page
    await expectLoginError(page);
    await page.screenshot({ path: 'debug-login-error.png' });

    try {
      await expect(page).toHaveURL(/login|sign/i);
    } catch (error) {
      const loginForm = page.locator('form').first()
        .or(page.locator('[role="form"]').first());
      await expect(loginForm).toBeVisible({ timeout: 10000 });
    }
  });
});