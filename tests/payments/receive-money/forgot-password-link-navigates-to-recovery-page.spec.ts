import { test, expect } from '@playwright/test';

/**
 * @name Forgot Password link navigates to recovery page
 * @description Verify Forgot Password link redirects to password recovery flow
 * @priority medium
 * @tags login, forgot-password, navigation
 */

test.describe('Login Flow - Forgot Password', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is on login page
    // Note: Replace '/' with the actual login URL if different
    await page.goto('/login');
  });

  test('Forgot Password link navigates to recovery page @login @forgot-password @navigation', async ({ page }) => {
    // Step 1: Click Forgot Password link
    // Using getByRole for accessibility and reliability
    const forgotPasswordLink = page.getByRole('link', { name: /forgot password/i });
    await forgotPasswordLink.click();

    // Expected Result 1: User redirected to password recovery page
    // We verify the URL contains 'recovery' or 'forgot-password'
    await expect(page).toHaveURL(/.*recovery|forgot-password/);

    // Expected Result 2: Email input field displayed
    // Using getByRole to find the email textbox
    const emailInput = page.getByRole('textbox', { name: /email/i });
    await expect(emailInput).toBeVisible();
    
    // Additional assertion to ensure it's the correct input type
    await expect(emailInput).toHaveAttribute('type', 'email');
  });

});