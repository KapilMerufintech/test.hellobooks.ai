import { test, expect } from '@playwright/test';

/**
 * Test ID: TEST-1769767446216
 * Name: Send valid invitation to new user
 * Description: Verifies that an admin can successfully send an invitation email to a new user with valid email address
 */

test.describe('User Management - Invitations', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is logged in as admin
    // In a real scenario, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Email').fill(process.env.ADMIN_EMAIL || 'admin@example.com');
    await page.getByLabel('Password').fill(process.env.ADMIN_PASSWORD || 'password123');
    await page.getByRole('button', { name: /log in/i }).click();
    
    // Ensure organization context is set
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('Send valid invitation to new user', {
    annotation: [
      { type: 'test_id', description: 'TEST-1769767446216' },
      { type: 'priority', description: 'high' },
      { type: 'type', description: 'e2e' },
      { type: 'tag', description: 'invitation' },
      { type: 'tag', description: 'user-management' },
      { type: 'tag', description: 'email' },
      { type: 'tag', description: 'onboarding' }
    ]
  }, async ({ page }) => {
    const testEmail = `newuser_${Date.now()}@example.com`;

    // 1. Navigate to User Management or Settings section
    await page.getByRole('link', { name: /settings|user management/i }).click();
    await page.getByRole('tab', { name: /users/i }).click();

    // 2. Click on Send Invitation or Invite User button
    const inviteButton = page.getByRole('button', { name: /invite user|send invitation/i });
    await inviteButton.click();

    // Expected Result: Send Invitation form opens successfully
    const modalTitle = page.getByRole('heading', { name: /invite/i });
    await expect(modalTitle).toBeVisible();

    // 3. Enter a valid email address in the email field
    const emailInput = page.getByLabel(/email/i);
    await emailInput.fill(testEmail);
    
    // Expected Result: Email field accepts valid email format
    await expect(emailInput).toHaveValue(testEmail);

    // 4. Select user role or permissions if applicable
    // Expected Result: Role selection is available and functional
    const roleDropdown = page.getByLabel(/role|permission/i);
    await expect(roleDropdown).toBeVisible();
    await roleDropdown.selectOption({ label: 'Editor' });

    // 5. Click Send Invitation button
    await page.getByRole('button', { name: /send invitation|invite/i }).click();

    // 6. Verify success message is displayed
    // Expected Result: Success notification confirms invitation sent
    const successMessage = page.getByText(/invitation sent successfully|invited/i);
    await expect(successMessage).toBeVisible();

    // Expected Result: Invitation appears in pending invitations list
    // Navigate to pending tab if necessary
    const pendingTab = page.getByRole('tab', { name: /pending/i });
    if (await pendingTab.isVisible()) {
      await pendingTab.click();
    }
    
    await expect(page.getByText(testEmail)).toBeVisible();
  });
});