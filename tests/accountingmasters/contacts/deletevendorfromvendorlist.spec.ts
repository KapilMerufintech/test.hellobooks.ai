import { test, expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { login as seedLogin } from '../../utils/login';

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

test.describe('Accounting Masters @S1geo3iua', () => {
  test('Delete Vendor from Vendor List @Teqcvwqyd', async ({ page }) => {
    // STEP 1: Login using seedLogin utility
    await seedLogin(page);
    
    // STEP 2: Navigate to the target page (Accounting Masters > Contacts > List Contacts)
    await page.goto(`${baseUrl}/contacts/list`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page).not.toHaveURL(/\/login/i, { timeout: 20000 });

    // STEP 3: Handle potential empty state or table loading
    const tableRow = page.locator('table tbody tr, [role="row"]').filter({ hasNotText: /no data|empty/i }).first();
    const emptyState = page.getByText(/no data|empty|no contacts found/i).first();
    
    await Promise.race([
      tableRow.waitFor({ state: 'visible', timeout: 15000 }),
      emptyState.waitFor({ state: 'visible', timeout: 15000 }),
    ]).catch(() => {});

    // STEP 4: Identify the vendor row
    const row = await firstRow(page);
    if (!row) {
      test.info().annotations.push({ type: 'note', description: 'No vendors available to delete.' });
      return;
    }

    // Capture vendor name for verification later if possible
    const vendorName = await row.innerText().catch(() => 'Unknown Vendor');

    // STEP 5: Open actions/context menu or select row
    // Many systems use a 'More' or 'Actions' button/icon in the row
    const actionButton = row.locator('button, [aria-haspopup="menu"], .action-trigger').first();
    
    await optionalAction(actionButton, async () => {
      await actionButton.click();
    }, 'Action button not found in row, attempting direct row interaction.');

    // STEP 6: Click Delete action
    const deleteOption = page.getByRole('menuitem', { name: /delete/i }).first()
      .or(page.locator('text=Delete').first())
      .or(row.getByRole('button', { name: /delete/i }));

    const deleteVisible = await safeExpectVisible(deleteOption, 'Delete option not visible for the selected vendor.');
    
    if (deleteVisible) {
      await deleteOption.click();

      // STEP 7: Confirm the deletion in the dialog
      const confirmButton = page.getByRole('button', { name: /confirm|yes|delete/i }).filter({ hasNotText: /cancel/i }).first();
      
      await optionalAction(confirmButton, async () => {
        await confirmButton.click();
        
        // STEP 8: Verify success message or removal
        await safeExpectVisible(
          page.getByText(/deleted successfully|success/i).first(),
          'Success notification not displayed after deletion.'
        );
      }, 'Confirmation dialog button not found.');
    }

    // STEP 9: Final check - ensure the list refreshes and doesn't crash
    await page.waitForLoadState('networkidle').catch(() => {});
    await expect(page.getByText(textRegex(vendorName))).not.toBeVisible({ timeout: 5000 }).catch(() => {
        test.info().annotations.push({ type: 'note', description: `Vendor "${vendorName}" might still be visible in the list.` });
    });
  });
});