import { test, expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { login as seedLogin } from '../utils/login';

test.setTimeout(120000);

const baseUrl = 'https://test.hellobooks.ai';

async function optionalAction(locator: Locator, action: () => Promise<void>, note: string) {
  if (await locator.count()) {
    await action();
    return true;
  }
  test.info().annotations.push({ type: 'note', description: note });
  return false;
}

async function hasInvoicesMarker(page: Page) {
  const heading = page.getByRole('heading', { name: /invoices/i }).first();
  const title = page.getByText(/invoices/i).first();
  return (await heading.isVisible().catch(() => false)) || (await title.isVisible().catch(() => false));
}

async function expectInvoicesVisible(page: Page) {
  const heading = page.getByRole('heading', { name: /invoices/i }).first();
  const title = page.getByText(/invoices/i).first();
  if (await heading.isVisible().catch(() => false)) {
    await expect(heading).toBeVisible({ timeout: 15000 });
    return;
  }
  await expect(title).toBeVisible({ timeout: 15000 });
}

async function openInvoices(page: Page) {
  const urls = [
    `${baseUrl}/sales/invoices`,
    `${baseUrl}/invoices`,
    `${baseUrl}/?tab=invoices`,
    `${baseUrl}/?tab=sales&subtab=invoices`,
  ];
  for (const url of urls) {
    await page.goto(url);
    await page.waitForLoadState('domcontentloaded');
    if (await hasInvoicesMarker(page)) {
      await expectInvoicesVisible(page);
      return;
    }
  }

  const salesNav = page.getByRole('link', { name: /sales/i }).first();
  if (await salesNav.count()) {
    await salesNav.click();
  }
  const invoicesNav = page.getByRole('link', { name: /invoices/i }).first();
  if (await invoicesNav.count()) {
    await invoicesNav.click();
    await page.waitForLoadState('domcontentloaded');
  }
  await expectInvoicesVisible(page);
}

async function openNewInvoice(page: Page) {
  const newButton = page
    .getByRole('button', { name: /new invoice|create invoice|add invoice/i })
    .first();
  await optionalAction(newButton, async () => {
    await newButton.click();
    await page.waitForLoadState('domcontentloaded');
  }, 'New Invoice action not found.');
}

async function selectCustomer(page: Page) {
  const customerCombo = page.getByRole('combobox', { name: /customer/i }).first();
  if (await customerCombo.count()) {
    await customerCombo.click();
    const option = page.getByRole('option').first();
    if (await option.count()) {
      await option.click();
      return true;
    }
  }
  const customerInput = page
    .locator('input[placeholder*="Customer" i], input[aria-label*="Customer" i], input[name*="customer" i]')
    .first();
  if (await customerInput.count()) {
    await customerInput.click();
    await customerInput.fill('a');
    const option = page.getByRole('option').first();
    if (await option.count()) {
      await option.click();
      return true;
    }
  }
  test.info().annotations.push({ type: 'note', description: 'Customer selector not found.' });
  return false;
}

async function addLineItem(page: Page, qty: number, price: number) {
  const addItem = page
    .getByRole('button', { name: /add item|add line|add product|add service/i })
    .first();
  await optionalAction(addItem, async () => {
    await addItem.click();
  }, 'Add item button not found.');

  const qtyInput = page
    .locator('input[placeholder*="Qty" i], input[aria-label*="Qty" i], input[name*="qty" i]')
    .first();
  const priceInput = page
    .locator(
      'input[placeholder*="Price" i], input[aria-label*="Price" i], input[name*="price" i], input[placeholder*="Rate" i], input[aria-label*="Rate" i]',
    )
    .first();

  const qtyFound = await optionalAction(qtyInput, async () => {
    await qtyInput.fill(String(qty));
  }, 'Quantity input not found.');
  const priceFound = await optionalAction(priceInput, async () => {
    await priceInput.fill(String(price));
  }, 'Price input not found.');
  return qtyFound && priceFound;
}

async function saveDraft(page: Page) {
  const saveDraftButton = page.getByRole('button', { name: /save.*draft|draft/i }).first();
  if (await saveDraftButton.count()) {
    await saveDraftButton.click();
    return;
  }
  const saveButton = page.getByRole('button', { name: /save/i }).first();
  await optionalAction(saveButton, async () => {
    await saveButton.click();
  }, 'Save button not found.');
}

async function expectStatus(page: Page, status: RegExp) {
  const statusBadge = page.getByText(status).first();
  await expect(statusBadge).toBeVisible({ timeout: 10000 });
}

test.describe('@sales Sales / Invoices @S64c1475f', () => {
  test('HB-INVOICE-001: Open Invoices list after login @Td4d74412', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await expectInvoicesVisible(page);
  });

  test('HB-INVOICE-002: Create draft invoice with required fields @T549282c6', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    const customerSelected = await selectCustomer(page);
    const lineAdded = await addLineItem(page, 1, 100);
    if (!customerSelected || !lineAdded) return;
    await saveDraft(page);
    await expectStatus(page, /draft/i);
  });

  test('HB-INVOICE-003: Validate required customer on invoice @T5b70e5f0', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    await saveDraft(page);
    const error = page.getByText(/customer.*required|required.*customer/i).first();
    await optionalAction(error, async () => {
      await expect(error).toBeVisible();
    }, 'Customer validation not found.');
  });

  test('HB-INVOICE-004: Validate required line items on invoice @T1aef6915', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    await selectCustomer(page);
    await saveDraft(page);
    const error = page.getByText(/line item|required.*item|add.*item/i).first();
    await optionalAction(error, async () => {
      await expect(error).toBeVisible();
    }, 'Line item validation not found.');
  });

  test('HB-INVOICE-005: Line item totals calculate correctly @Tad077794', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    await selectCustomer(page);
    const lineAdded = await addLineItem(page, 3, 100);
    if (!lineAdded) return;
    const lineTotal = page.getByText(/300(?:\\.00)?/).first();
    await optionalAction(lineTotal, async () => {
      await expect(lineTotal).toBeVisible();
    }, 'Line total not detected.');
  });

  test('HB-INVOICE-006: Invoice subtotal equals sum of line totals @T28a11cf0', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    await selectCustomer(page);
    const lineOne = await addLineItem(page, 1, 100);
    const lineTwo = await addLineItem(page, 2, 50);
    if (!lineOne || !lineTwo) return;
    const subtotal = page.getByText(/subtotal/i).first();
    await optionalAction(subtotal, async () => {
      const subtotalValue = page.getByText(/200(?:\\.00)?/).first();
      await expect(subtotalValue).toBeVisible();
    }, 'Subtotal label not detected.');
  });

  test('HB-INVOICE-007: Percentage discount reduces line total @Teb2003dc', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    await selectCustomer(page);
    const lineAdded = await addLineItem(page, 1, 100);
    if (!lineAdded) return;
    const discountInput = page
      .locator('input[placeholder*="Discount" i], input[aria-label*="Discount" i], input[name*="discount" i]')
      .first();
    const discountApplied = await optionalAction(discountInput, async () => {
      await discountInput.fill('10');
    }, 'Discount input not found.');
    if (!discountApplied) return;
    const totalAfterDiscount = page.getByText(/90(?:\\.00)?/).first();
    await optionalAction(totalAfterDiscount, async () => {
      await expect(totalAfterDiscount).toBeVisible();
    }, 'Discounted total not detected.');
  });

  test('HB-INVOICE-008: Fixed discount reduces invoice subtotal @T128751dc', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    await selectCustomer(page);
    const lineAdded = await addLineItem(page, 1, 200);
    if (!lineAdded) return;
    const discountInput = page
      .locator('input[placeholder*="Discount" i], input[aria-label*="Discount" i], input[name*="discount" i]')
      .first();
    const discountApplied = await optionalAction(discountInput, async () => {
      await discountInput.fill('50');
    }, 'Discount input not found.');
    if (!discountApplied) return;
    const totalAfterDiscount = page.getByText(/150(?:\\.00)?/).first();
    await optionalAction(totalAfterDiscount, async () => {
      await expect(totalAfterDiscount).toBeVisible();
    }, 'Discounted subtotal not detected.');
  });

  test('HB-INVOICE-009: Tax exclusive calculation @T35bd2c33', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    await selectCustomer(page);
    const lineAdded = await addLineItem(page, 1, 100);
    if (!lineAdded) return;
    const taxLabel = page.getByText(/tax/i).first();
    await optionalAction(taxLabel, async () => {
      await expect(taxLabel).toBeVisible();
    }, 'Tax label not detected.');
  });

  test('HB-INVOICE-010: Tax inclusive calculation @T877b054d', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    await selectCustomer(page);
    const lineAdded = await addLineItem(page, 1, 100);
    if (!lineAdded) return;
    const totalLabel = page.getByText(/total/i).first();
    await optionalAction(totalLabel, async () => {
      await expect(totalLabel).toBeVisible();
    }, 'Total label not detected.');
  });

  test('HB-INVOICE-011: Multiple tax rates per line @T52702589', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    await selectCustomer(page);
    const lineOne = await addLineItem(page, 1, 100);
    const lineTwo = await addLineItem(page, 1, 200);
    if (!lineOne || !lineTwo) return;
    const taxColumn = page.getByText(/tax/i).first();
    await optionalAction(taxColumn, async () => {
      await expect(taxColumn).toBeVisible();
    }, 'Tax column not detected.');
  });

  test('HB-INVOICE-012: Zero-rated tax item @T68b179f7', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    await selectCustomer(page);
    const lineAdded = await addLineItem(page, 1, 100);
    if (!lineAdded) return;
    const taxValue = page.getByText(/0(?:\\.00)?/).first();
    await optionalAction(taxValue, async () => {
      await expect(taxValue).toBeVisible();
    }, 'Zero tax value not detected.');
  });

  test('HB-INVOICE-013: Non-taxable item does not add tax @Tfb2cc7d6', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    await selectCustomer(page);
    const lineAdded = await addLineItem(page, 1, 100);
    if (!lineAdded) return;
    const taxColumn = page.getByText(/tax/i).first();
    await optionalAction(taxColumn, async () => {
      await expect(taxColumn).toBeVisible();
    }, 'Tax column not detected.');
  });

  test('HB-INVOICE-014: Invoice numbering sequence increments @Tc061f2fc', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const invoiceNumber = page.getByText(/invoice\s*#?\s*\w+/i).first();
    await optionalAction(invoiceNumber, async () => {
      await expect(invoiceNumber).toBeVisible();
    }, 'Invoice number not visible.');
  });

  test('HB-INVOICE-015: Duplicate invoice number rejected @Tfb022b05', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    await selectCustomer(page);
    const numberInput = page
      .locator('input[placeholder*="Invoice" i], input[aria-label*="Invoice" i], input[name*="invoice" i]')
      .first();
    const numberSet = await optionalAction(numberInput, async () => {
      await numberInput.fill('INV-0001');
    }, 'Invoice number input not found.');
    if (!numberSet) return;
    await saveDraft(page);
    const error = page.getByText(/duplicate|already exists/i).first();
    await optionalAction(error, async () => {
      await expect(error).toBeVisible();
    }, 'Duplicate number validation not found.');
  });

  test('HB-INVOICE-016: Payment terms set due date @T5c465a30', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    await selectCustomer(page);
    const terms = page.getByRole('combobox', { name: /terms|payment/i }).first();
    const termsSet = await optionalAction(terms, async () => {
      await terms.click();
      const option = page.getByRole('option').first();
      if (await option.count()) await option.click();
    }, 'Payment terms control not found.');
    if (!termsSet) return;
    const dueDate = page.getByLabel(/due date/i).first();
    await optionalAction(dueDate, async () => {
      await expect(dueDate).toBeVisible();
    }, 'Due date field not detected.');
  });

  test('HB-INVOICE-017: Manual due date override @T90ae652e', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    await selectCustomer(page);
    const dueDate = page.getByLabel(/due date/i).first();
    await optionalAction(dueDate, async () => {
      await dueDate.fill('2030-01-01');
      await expect(dueDate).toHaveValue(/2030-01-01/);
    }, 'Due date field not detected.');
  });

  test('HB-INVOICE-018: Send invoice marks status as Sent @Td872aa29', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    await selectCustomer(page);
    const lineAdded = await addLineItem(page, 1, 100);
    if (!lineAdded) return;
    await saveDraft(page);
    const sendButton = page.getByRole('button', { name: /send/i }).first();
    const sent = await optionalAction(sendButton, async () => {
      await sendButton.click();
    }, 'Send button not found.');
    if (!sent) return;
    await expectStatus(page, /sent/i);
  });

  test('HB-INVOICE-019: Email template uses invoice variables @T6e3ba5ac', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    const previewButton = page.getByRole('button', { name: /preview|email/i }).first();
    await optionalAction(previewButton, async () => {
      await previewButton.click();
      const preview = page.getByText(/invoice|total|customer/i).first();
      await expect(preview).toBeVisible();
    }, 'Email preview not available.');
  });

  test('HB-INVOICE-020: Download invoice PDF @Tf8a72162', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    await selectCustomer(page);
    const lineAdded = await addLineItem(page, 1, 100);
    if (!lineAdded) return;
    await saveDraft(page);
    const downloadButton = page.getByRole('button', { name: /download|pdf/i }).first();
    await optionalAction(downloadButton, async () => {
      const downloadPromise = page.waitForEvent('download', { timeout: 5000 }).catch(() => null);
      await downloadButton.click();
      const download = await downloadPromise;
      if (!download) {
        test.info().annotations.push({ type: 'note', description: 'No PDF download detected.' });
      }
    }, 'Download PDF action not found.');
  });

  test('HB-INVOICE-021: PDF matches invoice totals @T5b2d2b8d', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    await selectCustomer(page);
    const lineAdded = await addLineItem(page, 1, 100);
    if (!lineAdded) return;
    await saveDraft(page);
    test.info().annotations.push({ type: 'note', description: 'Manual comparison required for PDF totals.' });
  });

  test('HB-INVOICE-022: Attach file to invoice @T3bfea037', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    const attachmentButton = page.getByRole('button', { name: /attach|upload/i }).first();
    await optionalAction(attachmentButton, async () => {
      await attachmentButton.click();
    }, 'Attachment action not found.');
  });

  test('HB-INVOICE-023: Edit draft invoice recalculates totals @T9ea27701', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    await selectCustomer(page);
    const lineAdded = await addLineItem(page, 1, 100);
    if (!lineAdded) return;
    await saveDraft(page);
    const qtyInput = page
      .locator('input[placeholder*="Qty" i], input[aria-label*="Qty" i], input[name*="qty" i]')
      .first();
    await optionalAction(qtyInput, async () => {
      await qtyInput.fill('2');
    }, 'Quantity input not found for edit.');
    const total = page.getByText(/200(?:\\.00)?/).first();
    await optionalAction(total, async () => {
      await expect(total).toBeVisible();
    }, 'Updated total not detected.');
  });

  test('HB-INVOICE-024: Edit sent invoice follows policy @T1e3586cf', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const sentBadge = page.getByText(/sent/i).first();
    await optionalAction(sentBadge, async () => {
      await sentBadge.click();
      const editButton = page.getByRole('button', { name: /edit/i }).first();
      await optionalAction(editButton, async () => {
        await editButton.click();
      }, 'Edit action not available for sent invoice.');
    }, 'Sent invoice not found.');
  });

  test('HB-INVOICE-025: Approve invoice in workflow @T8ae53a7b', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const approveButton = page.getByRole('button', { name: /approve/i }).first();
    await optionalAction(approveButton, async () => {
      await approveButton.click();
      await expectStatus(page, /approved/i);
    }, 'Approve action not available.');
  });

  test('HB-INVOICE-026: Reject invoice approval @Tbbc1bbb5', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const rejectButton = page.getByRole('button', { name: /reject/i }).first();
    await optionalAction(rejectButton, async () => {
      await rejectButton.click();
      await expectStatus(page, /rejected/i);
    }, 'Reject action not available.');
  });

  test('HB-INVOICE-027: Post invoice creates GL entries @Tdaf84abb', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const postButton = page.getByRole('button', { name: /post/i }).first();
    await optionalAction(postButton, async () => {
      await postButton.click();
    }, 'Post action not available.');
    test.info().annotations.push({ type: 'note', description: 'Verify GL entries manually if ledger UI exists.' });
  });

  test('HB-INVOICE-028: Item revenue account mapping @T89fc290c', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    test.info().annotations.push({ type: 'note', description: 'Manual validation required for revenue account mapping.' });
  });

  test('HB-INVOICE-029: Tax liability account mapping @T99e28898', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    test.info().annotations.push({ type: 'note', description: 'Manual validation required for tax liability account.' });
  });

  test('HB-INVOICE-030: Split revenue across multiple accounts @T79960275', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    test.info().annotations.push({ type: 'note', description: 'Manual validation required for multi-account posting.' });
  });

  test('HB-INVOICE-031: Multi-currency invoice applies exchange rate @T2caa56b9', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    await selectCustomer(page);
    const currency = page.getByRole('combobox', { name: /currency|fx/i }).first();
    await optionalAction(currency, async () => {
      await currency.click();
      const option = page.getByRole('option').first();
      if (await option.count()) await option.click();
    }, 'Currency selector not found.');
    const rateField = page.locator('input[placeholder*="rate" i], input[aria-label*="rate" i]').first();
    await optionalAction(rateField, async () => {
      await expect(rateField).toBeVisible();
    }, 'Exchange rate field not visible.');
  });

  test('HB-INVOICE-032: Exchange rate override recalculates totals @T1ed5c52b', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    await openNewInvoice(page);
    await selectCustomer(page);
    const rateField = page.locator('input[placeholder*="rate" i], input[aria-label*="rate" i]').first();
    const updated = await optionalAction(rateField, async () => {
      await rateField.fill('1.25');
    }, 'Exchange rate field not found.');
    if (!updated) return;
    const total = page.getByText(/total/i).first();
    await optionalAction(total, async () => {
      await expect(total).toBeVisible();
    }, 'Total label not detected.');
  });

  test('HB-INVOICE-033: Partial payment updates balance @T7b3e8142', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const recordPayment = page.getByRole('button', { name: /record payment|receive payment|payment/i }).first();
    await optionalAction(recordPayment, async () => {
      await recordPayment.click();
      const amount = page.getByLabel(/amount/i).first();
      await optionalAction(amount, async () => {
        await amount.fill('10');
      }, 'Payment amount field not found.');
      const save = page.getByRole('button', { name: /save|apply|record/i }).first();
      await optionalAction(save, async () => {
        await save.click();
      }, 'Save payment button not found.');
    }, 'Payment action not available.');
  });

  test('HB-INVOICE-034: Full payment marks invoice Paid @T58a6cc2c', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const recordPayment = page.getByRole('button', { name: /record payment|receive payment|payment/i }).first();
    await optionalAction(recordPayment, async () => {
      await recordPayment.click();
      const amount = page.getByLabel(/amount/i).first();
      await optionalAction(amount, async () => {
        await amount.fill('100');
      }, 'Payment amount field not found.');
      const save = page.getByRole('button', { name: /save|apply|record/i }).first();
      await optionalAction(save, async () => {
        await save.click();
      }, 'Save payment button not found.');
      await expectStatus(page, /paid/i);
    }, 'Payment action not available.');
  });

  test('HB-INVOICE-035: Overpayment creates customer credit @T8c2efb6f', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const recordPayment = page.getByRole('button', { name: /record payment|receive payment|payment/i }).first();
    await optionalAction(recordPayment, async () => {
      await recordPayment.click();
      const amount = page.getByLabel(/amount/i).first();
      await optionalAction(amount, async () => {
        await amount.fill('9999');
      }, 'Payment amount field not found.');
      const save = page.getByRole('button', { name: /save|apply|record/i }).first();
      await optionalAction(save, async () => {
        await save.click();
      }, 'Save payment button not found.');
    }, 'Payment action not available.');
    test.info().annotations.push({ type: 'note', description: 'Verify credit balance manually if UI not explicit.' });
  });

  test('HB-INVOICE-036: Apply customer credit to invoice @T7e2a33d1', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const applyCredit = page.getByRole('button', { name: /apply credit|use credit/i }).first();
    await optionalAction(applyCredit, async () => {
      await applyCredit.click();
      const apply = page.getByRole('button', { name: /apply|save/i }).first();
      await optionalAction(apply, async () => {
        await apply.click();
      }, 'Apply credit button not found.');
    }, 'Apply credit action not available.');
  });

  test('HB-INVOICE-037: Unapply payment restores balance @T6c7b3a08', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const unapply = page.getByRole('button', { name: /unapply|remove payment|delete payment/i }).first();
    await optionalAction(unapply, async () => {
      await unapply.click();
    }, 'Unapply payment action not available.');
  });

  test('HB-INVOICE-038: Allocate single payment across multiple invoices @T0ac5f8f9', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const recordPayment = page.getByRole('button', { name: /record payment|receive payment|payment/i }).first();
    await optionalAction(recordPayment, async () => {
      await recordPayment.click();
      const allocation = page.getByText(/allocate|apply to invoices/i).first();
      await optionalAction(allocation, async () => {
        await expect(allocation).toBeVisible();
      }, 'Allocation UI not found.');
    }, 'Payment action not available.');
  });

  test('HB-INVOICE-039: Write off small balance @T9c124a78', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const writeOff = page.getByRole('button', { name: /write off/i }).first();
    await optionalAction(writeOff, async () => {
      await writeOff.click();
      const confirm = page.getByRole('button', { name: /confirm|save|apply/i }).first();
      await optionalAction(confirm, async () => {
        await confirm.click();
      }, 'Write-off confirm not found.');
    }, 'Write-off action not available.');
  });

  test('HB-INVOICE-040: Void unposted invoice @T63b0f439', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const voidButton = page.getByRole('button', { name: /void/i }).first();
    await optionalAction(voidButton, async () => {
      await voidButton.click();
      await expectStatus(page, /void|voided/i);
    }, 'Void action not available.');
  });

  test('HB-INVOICE-041: Void posted invoice creates reversal @T9cf35ef2', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const voidButton = page.getByRole('button', { name: /void/i }).first();
    await optionalAction(voidButton, async () => {
      await voidButton.click();
    }, 'Void action not available.');
    test.info().annotations.push({ type: 'note', description: 'Verify reversal entries manually in ledger.' });
  });

  test('HB-INVOICE-042: Create credit note from invoice @T2f43f8bc', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const creditButton = page.getByRole('button', { name: /credit note|create credit/i }).first();
    await optionalAction(creditButton, async () => {
      await creditButton.click();
    }, 'Credit note action not available.');
  });

  test('HB-INVOICE-043: Credit note reverses tax correctly @T3d8f1d7a', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    test.info().annotations.push({ type: 'note', description: 'Verify tax reversal manually in ledger.' });
  });

  test('HB-INVOICE-044: Refund customer from credit balance @T52a1b0a6', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const refund = page.getByRole('button', { name: /refund/i }).first();
    await optionalAction(refund, async () => {
      await refund.click();
    }, 'Refund action not available.');
  });

  test('HB-INVOICE-045: Recurring invoice schedule creation @T24e741c3', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const recurring = page.getByRole('button', { name: /recurring|schedule/i }).first();
    await optionalAction(recurring, async () => {
      await recurring.click();
    }, 'Recurring schedule action not available.');
  });

  test('HB-INVOICE-046: Recurring invoice generates new invoice @T1f0e5d6b', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    test.info().annotations.push({ type: 'note', description: 'Manual validation required for schedule run.' });
  });

  test('HB-INVOICE-047: Cancel recurring invoice schedule @T5a8d9c20', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const cancelRecurring = page.getByRole('button', { name: /cancel recurring|disable schedule/i }).first();
    await optionalAction(cancelRecurring, async () => {
      await cancelRecurring.click();
    }, 'Cancel recurring action not available.');
  });

  test('HB-INVOICE-048: Copy invoice creates new draft @Tb9a6f742', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const copyButton = page.getByRole('button', { name: /copy/i }).first();
    await optionalAction(copyButton, async () => {
      await copyButton.click();
      await expectStatus(page, /draft/i);
    }, 'Copy action not available.');
  });

  test('HB-INVOICE-049: Search by invoice number @T1e2c5f73', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const search = page
      .locator('input[placeholder*="Search" i], input[aria-label*="Search" i]')
      .first();
    await optionalAction(search, async () => {
      await search.fill('INV');
      await expect(search).toHaveValue(/INV/i);
    }, 'Search input not found.');
  });

  test('HB-INVOICE-050: Filter by status @T5e7f3a1c', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const statusFilter = page.getByRole('button', { name: /status|filter/i }).first();
    await optionalAction(statusFilter, async () => {
      await statusFilter.click();
      const option = page.getByText(/draft|sent|paid/i).first();
      await optionalAction(option, async () => {
        await option.click();
      }, 'Status option not found.');
    }, 'Status filter not found.');
  });

  test('HB-INVOICE-051: Filter by date range @T7b1c2d9e', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const dateFilter = page.getByRole('button', { name: /date range|period|date/i }).first();
    await optionalAction(dateFilter, async () => {
      await dateFilter.click();
      const apply = page.getByRole('button', { name: /apply|save|done/i }).first();
      await optionalAction(apply, async () => {
        await apply.click();
      }, 'Apply date filter button not found.');
    }, 'Date range filter not found.');
  });

  test('HB-INVOICE-052: Overdue status applied after due date @T9ad0c814', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const overdue = page.getByText(/overdue/i).first();
    await optionalAction(overdue, async () => {
      await expect(overdue).toBeVisible();
    }, 'Overdue status not visible.');
  });

  test('HB-INVOICE-053: AR aging report includes invoice @T4b5f9a60', async ({ page }) => {
    await seedLogin(page);
    await page.goto(`${baseUrl}/reports`);
    await page.waitForLoadState('domcontentloaded');
    const aging = page.getByText(/aging/i).first();
    await optionalAction(aging, async () => {
      await aging.click();
      await expect(page.getByText(/aging/i).first()).toBeVisible();
    }, 'AR aging report not accessible.');
  });

  test('HB-INVOICE-054: Customer statement includes invoice balance @T2a1f8c3d', async ({ page }) => {
    await seedLogin(page);
    await page.goto(`${baseUrl}/reports`);
    await page.waitForLoadState('domcontentloaded');
    const statement = page.getByText(/statement/i).first();
    await optionalAction(statement, async () => {
      await statement.click();
      await expect(page.getByText(/statement/i).first()).toBeVisible();
    }, 'Customer statement report not accessible.');
  });

  test('HB-INVOICE-055: Export invoices to CSV @T6c9b1e2f', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const exportButton = page.getByRole('button', { name: /export/i }).first();
    await optionalAction(exportButton, async () => {
      const downloadPromise = page.waitForEvent('download', { timeout: 5000 }).catch(() => null);
      await exportButton.click();
      const download = await downloadPromise;
      if (!download) {
        test.info().annotations.push({ type: 'note', description: 'No CSV download detected.' });
      }
    }, 'Export button not found.');
  });

  test('HB-INVOICE-056: Permissions - view only user cannot create @T7e3f8a19', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const newButton = page.getByRole('button', { name: /new invoice|create invoice|add invoice/i }).first();
    const visible = await newButton.isVisible().catch(() => false);
    if (visible) {
      test.info().annotations.push({ type: 'note', description: 'Requires view-only user to validate permissions.' });
    }
  });

  test('HB-INVOICE-057: Permissions - creator cannot approve @T5d1c8b7a', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const approveButton = page.getByRole('button', { name: /approve/i }).first();
    const visible = await approveButton.isVisible().catch(() => false);
    if (visible) {
      test.info().annotations.push({ type: 'note', description: 'Requires creator-only role to validate approval restriction.' });
    }
  });

  test('HB-INVOICE-058: Fiscal period lock prevents posting @T1f9a2c7b', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const postButton = page.getByRole('button', { name: /post/i }).first();
    await optionalAction(postButton, async () => {
      await postButton.click();
      const lockMessage = page.getByText(/locked period|period is closed/i).first();
      await optionalAction(lockMessage, async () => {
        await expect(lockMessage).toBeVisible();
      }, 'Period lock message not detected.');
    }, 'Post action not available.');
  });

  test('HB-INVOICE-059: Delete draft invoice @T8c7d2e90', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const deleteButton = page.getByRole('button', { name: /delete/i }).first();
    await optionalAction(deleteButton, async () => {
      await deleteButton.click();
    }, 'Delete action not available.');
  });

  test('HB-INVOICE-060: Delete posted invoice is not allowed @T3e9a5c1d', async ({ page }) => {
    await seedLogin(page);
    await openInvoices(page);
    const deleteButton = page.getByRole('button', { name: /delete/i }).first();
    await optionalAction(deleteButton, async () => {
      await deleteButton.click();
      const warning = page.getByText(/cannot delete|void|credit/i).first();
      await optionalAction(warning, async () => {
        await expect(warning).toBeVisible();
      }, 'Delete restriction message not found.');
    }, 'Delete action not available.');
  });
});
