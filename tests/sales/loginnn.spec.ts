import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

// ✅ USE SEED FILE (Works with Jenkins/Testomat.io)
import { seedLogin, seedCredentials, buildSeedData } from '../seed.spec';

async function navigateToLogin(page: Page) {
  await page.goto('/login');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000);
}

async function expectLoggedIn(page: Page) {
  // Verify we're not on login page
  await expect(page).not.toHaveURL(/\/login/);
  
  // Look for user menu or dashboard elements
  const userMenu = page.locator('[class*="user"], [data-testid*="user"], button[aria-label*="user" i]').first();
  const dashboard = page.locator('text=/overview|dashboard|home/i').first();
  
  const isLoggedIn = userMenu.or(dashboard);
  await expect(isLoggedIn).toBeVisible({ timeout: 15000 });
}

test.describe('@login Login Tests', () => {
  test('@T7lejl8ih @login AUTH-001: Successful login with valid credentials', async ({ page }) => {
    test.setTimeout(180000);
    const seed = buildSeedData(test.info());

    await navigateToLogin(page);
    await page.screenshot({ path: 'debug-login-page-loaded.png' });

    const emailField = page.getByLabel(/email/i).first()
      .or(page.locator('input[name="email"], input[type="email"]')).first()
      .or(page.locator('input[placeholder*="email" i], input[aria-label*="email" i]')).first();
    const passwordField = page.getByLabel(/password/i).first()
      .or(page.locator('input[name="password"], input[type="password"]')).first()
      .or(page.locator('input[placeholder*="password" i], input[aria-label*="password" i]')).first();

    await emailField.waitFor({ state: 'visible', timeout: 15000 });
    await passwordField.waitFor({ state: 'visible', timeout: 15000 });
    await expect(emailField).toBeVisible({ timeout: 10000 });
    await expect(passwordField).toBeVisible({ timeout: 10000 });

    await emailField.fill(seedCredentials.email);
    await page.waitForTimeout(800);
    await expect(emailField).toHaveValue(seedCredentials.email);

    await passwordField.fill(seedCredentials.password);
    await page.waitForTimeout(800);
    await expect(passwordField).toHaveValue(seedCredentials.password);
    await expect(passwordField).toHaveAttribute('type', /password/i);

    await page.screenshot({ path: 'debug-login-credentials-filled.png' });

    const signInButton = page.locator('button[type="submit"]').first();
    await signInButton.waitFor({ state: 'visible', timeout: 15000 });
    await signInButton.click();

    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'debug-after-login-click.png' });

    await expectLoggedIn(page);
    await page.screenshot({ path: 'debug-login-success.png' });

    // Use seed data for reference (ensures buildSeedData usage)
    await expect(seed.reference).toContain('AUTO-');
  });
});