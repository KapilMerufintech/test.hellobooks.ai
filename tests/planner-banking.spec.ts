import { test } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { login } from './utils/login';

test.setTimeout(120000);

function uniqueNonEmpty(values) {
  const seen = new Set();
  for (const value of values) {
    const asciiOnly = value.replace(/[^\x00-\x7F]/g, '');
    const trimmed = asciiOnly.replace(/\s+/g, ' ').trim();
    if (!trimmed) continue;
    seen.add(trimmed);
  }
  return Array.from(seen);
}

async function firstVisibleLocator(locator) {
  const count = await locator.count();
  for (let i = 0; i < count; i += 1) {
    const candidate = locator.nth(i);
    if (await candidate.isVisible()) return candidate;
  }
  return null;
}

async function collectNavItems(page) {
  const navContainers = page.locator('nav, [role="navigation"], aside');
  const nav = await firstVisibleLocator(navContainers);
  if (!nav) return [];
  const navItems = nav.locator('a, button, [role="menuitem"]');
  const texts = await navItems.allInnerTexts();
  return uniqueNonEmpty(texts);
}

async function tryNavigateToBankingTransactions(page) {
  const attributes = ['href', 'data-href', 'data-to', 'to'];

  async function followLinkIfPresent(locator) {
    for (const attr of attributes) {
      const value = await locator.getAttribute(attr);
      if (!value) continue;
      if (value === '#' || value === 'javascript:void(0)') continue;
      await page.goto(new URL(value, page.url()).toString());
      await page.waitForLoadState('networkidle');
      return true;
    }
    return false;
  }

  const attempts = [
    /banking transactions/i,
    /bank transactions/i,
  ];

  for (const pattern of attempts) {
    const candidate = page.locator('a, button, [role="menuitem"]', { hasText: pattern });
    const visible = await firstVisibleLocator(candidate);
    if (visible) {
      if (await followLinkIfPresent(visible)) return true;
      await visible.click();
      await Promise.race([
        page.waitForURL(/banking|transactions/i, { timeout: 5000 }),
        page.waitForLoadState('networkidle'),
      ]);
      return true;
    }
  }

  const bankingMenu = await firstVisibleLocator(
    page.locator('a, button, [role="menuitem"]', { hasText: /^banking$/i }),
  );
  if (bankingMenu) {
    await bankingMenu.click();
    await page.waitForLoadState('networkidle');
    const txnItem = await firstVisibleLocator(
      page.locator('a, button, [role="menuitem"]', { hasText: /^transactions$/i }),
    );
    if (txnItem) {
      if (await followLinkIfPresent(txnItem)) return true;
      await txnItem.click();
      await Promise.race([
        page.waitForURL(/banking|transactions/i, { timeout: 5000 }),
        page.waitForLoadState('networkidle'),
      ]);
      return true;
    }
  }

  const fallbackTransactions = await firstVisibleLocator(
    page.locator('a, button, [role="menuitem"]', { hasText: /^transactions$/i }),
  );
  if (fallbackTransactions) {
    if (await followLinkIfPresent(fallbackTransactions)) return true;
    await fallbackTransactions.click();
    await Promise.race([
      page.waitForURL(/banking|transactions/i, { timeout: 5000 }),
      page.waitForLoadState('networkidle'),
    ]);
    return true;
  }

  return false;
}

async function collectInputs(page) {
  const inputs = page.locator('input:visible');
  const count = await inputs.count();
  const results = [];
  for (let i = 0; i < count; i += 1) {
    const input = inputs.nth(i);
    const type = (await input.getAttribute('type')) || 'text';
    if (type === 'hidden') continue;
    const name = (await input.getAttribute('name')) || '';
    const placeholder = (await input.getAttribute('placeholder')) || '';
    const ariaLabel = (await input.getAttribute('aria-label')) || '';
    const id = (await input.getAttribute('id')) || '';
    const label = [placeholder, ariaLabel, name, id, type].find((value) => value) || type;
    results.push(label);
  }
  return uniqueNonEmpty(results);
}

