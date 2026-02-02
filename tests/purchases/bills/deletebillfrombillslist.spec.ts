import { test, expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { login as seedLogin } from '__UTILS_LOGIN_PATH__';

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
  if (await (row.count())) {
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

test.describe('Purchases @Sik775afb', () => {
  test('Delete Bill from Bills List @Tvticuhct', async ({ page }) => {
    // STEP 1: Login using seedLogin utility
    await seedLogin(page);
    
    // STEP 2: Navigate to Bills list page
    await page.goto(`${baseUrl}/list-bills`);
    await waitForPageReady(page, '/list-bills');
    
    // STEP 3: Identify a bill to delete
    // We wait for the table to load and check if there's data
    const row = await firstRow(page);
    
    if (!row) {
        test.info().annotations.push({ type: 'info', description: 'No bills found to delete. Creating a temporary bill first.' });
        
        // Create a bill if none exists to ensure test completeness
        await page.goto(`${baseUrl}/create-bills`);
        await waitForPageReady(page, '/create-bills');
        
        // Fill required fields for a dummy bill
        await selectOption(page, '[data-testid="vendor-select"], .vendor-dropdown', '.*', 'Vendor');
        await fillField(page, 'input[name="billNumber"]', `AUTO-DEL-${Date.now()}`, 'Bill Number');
        
        // Add a line item
        await clickButton(page, /add.*line|add.*item/i, 'Add Line Item');
        await fillField(page, 'input[name="description"]', 'Temporary Item for Deletion', 'Description');
        await fillField(page, 'input[name="quantity"]', '1', 'Quantity');
        await fillField(page, 'input[name="rate"]', '10', 'Rate');
        
        // Save the bill
        await clickButton(page, /save|submit|create/i, 'Save Bill');
        await waitForToast(page, /success|created|saved/i);
        
        // Return to list
        await page.goto(`${baseUrl}/list-bills`);
        await waitForPageReady(page, '/list-bills');
    }

    // Re-locate the first row after potential creation or page load
    const targetRow = await firstRow(page);
    expect(targetRow).not.toBeNull();

    // Capture some text from the row to verify deletion later (e.g., Bill Number)
    const billIdentifier = await targetRow!.innerText();

    // STEP 4: Click on the row actions menu (context menu)
    // Common patterns: ellipsis icon, "Actions" button, or right-click
    const actionMenu = targetRow!.locator('button[aria-haspopup="menu"], .action-btn, [data-testid="more-actions"]').first();
    await actionMenu.click();

    // STEP 5: Select 'Delete' option from the actions menu
    const deleteOption = page.getByRole('menuitem', { name: /delete/i }).first();
    await deleteOption.waitFor({ state: 'visible' });
    await deleteOption.click();

    // STEP 6: Confirm the deletion in the confirmation dialog
    const confirmButton = page.getByRole('button', { name: /confirm|delete|yes/i }).filter({ hasNotText: /cancel/i }).first();
    await confirmButton.waitFor({ state: 'visible' });
    await confirmButton.click();

    // FINAL STEP: Verify the operation completed successfully
    // 1. Check for success toast
    const isDeleted = await waitForToast(page, /deleted|success/i);
    
    // 2. Verify the bill is no longer in the list (or at least the specific one we targeted)
    if (billIdentifier) {
        const firstPart = billIdentifier.split('\t')[0].split('\n')[0]; // Get a unique-ish string from the row
        await expect(page.locator('table')).not.toContainText(new RegExp(firstPart), { timeout: 10000 });
    }

    test.info().annotations.push({ type: 'result', description: 'Bill deletion flow completed and verified.' });
  });
});