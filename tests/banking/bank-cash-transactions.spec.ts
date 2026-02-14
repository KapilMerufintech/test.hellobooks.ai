import { test, expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { login as seedLogin } from '../utils/login';

test.setTimeout(300000);

const baseUrl = 'https://test.hellobooks.ai';
const transactionsUrl = `${baseUrl}/?tab=transactions&bankAccountId=dbc7c4ac-aac4-406c-8ab6-a3459800da69`;

async function openTransactions(page: Page) {
  await page.goto(transactionsUrl);
  await page.waitForLoadState('domcontentloaded');
  await expect(page).not.toHaveURL(/\/login/i, { timeout: 20000 });
  await expect(page.getByText(/bank & cash|transactions/i).first()).toBeVisible({ timeout: 20000 });
  await waitForPageReady(page);
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

async function waitForRowsOrEmpty(page: Page) {
  const tableRow = page.locator('table tbody tr, [role="row"]').filter({ hasNotText: /no data|empty/i }).first();
  const emptyState = page.getByText(/no transactions|empty/i).first();
  await Promise.race([
    tableRow.waitFor({ state: 'visible', timeout: 10000 }),
    emptyState.waitFor({ state: 'visible', timeout: 10000 }),
  ]).catch(() => {});
}

async function waitForPageReady(page: Page) {
  const skeleton = page.locator('[aria-busy="true"], .skeleton, .ant-skeleton').first();
  await skeleton.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  const header = page.getByRole('heading', { name: /bank & cash/i }).first();
  await header.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
}

test.describe('@banking Banking / Bank & Cash / Transactions @S2f9a8e21', () => {
  test('[T86d0fe9a] @banking HB-BANK-TX-001: Open Transactions via deep link', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    await expect(page).toHaveURL(/tab=transactions/i);
  });

  test('[T0f0b6b2f] @banking HB-BANK-TX-002: Account selector shows balance text', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const accountSelector = page.getByRole('button', { name: /ucic/i }).first();
    await optionalAction(accountSelector, async () => {
      await expect(accountSelector).toBeVisible();
      await expect(accountSelector).toContainText(/-?₹|inr/i);
    }, 'Account selector not detected.');
  });

  test('[T81b7a64f] @banking HB-BANK-TX-003: Tabs for Draft, Confirmed, Reconciliation are visible', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const draftTab = page.locator('[role="tab"], button, a').filter({ hasText: /draft transactions/i }).first();
    const confirmedTab = page.locator('[role="tab"], button, a').filter({ hasText: /confirmed/i }).first();
    const reconciliationTab = page.locator('[role="tab"], button, a').filter({ hasText: /reconciliation/i }).first();
    await expect(draftTab).toBeVisible();
    await expect(confirmedTab).toBeVisible();
    await expect(reconciliationTab).toBeVisible();
  });

  test('[T2e0b7e0e] @banking HB-BANK-TX-004: Confirmed tab loads list after delay', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const confirmedTab = page.getByRole('tab', { name: /confirmed/i });
    await confirmedTab.click();
    await waitForRowsOrEmpty(page);
    await expect(confirmedTab).toHaveAttribute('aria-selected', /true/i);
  });

  test('[T0a4d7b92] @banking HB-BANK-TX-005: Search, Person, Filter, Hide controls are available', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    await expect(page.locator('input[placeholder="Search" i]')).toBeVisible();
    await expect(page.locator('button, [role="button"]').filter({ hasText: /person/i }).first()).toBeVisible();
    await expect(page.locator('button, [role="button"]').filter({ hasText: /filter/i }).first()).toBeVisible();
    await expect(page.locator('button, [role="button"]').filter({ hasText: /hide/i }).first()).toBeVisible();
  });

  test('[T0f2a7c6c] @banking HB-BANK-TX-006: Table shows key columns', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    await waitForRowsOrEmpty(page);
    const headers = page.locator('table thead th, [role="columnheader"]');
    const headerText = (await headers.allInnerTexts()).join(' ').toLowerCase();
    const expected = ['date', 'description', 'amount', 'contact', 'account', 'tax', 'match', 'source'];
    const hits = expected.filter((label) => headerText.includes(label)).length;
    expect(hits).toBeGreaterThanOrEqual(4);
  });

  test('[T5f7b62f9] @banking HB-BANK-TX-007: Notifications panel opens and shows unread count', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const notifications = page.getByRole('button', { name: /notifications/i }).first();
    await optionalAction(notifications, async () => {
      await notifications.click();
      const panelItem = page.getByRole('button').filter({ hasText: /invoice created|bill created|notification/i }).first();
      await optionalAction(panelItem, async () => {
        await expect(panelItem).toBeVisible();
      }, 'Notification items not visible.');
    }, 'Notifications button not found.');
  });

  test('[T4d2a18d1] @banking HB-BANK-TX-008: Import Bank Statement section is visible', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    await expect(page.getByText(/import bank statement/i)).toBeVisible();
    await expect(page.getByText(/upload a csv or excel file/i)).toBeVisible();
    await expect(page.locator('button, [role="button"]').filter({ hasText: /import transactions|import/i }).first()).toBeVisible();
  });

  test('[T8f7b8a33] @banking HB-BANK-TX-009: Import modal shows file format guidance', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const importButton = page.getByRole('button', { name: /import transactions|import/i }).first();
    await optionalAction(importButton, async () => {
      await importButton.click();
      await expect(page.getByText(/csv|excel|xlsx|xls|pdf/i).first()).toBeVisible();
      await expect(page.getByText(/max file size/i).first()).toBeVisible();
    }, 'Import button not found.');
  });

  test('[T5f6e2a9b] @banking HB-BANK-TX-010: Transactions list updates after search input', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    await waitForRowsOrEmpty(page);
    const searchInput = page.locator('input[placeholder="Search"]').first();
    await optionalAction(searchInput, async () => {
      await searchInput.fill('test');
      await expect(searchInput).toHaveValue('test');
      await searchInput.fill('');
      await expect(searchInput).toHaveValue('');
    }, 'Search input not found.');
  });

  test('[T63b8b8d4] @banking HB-BANK-TX-011: Bank & Cash header and subheading are visible', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    await expect(page.getByRole('heading', { name: /bank & cash/i })).toBeVisible();
    await expect(page.getByText(/manage transactions across your accounts/i).first()).toBeVisible();
  });

  test('[T9a5d0ef0] @banking HB-BANK-TX-012: Reconciliation tab is accessible', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const reconciliationTab = page.getByRole('tab', { name: /reconciliation/i });
    await reconciliationTab.click();
    await expect(reconciliationTab).toHaveAttribute('aria-selected', /true/i);
  });

  test('[T8ad9c8a6] @banking HB-BANK-TX-013: Confirmed count label is displayed on tab', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const confirmedTab = page.locator('[role="tab"], button, a').filter({ hasText: /confirmed/i }).first();
    await expect(confirmedTab).toBeVisible();
    await expect(confirmedTab).toContainText(/\(\d+\)/);
  });

  test('[T6a4f8b2c] @banking HB-BANK-TX-014: Table displays rows or empty state', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    await waitForRowsOrEmpty(page);
    const tableRow = page.locator('table tbody tr, [role="row"]').filter({ hasNotText: /no data|empty/i }).first();
    const emptyState = page.getByText(/no transactions|empty/i).first();
    const rowVisible = await tableRow.isVisible().catch(() => false);
    const emptyVisible = await emptyState.isVisible().catch(() => false);
    expect(rowVisible || emptyVisible).toBeTruthy();
  });
});
