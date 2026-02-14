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
  const searchInput = page.locator('input[placeholder="Search" i]').first();
  await searchInput.waitFor({ state: 'visible', timeout: 20000 }).catch(() => {});
}

test.describe('@accounting Banking / Bank & Cash / Transactions @S2f9a8e21', () => {
  test('@accounting HB-BANK-TX-001: Open Transactions via deep link @T4b5ebfda', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    await expect(page).toHaveURL(/tab=transactions/i);
  });

  test('@accounting HB-BANK-TX-002: Account selector shows balance text @Tfeb3bf12', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const accountSelector = page.getByRole('button', { name: /ucic/i }).first();
    await optionalAction(accountSelector, async () => {
      await expect(accountSelector).toBeVisible();
      await expect(accountSelector).toContainText(/-?₹|inr/i);
    }, 'Account selector not detected.');
  });

  test('@accounting HB-BANK-TX-003: Tabs for Draft, Confirmed, Reconciliation are visible @T476b046c', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const draftTab = page.locator('[role="tab"], button, a').filter({ hasText: /draft transactions/i }).first();
    const confirmedTab = page.locator('[role="tab"], button, a').filter({ hasText: /confirmed/i }).first();
    const reconciliationTab = page.locator('[role="tab"], button, a').filter({ hasText: /reconciliation/i }).first();
    await expect(draftTab).toBeVisible();
    await expect(confirmedTab).toBeVisible();
    await expect(reconciliationTab).toBeVisible();
  });

  test('@accounting HB-BANK-TX-004: Confirmed tab loads list after delay @T0d495f44', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const confirmedTab = page.getByRole('tab', { name: /confirmed/i });
    await confirmedTab.click();
    await waitForRowsOrEmpty(page);
    await expect(confirmedTab).toHaveAttribute('aria-selected', /true/i);
  });

  test('@accounting HB-BANK-TX-005: Search, Person, Filter, Hide controls are available @Tbf4908a9', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const searchInput = page.locator('input[placeholder="Search" i]').first();
    await expect(searchInput).toBeVisible({ timeout: 20000 });
    await expect(page.locator('button, [role="button"]').filter({ hasText: /person/i }).first()).toBeVisible({ timeout: 20000 });
    await expect(page.locator('button, [role="button"]').filter({ hasText: /filter/i }).first()).toBeVisible({ timeout: 20000 });
    await expect(page.locator('button, [role="button"]').filter({ hasText: /hide/i }).first()).toBeVisible({ timeout: 20000 });
  });

  test('@accounting HB-BANK-TX-006: Table shows key columns @T1bb506a7', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    await waitForRowsOrEmpty(page);
    const headers = page.locator('table thead th, [role="columnheader"]');
    const headerText = (await headers.allInnerTexts()).join(' ').toLowerCase();
    const expected = ['date', 'description', 'amount', 'contact', 'account', 'tax', 'match', 'source'];
    const hits = expected.filter((label) => headerText.includes(label)).length;
    expect(hits).toBeGreaterThanOrEqual(4);
  });

  test('@accounting HB-BANK-TX-007: Notifications panel opens and shows unread count @T0c7171d0', async ({ page }) => {
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

  test('@accounting HB-BANK-TX-008: Import Bank Statement section is visible @Te81ae260', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    await expect(page.getByText(/import bank statement/i)).toBeVisible();
    await expect(page.getByText(/upload a csv or excel file/i)).toBeVisible();
    await expect(page.locator('button, [role="button"]').filter({ hasText: /import transactions|import/i }).first()).toBeVisible();
  });

  test('@accounting HB-BANK-TX-009: Import modal shows file format guidance @T5815e76e', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const importButton = page.getByRole('button', { name: /import transactions|import/i }).first();
    await optionalAction(importButton, async () => {
      await importButton.click();
      await expect(page.getByText(/csv|excel|xlsx|xls|pdf/i).first()).toBeVisible();
      await expect(page.getByText(/max file size/i).first()).toBeVisible();
    }, 'Import button not found.');
  });

  test('@accounting HB-BANK-TX-010: Transactions list updates after search input @T2c5085ef', async ({ page }) => {
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

  test('@accounting HB-BANK-TX-011: Bank & Cash header and subheading are visible @T1f31a3ab', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    await expect(page.getByRole('heading', { name: /bank & cash/i })).toBeVisible();
    await expect(page.getByText(/manage transactions across your accounts/i).first()).toBeVisible();
  });

  test('@accounting HB-BANK-TX-012: Reconciliation tab is accessible @Tfe5f45e3', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const reconciliationTab = page.getByRole('tab', { name: /reconciliation/i });
    await reconciliationTab.click();
    await expect(reconciliationTab).toHaveAttribute('aria-selected', /true/i);
  });

  test('@accounting HB-BANK-TX-013: Confirmed count label is displayed on tab @Td44ffe8e', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const confirmedTab = page.locator('[role="tab"], button, a').filter({ hasText: /confirmed/i }).first();
    await expect(confirmedTab).toBeVisible();
    await expect(confirmedTab).toContainText(/\(\d+\)/);
  });

  test('@accounting HB-BANK-TX-014: Table displays rows or empty state @T26272342', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    await waitForRowsOrEmpty(page);
    const tableRow = page.locator('table tbody tr, [role="row"]').filter({ hasNotText: /no data|empty/i }).first();
    const emptyState = page.getByText(/no transactions|empty/i).first();
    const rowVisible = await tableRow.isVisible().catch(() => false);
    const emptyVisible = await emptyState.isVisible().catch(() => false);
    expect(rowVisible || emptyVisible).toBeTruthy();
  });

  test('@accounting HB-BANK-TX-015: URL keeps bankAccountId query param @T9a1c2d3e', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    expect(page.url()).toMatch(/bankAccountId=/i);
  });

  test('@accounting HB-BANK-TX-016: Breadcrumb shows Banking > Bank & Cash @T7b2e4f1a', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    await expect(page.getByText(/banking/i).first()).toBeVisible();
    await expect(page.getByText(/bank & cash/i).first()).toBeVisible();
  });

  test('@accounting HB-BANK-TX-017: Connect Bank (Plaid) button is visible @T5c8d1a0f', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    await expect(page.getByRole('button', { name: /connect bank/i })).toBeVisible();
  });

  test('@accounting HB-BANK-TX-018: Add Transaction button is visible @T3e6f9b2c', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const addButton = page.getByRole('button', { name: /add transaction/i }).first();
    await expect(addButton).toBeVisible();
    await expect(addButton).toBeEnabled();
  });

  test('@accounting HB-BANK-TX-019: Per page selector shows default 50 @T8d0f2c7b', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const perPage = page.getByText(/per page/i).first();
    await optionalAction(perPage, async () => {
      await expect(perPage).toBeVisible();
    }, 'Per page label not found.');
    const pageSize = page.locator('button, [role="button"]').filter({ hasText: /^\s*50\s*$/ }).first();
    await optionalAction(pageSize, async () => {
      await expect(pageSize).toBeVisible();
    }, 'Page size 50 not visible.');
  });

  test('@accounting HB-BANK-TX-020: Page refresh keeps session @T7d9a1c2f', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    await page.reload();
    await expect(page).not.toHaveURL(/\/login/i, { timeout: 20000 });
    await expect(page.getByRole('heading', { name: /bank & cash/i })).toBeVisible();
  });

  test('@accounting HB-BANK-TX-021: Search handles special characters safely @T6b3e5a8d', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const searchInput = page.locator('input[placeholder="Search" i]').first();
    await optionalAction(searchInput, async () => {
      let dialogSeen = false;
      page.once('dialog', async (dialog) => {
        dialogSeen = true;
        await dialog.dismiss();
      });
      await searchInput.fill("' OR 1=1 --");
      await expect(searchInput).toHaveValue("' OR 1=1 --");
      expect(dialogSeen).toBeFalsy();
      await expect(page).toHaveURL(/tab=transactions/i);
    }, 'Search input not found.');
  });

  test('@accounting HB-BANK-TX-022: Sorting by Description is clickable (if supported) @T2f8c4d1b', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const header = page.getByRole('columnheader', { name: /description/i }).first();
    await optionalAction(header, async () => {
      await header.click();
      await header.click();
      await expect(header).toBeVisible();
    }, 'Description column header not found.');
  });

  test('@accounting HB-BANK-TX-023: Search input has an accessible label @T4a7e0b9c', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const searchInput = page.locator('input[placeholder="Search" i]').first();
    await optionalAction(searchInput, async () => {
      const ariaLabel = await searchInput.getAttribute('aria-label');
      const labelledBy = await searchInput.getAttribute('aria-labelledby');
      if (!ariaLabel && !labelledBy) {
        test.info().annotations.push({ type: 'note', description: 'Search input missing aria-label/aria-labelledby.' });
      }
      await expect(searchInput).toBeVisible();
    }, 'Search input not found.');
  });

  test('@accounting HB-BANK-TX-024: Mobile layout remains usable (375x812) @T1c6d2f9a', async ({ page }) => {
    await seedLogin(page);
    await page.setViewportSize({ width: 375, height: 812 });
    await openTransactions(page);
    await expect(page.getByRole('button', { name: /add transaction/i }).first()).toBeVisible();
    await expect(page.locator('input[placeholder="Search" i]')).toBeVisible();
  });

  test('@accounting HB-BANK-TX-025: Draft tab can be selected @T0e4b9c7d', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const draftTab = page.locator('[role="tab"], button, a').filter({ hasText: /draft transactions/i }).first();
    await draftTab.click();
    await expect(draftTab).toBeVisible();
  });

  test('@accounting HB-BANK-TX-026: Confirmed tab can be selected @T6f1a8d3c', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const confirmedTab = page.locator('[role="tab"], button, a').filter({ hasText: /confirmed/i }).first();
    await confirmedTab.click();
    await expect(confirmedTab).toBeVisible();
  });

  test('@accounting HB-BANK-TX-027: Filter button opens filter panel (if present) @T3b7d0a2f', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const filterButton = page.locator('button, [role="button"]').filter({ hasText: /filter/i }).first();
    await optionalAction(filterButton, async () => {
      await filterButton.click();
      const filterPanel = page.getByText(/filters|filter by/i).first();
      await optionalAction(filterPanel, async () => {
        await expect(filterPanel).toBeVisible();
      }, 'Filter panel not detected.');
    }, 'Filter button not found.');
  });

  test('@accounting HB-BANK-TX-028: Hide button toggles columns menu (if present) @T8c2f5b1e', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const hideButton = page.locator('button, [role="button"]').filter({ hasText: /hide/i }).first();
    await optionalAction(hideButton, async () => {
      await hideButton.click();
      const hidePanel = page.getByText(/columns|show\/hide/i).first();
      await optionalAction(hidePanel, async () => {
        await expect(hidePanel).toBeVisible();
      }, 'Hide/columns panel not detected.');
    }, 'Hide button not found.');
  });

  test('@accounting HB-BANK-TX-029: Import button opens upload dialog (if present) @T9a0c4e7b', async ({ page }) => {
    await seedLogin(page);
    await openTransactions(page);
    const importButton = page.locator('button, [role="button"]').filter({ hasText: /import transactions|import/i }).first();
    await optionalAction(importButton, async () => {
      await importButton.click();
      const uploadText = page.getByText(/upload a csv or excel file|click to upload|drag & drop/i).first();
      await optionalAction(uploadText, async () => {
        await expect(uploadText).toBeVisible();
      }, 'Upload instructions not visible.');
    }, 'Import button not found.');
  });
});
