import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Send quotation to customer via email
 * Test ID: TEST-1769770006857
 */

test.describe('Sales Quotation Workflow', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: In a real environment, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Username').fill('sales_user');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('Send quotation to customer via email TEST-1769770006857', async ({ page }) => {
    // Step 1: Navigate to Sales > Quotes
    // Expected Result 1: Quotes list displays
    await page.getByRole('link', { name: 'Sales' }).click();
    await page.getByRole('link', { name: 'Quotes' }).click();
    await expect(page).toHaveURL(/.*quotes/);
    await expect(page.getByRole('heading', { name: 'Quotations' })).toBeVisible();

    // Step 2: Open a quote preview
    // Precondition 2: A quote exists
    // Expected Result 2: Quote preview opens
    const firstQuoteRow = page.locator('table tbody tr').first();
    await firstQuoteRow.click();
    await expect(page.getByText('Quote Details')).toBeVisible();

    // Step 3: Click 'Send' or 'Email' button
    // Expected Result 3: Email composition modal opens
    await page.getByRole('button', { name: 'Email' }).click();
    const emailModal = page.getByRole('dialog');
    await expect(emailModal).toBeVisible();
    await expect(emailModal.getByText('Compose Email')).toBeVisible();

    // Step 4: Verify email form with pre-filled recipient
    // Precondition 3: Customer has email address
    // Expected Result 4: Customer email is pre-filled
    const recipientInput = page.getByLabel('To');
    await expect(recipientInput).not.toBeEmpty();
    const emailValue = await recipientInput.inputValue();
    expect(emailValue).toContain('@');

    // Step 5: Add custom message and click 'Send'
    // Expected Result 5: Email is sent successfully with quote attachment
    await page.getByLabel('Message').fill('Please find the attached quotation for your review. Let us know if you have any questions.');
    
    // Verify attachment exists (semantic check)
    await expect(page.getByText(/quote_.*\.pdf/i)).toBeVisible();

    // Click Send
    await page.getByRole('button', { name: 'Send', exact: true }).click();

    // Final Assertion: Success notification
    const successMessage = page.getByText('Email sent successfully');
    await expect(successMessage).toBeVisible();
    
    // Verify modal is closed
    await expect(emailModal).not.toBeVisible();
  });
});