import { test, expect } from '@playwright/test';

/**
 * Test ID: TEST-1769767454296
 * Name: Send invitation with invalid email format
 * Description: Verifies that the system validates email format and shows appropriate error for invalid emails
 */

test('Send invitation with invalid email format', {
  annotation: [
    { type: 'test_id', description: 'TEST-1769767454296' },
    { type: 'priority', description: 'high' },
    { type: 'tag', description: 'invitation' },
    { type: 'tag', description: 'validation' },
    { type: 'tag', description: 'negative-test' },
    { type: 'tag', description: 'email' }
  ]
}, async ({ page }) => {
  
  // Precondition: User is logged in as admin
  // Note: Assuming authentication state is handled via global setup or storageState
  // If not, login logic would be placed here or in a beforeEach hook
  
  // Step 1: Navigate to Send Invitation form
  await page.goto('/admin/invitations/new');
  
  // Step 2: Enter an invalid email format
  const emailInput = page.getByRole('textbox', { name: /email/i });
  await emailInput.fill('invalid-email');

  // Step 3: Click Send Invitation button
  const sendButton = page.getByRole('button', { name: /send invitation/i });
  await sendButton.click();

  // Step 4: Verify validation error is displayed
  // We check for common validation patterns: HTML5 validation or UI-based error messages
  const errorMessage = page.getByText(/invalid email format|enter a valid email/i);
  await expect(errorMessage).toBeVisible();

  // Expected Result 1 & 2: Form validates and error message indicates invalid format
  // (Verified by the assertion above)

  // Expected Result 3: Invitation is not sent
  // We verify we haven't navigated to a success page or seen a success toast
  await expect(page.getByText(/invitation sent successfully/i)).not.toBeVisible();

  // Expected Result 4: User remains on the invitation form
  // Verify the URL or the presence of the form elements
  await expect(page).toHaveURL(/\/admin\/invitations\/new/);
  await expect(emailInput).toHaveValue('invalid-email');
});