import { test, expect } from '@playwright/test';

/**
 * @name Verify Back to Login navigation from Forgot Password page
 * @description Validates that users can navigate back to login page from forgot password
 * @priority low
 * @type e2e
 * @tags auth, forgot-password, navigation, usability
 */

test.describe('Forgot Password Navigation', () => {

    test.beforeEach(async ({ page }) => {
        // Precondition: User is on the Forgot Password page
        // Note: Replace '/forgot-password' with the actual URL path of your application
        await page.goto('/forgot-password');
    });

    test('should navigate back to login page from forgot password @auth @navigation', async ({ page }) => {
        // 1. Locate the 'Back to Login' or 'Cancel' link
        // Using getByRole for accessibility and semantic reliability
        const backToLoginLink = page.getByRole('link', { name: /back to login|cancel/i });

        // Expected Result 1: Back to Login link is visible
        await expect(backToLoginLink).toBeVisible();

        // 2. Click on the link
        await backToLoginLink.click();

        // Expected Result 2: User is redirected to the login page
        // We verify this by checking the URL and the presence of a login-specific element
        await expect(page).toHaveURL(/\/login/);
        
        // Additional assertion to ensure the login form is present
        const loginHeader = page.getByRole('heading', { name: /login|sign in/i });
        await expect(loginHeader).toBeVisible();
    });

});