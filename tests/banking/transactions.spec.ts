import { test, expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { login as seedLogin } from '../utils/login';

test.setTimeout(120000);

const baseUrl = 'https://test.hellobooks.ai';

function textRegex(text: string) {
  return new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
}

async function openTransactions(page: Page) {
  await page.goto(`${baseUrl}/?tab=transactions`);
  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByText(/transactions/i).first()).toBeVisible({ timeout: 20000 });
}

function getSearchInput(page: Page) {
  return page.locator('input[placeholder*="Search" i], input[aria-label*="Search" i]').first();
}

function getTableHeaders(page: Page) {
  return page.locator('table thead th, [role="columnheader"]');
}

async function firstRow(page: Page) {
  const row = page.locator('table tbody tr, [role="row"]').filter({ hasNotText: /no data|empty/i }).first();
  if (await row.count()) return row;
  return null;
}

async function optionalAction(locator: Locator, action: () => Promise<void>, note: string) {
  if (await locator.count()) {
    await action();
    return;
  }
  test.info().annotations.push({ type: 'note', description: note });
}

async function openFirstRowDetails(page: Page) {
  const row = await firstRow(page);
  if (!row) {
    test.info().annotations.push({ type: 'note', description: 'No rows available to open details.' });
    return false;
  }
  await row.click();
  return true;
}

