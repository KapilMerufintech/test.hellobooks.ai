import { test, expect } from '@playwright/test';
import type { Page, TestInfo } from '@playwright/test';
import { login as seedLogin } from '../utils/login';

test.setTimeout(120000);

const invoicesUrl = '/sales/invoices';
const customersNewUrl = '/sales/customers/new';

type SeedData = {
  customerName: string;
  customerEmail: string;
  invoiceNumber: string;
};

function buildSeedData(testInfo: TestInfo): SeedData {
  const suffix = testInfo.testId.slice(0, 8);
  return {
    customerName: `Auto Customer ${suffix}`,
    customerEmail: `auto.customer+${suffix}@example.com`,
    invoiceNumber: `AUTO-${suffix}`,
  };
}

async function openInvoices(page: Page) {
  await page.goto(invoicesUrl);
  await expect(page.getByRole('heading', { name: /invoices/i }).first()).toBeVisible();
}

async function createCustomer(page: Page, seed: SeedData) {
  await page.goto(customersNewUrl);
  await expect(page.getByRole('heading', { name: /customer/i }).first()).toBeVisible();
  const nameInput = page.getByLabel(/name/i).first();
  const emailInput = page.getByLabel(/email/i).first();
  await expect(nameInput).toBeVisible();
  await expect(emailInput).toBeVisible();
  await nameInput.fill(seed.customerName);
  await emailInput.fill(seed.customerEmail);
  const saveButton = page.getByRole('button', { name: /save|create/i }).first();
  await expect(saveButton).toBeVisible();
  await saveButton.click();
  await expect(page.getByText(seed.customerName).first()).toBeVisible();
}

async function startNewInvoice(page: Page) {
  await page.goto(invoicesUrl);
  const newButton = page.getByRole('button', { name: /new invoice|create invoice/i }).first();
  await expect(newButton).toBeVisible();
  await newButton.click();
  await expect(page.getByRole('heading', { name: /invoice/i }).first()).toBeVisible();
}

async function selectCustomerByName(page: Page, customerName: string) {
  const customerInput = page
    .locator('input[placeholder*="Customer" i], input[aria-label*="Customer" i], input[name*="customer" i]')
    .first();
  await expect(customerInput).toBeVisible();
  await customerInput.click();
  await customerInput.fill(customerName);
  const customerOption = page.getByRole('option', { name: new RegExp(customerName, 'i') }).first();
  await expect(customerOption).toBeVisible();
  await customerOption.click();
}

async function setInvoiceNumber(page: Page, invoiceNumber: string) {
  const numberInput = page
    .locator('input[placeholder*="Invoice" i], input[aria-label*="Invoice" i], input[name*="invoice" i]')
    .first();
  await expect(numberInput).toBeVisible();
  await numberInput.fill(invoiceNumber);
}

async function addLineItem(page: Page, description: string, qty: number, price: number) {
  const addItem = page.getByRole('button', { name: /add item|add line|add product|add service/i }).first();
  await expect(addItem).toBeVisible();
  await addItem.click();

  const descriptionInput = page
    .locator(
      'input[placeholder*="Item" i], input[aria-label*="Item" i], input[name*="item" i], input[placeholder*="Description" i], input[aria-label*="Description" i]',
    )
    .first();
  const qtyInput = page
    .locator('input[placeholder*="Qty" i], input[aria-label*="Qty" i], input[name*="qty" i]')
    .first();
  const priceInput = page
    .locator(
      'input[placeholder*="Price" i], input[aria-label*="Price" i], input[name*="price" i], input[placeholder*="Rate" i], input[aria-label*="Rate" i]',
    )
    .first();

  await expect(descriptionInput).toBeVisible();
  await expect(qtyInput).toBeVisible();
  await expect(priceInput).toBeVisible();
  await descriptionInput.fill(description);
  await qtyInput.fill(String(qty));
  await priceInput.fill(String(price));
}

async function saveDraft(page: Page) {
  const saveDraftButton = page.getByRole('button', { name: /save draft|save/i }).first();
  await expect(saveDraftButton).toBeVisible();
  await saveDraftButton.click();
}

