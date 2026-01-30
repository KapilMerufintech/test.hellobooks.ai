import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Apply discount to quotation
 * Test ID: TEST-1769770032087
 */

test.describe('Quotation Discount Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: In a real scenario, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Username').fill('sales_user');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Precondition 2: Quote creation form is open
    await page.goto('/quotes/new');
    await expect(page.getByRole('heading', { name: 'Create New Quote' })).toBeVisible();
  });

  test('Apply discount to quotation TEST-1769770032087', async ({ page }) => {
    // Step 1: Create a new quote with line items
    await page.getByLabel('Customer').fill('Acme Corp');
    await page.getByRole('option', { name: 'Acme Corp' }).click();

    // Add first line item
    await page.getByRole('button', { name: 'Add Line Item' }).click();
    const row1 = page.locator('tr.line-item').first();
    await row1.getByPlaceholder('Product name').fill('Enterprise Server');
    await row1.getByLabel('Quantity').fill('1');
    await row1.getByLabel('Unit Price').fill('1000');

    // Step 2: Apply percentage discount to a line item
    // Applying 10% discount to the $1000 item
    await row1.getByLabel('Discount %').fill('10');
    
    // Verify line item subtotal (1000 - 10% = 900)
    const lineSubtotal = row1.locator('.line-total');
    await expect(lineSubtotal).toHaveText('$900.00');

    // Step 3: Apply fixed amount discount at quote level
    // Applying $50 flat discount to the whole quote
    await page.getByLabel('Quote Discount (Fixed)').fill('50');

    // Step 4: Verify discount calculations
    // Calculation: (Line Item 900) - (Quote Discount 50) = 850
    const totalDiscountAmount = page.getByTestId('total-discount-summary');
    const finalTotal = page.getByTestId('quote-final-total');

    // Verify the aggregate discount reflects both levels (100 from line + 50 from quote = 150)
    await expect(totalDiscountAmount).toContainText('$150.00');
    
    // Verify final total
    await expect(finalTotal).toHaveText('$850.00');

    // Step 5: Save the quote
    await page.getByRole('button', { name: 'Save Quote' }).click();

    // Final Verification: Quote saved successfully
    await expect(page.getByText('Quote saved successfully')).toBeVisible();
    await expect(page).toHaveURL(/\/quotes\/view\/\d+/);
    
    // Verify data persistence on the view page
    await expect(page.getByTestId('display-final-total')).toHaveText('$850.00');
  });
});