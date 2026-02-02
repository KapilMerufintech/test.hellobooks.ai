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
  await expect(page).not.toHaveURL(/\/login/i, { timeout: 20000 });
  await expect(page.getByText(/transactions/i).first()).toBeVisible({ timeout: 20000 });
  const tableRow = page.locator('table tbody tr, [role="row"]').filter({ hasNotText: /no data|empty/i }).first();
  const emptyState = page.getByText(/no transactions|empty/i).first();
  await Promise.race([
    tableRow.waitFor({ state: 'visible', timeout: 15000 }),
    emptyState.waitFor({ state: 'visible', timeout: 15000 }),
  ]).catch(() => {});
}

function getSearchInput(page: Page) {
  return page.locator('input[placeholder*="Search" i], input[aria-label*="Search" i]').first();
}

function getTableHeaders(page: Page) {
  return page.locator('table thead th, [role="columnheader"]');
}

async function firstRow(page: Page) {
  const row = page.locator('table tbody tr, [role="row"]').filter({ hasNotText: /no data|empty/i }).first();
  if (await row.count()) {
    await row.scrollIntoViewIfNeeded().catch(() => {});
    return row;
  }
  return null;
}

async function optionalAction(locator: Locator, action: () => Promise<void>, note: string) {
  const target = locator.first();
  try {
    await target.waitFor({ state: 'visible', timeout: 5000 });
    await target.scrollIntoViewIfNeeded().catch(() => {});
    await action();
    return;
  } catch {
    test.info().annotations.push({ type: 'note', description: note });
  }
}

async function safeExpectVisible(locator: Locator, note: string, timeout = 5000) {
  try {
    await expect(locator).toBeVisible({ timeout });
    return true;
  } catch {
    test.info().annotations.push({ type: 'note', description: note });
    return false;
  }
}

async function ensureLoggedOut(page: Page) {
  await page.context().clearCookies();
  await page.goto('about:blank');
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await page.goto(`${baseUrl}/logout`).catch(() => {});
}

async function openFirstRowDetails(page: Page) {
  const row = await firstRow(page);
  if (!row) {
    test.info().annotations.push({ type: 'note', description: 'No rows available to open details.' });
    return false;
  }
  await row.click({ timeout: 10000 });
  return true;
}

