/**
 * 🌱 SEED FILE - Use in ALL test files
 * Import: import { seedLogin } from '../seed.spec';
 */

import type { Page, TestInfo } from '@playwright/test';

// ================================
// 🔐 CREDENTIALS
// ================================
export const seedCredentials = {
  email: 'fapopi7433@feanzier.com',
  password: 'Kapil08dangar@',
  baseUrl: 'https://test.hellobooks.ai'
};

// ================================
// 🚀 LOGIN FUNCTION (Use this in all tests)
// ================================
export async function seedLogin(page: Page) {
  await page.goto('https://test.hellobooks.ai/login');
  await page.waitForLoadState('domcontentloaded');
  
  // Wait for email field and fill
  const emailField = page.locator('input[name="email"], input[type="email"]').first();
  await emailField.waitFor({ state: 'visible', timeout: 60000 });
  await emailField.fill(seedCredentials.email);
  
  // Wait for password field and fill
  const passwordField = page.locator('input[name="password"], input[type="password"]').first();
  await passwordField.waitFor({ state: 'visible', timeout: 60000 });
  await passwordField.fill(seedCredentials.password);
  
  // Wait for submit button and click
  const submitButton = page.locator('button[type="submit"]').first();
  await submitButton.waitFor({ state: 'visible', timeout: 30000 });
  await submitButton.click();
  
  // Wait for login to complete
  await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 60000 });
  await page.waitForLoadState('domcontentloaded');
}

// ================================
// 📊 SEED DATA GENERATOR
// ================================
export type SeedData = {
  customerName: string;
  customerEmail: string;
  invoiceNumber: string;
  reference: string;
  timestamp: string;
};

export function buildSeedData(testInfo: TestInfo): SeedData {
  const suffix = testInfo.testId.slice(0, 8);
  const timestamp = Date.now().toString().slice(-6);
  
  return {
    customerName: `AutoCustomer-${suffix}`,
    customerEmail: `auto-${suffix}@test.local`,
    invoiceNumber: `INV-${suffix}-${timestamp}`,
    reference: `AUTO-${suffix}`,
    timestamp: timestamp
  };
}

// ================================
// 🧭 NAVIGATION HELPERS
// ================================
export async function navigateToInvoices(page: Page) {
  await page.goto('https://test.hellobooks.ai/?tab=invoices');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000);
}

export async function navigateToQuotes(page: Page) {
  await page.goto('https://test.hellobooks.ai/?tab=quotes');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000);
}

export async function navigateToCustomers(page: Page) {
  await page.goto('https://test.hellobooks.ai/?tab=customers');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000);
}

// ================================
// ⏱️ WAIT HELPERS
// ================================
export async function waitForPageReady(page: Page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(500);
}

export async function waitForToast(page: Page, pattern: RegExp, timeout = 10000) {
  try {
    const toast = page.locator('[role="status"], .toast, .sonner-toast, [data-sonner-toast]')
      .filter({ hasText: pattern })
      .first();
    await toast.waitFor({ state: 'visible', timeout });
    return true;
  } catch {
    return false;
  }
}
