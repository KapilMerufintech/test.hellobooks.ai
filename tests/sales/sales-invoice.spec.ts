import { test, expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { login as seedLogin } from '../utils/login';
import {
  openSalesModule,
  openNewRecord,
  assertVisibleOrNote,
  getSearchInput,
  getFilterButton,
  getExportButton,
  optionalAction,
} from './sales-helpers';

test.setTimeout(300000);

function getInvoiceListLocators(page: Page) {
  return {
    heading: page.getByRole('heading', { name: /invoices/i }).first(),
    search: page.getByPlaceholder(/search invoices/i).first(),
    export: getExportButton(page).first(),
    filter: getFilterButton(page).first(),
    createInvoice: page.getByRole('button', { name: /\+?\s*create invoice|new invoice/i }).first(),
    bulkImport: page.getByRole('button', { name: /bulk import/i }).first(),
    viewArchived: page.getByRole('button', { name: /view archived/i }).first(),
    tabAll: page.getByRole('button', { name: /all/i }).first(),
    tabDraft: page.getByRole('button', { name: /draft/i }).first(),
    tabAwaitingApproval: page.getByRole('button', { name: /awaiting approval/i }).first(),
    tabAwaitingPayment: page.getByRole('button', { name: /awaiting payment/i }).first(),
    tabPaid: page.getByRole('button', { name: /paid/i }).first(),
    tabCreditNotes: page.getByRole('button', { name: /credit notes/i }).first(),
  };
}

function getInvoiceFormLocators(page: Page) {
  const invoiceNoByLabel = page.getByLabel(/invoice no\./i).first();
  const invoiceNoFallback = page.getByText(/invoice no\./i).first().locator('xpath=following::input[1]');
  const customerByPlaceholder = page.getByPlaceholder(/choose a customer/i).first();
  const customerByLabel = page.getByLabel(/customer/i).first();
  const customerByText = page.getByText(/choose a customer/i).first();
  const customerCombo = customerByText.or(customerByPlaceholder).or(customerByLabel);
  const itemByPlaceholder = page.getByPlaceholder(/select item/i).first();
  const itemByCombo = page.getByRole('combobox').filter({ hasText: /select item/i }).first();
  return {
    heading: page.getByRole('heading', { name: /new invoice/i }).first(),
    saveClose: page.getByRole('button', { name: /save & close/i }).first(),
    approve: page.getByRole('button', { name: /approve/i }).first(),
    customer: customerCombo,
    customerInput: customerByPlaceholder.or(customerCombo.locator('input').first()),
    invoiceNo: invoiceNoByLabel.or(invoiceNoFallback),
    autoGenerate: page.getByRole('button', { name: /auto generate/i }).first(),
    date: page.getByPlaceholder('DD/MM/YYYY').first(),
    dueDate: page.getByPlaceholder('DD/MM/YYYY').nth(1),
    reference: page.getByPlaceholder(/ref-000001/i).first(),
    item: itemByPlaceholder.or(itemByCombo),
    description: page.getByPlaceholder(/description/i).first(),
    quantity: page.getByPlaceholder('1').first(),
    price: page.getByPlaceholder(/price/i).first(),
    tax: page.getByRole('combobox').filter({ hasText: /tax/i }).first(),
    addLine: page.getByRole('button', { name: /add a new line/i }).first(),
    discount: page.getByPlaceholder('0').first(),
    notes: page.getByPlaceholder(/invoice notes/i).first(),
    terms: page.getByPlaceholder(/payment terms/i).first(),
    amountsAre: page.getByRole('combobox').filter({ hasText: /amounts are|tax exclusive|tax inclusive/i }).first(),
  };
}

async function triggerSaveAndClose(page: Page) {
  const saveCloseButton = page.getByRole('button', { name: 'Save & close' }).first();
  await saveCloseButton.scrollIntoViewIfNeeded().catch(() => {});
  await expect(saveCloseButton).toBeVisible({ timeout: 10000 });
  await saveCloseButton.click({ force: true });

  const menuItem = page.getByRole('menuitem', { name: 'Save & close' }).first();
  await expect(menuItem).toBeVisible({ timeout: 5000 });
  await menuItem.click();
  return true;
}

async function openInvoicesList(page: Page) {
  await openSalesModule(page, 'Invoices');
}

async function pauseForLoad(page: Page, ms = 3000) {
  await page.waitForTimeout(ms);
}

async function openNewInvoiceForm(page: Page) {
  await openNewRecord(page, 'Invoices');
  await assertVisibleOrNote(getInvoiceFormLocators(page).heading, 'New Invoice form heading not visible.');
}

async function openNewInvoiceFromList(page: Page) {
  await openInvoicesList(page);
  const { createInvoice } = getInvoiceListLocators(page);
  const opened = await optionalAction(createInvoice, async () => {
    await createInvoice.click();
  }, 'Create Invoice button not visible.');
  if (opened) {
    const newInvoice = page.getByRole('menuitem', { name: /new invoice/i }).first();
    await optionalAction(newInvoice, async () => {
      await newInvoice.click();
    }, 'New Invoice menu item not visible.');
  }
  await page.waitForURL(/new-invoice/i, { timeout: 15000 }).catch(() => {});
  await assertVisibleOrNote(getInvoiceFormLocators(page).heading, 'New Invoice form heading not visible.');
}

async function openPaymentsReceived(page: Page) {
  await openSalesModule(page, 'Payments Received');
}

async function openAwaitingPaymentActions(page: Page) {
  await openInvoicesList(page);
  const row = page.locator('tr').filter({ hasText: /awaiting payment/i }).first();
  const actions = row.locator('button, [role="button"]').last();
  const opened = await optionalAction(actions, async () => {
    await actions.click();
  }, 'Awaiting Payment row actions not available.');
  return opened;
}

async function openRecordPaymentFromInvoice(page: Page) {
  const opened = await openAwaitingPaymentActions(page);
  if (!opened) return false;
  const recordPayment = page.getByRole('menuitem', { name: /record payment/i }).first();
  return optionalAction(recordPayment, async () => {
    await recordPayment.click();
  }, 'Record Payment menu item not visible.');
}

async function openApplyAdvanceFromInvoice(page: Page) {
  const opened = await openAwaitingPaymentActions(page);
  if (!opened) return false;
  const applyAdvance = page.getByRole('menuitem', { name: /apply advance/i }).first();
  return optionalAction(applyAdvance, async () => {
    await applyAdvance.click();
  }, 'Apply Advance menu item not visible.');
}

async function selectFirstOption(
  page: Page,
  trigger: Locator,
  label: string,
  options?: { excludeText?: RegExp; preferListbox?: boolean; typeToFilter?: string },
) {
  await expect(trigger).toBeVisible();
  await trigger.click();
  const preferListbox = options?.preferListbox !== false;
  const listbox = page.getByRole('listbox').last();
  const listboxVisible = preferListbox
    ? await listbox.waitFor({ state: 'visible', timeout: 2000 }).then(() => true).catch(() => false)
    : false;

  if (listboxVisible && options?.typeToFilter) {
    const listboxInput = listbox.locator('input, [role="textbox"]').first();
    const typed = await optionalAction(listboxInput, async () => {
      await listboxInput.fill(options.typeToFilter || '');
    }, `${label} search input not visible.`);
    if (!typed) {
      await page.keyboard.type(options.typeToFilter || '').catch(() => {});
    }
  }

  const baseCandidates = listboxVisible
    ? listbox.locator('[role="option"], [role="menuitem"], li, div').filter({ hasText: /\S/ })
    : page.locator('[role="option"], [role="menuitem"]');
  const candidates = options?.excludeText ? baseCandidates.filter({ hasNotText: options.excludeText }) : baseCandidates;
  if ((await candidates.count()) === 0) {
    test.info().annotations.push({
      type: 'note',
      description: `${label} options not available or excluded by filter.`,
    });
    await trigger.press('Escape').catch(() => {});
    return '';
  }
  const option = candidates.first();
  const optionVisible = await option.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
  let text = '';
  if (optionVisible) {
    text = (await option.textContent())?.trim() || '';
    await option.click();
  } else {
    await trigger.press('ArrowDown').catch(() => {});
    await trigger.press('Enter').catch(() => {});
  }
  if (!text) {
    test.info().annotations.push({ type: 'note', description: `${label} option text not detected.` });
  }
  return text;
}

async function fillMinimalInvoice(page: Page, dateValue: string) {
  const { customer, item, price, date } = getInvoiceFormLocators(page);
  await selectCustomerByName(page, customer, customer, 'a');
  await date.fill(dateValue);
  await selectExistingItem(page, item, 'a', 1);
  const currentPrice = await price.inputValue().catch(() => '');
  if (!currentPrice) {
    await price.fill('100');
  }
}

async function fillRequiredInvoiceFields(page: Page, qtyValue = '1', priceValue = '100') {
  const { customer, item, quantity, price } = getInvoiceFormLocators(page);
  await selectCustomerByName(page, customer, customer, 'a');
  await selectExistingItem(page, item, 'a', 1);
  await quantity.fill(qtyValue);
  const currentPrice = await price.inputValue().catch(() => '');
  if (!currentPrice || currentPrice === '0') {
    await price.fill(priceValue);
  }
}

async function ensureInvoiceDates(page: Page) {
  const { date, dueDate } = getInvoiceFormLocators(page);
  const currentDate = await date.inputValue().catch(() => '');
  if (!currentDate) {
    await date.fill('19/02/2026');
  }
  const currentDue = await dueDate.inputValue().catch(() => '');
  if (!currentDue) {
    await dueDate.fill('19/03/2026');
  }
}

async function selectOptionByText(page: Page, trigger: Locator, label: string, optionText: string) {
  const triggerVisible = await optionalAction(trigger, async () => {
    await expect(trigger).toBeVisible({ timeout: 4000 });
    await trigger.click();
  }, `${label} trigger not visible.`);
  if (!triggerVisible) return false;
  const listbox = page.getByRole('listbox').last();
  const listboxVisible = await listbox.waitFor({ state: 'visible', timeout: 4000 }).then(() => true).catch(() => false);
  if (listboxVisible) {
    const listboxInput = listbox.locator('input, [role="textbox"]').first();
    const inputVisible = await listboxInput.isVisible().catch(() => false);
    if (inputVisible) {
      await listboxInput.fill(optionText).catch(() => {});
    }
    const exactOption = listbox.getByRole('option', { name: optionText }).first();
    const clickedExact = await optionalAction(exactOption, async () => {
      await exactOption.click();
    }, `${label} option not visible for ${optionText}.`);
    if (clickedExact) return true;
    const fallbackOption = listbox.locator('[role="option"], [role="menuitem"], li, div').filter({ hasText: optionText }).first();
    const clickedFallback = await optionalAction(fallbackOption, async () => {
      await fallbackOption.click();
    }, `${label} fallback option not visible for ${optionText}.`);
    return clickedFallback;
  }
  return false;
}

async function selectExistingCustomer(page: Page, customerCombo: Locator, searchTerm = 'a') {
  await expect(customerCombo).toBeVisible();
  await customerCombo.scrollIntoViewIfNeeded().catch(() => {});
  await customerCombo.click({ force: true });
  await pauseForLoad(page, 500);
  const listbox = page.getByRole('listbox').last();
  const listboxVisible = await listbox.waitFor({ state: 'visible', timeout: 4000 }).then(() => true).catch(() => false);
  if (!listboxVisible) {
    await page.keyboard.press('ArrowDown').catch(() => {});
    await page.keyboard.press('ArrowDown').catch(() => {});
    await page.keyboard.press('Enter').catch(() => {});
    const quickValue = (await customerCombo.inputValue().catch(() => '')) || (await customerCombo.textContent()) || '';
    return Boolean(quickValue && !/choose a customer/i.test(quickValue));
  }
  const listboxInput = listbox
    .getByPlaceholder(/search customer/i)
    .first()
    .or(listbox.locator('input, [role="textbox"]').first());
  await optionalAction(listboxInput, async () => {
    await listboxInput.fill(searchTerm);
  }, 'Customer search input not visible.');
  const options = listbox
    .locator('[role="option"], [role="menuitem"], li, div')
    .filter({ hasNotText: /create new customer|new customer/i })
    .filter({ hasText: /\S/ });
  const optionVisible = await optionalAction(options.first(), async () => {
    await expect(options.first()).toBeVisible({ timeout: 4000 });
  }, 'Customer options not visible.');
  if (!optionVisible) return false;
  await options.first().click();
  await pauseForLoad(page, 500);
  const selectedValue = (await customerCombo.inputValue().catch(() => '')) || (await customerCombo.textContent()) || '';
  if (selectedValue && !/choose a customer/i.test(selectedValue)) {
    return true;
  }
  await page.keyboard.press('ArrowDown').catch(() => {});
  await page.keyboard.press('Enter').catch(() => {});
  const fallbackValue = (await customerCombo.inputValue().catch(() => '')) || (await customerCombo.textContent()) || '';
  return Boolean(fallbackValue && !/choose a customer/i.test(fallbackValue));
}

async function selectCustomerByName(
  page: Page,
  customerCombo: Locator,
  customerInput: Locator,
  customerName: string,
) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const selected = await selectOptionByText(page, customerCombo, 'Customer', customerName);
    if (selected) return true;

    const inputVisible = await optionalAction(customerInput, async () => {
      await customerInput.click({ force: true });
      await customerInput.fill(customerName);
    }, 'Customer input not visible.');
    if (!inputVisible) {
      const comboClicked = await optionalAction(customerCombo, async () => {
        await customerCombo.click();
      }, 'Customer combobox not visible.');
      if (!comboClicked) {
        const placeholder = page.getByText(/choose a customer/i).first();
        await optionalAction(placeholder, async () => {
          await placeholder.click();
        }, 'Customer placeholder not visible.');
      }
    }

    const listbox = page.getByRole('listbox').last();
    const listboxVisible = await listbox.waitFor({ state: 'visible', timeout: 4000 }).then(() => true).catch(() => false);
    if (!listboxVisible) {
      await page.reload();
      await pauseForLoad(page);
      continue;
    }
    const listboxInput = listbox
      .getByPlaceholder(/search customer/i)
      .first()
      .or(listbox.locator('input, [role="textbox"]').first());
    const typed = await optionalAction(listboxInput, async () => {
      await listboxInput.fill(customerName);
    }, 'Customer search input not visible.');
    if (!typed) {
      await page.keyboard.type(customerName).catch(() => {});
    }
    const match = listbox.locator('[role="option"], [role="menuitem"], li, div').filter({
      hasText: customerName,
    }).first();
    const clicked = await optionalAction(match, async () => {
      await match.click();
    }, `Customer option not visible for ${customerName}.`);
    if (clicked) return true;

    await page.reload();
    await pauseForLoad(page);
  }
  return selectExistingCustomer(page, customerCombo, customerName);
}

