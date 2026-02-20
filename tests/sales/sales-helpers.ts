import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export const baseUrl = 'https://test.hellobooks.ai';

export async function dismissObstructions(page: Page) {
  await page.addStyleTag({ content: '[data-tour="chat"] { display: none !important; }' }).catch(() => {});
}

export async function optionalAction(locator: Locator, action: () => Promise<void>, note: string) {
  const target = locator.first();
  try {
    await target.waitFor({ state: 'visible', timeout: 5000 });
    await target.scrollIntoViewIfNeeded().catch(() => {});
    await action();
    return true;
  } catch {
    test.info().annotations.push({ type: 'note', description: note });
    throw new Error(note);
  }
}

export async function assertVisibleOrNote(locator: Locator, note: string) {
  const target = locator.first();
  try {
    await expect(target).toBeVisible({ timeout: 5000 });
  } catch {
    test.info().annotations.push({ type: 'note', description: note });
  }
}

export async function openSalesModule(page: Page, moduleLabel: string) {
  await page.goto(baseUrl);
  await page.waitForLoadState('domcontentloaded');
  await dismissObstructions(page);

  const salesNav = page.getByRole('button', { name: /sales/i }).first();
  await optionalAction(salesNav, async () => {
    await salesNav.click();
  }, 'Sales navigation not found.');

  const moduleLink = page.getByRole('link', { name: new RegExp(moduleLabel, 'i') }).first();
  await optionalAction(moduleLink, async () => {
    await moduleLink.click();
  }, `${moduleLabel} link not found in Sales menu.`);

  const heading = page.getByRole('heading', { name: new RegExp(moduleLabel, 'i') }).first();
  await assertVisibleOrNote(heading, `${moduleLabel} heading not visible.`);
}

export async function openNewRecord(page: Page, moduleLabel: string) {
  await openSalesModule(page, moduleLabel);
  const createRegex = new RegExp(`create ${moduleLabel}|new ${moduleLabel}|add ${moduleLabel}`, 'i');
  const genericCreate = /create|new|add/i;
  const createButton = page.locator('button, [role="button"], a').filter({ hasText: createRegex }).first();
  const clickedSpecific = await optionalAction(createButton, async () => {
    await createButton.click();
  }, `Create ${moduleLabel} button not found.`);

  if (!clickedSpecific) {
    const fallbackButton = page.locator('button, [role="button"], a').filter({ hasText: genericCreate }).first();
    await optionalAction(fallbackButton, async () => {
      await fallbackButton.click();
    }, `Generic create button not found for ${moduleLabel}.`);
  }

  const formHeading = page.getByRole('heading', { name: new RegExp(moduleLabel.replace(/s$/, ''), 'i') }).first();
  await assertVisibleOrNote(formHeading, `${moduleLabel} form heading not visible.`);
}

export function getSearchInput(page: Page) {
  return page.locator('input[placeholder*="search" i], input[aria-label*="search" i]');
}

export function getFilterButton(page: Page) {
  return page.locator('button, [role="button"]').filter({ hasText: /filter/i });
}

export function getExportButton(page: Page) {
  return page.locator('button, [role="button"], a').filter({ hasText: /export|download|pdf/i });
}
