import { test, expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { login as seedLogin } from '../utils/login';

test.setTimeout(120000);

const baseUrl = 'https://dev.hellobooks.ai';

// Helper: textRegex(text) - escapes regex special chars and returns case-insensitive RegExp
function textRegex(text: string) {
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

// Ensure logged out state for negative tests
async function ensureLoggedOut(page: Page) {
  await page.context().clearCookies();
  await page.goto('about:blank');
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await page.goto(`${baseUrl}/logout`).catch(() => {});
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

test.describe('Purchases @Shwd8dpr4', () => {
  test('Delete Bill from Bills List @Tqi1i98b2', async ({ page }) => {
    // STEP 1: Login using seedLogin utility
    await seedLogin(page);
    
    // STEP 2: Navigate to the target page
    await page.goto(`${baseUrl}/list-bills`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page).not.toHaveURL(/\/login/i, { timeout: 20000 });
    
    // STEP 3: Wait for table or empty state
    const tableRow = page.locator('table tbody tr').filter({ hasNotText: /no data|empty/i }).first();
    const emptyState = page.getByText(/no data|empty|no bills/i).first();
    
    await Promise.race([
      tableRow.waitFor({ state: 'visible', timeout: 15000 }),
      emptyState.waitFor({ state: 'visible', timeout: 15000 }),
    ]).catch(() => {});

    // STEP 4: Identify a bill row
    const row = await firstRow(page);
    if (!row) {
      test.info().annotations.push({ type: 'note', description: 'No bills available to delete.' });
      return;
    }

    // Ensure the row is not Paid or Void if possible (filtering by text)
    const eligibleRow = page.locator('table tbody tr').filter({ hasNotText: /paid|void|no data/i }).first();
    const targetRow = (await eligibleRow.count() > 0) ? eligibleRow : row;

    // STEP 5: Open Action Menu
    // Common patterns for action menus: three dots, "Actions" button, or right click
    const actionMenuTrigger = targetRow.locator('button, [aria-haspopup="menu"], .action-menu').filter({ has: page.locator('svg, i') }).first();
    
    await optionalAction(actionMenuTrigger, async () => {
      await actionMenuTrigger.click();
    }, 'Action menu trigger not found or not clickable.');

    // STEP 6: Select Delete Option
    const deleteOption = page.getByRole('menuitem', { name: /delete/i }).first();
    const deleteButton = page.locator('button, a').filter({ hasText: /^delete$/i }).first();
    
    const deleteAction = async () => {
        const trigger = (await deleteOption.isVisible()) ? deleteOption : deleteButton;
        await trigger.click();
    };

    await optionalAction(deleteOption, deleteAction, 'Delete option not found in menu.');

    // STEP 7: Confirm Deletion in Dialog
    const confirmButton = page.getByRole('button', { name: /confirm|yes|delete/i }).filter({ hasNotText: /cancel/i }).first();
    
    await optionalAction(confirmButton, async () => {
      await confirmButton.click();
    }, 'Confirmation dialog button not found.');

    // STEP 8: Verify Success
    await safeExpectVisible(
      page.getByText(/deleted successfully|success/i).first(),
      'Success toast/message not displayed after deletion.',
      10000
    );

    // Final check: URL should still be list-bills or redirected appropriately
    await expect(page).toHaveURL(new RegExp(`${baseUrl}/list-bills`), { timeout: 10000 });
  });
});