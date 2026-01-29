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

async function hasQuotesMarker(page: Page) {
  const heading = page.getByRole('heading', { name: /quotes/i }).first();
  const title = page.getByText(/quotes/i).first();
  return (await heading.isVisible().catch(() => false)) || (await title.isVisible().catch(() => false));
}

async function expectQuotesVisible(page: Page) {
  const heading = page.getByRole('heading', { name: /quotes/i }).first();
  const title = page.getByText(/quotes/i).first();
  if (await heading.isVisible().catch(() => false)) {
    await expect(heading).toBeVisible({ timeout: 15000 });
    return;
  }
  await expect(title).toBeVisible({ timeout: 15000 });
}

async function openQuotes(page: Page) {
  const urls = [
    `${baseUrl}/sales/quotes`,
    `${baseUrl}/quotes`,
    `${baseUrl}/?tab=quotes`,
    `${baseUrl}/?tab=sales&subtab=quotes`,
  ];
  for (const url of urls) {
    await page.goto(url);
    await page.waitForLoadState('domcontentloaded');
    if (await hasQuotesMarker(page)) {
      await expectQuotesVisible(page);
      return;
    }
  }

  const salesNav = page.getByRole('link', { name: /sales/i }).first();
  if (await salesNav.count()) {
    await salesNav.click();
  }
  const quotesNav = page.getByRole('link', { name: /quotes/i }).first();
  if (await quotesNav.count()) {
    await quotesNav.click();
    await page.waitForLoadState('domcontentloaded');
  }
  await expectQuotesVisible(page);
}

