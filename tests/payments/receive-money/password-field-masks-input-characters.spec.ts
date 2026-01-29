import { test, expect } from '@playwright/test';

/**
 * @name Password field masks input characters
 * @description Verify password field hides characters for security
 * @priority low
 * @type manual
 * @tags login, ui, security, usability
 */

test.describe('Login Security - Password Masking', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is on login page
    // Using a generic path; replace with your actual login URL
    await page.goto('/login');
  });

  test('password field should mask input characters', async ({ page }) => {
    // Step 1: Locate the password field using semantic selectors
    const passwordInput = page.getByLabel(/password/i).first() || page.getByPlaceholder(/password/i);
    
    // Step 2: Click on Password field and Type password characters
    const testPassword = 'SecretPassword123';
    await passwordInput.click();
    await passwordInput.fill(testPassword);

    // Expected Result 1: Characters displayed as dots or asterisks
    // In web standards, <input type="password"> handles masking automatically.
    // We verify the 'type' attribute is 'password'.
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Expected Result 2: Actual password not visible in the DOM text content
    // Ensure the typed text is not leaked into the element's inner text or label
    const pageContent = await page.textContent('body');
    expect(pageContent).not.toContain(testPassword);

    // Additional verification: Computed style check (optional but robust)
    // Browsers use -webkit-text-security or internal masking for type="password"
    const isMasked = await passwordInput.evaluate((el: HTMLInputElement) => {
      return window.getComputedStyle(el).webkitTextSecurity === 'disc' || 
             el.type === 'password';
    });
    expect(isMasked).toBe(true);
  });

});