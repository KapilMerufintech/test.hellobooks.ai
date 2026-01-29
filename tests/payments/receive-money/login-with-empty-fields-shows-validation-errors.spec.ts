import { test, expect } from '@playwright/test';

/**
 * @name Login with empty fields shows validation errors
 * @description Verify validation messages appear when submitting empty form
 * @priority high
 * @type e2e
 * @tags login, negative, validation, edge-case
 */

test.describe('Login Validation Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is on login page
    // Note: Replace '/' with the actual login URL if different
    await page.goto('/login');
  });

  test('Login with empty fields shows validation errors', async ({ page }) => {
    // Step 1 & 2: Leave Email and Password fields empty
    // We explicitly clear them to ensure they are empty regardless of browser autofill
    await page.getByLabel(/email/i).clear();
    await page.getByLabel(/password/i).clear();

    // Step 3: Click Login button
    // Using getByRole for semantic accessibility-based selection
    await page.getByRole('button', { name: /log in|sign in|submit/i }).click();

    // Expected Result 1: Form submission blocked / Validation messages displayed
    // We verify that the URL hasn't changed to a dashboard/home page
    await expect(page).not.toHaveURL(/.*dashboard/);

    // Expected Result 2: Required field errors displayed for both fields
    // Checking for common validation message patterns (HTML5 or custom)
    
    // Check Email validation error
    const emailError = page.getByText(/email is required|please enter your email/i);
    await expect(emailError).toBeVisible();

    // Check Password validation error
    const passwordError = page.getByText(/password is required|please enter your password/i);
    await expect(passwordError).toBeVisible();

    // Alternative: If using HTML5 validation, we can check for the 'required' attribute
    await expect(page.getByLabel(/email/i)).toHaveAttribute('required', '');
    await expect(page.getByLabel(/password/i)).toHaveAttribute('required', '');
  });

});