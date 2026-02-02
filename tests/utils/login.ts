import type { Page } from '@playwright/test';

export async function login(page: Page) {
  const baseUrl = 'https://dev.hellobooks.ai';
  
  // Navigate to login page
  await page.goto(`${baseUrl}/login`);
  await page.waitForLoadState('domcontentloaded');
  
  // Fill credentials - UPDATE THESE with valid test account
  await page.fill('input[type="email"], input[name="email"], #email', 'harshpadaliya@merufintech.net');
  await page.fill('input[type="password"], input[name="password"], #password', 'Harsh@12345');
  
  // Click submit
  await page.click('button[type="submit"], button:has-text("Sign in"), button:has-text("Login")');
  
  // Wait for navigation away from login
  await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 30000 });
  await page.waitForLoadState('networkidle');
}
