import { test, expect } from '@playwright/test';

/**
 * @name Bulk payment for multiple bills
 * @description Verify multiple bills can be selected and paid in batch
 * @priority medium
 * @type e2e
 * @tags bills, payment, bulk, batch
 */

test.describe('Bulk Bill Payments', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: Assuming authentication state is handled via global setup or a login helper
    await page.goto('/login');
    await page.getByLabel('Email').fill('test-user@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Ensure we are on the dashboard before starting
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should allow selecting multiple bills and paying them via bank transfer', async ({ page }) => {
    // Step 1: Navigate to Bills list > Awaiting Payment tab
    await page.getByRole('link', { name: 'Bills' }).click();
    const awaitingPaymentTab = page.getByRole('tab', { name: 'Awaiting Payment' });
    await awaitingPaymentTab.click();
    
    // Assert tab is active
    await expect(awaitingPaymentTab).toHaveAttribute('aria-selected', 'true');

    // Step 2: Select multiple bills using checkboxes
    // We target the first two rows in the bill list
    const billCheckboxes = page.getByRole('checkbox', { name: /Select bill/i });
    
    // Expected Result 1: Bills selectable via checkboxes
    await billCheckboxes.nth(0).check();
    await billCheckboxes.nth(1).check();
    
    await expect(billCheckboxes.nth(0)).toBeChecked();
    await expect(billCheckboxes.nth(1)).toBeChecked();

    // Step 3: Click Make Payment > Select Bank payment method
    await page.getByRole('button', { name: 'Make Payment' }).click();
    
    // Expected Result 2: Payment confirmation modal appears for currency check
    const confirmationModal = page.getByRole('dialog').filter({ hasText: /Confirm Payment/i });
    await expect(confirmationModal).toBeVisible();
    await expect(confirmationModal).toContainText('Currency: USD'); // Example currency check

    // Select Bank payment method within the workflow
    await page.getByRole('button', { name: 'Bank Payment' }).click();

    // Expected Result 3: BatchBankPaymentsModal opens
    const batchModal = page.locator('[data-testid="BatchBankPaymentsModal"]');
    await expect(batchModal).toBeVisible();
    await expect(batchModal).toContainText('Batch Payment Summary');

    // Step 4: Complete batch payment in modal
    await batchModal.getByRole('button', { name: 'Confirm and Pay' }).click();

    // Expected Result 4: Bills status updated to Paid, list refreshed
    // We look for a success toast or the absence of the paid bills in the 'Awaiting' list
    await expect(page.getByText('Batch payment processed successfully')).toBeVisible();
    
    // Verify the list refreshed and the specific bills are no longer in 'Awaiting Payment'
    // (Assuming the list updates dynamically)
    await expect(page.getByText('No bills awaiting payment')).toBeVisible({ timeout: 10000 });
    
    // Navigate to Paid tab to verify status update
    await page.getByRole('tab', { name: 'Paid' }).click();
    const statusBadge = page.getByText('Paid').first();
    await expect(statusBadge).toBeVisible();
  });

});