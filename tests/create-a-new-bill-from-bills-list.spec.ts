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
test.describe('Purchases @Svkt4w1b2', () => {

  test('@Tl8chi3fu @bills @create @purchases @smoke MODULE-001: Create a new bill from Bills list', async ({ page }) => {

    const suffix = Date.now().toString(36);
    const billNumber = 'BILL-' + suffix;
    const billDate = '2024-01-15';
    const dueDate = '2024-02-15';
    const referenceNumber = 'REF-' + suffix;
    const lineDescription = 'Office supplies ' + suffix;
    const lineQuantity = '1';
    const lineRate = '100';

    //
    // STEP 1: Navigate to Purchases > Bills from sidebar (Expected: Bills list page loads at /list-bills)
    //
    await page.goto('/list-bills', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    await page.waitForURL(/\/list-bills/, { timeout: ACTION_TIMEOUT });
    const billsListPage = page.getByTestId('bills-list-page');
    await billsListPage.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(billsListPage).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 2: Click on New Bill button (Expected: Create bill form opens at /create-bills)
    //
    const newBillButton = page.getByTestId('new-bill-button');
    await newBillButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await newBillButton.click({ timeout: ACTION_TIMEOUT });
    await page.waitForURL(/\/create-bills/, { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    const createBillForm = page.getByTestId('create-bill-form');
    await createBillForm.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(createBillForm).toBeVisible({ timeout: EXPECT_TIMEOUT });
    await page.screenshot({ path: 'debug-create-bill-form.png' });

    //
    // STEP 3: Select a vendor from dropdown (Expected: Vendor is selected successfully)
    //
    const vendorSelect = page.getByTestId('vendor-select');
    await vendorSelect.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await vendorSelect.click({ timeout: ACTION_TIMEOUT });
    const vendorOption = page.getByTestId('vendor-option-0');
    await vendorOption.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await vendorOption.click({ timeout: ACTION_TIMEOUT });
    await expect(vendorSelect).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 4: Enter bill number and issue date (Expected: Bill details are entered)
    //
    const billNumberInput = page.getByTestId('bill-number-input');
    await billNumberInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await billNumberInput.fill(billNumber, { timeout: ACTION_TIMEOUT });

    const billDateInput = page.getByTestId('bill-date-input');
    await billDateInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await billDateInput.fill(billDate, { timeout: ACTION_TIMEOUT });

    const dueDateInput = page.getByTestId('due-date-input');
    await dueDateInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await dueDateInput.fill(dueDate, { timeout: ACTION_TIMEOUT });

    const referenceInput = page.getByTestId('reference-input');
    await referenceInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await referenceInput.fill(referenceNumber, { timeout: ACTION_TIMEOUT });

    await expect(billNumberInput).toBeVisible({ timeout: EXPECT_TIMEOUT });
    await expect(billDateInput).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 5: Add a line item with description and amount (Expected: Line item is added to the bill)
    //
    const addLineItemButton = page.getByTestId('add-line-item-button');
    await addLineItemButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await addLineItemButton.click({ timeout: ACTION_TIMEOUT });

    const lineDescriptionInput = page.getByTestId('line-item-description-0');
    await lineDescriptionInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await lineDescriptionInput.fill(lineDescription, { timeout: ACTION_TIMEOUT });

    const lineQuantityInput = page.getByTestId('line-item-quantity-0');
    await lineQuantityInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await lineQuantityInput.fill(lineQuantity, { timeout: ACTION_TIMEOUT });

    const lineRateInput = page.getByTestId('line-item-rate-0');
    await lineRateInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await lineRateInput.fill(lineRate, { timeout: ACTION_TIMEOUT });

    const accountSelect = page.getByTestId('line-item-account-0');
    await accountSelect.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await accountSelect.click({ timeout: ACTION_TIMEOUT });
    const accountOption = page.getByTestId('account-option-0');
    await accountOption.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await accountOption.click({ timeout: ACTION_TIMEOUT });

    await expect(lineDescriptionInput).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 6: Click Save Draft (Expected: Bill is saved and appears in Draft tab)
    //
    const saveDraftButton = page.getByTestId('save-draft-button');
    await saveDraftButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await saveDraftButton.click({ timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    const successToast = page.getByTestId('toast-success');
    await successToast.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(successToast).toBeVisible({ timeout: EXPECT_TIMEOUT });
    await page.screenshot({ path: 'debug-bill-saved.png' });

    await page.waitForURL(/\/list-bills/, { timeout: ACTION_TIMEOUT });
    const draftTab = page.getByTestId('draft-tab');
    await draftTab.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await draftTab.click({ timeout: ACTION_TIMEOUT });

    const billRowCell = page.getByRole('cell', { name: billNumber });
    await billRowCell.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(billRowCell).toBeVisible({ timeout: EXPECT_TIMEOUT });

  });

});