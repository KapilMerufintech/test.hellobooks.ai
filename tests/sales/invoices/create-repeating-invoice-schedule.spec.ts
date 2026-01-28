import { test, expect } from '@playwright/test';

/**
 * @name Create repeating invoice schedule
 * @description Verify user can set up recurring invoice generation
 * @priority medium
 * @type e2e
 * @tags invoice, repeating, automation, sales
 */

test.describe('Sales - Repeating Invoices', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: In a real scenario, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Username').fill('test_user');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Ensure we are on the dashboard before starting
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should create a new repeating invoice schedule', async ({ page }) => {
    // Step 1: Navigate to Sales > Invoices
    // Expected Result 1: Invoice list displayed
    await page.getByRole('button', { name: 'Sales' }).click();
    await page.getByRole('link', { name: 'Invoices' }).click();
    await expect(page).toHaveURL(/.*invoices/);
    await expect(page.getByRole('heading', { name: 'Invoices' })).toBeVisible();

    // Step 2: Click Create Repeating Invoice
    // Expected Result 2: Repeating invoice form opens
    await page.getByRole('button', { name: 'Create Repeating Invoice' }).click();
    await expect(page).toHaveURL(/.*repeating-invoices\/new/);
    await expect(page.getByRole('heading', { name: 'New Repeating Invoice' })).toBeVisible();

    // Step 3: Select customer and add line items
    // Expected Result 3: Customer and items are added
    await page.getByLabel('Customer').fill('Acme Corp');
    await page.getByText('Acme Corp').first().click();
    
    await page.getByRole('button', { name: 'Add line item' }).click();
    await page.getByPlaceholder('Description').fill('Monthly Subscription Service');
    await page.getByPlaceholder('Quantity').fill('1');
    await page.getByPlaceholder('Unit Price').fill('100.00');
    
    await expect(page.getByDisplayValue('Monthly Subscription Service')).toBeVisible();

    // Step 4: Set recurrence frequency and start date
    // Expected Result 4: Recurrence settings are configured
    await page.getByLabel('Repeat every').fill('1');
    await page.getByRole('combobox', { name: 'Frequency' }).selectOption('Month(s)');
    
    // Setting start date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    
    await page.getByLabel('Start Date').fill(dateString);
    
    // Asserting values are set
    await expect(page.getByLabel('Repeat every')).toHaveValue('1');
    await expect(page.getByLabel('Start Date')).toHaveValue(dateString);

    // Step 5: Click Save Repeating Invoice
    // Expected Result 5: Repeating invoice schedule is saved
    await page.getByRole('button', { name: 'Save Repeating Invoice' }).click();

    // Final Assertion: Verify success message or redirection to the list/detail view
    await expect(page.getByText('Repeating invoice schedule saved successfully')).toBeVisible();
    await expect(page).toHaveURL(/.*repeating-invoices/);
    
    // Verify the record exists in the list
    await expect(page.getByRole('cell', { name: 'Acme Corp' }).first()).toBeVisible();
  });

});