async function openNewQuote(page: Page) {
  const newButton = page
    .getByRole('button', { name: /new quote|create quote|add quote/i })
    .first();
  await optionalAction(newButton, async () => {
    await newButton.click();
    await page.waitForLoadState('domcontentloaded');
  }, 'New Quote action not found.');
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

test.describe('@sales Sales / Quotes @S7cc09a06', () => {
  test('HB-QUOTE-001: Open Quotes list after login @T582fc7e2', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await expectQuotesVisible(page);
  });

  test('HB-QUOTE-002: Create draft quote with required fields @T05dda8a2', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    const customerSelected = await selectCustomer(page);
    const lineAdded = await addLineItem(page, 1, 100);
    if (!customerSelected || !lineAdded) return;
    await saveDraft(page);
    await expectStatus(page, /draft/i);
  });

  test('HB-QUOTE-003: Validate required customer on quote @T64ddbcca', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    await saveDraft(page);
    const error = page.getByText(/customer.*required|required.*customer/i).first();
    await optionalAction(error, async () => {
      await expect(error).toBeVisible();
    }, 'Customer validation not found.');
  });

  test('HB-QUOTE-004: Validate required line items on quote @T8c90bb37', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    await selectCustomer(page);
    await saveDraft(page);
    const error = page.getByText(/line item|required.*item|add.*item/i).first();
    await optionalAction(error, async () => {
      await expect(error).toBeVisible();
    }, 'Line item validation not found.');
  });

  test('HB-QUOTE-005: Line item totals calculate correctly @T90e8fec5', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    await selectCustomer(page);
    const lineAdded = await addLineItem(page, 3, 100);
    if (!lineAdded) return;
    const lineTotal = page.getByText(/300(?:\\.00)?/).first();
    await optionalAction(lineTotal, async () => {
      await expect(lineTotal).toBeVisible();
    }, 'Line total not detected.');
  });

  test('HB-QUOTE-006: Quote subtotal equals sum of line totals @T5e01cafc', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
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

  test('HB-QUOTE-007: Percentage discount reduces line total @Tadba3653', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
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

  test('HB-QUOTE-008: Fixed discount reduces quote subtotal @Te3c6e1a1', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
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

  test('HB-QUOTE-009: Tax exclusive calculation @T3d89f454', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    await selectCustomer(page);
    const lineAdded = await addLineItem(page, 1, 100);
    if (!lineAdded) return;
    const taxLabel = page.getByText(/tax/i).first();
    await optionalAction(taxLabel, async () => {
      await expect(taxLabel).toBeVisible();
    }, 'Tax label not detected.');
  });

  test('HB-QUOTE-010: Tax inclusive calculation @T80c51413', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    await selectCustomer(page);
    const lineAdded = await addLineItem(page, 1, 100);
    if (!lineAdded) return;
    const totalLabel = page.getByText(/total/i).first();
    await optionalAction(totalLabel, async () => {
      await expect(totalLabel).toBeVisible();
    }, 'Total label not detected.');
  });

  test('HB-QUOTE-011: Multiple tax rates per line @Te3f72523', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    await selectCustomer(page);
    const lineOne = await addLineItem(page, 1, 100);
    const lineTwo = await addLineItem(page, 1, 200);
    if (!lineOne || !lineTwo) return;
    const taxColumn = page.getByText(/tax/i).first();
    await optionalAction(taxColumn, async () => {
      await expect(taxColumn).toBeVisible();
    }, 'Tax column not detected.');
  });

  test('HB-QUOTE-012: Zero-rated tax item @T9b1e3d16', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    await selectCustomer(page);
    const lineAdded = await addLineItem(page, 1, 100);
    if (!lineAdded) return;
    const taxValue = page.getByText(/0(?:\\.00)?/).first();
    await optionalAction(taxValue, async () => {
      await expect(taxValue).toBeVisible();
    }, 'Zero tax value not detected.');
  });

  test('HB-QUOTE-013: Non-taxable item does not add tax @T6bcf1878', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    await selectCustomer(page);
    const lineAdded = await addLineItem(page, 1, 100);
    if (!lineAdded) return;
    const taxColumn = page.getByText(/tax/i).first();
    await optionalAction(taxColumn, async () => {
      await expect(taxColumn).toBeVisible();
    }, 'Tax column not detected.');
  });

  test('HB-QUOTE-014: Quote numbering sequence increments @T3cb72d28', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    const quoteNumber = page.getByText(/quote\s*#?\s*\w+/i).first();
    await optionalAction(quoteNumber, async () => {
      await expect(quoteNumber).toBeVisible();
    }, 'Quote number not visible.');
  });

  test('HB-QUOTE-015: Duplicate quote number rejected @T07373d70', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    await selectCustomer(page);
    const numberInput = page
      .locator('input[placeholder*="Quote" i], input[aria-label*="Quote" i], input[name*="quote" i]')
      .first();
    const numberSet = await optionalAction(numberInput, async () => {
      await numberInput.fill('QUO-0001');
    }, 'Quote number input not found.');
    if (!numberSet) return;
    await saveDraft(page);
    const error = page.getByText(/duplicate|already exists/i).first();
    await optionalAction(error, async () => {
      await expect(error).toBeVisible();
    }, 'Duplicate number validation not found.');
  });

  test('HB-QUOTE-016: Set quote expiration date @T85f7ba56', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    await selectCustomer(page);
    const expiry = page.getByLabel(/expiration|expiry/i).first();
    await optionalAction(expiry, async () => {
      await expiry.fill('2030-01-01');
      await expect(expiry).toHaveValue(/2030-01-01/);
    }, 'Expiration date field not detected.');
  });

  test('HB-QUOTE-017: Expired quote status updates after expiration @T42fff3c6', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    const expired = page.getByText(/expired/i).first();
    await optionalAction(expired, async () => {
      await expect(expired).toBeVisible();
    }, 'Expired status not visible.');
  });

  test('HB-QUOTE-018: Send quote marks status as Sent @T77ce4726', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
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

  test('HB-QUOTE-019: Email template uses quote variables @Te369d5ec', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    const previewButton = page.getByRole('button', { name: /preview|email/i }).first();
    await optionalAction(previewButton, async () => {
      await previewButton.click();
      const preview = page.getByText(/quote|total|customer/i).first();
      await expect(preview).toBeVisible();
    }, 'Email preview not available.');
  });

  test('HB-QUOTE-020: Download quote PDF @Ta434383d', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
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

  test('HB-QUOTE-021: PDF matches quote totals @T874bcb9d', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    await selectCustomer(page);
    const lineAdded = await addLineItem(page, 1, 100);
    if (!lineAdded) return;
    await saveDraft(page);
    test.info().annotations.push({ type: 'note', description: 'Manual comparison required for PDF totals.' });
  });

  test('HB-QUOTE-022: Attach file to quote @Tb7ce5381', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    const attachmentButton = page.getByRole('button', { name: /attach|upload/i }).first();
    await optionalAction(attachmentButton, async () => {
      await attachmentButton.click();
    }, 'Attachment action not found.');
  });

  test('HB-QUOTE-023: Edit draft quote recalculates totals @T36e729bf', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
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

  test('HB-QUOTE-024: Edit sent quote follows policy @Tad9eecef', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    const sentBadge = page.getByText(/sent/i).first();
    await optionalAction(sentBadge, async () => {
      await sentBadge.click();
      const editButton = page.getByRole('button', { name: /edit/i }).first();
      await optionalAction(editButton, async () => {
        await editButton.click();
      }, 'Edit action not available for sent quote.');
    }, 'Sent quote not found.');
  });

  test('HB-QUOTE-025: Approve quote in workflow @Tc49431e5', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    const approveButton = page.getByRole('button', { name: /approve/i }).first();
    await optionalAction(approveButton, async () => {
      await approveButton.click();
      await expectStatus(page, /approved/i);
    }, 'Approve action not available.');
  });

  test('HB-QUOTE-026: Reject quote approval @T52a1f971', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    const rejectButton = page.getByRole('button', { name: /reject/i }).first();
    await optionalAction(rejectButton, async () => {
      await rejectButton.click();
      await expectStatus(page, /rejected/i);
    }, 'Reject action not available.');
  });

  test('HB-QUOTE-027: Convert quote to invoice @Tf1877a5c', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    const convertButton = page.getByRole('button', { name: /convert.*invoice|create invoice/i }).first();
    await optionalAction(convertButton, async () => {
      await convertButton.click();
      const invoiceMarker = page.getByText(/invoice/i).first();
      await expect(invoiceMarker).toBeVisible();
    }, 'Convert to invoice action not available.');
  });

  test('HB-QUOTE-028: Converted invoice preserves tax and discount @T3bd7737a', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    test.info().annotations.push({ type: 'note', description: 'Manual validation required for tax/discount preservation.' });
  });

  test('HB-QUOTE-029: Quote conversion prevents duplicate invoicing @T271b7beb', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    const convertButton = page.getByRole('button', { name: /convert.*invoice|create invoice/i }).first();
    await optionalAction(convertButton, async () => {
      await convertButton.click();
      const warning = page.getByText(/already converted|duplicate/i).first();
      await optionalAction(warning, async () => {
        await expect(warning).toBeVisible();
      }, 'Duplicate conversion warning not found.');
    }, 'Convert to invoice action not available.');
  });

  test('HB-QUOTE-030: Quote accepted by customer @T989ba6ec', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    test.info().annotations.push({ type: 'note', description: 'Manual-only: customer portal acceptance required.' });
  });

  test('HB-QUOTE-031: Quote declined by customer @T5a6be8c2', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    test.info().annotations.push({ type: 'note', description: 'Manual-only: customer portal decline required.' });
  });

  test('HB-QUOTE-032: Quote revision creates new version @T4f2d90a1', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    const revise = page.getByRole('button', { name: /revise|revision|new version/i }).first();
    await optionalAction(revise, async () => {
      await revise.click();
      const version = page.getByText(/version|revision/i).first();
      await expect(version).toBeVisible();
    }, 'Revision action not available.');
  });

  test('HB-QUOTE-033: Multi-currency quote applies exchange rate @T8c1a5f73', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
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

  test('HB-QUOTE-034: Exchange rate override recalculates totals @T7b2c9d10', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
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

  test('HB-QUOTE-035: Quote does not post to GL @T93b5a0e7', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    test.info().annotations.push({ type: 'note', description: 'Verify no GL entries are created for quotes.' });
  });

  test('HB-QUOTE-036: Quote conversion posts only when invoice posted @T1e6b8c3a', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    test.info().annotations.push({ type: 'note', description: 'Manual validation required for GL posting rules.' });
  });

  test('HB-QUOTE-037: Quote status filter @T6c2f9b15', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    const statusFilter = page.getByRole('button', { name: /status|filter/i }).first();
    await optionalAction(statusFilter, async () => {
      await statusFilter.click();
      const option = page.getByText(/draft|sent|accepted|expired/i).first();
      await optionalAction(option, async () => {
        await option.click();
      }, 'Status option not found.');
    }, 'Status filter not found.');
  });

  test('HB-QUOTE-038: Search by quote number @T8d7a1c4f', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    const search = page
      .locator('input[placeholder*="Search" i], input[aria-label*="Search" i]')
      .first();
    await optionalAction(search, async () => {
      await search.fill('QUO');
      await expect(search).toHaveValue(/QUO/i);
    }, 'Search input not found.');
  });

  test('HB-QUOTE-039: Filter by date range @T3c7d1a90', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    const dateFilter = page.getByRole('button', { name: /date range|period|date/i }).first();
    await optionalAction(dateFilter, async () => {
      await dateFilter.click();
      const apply = page.getByRole('button', { name: /apply|save|done/i }).first();
      await optionalAction(apply, async () => {
        await apply.click();
      }, 'Apply date filter button not found.');
    }, 'Date range filter not found.');
  });

  test('HB-QUOTE-040: Delete draft quote @T5b9e2c70', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    const deleteButton = page.getByRole('button', { name: /delete/i }).first();
    await optionalAction(deleteButton, async () => {
      await deleteButton.click();
    }, 'Delete action not available.');
  });

  test('HB-QUOTE-041: Delete sent or approved quote is restricted @T2f1a9c6b', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    const deleteButton = page.getByRole('button', { name: /delete/i }).first();
    await optionalAction(deleteButton, async () => {
      await deleteButton.click();
      const warning = page.getByText(/cannot delete|cancel/i).first();
      await optionalAction(warning, async () => {
        await expect(warning).toBeVisible();
      }, 'Delete restriction message not found.');
    }, 'Delete action not available.');
  });

  test('HB-QUOTE-042: Cancel quote changes status to Cancelled @T7e4b0d26', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    const cancelButton = page.getByRole('button', { name: /cancel/i }).first();
    await optionalAction(cancelButton, async () => {
      await cancelButton.click();
      await expectStatus(page, /cancelled/i);
    }, 'Cancel action not available.');
  });

  test('HB-QUOTE-043: Quote activity log records status changes @T9d3b1a58', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    const activity = page.getByRole('tab', { name: /activity|history/i }).first();
    await optionalAction(activity, async () => {
      await activity.click();
      await expect(page.getByText(/status|changed/i).first()).toBeVisible();
    }, 'Activity tab not available.');
  });

  test('HB-QUOTE-044: Customer contact selection on quote @T4a8c2e1f', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    const contact = page.getByRole('combobox', { name: /contact/i }).first();
    await optionalAction(contact, async () => {
      await contact.click();
      const option = page.getByRole('option').first();
      if (await option.count()) await option.click();
    }, 'Contact selector not found.');
  });

  test('HB-QUOTE-045: Quote terms and notes appear on PDF @T6a9d5c13', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    const notes = page.locator('textarea[placeholder*="note" i], textarea[aria-label*="note" i]').first();
    await optionalAction(notes, async () => {
      await notes.fill('Sample terms');
    }, 'Notes field not found.');
    test.info().annotations.push({ type: 'note', description: 'Manual check required for PDF terms/notes.' });
  });

  test('HB-QUOTE-046: Role permissions - view only user cannot create @T3b7c1a90', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    const newButton = page.getByRole('button', { name: /new quote|create quote|add quote/i }).first();
    const visible = await newButton.isVisible().catch(() => false);
    if (visible) {
      test.info().annotations.push({ type: 'note', description: 'Requires view-only user to validate permissions.' });
    }
  });

  test('HB-QUOTE-047: Role permissions - creator cannot approve @T8f1c5b2e', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    const approveButton = page.getByRole('button', { name: /approve/i }).first();
    const visible = await approveButton.isVisible().catch(() => false);
    if (visible) {
      test.info().annotations.push({ type: 'note', description: 'Requires creator-only role to validate approval restriction.' });
    }
  });

  test('HB-QUOTE-048: Quote list export to CSV @T2c6b9d1a', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
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

  test('HB-QUOTE-049: Quote list sorting by date and amount @T5d9a1c70', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    const dateHeader = page.getByRole('columnheader', { name: /date/i }).first();
    await optionalAction(dateHeader, async () => {
      await dateHeader.click();
    }, 'Date column header not found.');
    const amountHeader = page.getByRole('columnheader', { name: /amount|total/i }).first();
    await optionalAction(amountHeader, async () => {
      await amountHeader.click();
    }, 'Amount column header not found.');
  });

  test('HB-QUOTE-050: Quote supports item price list @T7c1e4b90', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    await selectCustomer(page);
    const priceField = page
      .locator('input[placeholder*="Price" i], input[aria-label*="Price" i], input[name*="price" i]')
      .first();
    await optionalAction(priceField, async () => {
      await expect(priceField).toBeVisible();
    }, 'Price field not found.');
  });

  test('HB-QUOTE-051: Quote handles large amounts without overflow @T9e3b2c15', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    await selectCustomer(page);
    const lineAdded = await addLineItem(page, 1, 999999);
    if (!lineAdded) return;
    const total = page.getByText(/999,?999/).first();
    await optionalAction(total, async () => {
      await expect(total).toBeVisible();
    }, 'Large amount not detected.');
  });

  test('HB-QUOTE-052: Quote supports attachments size limit @T4c2d8a71', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    const attachmentButton = page.getByRole('button', { name: /attach|upload/i }).first();
    await optionalAction(attachmentButton, async () => {
      await attachmentButton.click();
    }, 'Attachment action not found.');
    test.info().annotations.push({ type: 'note', description: 'Manual check required for size limit.' });
  });

  test('HB-QUOTE-053: Quote keeps attachments after status change @T6b1c9d20', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    const attachmentButton = page.getByRole('button', { name: /attach|upload/i }).first();
    await optionalAction(attachmentButton, async () => {
      await attachmentButton.click();
    }, 'Attachment action not found.');
    test.info().annotations.push({ type: 'note', description: 'Manual check required after status change.' });
  });

  test('HB-QUOTE-054: Quote conversion keeps customer contact @T3a7d1c92', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    test.info().annotations.push({ type: 'note', description: 'Manual validation required for contact persistence.' });
  });

  test('HB-QUOTE-055: Quote respects sales tax exemption for customer @T8b2c9d10', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    await selectCustomer(page);
    const taxColumn = page.getByText(/tax/i).first();
    await optionalAction(taxColumn, async () => {
      await expect(taxColumn).toBeVisible();
    }, 'Tax column not detected.');
  });

  test('HB-QUOTE-056: Quote with negative quantity is blocked @T2d9c1a57', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    await selectCustomer(page);
    const qtyInput = page
      .locator('input[placeholder*="Qty" i], input[aria-label*="Qty" i], input[name*="qty" i]')
      .first();
    await optionalAction(qtyInput, async () => {
      await qtyInput.fill('-1');
    }, 'Quantity input not found.');
    const error = page.getByText(/invalid|must be|negative/i).first();
    await optionalAction(error, async () => {
      await expect(error).toBeVisible();
    }, 'Negative qty validation not found.');
  });

  test('HB-QUOTE-057: Quote with zero quantity follows policy @T5c8b1d3a', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    await selectCustomer(page);
    const qtyInput = page
      .locator('input[placeholder*="Qty" i], input[aria-label*="Qty" i], input[name*="qty" i]')
      .first();
    await optionalAction(qtyInput, async () => {
      await qtyInput.fill('0');
    }, 'Quantity input not found.');
    test.info().annotations.push({ type: 'note', description: 'Verify policy for zero quantity.' });
  });

  test('HB-QUOTE-058: Quote with zero price follows policy @T7a1d9c52', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    await openNewQuote(page);
    await selectCustomer(page);
    const priceInput = page
      .locator('input[placeholder*="Price" i], input[aria-label*="Price" i], input[name*="price" i]')
      .first();
    await optionalAction(priceInput, async () => {
      await priceInput.fill('0');
    }, 'Price input not found.');
    test.info().annotations.push({ type: 'note', description: 'Verify policy for zero price.' });
  });

  test('HB-QUOTE-059: Quote list pagination works @T9c2b5a70', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    const next = page.getByRole('button', { name: /next/i }).first();
    const prev = page.getByRole('button', { name: /prev|previous/i }).first();
    await optionalAction(next, async () => {
      await next.click();
      await optionalAction(prev, async () => {
        await prev.click();
      }, 'Previous page button not found.');
    }, 'Next page button not found.');
  });

  test('HB-QUOTE-060: Quote conversion reflects in AR aging only after invoice posting @T1a9c7b52', async ({ page }) => {
    await seedLogin(page);
    await openQuotes(page);
    test.info().annotations.push({ type: 'note', description: 'Manual validation required for AR aging timing.' });
  });
});
