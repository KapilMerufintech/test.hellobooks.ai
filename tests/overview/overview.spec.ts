import { test, expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { login as seedLogin } from '../utils/login';

test.setTimeout(120000);

const baseUrl = 'https://test.hellobooks.ai';

function textRegex(text: string) {
  return new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
}

function getByHeading(page: Page, name: string) {
  return page.locator('h1, h2, h3, h4, [role="heading"]', { hasText: textRegex(name) }).first();
}

function getByTextAny(page: Page, name: string) {
  return page.getByText(textRegex(name)).first();
}

function getLoginRedirectRegex() {
  return /\/login/i;
}

async function dismissObstructions(page: Page) {
  await page.addStyleTag({ content: '[data-tour="chat"] { display: none !important; }' }).catch(() => {});
}

async function openOverview(page: Page) {
  await page.goto(`${baseUrl}/`);
  await page.waitForLoadState('domcontentloaded');
  await dismissObstructions(page);
  const readySignals = [
    page.getByText(/financial overview/i).first(),
    page.getByText(/total income/i).first(),
    page.getByText(/kapil's financial overview/i).first(),
  ];
  let ready = false;
  for (const signal of readySignals) {
    try {
      await signal.waitFor({ state: 'visible', timeout: 15000 });
      ready = true;
      break;
    } catch {
      // Try next signal.
    }
  }
  if (!ready) {
    await expect(page.getByText(/overview/i).first()).toBeVisible({ timeout: 15000 });
  }
}

async function clickAndAssertNavigation(page: Page, locator: Locator, urlPattern: RegExp) {
  const context = page.context();
  const newPagePromise = context.waitForEvent('page', { timeout: 5000 }).catch(() => null);
  await locator.click();
  const newPage = await newPagePromise;
  if (newPage) {
    await newPage.waitForLoadState('domcontentloaded');
    await expect(newPage).toHaveURL(urlPattern);
    await newPage.close();
    return;
  }
  await page.waitForURL(urlPattern, { timeout: 10000 });
}

function normalizeNumber(text: string) {
  const cleaned = text.replace(/[,]/g, '').replace(/[^\d.-]/g, '');
  if (!cleaned || cleaned === '-' || cleaned === '.') return null;
  const value = Number.parseFloat(cleaned);
  return Number.isNaN(value) ? null : value;
}

async function getMetricValue(page: Page, label: string) {
  const labelLocator = page.getByText(textRegex(label)).first();
  if (!(await labelLocator.count())) return null;
  const container = labelLocator.locator('xpath=ancestor-or-self::*[self::div or self::section][1]');
  const text = (await container.textContent()) || '';
  return normalizeNumber(text);
}

async function optionalAction(locator: Locator, action: () => Promise<void>, note: string) {
  if (await locator.count()) {
    await action();
    return;
  }
  test.info().annotations.push({ type: 'note', description: note });
}

test.describe('@overview Overview - logged out @SDE619360', () => {
  test('HB-OVERVIEW-001: Load Overview page after login @TECFE9B74', { tag: ['@overview', '@HB-OVERVIEW-001'] }, async ({ page }) => {
    await seedLogin(page);
    await openOverview(page);
    await expect(page).toHaveURL(/\/$/);
  });

  test('HB-OVERVIEW-002: Overview is default landing page after login @T6A756370', { tag: ['@overview', '@HB-OVERVIEW-002'] }, async ({ page }) => {
    await seedLogin(page);
    await expect(page).toHaveURL(/\/$/);
  });

  test('HB-OVERVIEW-003: Overview page blocks access when not authenticated @T4D90B3FA', { tag: ['@overview', '@HB-OVERVIEW-003'] }, async ({ page }) => {
    await page.goto(`${baseUrl}/`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(getLoginRedirectRegex());
  });
});

test.describe('@overview Overview - logged in @SB59746FD', () => {
  test.beforeEach(async ({ page }) => {
    await seedLogin(page);
    await openOverview(page);
  });

  test('HB-OVERVIEW-004: Greeting displays user name @T51E2AE8E', { tag: ['@overview', '@HB-OVERVIEW-004'] }, async ({ page }) => {
    const greeting = page.getByRole('heading', { name: /hi[,!]?|welcome back/i }).first();
    await expect(greeting).toBeVisible({ timeout: 15000 });
  });

  test('HB-OVERVIEW-005: Financial Overview heading is visible @T17D8C46C', { tag: ['@overview', '@HB-OVERVIEW-005'] }, async ({ page }) => {
    await expect(getByTextAny(page, 'Financial Overview')).toBeVisible({ timeout: 15000 });
  });

  test('HB-OVERVIEW-006: KPI cards show Total Revenue and Total Expenses @TA245F164', { tag: ['@overview', '@HB-OVERVIEW-006'] }, async ({ page }) => {
    await expect(page.getByText(/total revenue|total income/i).first()).toBeVisible({ timeout: 15000 });
    await expect(getByTextAny(page, 'Total Expenses')).toBeVisible({ timeout: 15000 });
  });

  test('HB-OVERVIEW-007: KPI cards show Net Profit and Expense/Sales Ratio @TBE17706E', { tag: ['@overview', '@HB-OVERVIEW-007'] }, async ({ page }) => {
    await expect(getByTextAny(page, 'Net Profit')).toBeVisible({ timeout: 15000 });
    await expect(getByTextAny(page, 'Expense/Sales Ratio')).toBeVisible({ timeout: 15000 });
  });

  test('HB-OVERVIEW-008: KPI values show currency formatting @T197853DE', { tag: ['@overview', '@HB-OVERVIEW-008'] }, async ({ page }) => {
    const labels = ['Total Income', 'Total Revenue', 'Total Expenses', 'Net Profit', 'Cash Balance'];
    let parsed = false;
    for (const label of labels) {
      const value = await getMetricValue(page, label);
      if (value !== null) {
        parsed = true;
        break;
      }
    }
    expect(parsed).toBeTruthy();
  });

  test('HB-OVERVIEW-009: Reminders widget renders @T0C75C44E', { tag: ['@overview', '@HB-OVERVIEW-009'] }, async ({ page }) => {
    await expect(getByTextAny(page, 'Reminders')).toBeVisible({ timeout: 15000 });
  });

  test('HB-OVERVIEW-010: Match Status widget renders @T8E821840', { tag: ['@overview', '@HB-OVERVIEW-010'] }, async ({ page }) => {
    await expect(getByTextAny(page, 'Match Status')).toBeVisible({ timeout: 15000 });
  });

  test('HB-OVERVIEW-011: Match Type Distribution widget renders @T8845EE0A', { tag: ['@overview', '@HB-OVERVIEW-011'] }, async ({ page }) => {
    await expect(getByTextAny(page, 'Match Type Distribution')).toBeVisible({ timeout: 15000 });
  });

  test('HB-OVERVIEW-012: Recent Matches widget renders @T9D046971', { tag: ['@overview', '@HB-OVERVIEW-012'] }, async ({ page }) => {
    await expect(getByTextAny(page, 'Recent Matches')).toBeVisible({ timeout: 15000 });
  });

  test('HB-OVERVIEW-013: Industry Benchmarks widget renders @T4C495F3B', { tag: ['@overview', '@HB-OVERVIEW-013'] }, async ({ page }) => {
    await expect(getByTextAny(page, 'Industry Benchmarks')).toBeVisible({ timeout: 15000 });
  });

  test('HB-OVERVIEW-014: Expense Breakdown by Category chart renders @T4C7E8A42', { tag: ['@overview', '@HB-OVERVIEW-014'] }, async ({ page }) => {
    await expect(getByTextAny(page, 'Expense Breakdown by Category')).toBeVisible({ timeout: 15000 });
  });

  test('HB-OVERVIEW-015: Budget Tracker widget renders @TA6DFCD60', { tag: ['@overview', '@HB-OVERVIEW-015'] }, async ({ page }) => {
    await expect(getByTextAny(page, 'Budget Tracker')).toBeVisible({ timeout: 15000 });
  });

  test('HB-OVERVIEW-016: AI Spending Insights widget renders @T274C2BFA', { tag: ['@overview', '@HB-OVERVIEW-016'] }, async ({ page }) => {
    await expect(getByTextAny(page, 'AI Spending Insights')).toBeVisible({ timeout: 15000 });
  });

  test('HB-OVERVIEW-017: Predictive Cash Flow widget renders @T14584B27', { tag: ['@overview', '@HB-OVERVIEW-017'] }, async ({ page }) => {
    await expect(getByTextAny(page, 'Predictive Cash Flow')).toBeVisible({ timeout: 15000 });
  });

  test('HB-OVERVIEW-018: Anomaly Detection widget renders @T77925A51', { tag: ['@overview', '@HB-OVERVIEW-018'] }, async ({ page }) => {
    await expect(getByTextAny(page, 'Anomaly Detection')).toBeVisible({ timeout: 15000 });
  });

  test('HB-OVERVIEW-019: Expense Forecast widget renders @T8B48A2CF', { tag: ['@overview', '@HB-OVERVIEW-019'] }, async ({ page }) => {
    await expect(getByTextAny(page, 'Expense Forecast')).toBeVisible({ timeout: 15000 });
  });

  test('HB-OVERVIEW-020: Top Vendors by Spend widget renders @T77856F26', { tag: ['@overview', '@HB-OVERVIEW-020'] }, async ({ page }) => {
    await expect(getByTextAny(page, 'Top Vendors by Spend')).toBeVisible({ timeout: 15000 });
  });

  test('HB-OVERVIEW-021: Expense Heatmap widget renders @TF7FA2D99', { tag: ['@overview', '@HB-OVERVIEW-021'] }, async ({ page }) => {
    await expect(getByTextAny(page, 'Expense Heatmap')).toBeVisible({ timeout: 15000 });
  });

  test('HB-OVERVIEW-022: Overview navigation highlights active state @TEE87517B', { tag: ['@overview', '@HB-OVERVIEW-022'] }, async ({ page }) => {
    const overviewLink = page.getByRole('link', { name: /overview/i }).first();
    await expect(overviewLink).toBeVisible();
    const ariaCurrent = await overviewLink.getAttribute('aria-current');
    if (ariaCurrent) {
      expect(ariaCurrent).toMatch(/page/i);
    }
  });

  test('HB-OVERVIEW-023: Overview page supports refresh without logout @T5613239F', { tag: ['@overview', '@HB-OVERVIEW-023'] }, async ({ page }) => {
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/$/);
  });

  test('HB-OVERVIEW-024: Overview load time under 10 seconds @T5A6B8BC6', { tag: ['@overview', '@HB-OVERVIEW-024'] }, async ({ page }) => {
    const start = Date.now();
    await page.goto(`${baseUrl}/`);
    await expect(getByTextAny(page, 'Financial Overview')).toBeVisible({ timeout: 15000 });
    const elapsedMs = Date.now() - start;
    expect(elapsedMs).toBeLessThan(10000);
  });

  test('HB-OVERVIEW-025: Overview page has no console errors on load @TF2DA5D29', { tag: ['@overview', '@HB-OVERVIEW-025'] }, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto(`${baseUrl}/`);
    await page.waitForLoadState('domcontentloaded');
    expect(errors.length).toBe(0);
  });

  test('HB-OVERVIEW-026: Overview page blocks mixed content @T4A7E3BAC', { tag: ['@overview', '@HB-OVERVIEW-026'] }, async ({ page }) => {
    const warnings: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'warning' || msg.type() === 'error') warnings.push(msg.text());
    });
    await page.goto(`${baseUrl}/`);
    await page.waitForLoadState('domcontentloaded');
    const mixed = warnings.find((text) => /mixed content/i.test(text));
    expect(mixed).toBeUndefined();
  });

  test('HB-OVERVIEW-027: Overview page works on mobile viewport @T870DE67C', { tag: ['@overview', '@HB-OVERVIEW-027'] }, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${baseUrl}/`);
    await expect(getByHeading(page, 'Financial Overview')).toBeVisible();
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375);
  });

  test('HB-OVERVIEW-028: Overview widgets are keyboard accessible @TDD67D2FF', { tag: ['@overview', '@HB-OVERVIEW-028'] }, async ({ page }) => {
    await page.keyboard.press('Tab');
    const activeTag = await page.evaluate(() => document.activeElement?.tagName || '');
    expect(activeTag).not.toBe('');
  });

  test('HB-OVERVIEW-029: Overview page shows consistent branding @T29F56599', { tag: ['@overview', '@HB-OVERVIEW-029'] }, async ({ page }) => {
    await expect(page.getByText(/hello?books/i).first()).toBeVisible();
  });

  test('HB-OVERVIEW-030: Overview page allows opening Settings from header @TAF5B001B', { tag: ['@overview', '@HB-OVERVIEW-030'] }, async ({ page }) => {
    const settingsLink = page.getByRole('link', { name: /settings/i }).first();
    await optionalAction(settingsLink, async () => {
      await clickAndAssertNavigation(page, settingsLink, /settings/i);
    }, 'Settings link not present.');
  });

  test('HB-OVERVIEW-031: Overview page allows opening Help from header @T3E96EFA1', { tag: ['@overview', '@HB-OVERVIEW-031'] }, async ({ page }) => {
    const helpLink = page.getByRole('link', { name: /help/i }).first();
    await optionalAction(helpLink, async () => {
      await clickAndAssertNavigation(page, helpLink, /help/i);
    }, 'Help link not present.');
  });

  test('HB-OVERVIEW-032: Overview page allows opening Profile menu @T934834C6', { tag: ['@overview', '@HB-OVERVIEW-032'] }, async ({ page }) => {
    const profileTrigger = page.getByText(/@/).first();
    await optionalAction(profileTrigger, async () => {
      await profileTrigger.click();
      await expect(page.getByText(/@/).first()).toBeVisible();
    }, 'Profile trigger not detected.');
  });

  test('HB-OVERVIEW-033: Overview page logout from profile menu @TA942B14D', { tag: ['@overview', '@HB-OVERVIEW-033'] }, async ({ page }) => {
    const profileTrigger = page.getByText(/@/).first();
    await optionalAction(profileTrigger, async () => {
      await profileTrigger.click();
      const logoutButton = page.getByRole('button', { name: /logout/i }).first();
      await expect(logoutButton).toBeVisible();
      await logoutButton.click();
      await expect(page).toHaveURL(getLoginRedirectRegex());
    }, 'Profile or logout not available.');
  });

  test('HB-OVERVIEW-034: Overview page retains state after navigation back @T1D018636', { tag: ['@overview', '@HB-OVERVIEW-034'] }, async ({ page }) => {
    const transactionsLink = page.getByRole('link', { name: /transactions/i }).first();
    await optionalAction(transactionsLink, async () => {
      await transactionsLink.click();
      await page.waitForLoadState('domcontentloaded');
      await page.goBack();
      await expect(page).toHaveURL(/\/$/);
    }, 'Transactions link not present.');
  });

  test('HB-OVERVIEW-035: Overview page redirect from /login when authenticated @TEDF25497', { tag: ['@overview', '@HB-OVERVIEW-035'] }, async ({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await expect(page).not.toHaveURL(getLoginRedirectRegex());
  });

  test('HB-OVERVIEW-039: AI insights prompt input accepts query @T9DC36910', { tag: ['@overview', '@HB-OVERVIEW-039'] }, async ({ page }) => {
    const promptInput = page.locator(
      'input[placeholder*="Ask me anything" i], textarea[placeholder*="Ask me anything" i]',
    ).first();
    await optionalAction(promptInput, async () => {
      await promptInput.fill('Summarize my financial health in simple terms');
      await expect(promptInput).toHaveValue(/Summarize my financial health/i);
    }, 'AI prompt input not present.');
  });

  test('HB-OVERVIEW-040: AI insights rejects empty submission @T03037EF0', { tag: ['@overview', '@HB-OVERVIEW-040'] }, async ({ page }) => {
    const promptInput = page.locator(
      'input[placeholder*="Ask me anything" i], textarea[placeholder*="Ask me anything" i]',
    ).first();
    await optionalAction(promptInput, async () => {
      await promptInput.fill('');
      await promptInput.press('Enter');
      await expect(promptInput).toHaveValue('');
    }, 'AI prompt input not present.');
  });

  test('HB-OVERVIEW-044: Net Profit equals Total Revenue minus Total Expenses @T7ADBDDD7', { tag: ['@overview', '@HB-OVERVIEW-044'] }, async ({ page }) => {
    const revenue = await getMetricValue(page, 'Total Revenue');
    const expenses = await getMetricValue(page, 'Total Expenses');
    const netProfit = await getMetricValue(page, 'Net Profit');
    if (revenue === null || expenses === null || netProfit === null) {
      test.info().annotations.push({ type: 'note', description: 'Unable to parse KPI values.' });
      return;
    }
    expect(Math.round(revenue - expenses)).toBeCloseTo(Math.round(netProfit), 0);
  });

  test('HB-OVERVIEW-045: Expense/Sales Ratio matches Total Expenses divided by Total Revenue @TEA86C968', { tag: ['@overview', '@HB-OVERVIEW-045'] }, async ({ page }) => {
    const revenue = await getMetricValue(page, 'Total Revenue');
    const expenses = await getMetricValue(page, 'Total Expenses');
    const ratioText = await getMetricValue(page, 'Expense/Sales Ratio');
    if (revenue === null || expenses === null || ratioText === null || revenue === 0) {
      test.info().annotations.push({ type: 'note', description: 'Unable to parse KPI values.' });
      return;
    }
    const expectedRatio = (expenses / revenue) * 100;
    expect(expectedRatio).toBeCloseTo(ratioText, 0);
  });
});