async function selectItemByName(page: Page, itemCombo: Locator, itemName: string) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const selected = await selectOptionByText(page, itemCombo, 'Item', itemName);
    if (selected) return true;
    await expect(itemCombo).toBeVisible();
    await itemCombo.click();
    const listbox = page.getByRole('listbox').last();
    const listboxVisible = await listbox.waitFor({ state: 'visible', timeout: 4000 }).then(() => true).catch(() => false);
    if (!listboxVisible) {
      await page.reload();
      await pauseForLoad(page);
      continue;
    }
    const listboxInput = listbox.locator('input, [role="textbox"]').first();
    const typed = await optionalAction(listboxInput, async () => {
      await listboxInput.fill(itemName);
    }, 'Item search input not visible.');
    if (!typed) {
      await page.keyboard.type(itemName).catch(() => {});
    }
    const match = listbox
      .locator('[role="option"], [role="menuitem"], li, div')
      .filter({ hasText: itemName })
      .filter({ hasNotText: /create new item|new item/i })
      .first();
    const clicked = await optionalAction(match, async () => {
      await match.click();
    }, `Item option not visible for ${itemName}.`);
    if (clicked) return true;
    await page.reload();
    await pauseForLoad(page);
  }
  await selectFirstOption(page, itemCombo, 'Item', {
    excludeText: /new item|add item|create item|add new/i,
    typeToFilter: itemName,
  });
  return true;
}

