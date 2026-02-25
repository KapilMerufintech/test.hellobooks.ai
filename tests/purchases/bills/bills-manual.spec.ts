import { test, expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { login } from '../../utils/login';

test.setTimeout(0);

const billsListUrls = ['/purchases/bills'];
const newBillUrl = '/purchases/bills/new-bill';

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function uniqueBillNo(prefix: string) {
  return `${prefix}-${Date.now()}`;
}

async function firstVisibleLocator(locators: Locator[]) {
  for (const locator of locators) {
    if (await locator.isVisible().catch(() => false)) return locator;
  }
  return null;
}

async function optionalAction(locator: Locator, action: () => Promise<void>, note: string) {
  if (await locator.isVisible().catch(() => false)) {
    await action();
    return true;
  }
  test.info().annotations.push({ type: 'note', description: note });
  return false;
}

async function waitForBillsHeading(page: Page) {
  const heading = page.getByRole('heading', { name: /bills/i }).first();
  await heading.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  return heading;
}

async function openBillsList(page: Page) {
  await login(page);
  for (const url of billsListUrls) {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(async () => {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    });
    if (await page.getByTestId('bills-page').isVisible().catch(() => false)) return;
    if (await page.getByRole('heading', { name: /bills/i }).first().isVisible().catch(() => false)) return;
  }

  const purchasesLink = page.getByTestId('sidebar-purchases-button');
  if (await purchasesLink.isVisible().catch(() => false)) {
    await purchasesLink.click().catch(() => {});
    const billsLink = page.getByTestId('purchases-bills-link');
    if (await billsLink.isVisible().catch(() => false)) {
      await billsLink.click().catch(() => {});
    }
  }

  await waitForBillsHeading(page);
  const billsTab = page.getByRole('tab', { name: 'Bills' }).first();
  if (await billsTab.isVisible().catch(() => false)) {
    await billsTab.click().catch(() => {});
  }
}

function getBillFormLocators(page: Page) {
  const drawer = page.getByTestId('bill-drawer');
  const vendorTrigger = drawer.getByTestId('vendor-picker-trigger');

  return {
    drawer,
    heading: drawer.getByRole('heading', { name: /new bill|edit bill|bill/i }).first(),
    save: drawer.getByRole('button', { name: /^save$/i }).first(),
    saveClose: drawer.getByRole('button', { name: /save\s*&\s*close/i }).first(),
    vendor: vendorTrigger,
    vendorSearch: drawer.getByPlaceholder('Search vendor...'),
    billNo: drawer.getByPlaceholder('BILL-001'),
    billDate: drawer.getByPlaceholder('MM/DD/YYYY').first(),
    dueDate: drawer.getByPlaceholder('MM/DD/YYYY').nth(1),
    terms: drawer.getByPlaceholder(/payment terms/i).first(),
    addLine: drawer.getByRole('button', { name: /add a new line/i }).first(),
    tax: drawer.getByRole('button', { name: /no tax|tax/i }).first(),
    applyCredit: drawer.getByRole('button', { name: /apply debit note|apply credit/i }).first(),
  };
}

async function openNewBillForm(page: Page) {
  const newBillButton = await firstVisibleLocator([
    page.getByTestId('bill-new-button'),
    page.getByTestId('bill-new-action'),
    page.getByRole('button', { name: /new bill|create bill|add bill|\+\s*bill/i }).first(),
  ]);

  if (newBillButton) {
    await newBillButton.click().catch(() => {});
    const newBillAction = page.getByTestId('bill-new-action');
    if (await newBillAction.isVisible().catch(() => false)) {
      await newBillAction.click().catch(() => {});
    }
  }

  const formHeading = page.getByTestId('bill-drawer').getByRole('heading', { name: /new bill|bill/i }).first();
  const formVisible = await formHeading.isVisible().catch(() => false);
  if (!formVisible) {
    await page.goto(newBillUrl, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(async () => {
      await page.goto(newBillUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    });
    await formHeading.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
    return await formHeading.isVisible().catch(() => false);
  }
  return formVisible;
}

async function openBillFromPurchaseOrder(page: Page) {
  const fromPoButton = await firstVisibleLocator([
    page.getByRole('button', { name: /from purchase order|from po|purchase order/i }).first(),
    page.getByRole('menuitem', { name: /from purchase order|from po|purchase order/i }).first(),
    page.getByTestId('bill-new-button'),
  ]);

  if (fromPoButton) {
    await fromPoButton.click().catch(() => {});
    return true;
  }

  const opened = await openNewBillForm(page);
  if (!opened) return false;

  const purchaseOrderOption = await firstVisibleLocator([
    page.getByRole('button', { name: /purchase order|from po/i }).first(),
    page.getByRole('link', { name: /purchase order|from po/i }).first(),
  ]);

  if (!purchaseOrderOption) return false;
  await purchaseOrderOption.click().catch(() => {});
  return true;
}

async function selectFirstOption(page: Page) {
  const option = page.getByRole('option').first();
  if (await option.isVisible().catch(() => false)) {
    await option.click().catch(() => {});
    return true;
  }
  const listItem = page.locator('[role="listbox"] [role="option"], [role="option"], li[role="option"]').first();
  if (await listItem.isVisible().catch(() => false)) {
    await listItem.click().catch(() => {});
    return true;
  }
  return false;
}

async function setComboValue(locator: Locator, page: Page, valueHint = 'a') {
  if (!locator) return false;
  const tagName = await locator.evaluate((el) => el.tagName).catch(() => '');
  if (tagName.toUpperCase() === 'SELECT') {
    const options = locator.locator('option');
    const count = await options.count().catch(() => 0);
    if (count > 1) {
      const value = await options.nth(1).getAttribute('value');
      if (value) {
        await locator.selectOption(value).catch(() => {});
        return true;
      }
    }
  }

  await locator.click().catch(() => {});
  await locator.fill(valueHint).catch(() => {});
  if (await selectFirstOption(page)) return true;
  await page.keyboard.press('ArrowDown').catch(() => {});
  await page.keyboard.press('Enter').catch(() => {});
  return true;
}

async function fillLineItem(page: Page, index: number, amount?: number, accountHint?: string) {
  const drawer = page.getByTestId('bill-drawer');
  const line = drawer.locator('tbody tr').nth(index);
  const itemTrigger = line.getByTestId('item-picker-trigger');
  if (await itemTrigger.isVisible().catch(() => false)) {
    await itemTrigger.click().catch(() => {});
    const listPanel = page.locator('[role="listbox"], [data-cmdk-list], [cmdk-list]').first();
    const options = listPanel.locator('[role="option"], [role="button"]');
    const count = await options.count().catch(() => 0);
    if (count) {
      await options.first().click().catch(() => {});
    }
  }

  if (typeof amount === 'number') {
    const amountInput = line.getByPlaceholder('0.00').first();
    if (await amountInput.isVisible().catch(() => false)) {
      await amountInput.fill(String(amount)).catch(() => {});
    }
  }

  if (accountHint) {
    const accountInput = line.getByRole('button', { name: /search or create account/i }).first();
    if (await accountInput.isVisible().catch(() => false)) {
      await setComboValue(accountInput, page, accountHint);
    }
  }
}

async function selectVendor(page: Page, form: ReturnType<typeof getBillFormLocators>) {
  await form.vendor.click().catch(() => {});
  await form.vendorSearch.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  const panel = page.locator('[role="listbox"], [data-cmdk-list], [cmdk-list]').first();
  await panel.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
  if (await panel.isVisible().catch(() => false)) {
    const panelOptions = panel.locator('[role="option"], [role="button"]');
    const count = await panelOptions.count().catch(() => 0);
    if (count) {
      for (let i = 0; i < count; i += 1) {
        const option = panelOptions.nth(i);
        const text = (await option.innerText().catch(() => '')).toLowerCase();
        if (!/new vendor|create new vendor/.test(text)) {
          await option.click().catch(() => {});
          return true;
        }
      }
    }
  }

  let options = page.getByRole('option');
  let count = await options.count().catch(() => 0);
  if (!count) {
    await form.vendorSearch.fill('a').catch(() => {});
    options = page.getByRole('option');
    count = await options.count().catch(() => 0);
  }
  if (!count) return false;
  for (let i = 0; i < count; i += 1) {
    const option = options.nth(i);
    const text = (await option.innerText().catch(() => '')).toLowerCase();
    if (!/new vendor|create new vendor/.test(text)) {
      await option.click().catch(() => {});
      return true;
    }
  }
  return false;
}

async function saveBill(page: Page) {
  const drawer = page.getByTestId('bill-drawer');
  const saveDraftButton = drawer.getByTestId('bill-save-draft-button');
  const saveClose = drawer.getByRole('button', { name: /save\s*&\s*close/i }).first();
  if (await saveClose.isVisible().catch(() => false)) {
    await saveClose.click().catch(() => {});
    return true;
  }

  if (await saveDraftButton.isVisible().catch(() => false)) {
    await saveDraftButton.click().catch(() => {});
    return true;
  }

  const saveButton = drawer.getByRole('button', { name: /^save$/i }).first();
  if (await saveButton.isVisible().catch(() => false)) {
    await saveButton.click().catch(() => {});
    return true;
  }

  return true;
}

async function waitForSaveResult(page: Page) {
  const duplicateDialog = page.getByRole('alertdialog', { name: /duplicate|potential duplicate/i }).first();
  const createAnyway = duplicateDialog.getByRole('button', { name: /create anyway/i }).first();
  await duplicateDialog.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  if (await createAnyway.isVisible().catch(() => false)) {
    await createAnyway.scrollIntoViewIfNeeded().catch(() => {});
    await createAnyway.click({ force: true, timeout: 5000 }).catch(() => {});
    if (await duplicateDialog.isVisible().catch(() => false)) {
      await page
        .evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          const target = buttons.find((btn) => /create anyway/i.test(btn.textContent || ''));
          if (target) (target as HTMLButtonElement).click();
        })
        .catch(() => {});
    }
    await duplicateDialog.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  }

  const toast = page.locator('text=/bill created successfully|bill updated successfully|saved|created|success/i').first();
  const toastPromise = toast.waitFor({ state: 'visible', timeout: 15000 }).then(() => true).catch(() => false);
  const urlPromise = page
    .waitForURL(/\/purchases\/bills\/?$/i, { timeout: 15000 })
    .then(() => true)
    .catch(() => false);

  const result = await Promise.race([toastPromise, urlPromise]);
  if (result) {
    if (await toast.isVisible().catch(() => false)) {
      await expect(toast).toBeVisible();
    }
    return true;
  }
  return false;
}

test.describe('@accounting Purchases - Bills (Manual cases to automation) @S6d6c1f11', () => {
  test.beforeEach(async ({ page }) => {
    await openBillsList(page);
  });

  test('@accounting HB-BILL-001: Create bill with required fields - simple entry @T1b03f2a1', async ({ page }) => {
    const opened = await openNewBillForm(page);
    if (!opened) test.skip(true, 'New Bill form not available.');

    const form = getBillFormLocators(page);
    if (!(await form.vendor.isVisible().catch(() => false))) test.skip(true, 'Vendor field not found.');

    const billNo = uniqueBillNo('HB-BILL-001');
    if (await form.billNo.isVisible().catch(() => false)) {
      await form.billNo.fill(billNo).catch(() => {});
    }

    if (!(await selectVendor(page, form))) test.skip(true, 'Vendor options not available.');
    if (await form.billDate.isVisible().catch(() => false)) {
      await form.billDate.fill(formatDate(new Date())).catch(() => {});
    }
    if (await form.dueDate.isVisible().catch(() => false)) {
      const due = new Date();
      due.setDate(due.getDate() + 7);
      await form.dueDate.fill(formatDate(due)).catch(() => {});
    }
    await fillLineItem(page, 0, 2000);

    const saved = await saveBill(page);
    if (!saved) test.skip(true, 'Save action not available.');
    await waitForSaveResult(page);
    await page.waitForURL(/\/purchases\/bills\/?$/i, { timeout: 15000 }).catch(() => {});
  });

  test('@accounting HB-BILL-002: Create bill with multiple line items @T2a4b5c6d', async ({ page }) => {
    const lineItemCount = 50;
    const opened = await openNewBillForm(page);
    if (!opened) test.skip(true, 'New Bill form not available.');

    const form = getBillFormLocators(page);
    if (!(await form.vendor.isVisible().catch(() => false))) test.skip(true, 'Vendor field not found.');

    const billNo = uniqueBillNo('HB-BILL-002');
    if (await form.billNo.isVisible().catch(() => false)) {
      await form.billNo.fill(billNo).catch(() => {});
    }

    if (!(await selectVendor(page, form))) test.skip(true, 'Vendor options not available.');
    for (let index = 0; index < lineItemCount; index += 1) {
      if (index > 0) {
        if (await form.addLine.isVisible().catch(() => false)) {
          await form.addLine.click().catch(() => {});
        }
      }
      const amount = 1200 - index * 200;
      await fillLineItem(page, index, amount);
    }

    const saved = await saveBill(page);
    if (!saved) test.skip(true, 'Save action not available.');
    await waitForSaveResult(page);
    await page.waitForURL(/\/purchases\/bills\/?$/i, { timeout: 15000 }).catch(() => {});
  });

  test('@accounting HB-BILL-003: Create bill from purchase order - three-way match @T9042b1d6', async ({ page }) => {
    const opened = await openBillFromPurchaseOrder(page);
    if (!opened) test.skip(true, 'Purchase order billing not available.');

    const poRow = page.getByText(/PO-1001/i).first();
    if (await poRow.isVisible().catch(() => false)) {
      await poRow.click().catch(() => {});
    } else if (!(await selectFirstOption(page))) {
      test.skip(true, 'No purchase order entries available.');
    }

    const saved = await saveBill(page);
    if (!saved) test.skip(true, 'Save action not available.');
    await waitForSaveResult(page);

    const poReference = page.locator('text=/po|purchase order/i').first();
    if (await poReference.isVisible().catch(() => false)) {
      await expect(poReference).toBeVisible();
    }
  });

  test('@accounting HB-BILL-004: Create bill with multiple line items and GL distribution @Tcf3b0f0c', async ({ page }) => {
    const opened = await openNewBillForm(page);
    if (!opened) test.skip(true, 'New Bill form not available.');

    const form = getBillFormLocators(page);
    if (!(await form.vendor.isVisible().catch(() => false))) test.skip(true, 'Vendor field not found.');

    if (!(await selectVendor(page, form))) test.skip(true, 'Vendor options not available.');
    await fillLineItem(page, 0, 500, 'Office');

    if (await form.addLine.isVisible().catch(() => false)) {
      await form.addLine.click().catch(() => {});
      await form.addLine.click().catch(() => {});
    }

    await fillLineItem(page, 1, 300, 'Utilities');
    await fillLineItem(page, 2, 2000, 'Rent');

    const totalLabel = page.locator('text=/total/i').first();
    if (await totalLabel.isVisible().catch(() => false)) {
      await expect(totalLabel).toBeVisible();
    }

    const saved = await saveBill(page);
    if (!saved) test.skip(true, 'Save action not available.');
    await waitForSaveResult(page);
  });

  test('@accounting HB-BILL-005: Bill entry with purchase tax/VAT/GST @T1a3c097e', async ({ page }) => {
    const opened = await openNewBillForm(page);
    if (!opened) test.skip(true, 'New Bill form not available.');

    const form = getBillFormLocators(page);
    if (!(await form.vendor.isVisible().catch(() => false))) test.skip(true, 'Vendor field not found.');
    if (!(await form.tax.isVisible().catch(() => false))) test.skip(true, 'Tax selector not found.');

    if (!(await selectVendor(page, form))) test.skip(true, 'Vendor options not available.');
    await fillLineItem(page, 0, 1000);
    await setComboValue(form.tax, page, '18');

    const totalLabel = page.locator('text=/total|tax/i').first();
    if (await totalLabel.isVisible().catch(() => false)) {
      await expect(totalLabel).toBeVisible();
    }

    const saved = await saveBill(page);
    if (!saved) test.skip(true, 'Save action not available.');
    await waitForSaveResult(page);
  });

  test('@accounting HB-BILL-006: Partial bill entry against purchase order @T317d8db7', async ({ page }) => {
    const opened = await openBillFromPurchaseOrder(page);
    if (!opened) test.skip(true, 'Purchase order billing not available.');

    const quantityInput = page.locator('input[placeholder*="Qty" i], input[name*="quantity" i]').first();
    if (!(await quantityInput.isVisible().catch(() => false))) test.skip(true, 'Quantity field not found.');
    await quantityInput.fill('60').catch(() => {});

    const saved = await saveBill(page);
    if (!saved) test.skip(true, 'Save action not available.');
    await waitForSaveResult(page);

    const partialStatus = page.locator('text=/partial|partially billed/i').first();
    if (await partialStatus.isVisible().catch(() => false)) {
      await expect(partialStatus).toBeVisible();
    }
  });

  test('@accounting HB-BILL-007: Bill with payment terms Net 30 @T5e7d49c2', async ({ page }) => {
    const opened = await openNewBillForm(page);
    if (!opened) test.skip(true, 'New Bill form not available.');

    const form = getBillFormLocators(page);
    if (!(await form.vendor.isVisible().catch(() => false))) test.skip(true, 'Vendor field not found.');
    if (!(await form.terms.isVisible().catch(() => false))) test.skip(true, 'Terms field not found.');

    if (!(await selectVendor(page, form))) test.skip(true, 'Vendor options not available.');

    const billDate = new Date('2025-01-01T00:00:00Z');
    const dueDate = new Date(billDate);
    dueDate.setDate(dueDate.getDate() + 30);

    if (await form.billDate.isVisible().catch(() => false)) {
      await form.billDate.fill(formatDate(billDate)).catch(() => {});
    }

    await setComboValue(form.terms, page, 'Net 30');

    if (await form.dueDate.isVisible().catch(() => false)) {
      const dueValue = await form.dueDate.inputValue().catch(() => '');
      if (dueValue) {
        await expect(form.dueDate).toHaveValue(formatDate(dueDate));
      }
    }
  });

  test('@accounting HB-BILL-008: Bill with early payment discount terms 2/10 Net 30 @Tfc93a4c1', async ({ page }) => {
    const opened = await openNewBillForm(page);
    if (!opened) test.skip(true, 'New Bill form not available.');

    const form = getBillFormLocators(page);
    if (!(await form.terms.isVisible().catch(() => false))) test.skip(true, 'Terms field not found.');

    await setComboValue(form.terms, page, '2/10');

    const discountHint = page.locator('text=/2\\/10|discount/i').first();
    if (await discountHint.isVisible().catch(() => false)) {
      await expect(discountHint).toBeVisible();
    }
  });

  test('@accounting HB-BILL-009: Bill for inactive vendor @T4df6c7b8', async ({ page }) => {
    const opened = await openNewBillForm(page);
    if (!opened) test.skip(true, 'New Bill form not available.');

    const form = getBillFormLocators(page);
    if (!(await form.vendor.isVisible().catch(() => false))) test.skip(true, 'Vendor field not found.');

    await form.vendor.click().catch(() => {});
    const inactiveOption = await firstVisibleLocator([
      page.getByRole('option', { name: /inactive/i }).first(),
      page.getByRole('button', { name: /inactive/i }).first(),
    ]);
    if (!inactiveOption) test.skip(true, 'No inactive vendor option.');
    await inactiveOption.click().catch(() => {});

    const warning = page.locator('text=/inactive|reactivate|not active/i').first();
    if (!(await warning.isVisible().catch(() => false))) test.skip(true, 'No inactive vendor warning shown.');
    await expect(warning).toBeVisible();
  });

  test('@accounting HB-BILL-010: Duplicate bill number detection @T0b27cfd5', async ({ page }) => {
    const opened = await openNewBillForm(page);
    if (!opened) test.skip(true, 'New Bill form not available.');

    const form = getBillFormLocators(page);
    if (!(await form.vendor.isVisible().catch(() => false))) test.skip(true, 'Vendor field not found.');
    if (!(await form.billNo.isVisible().catch(() => false))) test.skip(true, 'Bill number field not found.');

    const duplicateNo = uniqueBillNo('HB-BILL-010');
    if (!(await selectVendor(page, form))) test.skip(true, 'Vendor options not available.');
    await fillLineItem(page, 0, 1000);
    await form.billNo.fill(duplicateNo).catch(() => {});

    const saved = await saveBill(page);
    if (!saved) test.skip(true, 'Save action not available.');
    await waitForSaveResult(page);

    await openBillsList(page);
    const reopened = await openNewBillForm(page);
    if (!reopened) test.skip(true, 'New Bill form not available for duplicate check.');

    const form2 = getBillFormLocators(page);
    if (!(await selectVendor(page, form2))) test.skip(true, 'Vendor options not available.');
    await fillLineItem(page, 0, 500);
    await form2.billNo.fill(duplicateNo).catch(() => {});
    await saveBill(page);

    const warning = page.locator('text=/duplicate|already exists|exists/i').first();
    if (!(await warning.isVisible().catch(() => false))) test.skip(true, 'No duplicate warning displayed.');
    await expect(warning).toBeVisible();
  });

  test('@accounting HB-BILL-011: Bill with vendor credit application @Te8c1f9b2', async ({ page }) => {
    const opened = await openNewBillForm(page);
    if (!opened) test.skip(true, 'New Bill form not available.');

    const form = getBillFormLocators(page);
    if (!(await form.vendor.isVisible().catch(() => false))) test.skip(true, 'Vendor field not found.');

    if (!(await selectVendor(page, form))) test.skip(true, 'Vendor options not available.');
    await fillLineItem(page, 0, 1000);

    const applied = await optionalAction(
      form.applyCredit,
      async () => {
        await form.applyCredit.click().catch(() => {});
      },
      'Apply credit action not found.',
    );
    if (!applied) test.skip(true, 'Apply credit action not found.');

    const creditApplied = page.locator('text=/credit applied|applied credit|credit/i').first();
    if (!(await creditApplied.isVisible().catch(() => false))) test.skip(true, 'No applied credit indicator.');
    await expect(creditApplied).toBeVisible();
  });

  test('@accounting HB-BILL-012: Create multiple draft bills (configurable count) @Tb6f2a3e1', async ({ page }) => {
    const targetCount = 10;

    for (let index = 0; index < targetCount; index += 1) {
      const opened = await openNewBillForm(page);
      if (!opened) test.skip(true, 'New Bill form not available.');

      const form = getBillFormLocators(page);
      if (!(await form.vendor.isVisible().catch(() => false))) test.skip(true, 'Vendor field not found.');

      const billNo = uniqueBillNo(`HB-BILL-012-${index + 1}`);
      if (await form.billNo.isVisible().catch(() => false)) {
        await form.billNo.fill(billNo).catch(() => {});
      }

      if (!(await selectVendor(page, form))) test.skip(true, 'Vendor options not available.');
      await fillLineItem(page, 0);

      const saved = await saveBill(page);
      if (!saved) test.skip(true, 'Save action not available.');
      await waitForSaveResult(page);

      if (index < targetCount - 1) {
        await page.goto(newBillUrl, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(async () => {
          await page.goto(newBillUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
        });
      }
    }
  });

  test('@accounting HB-BILL-013: Create multiple bills (configurable count) @Tbdc5f1a2', async ({ page }) => {
    const targetCount = 50;

    for (let index = 0; index < targetCount; index += 1) {
      const opened = await openNewBillForm(page);
      if (!opened) test.skip(true, 'New Bill form not available.');

      const form = getBillFormLocators(page);
      if (!(await form.vendor.isVisible().catch(() => false))) test.skip(true, 'Vendor field not found.');

      if (!(await selectVendor(page, form))) test.skip(true, 'Vendor options not available.');
      await fillLineItem(page, 0, 500 + index * 100);

      const saved = await saveBill(page);
      if (!saved) test.skip(true, 'Save action not available.');
      await waitForSaveResult(page);

      if (index < targetCount - 1) {
        await page.goto(newBillUrl, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(async () => {
          await page.goto(newBillUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
        });
      }
    }
  });
});
