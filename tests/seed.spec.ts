import { test } from '@playwright/test'; 
 
test.describe('@setup Seed @S70D4AC68', () => {
  test('seed @T80730B71', async ({ page }) => { 
    await page.goto('https://test.hellobooks.ai/login'); 
   
    await page.fill('input[name="email"]', 'fapopi7433@feanzier.com'); 
    await page.fill('input[name="password"]', 'Kapil08dangar@'); 
   
    await page.click('button[type="submit"]'); 
   
    await page.waitForLoadState('networkidle'); 
  }); 
});
 