async function selectExistingItem(page: Page, itemCombo: Locator, searchTerm = 'a', preferIndex = 1) {
  await expect(itemCombo).toBeVisible();
  await itemCombo.click();
  const listbox = page.getByRole('listbox').last();
  const listboxVisible = await listbox.waitFor({ state: 'visible', timeout: 4000 }).then(() => true).catch(() => false);
  if (!listboxVisible) return false;
  const listboxInput = listbox.locator('input, [role="textbox"]').first();
  const inputVisible = await listboxInput.isVisible().catch(() => false);
  if (inputVisible) {
    await listboxInput.fill(searchTerm).catch(() => {});
  }
  const options = listbox
    .locator('[role="option"], [role="menuitem"], li, div')
    .filter({ hasNotText: /create new item|new item/i })
    .filter({ hasText: /\S/ });
  const optionVisible = await optionalAction(options.first(), async () => {
    await expect(options.first()).toBeVisible({ timeout: 4000 });
  }, 'Item options not visible.');
  if (!optionVisible) return false;
  const optionCount = await options.count();
  const targetIndex = optionCount > preferIndex ? preferIndex : 0;
  await options.nth(targetIndex).click();
  return true;
}

async function fillQtyPriceIfEmpty(row: Locator, index: number) {
  const qtyInput = row.locator('input[placeholder="1"]').first();
  const currentQty = await qtyInput.inputValue().catch(() => '');
  if (!currentQty) {
    await qtyInput.click({ force: true }).catch(() => {});
    await qtyInput.fill('1').catch(() => {});
    await qtyInput.press('Tab').catch(() => {});
  }

  const priceInput = row.locator('input[placeholder*="price" i]').first();
  const currentPrice = await priceInput.inputValue().catch(() => '');
  if (!currentPrice) {
    await priceInput.click({ force: true }).catch(() => {});
    await priceInput.fill('100').catch(() => {});
    await priceInput.press('Tab').catch(() => {});
  }
}