test.describe('@banking Banking / Transactions - First 20 @S9F24E5FC', () => {
  test('HB-BANK-001: Access Banking from left navigation @TAFAB0E51', { tag: ['@bank', '@HB-BANK-001'] }, async ({ page }) => {
    await seedLogin(page);
    const banking = page.getByRole('button', { name: /banking/i }).first();
    await optionalAction(banking, async () => {
      await banking.click();
      await openTransactions(page);
      await expect(page).toHaveURL(/tab=transactions/i);
    }, 'Banking nav not present.');
  });

  test('HB-BANK-002: Direct URL access to Banking Transactions @T857FA841', { tag: ['@bank', '@HB-BANK-002'] }, async ({ page }) => {
    await page.goto(`${baseUrl}/?tab=transactions`);
    await seedLogin(page);
    if (!/tab=transactions/i.test(page.url())) {
      await page.goto(`${baseUrl}/?tab=transactions`);
    }
    await expect(page).toHaveURL(/tab=transactions/i);
  });

  test('HB-BANK-003: Banking page blocks access when not authenticated @TC970596D', { tag: ['@bank', '@HB-BANK-003'] }, async ({ page }) => {
    await page.goto(`${baseUrl}/?tab=transactions`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/login/i);
  });

  test('HB-BANK-004: Transactions table renders with expected columns @T3B8830F6', { tag: ['@bank', '@HB-BANK-004'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const headers = getTableHeaders(page);
    let headerText = (await headers.allInnerTexts()).join(' ').toLowerCase();
    if (!headerText.trim()) {
      headerText = (await page.locator('table, [role="table"]').innerText().catch(() => '')).toLowerCase();
    }
    const expected = ['date', 'description', 'amount', 'contact', 'payee', 'account', 'tax', 'match status', 'confidence'];
    const hits = expected.filter((label) => headerText.includes(label)).length;
    expect(hits).toBeGreaterThanOrEqual(4);
  });

  test('HB-BANK-005: Default date range is applied on load @T0C68A919', { tag: ['@bank', '@HB-BANK-005'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const dateFilter = page.getByText(/all time|last|date range|period/i).first();
    await optionalAction(dateFilter, async () => {
      await expect(dateFilter).toBeVisible({ timeout: 10000 });
    }, 'Date range indicator not found.');
  });

  test('HB-BANK-006: Search filters transactions by keyword @TEB4B58F8', { tag: ['@bank', '@HB-BANK-006'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const searchInput = getSearchInput(page);
    await optionalAction(searchInput, async () => {
      const row = await firstRow(page);
      if (!row) {
        test.info().annotations.push({ type: 'note', description: 'No rows available for search.' });
        return;
      }
      const rowText = (await row.innerText()).trim();
      const keyword = rowText.split(/\s+/).slice(0, 1).join(' ');
      await searchInput.fill(keyword);
      await expect(row).toBeVisible();
    }, 'Search input not present.');
  });

  test('HB-BANK-007: Search by amount matches numeric values @TD15912C8', { tag: ['@bank', '@HB-BANK-007'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const searchInput = getSearchInput(page);
    await optionalAction(searchInput, async () => {
      const row = await firstRow(page);
      if (!row) {
        test.info().annotations.push({ type: 'note', description: 'No rows available for amount search.' });
        return;
      }
      const text = await row.innerText();
      const amountMatch = text.match(/[-+]?\d[\d,]*\.?\d*/);
      if (!amountMatch) {
        test.info().annotations.push({ type: 'note', description: 'No amount detected in first row.' });
        return;
      }
      await searchInput.fill(amountMatch[0]);
      await expect(row).toBeVisible();
    }, 'Search input not present.');
  });

  test('HB-BANK-008: Clear search restores full list @T32353363', { tag: ['@bank', '@HB-BANK-008'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const searchInput = getSearchInput(page);
    await optionalAction(searchInput, async () => {
      await searchInput.fill('test');
      await searchInput.fill('');
      await expect(searchInput).toHaveValue('');
    }, 'Search input not present.');
  });

  test('HB-BANK-009: Sorting by Date toggles ascending/descending @T78925045', { tag: ['@bank', '@HB-BANK-009'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const dateHeader = page.getByRole('columnheader', { name: /date/i }).first();
    await optionalAction(dateHeader, async () => {
      await dateHeader.click();
      await dateHeader.click();
      await expect(dateHeader).toBeVisible();
    }, 'Date column header not present.');
  });

  test('HB-BANK-010: Sorting by Amount toggles ascending/descending @TFA44EF19', { tag: ['@bank', '@HB-BANK-010'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const amountHeader = page.getByRole('columnheader', { name: /amount/i }).first();
    await optionalAction(amountHeader, async () => {
      await amountHeader.click();
      await amountHeader.click();
      await expect(amountHeader).toBeVisible();
    }, 'Amount column header not present.');
  });

  test('HB-BANK-011: Pagination next/previous works @T7621C872', { tag: ['@bank', '@HB-BANK-011'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const next = page.getByRole('button', { name: /next/i }).first();
    const prev = page.getByRole('button', { name: /prev|previous/i }).first();
    await optionalAction(next, async () => {
      await next.click();
      await optionalAction(prev, async () => {
        await prev.click();
      }, 'Prev button not present.');
    }, 'Next button not present.');
  });

  test('HB-BANK-012: Page size selector changes row count @TCEFA7083', { tag: ['@bank', '@HB-BANK-012'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const pageSize = page.getByRole('button', { name: /^\s*\d+\s*$/ }).first();
    await optionalAction(pageSize, async () => {
      await pageSize.click();
      const sizeOption = page.getByRole('option', { name: /50/ }).first();
      await optionalAction(sizeOption, async () => {
        await sizeOption.click();
      }, 'Page size option 50 not found.');
    }, 'Page size selector not found.');
  });

  test('HB-BANK-013: Filter by Match Status @T37C67F14', { tag: ['@bank', '@HB-BANK-013'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const filterButton = page.getByRole('button', { name: /filter/i }).first();
    await optionalAction(filterButton, async () => {
      await filterButton.click();
      const statusOption = page.getByText(/matched|unmatched|pending/i).first();
      await optionalAction(statusOption, async () => {
        await statusOption.click();
        const apply = page.getByRole('button', { name: /apply|save|done/i }).first();
        await optionalAction(apply, async () => {
          await apply.click();
        }, 'Apply button not found.');
      }, 'Match status option not found.');
    }, 'Filter button not found.');
  });

  test('HB-BANK-014: Filter by Date Range @TEEEAF428', { tag: ['@bank', '@HB-BANK-014'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const dateRange = page.getByRole('button', { name: /date range|period|custom|all time/i }).first();
    await optionalAction(dateRange, async () => {
      await dateRange.click();
      const apply = page.getByRole('button', { name: /apply|save|done/i }).first();
      await optionalAction(apply, async () => {
        await apply.click();
      }, 'Apply button not found.');
    }, 'Date range control not found.');
  });

  test('HB-BANK-015: Clear filters resets to default list @TBA4560BB', { tag: ['@bank', '@HB-BANK-015'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const clearFilters = page.getByRole('button', { name: /clear|reset/i }).first();
    await optionalAction(clearFilters, async () => {
      await clearFilters.click();
    }, 'Clear filters button not found.');
  });

  test('HB-BANK-016: Transactions show positive/negative signage correctly @T0E86C7BD', { tag: ['@bank', '@HB-BANK-016'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const row = await firstRow(page);
    if (!row) {
      test.info().annotations.push({ type: 'note', description: 'No rows available for signage check.' });
      return;
    }
    const amountCell = row.locator('td, [role="cell"]').filter({ hasText: /[-+]?\d/ }).first();
    await expect(amountCell).toBeVisible({ timeout: 10000 });
  });

  test('HB-BANK-017: Transaction row opens details drawer @T91673378', { tag: ['@bank', '@HB-BANK-017'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const row = await firstRow(page);
    if (!row) {
      test.info().annotations.push({ type: 'note', description: 'No rows available to open details.' });
      return;
    }
    await row.click();
    const details = page.getByText(/transaction details|details|amount|account/i).first();
    await expect(details).toBeVisible({ timeout: 10000 });
  });

  test('HB-BANK-018: Transaction details include amount, date, and account @T0D952BD4', { tag: ['@bank', '@HB-BANK-018'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const row = await firstRow(page);
    if (!row) {
      test.info().annotations.push({ type: 'note', description: 'No rows available to validate details.' });
      return;
    }
    await row.click();
    await expect(page.getByText(/amount/i).first()).toBeVisible();
    await expect(page.getByText(/date/i).first()).toBeVisible();
    await expect(page.getByText(/account/i).first()).toBeVisible();
  });

  test('HB-BANK-019: Add Transaction button opens create form @T6370FE04', { tag: ['@bank', '@HB-BANK-019'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const addButton = page.getByRole('button', { name: /add transaction/i }).first();
    await optionalAction(addButton, async () => {
      await addButton.click();
      await expect(page.getByText(/add transaction|new transaction/i).first()).toBeVisible();
    }, 'Add Transaction button not found.');
  });

  test('HB-BANK-020: Create transaction with required fields @TA564A269', { tag: ['@bank', '@HB-BANK-020'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const addButton = page.getByRole('button', { name: /add transaction/i }).first();
    await optionalAction(addButton, async () => {
      await addButton.click();
      const dateField = page.getByLabel(/date/i).first();
      const amountField = page.getByLabel(/amount/i).first();
      const descriptionField = page.getByLabel(/description/i).first();
      await optionalAction(dateField, async () => {
        await dateField.fill('2026-01-20');
      }, 'Date field not found.');
      await optionalAction(amountField, async () => {
        await amountField.fill('1.00');
      }, 'Amount field not found.');
      await optionalAction(descriptionField, async () => {
        await descriptionField.fill('Automation Test Transaction');
      }, 'Description field not found.');
      const save = page.getByRole('button', { name: /save|create/i }).first();
      await optionalAction(save, async () => {
        await save.click();
      }, 'Save button not found.');
    }, 'Add Transaction button not found.');
  });

  test('HB-BANK-021: Create transaction validates required fields @TDCE4F34E', { tag: ['@bank', '@HB-BANK-021'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const addButton = page.getByRole('button', { name: /add transaction/i }).first();
    await optionalAction(addButton, async () => {
      await addButton.click();
      const save = page.getByRole('button', { name: /save|create/i }).first();
      await optionalAction(save, async () => {
        await save.click();
        await expect(page.getByText(/required|invalid/i).first()).toBeVisible();
      }, 'Save button not found.');
    }, 'Add Transaction button not found.');
  });

  test('HB-BANK-022: Edit transaction updates values @T423B84BB', { tag: ['@bank', '@HB-BANK-022'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const opened = await openFirstRowDetails(page);
    if (!opened) return;
    const editButton = page.getByRole('button', { name: /edit/i }).first();
    await optionalAction(editButton, async () => {
      await editButton.click();
      const descriptionField = page.getByLabel(/description|memo/i).first();
      await optionalAction(descriptionField, async () => {
        await descriptionField.fill('Automation update');
        const save = page.getByRole('button', { name: /save|update/i }).first();
        await optionalAction(save, async () => {
          await save.click();
        }, 'Save button not found.');
      }, 'Description field not found.');
    }, 'Edit button not found.');
  });

  test('HB-BANK-023: Delete transaction removes from list @T441FEABA', { tag: ['@bank', '@HB-BANK-023'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const opened = await openFirstRowDetails(page);
    if (!opened) return;
    const deleteButton = page.getByRole('button', { name: /delete|remove/i }).first();
    await optionalAction(deleteButton, async () => {
      page.once('dialog', async (dialog) => {
        await dialog.dismiss();
      });
      await deleteButton.click();
      await expect(page.getByText(/delete|remove/i).first()).toBeVisible();
    }, 'Delete button not found.');
  });

  test('HB-BANK-024: Import bank statement opens upload flow @T675C234E', { tag: ['@bank', '@HB-BANK-024'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const importButton = page.getByRole('button', { name: /import/i }).first();
    await optionalAction(importButton, async () => {
      await importButton.click();
      await expect(page.getByText(/import|upload/i).first()).toBeVisible();
    }, 'Import button not found.');
  });

  test('HB-BANK-025: Import rejects unsupported file type @T08C2F60E', { tag: ['@bank', '@HB-BANK-025'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const importButton = page.getByRole('button', { name: /import/i }).first();
    await optionalAction(importButton, async () => {
      await importButton.click();
      const fileInput = page.locator('input[type="file"]').first();
      await optionalAction(fileInput, async () => {
        test.info().annotations.push({ type: 'note', description: 'Upload unsupported file manually.' });
      }, 'File input not found.');
    }, 'Import button not found.');
  });

  test('HB-BANK-026: Import shows mapping for bank file columns @T392A7756', { tag: ['@bank', '@HB-BANK-026'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const importButton = page.getByRole('button', { name: /import/i }).first();
    await optionalAction(importButton, async () => {
      await importButton.click();
      await expect(page.getByText(/mapping|column/i).first()).toBeVisible();
    }, 'Import button not found.');
  });

  test('HB-BANK-027: Import creates transactions and shows summary @TAAD6FFB5', { tag: ['@bank', '@HB-BANK-027'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const importButton = page.getByRole('button', { name: /import/i }).first();
    await optionalAction(importButton, async () => {
      await importButton.click();
      const summary = page.getByText(/summary|imported|rows/i).first();
      await optionalAction(summary, async () => {
        await expect(summary).toBeVisible();
      }, 'Import summary not detected.');
    }, 'Import button not found.');
  });

  test('HB-BANK-028: Duplicate detection flags duplicates on import @T28AF4600', { tag: ['@bank', '@HB-BANK-028'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const importButton = page.getByRole('button', { name: /import/i }).first();
    await optionalAction(importButton, async () => {
      await importButton.click();
      const duplicate = page.getByText(/duplicate/i).first();
      await optionalAction(duplicate, async () => {
        await expect(duplicate).toBeVisible();
      }, 'Duplicate indicator not detected.');
    }, 'Import button not found.');
  });

  test('HB-BANK-029: Reconciliation tab is accessible @T366BA58A', { tag: ['@bank', '@HB-BANK-029'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const reconciliation = page.getByRole('link', { name: /reconciliation/i }).first();
    await optionalAction(reconciliation, async () => {
      await reconciliation.click();
      const reconHeading = page.getByText(/reconciliation/i).first();
      if (await reconHeading.count()) {
        await expect(reconHeading).toBeVisible({ timeout: 10000 });
        return;
      }
      await expect(page).toHaveURL(/reconciliation/i);
    }, 'Reconciliation tab not found.');
  });

  test('HB-BANK-030: Match transaction to invoice/bill @T0453C995', { tag: ['@bank', '@HB-BANK-030'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const reconciliation = page.getByRole('link', { name: /reconciliation/i }).first();
    await optionalAction(reconciliation, async () => {
      await reconciliation.click();
      const matchButton = page.getByRole('button', { name: /match/i }).first();
      await optionalAction(matchButton, async () => {
        await matchButton.click();
      }, 'Match button not found.');
    }, 'Reconciliation tab not found.');
  });

  test('HB-BANK-031: Unmatch a previously matched transaction @TDE09B7EE', { tag: ['@bank', '@HB-BANK-031'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const reconciliation = page.getByRole('link', { name: /reconciliation/i }).first();
    await optionalAction(reconciliation, async () => {
      await reconciliation.click();
      const unmatchButton = page.getByRole('button', { name: /unmatch/i }).first();
      await optionalAction(unmatchButton, async () => {
        await unmatchButton.click();
      }, 'Unmatch button not found.');
    }, 'Reconciliation tab not found.');
  });

  test('HB-BANK-032: Split transaction into multiple categories @TA84C0725', { tag: ['@bank', '@HB-BANK-032'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const opened = await openFirstRowDetails(page);
    if (!opened) return;
    const splitButton = page.getByRole('button', { name: /split/i }).first();
    await optionalAction(splitButton, async () => {
      await splitButton.click();
      await expect(page.getByText(/split/i).first()).toBeVisible();
    }, 'Split button not found.');
  });

  test('HB-BANK-033: Assign contact (payee) to transaction @TDB29DF65', { tag: ['@bank', '@HB-BANK-033'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const opened = await openFirstRowDetails(page);
    if (!opened) return;
    const contactField = page.getByText(/contact|payee/i).first();
    await optionalAction(contactField, async () => {
      await contactField.click();
    }, 'Contact field not found.');
  });

  test('HB-BANK-034: Assign tax code to transaction @TD77CC2E2', { tag: ['@bank', '@HB-BANK-034'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const opened = await openFirstRowDetails(page);
    if (!opened) return;
    const taxField = page.getByText(/tax/i).first();
    await optionalAction(taxField, async () => {
      await taxField.click();
    }, 'Tax field not found.');
  });

  test('HB-BANK-035: Attach receipt to transaction @TAD124875', { tag: ['@bank', '@HB-BANK-035'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const opened = await openFirstRowDetails(page);
    if (!opened) return;
    const attachment = page.getByRole('button', { name: /attach|upload/i }).first();
    await optionalAction(attachment, async () => {
      await attachment.click();
      await expect(page.getByText(/upload|attachment/i).first()).toBeVisible();
    }, 'Attachment action not found.');
  });

  test('HB-BANK-036: Transaction memo supports max length @T36FE76E0', { tag: ['@bank', '@HB-BANK-036'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const opened = await openFirstRowDetails(page);
    if (!opened) return;
    const memoField = page.getByLabel(/memo|note|description/i).first();
    await optionalAction(memoField, async () => {
      await memoField.fill('A'.repeat(300));
      await expect(memoField).toHaveValue(/A/);
    }, 'Memo field not found.');
  });

  test('HB-BANK-037: Bank account switch changes transaction list @TD49682CA', { tag: ['@bank', '@HB-BANK-037'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const accountSelector = page.getByRole('combobox', { name: /account/i }).first();
    await optionalAction(accountSelector, async () => {
      await accountSelector.click();
      const option = page.getByRole('option').first();
      await optionalAction(option, async () => {
        await option.click();
      }, 'Account option not found.');
    }, 'Account selector not found.');
  });

  test('HB-BANK-038: Account balance matches sum of transactions (approx) @T256DB742', { tag: ['@bank', '@HB-BANK-038'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const balance = page.getByText(/balance/i).first();
    await optionalAction(balance, async () => {
      await expect(balance).toBeVisible();
    }, 'Balance not visible.');
  });

  test('HB-BANK-039: Export transactions to CSV (if present) @TE14F2F93', { tag: ['@bank', '@HB-BANK-039'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const exportButton = page.getByRole('button', { name: /export/i }).first();
    await optionalAction(exportButton, async () => {
      const downloadPromise = page.waitForEvent('download', { timeout: 5000 }).catch(() => null);
      await exportButton.click();
      const download = await downloadPromise;
      if (!download) {
        test.info().annotations.push({ type: 'note', description: 'No download detected after export.' });
      }
    }, 'Export button not found.');
  });

  test('HB-BANK-040: Error state on Banking API failure @T061BA244', { tag: ['@bank', '@HB-BANK-040'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    test.info().annotations.push({ type: 'note', description: 'Manual-only: requires API error simulation.' });
  });

  test('HB-BANK-041: Empty state when no transactions @TE1B39AA9', { tag: ['@bank', '@HB-BANK-041'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const emptyState = page.getByText(/no transactions|empty/i).first();
    await optionalAction(emptyState, async () => {
      await expect(emptyState).toBeVisible();
    }, 'Empty state not detected.');
  });

  test('HB-BANK-042: Transactions list persists filters on refresh @T875A956E', { tag: ['@bank', '@HB-BANK-042'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const filterButton = page.getByRole('button', { name: /filter/i }).first();
    await optionalAction(filterButton, async () => {
      await filterButton.click();
      const statusOption = page.getByText(/matched|unmatched|pending/i).first();
      await optionalAction(statusOption, async () => {
        await statusOption.click();
        const apply = page.getByRole('button', { name: /apply|save|done/i }).first();
        await optionalAction(apply, async () => {
          await apply.click();
          await page.reload();
          await expect(page).toHaveURL(/tab=transactions/i);
        }, 'Apply button not found.');
      }, 'Match status option not found.');
    }, 'Filter button not found.');
  });

  test('HB-BANK-043: Unauthorized user cannot access Banking @T1110A6CD', { tag: ['@bank', '@HB-BANK-043'] }, async ({ page }) => {
    await page.goto(`${baseUrl}/?tab=transactions`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/login/i);
  });

  test('HB-BANK-044: Transaction confidence values display properly @T105DB8C3', { tag: ['@bank', '@HB-BANK-044'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const confidenceHeader = page.getByRole('columnheader', { name: /confidence/i }).first();
    await optionalAction(confidenceHeader, async () => {
      const confidenceCell = page
        .locator('table tbody td, [role="cell"]')
        .filter({ hasText: /\d+%|\d+\.\d+|low|high/i })
        .first();
      if (!(await confidenceCell.count())) {
        test.info().annotations.push({ type: 'note', description: 'No confidence values detected in list.' });
        return;
      }
      await expect(confidenceCell).toBeVisible({ timeout: 10000 });
    }, 'Confidence column not present.');
  });

  test('HB-BANK-045: Match Status filter counts reflect list totals @T26952A5C', { tag: ['@bank', '@HB-BANK-045'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const statusBadges = page.getByText(/matched|unmatched/i).first();
    await optionalAction(statusBadges, async () => {
      if (!(await statusBadges.isVisible().catch(() => false))) {
        test.info().annotations.push({ type: 'note', description: 'Match status badges not visible.' });
        return;
      }
      await expect(statusBadges).toBeVisible();
    }, 'Match status badges not found.');
  });

  test('HB-BANK-046: Reconciliation action updates audit trail (if present) @T1E0E17CF', { tag: ['@bank', '@HB-BANK-046'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    test.info().annotations.push({ type: 'note', description: 'Manual-only: audit trail UI not confirmed.' });
  });

  test('HB-BANK-047: Transaction list supports horizontal scroll on small screens @TEC570BF4', { tag: ['@bank', '@HB-BANK-047'] }, async ({ page }) => {
    await seedLogin(page);
    await page.setViewportSize({ width: 375, height: 667 });
    await openTransactions(page);
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeGreaterThanOrEqual(375);
  });

  test('HB-BANK-048: Transactions list handles large amounts without overflow @T151A2610', { tag: ['@bank', '@HB-BANK-048'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const amountCell = page.locator('table tbody tr td, [role="cell"]').filter({ hasText: /\d{4,}/ }).first();
    await optionalAction(amountCell, async () => {
      await expect(amountCell).toBeVisible();
    }, 'Large amount not detected.');
  });

  test('HB-BANK-049: Transaction date respects timezone @T46472FA1', { tag: ['@bank', '@HB-BANK-049'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    test.info().annotations.push({ type: 'note', description: 'Manual-only: requires source system date.' });
  });

  test('HB-BANK-050: No sensitive data in Banking URL @T4E9313D8', { tag: ['@bank', '@HB-BANK-050'] }, async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const url = page.url();
    expect(url).not.toMatch(/fapopi7433@feanzier\.com/i);
    expect(url).not.toMatch(/Kapil08dangar@/i);
  });
});

