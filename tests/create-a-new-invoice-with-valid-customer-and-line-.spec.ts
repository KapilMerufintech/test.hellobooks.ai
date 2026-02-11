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
test.describe('Sales @Snboyj4fe', () => {

  test('@T4fo6jo1h @sales MODULE-001: Create a new invoice with valid customer and line items', async ({ page }) => {

    const suffix = Date.now().toString(36);
    const reference = 'Auto Invoice Ref ' + suffix;
    const description = 'Auto Line Item ' + suffix;
    const quantity = '2';
    const rate = '50';
    const expectedTotal = '100';

    //
    // STEP 1: Navigate to Sales > Invoices from the sidebar (Invoices list page is displayed)
    //
    await page.goto('/invoices/list', { timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    const invoicesListTitle = page.getByTestId('invoices-list-title');
    await invoicesListTitle.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(invoicesListTitle).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 2: Click on 'New Invoice' button (Create Invoice form opens successfully)
    //
    const newInvoiceButton = page.getByTestId('new-invoice-btn');
    await newInvoiceButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await newInvoiceButton.click({ timeout: ACTION_TIMEOUT });
    await page.waitForURL(/\/invoices\/create/, { timeout: ACTION_TIMEOUT });
    const createInvoiceForm = page.getByTestId('create-invoice-form');
    await createInvoiceForm.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(createInvoiceForm).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 3: Select a customer from the customer dropdown (Customer is selected and details are populated)
    //
    const customerSelect = page.getByTestId('customer-select');
    await customerSelect.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await customerSelect.click({ timeout: ACTION_TIMEOUT });
    const firstCustomerOption = page.getByRole('option').first();
    await firstCustomerOption.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await firstCustomerOption.click({ timeout: ACTION_TIMEOUT });
    const customerDetails = page.getByTestId('customer-details');
    await customerDetails.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(customerDetails).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 4: Add a line item with description, quantity, and rate (Line item is added with correct values)
    //
    const addLineItemButton = page.getByTestId('add-line-item-btn');
    await addLineItemButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await addLineItemButton.click({ timeout: ACTION_TIMEOUT });

    const lineDescription = page.getByTestId('line-item-description-0');
    await lineDescription.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await lineDescription.fill(description, { timeout: ACTION_TIMEOUT });

    const lineQuantity = page.getByTestId('line-item-quantity-0');
    await lineQuantity.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await lineQuantity.fill(quantity, { timeout: ACTION_TIMEOUT });

    const lineRate = page.getByTestId('line-item-rate-0');
    await lineRate.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await lineRate.fill(rate, { timeout: ACTION_TIMEOUT });

    await expect(lineDescription).toBeVisible({ timeout: EXPECT_TIMEOUT });
    await expect(lineQuantity).toBeVisible({ timeout: EXPECT_TIMEOUT });
    await expect(lineRate).toBeVisible({ timeout: EXPECT_TIMEOUT });

    //
    // STEP 5: Verify the invoice total is calculated correctly (Invoice total reflects line item calculations including taxes)
    //
    const invoiceTotal = page.getByTestId('invoice-total');
    await invoiceTotal.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(invoiceTotal).toBeVisible({ timeout: EXPECT_TIMEOUT });
    await expect(invoiceTotal).toContainText(expectedTotal, { timeout: EXPECT_TIMEOUT });

    //
    // STEP 6: Click 'Save' to create the invoice (Invoice is saved and appears in the invoices list with correct status)
    //
    const referenceInput = page.getByTestId('invoice-reference');
    await referenceInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await referenceInput.fill(reference, { timeout: ACTION_TIMEOUT });

    const saveButton = page.getByTestId('save-invoice-btn');
    await saveButton.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await saveButton.click({ timeout: ACTION_TIMEOUT });
    await page.waitForLoadState('networkidle');
    await page.waitForURL(/\/invoices\/list/, { timeout: ACTION_TIMEOUT });

    const invoicesList = page.getByTestId('invoice-list');
    await invoicesList.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(invoicesList).toBeVisible({ timeout: EXPECT_TIMEOUT });
    await expect(invoicesList).toContainText(reference, { timeout: EXPECT_TIMEOUT });

  });

});