async function collectSelects(page) {
  const selects = page.locator('select:visible');
  const count = await selects.count();
  const results = [];
  for (let i = 0; i < count; i += 1) {
    const select = selects.nth(i);
    const name = (await select.getAttribute('name')) || '';
    const ariaLabel = (await select.getAttribute('aria-label')) || '';
    const id = (await select.getAttribute('id')) || '';
    const label = [ariaLabel, name, id].find((value) => value) || 'select';
    results.push(label);
  }
  return uniqueNonEmpty(results);
}

async function collectTables(page) {
  const tables = page.locator('table:visible');
  const count = await tables.count();
  const results = [];
  for (let i = 0; i < count; i += 1) {
    const table = tables.nth(i);
    const headers = await table.locator('th').allInnerTexts();
    const cleaned = uniqueNonEmpty(headers);
    if (cleaned.length) {
      results.push(cleaned);
      continue;
    }
    const firstRowCells = await table.locator('tr').first().locator('td').allInnerTexts();
    const row = uniqueNonEmpty(firstRowCells);
    if (row.length) results.push(row);
  }
  return results;
}

function deriveScenarioHints(buttons, inputs, selects) {
  const hints = new Set();
  const buttonText = buttons.join(' ').toLowerCase();
  const inputText = inputs.join(' ').toLowerCase();
  const selectText = selects.join(' ').toLowerCase();

  if (buttonText.includes('export') || buttonText.includes('download')) hints.add('export');
  if (buttonText.includes('import') || buttonText.includes('upload')) hints.add('import');
  if (buttonText.includes('add') || buttonText.includes('new') || buttonText.includes('create')) hints.add('create');
  if (buttonText.includes('delete') || buttonText.includes('remove')) hints.add('delete');
  if (buttonText.includes('sync') || buttonText.includes('refresh')) hints.add('sync');
  if (buttonText.includes('reconcile') || buttonText.includes('match')) hints.add('reconcile');
  if (buttonText.includes('approve')) hints.add('approve');
  if (buttonText.includes('edit') || buttonText.includes('update')) hints.add('edit');
  if (buttonText.includes('filter') || inputText.includes('search') || selectText.includes('status')) hints.add('filter');
  if (buttonText.includes('clear') || buttonText.includes('reset')) hints.add('clear');
  if (buttonText.includes('bulk') || buttonText.includes('batch')) hints.add('bulk');

  return Array.from(hints);
}

function formatList(values, fallback) {
  if (!values.length) return `- ${fallback}`;
  return values.map((value) => `- ${value}`).join('\n');
}

