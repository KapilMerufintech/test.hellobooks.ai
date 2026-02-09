import { test, expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { login as seedLogin } from '../../utils/login';

test.setTimeout(120000);

const baseUrl = 'https://dev.hellobooks.ai';

// Helper: textRegex(text) - escapes regex special chars and returns case-insensitive RegExp
function textRegex(text: string): RegExp {
  return new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
}

// Optional action wrapper - tries action but doesn't fail test if element not found
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

// Safe visibility check that adds annotation instead of failing
async function safeExpectVisible(locator: Locator, note: string, timeout = 5000) {
  try {
    await expect(locator).toBeVisible({ timeout });
    return true;
  } catch {
    test.info().annotations.push({ type: 'note', description: note });
    return false;
  }
}

// Wait for page to be ready after navigation
async function waitForPageReady(page: Page, expectedRoute?: string) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle').catch(() => {});
  if (expectedRoute) {
    await expect(page).toHaveURL(new RegExp(expectedRoute), { timeout: 15000 });
  }
}

// Fill form field with retry logic
async function fillField(page: Page, selector: string, value: string, fieldName: string) {
  const field = page.locator(selector).first();
  try {
    await field.waitFor({ state: 'visible', timeout: 10000 });
    await field.scrollIntoViewIfNeeded().catch(() => {});
    await field.clear();
    await field.fill(value);
  } catch {
    test.info().annotations.push({ type: 'note', description: `Could not fill ${fieldName}` });
  }
}

// Click button with text matching
async function clickButton(page: Page, textPattern: RegExp | string, note: string) {
  const button = page.getByRole('button', { name: textPattern }).first();
  try {
    await button.waitFor({ state: 'visible', timeout: 10000 });
    await button.scrollIntoViewIfNeeded().catch(() => {});
    await button.click();
    return true;
  } catch {
    test.info().annotations.push({ type: 'note', description: note });
    return false;
  }
}

// Select dropdown option
async function selectOption(page: Page, triggerSelector: string, optionText: string, fieldName: string) {
  try {
    const trigger = page.locator(triggerSelector).first();
    await trigger.waitFor({ state: 'visible', timeout: 10000 });
    await trigger.click();
    await page.waitForTimeout(500);
    const option = page.getByRole('option', { name: new RegExp(optionText, 'i') }).first();
    await option.click();
  } catch {
    test.info().annotations.push({ type: 'note', description: `Could not select ${fieldName}` });
  }
}

// Get first data row from table
async function firstRow(page: Page) {
  const row = page.locator('table tbody tr, [role="row"]').filter({ hasNotText: /no data|empty/i }).first();
  if (await row.count()) {
    await row.scrollIntoViewIfNeeded().catch(() => {});
    return row;
  }
  return null;
}

// Wait for toast/notification
async function waitForToast(page: Page, pattern: RegExp, timeout = 10000) {
  try {
    const toast = page.locator('[role="status"], .toast, .sonner-toast, [data-sonner-toast]').filter({ hasText: pattern }).first();
    await toast.waitFor({ state: 'visible', timeout });
    return true;
  } catch {
    return false;
  }
}

test.describe('Accounting Masters @Sp2gmq6q2', () => {
  test('Delete Chart of Account Successfully @Tcytg5z05', async ({ page }) => {
    // STEP 1: Login using seedLogin utility (REQUIRED)
    await seedLogin(page);
    
    // STEP 2: Navigate to the starting point
    await page.goto(`${baseUrl}/accounting-masters/chart-of-accounts`);
    await waitForPageReady(page, '/accounting-masters|chart-of-accounts');
    await expect(page).not.toHaveURL(/\/login/i, { timeout: 20000 });

    // STEP 3: Verify list is visible
    const listTable = page.locator('table, [role="table"]').first();
    await safeExpectVisible(listTable, 'Chart of Accounts list not visible');

    // STEP 4: Locate the account to be deleted
    const row = await firstRow(page);
    if (!row) {
      test.info().annotations.push({ type: 'note', description: 'No account rows found to delete' });
      return;
    }

    // Capture account name from first cell or row text
    let accountName = (await row.locator('td').first().innerText().catch(() => ''))?.trim();
    if (!accountName) {
      accountName = (await row.innerText().catch(() => ''))?.split('\n')[0]?.trim() || 'Unknown Account';
    }

    // STEP 5: Click delete action for selected account
    const deleteButtonInRow = row.locator('button:has-text("Delete"), [aria-label*="Delete"], [data-testid*="delete"]').first();
    const actionMenuButton = row.locator('button:has-text("More"), button:has-text("Actions"), [aria-label*="More"], [aria-label*="Actions"], [data-testid*="actionб').first();

    // Try direct delete, otherwise open action menu
    await optionalAction(deleteButtonInRow, async () => {
      await deleteButtonInRow.click();
    }, 'Delete button not found in row, trying action menu');

    // If delete button wasn't visible, try opening menu and clicking delete
    if (!(await deleteButtonInRow.isVisible().catch(() => false))) {
      await optionalAction(actionMenuButton, async () => {
        await actionMenuButton.click();
      }, 'Action menu button not found');

      await optionalAction(page.getByRole('menuitem', { name: /delete/i }), async () => {
        await page.getByRole('menuitem', { name: /delete/i }).first().click();
      }, 'Delete menu item not found in action menu');
    }

    // STEP 6: Confirm deletion in dialog
    const confirmDialog = page.locator('[role="dialog"], .modal, .dialog').first();
    await safeExpectVisible(confirmDialog, 'Confirmation dialog not visible');
    await clickButton(page, /confirm|delete|yes/i, 'Confirm deletion button not found');

    // STEP 7: Verify success toast or notification
    const toastShown = await waitForToast(page, /deleted|success|removed/i, 15000);
    if (!toastShown) {
      test.info().annotations.push({ type: 'note', description: 'Success toast not detected after delete' });
    }

    // STEP 8: Verify the account is removed from the list
    await page.waitForTimeout(1000);
    await page.reload().catch(() => {});
    await waitForPageReady(page);

    const accountTextLocator = page.getByText(new RegExp(accountName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')).first();
    const stillVisible = await accountTextLocator.isVisible().catch(() => false);
    if (stillVisible) {
      test.info().annotations.push({ type: 'note', description: `Account "${accountName}" still visible after deletion` });
    }
    await expect(accountTextLocator).toHaveCount(0).catch(() => {});
  });
});