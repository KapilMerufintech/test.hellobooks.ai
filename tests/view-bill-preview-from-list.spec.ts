import { test, expect } from '@playwright/test';

//
// GLOBAL CONFIGURATION
//
test.setTimeout(5 * 60 * 1000); // 5 minutes per test

const ACTION_TIMEOUT = 3 * 60 * 1000;
const EXPECT_TIMEOUT = 3 * 60 * 1000;

//
// TEST SUITE
//
test.describe('Purchases @Skt8hdf52', () => {

  test('@Tyxfnu9q9 @bills MODULE-001: View bill preview from list', async ({ page }) => {

    //
    // STEP 1: Navigate to Purchases > Bills
    //
    await page.goto('/list-bills', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    const billsTable = page.getByTestId('bills-table');
    await billsTable.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(billsTable).toBeVisible({ timeout: EXPECT_TIMEOUT });
    await page.screenshot({ path: 'debug-bills-list.png' });

    //
    // STEP 2: Click on any bill row in the list
    //
    const billRow = page.getByRole('row').nth(1);
    await billRow.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await billRow.click({ timeout: ACTION_TIMEOUT });

    //
    // STEP 3: Verify preview page loads
    //
    await page.waitForURL(/\/bills\/preview\/.+/, { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    const vendorField = page.getByTestId('bill-vendor');
    const amountField = page.getByTestId('bill-amount');
    const statusField = page.getByTestId('bill-status');
    await vendorField.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await amountField.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await statusField.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(vendorField).toBeVisible({ timeout: EXPECT_TIMEOUT });
    await expect(amountField).toBeVisible({ timeout: EXPECT_TIMEOUT });
    await expect(statusField).toBeVisible({ timeout: EXPECT_TIMEOUT });
    await page.screenshot({ path: 'debug-bill-preview.png' });

  });

});