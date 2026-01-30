import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Create quote with tax inclusive amounts
 * Test ID: TEST-1769770055321
 * Description: Verify tax calculation when amounts are tax inclusive
 */

test.describe('Sales Quotes Tax Calculations', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is logged in
    // Note: In a real scenario, this would use a saved storage state or a login helper
    await page.goto('/login');
    await page.getByLabel('Username').fill('test_user');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
  });

  test('Create quote with tax inclusive amounts TEST-1769770055321', async ({ page }) => {
    // 1. Open new quote form
    await page.goto('/quotes/new');
    await expect(page.getByRole('heading', { name: 'Create New Quote' })).toBeVisible();

    // 2. Select 'Amounts are Tax Inclusive'
    // Using getByLabel assuming a dropdown or radio group for tax settings
    const taxSettingDropdown = page.getByLabel('Tax Treatment');
    await taxSettingDropdown.selectOption('Tax Inclusive');
    
    // Verify selection
    await expect(taxSettingDropdown).toHaveValue('Tax Inclusive');

    // 3. Add line item with rate 1000
    // Using getByRole for semantic table/form interaction
    const lineItemRow = page.locator('tr.line-item').first();
    await lineItemRow.getByPlaceholder('Description').fill('Consulting Services');
    await lineItemRow.getByLabel('Rate').fill('1000');

    // 4. Select tax rate (e.g., 18% GST)
    await lineItemRow.getByLabel('Tax Rate').selectOption('GST 18%');

    // 5. Verify tax is calculated from inclusive amount
    /**
     * Calculation Logic for Tax Inclusive:
     * Total = 1000
     * Tax Rate = 18%
     * Net Amount = Total / (1 + Tax Rate) = 1000 / 1.18 = 847.46
     * Tax Amount = Total - Net Amount = 1000 - 847.46 = 152.54
     */
    
    const taxAmountField = page.locator('[data-testid="summary-tax-amount"]');
    const totalAmountField = page.locator('[data-testid="summary-total-amount"]');
    const subtotalAmountField = page.locator('[data-testid="summary-subtotal-amount"]');

    // Assertions for expected results
    // The Subtotal (Net) should be the back-calculated value
    await expect(subtotalAmountField).toHaveText('847.46');
    
    // The Tax component should be the difference
    await expect(taxAmountField).toHaveText('152.54');
    
    // The Total should remain exactly 1000 as it is inclusive
    await expect(totalAmountField).toHaveText('1,000.00');

    // Optional: Save the quote to ensure persistence
    await page.getByRole('button', { name: 'Save Quote' }).click();
    await expect(page.getByText('Quote created successfully')).toBeVisible();
  });
});