import { test, expect } from '@playwright/test';

//
// GLOBAL CONFIGURATION
//
test.setTimeout(5 * 60 * 1000); // 5 minutes per test

const ACTION_TIMEOUT = 3 * 60 * 1000;
const EXPECT_TIMEOUT = 3 * 60 * 1000;

// Inline login helper — credentials from Test Environment settings
async function seedLogin(page) {
  await page.goto('/login', { timeout: ACTION_TIMEOUT });
  await page.waitForLoadState('networkidle');
  await page.getByLabel(/email/i).fill('harshpadaliya@merufintech.net', { timeout: ACTION_TIMEOUT });
  await page.getByLabel(/password/i).fill('Harsh@12345', { timeout: ACTION_TIMEOUT });
  await page.getByRole('button', { name: /sign in|log in|login|submit/i }).click({ timeout: ACTION_TIMEOUT });
  await page.waitForLoadState('networkidle');
}

//
// TEST SUITE
//
test.describe('Purchases @S35n0zi56', () => {

  test('@T4qwx5y80 @bill-credit-note MODULE-001: Create a new Bill Credit Note', async ({ page }) => {

    const suffix = Date.now().toString(36);
    const creditNoteNumber = 'CN-' + suffix;
    const creditNoteDate = '2024-01-15';
    const lineDescription = 'Auto Credit Line ' + suffix;

    //
    // STEP 0: Login
    //
    await seedLogin(page);

    //
    // STEP 1: Navigate to Purchases > Bill Credit Notes from sidebar (Bill Credit Notes list page is displayed)
    //
    await page.goto('https://dev.hellobooks.ai', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    const purchasesMenu = page.getByRole('link', { name: /purchases/i });
    await purchasesMenu.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await purchasesMenu.click({ timeout: ACTION_TIMEOUT });
    const creditNotesLink = page.getByRole('link', { name: /bill credit notes/i });
    await creditNotesLink.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await creditNotesLink.click({ timeout: ACTION_TIMEOUT });
    await page.waitForURL(/bill-credit-notes/i, { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    const listHeading = page.getByRole('heading', { name: /bill credit notes/i });
    await expect(listHeading).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 2: Click on 'Create Credit Note' button (Create Credit Note form opens successfully)
    //
    const createButton = page.getByRole('button', { name: /create credit note/i });
    await createButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await createButton.click({ timeout: ACTION_TIMEOUT });
    await page.waitForURL(/credit-note|create/i, { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    const formHeading = page.getByRole('heading', { name: /credit note/i });
    await expect(formHeading).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 3: Select the vendor from the dropdown (Vendor is selected and related bills are loaded)
    //
    const vendorSelect = page.getByLabel(/vendor/i);
    await vendorSelect.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await vendorSelect.click({ timeout: ACTION_TIMEOUT });
    const vendorOption = page.getByRole('option').first();
    await vendorOption.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await vendorOption.click({ timeout: ACTION_TIMEOUT });
    const billDropdown = page.getByLabel(/bill/i);
    await expect(billDropdown).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 4: Select the bill to apply credit against (Bill is linked to the credit note)
    //
    await billDropdown.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await billDropdown.click({ timeout: ACTION_TIMEOUT });
    const billOption = page.getByRole('option').first();
    await billOption.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await billOption.click({ timeout: ACTION_TIMEOUT });
    await expect(billDropdown).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 5: Enter credit note number and date (Credit note details are populated)
    //
    const creditNoteNumberInput = page.getByLabel(/credit note number/i);
    await creditNoteNumberInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await creditNoteNumberInput.fill(creditNoteNumber, { timeout: ACTION_TIMEOUT });
    const creditNoteDateInput = page.getByLabel(/credit note date/i);
    await creditNoteDateInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await creditNoteDateInput.fill(creditNoteDate, { timeout: ACTION_TIMEOUT });
    await expect(creditNoteNumberInput).toBeVisible({ timeout: EXPECT_TIMEOUT });
    await expect(creditNoteDateInput).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 6: Add line items with amount and tax details (Line items are added with correct calculations)
    //
    const addLineItemButton = page.getByRole('button', { name: /add line item/i });
    await addLineItemButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await addLineItemButton.click({ timeout: ACTION_TIMEOUT });
    const descriptionInput = page.getByLabel(/description/i).first();
    await descriptionInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await descriptionInput.fill(lineDescription, { timeout: ACTION_TIMEOUT });
    const quantityInput = page.getByLabel(/quantity/i).first();
    await quantityInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await quantityInput.fill('2', { timeout: ACTION_TIMEOUT });
    const rateInput = page.getByLabel(/rate|amount/i).first();
    await rateInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await rateInput.fill('150', { timeout: ACTION_TIMEOUT });
    const taxInput = page.getByLabel(/tax/i).first();
    await taxInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await taxInput.fill('10', { timeout: ACTION_TIMEOUT });
    const totalAmount = page.getByTestId('credit-note-total');
    await expect(totalAmount).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 7: Click 'Save' button (Credit note is saved and appears in the list with correct status)
    //
    const saveButton = page.getByRole('button', { name: /save/i });
    await saveButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await saveButton.click({ timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    await page.waitForURL(/bill-credit-notes/i, { timeout: ACTION_TIMEOUT });
    const savedRow = page.getByRole('row', { name: new RegExp(creditNoteNumber, 'i') });
    await expect(savedRow).toBeVisible({ timeout: EXPECT_TIMEOUT });

  });

});