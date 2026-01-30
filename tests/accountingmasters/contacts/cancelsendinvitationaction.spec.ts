import { test, expect } from '@playwright/test';

/**
 * Test ID: TEST-1769767473285
 * Name: Cancel send invitation action
 * Description: Verifies that user can cancel the invitation process without sending
 */

test.describe('Invitation Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in as admin
    // Note: In a real scenario, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('admin-password');
    await page.getByRole('button', { name: 'Login' }).click();

    // Precondition 2: User has navigated to Send Invitation form
    await page.goto('/admin/invitations');
    await page.getByRole('button', { name: 'Send Invitation' }).click();
    
    // Ensure the form is visible before proceeding
    await expect(page.getByRole('heading', { name: 'Invite User' })).toBeVisible();
  });

  test('Cancel send invitation action', {
    annotation: [
      { type: 'test_id', description: 'TEST-1769767473285' },
      { type: 'priority', description: 'medium' },
      { type: 'tag', description: 'invitation' },
      { type: 'tag', description: 'cancel' },
      { type: 'tag', description: 'user-flow' }
    ]
  }, async ({ page }) => {
    
    // 1. Enter valid email in the invitation form
    const emailInput = page.getByLabel('Email');
    await emailInput.fill('test-cancel@example.com');

    // 2. Click Cancel or Close button
    // Expected Result 1: Cancel button is visible and clickable
    const cancelButton = page.getByRole('button', { name: /cancel|close/i });
    await expect(cancelButton).toBeVisible();
    await expect(cancelButton).toBeEnabled();
    await cancelButton.click();

    // 3. Verify form is closed without sending invitation
    // Expected Result 2: Form closes without sending invitation
    await expect(page.getByRole('heading', { name: 'Invite User' })).not.toBeVisible();

    // 4. Verify no invitation was created
    // Expected Result 3: No success or error notification appears
    const toastNotification = page.locator('.notification, .toast, [role="alert"]');
    await expect(toastNotification).not.toBeVisible();

    // Expected Result 4: User returns to previous screen (the invitation list)
    await expect(page).toHaveURL(/\/admin\/invitations/);
    
    // Verify the email entered is not in the list of invitations
    const invitationList = page.locator('table, .list-container');
    await expect(invitationList).not.toContainText('test-cancel@example.com');
  });

});