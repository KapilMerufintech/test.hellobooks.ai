import { test, expect } from '@playwright/test';
import { seedLogin } from './seed.spec';

//
// GLOBAL CONFIGURATION
//
test.setTimeout(5 * 60 * 1000); // 5 minutes per test

const ACTION_TIMEOUT = 3 * 60 * 1000;
const EXPECT_TIMEOUT = 3 * 60 * 1000;

//
// TEST SUITE
//
test.describe('Purchases @Sx26svvwm', () => {

  test('@Tkjyo35fu @bills @create @draft @purchases @smoke-test MODULE-001: Create a new bill from scratch', async ({ page }) => {

    const suffix = Date.now().toString(36);
    const billNumber = "BILL-" + suffix;
    const referenceNumber = "REF-" + suffix;
    const lineDescription = "Office Supplies " + suffix;

    //
    // STEP 0: Login first
    //
    await seedLogin(page);

    //
    // STEP 1: Navigate to Purchases > Bills from sidebar
    //
    await page.goto('https://test.hellobooks.ai/list-bills', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    // Check if we're still on login page or need to navigate differently
    if (page.url().includes('/login')) {
      await seedLogin(page);
      await page.goto('https://test.hellobooks.ai/list-bills', { timeout: ACTION_TIMEOUT });
    }
    
    await page.waitForLoadState('networkidle').catch(() => {});
    await expect(page).toHaveURL(/list-bills/, { timeout: EXPECT_TIMEOUT });

    //
    // STEP 2: Click 'New Bill' button
    //
    const newBillButton = page.getByTestId('new-bill-button');
    await newBillButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await newBillButton.click({ timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/create-bills$/, { timeout: EXPECT_TIMEOUT });

    //
    // STEP 3: Select a vendor from the dropdown
    //
    const vendorSelect = page.getByTestId('vendor-select');
    await vendorSelect.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await vendorSelect.click({ timeout: ACTION_TIMEOUT });
    const vendorOption = page.getByRole('option').first();
    await vendorOption.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await vendorOption.click({ timeout: ACTION_TIMEOUT });

    const currencyField = page.getByTestId('currency-input');
    await currencyField.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(currencyField).toHaveValue(/.+/, { timeout: EXPECT_TIMEOUT });

    //
    // STEP 4: Enter bill number, issue date, and due date
    //
    const billNumberInput = page.getByTestId('bill-number-input');
    await billNumberInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await billNumberInput.fill(billNumber, { timeout: ACTION_TIMEOUT });

    const billDateInput = page.getByTestId('bill-date-input');
    await billDateInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await billDateInput.fill('2024-01-15', { timeout: ACTION_TIMEOUT });

    const dueDateInput = page.getByTestId('due-date-input');
    await dueDateInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await dueDateInput.fill('2024-02-15', { timeout: ACTION_TIMEOUT });

    const referenceInput = page.getByTestId('reference-input');
    await referenceInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await referenceInput.fill(referenceNumber, { timeout: ACTION_TIMEOUT });

    //
    // STEP 5: Add at least one line item with description, quantity, rate, and account
    //
    const addLineItemButton = page.getByTestId('add-line-item');
    await addLineItemButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await addLineItemButton.click({ timeout: ACTION_TIMEOUT });

    const lineDescriptionInput = page.getByTestId('line-description').first();
    await lineDescriptionInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await lineDescriptionInput.fill(lineDescription, { timeout: ACTION_TIMEOUT });

    const lineQuantityInput = page.getByTestId('line-quantity').first();
    await lineQuantityInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await lineQuantityInput.fill('2', { timeout: ACTION_TIMEOUT });

    const lineRateInput = page.getByTestId('line-rate').first();
    await lineRateInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await lineRateInput.fill('25', { timeout: ACTION_TIMEOUT });

    const lineAccountSelect = page.getByTestId('line-account').first();
    await lineAccountSelect.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await lineAccountSelect.click({ timeout: ACTION_TIMEOUT });
    const accountOption = page.getByRole('option').first();
    await accountOption.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await accountOption.click({ timeout: ACTION_TIMEOUT });

    const lineTotal = page.getByTestId('line-total').first();
    await lineTotal.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(lineTotal).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 6: Click 'Save Draft' button
    //
    const saveDraftButton = page.getByTestId('save-draft-button');
    await saveDraftButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await saveDraftButton.click({ timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    await page.waitForURL(/\/list-bills$/, { timeout: ACTION_TIMEOUT });

    const createdBillRow = page.getByRole('row', { name: new RegExp(billNumber, 'i') });
    await createdBillRow.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(createdBillRow).toBeVisible({ timeout: EXPECT_TIMEOUT });

    const draftStatus = createdBillRow.getByTestId('bill-status-draft');
    await draftStatus.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(draftStatus).toBeVisible({ timeout: EXPECT_TIMEOUT });

  });

});