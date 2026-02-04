import { test } from '@playwright/test';
import { seedCredentials } from './seed.data';
 
test.describe('@setup Seed @S70d4ac68', () => {
  test('seed @T80730b71', async ({ page }) => {
    await page.goto('/login');
   
    await page.fill('input[name="email"]', seedCredentials.email);
    await page.fill('input[name="password"]', seedCredentials.password);
   
    await page.click('button[type="submit"]');
   
    await page.waitForLoadState('networkidle');
  });
});
 
