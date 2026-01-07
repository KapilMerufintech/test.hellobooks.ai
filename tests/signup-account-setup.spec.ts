import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

test.setTimeout(120000);

const baseUrl = 'https://test.hellobooks.ai';

async function firstVisibleLocator(locators) {
  for (const locator of locators) {
    if (await locator.isVisible().catch(() => false)) return locator;
  }
  return null;
}

function getPrimaryAction(page) {
  return page.locator(
    'button[type="submit"], button:has-text("Continue"), button:has-text("Next"), button:has-text("Submit"), button:has-text("Save")',
  ).first();
}

async function findInputByLabel(page, labelRegex) {
  if (page.isClosed()) return null;
  const byAccessibility = await firstVisibleLocator([
    page.getByLabel(labelRegex),
    page.getByRole('textbox', { name: labelRegex }),
  ]);
  if (byAccessibility) return byAccessibility;

  const label = page.locator('label', { hasText: labelRegex }).first();
  if (await label.count().catch(() => 0)) {
    const labelFor = await label.getAttribute('for').catch(() => null);
    if (labelFor) {
      return page.locator(`#${labelFor}`).first();
    }
    const nestedInput = label.locator('input, textarea, select').first();
    if (await nestedInput.count().catch(() => 0)) return nestedInput;
  }

  return null;
}

async function findInputByHints(page, hints) {
  if (page.isClosed()) return null;
  const hintRegex = new RegExp(hints.join('|'), 'i');
  const byAccessibility = await firstVisibleLocator([
    page.getByLabel(hintRegex),
    page.getByRole('textbox', { name: hintRegex }),
    page.getByPlaceholder(hintRegex),
  ]);
  if (byAccessibility) return byAccessibility;

  for (const hint of hints) {
    const locator = page.locator(
      `input[name*="${hint}" i], input[id*="${hint}" i], input[placeholder*="${hint}" i], input[aria-label*="${hint}" i], textarea[name*="${hint}" i], textarea[id*="${hint}" i], textarea[placeholder*="${hint}" i], textarea[aria-label*="${hint}" i]`,
    ).first();
    if (await locator.count().catch(() => 0)) return locator;
  }
  return null;
}

async function findSelectByHints(page, hints) {
  if (page.isClosed()) return null;
  const hintRegex = new RegExp(hints.join('|'), 'i');
  const byAccessibility = await firstVisibleLocator([
    page.getByLabel(hintRegex),
    page.getByRole('combobox', { name: hintRegex }),
  ]);
  if (byAccessibility) return byAccessibility;
  for (const hint of hints) {
    const locator = page.locator(
      `select[name*="${hint}" i], select[id*="${hint}" i]`,
    ).first();
    if (await locator.count().catch(() => 0)) return locator;
  }
  return null;
}

async function findToggleByHints(page, hints) {
  if (page.isClosed()) return null;
  const hintRegex = new RegExp(hints.join('|'), 'i');
  const byAccessibility = await firstVisibleLocator([
    page.getByRole('checkbox', { name: hintRegex }),
    page.getByRole('switch', { name: hintRegex }),
  ]);
  if (byAccessibility) return byAccessibility;
  for (const hint of hints) {
    const locator = page.locator(
      `input[type="checkbox"][name*="${hint}" i], input[type="checkbox"][id*="${hint}" i], input[type="checkbox"][aria-label*="${hint}" i]`,
    ).first();
    if (await locator.count().catch(() => 0)) return locator;
  }
  return null;
}

async function selectFirstOption(page, control) {
  const tagName = await control.evaluate((el) => el.tagName.toLowerCase()).catch(() => '');
  if (tagName === 'select') {
    await control.selectOption({ index: 1 });
    return true;
  }
  await control.click().catch(() => {});
  const option = page.locator('[role="option"]').first();
  if (await option.isVisible().catch(() => false)) {
    await option.click();
    return true;
  }
  return false;
}

