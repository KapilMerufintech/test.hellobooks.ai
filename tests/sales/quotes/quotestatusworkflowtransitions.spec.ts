import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Quote status workflow transitions
 * Test ID: TEST-1769770070078
 */

test.describe('Quote Workflow Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: In a real environment, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Username').fill('sales_user');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Ensure we are on the dashboard/quotes page
    await expect(page).toHaveURL(/.*dashboard|quotes/);
  });

  test('Quote status workflow transitions TEST-1769770070078', async ({ page }) => {
    // 1. Open draft quote
    // Precondition 2: A draft quote exists. We navigate to the quotes list and filter for Drafts.
    await page.goto('/quotes');
    const draftQuoteRow = page.locator('tr').filter({ hasText: 'Draft' }).first();
    await expect(draftQuoteRow).toBeVisible();
    
    // Click the view/edit button for the draft quote
    await draftQuoteRow.getByRole('link', { name: /view|edit/i }).click();
    
    // Verify Draft quote opens
    await expect(page.getByText('Status: Draft', { exact: false })).toBeVisible();

    // 2. Send quote to customer (status: Sent)
    await page.getByRole('button', { name: 'Send to Customer' }).click();
    
    // Confirm the action if a modal appears
    const confirmButton = page.getByRole('button', { name: 'Confirm' });
    if (await confirmButton.isVisible()) {
        await confirmButton.click();
    }

    // Verify status changes to Sent
    const sentBadge = page.getByText('Sent', { exact: true });
    await expect(sentBadge).toBeVisible();

    // 3. Mark quote as Accepted
    await page.getByRole('button', { name: 'Mark as Accepted' }).click();

    // 4. Verify status badge updates to Accepted
    const acceptedBadge = page.getByRole('status').filter({ hasText: 'Accepted' });
    await expect(acceptedBadge).toBeVisible();
    
    // Verify the overall state reflects the transition
    await expect(page.getByText('Quote has been accepted')).toBeVisible();

    // 5. Check quote cannot be edited after acceptance
    // Check if the "Edit" button is disabled or hidden
    const editButton = page.getByRole('button', { name: 'Edit Quote' });
    
    // Logic: Either the button is disabled, or clicking it shows a read-only warning
    const isButtonDisabled = await editButton.isDisabled();
    
    if (!isButtonDisabled) {
        await editButton.click();
        // If it allows clicking, it should show a warning or be in read-only mode
        const warningMessage = page.getByText(/cannot be edited|read-only/i);
        await expect(warningMessage).toBeVisible();
    } else {
        await expect(editButton).toBeDisabled();
    }

    // Alternative check: Ensure input fields are disabled
    const firstInput = page.locator('input').first();
    if (await firstInput.isVisible()) {
        await expect(firstInput).toBeDisabled();
    }
  });
});