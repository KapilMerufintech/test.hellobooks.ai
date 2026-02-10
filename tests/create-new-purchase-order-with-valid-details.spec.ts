import { test, expect } from '@playwright/test';
import type { TestInfo } from '@playwright/test';

test.setTimeout(5 * 60 * 1000);
const ACTION_TIMEOUT = 3 * 60 * 1000;
const EXPECT_TIMEOUT = 3 * 60 * 1000;

function buildSeedData(testInfo: TestInfo) {
  const suffix = testInfo.testId.slice(0, 8);
  return {
    vendor: "Vendor " + suffix,
    poNumber: "PO-" + suffix,
    notes: "Auto notes " + suffix,
    itemDescription: "Item Description " + suffix,
    quantity: "2",
    rate: "150",
    tax: "Tax " + suffix,
  };
}

async function openPurchaseOrders(page: any) {
  try {
    await page.goto('/purchase-orders');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'debug-purchase-orders-list.png' });
  } catch (error) {
    await page.screenshot({ path: 'debug-purchase-orders-list-error.png' });
    throw error;
  }
}

async function startNewPurchaseOrder(page: any) {
  try {
    const newBtn = page.getByTestId('new-purchase-order-button');
    await newBtn.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await newBtn.click();
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'debug-purchase-order-form.png' });
  } catch (error) {
    await page.screenshot({ path: 'debug-purchase-order-form-error.png' });
    throw error;
  }
}

async function selectVendor(page: any, vendorName: string) {
  try {
    const vendorSelect = page.getByTestId('vendor-select');
    await vendorSelect.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await vendorSelect.click();
    const vendorOption = page.getByRole('option', { name: new RegExp(vendorName, 'i') });
    await vendorOption.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await vendorOption.click();
  } catch (error) {
    await page.screenshot({ path: 'debug-select-vendor-error.png' });
    throw error;
  }
}

async function fillDates(page: any) {
  try {
    const poDateInput = page.getByTestId('po-date-input');
    await poDateInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await poDateInput.fill('2024-01-10');

    const expectedDeliveryInput = page.getByTestId('expected-delivery-date-input');
    await expectedDeliveryInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expectedDeliveryInput.fill('2024-01-20');
  } catch (error) {
    await page.screenshot({ path: 'debug-fill-dates-error.png' });
    throw error;
  }
}

async function addLineItem(page: any, data: { itemDescription: string; quantity: string; rate: string; tax: string }) {
  try {
    const addLineItemBtn = page.getByTestId('add-line-item-button');
    await addLineItemBtn.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await addLineItemBtn.click();

    const descriptionInput = page.getByTestId('line-item-description-0');
    await descriptionInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await descriptionInput.fill(data.itemDescription);

    const quantityInput = page.getByTestId('line-item-quantity-0');
    await quantityInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await quantityInput.fill(data.quantity);

    const rateInput = page.getByTestId('line-item-rate-0');
    await rateInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await rateInput.fill(data.rate);

    const taxSelect = page.getByTestId('line-item-tax-0');
    await taxSelect.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await taxSelect.click();
    const taxOption = page.getByRole('option', { name: new RegExp(data.tax, 'i') });
    await taxOption.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await taxOption.click();

    const accountSelect = page.getByTestId('line-item-account-0');
    await accountSelect.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await accountSelect.click();
    const accountOption = page.getByRole('option', { name: /expense/i });
    await accountOption.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await accountOption.click();

    await page.screenshot({ path: 'debug-line-item-added.png' });
  } catch (error) {
    await page.screenshot({ path: 'debug-line-item-error.png' });
    throw error;
  }
}

async function savePurchaseOrder(page: any) {
  try {
    const saveBtn = page.getByTestId('save-purchase-order-button');
    await saveBtn.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await saveBtn.click();
    await page.waitForLoadState('networkidle');
  } catch (error) {
    await page.screenshot({ path: 'debug-save-purchase-order-error.png' });
    throw error;
  }
}

test.describe('Purchases @Sgmr319x4', () => {
  test('@Tnmn4dnq7 @purchase-order PO-001: Create new Purchase Order with valid details', async ({ page }, testInfo) => {
    const seed = buildSeedData(testInfo);

    await openPurchaseOrders(page);

    const listHeader = page.getByTestId('purchase-orders-list');
    await expect(listHeader).toBeVisible({ timeout: EXPECT_TIMEOUT });

    await startNewPurchaseOrder(page);

    const formHeader = page.getByTestId('purchase-order-form');
    await expect(formHeader).toBeVisible({ timeout: EXPECT_TIMEOUT });

    await selectVendor(page, seed.vendor);
    const vendorDetails = page.getByTestId('vendor-details');
    await expect(vendorDetails).toBeVisible({ timeout: EXPECT_TIMEOUT });

    const poNumberInput = page.getByTestId('po-number-input');
    await poNumberInput.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await poNumberInput.fill(seed.poNumber);

    await fillDates(page);

    const notesTextarea = page.getByTestId('purchase-order-notes');
    await notesTextarea.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await notesTextarea.fill(seed.notes);

    await addLineItem(page, {
      itemDescription: seed.itemDescription,
      quantity: seed.quantity,
      rate: seed.rate,
      tax: seed.tax,
    });

    const totalField = page.getByTestId('purchase-order-total');
    await expect(totalField).toBeVisible({ timeout: EXPECT_TIMEOUT });

    await savePurchaseOrder(page);

    const successToast = page.getByTestId('toast-success');
    await expect(successToast).toBeVisible({ timeout: EXPECT_TIMEOUT });

    await page.waitForURL(/\/purchase-orders/, { timeout: ACTION_TIMEOUT });
    await page.screenshot({ path: 'debug-purchase-order-saved.png' });

    const createdRow = page.getByRole('row', { name: new RegExp(seed.poNumber, 'i') });
    await expect(createdRow).toBeVisible({ timeout: EXPECT_TIMEOUT });
  });
});