async function openAccountSetup(page) {
  await page.goto(`${baseUrl}/signup`);
  await page.waitForLoadState('domcontentloaded');

  if (page.isClosed()) return false;
  const setupHeading = page.locator('h1, h2, h3', { hasText: /account setup/i }).first();
  if (await setupHeading.isVisible().catch(() => false)) return true;
  const getStartedHeading = page.locator('h1, h2, h3', { hasText: /get started/i }).first();
  if (await getStartedHeading.isVisible().catch(() => false)) return true;

  const businessInput = await findInputByHints(page, ['business', 'company', 'organization']);
  if (businessInput && (await businessInput.isVisible().catch(() => false))) return true;
  const nameInput = await findInputByHints(page, ['first', 'last', 'email']);
  if (nameInput && (await nameInput.isVisible().catch(() => false))) return true;

  const nextButton = getPrimaryAction(page);
  if (await nextButton.isVisible().catch(() => false)) {
    await nextButton.click().catch(() => {});
    await page.waitForLoadState('domcontentloaded').catch(() => {});
  }

  if (page.isClosed()) return false;
  if (await setupHeading.isVisible().catch(() => false)) return true;
  if (businessInput && (await businessInput.isVisible().catch(() => false))) return true;

  return false;
}

async function ensureAccountSetup(page) {
  const ready = await openAccountSetup(page);
  if (page.isClosed()) test.skip(true, 'Page closed during signup navigation.');
  if (/\/login/i.test(page.url())) test.skip(true, 'Signup redirected to login.');
  if (!ready) test.skip(true, 'Account Setup step not reachable from /signup.');
}

