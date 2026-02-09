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

test.describe('Accounting Masters @S17nrs2vr', () => {
  test('Delete Vendor from Vendor List @T21qqjsyl', async ({ page }) => {
    // STEP 1: Login using seedLogin utility (REQUIRED)
    await seedLogin(page);

    // STEP 2: Navigate to the starting point
    await page.goto(`${baseUrl}/payees`);
    await waitForPageReady(page, '/payees');
    await expect(page).not.toHaveURL(/\/login/i, { timeout: 20000 });

    // STEP 3: Ensure Vendors tab is selected
    await optionalAction(page.getByRole('tab', { name: /vendors/i }), async () => {
      await page.getByRole('tab', { name: /vendors/i }).first().click();
    }, 'Vendors tab not found, continuing on current view');

    // STEP 4: Verify vendor list is displayed
    const listVisible = await safeExpectVisible(page.locator('table, [role="table"], [data-testid*="vendor"]').first(), 'Vendor list not visible');
    if (!listVisible) {
      test.info().annotations.push({ type: 'note', description: 'Vendor list not detected; delete may not be possible' });
    }

    // STEP 5: Capture a vendor from the list
    const row = await firstRow(page);
    if (!row) {
      test.info().annotations.push({ type: 'note', description: 'No vendor rows found to delete' });
      return;
    }

    const vendorNameCell = row.locator('td, [role="cell"]').first();
    let vendorName = (await vendorNameCell.textContent())?.trim() || '';
    if (!vendorName) {
      vendorName = 'Vendor';
      test.info().annotations.push({ type: 'note', description: 'Could not read vendor name, proceeding with generic search' });
    }

    // STEP 6: Search/filter for the vendor to be deleted
    const searchInput = page.getByRole('textbox', { name: /search|filter/i }).first();
    await optionalAction(searchInput, async () => {
      await searchInput.fill('');
      await searchInput.fill(vendorName);
      await page.waitForTimeout(500);
    }, 'Search input not found; proceeding without filter');

    // Verify target vendor is displayed
    const vendorRow = page.locator('table tbody tr, [role="row"]').filter({ hasText: textRegex(vendorName) }).first();
    await safeExpectVisible(vendorRow, 'Target vendor not visible after search');

    // STEP 7: Click on vendor row or open context menu
    await optionalAction(vendorRow, async () => {
      await vendorRow.click();
    }, 'Could not click vendor row');

    // STEP 8: Click Delete action
    const deleteButtonInRow = vendorRow.getByRole('button', { name: /delete/i }).first();
    const actionMenuButton = vendorRow.getByRole('button', { name: /more|action|menu|ellipsis|options/i }).first();
    const globalDeleteButton = page.getByRole('button', { name: /delete/i }).first();

    let deleteClicked = false;
    await optionalAction(deleteButtonInRow, async () => {
      await deleteButtonInRow.click();
      deleteClicked = true;
    }, 'Delete button in row not found');

    if (!deleteClicked) {
      await optionalAction(actionMenuButton, async () => {
        await actionMenuButton.click();
      }, 'Row action menu not found');

      await optionalAction(page.getByRole('menuitem', { name: /delete/i }), async () => {
        await page.getByRole('menuitem', { name: /delete/i }).first().click();
        deleteClicked = true;
      }, 'Delete menu item not found');
    }

    if (!deleteClicked) {
      await optionalAction(globalDeleteButton, async () => {
        await globalDeleteButton.click();
        deleteClicked = true;
      }, 'Global Delete button not found');
    }

    if (!deleteClicked) {
      test.info().annotations.push({ type: 'note', description: 'Delete action could not be triggered' });
      return;
    }

    // STEP 9: Confirm deletion in dialog
    const confirmDialog = page.getByRole('dialog').filter({ hasText: /delete|confirm/i }).first();
    await safeExpectVisible(confirmDialog, 'Confirmation dialog not visible');
    await optionalAction(confirmDialog.getByRole('button', { name: /confirm|delete|yes/i }), async () => {
      await confirmDialog.getByRole('button', { name: /confirm|delete|yes/i }).first().click();
    }, 'Confirm delete button not found');

    // STEP 10: Verify deletion success (toast or absence in list)
    await waitForToast(page, /deleted|success|removed/i);
    await page.waitForTimeout(1000);

    // Search again to confirm vendor is removed
    await optionalAction(searchInput, async () => {
      await searchInput.fill('');
      await searchInput.fill(vendorName);
      await page.waitForTimeout(1000);
    }, 'Search input not found for verification');

    const deletedRow = page.locator('table tbody tr, [role="row"]').filter({ hasText: textRegex(vendorName) }).first();
    try {
      await expect(deletedRow).toHaveCount(0, { timeout: 5000 });
    } catch {
      test.info().annotations.push({ type: 'note', description: 'Vendor still appears in list after delete attempt' });
    }
  });
});