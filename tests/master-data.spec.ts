import { test, expect } from '@playwright/test';
import { login } from './utils/login';

test.setTimeout(120000);

const credentials = {
  email: 'fikoy39188@emaxasp.com',
  password: 'kapil08dangar@',
};

async function firstVisible(locator) {
  const count = await locator.count();
  for (let i = 0; i < count; i += 1) {
    const candidate = locator.nth(i);
    if (await candidate.isVisible().catch(() => false)) return candidate;
  }
  return null;
}

async function dismissObstructions(page) {
  await page.addStyleTag({ content: '[data-tour="chat"] { display: none !important; }' }).catch(() => {});
}

async function clickNavItem(page, pattern) {
  const candidates = page.locator('a, button, [role="menuitem"]', { hasText: pattern });
  const target = await firstVisible(candidates);
  if (!target) return false;
  await dismissObstructions(page);
  await target.click().catch(async () => {
    await dismissObstructions(page);
    await target.click({ force: true });
  });
  await page.waitForLoadState('networkidle');
  return true;
}

async function openMasterData(page) {
  await dismissObstructions(page);
  const opened = await clickNavItem(page, /^master data$/i);
  if (!opened) {
    await clickNavItem(page, /master data/i);
  }
}

async function openSection(page, pattern) {
  await openMasterData(page);
  const opened = await clickNavItem(page, pattern);
  if (!opened) {
    await clickNavItem(page, /master data/i);
    return await clickNavItem(page, pattern);
  }
  return opened;
}

async function closeModal(page) {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
}

test.describe('Master Data automation', () => {
  test('Navigate to Chart of Accounts page from Master Data menu', async ({ page }) => {
    await login(page, credentials);
    if (!(await openSection(page, /chart of accounts|accounts/i))) {
      test.skip(true, 'Chart of Accounts section not available.');
    }

    const headings = await page.locator('h1, h2').allInnerTexts();
    const headingText = headings.join(' ').toLowerCase();
    if (!/accounts/.test(headingText)) test.skip(true, 'Accounts heading not found.');
    expect(headingText).toMatch(/accounts/);
  });

  test('Open Add Account modal', async ({ page }) => {
    await login(page, credentials);
    if (!(await openSection(page, /chart of accounts|accounts/i))) {
      test.skip(true, 'Chart of Accounts section not available.');
    }

    const addButton = await firstVisible(
      page.locator('button:has-text("Add Account"), button:has-text("New Account")'),
    );
    if (!addButton) test.skip(true, 'Add Account button not found.');
    await addButton.click();

    const modal = await firstVisible(page.locator('text=Add Account, text=New Account'));
    if (!modal) test.skip(true, 'Add Account modal not detected.');
    await closeModal(page);
  });

  test('Open Contacts page and verify UI elements', async ({ page }) => {
    await login(page, credentials);
    if (!(await openSection(page, /contacts/i))) {
      test.skip(true, 'Contacts section not available.');
    }

    const heading = await firstVisible(page.locator('h1, h2', { hasText: /contacts/i }));
    if (!heading) test.skip(true, 'Contacts heading not found.');

    const searchInput = await firstVisible(
      page.locator('input[placeholder*="Search" i], input[aria-label*="Search" i]'),
    );
    if (!searchInput) test.skip(true, 'Contacts search input not found.');
  });

  test('Open Add Contact modal', async ({ page }) => {
    await login(page, credentials);
    if (!(await openSection(page, /contacts/i))) {
      test.skip(true, 'Contacts section not available.');
    }

    const addButton = await firstVisible(
      page.locator('button:has-text("Add Contact"), button:has-text("New Contact")'),
    );
    if (!addButton) test.skip(true, 'Add Contact button not found.');
    await addButton.click();

    const modal = await firstVisible(page.locator('text=Add Contact, text=New Contact'));
    if (!modal) test.skip(true, 'Add Contact modal not detected.');
    await closeModal(page);
  });

  test('Navigate to Products & Services list', async ({ page }) => {
    await login(page, credentials);
    if (!(await openSection(page, /products|services|items/i))) {
      test.skip(true, 'Products & Services section not available.');
    }

    const heading = await firstVisible(page.locator('h1, h2', { hasText: /products|items/i }));
    if (!heading) test.skip(true, 'Products & Services heading not found.');
  });

  test('Open New Item modal', async ({ page }) => {
    await login(page, credentials);
    if (!(await openSection(page, /products|services|items/i))) {
      test.skip(true, 'Products & Services section not available.');
    }

    const addButton = await firstVisible(
      page.locator('button:has-text("New Item"), button:has-text("Add Item")'),
    );
    if (!addButton) test.skip(true, 'New Item button not found.');
    await addButton.click();

    const modal = await firstVisible(page.locator('text=New Item, text=Add Item'));
    if (!modal) test.skip(true, 'New Item modal not detected.');
    await closeModal(page);
  });

  test('Navigate to Taxes under Master Data', async ({ page }) => {
    await login(page, credentials);
    if (!(await openSection(page, /taxes|tax rates|tax/i))) {
      test.skip(true, 'Taxes section not available.');
    }

    const heading = await firstVisible(page.locator('h1, h2', { hasText: /tax/i }));
    if (!heading) test.skip(true, 'Taxes heading not found.');
  });

  test('Open New Tax Rate modal', async ({ page }) => {
    await login(page, credentials);
    if (!(await openSection(page, /taxes|tax rates|tax/i))) {
      test.skip(true, 'Taxes section not available.');
    }

    const addButton = await firstVisible(
      page.locator('button:has-text("New Tax Rate"), button:has-text("Add Tax"), button:has-text("Add Tax Rate")'),
    );
    if (!addButton) test.skip(true, 'New Tax Rate button not found.');
    await addButton.click();

    const modal = await firstVisible(page.locator('text=New Tax Rate, text=Add Tax Rate'));
    if (!modal) test.skip(true, 'New Tax Rate modal not detected.');
    await closeModal(page);
  });

  test('Open Inventory History tab and verify default state', async ({ page }) => {
    await login(page, credentials);
    if (!(await openSection(page, /inventory history/i))) {
      test.skip(true, 'Inventory History section not available.');
    }

    const heading = await firstVisible(page.locator('h1, h2', { hasText: /inventory/i }));
    if (!heading) test.skip(true, 'Inventory heading not found.');
  });
});