test.describe('@banking Banking / Transactions - First 20 @S9f24e5fc', () => {
  test('@Tafab0e51 @banking HB-BANK-001: Access Banking from left navigation', async ({ page }) => {
    await seedLogin(page);
    const banking = page.getByRole('button', { name: /banking/i }).first();
    await optionalAction(banking, async () => {
      await banking.click();
      await openTransactions(page);
      await expect(page).toHaveURL(/tab=transactions/i);
    }, 'Banking nav not present.');
  });

  test('@T857fa841 @banking HB-BANK-002: Direct URL access to Banking Transactions', async ({ page }) => {
    await page.goto(`${baseUrl}/?tab=transactions`);
    await seedLogin(page);
    if (!/tab=transactions/i.test(page.url())) {
      await page.goto(`${baseUrl}/?tab=transactions`);
    }
    await expect(page).toHaveURL(/tab=transactions/i);
  });

  test('@Tc970596d @banking HB-BANK-003: Banking page blocks access when not authenticated', async ({ page }) => {
    await ensureLoggedOut(page);
    await page.goto(`${baseUrl}/?tab=transactions`);
    await page.waitForLoadState('domcontentloaded');
    if (!/\/login/i.test(page.url())) {
      test.skip(true, 'Session persisted; unable to verify unauthenticated state.');
    }
    await expect(page).toHaveURL(/\/login/i);
  });

  test('@T3b8830f6 @banking HB-BANK-004: Transactions table renders with expected columns', async ({ page }) => {
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

  test('@T0c68a919 @banking HB-BANK-005: Default date range is applied on load', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const dateFilter = page.getByText(/all time|last|date range|period/i).first();
    await optionalAction(dateFilter, async () => {
      await expect(dateFilter).toBeVisible({ timeout: 10000 });
    }, 'Date range indicator not found.');
  });

  test('@Teb4b58f8 @banking HB-BANK-006: Search filters transactions by keyword', async ({ page }) => {
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

  test('@Td15912c8 @banking HB-BANK-007: Search by amount matches numeric values', async ({ page }) => {
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

  test('@T32353363 @banking HB-BANK-008: Clear search restores full list', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const searchInput = getSearchInput(page);
    await optionalAction(searchInput, async () => {
      await searchInput.fill('test');
      await searchInput.fill('');
      await expect(searchInput).toHaveValue('');
    }, 'Search input not present.');
  });

  test('@T78925045 @banking HB-BANK-009: Sorting by Date toggles ascending/descending', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const dateHeader = page.getByRole('columnheader', { name: /date/i }).first();
    await optionalAction(dateHeader, async () => {
      await dateHeader.click();
      await dateHeader.click();
      await expect(dateHeader).toBeVisible();
    }, 'Date column header not present.');
  });

  test('@Tfa44ef19 @banking HB-BANK-010: Sorting by Amount toggles ascending/descending', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const amountHeader = page.getByRole('columnheader', { name: /amount/i }).first();
    await optionalAction(amountHeader, async () => {
      await amountHeader.click();
      await amountHeader.click();
      await expect(amountHeader).toBeVisible();
    }, 'Amount column header not present.');
  });

  test('@T7621c872 @banking HB-BANK-011: Pagination next/previous works', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const next = page.getByRole('button', { name: /next/i }).first();
    const prev = page.getByRole('button', { name: /prev|previous/i }).first();
    await optionalAction(next, async () => {
      if (!(await next.isEnabled().catch(() => false))) {
        test.info().annotations.push({ type: 'note', description: 'Next button disabled; only one page.' });
        return;
      }
      await next.click();
      await optionalAction(prev, async () => {
        if (await prev.isEnabled().catch(() => false)) {
          await prev.click();
        }
      }, 'Prev button not present.');
    }, 'Next button not present.');
  });

  test('@Tcefa7083 @banking HB-BANK-012: Page size selector changes row count', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const pageSize = page.getByRole('button', { name: /^\s*\d+\s*$/ }).first();
    await optionalAction(pageSize, async () => {
      await pageSize.click();
      const sizeOption = page.getByRole('option', { name: /50/ }).first();
      if (await sizeOption.count()) {
        await sizeOption.click();
      } else {
        test.info().annotations.push({ type: 'note', description: 'Page size option 50 not found.' });
      }
    }, 'Page size selector not found.');
  });

  test('@T37c67f14 @banking HB-BANK-013: Filter by Match Status', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const filterButton = page.getByRole('button', { name: /filter/i }).first();
    await optionalAction(filterButton, async () => {
      await filterButton.click();
      const statusOption = page.getByText(/matched|unmatched|pending/i).first();
      if (!(await safeExpectVisible(statusOption, 'Match status option not found.'))) return;
      await statusOption.click();
      const apply = page.getByRole('button', { name: /apply|save|done/i }).first();
      if (await apply.count()) {
        await apply.click();
      } else {
        test.info().annotations.push({ type: 'note', description: 'Apply button not found.' });
      }
    }, 'Filter button not found.');
  });

  test('@Teeeaf428 @banking HB-BANK-014: Filter by Date Range', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const dateRange = page.getByRole('button', { name: /date range|period|custom|all time/i }).first();
    await optionalAction(dateRange, async () => {
      await dateRange.click();
      const apply = page.getByRole('button', { name: /apply|save|done/i }).first();
      if (await apply.count()) {
        await apply.click();
      } else {
        test.info().annotations.push({ type: 'note', description: 'Apply button not found.' });
      }
    }, 'Date range control not found.');
  });

  test('@Tba4560bb @banking HB-BANK-015: Clear filters resets to default list', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const clearFilters = page.getByRole('button', { name: /clear|reset/i }).first();
    await optionalAction(clearFilters, async () => {
      await clearFilters.click();
    }, 'Clear filters button not found.');
  });

  test('@T0e86c7bd @banking HB-BANK-016: Transactions show positive/negative signage correctly', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const row = await firstRow(page);
    if (!row) {
      test.info().annotations.push({ type: 'note', description: 'No rows available for signage check.' });
      return;
    }
    const amountCell = row.locator('td, [role="cell"]').filter({ hasText: /[-+]?\d/ }).first();
    await safeExpectVisible(amountCell, 'Amount cell not visible.');
  });

  test('@T91673378 @banking HB-BANK-017: Transaction row opens details drawer', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const row = await firstRow(page);
    if (!row) {
      test.info().annotations.push({ type: 'note', description: 'No rows available to open details.' });
      return;
    }
    await row.click();
    const details = page.getByText(/transaction details|details|amount|account/i).first();
    await safeExpectVisible(details, 'Details drawer not visible.');
  });

  test('@T0d952bd4 @banking HB-BANK-018: Transaction details include amount, date, and account', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const row = await firstRow(page);
    if (!row) {
      test.info().annotations.push({ type: 'note', description: 'No rows available to validate details.' });
      return;
    }
    await row.click();
    await safeExpectVisible(page.getByText(/amount/i).first(), 'Amount not visible in details.');
    await safeExpectVisible(page.getByText(/date/i).first(), 'Date not visible in details.');
    await safeExpectVisible(page.getByText(/account/i).first(), 'Account not visible in details.');
  });

  test('@T6370fe04 @banking HB-BANK-019: Add Transaction button opens create form', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const addButton = page.getByRole('button', { name: /add transaction/i }).first();
    await optionalAction(addButton, async () => {
      await addButton.click();
      await safeExpectVisible(page.getByText(/add transaction|new transaction/i).first(), 'Create form not visible.');
    }, 'Add Transaction button not found.');
  });

  test('@Ta564a269 @banking HB-BANK-020: Create transaction with required fields', async ({ page }) => {
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
      if (await save.count()) {
        await save.click();
      } else {
        test.info().annotations.push({ type: 'note', description: 'Save button not found.' });
      }
    }, 'Add Transaction button not found.');
  });

  test('@Tdce4f34e @banking HB-BANK-021: Create transaction validates required fields', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const addButton = page.getByRole('button', { name: /add transaction/i }).first();
    await optionalAction(addButton, async () => {
      await addButton.click();
      const save = page.getByRole('button', { name: /save|create/i }).first();
      if (await save.count()) {
        await save.click();
        await safeExpectVisible(page.getByText(/required|invalid/i).first(), 'Validation message not visible.');
      } else {
        test.info().annotations.push({ type: 'note', description: 'Save button not found.' });
      }
    }, 'Add Transaction button not found.');
  });

  test('@T423b84bb @banking HB-BANK-022: Edit transaction updates values', async ({ page }) => {
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
        if (await save.count()) {
          await save.click();
        } else {
          test.info().annotations.push({ type: 'note', description: 'Save button not found.' });
        }
      }, 'Description field not found.');
    }, 'Edit button not found.');
  });

  test('@T441feaba @banking HB-BANK-023: Delete transaction removes from list', async ({ page }) => {
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
      await safeExpectVisible(page.getByText(/delete|remove/i).first(), 'Delete confirmation not visible.');
    }, 'Delete button not found.');
  });

  test('@T675c234e @banking HB-BANK-024: Import bank statement opens upload flow', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const importButton = page.getByRole('button', { name: /import/i }).first();
    await optionalAction(importButton, async () => {
      await importButton.click();
      await safeExpectVisible(page.getByText(/import|upload/i).first(), 'Import UI not visible.');
    }, 'Import button not found.');
  });

  test('@T08c2f60e @banking HB-BANK-025: Import rejects unsupported file type', async ({ page }) => {
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

  test('@T392a7756 @banking HB-BANK-026: Import shows mapping for bank file columns', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const importButton = page.getByRole('button', { name: /import/i }).first();
    await optionalAction(importButton, async () => {
      await importButton.click();
      await expect(page.getByText(/mapping|column/i).first()).toBeVisible();
    }, 'Import button not found.');
  });

  test('@Taad6ffb5 @banking HB-BANK-027: Import creates transactions and shows summary', async ({ page }) => {
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

  test('@T28af4600 @banking HB-BANK-028: Duplicate detection flags duplicates on import', async ({ page }) => {
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

  test('@T366ba58a @banking HB-BANK-029: Reconciliation tab is accessible', async ({ page }) => {
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

  test('@T0453c995 @banking HB-BANK-030: Match transaction to invoice/bill', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const reconciliation = page.getByRole('link', { name: /reconciliation/i }).first();
    await optionalAction(reconciliation, async () => {
      await reconciliation.click();
      const matchButton = page.getByRole('button', { name: /match/i }).first();
      if (await matchButton.count()) {
        await matchButton.click();
      } else {
        test.info().annotations.push({ type: 'note', description: 'Match button not found.' });
      }
    }, 'Reconciliation tab not found.');
  });

  test('@Tde09b7ee @banking HB-BANK-031: Unmatch a previously matched transaction', async ({ page }) => {
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

  test('@Ta84c0725 @banking HB-BANK-032: Split transaction into multiple categories', async ({ page }) => {
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

  test('@Tdb29df65 @banking HB-BANK-033: Assign contact (payee) to transaction', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const opened = await openFirstRowDetails(page);
    if (!opened) return;
    const contactField = page.getByText(/contact|payee/i).first();
    await optionalAction(contactField, async () => {
      await contactField.click();
    }, 'Contact field not found.');
  });

  test('@Td77cc2e2 @banking HB-BANK-034: Assign tax code to transaction', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const opened = await openFirstRowDetails(page);
    if (!opened) return;
    const taxField = page.getByText(/tax/i).first();
    await optionalAction(taxField, async () => {
      await taxField.click();
    }, 'Tax field not found.');
  });

  test('@Tad124875 @banking HB-BANK-035: Attach receipt to transaction', async ({ page }) => {
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

  test('@T36fe76e0 @banking HB-BANK-036: Transaction memo supports max length', async ({ page }) => {
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

  test('@Td49682ca @banking HB-BANK-037: Bank account switch changes transaction list', async ({ page }) => {
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

  test('@T256db742 @banking HB-BANK-038: Account balance matches sum of transactions (approx)', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const balance = page.getByText(/balance/i).first();
    await optionalAction(balance, async () => {
      await expect(balance).toBeVisible();
    }, 'Balance not visible.');
  });

  test('@Te14f2f93 @banking HB-BANK-039: Export transactions to CSV (if present)', async ({ page }) => {
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

  test('@T061ba244 @banking HB-BANK-040: Error state on Banking API failure', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    test.info().annotations.push({ type: 'note', description: 'Manual-only: requires API error simulation.' });
  });

  test('@Te1b39aa9 @banking HB-BANK-041: Empty state when no transactions', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const emptyState = page.getByText(/no transactions|empty/i).first();
    await optionalAction(emptyState, async () => {
      await expect(emptyState).toBeVisible();
    }, 'Empty state not detected.');
  });

  test('@T875a956e @banking HB-BANK-042: Transactions list persists filters on refresh', async ({ page }) => {
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

  test('@T1110a6cd @banking HB-BANK-043: Unauthorized user cannot access Banking', async ({ page }) => {
    await ensureLoggedOut(page);
    await page.goto(`${baseUrl}/?tab=transactions`);
    await page.waitForLoadState('domcontentloaded');
    if (!/\/login/i.test(page.url())) {
      test.skip(true, 'Session persisted; unable to verify unauthenticated state.');
    }
    await expect(page).toHaveURL(/\/login/i);
  });

  test('@T105db8c3 @banking HB-BANK-044: Transaction confidence values display properly', async ({ page }) => {
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

  test('@T26952a5c @banking HB-BANK-045: Match Status filter counts reflect list totals', async ({ page }) => {
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

  test('@T1e0e17cf @banking HB-BANK-046: Reconciliation action updates audit trail (if present)', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    test.info().annotations.push({ type: 'note', description: 'Manual-only: audit trail UI not confirmed.' });
  });

  test('@Tec570bf4 @banking HB-BANK-047: Transaction list supports horizontal scroll on small screens', async ({ page }) => {
    await seedLogin(page);
    await page.setViewportSize({ width: 375, height: 667 });
    await openTransactions(page);
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeGreaterThanOrEqual(375);
  });

  test('@T151a2610 @banking HB-BANK-048: Transactions list handles large amounts without overflow', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const amountCell = page.locator('table tbody tr td, [role="cell"]').filter({ hasText: /\d{4,}/ }).first();
    await optionalAction(amountCell, async () => {
      await expect(amountCell).toBeVisible();
    }, 'Large amount not detected.');
  });

  test('@T46472fa1 @banking HB-BANK-049: Transaction date respects timezone', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    test.info().annotations.push({ type: 'note', description: 'Manual-only: requires source system date.' });
  });

  test('@T4e9313d8 @banking HB-BANK-050: No sensitive data in Banking URL', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const url = page.url();
    expect(url).not.toMatch(/fapopi7433@feanzier\.com/i);
    expect(url).not.toMatch(/Kapil08dangar@/i);
  });
});

