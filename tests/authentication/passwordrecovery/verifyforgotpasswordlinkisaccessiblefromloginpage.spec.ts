import { test, expect } from '@playwright/test';

/**
 * @name Verify Forgot Password link is accessible from login page
 * @description Validates that users can access the forgot password functionality from the login page
 * @priority high
 * @type e2e
 * @tags auth, forgot-password, navigation, login
 */

test.describe('Authentication - Forgot Password Flow', () => {

    test.beforeEach(async ({ page }) => {
        // Precondition: User is on the login page and not logged in
        // Note: Replace '/' with the actual login route if different
        await page.goto('/login');
    });

    test('Verify Forgot Password link is accessible from login page @auth @forgot-password @navigation @login', async ({ page }) => {
        // Expected Result 1: Login page loads successfully
        // We verify this by checking the URL or a unique page heading
        await expect(page).toHaveURL(/.*login/);
        
        // Step 2: Locate the 'Forgot Password' link
        // Using getByRole for accessibility and semantic reliability
        const forgotPasswordLink = page.getByRole('link', { name: /forgot password/i });

        // Expected Result 2: Forgot Password link is visible and clickable
        await expect(forgotPasswordLink).toBeVisible();
        await expect(forgotPasswordLink).toBeEnabled();

        // Step 3: Click on the 'Forgot Password' link
        await forgotPasswordLink.click();

        // Expected Result 3: User is redirected to the Forgot Password page
        // We verify the URL change and the presence of a unique element on the target page
        await expect(page).toHaveURL(/.*forgot-password/);
        
        // Optional: Verify header on the new page to confirm successful navigation
        const forgotPasswordHeading = page.getByRole('heading', { name: /forgot password/i });
        await expect(forgotPasswordHeading).toBeVisible();
    });

});