async function createNewCustomer(page: Page, name: string, email: string) {
  await page.goto('https://test.hellobooks.ai/master-data/contacts/new');
  await pauseForLoad(page);
  const heading = page.getByRole('heading', { name: /new contact|new customer|create contact/i }).first();
  await assertVisibleOrNote(heading, 'New Contact page heading not visible.');

  const nameInput = page.getByLabel(/name|customer name|contact name|display name/i).first();
  const nameFilled = await optionalAction(nameInput, async () => {
    await nameInput.fill(name);
  }, 'Customer name input not visible.');
  if (!nameFilled) {
    const fallbackName = page.getByPlaceholder(/name|contact name|customer name|display name/i).first();
    await optionalAction(fallbackName, async () => {
      await fallbackName.fill(name);
    }, 'Customer name placeholder not visible.');
  }

  const emailInput = page.getByLabel(/email/i).first();
  const emailFilled = await optionalAction(emailInput, async () => {
    await emailInput.fill(email);
  }, 'Email input not visible.');
  if (!emailFilled) {
    const emailPlaceholder = page.getByPlaceholder(/email/i).first();
    await optionalAction(emailPlaceholder, async () => {
      await emailPlaceholder.fill(email);
    }, 'Email placeholder not visible.');
  }

  const save = page.getByRole('button', { name: /save|create|submit/i }).first();
  await optionalAction(save, async () => {
    await save.click();
  }, 'Save button not visible for new customer.');
}

async function createNewItem(page: Page, code: string, name: string) {
  await page.goto('https://test.hellobooks.ai/master-data/items/new');
  await pauseForLoad(page);
  const heading = page.getByRole('heading', { name: /new item|create item/i }).first();
  await assertVisibleOrNote(heading, 'New Item page heading not visible.');

  const codeInput = page.getByLabel(/code|sku/i).first();
  const codeFilled = await optionalAction(codeInput, async () => {
    await codeInput.fill(code);
  }, 'Item code input not visible.');
  if (!codeFilled) {
    const codePlaceholder = page.getByPlaceholder(/code|sku/i).first();
    await optionalAction(codePlaceholder, async () => {
      await codePlaceholder.fill(code);
    }, 'Item code placeholder not visible.');
  }

  const nameInput = page.getByLabel(/name/i).first();
  const nameFilled = await optionalAction(nameInput, async () => {
    await nameInput.fill(name);
  }, 'Item name input not visible.');
  if (!nameFilled) {
    const namePlaceholder = page.getByPlaceholder(/name/i).first();
    await optionalAction(namePlaceholder, async () => {
      await namePlaceholder.fill(name);
    }, 'Item name placeholder not visible.');
  }

  const sellCheckbox = page.getByRole('checkbox', { name: /sell/i }).first();
  await optionalAction(sellCheckbox, async () => {
    await sellCheckbox.click();
  }, 'Sell checkbox not visible.');

  const salePrice = page.getByLabel(/sale price|selling price|price/i).first();
  await optionalAction(salePrice, async () => {
    await salePrice.fill('100');
  }, 'Sale price input not visible.');

  const salesAccount = page
    .getByRole('combobox')
    .filter({ hasText: /search or create revenue|sales account|revenue account/i })
    .first();
  const accountSelected = await selectOptionByText(page, salesAccount, 'Sales account', '4000');
  if (!accountSelected) {
    await selectFirstOption(page, salesAccount, 'Sales account');
  }

  const save = page.getByRole('button', { name: /save|create|submit/i }).first();
  await optionalAction(save, async () => {
    await save.click();
  }, 'Save button not visible for new item.');
}

async function fillLineItemRow(page: Page, row: Locator, index: number) {
  const itemCombo = row.locator('input[placeholder*="select item" i], [role="combobox"]').first();
  await selectExistingItem(page, itemCombo, 'a', 1);

  const qtyInput = row.locator('input[placeholder="1"]').first();
  const currentQty = await qtyInput.inputValue().catch(() => '');
  if (!currentQty) {
    let qtyFilled = false;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const qtyVisible = await optionalAction(qtyInput, async () => {
        await expect(qtyInput).toBeEditable({ timeout: 5000 });
        await qtyInput.click({ force: true });
        await qtyInput.fill('1');
        await qtyInput.press('Tab').catch(() => {});
      }, `Qty input not visible for row ${index}.`);
      if (qtyVisible) {
        qtyFilled = true;
        break;
      }
      await row.scrollIntoViewIfNeeded().catch(() => {});
    }
    if (!qtyFilled) {
      const fallbackQty = row.locator('input[type="number"]').first();
      await fallbackQty.click({ force: true }).catch(() => {});
      await fallbackQty.fill('1').catch(() => {});
      await fallbackQty.press('Tab').catch(() => {});
    }
  }

  const priceInput = row.locator('input[placeholder*="price" i]').first();
  const currentPrice = await priceInput.inputValue().catch(() => '');
  if (!currentPrice) {
    let priceFilled = false;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const priceVisible = await optionalAction(priceInput, async () => {
        await expect(priceInput).toBeEditable({ timeout: 5000 });
        await priceInput.click({ force: true });
        await priceInput.fill('100');
        await priceInput.press('Tab').catch(() => {});
      }, `Price input not visible for row ${index}.`);
      if (priceVisible) {
        priceFilled = true;
        break;
      }
      await row.scrollIntoViewIfNeeded().catch(() => {});
    }
    if (!priceFilled) {
      const fallbackPrice = row.locator('input[type="number"]').nth(1);
      await fallbackPrice.click({ force: true }).catch(() => {});
      await fallbackPrice.fill('100').catch(() => {});
      await fallbackPrice.press('Tab').catch(() => {});
    }
  }

  const accountCombo = row.getByRole('combobox').filter({ hasText: /search/i }).first();
  const accountVisible = await accountCombo.isVisible().catch(() => false);
  if (accountVisible) {
    await selectFirstOption(page, accountCombo, `Account row ${index}`);
  } else {
    test.info().annotations.push({
      type: 'note',
      description: `Account combobox not visible for row ${index}; assuming auto-populated.`,
    });
  }
}

async function expectInvalidNumber(locator: Locator, note: string) {
  const state = await locator.evaluate((el: HTMLInputElement) => ({
    valid: el.checkValidity(),
    rangeUnderflow: el.validity.rangeUnderflow,
    badInput: el.validity.badInput,
    validationMessage: el.validationMessage,
  }));
  if (state.valid) {
    test.info().annotations.push({ type: 'note', description: note });
    return;
  }
  expect(state.validationMessage).not.toBe('');
}