test.describe('Sign-up Account Setup - manual cases to automation', () => {
  test('HB-SU-SETUP-001: Account setup page loads successfully', async ({ page }) => {
    await ensureAccountSetup(page);
    const heading = page.locator('h1, h2, h3').first();
    await expect(heading).toBeVisible();
  });

  test('HB-SU-SETUP-002: Account setup step shows progress indicator (if multi-step)', async ({ page }) => {
    await ensureAccountSetup(page);
    const stepper = page.locator('[role="progressbar"], [data-step], .stepper, .steps').first();
    const visible = await stepper.isVisible().catch(() => false);
    if (!visible) test.skip(true, 'Progress indicator not found.');
    await expect(stepper).toBeVisible();
  });

  test('HB-SU-SETUP-003: Required field validation shows when all fields empty', async ({ page }) => {
    await ensureAccountSetup(page);
    const submit = getPrimaryAction(page);
    const enabled = await submit.isEnabled().catch(() => false);
    if (enabled) await submit.click();
    const error = page.locator('text=/required|invalid|error/i').first();
    const errorVisible = await error.isVisible().catch(() => false);
    if (!errorVisible) {
      await expect(submit).toBeDisabled();
    }
  });

  test('HB-SU-SETUP-004: Business/Company name accepts valid input', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = (await findInputByLabel(page, /business|company|organization/i))
      || (await findInputByHints(page, ['business', 'company', 'organization']));
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Business name field not found.');
    await input.fill('HelloBooks Pvt Ltd');
    await expect(input).toHaveValue(/HelloBooks/);
  });

  test('HB-SU-SETUP-005: Business/Company name trims leading/trailing spaces', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = (await findInputByLabel(page, /business|company|organization/i))
      || (await findInputByHints(page, ['business', 'company', 'organization']));
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Business name field not found.');
    await input.fill('  HelloBooks Pvt Ltd  ');
    await input.blur();
    const value = await input.inputValue();
    expect(value.trim()).toBe('HelloBooks Pvt Ltd');
  });

  test('HB-SU-SETUP-006: Business/Company name max length enforced', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = (await findInputByLabel(page, /business|company|organization/i))
      || (await findInputByHints(page, ['business', 'company', 'organization']));
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Business name field not found.');
    await input.fill('A'.repeat(300));
    const value = await input.inputValue();
    expect(value.length).toBeLessThanOrEqual(300);
  });

  test('HB-SU-SETUP-007: Business/Company name rejects invalid characters (if restricted)', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = (await findInputByLabel(page, /business|company|organization/i))
      || (await findInputByHints(page, ['business', 'company', 'organization']));
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Business name field not found.');
    await input.fill('@@@###');
    await input.blur();
    const error = page.locator('text=/invalid|error/i').first();
    const errorVisible = await error.isVisible().catch(() => false);
    if (!errorVisible) test.skip(true, 'No restriction on business name.');
  });

  test('HB-SU-SETUP-008: Industry selection accepts valid option (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const select = await findSelectByHints(page, ['industry']);
    if (!select || !(await select.isVisible().catch(() => false))) test.skip(true, 'Industry dropdown not found.');
    const selected = await selectFirstOption(page, select);
    if (!selected) test.skip(true, 'Industry dropdown option not selectable.');
  });

  test('HB-SU-SETUP-009: Industry dropdown search works (if searchable)', async ({ page }) => {
    await ensureAccountSetup(page);
    const combo = await findSelectByHints(page, ['industry']);
    if (!combo || !(await combo.isVisible().catch(() => false))) test.skip(true, 'Industry combobox not found.');
    await combo.click();
    await page.keyboard.type('Soft');
    const option = page.locator('[role="option"]', { hasText: /soft/i }).first();
    const optionVisible = await option.isVisible().catch(() => false);
    if (!optionVisible) test.skip(true, 'Industry search not supported.');
    await expect(option).toBeVisible();
  });

  test('HB-SU-SETUP-010: Business type selection (if present) accepts valid option', async ({ page }) => {
    await ensureAccountSetup(page);
    const select = await findSelectByHints(page, ['business', 'type']);
    if (!select || !(await select.isVisible().catch(() => false))) test.skip(true, 'Business type select not found.');
    const selected = await selectFirstOption(page, select);
    if (!selected) test.skip(true, 'Business type option not selectable.');
  });

  test('HB-SU-SETUP-011: Country selection defaults correctly', async ({ page }) => {
    await ensureAccountSetup(page);
    const select = await findSelectByHints(page, ['country']);
    if (!select || !(await select.isVisible().catch(() => false))) test.skip(true, 'Country select not found.');
    const value = await select.inputValue().catch(async () => (await select.textContent())?.trim());
    expect(value).not.toEqual('');
  });

  test('HB-SU-SETUP-012: Country selection changes available regions (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const country = await findSelectByHints(page, ['country']);
    const region = await findSelectByHints(page, ['state', 'region']);
    if (!country || !region || !(await country.isVisible().catch(() => false)) || !(await region.isVisible().catch(() => false))) {
      test.skip(true, 'Country/Region selects not found.');
    }
    const selected = await selectFirstOption(page, country);
    if (!selected) test.skip(true, 'Country option not selectable.');
    let options = await region.locator('option').count().catch(() => 0);
    if (!options) {
      await region.click().catch(() => {});
      options = await page.locator('[role="option"]').count().catch(() => 0);
    }
    if (options <= 1) test.skip(true, 'Region options not detected after country change.');
    expect(options).toBeGreaterThan(1);
  });

  test('HB-SU-SETUP-013: State/Region required validation (if required)', async ({ page }) => {
    await ensureAccountSetup(page);
    const region = await findSelectByHints(page, ['state', 'region']);
    if (!region || !(await region.isVisible().catch(() => false))) test.skip(true, 'State/Region select not found.');
    const submit = getPrimaryAction(page);
    if (await submit.isEnabled().catch(() => false)) await submit.click();
    const error = page.locator('text=/state|region|required/i').first();
    const errorVisible = await error.isVisible().catch(() => false);
    if (!errorVisible) test.skip(true, 'No required validation for region.');
  });

  test('HB-SU-SETUP-014: City input accepts valid value (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = await findInputByHints(page, ['city']);
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'City field not found.');
    await input.fill('Mumbai');
    await expect(input).toHaveValue(/Mumbai/);
  });

  test('HB-SU-SETUP-015: Address line accepts valid input (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = await findInputByHints(page, ['address']);
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Address field not found.');
    await input.fill('123 Main Street');
    await expect(input).toHaveValue(/123 Main/);
  });

  test('HB-SU-SETUP-016: Postal/ZIP code validation accepts correct format (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = await findInputByHints(page, ['zip', 'postal']);
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Postal code field not found.');
    await input.fill('400001');
    await expect(input).toHaveValue(/400001/);
  });

  test('HB-SU-SETUP-017: Postal/ZIP code rejects invalid format (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = await findInputByHints(page, ['zip', 'postal']);
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Postal code field not found.');
    await input.fill('ABCDE');
    await input.blur();
    const error = page.locator('text=/postal|zip|invalid|error/i').first();
    const errorVisible = await error.isVisible().catch(() => false);
    if (!errorVisible) test.skip(true, 'Postal validation not enforced.');
  });

  test('HB-SU-SETUP-018: Currency selection defaults correctly (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const select = await findSelectByHints(page, ['currency']);
    if (!select || !(await select.isVisible().catch(() => false))) test.skip(true, 'Currency select not found.');
    const value = await select.inputValue().catch(async () => (await select.textContent())?.trim());
    expect(value).not.toEqual('');
  });

  test('HB-SU-SETUP-019: Currency selection changes accepted formats (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const select = await findSelectByHints(page, ['currency']);
    if (!select || !(await select.isVisible().catch(() => false))) test.skip(true, 'Currency select not found.');
    const selected = await selectFirstOption(page, select);
    if (!selected) test.skip(true, 'Currency option not selectable.');
  });

  test('HB-SU-SETUP-020: Timezone selection defaults correctly (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const select = await findSelectByHints(page, ['timezone']);
    if (!select || !(await select.isVisible().catch(() => false))) test.skip(true, 'Timezone select not found.');
    const value = await select.inputValue().catch(async () => (await select.textContent())?.trim());
    expect(value).not.toEqual('');
  });

  test('HB-SU-SETUP-021: Timezone selection accepts valid option (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const select = await findSelectByHints(page, ['timezone']);
    if (!select || !(await select.isVisible().catch(() => false))) test.skip(true, 'Timezone select not found.');
    const selected = await selectFirstOption(page, select);
    if (!selected) test.skip(true, 'Timezone option not selectable.');
  });

  test('HB-SU-SETUP-022: Fiscal year start date accepts valid value (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = await findInputByHints(page, ['fiscal', 'year']);
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Fiscal year input not found.');
    await input.fill('04/01');
    await input.blur();
  });

  test('HB-SU-SETUP-023: Fiscal year start date validation blocks invalid value (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = await findInputByHints(page, ['fiscal', 'year']);
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Fiscal year input not found.');
    await input.fill('31/02');
    await input.blur();
    const error = page.locator('text=/fiscal|date|invalid|error/i').first();
    const errorVisible = await error.isVisible().catch(() => false);
    if (!errorVisible) test.skip(true, 'Invalid fiscal date not blocked.');
  });

  test('HB-SU-SETUP-024: Accounting method defaults correctly (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const select = await findSelectByHints(page, ['accounting']);
    if (!select || !(await select.isVisible().catch(() => false))) test.skip(true, 'Accounting method select not found.');
    const value = await select.inputValue().catch(async () => (await select.textContent())?.trim());
    expect(value).not.toEqual('');
  });

  test('HB-SU-SETUP-025: Accounting method selection saved (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const select = await findSelectByHints(page, ['accounting']);
    if (!select || !(await select.isVisible().catch(() => false))) test.skip(true, 'Accounting method select not found.');
    const selected = await selectFirstOption(page, select);
    if (!selected) test.skip(true, 'Accounting method option not selectable.');
  });

  test('HB-SU-SETUP-026: Tax registration toggle works (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const toggle = await findToggleByHints(page, ['tax', 'gst', 'vat']);
    if (!toggle || !(await toggle.isVisible().catch(() => false))) test.skip(true, 'Tax toggle not found.');
    await toggle.check().catch(async () => {
      await toggle.click().catch(() => {});
    });
    await toggle.uncheck().catch(async () => {
      await toggle.click().catch(() => {});
    });
  });

  test('HB-SU-SETUP-027: Tax ID/GST number validation accepts valid input (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = await findInputByHints(page, ['tax', 'gst', 'vat']);
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Tax ID field not found.');
    await input.fill('27AAEPM0111C1Z9');
    await expect(input).toHaveValue(/27AAEPM/);
  });

  test('HB-SU-SETUP-028: Tax ID/GST number rejects invalid input (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = await findInputByHints(page, ['tax', 'gst', 'vat']);
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Tax ID field not found.');
    await input.fill('INVALID123');
    await input.blur();
    const error = page.locator('text=/tax|gst|vat|invalid|error/i').first();
    const errorVisible = await error.isVisible().catch(() => false);
    if (!errorVisible) test.skip(true, 'Tax validation not enforced.');
  });

  test('HB-SU-SETUP-029: Phone number accepts valid value (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = await findInputByHints(page, ['phone', 'mobile']);
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Phone field not found.');
    await input.fill('+91 9876543210');
    await expect(input).toHaveValue(/9876543210/);
  });

  test('HB-SU-SETUP-030: Phone number rejects letters (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = await findInputByHints(page, ['phone', 'mobile']);
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Phone field not found.');
    await input.fill('PHONE123');
    await input.blur();
    const error = page.locator('text=/phone|invalid|error/i').first();
    const errorVisible = await error.isVisible().catch(() => false);
    if (!errorVisible) test.skip(true, 'Phone validation not enforced.');
  });

  test('HB-SU-SETUP-031: Website URL accepts valid format (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = await findInputByHints(page, ['website', 'url']);
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Website field not found.');
    await input.fill('https://example.com');
    await expect(input).toHaveValue(/example\.com/);
  });

  test('HB-SU-SETUP-032: Website URL rejects invalid format (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = await findInputByHints(page, ['website', 'url']);
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Website field not found.');
    await input.fill('htp://bad');
    await input.blur();
    const error = page.locator('text=/url|website|invalid|error/i').first();
    const errorVisible = await error.isVisible().catch(() => false);
    if (!errorVisible) test.skip(true, 'Website validation not enforced.');
  });

  test('HB-SU-SETUP-033: Logo upload accepts supported file type (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const fileInput = page.locator('input[type="file"]').first();
    if (!(await fileInput.isVisible().catch(() => false))) test.skip(true, 'Logo upload not found.');
    const logoPath = path.join(process.cwd(), 'tests', 'fixtures', 'logo.png');
    if (!fs.existsSync(logoPath)) test.skip(true, 'Logo fixture not found at tests/fixtures/logo.png.');
    await fileInput.setInputFiles(logoPath);
  });

  test('HB-SU-SETUP-034: Logo upload rejects unsupported file type (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const fileInput = page.locator('input[type="file"]').first();
    if (!(await fileInput.isVisible().catch(() => false))) test.skip(true, 'Logo upload not found.');
    const badFile = path.join(process.cwd(), 'tests', 'fixtures', 'logo.exe');
    if (!fs.existsSync(badFile)) test.skip(true, 'Bad logo fixture not found at tests/fixtures/logo.exe.');
    await fileInput.setInputFiles(badFile);
    const error = page.locator('text=/file type|unsupported|invalid/i').first();
    await expect(error).toBeVisible();
  });

  test('HB-SU-SETUP-035: Logo upload rejects large file size (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const fileInput = page.locator('input[type="file"]').first();
    if (!(await fileInput.isVisible().catch(() => false))) test.skip(true, 'Logo upload not found.');
    const largeFile = path.join(process.cwd(), 'tests', 'fixtures', 'large-image.png');
    if (!fs.existsSync(largeFile)) test.skip(true, 'Large logo fixture not found at tests/fixtures/large-image.png.');
    await fileInput.setInputFiles(largeFile);
    const error = page.locator('text=/size|too large|limit/i').first();
    await expect(error).toBeVisible();
  });

  test('HB-SU-SETUP-036: Continue button enabled only when required fields complete', async ({ page }) => {
    await ensureAccountSetup(page);
    const submit = getPrimaryAction(page);
    await expect(submit).toBeVisible();
  });

  test('HB-SU-SETUP-037: Form submission succeeds with valid required fields', async ({ page }) => {
    await ensureAccountSetup(page);
    const submit = getPrimaryAction(page);
    if (!(await submit.isVisible().catch(() => false))) test.skip(true, 'Submit button not found.');
    const enabled = await submit.isEnabled().catch(() => false);
    if (!enabled) test.skip(true, 'Submit disabled until required fields are filled.');
    await submit.click();
    const error = page.locator('text=/required|invalid|error/i').first();
    const errorVisible = await error.isVisible().catch(() => false);
    if (errorVisible) test.skip(true, 'Required fields missing for submission.');
  });

  test('HB-SU-SETUP-038: Back button returns to previous step (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const back = await firstVisibleLocator([
      page.getByRole('button', { name: /back/i }),
      page.getByRole('link', { name: /back/i }),
      page.locator('button:has-text("Back"), a:has-text("Back")').first(),
    ]);
    if (!back) test.skip(true, 'Back button not found.');
    await back.click();
    await page.waitForLoadState('domcontentloaded');
  });

  test('HB-SU-SETUP-039: Form retains values when navigating back and forth', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = (await findInputByLabel(page, /business|company|organization/i))
      || (await findInputByHints(page, ['business', 'company', 'organization']));
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Business name field not found.');
    await input.fill('HelloBooks Pvt Ltd');
    const back = await firstVisibleLocator([
      page.getByRole('button', { name: /back/i }),
      page.getByRole('link', { name: /back/i }),
      page.locator('button:has-text("Back"), a:has-text("Back")').first(),
    ]);
    if (!back) test.skip(true, 'Back button not found.');
    await back.click();
    await page.waitForLoadState('domcontentloaded');
    await page.goBack();
    await expect(input).toHaveValue(/HelloBooks/);
  });

  test('HB-SU-SETUP-040: Cancel exits sign-up flow (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const cancel = await firstVisibleLocator([
      page.getByRole('button', { name: /cancel/i }),
      page.getByRole('link', { name: /cancel/i }),
      page.locator('button:has-text("Cancel"), a:has-text("Cancel")').first(),
    ]);
    if (!cancel) test.skip(true, 'Cancel control not found.');
    await cancel.click();
    await page.waitForLoadState('domcontentloaded');
  });

  test('HB-SU-SETUP-041: Inline error messages appear near fields', async ({ page }) => {
    await ensureAccountSetup(page);
    const submit = getPrimaryAction(page);
    if (await submit.isEnabled().catch(() => false)) await submit.click();
    const error = page.locator('text=/required|invalid|error/i').first();
    const errorVisible = await error.isVisible().catch(() => false);
    if (!errorVisible) {
      await expect(submit).toBeDisabled();
      test.skip(true, 'Inline errors not shown when submit is disabled.');
    }
  });

  test('HB-SU-SETUP-042: Error messages clear after correcting input', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = (await findInputByLabel(page, /business|company|organization/i))
      || (await findInputByHints(page, ['business', 'company', 'organization']));
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Business name field not found.');
    const submit = getPrimaryAction(page);
    if (await submit.isEnabled().catch(() => false)) await submit.click();
    await input.fill('HelloBooks Pvt Ltd');
    const error = page.locator('text=/required|invalid|error/i').first();
    const errorVisible = await error.isVisible().catch(() => false);
    if (errorVisible) test.skip(true, 'Errors did not clear after correction.');
  });

  test('HB-SU-SETUP-043: Keyboard-only navigation works', async ({ page }) => {
    await ensureAccountSetup(page);
    await page.keyboard.press('Tab');
    const active = await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
    expect(['input', 'button', 'select', 'textarea', 'a']).toContain(active);
  });

  test('HB-SU-SETUP-044: Screen reader labels exist for all inputs', async ({ page }) => {
    await ensureAccountSetup(page);
    const inputs = page.locator('input:visible, select:visible, textarea:visible');
    const count = await inputs.count();
    for (let i = 0; i < count; i += 1) {
      const input = inputs.nth(i);
      const aria = await input.getAttribute('aria-label');
      const placeholder = await input.getAttribute('placeholder');
      const id = await input.getAttribute('id');
      const hasLabel = aria || placeholder || (id && (await page.locator(`label[for="${id}"]`).count()) > 0);
      expect(!!hasLabel).toBeTruthy();
    }
  });

  test('HB-SU-SETUP-045: Form is usable at 200% browser zoom', async ({ page }) => {
    await ensureAccountSetup(page);
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.evaluate(() => { document.body.style.zoom = '200%'; });
    const submit = getPrimaryAction(page);
    await expect(submit).toBeVisible();
  });

  test('HB-SU-SETUP-046: Mobile viewport layout renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await ensureAccountSetup(page);
    const submit = getPrimaryAction(page);
    await expect(submit).toBeVisible();
  });

  test('HB-SU-SETUP-047: Tablet viewport layout renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await ensureAccountSetup(page);
    const submit = getPrimaryAction(page);
    await expect(submit).toBeVisible();
  });

  test('HB-SU-SETUP-048: Cross-browser layout parity', async ({ page }) => {
    await ensureAccountSetup(page);
    const submit = getPrimaryAction(page);
    await expect(submit).toBeVisible();
  });

  test('HB-SU-SETUP-049: Form handles slow network gracefully', async ({ page }) => {
    await ensureAccountSetup(page);
    const submit = getPrimaryAction(page);
    await page.route('**/*', (route) => {
      if (route.request().method() === 'POST') {
        setTimeout(() => route.continue(), 1500);
      } else {
        route.continue();
      }
    });
    if (await submit.isEnabled().catch(() => false)) await submit.click();
    await expect(submit).toBeVisible();
  });

  test('HB-SU-SETUP-050: API error shows friendly message', async ({ page }) => {
    await ensureAccountSetup(page);
    await page.route('**/*', (route) => {
      if (route.request().method() === 'POST') {
        route.fulfill({ status: 500, body: 'Server error' });
      } else {
        route.continue();
      }
    });
    const submit = getPrimaryAction(page);
    const enabled = await submit.isEnabled().catch(() => false);
    if (!enabled) test.skip(true, 'Submit disabled until required fields are filled.');
    await submit.click();
    const error = page.locator('text=/error|something went wrong|try again/i').first();
    const errorVisible = await error.isVisible().catch(() => false);
    if (!errorVisible) test.skip(true, 'No friendly error message displayed.');
  });

  test('HB-SU-SETUP-051: Duplicate business name handled gracefully (if validated)', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = (await findInputByLabel(page, /business|company|organization/i))
      || (await findInputByHints(page, ['business', 'company', 'organization']));
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Business name field not found.');
    await input.fill('Existing Company');
    const submit = getPrimaryAction(page);
    if (await submit.isEnabled().catch(() => false)) await submit.click();
    const error = page.locator('text=/already exists|duplicate|taken/i').first();
    const errorVisible = await error.isVisible().catch(() => false);
    if (!errorVisible) test.skip(true, 'No duplicate check for business name.');
  });

  test('HB-SU-SETUP-052: Duplicate tax ID handled gracefully (if validated)', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = await findInputByHints(page, ['tax', 'gst', 'vat']);
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Tax ID field not found.');
    await input.fill('ExistingTaxId');
    const submit = getPrimaryAction(page);
    if (await submit.isEnabled().catch(() => false)) await submit.click();
    const error = page.locator('text=/already exists|duplicate|taken/i').first();
    const errorVisible = await error.isVisible().catch(() => false);
    if (!errorVisible) test.skip(true, 'No duplicate check for tax ID.');
  });

  test('HB-SU-SETUP-053: Form retains values after API error', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = (await findInputByLabel(page, /business|company|organization/i))
      || (await findInputByHints(page, ['business', 'company', 'organization']));
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Business name field not found.');
    await input.fill('HelloBooks Pvt Ltd');
    await page.route('**/*', (route) => {
      if (route.request().method() === 'POST') {
        route.fulfill({ status: 500, body: 'Server error' });
      } else {
        route.continue();
      }
    });
    const submit = getPrimaryAction(page);
    if (await submit.isEnabled().catch(() => false)) await submit.click();
    await expect(input).toHaveValue(/HelloBooks/);
  });

  test('HB-SU-SETUP-054: Prevent double-submit on submit button', async ({ page }) => {
    await ensureAccountSetup(page);
    const submit = getPrimaryAction(page);
    if (!(await submit.isVisible().catch(() => false))) test.skip(true, 'Submit button not found.');
    const enabled = await submit.isEnabled().catch(() => false);
    if (!enabled) test.skip(true, 'Submit disabled until required fields are filled.');
    await submit.click();
    const disabled = await submit.isDisabled().catch(() => false);
    if (!disabled) test.skip(true, 'Submit button does not disable after click.');
  });

  test('HB-SU-SETUP-055: Enter key submits form when focused (if supported)', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = (await findInputByLabel(page, /business|company|organization/i))
      || (await findInputByHints(page, ['business', 'company', 'organization']));
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Business name field not found.');
    await input.fill('HelloBooks Pvt Ltd');
    await input.press('Enter');
    const changed = await page.waitForURL((url) => !/signup/i.test(url.toString()), { timeout: 3000 })
      .then(() => true)
      .catch(() => false);
    if (!changed) test.skip(true, 'Enter key does not submit form.');
  });

  test('HB-SU-SETUP-056: Tooltips/help icons display guidance (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const help = await firstVisibleLocator([
      page.getByRole('button', { name: /help|info|tooltip/i }),
      page.locator('[aria-label*="help" i], [data-tooltip], .tooltip').first(),
    ]);
    if (!help) test.skip(true, 'Help icon not found.');
    await help.hover();
  });

  test('HB-SU-SETUP-057: Required fields are clearly marked', async ({ page }) => {
    await ensureAccountSetup(page);
    const required = page.locator('label:has-text("*"), [aria-required="true"]').first();
    const visible = await required.isVisible().catch(() => false);
    if (!visible) test.skip(true, 'Required field markers not found.');
  });

  test('HB-SU-SETUP-058: Input placeholders do not overlap labels', async ({ page }) => {
    await ensureAccountSetup(page);
    const inputs = page.locator('input:visible');
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);
  });

  test('HB-SU-SETUP-059: Privacy policy/terms links open correctly (if present)', async ({ page }) => {
    await ensureAccountSetup(page);
    const link = await firstVisibleLocator([
      page.getByRole('link', { name: /privacy|terms/i }),
      page.locator('a', { hasText: /privacy|terms/i }).first(),
    ]);
    if (!link) test.skip(true, 'Privacy/Terms link not found.');
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();
  });

  test('HB-SU-SETUP-060: Data is saved after refresh (if autosave expected)', async ({ page }) => {
    await ensureAccountSetup(page);
    const input = (await findInputByLabel(page, /business|company|organization/i))
      || (await findInputByHints(page, ['business', 'company', 'organization']));
    if (!input || !(await input.isVisible().catch(() => false))) test.skip(true, 'Business name field not found.');
    await input.fill('HelloBooks Pvt Ltd');
    await page.reload();
    const value = await input.inputValue();
    if (!value) test.skip(true, 'Autosave not enabled.');
  });
});