function buildPlanMarkdown(data) {
  const scenarioHints = deriveScenarioHints(data.buttons, data.inputs, data.selects);
  const lines = [];

  lines.push('# Banking Transactions - Test Plan');
  lines.push('');
  lines.push('## Metadata');
  lines.push(`- Generated: ${new Date().toISOString()}`);
  lines.push(`- Environment: ${data.baseUrl || 'https://test.hellobooks.ai'}`);
  lines.push(`- User: ${data.userEmail}`);
  lines.push('');
  lines.push('## Scope');
  lines.push('- Banking Transactions list, filters, details, and actions surfaced on the page.');
  lines.push('- Navigation into the Banking Transactions section from the primary menu.');
  lines.push('');
  lines.push('## Entry and Navigation');
  lines.push(formatList(data.navigation, 'Navigation items not detected.'));
  lines.push(data.sectionUrl ? `- Banking Transactions URL: ${data.sectionUrl}` : '- Banking Transactions URL not captured.');
  lines.push('');
  lines.push('## Detected UI Elements');
  lines.push('### Headings');
  lines.push(formatList(data.headings, 'No headings detected.'));
  lines.push('');
  lines.push('### Buttons');
  lines.push(formatList(data.buttons, 'No buttons detected.'));
  lines.push('');
  lines.push('### Links');
  lines.push(formatList(data.links, 'No links detected.'));
  lines.push('');
  lines.push('### Inputs');
  lines.push(formatList(data.inputs, 'No inputs detected.'));
  lines.push('');
  lines.push('### Selects');
  lines.push(formatList(data.selects, 'No selects detected.'));
  lines.push('');
  lines.push('### Tables');
  if (!data.tables.length) {
    lines.push('- No tables detected.');
  } else {
    data.tables.forEach((headers, index) => {
      lines.push(`- Table ${index + 1} columns: ${headers.join(' | ')}`);
    });
  }
  lines.push('');
  lines.push('## Functional Test Scenarios');
  lines.push('- Access control: verify users without banking permissions cannot view the section.');
  lines.push('- Page load: verify the list renders with expected default date range and sorting.');
  lines.push('- Data integrity: verify amounts, dates, currencies, and balances match source records.');
  lines.push('- Row actions: open a transaction and validate details, metadata, and linked entities.');
  lines.push('- Pagination: verify next/prev, page size changes, and total count accuracy.');
  lines.push('- Sorting: verify sortable columns toggle asc/desc and persist across refresh.');
  lines.push('- Empty states: verify proper messaging when no transactions match filters.');
  lines.push('- Error handling: API failures show retries and no silent failures.');
  lines.push('');
  lines.push('### Filters and Search');
  lines.push('- Keyword search matches reference, counterparty, memo, and amount.');
  lines.push('- Date filters support range, relative presets, and timezone correctness.');
  lines.push('- Status filters cover pending/posted/reconciled (as applicable).');
  lines.push('- Clearing filters restores default list state.');
  lines.push('');
  lines.push('### Actions and Workflows');
  if (scenarioHints.includes('create')) lines.push('- Create: add a new transaction and validate required fields.');
  if (scenarioHints.includes('edit')) lines.push('- Edit: update transaction fields and verify audit changes.');
  if (scenarioHints.includes('delete')) lines.push('- Delete: remove a transaction with confirmation and verify list update.');
  if (scenarioHints.includes('import')) lines.push('- Import: upload a bank file and verify validation and row creation.');
  if (scenarioHints.includes('export')) lines.push('- Export: export filtered results and verify file contents.');
  if (scenarioHints.includes('sync')) lines.push('- Sync: trigger bank sync and verify new transactions appear.');
  if (scenarioHints.includes('reconcile')) lines.push('- Reconcile: match/unmatch transactions with ledger entries.');
  if (scenarioHints.includes('approve')) lines.push('- Approval: approve transactions and verify status changes.');
  if (scenarioHints.includes('bulk')) lines.push('- Bulk actions: multi-select rows and apply a bulk action.');
  lines.push('- Permissions: validate action availability by role.');
  lines.push('');
  lines.push('### Data Quality and Validation');
  lines.push('- Validate required fields, max lengths, and numeric precision.');
  lines.push('- Ensure negative/positive amounts render with correct signage and formatting.');
  lines.push('- Verify duplicate transaction detection (if supported).');
  lines.push('- Verify cross-account filtering when multiple bank accounts are linked.');
  lines.push('');
  lines.push('### Audit and Compliance');
  lines.push('- Confirm audit trail entries for create/update/reconcile actions.');
  lines.push('- Verify export records include mandatory fields and correct timezone.');
  lines.push('');
  lines.push('## Test Data');
  lines.push('- At least two bank accounts with transactions across different dates.');
  lines.push('- Transactions with varied statuses (posted, pending, reconciled).');
  lines.push('- Duplicate and edge-case amounts (0, high value, negative).');
  lines.push('');
  lines.push('## Out of Scope');
  lines.push('- Non-banking modules outside Banking Transactions.');
  lines.push('- Admin configuration unrelated to banking transactions.');

  return lines.join('\n');
}

test('planner banking transactions', async ({ page }) => {
  await login(page);

  const planData = {
    baseUrl: page.url(),
    userEmail: 'kapil.dangar@merufintech.net',
    navigation: await collectNavItems(page),
    sectionUrl: '',
    headings: [],
    buttons: [],
    links: [],
    inputs: [],
    selects: [],
    tables: [],
  };

  const navigated = await tryNavigateToBankingTransactions(page);
  if (navigated) {
    planData.sectionUrl = page.url();
  }

  planData.headings = uniqueNonEmpty(await page.locator('h1, h2, h3').allInnerTexts());
  planData.buttons = uniqueNonEmpty(await page.locator('button:visible').allInnerTexts());
  planData.links = uniqueNonEmpty(await page.locator('a:visible').allInnerTexts());
  planData.inputs = await collectInputs(page);
  planData.selects = await collectSelects(page);
  planData.tables = await collectTables(page);

  const plan = buildPlanMarkdown(planData);
  const outputPath = path.join(process.cwd(), 'specs', 'banking-transactions-plan.md');
  await fs.writeFile(outputPath, plan, 'utf8');
});
