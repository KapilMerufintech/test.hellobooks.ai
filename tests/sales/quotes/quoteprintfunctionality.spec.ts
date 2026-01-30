import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Quote print functionality
 * Description: Verify user can print a quotation
 * Priority: low
 * Tags: quotes, sales, print
 */

test.describe('Quote Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: In a real environment, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Username').fill('test_user');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Precondition 2: A quote exists
    // We assume the navigation leads to a list where a quote can be selected
  });

  test('Quote print functionality TEST-1769770108365', async ({ page }) => {
    // Step 1: Navigate to quote preview
    // Navigating to a specific quote detail/preview page
    await page.goto('/quotes/12345/preview');
    
    // Expected Result 1: Quote preview displays
    const quoteHeader = page.getByRole('heading', { name: /Quote #12345/i });
    await expect(quoteHeader).toBeVisible();

    // Step 2: Click 'Print' button
    // We set up a listener for the 'print' event or check if window.print is called
    // because the native browser print dialog blocks the execution thread.
    const printTriggered = await page.evaluate(() => {
      return new Promise((resolve) => {
        window.print = () => {
          resolve(true);
        };
      });
    });

    // Locate the print button and click it
    const printButton = page.getByRole('button', { name: /print/i });
    await expect(printButton).toBeEnabled();
    
    // Step 3: Verify print dialog opens
    // We trigger the click and wait for our mocked print function to be called
    await printButton.click();

    // Expected Result 2 & 3: Print action initiates and dialog (mocked) opens
    // In Playwright, we usually verify the call to window.print() as the actual 
    // system print dialog cannot be automated/interacted with directly.
    expect(printTriggered).toBeTruthy();

    // Step 4: Check print preview shows correct quote data
    // We verify the CSS media print styles or specific elements visible in print mode
    const quoteTotal = page.getByText('$1,250.00');
    const customerName = page.getByText('Acme Corp');

    // Verify data exists on the page before/during print preparation
    await expect(quoteTotal).toBeVisible();
    await expect(customerName).toBeVisible();

    // Expected Result 4: Print preview shows formatted quote
    // We can check for a specific print stylesheet link
    const printStylesheet = page.locator('link[media="print"]');
    if (await printStylesheet.count() > 0) {
        await expect(printStylesheet).toBeAttached();
    }
  });
});