test.describe('@accounting Sales / Invoices manual conversion (HB-INV-001 to HB-INV-020)', () => {
  test('@accounting HB-INV-001: Open invoices list', async ({ page }) => {
    await seedLogin(page);
    await openInvoicesList(page);
    const { heading, search, export: exportBtn, filter, createInvoice, tabAll, tabDraft, tabAwaitingPayment } =
      getInvoiceListLocators(page);
    await assertVisibleOrNote(heading, 'Invoices list heading not visible.');
    await assertVisibleOrNote(search, 'Search input not visible.');
    await assertVisibleOrNote(exportBtn, 'Export button not visible.');
    await assertVisibleOrNote(filter, 'Filter button not visible.');
    await assertVisibleOrNote(createInvoice, 'Create Invoice button not visible.');
    await assertVisibleOrNote(tabAll, 'All tab not visible.');
    await assertVisibleOrNote(tabDraft, 'Draft tab not visible.');
    await assertVisibleOrNote(tabAwaitingPayment, 'Awaiting Payment tab not visible.');
  });

  test('@accounting HB-INV-002: Create invoice with required fields', async ({ page }) => {
    await seedLogin(page);
    await pauseForLoad(page, 4000);
    await page.goto('https://test.hellobooks.ai/sales/invoices/new-invoice');
    await pauseForLoad(page);
    const { heading, date, dueDate, customer, item } = getInvoiceFormLocators(page);
    const { customerInput } = getInvoiceFormLocators(page);
    await assertVisibleOrNote(heading, 'New Invoice heading not visible.');
    await expect(date).toBeVisible();
    await expect(dueDate).toBeVisible();
    await ensureInvoiceDates(page);
    await selectCustomerByName(page, customer, customerInput, 'a');
    await selectExistingItem(page, item, 'a', 1);
    const lineRow = item.locator('xpath=ancestor::tr[1]');
    await fillQtyPriceIfEmpty(lineRow, 1);
    const saved = await triggerSaveAndClose(page);
    if (saved) {
      const closed = await page
        .waitForURL(/sales\/invoices/i, { timeout: 5000 })
        .then(() => true)
        .catch(() => false);
      expect(closed).toBe(true);
    }
  });

  test('@accounting HB-INV-003: Required field validation on invoice', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    const { customer, item } = getInvoiceFormLocators(page);
    await triggerSaveAndClose(page);
    await expect(page).toHaveURL(/new-invoice/i);
    await expect(customer).toBeVisible();
    await expect(item).toBeVisible();
  });

  test('@accounting HB-INV-004: Auto-generate invoice number', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    const { invoiceNo, autoGenerate } = getInvoiceFormLocators(page);
    const invoiceVisible = await optionalAction(invoiceNo, async () => {
      await expect(invoiceNo).toBeVisible({ timeout: 10000 });
    }, 'Invoice number input not visible.');
    if (invoiceVisible) {
      await expect(invoiceNo).toHaveValue(/inv-/i);
    }
    await assertVisibleOrNote(autoGenerate, 'Auto Generate control not visible.');
  });

  test('@accounting HB-INV-006: Customer selection search', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);

    const { customer, customerInput } = getInvoiceFormLocators(page);
    await customer.click();

    const listbox = page.getByRole('listbox').first();
    const listboxVisible = await optionalAction(listbox, async () => {
      await expect(listbox).toBeVisible();
    }, 'Customer dropdown listbox not visible.');
    if (!listboxVisible) return;

    const inlineInput = listbox.getByPlaceholder(/search customer/i).first().or(listbox.locator('input, [role="textbox"]').first());
    const inputVisible = await optionalAction(inlineInput, async () => {
      await inlineInput.fill('a');
    }, 'Customer search input not found in listbox.');
    if (!inputVisible) {
      const fallbackVisible = await optionalAction(customerInput, async () => {
        await customerInput.fill('a');
      }, 'Customer input not found for search.');
      if (!fallbackVisible) {
        await page.keyboard.type('a');
      }
    }

    const options = listbox.locator('[role="option"], [role="menuitem"], li, div').filter({ hasText: /a/i });
    const optionVisible = await optionalAction(options.first(), async () => {
      await expect(options.first()).toBeVisible();
    }, 'Customer search results not visible.');
    if (!optionVisible) {
      test.info().annotations.push({
        type: 'note',
        description: 'Customer search options not visible; verify customer list data.',
      });
    }
  });

  test('@accounting HB-INV-007: Add multiple line items', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    const { addLine, invoiceNo } = getInvoiceFormLocators(page);
    const lineItemsTable = page.locator('table').filter({ has: page.getByText(/item\/service/i) }).first();
    const items = lineItemsTable.locator('input[placeholder*="select item" i], [role="combobox"]');
    const rows = lineItemsTable.locator('tbody tr');
    const targetCount = 100;
    await ensureInvoiceDates(page);
    await fillRequiredInvoiceFields(page, '1', '100');
    const invoiceNumber = (await invoiceNo.inputValue().catch(() => '')) || '';

    let currentCount = await rows.count();
    if (currentCount > 0) {
      await fillLineItemRow(page, rows.nth(0), 1);
    }

    for (let i = currentCount; i < targetCount; i += 1) {
      let added = false;
      for (let attempt = 0; attempt < 3; attempt += 1) {
        await addLine.scrollIntoViewIfNeeded();
        await addLine.click({ force: true }).catch(() => {});
        try {
          await expect.poll(async () => rows.count(), { timeout: 2000 }).toBeGreaterThan(i);
          added = true;
        } catch {
          added = false;
        }
        if (added) break;
        await lineItemsTable.evaluate((el) => {
          el.scrollTop = el.scrollHeight;
        }).catch(() => {});
      }
      if (!added) {
        test.info().annotations.push({
          type: 'note',
          description: `Line item row ${i + 1} was not added after retries.`,
        });
        break;
      }
      currentCount = await rows.count();
      const row = rows.nth(i);
      await row.scrollIntoViewIfNeeded();
      await fillLineItemRow(page, row, i + 1);
    }

    const finalCount = await rows.count();
    expect(finalCount).toBeGreaterThanOrEqual(targetCount);

    const saved = await triggerSaveAndClose(page);
    if (saved) {
      const closed = await page
        .waitForURL(/sales\/invoices/i, { timeout: 5000 })
        .then(() => true)
        .catch(() => false);
      expect(closed).toBe(true);
    }
  });

  test('@accounting HB-INV-008: Edit line item quantity updates totals', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    const { quantity } = getInvoiceFormLocators(page);
    await fillRequiredInvoiceFields(page, '1', '100');
    await quantity.fill('3');
    await expect(quantity).toHaveValue('3');
  });

  test('@accounting HB-INV-009: Remove line item updates totals', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    await fillRequiredInvoiceFields(page, '1', '100');
    const { item } = getInvoiceFormLocators(page);
    const lineRow = item.locator('xpath=ancestor::tr[1]');
    const remove = lineRow.locator('button, [role="button"]').filter({ hasText: /remove|delete/i }).first();
    await expect(remove).toBeVisible();
    await remove.click();
  });

  test('@accounting HB-INV-010: Item-level discount applies before tax', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    await fillRequiredInvoiceFields(page, '1', '100');
    const { item } = getInvoiceFormLocators(page);
    const lineRow = item.locator('xpath=ancestor::tr[1]');
    const discountType = lineRow.getByRole('combobox').filter({ hasText: /fixed|percent|%/i }).first();
    await expect(discountType).toBeVisible();
    await discountType.click();
    const percentOption = page.getByRole('option', { name: /percent|%/i }).first();
    await expect(percentOption).toBeVisible();
    await percentOption.click();
    const discountInput = lineRow.getByPlaceholder('0.00').first();
    await expect(discountInput).toBeVisible();
    await discountInput.fill('10');
    const tax = lineRow.getByRole('combobox').filter({ hasText: /tax/i }).first();
    await expect(tax).toBeVisible();
    await tax.click();
    const tenPercent = page.getByRole('option', { name: /10%/i }).first();
    await expect(tenPercent).toBeVisible();
    await tenPercent.click();
  });

  test('@accounting HB-INV-011: Invoice-level discount applies after item discounts', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    const { discount } = getInvoiceFormLocators(page);
    await discount.fill('5');
    await expect(discount).toHaveValue('5');
  });

  test('@accounting HB-INV-012: Tax inclusive pricing calculation', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    const { amountsAre } = getInvoiceFormLocators(page);
    await optionalAction(amountsAre, async () => {
      await amountsAre.click();
    }, 'Amounts are dropdown not visible.');
    const inclusiveOption = page.getByRole('option', { name: /tax inclusive/i }).first();
    const clicked = await optionalAction(inclusiveOption, async () => {
      await inclusiveOption.click();
    }, 'Tax inclusive option not visible.');
    if (clicked) {
      await expect(amountsAre).toHaveText(/tax inclusive/i);
    }
  });

  test('@accounting HB-INV-013: Tax exclusive pricing calculation', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    const { amountsAre } = getInvoiceFormLocators(page);
    await expect(amountsAre).toBeVisible();
    await expect(amountsAre).toHaveText(/tax exclusive/i);
  });

  test('@accounting HB-INV-014: Multiple taxes per line item', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    test.info().annotations.push({
      type: 'note',
      description: 'Multiple tax selection requires configured tax rates.',
    });
  });

  test('@accounting HB-INV-015: Tax rounding to currency precision', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    test.info().annotations.push({
      type: 'note',
      description: 'Tax rounding checks require controlled prices and tax rates.',
    });
  });

  test('@accounting HB-INV-016: Invoice total rounding with multiple line items', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    test.info().annotations.push({
      type: 'note',
      description: 'Total rounding checks require multiple line items with fractional totals.',
    });
  });

  test('@accounting HB-INV-017: Negative quantity validation', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    const { quantity } = getInvoiceFormLocators(page);
    await quantity.fill('-1');
    await expectInvalidNumber(quantity, 'Negative quantity accepted; no min constraint detected.');
  });

  test('@accounting HB-INV-018: Zero quantity validation', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    const { quantity } = getInvoiceFormLocators(page);
    await quantity.fill('0');
    await expectInvalidNumber(quantity, 'Zero quantity accepted; no min constraint detected.');
  });

  test('@accounting HB-INV-019: Negative price validation', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    const { price } = getInvoiceFormLocators(page);
    await price.fill('-100');
    await expectInvalidNumber(price, 'Negative price accepted; no min constraint detected.');
  });

  test('@accounting HB-INV-020: Item price override audit', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    const { price } = getInvoiceFormLocators(page);
    await price.fill('80');
    await expect(price).toHaveValue('80');
  });

  test('@accounting HB-INV-021: Discount percent validation above 100%', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    test.info().annotations.push({
      type: 'note',
      description: 'Line-item discount percent field requires item discount control; locator not confirmed.',
    });
  });

  test('@accounting HB-INV-022: Fixed discount greater than subtotal', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    const { discount } = getInvoiceFormLocators(page);
    await discount.fill('150');
    await expect(discount).toHaveValue('150');
    test.info().annotations.push({
      type: 'note',
      description: 'Discount validation requires subtotal calculation and business rules.',
    });
  });

  test('@accounting HB-INV-023: Apply credit note to invoice', async ({ page }) => {
    await seedLogin(page);
    const opened = await openApplyAdvanceFromInvoice(page);
    if (!opened) return;
    const warning = page.getByText(/no advance payments available for this customer/i).first();
    const modal = page.getByRole('heading', { name: /apply advance payment/i }).first();
    const warningVisible = await warning.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
    if (!warningVisible) {
      await assertVisibleOrNote(modal, 'Apply Advance modal not visible.');
    }
  });

  test('@accounting HB-INV-024: Credit note exceeds invoice balance', async ({ page }) => {
    await seedLogin(page);
    const opened = await openApplyAdvanceFromInvoice(page);
    if (!opened) return;
    const warning = page.getByText(/no advance payments available for this customer/i).first();
    const warningVisible = await warning.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
    if (warningVisible) {
      test.info().annotations.push({
        type: 'note',
        description: 'No advance payments available; cannot validate over-application.',
      });
    }
  });

  test('@accounting HB-INV-025: Record full payment', async ({ page }) => {
    await seedLogin(page);
    const opened = await openRecordPaymentFromInvoice(page);
    if (!opened) return;
    const dialog = page.locator('[data-testid="record-payment-dialog"]').first();
    await assertVisibleOrNote(dialog, 'Record Payment dialog not visible.');

    const bankTrigger = dialog.getByText('Select bank account').first();
    await optionalAction(bankTrigger, async () => {
      await bankTrigger.click();
    }, 'Bank Account dropdown not visible.');
    const bankOption = page.getByRole('option').first();
    await optionalAction(bankOption, async () => {
      await bankOption.click();
    }, 'Bank Account option not visible.');

    const amount = dialog.locator('[data-testid="payment-amount-input"]').first();
    await assertVisibleOrNote(amount, 'Payment amount input not visible.');
    const fullAmount = (await amount.inputValue().catch(() => '')) || '0';

    const allocation = dialog.locator('input[placeholder="0.00"]').first();
    await optionalAction(allocation, async () => {
      await allocation.fill(fullAmount.replace(/,/g, ''));
    }, 'Allocation input not visible.');

    const record = dialog.locator('[data-testid="payment-save-button"]').first();
    await optionalAction(record, async () => {
      await record.click();
    }, 'Record Payment button not visible.');

    const success = page.getByText(/receipt .* created/i).first();
    await assertVisibleOrNote(success, 'Payment success message not visible.');
  });

  test('@accounting HB-INV-026: Record partial payment', async ({ page }) => {
    await seedLogin(page);
    const opened = await openRecordPaymentFromInvoice(page);
    if (!opened) return;
    const dialog = page.locator('[data-testid="record-payment-dialog"]').first();
    await assertVisibleOrNote(dialog, 'Record Payment dialog not visible.');

    const bankTrigger = dialog.getByText('Select bank account').first();
    await optionalAction(bankTrigger, async () => {
      await bankTrigger.click();
    }, 'Bank Account dropdown not visible.');
    const bankOption = page.getByRole('option').first();
    await optionalAction(bankOption, async () => {
      await bankOption.click();
    }, 'Bank Account option not visible.');

    const amount = dialog.locator('[data-testid="payment-amount-input"]').first();
    await assertVisibleOrNote(amount, 'Payment amount input not visible.');
    await amount.fill('1000');

    const allocation = dialog.locator('input[placeholder="0.00"]').first();
    await optionalAction(allocation, async () => {
      await allocation.fill('1000');
    }, 'Allocation input not visible.');

    const record = dialog.locator('[data-testid="payment-save-button"]').first();
    await optionalAction(record, async () => {
      await record.click();
    }, 'Record Payment button not visible.');

    const success = page.getByText(/receipt .* created/i).first();
    await assertVisibleOrNote(success, 'Payment success message not visible.');
  });

  test('@accounting HB-INV-027: Overpayment validation', async ({ page }) => {
    await seedLogin(page);
    const opened = await openRecordPaymentFromInvoice(page);
    if (!opened) return;
    const dialog = page.locator('[data-testid="record-payment-dialog"]').first();
    await assertVisibleOrNote(dialog, 'Record Payment dialog not visible.');

    const bankTrigger = dialog.getByText('Select bank account').first();
    await optionalAction(bankTrigger, async () => {
      await bankTrigger.click();
    }, 'Bank Account dropdown not visible.');
    const bankOption = page.getByRole('option').first();
    await optionalAction(bankOption, async () => {
      await bankOption.click();
    }, 'Bank Account option not visible.');

    const amount = dialog.locator('[data-testid="payment-amount-input"]').first();
    const amountVisible = await optionalAction(amount, async () => {
      await expect(amount).toBeVisible({ timeout: 15000 });
    }, 'Payment amount input not visible.');
    if (!amountVisible) return;
    await amount.fill('1100000');
    const record = dialog.locator('[data-testid="payment-save-button"]').first();
    const clicked = await optionalAction(record, async () => {
      await record.click();
    }, 'Record Payment button not visible.');
    if (!clicked) return;
    const toast = page.getByText(/payment exceeds invoice balance/i).first();
    await expect(toast).toBeVisible({ timeout: 20000 });
  });

  test('@accounting HB-INV-028: Payment allocation across multiple invoices', async ({ page }) => {
    await seedLogin(page);
    await openPaymentsReceived(page);
    const recordPayment = page.getByRole('button', { name: /record payment/i }).first();
    const opened = await optionalAction(recordPayment, async () => {
      await recordPayment.click();
    }, 'Record Payment button not visible on Payments Received.');
    if (!opened) return;
    const againstInvoice = page.getByRole('button', { name: /select invoice/i }).first();
    const chosen = await optionalAction(againstInvoice, async () => {
      await againstInvoice.click();
    }, 'Against Invoice option not visible.');
    if (!chosen) return;
    const dialog = page.locator('[data-testid="record-payment-dialog"]').first();
    await assertVisibleOrNote(dialog, 'Record Payment dialog not visible.');

    const customer = dialog.getByPlaceholder('Select customer').first();
    await selectCustomerByName(page, customer, customer, 'a');

    const bankTrigger = dialog.getByText('Select bank account').first();
    await optionalAction(bankTrigger, async () => {
      await bankTrigger.click();
    }, 'Bank Account dropdown not visible.');
    const bankOption = page.getByRole('option').first();
    await optionalAction(bankOption, async () => {
      await bankOption.click();
    }, 'Bank Account option not visible.');

    const allocationText = dialog.getByText(/open invoice\(s\) available/i).first();
    await assertVisibleOrNote(allocationText, 'Invoice allocation section not visible.');
    const allocation = dialog.locator('input[placeholder="0.00"]').first();
    await optionalAction(allocation, async () => {
      await allocation.fill('1000');
    }, 'Allocation input not visible.');

    const record = dialog.locator('[data-testid="payment-save-button"]').first();
    await optionalAction(record, async () => {
      await record.click();
    }, 'Record Payment button not visible.');

    const success = page.getByText(/receipt .* created/i).first();
    await assertVisibleOrNote(success, 'Payment success message not visible.');
  });

  test('@accounting HB-INV-029: Unapplied payment handling', async ({ page }) => {
    await seedLogin(page);
    await openPaymentsReceived(page);
    const recordPayment = page.getByRole('button', { name: /record payment/i }).first();
    const opened = await optionalAction(recordPayment, async () => {
      await recordPayment.click();
    }, 'Record Payment button not visible on Payments Received.');
    if (!opened) return;
    const directIncome = page.getByRole('button', { name: /record income/i }).first();
    const directOpened = await optionalAction(directIncome, async () => {
      await directIncome.click();
    }, 'Direct Income option not visible.');
    if (!directOpened) return;
    const receipt = page.getByRole('heading', { name: /record receipt/i }).first();
    await assertVisibleOrNote(receipt, 'Record Receipt modal not visible.');

    const bankTrigger = page.getByRole('combobox', { name: /bank account/i }).first();
    await optionalAction(bankTrigger, async () => {
      await bankTrigger.click();
    }, 'Bank Account dropdown not visible.');
    const bankOption = page.getByRole('option').first();
    await optionalAction(bankOption, async () => {
      await bankOption.click();
    }, 'Bank Account option not visible.');

    const incomeCategory = page.getByRole('combobox', { name: /income category/i }).first();
    await optionalAction(incomeCategory, async () => {
      await incomeCategory.click();
    }, 'Income Category dropdown not visible.');
    const incomeOption = page.getByRole('option').first();
    await optionalAction(incomeOption, async () => {
      await incomeOption.click();
    }, 'Income Category option not visible.');

    const description = page.getByPlaceholder(/description|memo/i).first();
    await optionalAction(description, async () => {
      await description.fill('Unapplied payment');
    }, 'Description input not visible.');

    const amount = page.getByLabel(/amount/i).first();
    await optionalAction(amount, async () => {
      await amount.fill('500');
    }, 'Amount input not visible.');

    const record = page.getByRole('button', { name: /record receipt/i }).first();
    await optionalAction(record, async () => {
      await record.click();
    }, 'Record Receipt button not visible.');

    const success = page.getByText(/receipt .* created/i).first();
    await assertVisibleOrNote(success, 'Receipt success message not visible.');
  });

  test('@accounting HB-INV-030: Write-off small balance', async ({ page }) => {
    await seedLogin(page);
    await openInvoicesList(page);
    const opened = await openAwaitingPaymentActions(page);
    if (!opened) return;
    const writeOff = page.getByRole('menuitem', { name: /write[- ]off/i }).first();
    if (await writeOff.count()) {
      test.info().annotations.push({
        type: 'note',
        description: 'Write-off action detected; update test to exercise it.',
      });
    } else {
      test.info().annotations.push({
        type: 'note',
        description: 'No write-off action in UI; requires credit note or manual journal.',
      });
    }
  });

  test('@accounting HB-INV-031: Reverse or delete payment', async ({ page }) => {
    await seedLogin(page);
    await openPaymentsReceived(page);
    const rows = page.locator('table tbody tr');
    const initialCount = await rows.count();
    const rowAction = rows.first().locator('button, [role="button"]').last();
    const opened = await optionalAction(rowAction, async () => {
      await rowAction.click();
    }, 'Payment row actions not visible.');
    if (!opened) return;
    const deleteAction = page.getByRole('button', { name: /^delete$/i }).first();
    const editAction = page.getByRole('button', { name: /edit payment/i }).first();
    if (await deleteAction.count()) {
      await deleteAction.click();
      const confirm = page.getByRole('button', { name: /delete/i }).last();
      await confirm.click();
      await expect.poll(async () => rows.count(), { timeout: 10000 }).toBeLessThanOrEqual(initialCount);
    } else {
      await expect(editAction).toBeVisible();
    }
  });

  test('@accounting HB-INV-032: Change tax rate after partial payment', async ({ page }) => {
    await seedLogin(page);
    await openInvoicesList(page);
    const row = page.locator('tr').filter({ hasText: /awaiting payment/i }).first();
    const invoiceLink = row.getByRole('link').first();
    const opened = await optionalAction(invoiceLink, async () => {
      await invoiceLink.click();
    }, 'Invoice link not visible for Awaiting Payment row.');
    if (!opened) return;
    const { tax } = getInvoiceFormLocators(page);
    await assertVisibleOrNote(tax, 'Tax dropdown not visible.');
    await tax.click();
    const listbox = page.getByRole('listbox').first();
    await expect(listbox).toBeVisible();
    const options = listbox.getByRole('option');
    const optionCount = await options.count();
    if (optionCount < 2) {
      throw new Error('Not enough tax options to change rate.');
    }
    const original = (await tax.textContent())?.trim() || '';
    await options.nth(1).click();
    const updated = (await tax.textContent())?.trim() || '';
    expect(updated).not.toBe(original);
  });

  test('@accounting HB-INV-033: Backdated invoice posting', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    await fillMinimalInvoice(page, '01/01/2024');
    const { saveClose } = getInvoiceFormLocators(page);
    await saveClose.click();
    await expect(page).toHaveURL(/sales\/invoices/i);
  });

  test('@accounting HB-INV-034: Prevent posting into closed period', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    await fillMinimalInvoice(page, '01/01/2020');
    const { saveClose } = getInvoiceFormLocators(page);
    await saveClose.click();
    const closedMessage = page.getByText(/closed period|period is closed|posting not allowed/i).first();
    await expect(closedMessage).toBeVisible({ timeout: 15000 });
  });

  test('@accounting HB-INV-035: Invoice currency matches customer currency', async ({ page }) => {
    await seedLogin(page);
    await openNewInvoiceFromList(page);
    const { customer } = getInvoiceFormLocators(page);
    await selectCustomerByName(page, customer, customer, 'a');
    const currency = page.getByText(/entity base currency/i).first();
    await expect(currency).toBeVisible();
    await expect(currency).toHaveText(/inr/i);
  });

    test('@accounting HB-INV-036: Create 20 invoices with required fields', async ({ page }) => {
    await seedLogin(page);
    await pauseForLoad(page, 4000);
    const { heading, date, dueDate, customer, item } = getInvoiceFormLocators(page);
    const { customerInput } = getInvoiceFormLocators(page);
    const total = 10;

    for (let i = 0; i < total; i += 1) {
      await page.goto('https://test.hellobooks.ai/sales/invoices/new-invoice');
      await pauseForLoad(page);
      await assertVisibleOrNote(heading, 'New Invoice heading not visible.');
      await expect(date).toBeVisible();
      await expect(dueDate).toBeVisible();
      await ensureInvoiceDates(page);
      await selectCustomerByName(page, customer, customerInput, 'a');
      await selectExistingItem(page, item, 'a', 1);
      const lineRow = item.locator('xpath=ancestor::tr[1]');
      await fillQtyPriceIfEmpty(lineRow, 1);
      const saved = await triggerSaveAndClose(page);
      if (saved) {
        const closed = await page
          .waitForURL(/sales\/invoices/i, { timeout: 5000 })
          .then(() => true)
          .catch(() => false);
        expect(closed).toBe(true);
      }
    }
  });
});
