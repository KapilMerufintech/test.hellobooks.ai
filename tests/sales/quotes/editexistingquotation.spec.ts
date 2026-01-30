import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Edit existing quotation
 * Test ID: TEST-1769769944114
 */

test.describe('Quotation Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: In a real-world scenario, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Username').fill('sales_user');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Ensure we are on the dashboard
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('Edit existing quotation TEST-1769769944114', async ({ page }) => {
    // Step 1: Navigate to Sales > Quotes
    // Using semantic navigation
    await page.getByRole('link', { name: 'Sales' }).click();
    await page.getByRole('link', { name: 'Quotes' }).click();

    // Expected Result 1: Quotes list displays
    await expect(page.getByRole('heading', { name: 'Quotations' })).toBeVisible();
    const quotesTable = page.getByRole('table');
    await expect(quotesTable).toBeVisible();

    // Step 2: Click on an existing draft quote
    // We look for a row that has the 'Draft' status badge
    const draftQuoteRow = page.locator('tr').filter({ hasText: 'Draft' }).first();
    await draftQuoteRow.click();

    // Expected Result 2: Quote preview opens
    await expect(page.getByRole('heading', { name: 'Quote Details' })).toBeVisible();

    // Step 3: Click 'Edit' button
    await page.getByRole('button', { name: 'Edit' }).click();

    // Expected Result 3: Edit form loads with existing data
    await expect(page.getByRole('heading', { name: 'Edit Quotation' })).toBeVisible();
    const quantityInput = page.getByLabel('Quantity');
    await expect(quantityInput).not.toHaveValue('');

    // Step 4: Modify line item quantity
    const initialTotalText = await page.locator('.total-amount').innerText();
    await quantityInput.clear();
    await quantityInput.fill('10');
    // Trigger blur to ensure recalculation logic fires
    await quantityInput.blur();

    // Expected Result 4: Quantity updates and totals recalculate
    await expect(quantityInput).toHaveValue('10');
    const updatedTotalAfterQty = await page.locator('.total-amount').innerText();
    expect(updatedTotalAfterQty).not.toBe(initialTotalText);

    // Step 5: Update discount percentage
    const discountInput = page.getByLabel('Discount (%)');
    await discountInput.clear();
    await discountInput.fill('15');
    await discountInput.blur();

    // Expected Result 5: Discount applies and totals update
    await expect(discountInput).toHaveValue('15');
    const finalTotal = await page.locator('.total-amount').innerText();
    expect(finalTotal).not.toBe(updatedTotalAfterQty);

    // Step 6: Click 'Save' button
    await page.getByRole('button', { name: 'Save' }).click();

    // Expected Result 6: Changes are saved successfully
    // Verify success message/toast and redirection back to preview or list
    await expect(page.getByText(/successfully updated|saved/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Quote Details' })).toBeVisible();
    
    // Verify the updated values persist in the preview
    await expect(page.locator('.detail-quantity')).toContainText('10');
    await expect(page.locator('.detail-discount')).toContainText('15%');
  });
});