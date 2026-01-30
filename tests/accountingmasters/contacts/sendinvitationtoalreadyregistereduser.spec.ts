import { test, expect } from '@playwright/test';

/**
 * Test ID: TEST-1769767459790
 * Name: Send invitation to already registered user
 * Description: Verifies that the system prevents sending invitation to an email that is already registered
 */

test('Send invitation to already registered user', {
  annotation: [
    { type: 'test_id', description: 'TEST-1769767459790' },
    { type: 'priority', description: 'medium' },
    { type: 'tag', description: 'invitation' },
    { type: 'tag', description: 'duplicate-check' },
    { type: 'tag', description: 'negative-test' }
  ]
}, async ({ page }) => {
  const existingUserEmail = 'existing.user@example.com';

  // Precondition: User is logged in as admin
  // Note: Assuming authentication state is handled via global setup or a login helper
  await page.goto('/admin/dashboard');

  // Step 1: Navigate to Send Invitation form
  // Using semantic selectors to find the navigation link/button
  await page.getByRole('link', { name: /invite user|send invitation/i }).click();
  await expect(page).toHaveURL(/.*invite/);

  // Step 2: Enter email address of an existing user
  // Using getByLabel or getByPlaceholder for form interaction
  const emailInput = page.getByRole('textbox', { name: /email/i });
  await emailInput.fill(existingUserEmail);

  // Step 3: Click Send Invitation button
  const sendButton = page.getByRole('button', { name: /send invitation|invite/i });
  await sendButton.click();

  // Step 4: Verify duplicate user error is displayed
  // Expected Result 1 & 2: System checks for existing users and shows error
  const errorMessage = page.getByText(/user already exists|email is already registered/i);
  await expect(errorMessage).toBeVisible();
  
  // Expected Result 3: Invitation is not sent (Verify we are still on the same page or success message is absent)
  const successMessage = page.getByText(/invitation sent successfully/i);
  await expect(successMessage).not.toBeVisible();

  // Expected Result 4: Appropriate guidance is provided to admin
  // Checking for helpful text like "Please use a different email" or "Manage existing user"
  const guidanceText = page.getByText(/please use a different email|already a member/i);
  await expect(guidanceText).toBeVisible();
});