async function expectStatus(page: Page, status: RegExp) {
  await expect(page.getByText(status).first()).toBeVisible();
}

test.describe('@sales Sales / Invoices @S64c1475f', () => {
  test('@Td4d74412 @invoice HB-INVOICE-001: Open invoices list after login', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
  });

  test('@T549282c6 @invoice HB-INVOICE-002: Create draft invoice with required fields', async ({ page }) => {
    const seed = buildSeedData(test.info()); // Stable seed tied to test id.
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await setInvoiceNumber(page, seed.invoiceNumber);
    await addLineItem(page, 'Automation Service', 1, 100);
    await saveDraft(page);
    await expectStatus(page, /draft/i);
  });

  test('@T5b70e5f0 @invoice HB-INVOICE-003: Validate required customer on invoice', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await startNewInvoice(page);
    await addLineItem(page, 'Automation Service', 1, 100);
    await saveDraft(page);
    await expect(page.getByText(/customer.*required|required.*customer/i).first()).toBeVisible();
  });

  test('@T1aef6915 @invoice HB-INVOICE-004: Validate required line items on invoice', async ({ page }) => {
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await saveDraft(page);
    await expect(page.getByText(/line item|required.*item|add.*item/i).first()).toBeVisible();
  });

  test('@Tad077794 @invoice HB-INVOICE-005: Line item totals calculate correctly', async ({ page }) => {
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await addLineItem(page, 'Automation Service', 3, 100);
    await expect(page.getByText(/300(?:\\.00)?/).first()).toBeVisible();
  });

  test('@T28a11cf0 @invoice HB-INVOICE-006: Invoice subtotal equals sum of line totals', async ({ page }) => {
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await addLineItem(page, 'Automation Service A', 1, 100);
    await addLineItem(page, 'Automation Service B', 2, 50);
    await expect(page.getByText(/subtotal/i).first()).toBeVisible();
    await expect(page.getByText(/200(?:\\.00)?/).first()).toBeVisible();
  });

  test('@Teb2003dc @invoice HB-INVOICE-007: Percentage discount reduces line total', async ({ page }) => {
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await addLineItem(page, 'Automation Service', 1, 100);
    const discountInput = page
      .locator('input[placeholder*="Discount" i], input[aria-label*="Discount" i], input[name*="discount" i]')
      .first();
    await expect(discountInput).toBeVisible();
    await discountInput.fill('10');
    await expect(page.getByText(/90(?:\\.00)?/).first()).toBeVisible();
  });

  test('@T128751dc @invoice HB-INVOICE-008: Fixed discount reduces invoice subtotal', async ({ page }) => {
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await addLineItem(page, 'Automation Service', 1, 200);
    const discountInput = page
      .locator('input[placeholder*="Discount" i], input[aria-label*="Discount" i], input[name*="discount" i]')
      .first();
    await expect(discountInput).toBeVisible();
    await discountInput.fill('50');
    await expect(page.getByText(/150(?:\\.00)?/).first()).toBeVisible();
  });

  test('@Td872aa29 @invoice HB-INVOICE-018: Send invoice marks status as Sent', async ({ page }) => {
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await setInvoiceNumber(page, seed.invoiceNumber);
    await addLineItem(page, 'Automation Service', 1, 100);
    await saveDraft(page);
    const sendButton = page.getByRole('button', { name: /send/i }).first();
    await expect(sendButton).toBeVisible();
    await sendButton.click();
    await expectStatus(page, /sent/i);
  });

  test('@Tf8a72162 @invoice HB-INVOICE-020: Download invoice PDF', async ({ page }) => {
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await setInvoiceNumber(page, seed.invoiceNumber);
    await addLineItem(page, 'Automation Service', 1, 100);
    await saveDraft(page);
    const downloadButton = page.getByRole('button', { name: /download|pdf/i }).first();
    await expect(downloadButton).toBeVisible();
    const downloadPromise = page.waitForEvent('download', { timeout: 15000 });
    await downloadButton.click();
    await downloadPromise;
  });
});
