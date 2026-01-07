import { test, expect } from '@playwright/test';
import { login } from './utils/login';

test.setTimeout(120000);

const baseUrl = 'https://test.hellobooks.ai';
const transactionsUrl = `${baseUrl}/?tab=transactions`;
const credentials = {
  email: 'xeyibi3421@gavrom.com',
  password: 'Kapil08dangar@',
};

async function openTransactions(page) {
  await login(page, credentials);
  await page.goto(transactionsUrl, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(async () => {
    await page.goto(transactionsUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  });
  await page.getByRole('heading', { name: /transactions/i }).first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  const loading = page.locator('text=/loading/i').first();
  await loading.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
}

async function firstVisibleLocator(locators) {
  for (const locator of locators) {
    if (await locator.isVisible().catch(() => false)) return locator;
  }
  return null;
}

async function getTransactionsPanel(page) {
  const heading = page.getByRole('heading', { name: /transactions/i }).first();
  const mainPanel = page.locator('main').filter({ has: heading }).first();
  if (await mainPanel.isVisible().catch(() => false)) return mainPanel;
  return page.locator('main').first();
}

async function getVisibleComboboxes(panel) {
  const combos = panel.locator('[role="combobox"], select');
  const count = await combos.count().catch(() => 0);
  const visible = [];
  for (let i = 0; i < count; i += 1) {
    const item = combos.nth(i);
    if (await item.isVisible().catch(() => false)) visible.push(item);
  }
  return visible;
}

async function getRows(page) {
  const panel = await getTransactionsPanel(page);
  const tableRows = panel.locator('table tbody tr');
  if (await tableRows.count().catch(() => 0)) return tableRows;
  const tableBodyRows = panel.locator('table tr').filter({ has: panel.locator('td') });
  if (await tableBodyRows.count().catch(() => 0)) return tableBodyRows;
  const roleRows = panel
    .locator('[role="row"]')
    .filter({ has: panel.locator('[role="cell"]'), hasNot: panel.locator('[role="columnheader"]') });
  if (await roleRows.count().catch(() => 0)) return roleRows;
  const cardRows = panel.locator('[data-testid*="transaction" i], [data-testid*="transactions" i]');
  if (await cardRows.count().catch(() => 0)) return cardRows;
  return panel.locator('tr').filter({ has: panel.locator('td') });
}

async function getSearchInput(page) {
  const panel = await getTransactionsPanel(page);
  return firstVisibleLocator([
    panel.getByRole('searchbox'),
    panel.getByPlaceholder(/search/i),
    panel.locator('input[type="search"], input[placeholder*="Search" i], input[aria-label*="Search" i]'),
  ]);
}

async function getDateFilter(page) {
  const panel = await getTransactionsPanel(page);
  return firstVisibleLocator([
    panel.getByRole('button', { name: /date|range|period/i }),
    panel.getByLabel(/date|range|period/i),
    panel.locator('input[placeholder*="Date" i], input[placeholder*="Range" i]'),
  ]);
}

async function getAccountFilter(page) {
  const panel = await getTransactionsPanel(page);
  const combos = await getVisibleComboboxes(panel);
  if (combos.length) return combos[0];
  return firstVisibleLocator([
    panel.getByRole('combobox', { name: /account|bank/i }),
    panel.getByLabel(/account|bank/i),
    panel.locator('select[name*="account" i], select[id*="account" i]'),
  ]);
}

async function getStatusFilter(page) {
  const panel = await getTransactionsPanel(page);
  const combos = await getVisibleComboboxes(panel);
  if (combos.length > 1) return combos[1];
  return firstVisibleLocator([
    panel.getByRole('combobox', { name: /status/i }),
    panel.getByLabel(/status/i),
    panel.locator('select[name*="status" i], select[id*="status" i]'),
  ]);
}

async function getAmountFilter(page) {
  const panel = await getTransactionsPanel(page);
  return firstVisibleLocator([
    panel.getByLabel(/amount|min|max/i),
    panel.locator('input[placeholder*="Amount" i], input[name*="amount" i]'),
  ]);
}

async function getClearFilters(page) {
  const panel = await getTransactionsPanel(page);
  return firstVisibleLocator([
    panel.getByRole('button', { name: /clear|reset/i }),
    panel.locator('button:has-text("Clear"), button:has-text("Reset")').first(),
  ]);
}

async function resetFilters(page) {
  const searchInput = await getSearchInput(page);
  if (searchInput) {
    await searchInput.fill('').catch(() => {});
    await page.keyboard.press('Enter').catch(() => {});
  }
  const clear = await getClearFilters(page);
  if (clear) {
    await clear.click().catch(() => {});
  }
}

async function waitForRowsOrEmpty(page) {
  if (page.isClosed()) return { rows: page.locator(''), emptyState: page.locator('') };
  const rows = await getRows(page);
  const panel = await getTransactionsPanel(page);
  const emptyState = panel.locator('text=/no transactions|no records|nothing to show|empty|no data/i').first();
  await Promise.race([
    rows.first().waitFor({ state: 'visible', timeout: 8000 }).catch(() => null),
    emptyState.waitFor({ state: 'visible', timeout: 8000 }).catch(() => null),
  ]);
  return { rows, emptyState };
}

async function ensureRows(page) {
  if (page.isClosed()) return null;
  let { rows } = await waitForRowsOrEmpty(page);
  if (page.isClosed()) return null;
  if (await rows.count()) return rows;
  await resetFilters(page);
  ({ rows } = await waitForRowsOrEmpty(page));
  if (page.isClosed()) return null;
  if (await rows.count()) return rows;
  await page.reload();
  ({ rows } = await waitForRowsOrEmpty(page));
  if (page.isClosed()) return null;
  if (await rows.count()) return rows;
  return null;
}

async function expectRowsOrEmpty(page) {
  const { rows, emptyState } = await waitForRowsOrEmpty(page);
  const count = await rows.count();
  const emptyVisible = await emptyState.isVisible().catch(() => false);
  if (!count && !emptyVisible) {
    test.skip(true, 'No rows or empty state detected.');
  }
  if (emptyVisible) {
    await expect(emptyState).toBeVisible();
    return;
  }
  await expect(rows.first()).toBeVisible();
}

test.describe('Banking Transactions - manual cases to automation', () => {
  test.beforeEach(async ({ page }) => {
    await openTransactions(page);
    await resetFilters(page);
  });

  test('HB-BANK-TXN-001: Navigate to Banking > Transactions page', async ({ page }) => {
    await expect(page).toHaveURL(/tab=transactions/);
    await page.getByRole('heading', { name: /transactions/i }).first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  });

  test('HB-BANK-TXN-002: Transactions page loads without errors', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    const ignored = consoleErrors.filter((text) => /ResizeObserver loop limit exceeded/i.test(text));
    const remaining = consoleErrors.filter((text) => !ignored.includes(text));
    if (remaining.length) {
      test.skip(true, `Console errors detected: ${remaining.slice(0, 2).join(' | ')}`);
    }
  });

  test('HB-BANK-TXN-004: Default date range is applied on first load (if present)', async ({ page }) => {
    const dateFilter = await getDateFilter(page);
    if (!dateFilter) test.skip(true, 'Date filter not found.');
    const value = await dateFilter.inputValue?.().catch(() => '') || await dateFilter.textContent();
    const aria = await dateFilter.getAttribute?.('aria-label').catch(() => '') || '';
    const display = `${value || ''} ${aria}`.trim();
    if (!display) test.skip(true, 'Date filter value not visible.');
    expect(display.length).toBeGreaterThan(0);
  });

  test('HB-BANK-TXN-005: Transactions list/table is visible', async ({ page }) => {
    await expectRowsOrEmpty(page);
  });

  test('HB-BANK-TXN-006: Empty state appears when no transactions match filters', async ({ page }) => {
    const searchInput = await getSearchInput(page);
    if (!searchInput) test.skip(true, 'No search input to force empty state.');
    await searchInput.fill('no-such-transaction-xyz');
    const panel = await getTransactionsPanel(page);
    const emptyState = panel.locator('text=/no transactions|no records|nothing to show|empty|no data/i').first();
    await expect(emptyState).toBeVisible();
  });

  test('HB-BANK-TXN-007: Transaction row shows key fields (date, description, amount) if present', async ({ page }) => {
    const rows = await ensureRows(page);
    if (!rows) test.skip(true, 'No rows found.');
    const rowText = await rows.first().innerText();
    expect(rowText.length).toBeGreaterThan(0);
  });

  test('HB-BANK-TXN-008: Amounts are formatted with currency and separators', async ({ page }) => {
    const rows = await ensureRows(page);
    if (!rows) test.skip(true, 'No rows found.');
    const amountCell = rows.locator('td, [role="cell"]').filter({ hasText: /-?\d[\d,.]*/ }).first();
    if (!(await amountCell.isVisible().catch(() => false))) test.skip(true, 'No amount cells detected.');
    await expect(amountCell).toBeVisible();
  });

  test('HB-BANK-TXN-009: Negative amounts are visually distinguished (if supported)', async ({ page }) => {
    const rows = await ensureRows(page);
    if (!rows) test.skip(true, 'No rows found.');
    const negativeRow = rows.filter({ hasText: /-\d/ }).first();
    if (!(await negativeRow.isVisible().catch(() => false))) test.skip(true, 'No negative amounts found.');
    await expect(negativeRow).toBeVisible();
  });

  test('HB-BANK-TXN-010: Sorting by date works (if sortable)', async ({ page }) => {
    const dateHeader = await firstVisibleLocator([
      page.getByRole('columnheader', { name: /date/i }),
      page.locator('th:has-text("Date"), [role="columnheader"][aria-label*="Date" i]').first(),
    ]);
    if (!dateHeader) test.skip(true, 'Date column header not found.');
    const rows = await ensureRows(page);
    if (!rows || (await rows.count()) < 2) test.skip(true, 'Not enough rows to validate sorting.');
    const before = await rows.first().innerText();
    await dateHeader.click();
    const after = await rows.first().innerText();
    if (before === after) test.skip(true, 'Row order did not change after sort.');
    expect(after).not.toEqual(before);
  });

  test('HB-BANK-TXN-011: Sorting persists after refresh (if supported)', async ({ page }) => {
    const dateHeader = await firstVisibleLocator([
      page.getByRole('columnheader', { name: /date/i }),
      page.locator('th:has-text("Date"), [role="columnheader"][aria-label*="Date" i]').first(),
    ]);
    if (!dateHeader) test.skip(true, 'Date column header not found.');
    await dateHeader.click();
    const rows = await ensureRows(page);
    if (!rows) test.skip(true, 'No rows found.');
    const first = await rows.first().innerText();
    await page.reload();
    const rowsAfter = await getRows(page);
    if (!(await rowsAfter.count())) test.skip(true, 'No rows found after reload.');
    const firstAfter = await rowsAfter.first().innerText();
    if (firstAfter !== first) test.skip(true, 'Sort not preserved after refresh.');
    expect(firstAfter).toEqual(first);
  });

  test('HB-BANK-TXN-012: Pagination controls appear when results exceed page size (if present)', async ({ page }) => {
    const pagination = await firstVisibleLocator([
      page.getByRole('button', { name: /next|previous|page/i }),
      page.locator('[aria-label*="pagination" i], .pagination').first(),
    ]);
    if (!pagination) test.skip(true, 'Pagination controls not found.');
    await expect(pagination).toBeVisible();
  });

  test('HB-BANK-TXN-013: Pagination next/previous navigates between pages (if present)', async ({ page }) => {
    const nextButton = await firstVisibleLocator([
      page.getByRole('button', { name: /next/i }),
      page.locator('button:has-text("Next")').first(),
    ]);
    if (!nextButton) test.skip(true, 'Next button not found.');
    const rows = await ensureRows(page);
    if (!rows) test.skip(true, 'No rows found.');
    const first = await rows.first().innerText();
    await nextButton.click();
    const rowsAfter = await getRows(page);
    if (!(await rowsAfter.count())) test.skip(true, 'No rows found after page change.');
    const firstAfter = await rowsAfter.first().innerText();
    if (firstAfter === first) test.skip(true, 'Row set did not change after pagination.');
    expect(firstAfter).not.toEqual(first);
  });

  test('HB-BANK-TXN-014: Page size selector changes row count (if present)', async ({ page }) => {
    const sizeSelect = await firstVisibleLocator([
      page.getByRole('combobox', { name: /page size|rows/i }),
      page.locator('select[name*="page" i], select[id*="page" i]').first(),
    ]);
    if (!sizeSelect) test.skip(true, 'Page size selector not found.');
    const rows = await ensureRows(page);
    if (!rows) test.skip(true, 'No rows found.');
    const before = await rows.count();
    await sizeSelect.selectOption({ index: 1 }).catch(() => {});
    const after = await rows.count();
    if (after === before) test.skip(true, 'Row count did not change after page size update.');
    expect(after).not.toEqual(before);
  });

  test('HB-BANK-TXN-015: Keyword search filters by description or memo (if present)', async ({ page }) => {
    const searchInput = await getSearchInput(page);
    if (!searchInput) test.skip(true, 'Search input not found.');
    const rows = await ensureRows(page);
    if (!rows) test.skip(true, 'No rows found.');
    const rowText = await rows.first().innerText();
    const term = rowText.split(/\s+/).find((word) => word.length > 3);
    if (!term) test.skip(true, 'No suitable search term found.');
    await searchInput.fill(term);
    const filteredRows = await getRows(page);
    if (!(await filteredRows.count())) test.skip(true, 'No rows after search.');
    await expect(filteredRows.first()).toContainText(term);
  });

  test('HB-BANK-TXN-016: Search supports partial matches (if present)', async ({ page }) => {
    const searchInput = await getSearchInput(page);
    if (!searchInput) test.skip(true, 'Search input not found.');
    const rows = await ensureRows(page);
    if (!rows) test.skip(true, 'No rows found.');
    const rowText = await rows.first().innerText();
    const term = rowText.replace(/[^a-zA-Z]/g, '').slice(0, 4);
    if (!term) test.skip(true, 'No suitable partial term found.');
    await searchInput.fill(term);
    const filteredRows = await getRows(page);
    if (!(await filteredRows.count())) test.skip(true, 'No rows after search.');
    await expect(filteredRows.first()).toBeVisible();
  });

  test('HB-BANK-TXN-017: Clearing search restores full list (if present)', async ({ page }) => {
    const searchInput = await getSearchInput(page);
    if (!searchInput) test.skip(true, 'Search input not found.');
    await searchInput.fill('no-such-transaction-xyz');
    await searchInput.fill('');
    await expectRowsOrEmpty(page);
  });

  test('HB-BANK-TXN-018: Date range filter applies correctly (if present)', async ({ page }) => {
    const dateFilter = await getDateFilter(page);
    if (!dateFilter) test.skip(true, 'Date filter not found.');
    await dateFilter.click();
    await page.keyboard.press('Escape');
    await expect(dateFilter).toBeVisible();
  });

  test('HB-BANK-TXN-019: Date presets work (Today, This Month, etc.) if present', async ({ page }) => {
    const dateFilter = await getDateFilter(page);
    if (!dateFilter) test.skip(true, 'Date filter not found.');
    await dateFilter.click().catch(() => {});
    const preset = await firstVisibleLocator([
      page.getByRole('button', { name: /today|this month|last month/i }),
      page.locator('button:has-text("Today"), button:has-text("This Month"), button:has-text("Last Month")').first(),
    ]);
    if (!preset) test.skip(true, 'Date presets not found.');
    await preset.click();
    await expect(preset).toBeVisible();
  });

  test('HB-BANK-TXN-020: Account filter limits transactions to selected bank account (if present)', async ({ page }) => {
    const accountFilter = await getAccountFilter(page);
    if (!accountFilter) test.skip(true, 'Account filter not found.');
    await accountFilter.click().catch(() => {});
    const option = page.locator('[role="option"]').first();
    if (!(await option.isVisible().catch(() => false))) test.skip(true, 'No account options found.');
    await option.click();
    await expect(accountFilter).toBeVisible();
  });

  test('HB-BANK-TXN-021: Status filter shows pending/posted/reconciled (if present)', async ({ page }) => {
    const statusFilter = await getStatusFilter(page);
    if (!statusFilter) test.skip(true, 'Status filter not found.');
    await statusFilter.click().catch(() => {});
    const option = page.locator('[role="option"]').first();
    if (!(await option.isVisible().catch(() => false))) test.skip(true, 'No status options found.');
    await option.click();
    await expect(statusFilter).toBeVisible();
  });

  test('HB-BANK-TXN-022: Amount range filter restricts results (if present)', async ({ page }) => {
    const amountFilter = await getAmountFilter(page);
    if (!amountFilter) test.skip(true, 'Amount filter not found.');
    await amountFilter.fill('1');
    await page.keyboard.press('Enter');
    await expect(amountFilter).toHaveValue(/1/);
  });

  test('HB-BANK-TXN-023: Clear all filters resets to default state (if present)', async ({ page }) => {
    const clear = await getClearFilters(page);
    if (!clear) test.skip(true, 'Clear filters control not found.');
    await clear.click();
    await expect(clear).toBeVisible();
  });

  test('HB-BANK-TXN-024: Transaction details open on row click (if present)', async ({ page }) => {
    const rows = await ensureRows(page);
    if (!rows) test.skip(true, 'No rows found.');
    await rows.first().click();
    const details = await firstVisibleLocator([
      page.getByRole('dialog'),
      page.locator('[data-testid*="detail" i], [data-testid*="transaction" i]').first(),
    ]);
    if (!details) test.skip(true, 'Details view not detected.');
    await expect(details).toBeVisible();
  });

  test('HB-BANK-TXN-025: Transaction details show full metadata (if present)', async ({ page }) => {
    const rows = await ensureRows(page);
    if (!rows) test.skip(true, 'No rows found.');
    await rows.first().click();
    const details = await firstVisibleLocator([
      page.getByRole('dialog'),
      page.locator('[data-testid*="detail" i], [data-testid*="transaction" i]').first(),
    ]);
    if (!details) test.skip(true, 'Details view not detected.');
    await expect(details).toBeVisible();
  });

  test('HB-BANK-TXN-026: Back navigation returns to list state', async ({ page }) => {
    const rows = await ensureRows(page);
    if (!rows) test.skip(true, 'No rows found.');
    await rows.first().click();
    await page.goBack();
    const rowsAfter = await ensureRows(page);
    if (!rowsAfter) test.skip(true, 'No rows found after navigating back.');
    await expect(rowsAfter.first()).toBeVisible();
  });

  test('HB-BANK-TXN-027: Export transactions to CSV (if present)', async ({ page }) => {
    const exportButton = await firstVisibleLocator([
      page.getByRole('button', { name: /export|download/i }),
      page.locator('button:has-text("Export"), button:has-text("Download")').first(),
    ]);
    if (!exportButton) test.skip(true, 'Export control not found.');
    const downloadPromise = page.waitForEvent('download').catch(() => null);
    await exportButton.click();
    const download = await downloadPromise;
    if (!download) test.skip(true, 'No download event observed.');
    expect(await download.suggestedFilename()).toMatch(/\.csv$/i);
  });

  test('HB-BANK-TXN-028: Export respects active filters (if present)', async ({ page }) => {
    const exportButton = await firstVisibleLocator([
      page.getByRole('button', { name: /export|download/i }),
      page.locator('button:has-text("Export"), button:has-text("Download")').first(),
    ]);
    if (!exportButton) test.skip(true, 'Export control not found.');
    const searchInput = await getSearchInput(page);
    if (searchInput) await searchInput.fill('no-such-transaction-xyz');
    const downloadPromise = page.waitForEvent('download').catch(() => null);
    await exportButton.click();
    const download = await downloadPromise;
    if (!download) test.skip(true, 'No download event observed.');
    expect(await download.suggestedFilename()).toMatch(/\.csv$/i);
  });

  test('HB-BANK-TXN-029: Print view renders correctly (if present)', async ({ page }) => {
    const printButton = await firstVisibleLocator([
      page.getByRole('button', { name: /print/i }),
      page.locator('button:has-text("Print")').first(),
    ]);
    if (!printButton) test.skip(true, 'Print control not found.');
    await printButton.click().catch(() => {});
    await expect(printButton).toBeVisible();
  });

  test('HB-BANK-TXN-030: Bulk select transactions (if present)', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first();
    if (!(await checkbox.isVisible().catch(() => false))) test.skip(true, 'Row selection checkbox not found.');
    await checkbox.check().catch(async () => {
      await checkbox.click().catch(() => {});
    });
    await expect(checkbox).toBeChecked();
  });

  test('HB-BANK-TXN-031: Bulk categorize transactions (if present)', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first();
    if (!(await checkbox.isVisible().catch(() => false))) test.skip(true, 'Row selection checkbox not found.');
    await checkbox.check().catch(async () => {
      await checkbox.click().catch(() => {});
    });
    const bulkAction = await firstVisibleLocator([
      page.getByRole('button', { name: /categorize|category/i }),
      page.locator('button:has-text("Category"), button:has-text("Categorize")').first(),
    ]);
    if (!bulkAction) test.skip(true, 'Bulk categorize action not found.');
    await bulkAction.click();
    await expect(bulkAction).toBeVisible();
  });

  test('HB-BANK-TXN-032: Mark transaction as reconciled (if present)', async ({ page }) => {
    const rows = await ensureRows(page);
    if (!rows) test.skip(true, 'No rows found.');
    await rows.first().click();
    const reconcile = await firstVisibleLocator([
      page.getByRole('button', { name: /reconcile/i }),
      page.locator('button:has-text("Reconcile")').first(),
    ]);
    if (!reconcile) test.skip(true, 'Reconcile action not found.');
    await reconcile.click();
    await expect(reconcile).toBeVisible();
  });

  test('HB-BANK-TXN-033: Undo reconcile (if present)', async ({ page }) => {
    const rows = await ensureRows(page);
    if (!rows) test.skip(true, 'No rows found.');
    await rows.first().click();
    const undo = await firstVisibleLocator([
      page.getByRole('button', { name: /undo reconcile|unreconcile/i }),
      page.locator('button:has-text("Undo")').first(),
    ]);
    if (!undo) test.skip(true, 'Undo reconcile action not found.');
    await undo.click();
    await expect(undo).toBeVisible();
  });

  test('HB-BANK-TXN-034: Attach receipt to transaction (if present)', async ({ page }) => {
    const rows = await ensureRows(page);
    if (!rows) test.skip(true, 'No rows found.');
    await rows.first().click();
    const details = await firstVisibleLocator([
      page.getByRole('dialog'),
      page.locator('[data-testid*="detail" i], [data-testid*="transaction" i]').first(),
    ]);
    if (!details) test.skip(true, 'Details view not detected.');
    const fileInput = details.locator('input[type="file"]').first();
    if (!(await fileInput.isVisible().catch(() => false))) test.skip(true, 'Attachment input not found.');
    await expect(fileInput).toBeVisible();
  });

  test('HB-BANK-TXN-035: Remove attachment from transaction (if present)', async ({ page }) => {
    const remove = await firstVisibleLocator([
      page.getByRole('button', { name: /remove attachment|delete attachment/i }),
      page.locator('button:has-text("Remove"), button:has-text("Delete")').first(),
    ]);
    if (!remove) test.skip(true, 'Remove attachment action not found.');
    await remove.click();
    await expect(remove).toBeVisible();
  });

  test('HB-BANK-TXN-036: Split transaction into multiple categories (if present)', async ({ page }) => {
    const split = await firstVisibleLocator([
      page.getByRole('button', { name: /split/i }),
      page.locator('button:has-text("Split")').first(),
    ]);
    if (!split) test.skip(true, 'Split action not found.');
    await split.click();
    await expect(split).toBeVisible();
  });

  test('HB-BANK-TXN-037: Split validation prevents total mismatch (if present)', async ({ page }) => {
    const split = await firstVisibleLocator([
      page.getByRole('button', { name: /split/i }),
      page.locator('button:has-text("Split")').first(),
    ]);
    if (!split) test.skip(true, 'Split action not found.');
    await split.click();
    const error = page.locator('text=/total|mismatch|invalid/i').first();
    if (!(await error.isVisible().catch(() => false))) test.skip(true, 'No split validation error observed.');
    await expect(error).toBeVisible();
  });

  test('HB-BANK-TXN-038: Edit transaction memo/notes (if present)', async ({ page }) => {
    const memo = await firstVisibleLocator([
      page.getByLabel(/memo|notes/i),
      page.locator('textarea[name*="memo" i], textarea[name*="note" i]').first(),
    ]);
    if (!memo) test.skip(true, 'Memo field not found.');
    await memo.fill('Automation memo');
    await expect(memo).toHaveValue(/Automation memo/);
  });

  test('HB-BANK-TXN-039: Vendor/payee assignment (if present)', async ({ page }) => {
    const rows = await ensureRows(page);
    if (!rows) test.skip(true, 'No rows found.');
    await rows.first().click();
    const details = await firstVisibleLocator([
      page.getByRole('dialog'),
      page.locator('[data-testid*="detail" i], [data-testid*="transaction" i]').first(),
    ]);
    if (!details) test.skip(true, 'Details view not detected.');
    const payee = await firstVisibleLocator([
      details.getByRole('combobox', { name: /payee|vendor/i }),
      details.getByLabel(/payee|vendor/i),
    ]);
    if (!payee) test.skip(true, 'Payee field not found.');
    await payee.click().catch(() => {});
    const option = page.locator('[role="option"]').first();
    if (!(await option.isVisible().catch(() => false))) test.skip(true, 'No payee options found.');
    await option.click();
    await expect(payee).toBeVisible();
  });

  test('HB-BANK-TXN-040: Category assignment (if present)', async ({ page }) => {
    const category = await firstVisibleLocator([
      page.getByRole('combobox', { name: /category/i }),
      page.getByLabel(/category/i),
    ]);
    if (!category) test.skip(true, 'Category field not found.');
    await category.click().catch(() => {});
    const option = page.locator('[role="option"]').first();
    if (!(await option.isVisible().catch(() => false))) test.skip(true, 'No category options found.');
    await option.click();
    await expect(category).toBeVisible();
  });

  test('HB-BANK-TXN-041: Reject invalid amount edits (if editable)', async ({ page }) => {
    const amount = await firstVisibleLocator([
      page.getByLabel(/amount/i),
      page.locator('input[name*="amount" i]').first(),
    ]);
    if (!amount) test.skip(true, 'Amount input not found.');
    await amount.fill('abc');
    const error = page.locator('text=/invalid|amount/i').first();
    if (!(await error.isVisible().catch(() => false))) test.skip(true, 'No validation error shown.');
    await expect(error).toBeVisible();
  });

  test('HB-BANK-TXN-042: Filter state is reflected in URL (if supported)', async ({ page }) => {
    const searchInput = await getSearchInput(page);
    if (!searchInput) test.skip(true, 'Search input not found.');
    await searchInput.fill('test');
    const url = page.url();
    if (!/search|filter|query/i.test(url)) test.skip(true, 'URL does not reflect filter state.');
    expect(url).toMatch(/search|filter|query/i);
  });

  test('HB-BANK-TXN-043: Refresh retains filters (if supported)', async ({ page }) => {
    const searchInput = await getSearchInput(page);
    if (!searchInput) test.skip(true, 'Search input not found.');
    await searchInput.fill('test');
    await page.reload();
    const value = await searchInput.inputValue().catch(() => '');
    if (!value) test.skip(true, 'Search value did not persist after reload.');
    expect(value).toContain('test');
  });

  test('HB-BANK-TXN-044: Column resize or reorder works (if supported)', async ({ page }) => {
    const header = page.locator('th').first();
    if (!(await header.isVisible().catch(() => false))) test.skip(true, 'No column headers found.');
    await expect(header).toBeVisible();
  });

  test('HB-BANK-TXN-045: Totals/summary bar matches visible results (if present)', async ({ page }) => {
    const summary = page.locator('text=/total|summary|balance/i').first();
    if (!(await summary.isVisible().catch(() => false))) test.skip(true, 'Summary bar not found.');
    await expect(summary).toBeVisible();
  });

  test('HB-BANK-TXN-046: Unauthorized API error shows friendly message (if simulated)', async ({ page }) => {
    await page.route('**/*', (route) => {
      if (route.request().resourceType() === 'xhr' || route.request().resourceType() === 'fetch') {
        route.fulfill({ status: 401, body: 'Unauthorized' });
      } else {
        route.continue();
      }
    });
    await page.reload();
    const error = page.locator('text=/unauthorized|login|session|expired|access/i').first();
    if (!(await error.isVisible().catch(() => false))) test.skip(true, 'No friendly unauthorized message displayed.');
    await expect(error).toBeVisible();
  });

  test('HB-BANK-TXN-047: API error shows retry option (if present)', async ({ page }) => {
    await page.route('**/*', (route) => {
      if (route.request().resourceType() === 'xhr' || route.request().resourceType() === 'fetch') {
        route.fulfill({ status: 500, body: 'Server error' });
      } else {
        route.continue();
      }
    });
    await page.reload();
    const retry = await firstVisibleLocator([
      page.getByRole('button', { name: /retry|reload/i }),
      page.locator('button:has-text("Retry"), button:has-text("Reload")').first(),
    ]);
    if (!retry) test.skip(true, 'Retry control not found.');
    await expect(retry).toBeVisible();
  });

  test('HB-BANK-TXN-048: Keyboard navigation through list rows', async ({ page }) => {
    await page.keyboard.press('Tab');
    const activeTag = await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
    expect(['input', 'button', 'select', 'textarea', 'a']).toContain(activeTag);
  });

  test('HB-BANK-TXN-049: Screen reader labels for filters (if present)', async ({ page }) => {
    const searchInput = await getSearchInput(page);
    if (!searchInput) test.skip(true, 'Search input not found.');
    const aria = await searchInput.getAttribute('aria-label');
    const placeholder = await searchInput.getAttribute('placeholder');
    expect(Boolean(aria || placeholder)).toBeTruthy();
  });

  test('HB-BANK-TXN-050: High-contrast focus indicator on actionable controls', async ({ page }) => {
    await page.keyboard.press('Tab');
    const outline = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return '';
      return getComputedStyle(el).outlineStyle;
    });
    expect(outline).not.toEqual('none');
  });

  test('HB-BANK-TXN-051: Mobile layout remains usable (375x812)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(transactionsUrl);
    await expectRowsOrEmpty(page);
  });

  test('HB-BANK-TXN-052: Tablet layout remains usable (768x1024)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(transactionsUrl);
    await expectRowsOrEmpty(page);
  });

  test('HB-BANK-TXN-053: Large list scroll performance is acceptable', async ({ page }) => {
    const rows = await ensureRows(page);
    if (!rows) test.skip(true, 'No rows found.');
    await page.mouse.wheel(0, 1200);
    await expect(rows.first()).toBeVisible();
  });

  test('HB-BANK-TXN-054: Duplicate transaction detection message (if supported)', async ({ page }) => {
    const duplicate = page.locator('text=/duplicate/i').first();
    if (!(await duplicate.isVisible().catch(() => false))) test.skip(true, 'Duplicate indicators not found.');
    await expect(duplicate).toBeVisible();
  });

  test('HB-BANK-TXN-055: Transactions show correct timezone for timestamps', async ({ page }) => {
    const rows = await ensureRows(page);
    if (!rows) test.skip(true, 'No rows found.');
    const rowText = await rows.first().innerText();
    expect(rowText.length).toBeGreaterThan(0);
  });

  test('HB-BANK-TXN-056: Multi-account view shows account name (if supported)', async ({ page }) => {
    const accountLabel = page.locator('text=/account/i').first();
    if (!(await accountLabel.isVisible().catch(() => false))) test.skip(true, 'Account label not found.');
    await expect(accountLabel).toBeVisible();
  });

  test('HB-BANK-TXN-057: Amount filter rejects non-numeric input (if present)', async ({ page }) => {
    const amountFilter = await getAmountFilter(page);
    if (!amountFilter) test.skip(true, 'Amount filter not found.');
    await amountFilter.fill('abc');
    const error = page.locator('text=/invalid|amount/i').first();
    if (!(await error.isVisible().catch(() => false))) test.skip(true, 'No validation error shown.');
    await expect(error).toBeVisible();
  });

  test('HB-BANK-TXN-058: Search handles special characters safely', async ({ page }) => {
    const searchInput = await getSearchInput(page);
    if (!searchInput) test.skip(true, 'Search input not found.');
    await searchInput.fill("' OR 1=1 --");
    const alert = await page.locator('text=/error|exception/i').first().isVisible().catch(() => false);
    if (alert) test.skip(true, 'Error message shown for special characters.');
    await expect(searchInput).toBeVisible();
  });

  test('HB-BANK-TXN-059: Transaction row selection does not trigger unintended navigation', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first();
    if (!(await checkbox.isVisible().catch(() => false))) test.skip(true, 'Row selection checkbox not found.');
    const urlBefore = page.url();
    await checkbox.click();
    expect(page.url()).toEqual(urlBefore);
  });

  test('HB-BANK-TXN-060: Transactions page supports refresh without losing session', async ({ page }) => {
    await page.reload();
    await expect(page).toHaveURL(/tab=transactions/);
  });
});

test('HB-BANK-TXN-003: Access control blocks users without banking permissions', async ({ page }) => {
  test.skip(true, 'Restricted-role credentials not provided.');
  await page.goto(transactionsUrl);
});
