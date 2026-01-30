import { test, expect } from '@playwright/test';

/**
 * Test ID: TEST-1769767465345
 * Name: Send invitation with empty email field
 * Description: Verifies that the system requires email field to be filled before sending invitation
 */

test('Send invitation with empty email field', {
  annotation: [
    { type: 'test_id', description: 'TEST-1769767465345' },
    { type: 'priority', description: 'high' },
    { type: 'tag', description: 'invitation' },
    { type: 'tag', description: 'validation' },
    { type: 'tag', description: 'required-field' },
    { type: 'tag', description: 'negative-test' }
  ]
}, async ({ page }) => {
  
  // Precondition: User is logged in as admin
  // Note: In a real-world scenario, this would likely be handled in a global setup or beforeEach
  await test.step('Login as admin', async () => {
    await page.goto('/login');
    await page.getByLabel('Username').fill(process.env.ADMIN_USERNAME || 'admin');
    await page.getByLabel('Password').fill(process.env.ADMIN_PASSWORD || 'password');
    await page.getByRole('button', { name: /log in/i }).click();
    await expect(page).toHaveURL(/dashboard|home/);
  });

  // Step 1: Navigate to Send Invitation form
  await test.step('Navigate to Send Invitation form', async () => {
    // Assuming navigation via a sidebar or menu
    await page.getByRole('link', { name: /invitations/i }).click();
    await page.getByRole('button', { name: /send invitation/i }).click();
    await expect(page.getByRole('heading', { name: /send invitation/i })).toBeVisible();
  });

  // Step 2: Leave email field empty
  await test.step('Leave email field empty', async () => {
    const emailInput = page.getByLabel(/email/i);
    await emailInput.clear();
    await expect(emailInput).toHaveValue('');
  });

  // Step 3: Click Send Invitation button
  await test.step('Click Send Invitation button', async () => {
    // We use a locator that targets the submit action
    const sendButton = page.getByRole('button', { name: /send/i });
    await sendButton.click();
  });

  // Step 4: Verify required field error is displayed
  await test.step('Verify validation errors', async () => {
    // Expected Result 1 & 2: Form validates and error message indicates email is required
    const errorMessage = page.getByText(/email is required|please enter an email/i);
    await expect(errorMessage).toBeVisible();

    // Expected Result 3: Submission is blocked (verify we are still on the same page/modal)
    await expect(page.getByRole('heading', { name: /send invitation/i })).toBeVisible();

    // Expected Result 4: User is prompted to enter email (check for HTML5 validation or ARIA attributes)
    const emailInput = page.getByLabel(/email/i);
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.checkValidity() || el.getAttribute('aria-invalid') === 'true');
    expect(isInvalid).toBeTruthy();
  });
});