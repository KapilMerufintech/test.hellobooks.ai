import { test, expect } from '@playwright/test';

/**
 * @name Successful login with valid credentials
 * @priority high
 * @type e2e
 * @tags login, positive, authentication, smoke
 */

test.describe('Authentication Tests', () => {
  
  // Preconditions: User account exists and user is on login page
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page
    await page.goto('/login');
  });

  test('Successful login with valid credentials @login @smoke', async ({ page }) => {
    // Test Data (Ideally sourced from environment variables or config)
    const validEmail = process.env.USER_EMAIL || 'user@example.com';
    const validPassword = process.env.USER_PASSWORD || 'Password123!';

    // Step 1: Enter valid email in Email field
    // Using getByLabel for accessibility and semantic reliability
    await page.getByLabel(/email/i).fill(validEmail);

    // Step 2: Enter valid password in Password field
    await page.getByLabel(/password/i).fill(validPassword);

    // Step 3: Click Login button
    // Using getByRole to ensure we are interacting with a button element
    await page.getByRole('button', { name: /log in|login/i }).click();

    // Expected Result 1: User is redirected to dashboard
    // We check that the URL contains 'dashboard'
    await expect(page).toHaveURL(/.*dashboard/);

    // Expected Result 2: Session is created
    // We verify this by checking for a logout button or a specific session-based element
    await expect(page.getByRole('button', { name: /logout/i })).toBeVisible();

    // Expected Result 3: Welcome message displayed
    // Using getByText with a regex to find the welcome message
    const welcomeMessage = page.getByText(/welcome back|welcome to your dashboard/i);
    await expect(welcomeMessage).toBeVisible();
    
    // Additional assertion to verify the specific user context if available
    // await expect(page.getByText(validEmail)).toBeVisible();
  });

});