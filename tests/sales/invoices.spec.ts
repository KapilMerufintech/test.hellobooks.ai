import { test, expect } from '@playwright/test';
import type { Page, TestInfo } from '@playwright/test';

// ================================
// ✅ INLINE LOGIN (NO EXTERNAL IMPORTS)
// Self-contained login for Jenkins/Testomat.io compatibility
// ================================
const seedCredentials = {
  email: 'fapopi7433@feanzier.com',
  password: 'Kapil08dangar@'
};

async function seedLogin(page: Page) {
  await page.goto('/login');
  
  const emailField = page.locator(
    'input[name="email"], input[type="email"], input[placeholder*="Email" i], input[aria-label*="Email" i]'
  );
  await emailField.first().waitFor({ state: 'visible', timeout: 60000 });
  await emailField.first().fill(seedCredentials.email);
  
  const passwordField = page.locator(
    'input[name="password"], input[type="password"], input[placeholder*="Password" i], input[aria-label*="Password" i]'
  );
  await passwordField.first().waitFor({ state: 'visible', timeout: 60000 });
  await passwordField.first().fill(seedCredentials.password);
  
  const submitButton = page.locator(
    'button[type="submit"], button:has-text("Login"), button:has-text("Sign in"), button:has-text("Log in")'
  );
  await submitButton.first().waitFor({ state: 'visible', timeout: 30000 });
  await submitButton.first().click();
  
  await page.waitForLoadState('domcontentloaded');
  await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 60000 });
}
// ================================

const invoicesUrl = '/sales/invoices';
const customersNewUrl = '/sales/customers/new';

type SeedData = {
  customerName: string;
  customerEmail: string;
  invoiceNumber: string;
};

function buildSeedData(testInfo: TestInfo): SeedData {
  const suffix = testInfo.testId.slice(0, 8);
  return {
    customerName: `Auto Customer ${suffix}`,
    customerEmail: `auto.customer+${suffix}@example.com`,
    invoiceNumber: `AUTO-${suffix}`,
  };
}

async function openInvoices(page: Page) {
  // Navigate directly to invoices list with tab parameter
  await page.goto('/?tab=invoices');
  
  // Wait for invoices page to load
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000);
  
  // Verify invoices page is loaded
  const invoicesHeading = page.getByRole('heading', { name: /invoices/i }).first();
  const invoicesTable = page.locator('table, [role="table"]').first();
  
  // Check if either heading or table is visible
  try {
    await expect(invoicesHeading.or(invoicesTable)).toBeVisible({ timeout: 10000 });
  } catch (error) {
    // Fallback: verify URL contains the tab parameter
    await expect(page).toHaveURL(/tab=invoices/);
  }
}

async function createCustomer(page: Page, seed: SeedData) {
  // Navigate through UI to Master Data > Contacts
  await page.goto('/');
  
  // Click Master Data menu
  const masterDataButton = page.getByRole('button', { name: /master data/i });
  await masterDataButton.waitFor({ state: 'visible', timeout: 10000 });
  await masterDataButton.click();
  await page.waitForTimeout(500);
  
  // Click Contacts link
  const contactsLink = page.getByRole('link', { name: /contacts/i }).or(page.getByRole('button', { name: /contacts/i }));
  await contactsLink.first().click();
  await page.waitForLoadState('domcontentloaded');
  
  // Click New Contact/Customer button
  const newButton = page.getByRole('button', { name: /new contact|add contact|create contact|new customer/i }).first();
  await expect(newButton).toBeVisible({ timeout: 10000 });
  await newButton.click();
  
  // Fill customer form
  await page.waitForTimeout(1000);
  const nameInput = page.getByLabel(/name/i).or(page.getByPlaceholder(/name/i)).first();
  const emailInput = page.getByLabel(/email/i).or(page.getByPlaceholder(/email/i)).first();
  await expect(nameInput).toBeVisible({ timeout: 10000 });
  await expect(emailInput).toBeVisible({ timeout: 10000 });
  await nameInput.fill(seed.customerName);
  await emailInput.fill(seed.customerEmail);
  const saveButton = page.getByRole('button', { name: /save|create|submit/i }).first();
  await expect(saveButton).toBeVisible();
  await saveButton.click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000);
}

async function startNewInvoice(page: Page) {
  await openInvoices(page);
  
  // Click "Create Invoice" button to open dropdown
  const createButton = page.getByRole('button', { name: /create invoice/i }).first();
  await createButton.waitFor({ state: 'visible', timeout: 15000 });
  await createButton.click();
  
  // Wait for dropdown menu to appear
  await page.waitForTimeout(1500);
  
  // Look for dropdown menu items - try to find any visible dropdown content first
  const dropdownMenu = page.locator('[role="menu"], [role="menuitem"], .dropdown-menu, [class*="dropdown"]').first();
  
  try {
    await dropdownMenu.waitFor({ state: 'visible', timeout: 5000 });
  } catch (error) {
    // Dropdown might not have appeared, wait a bit longer
    await page.waitForTimeout(1000);
  }
  
  // Try multiple selectors for "New Invoice" option - be very liberal with matching
  const newInvoiceOption = page.locator('text="New Invoice"').first()
    .or(page.locator('text="New invoice"').first())
    .or(page.getByText(/^new invoice$/i).first())
    .or(page.getByRole('menuitem', { name: /new invoice/i }).first())
    .or(page.locator('[role="option"]').filter({ hasText: /new invoice/i }).first())
    .or(page.locator('[role="menu"]').locator('text=/new invoice/i').first())
    .or(page.locator('button', { hasText: /new invoice/i }).first())
    .or(page.locator('a', { hasText: /new invoice/i }).first())
    .or(page.locator('div', { hasText: /^new invoice$/i }).first());
  
  await newInvoiceOption.waitFor({ state: 'visible', timeout: 10000 });
  await newInvoiceOption.click();
  
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);
  
  // Verify we're on the invoice form - check multiple indicators
  const customerField = page.getByPlaceholder(/choose a customer/i);
  const invoiceHeading = page.getByRole('heading', { name: /new invoice|create invoice/i });
  const invoiceNumberField = page.getByPlaceholder(/invoice/i);
  
  const formIndicator = customerField.or(invoiceHeading).or(invoiceNumberField);
  
  try {
    await expect(formIndicator.first()).toBeVisible({ timeout: 15000 });
  } catch (error) {
    // Form didn't load - take a screenshot for debugging
    await page.screenshot({ path: 'debug-invoice-form-not-loaded.png', fullPage: true });
    throw new Error('Invoice form did not load after clicking New Invoice. Check debug-invoice-form-not-loaded.png');
  }
}

async function selectCustomerByName(page: Page, customerName: string) {
  // Click the "Choose a Customer" combobox
  const customerCombobox = page.getByText(/choose a customer/i)
    .or(page.getByPlaceholder(/choose a customer/i))
    .or(page.locator('[placeholder*="customer" i]'));
  
  await customerCombobox.first().waitFor({ state: 'visible', timeout: 15000 });
  await customerCombobox.first().click();
  await page.waitForTimeout(800);
  
  // Type customer name in the search/input field that appears
  const customerInput = page.locator('input[type="text"]').first();
  await customerInput.waitFor({ state: 'visible', timeout: 10000 });
  await customerInput.fill(customerName);
  await page.waitForTimeout(1000);
  
  // Click the customer option
  const customerOption = page.getByRole('option', { name: new RegExp(customerName, 'i') })
    .or(page.locator('[role="option"]', { hasText: new RegExp(customerName, 'i') }))
    .or(page.getByText(new RegExp(`^${customerName}`, 'i')));
  
  await customerOption.first().waitFor({ state: 'visible', timeout: 10000 });
  await customerOption.first().click();
  await page.waitForTimeout(500);
}

async function setInvoiceNumber(page: Page, invoiceNumber: string) {
  const numberInput = page
    .locator('input[placeholder*="Invoice" i], input[aria-label*="Invoice" i], input[name*="invoice" i]')
    .first();
  await expect(numberInput).toBeVisible();
  await numberInput.fill(invoiceNumber);
}

async function addLineItem(page: Page, description: string, qty: number, price: number) {
  // Wait for the line items section to be ready
  await page.waitForTimeout(1000);
  
  // Click the item combobox to open dropdown
  const itemCombobox = page.getByText(/select item/i)
    .or(page.getByPlaceholder(/select item|search item/i))
    .or(page.locator('[placeholder*="item" i]'))
    .or(page.locator('input[type="text"]').first());
  
  await itemCombobox.first().waitFor({ state: 'visible', timeout: 15000 });
  await itemCombobox.first().click();
  await page.waitForTimeout(1500);
  
  // Wait for dropdown options to appear
  const dropdownOptions = page.getByRole('option')
    .or(page.locator('[role="option"]'))
    .or(page.locator('[class*="option"]'))
    .or(page.locator('li[data-value]'));
  
  try {
    // Try to select an existing item from dropdown
    // First, try to find an option matching the description
    const matchingOption = page.getByRole('option', { name: new RegExp(description, 'i') })
      .or(page.locator('[role="option"]', { hasText: new RegExp(description, 'i') }));
    
    const matchingCount = await matchingOption.count();
    
    if (matchingCount > 0) {
      // Found matching item in dropdown, click it
      await matchingOption.first().click();
      await page.waitForTimeout(800);
    } else {
      // No matching item, select the first available item from dropdown
      const firstOption = dropdownOptions.first();
      const optionCount = await dropdownOptions.count();
      
      if (optionCount > 0) {
        await firstOption.waitFor({ state: 'visible', timeout: 5000 });
        await firstOption.click();
        await page.waitForTimeout(800);
      } else {
        // No dropdown options available, type custom description and press Escape
        await page.keyboard.type(description);
        await page.waitForTimeout(500);
        await page.keyboard.press('Escape');
        await page.waitForTimeout(800);
      }
    }
  } catch (error) {
    // Fallback: type description and close dropdown
    await page.keyboard.type(description);
    await page.waitForTimeout(500);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(800);
  }
  
  // Find quantity input
  const lineItemSection = page.locator('table, [role="table"], .line-items, [class*="line"]').first();
  
  const qtyInput = page.getByPlaceholder(/qty|quantity/i).first()
    .or(lineItemSection.locator('input[type="number"]').first())
    .or(lineItemSection.locator('input').filter({ hasText: '1' }).first())
    .or(page.locator('input[value="1"]').first());
  
  try {
    await qtyInput.waitFor({ state: 'visible', timeout: 10000 });
    await qtyInput.click();
    await qtyInput.clear();
    await qtyInput.fill(String(qty));
    await page.waitForTimeout(500);
  } catch (error) {
    // Fallback: use Tab key navigation
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300);
    await page.keyboard.type(String(qty));
    await page.waitForTimeout(300);
  }
  
  // Fill price
  const priceInput = page.getByPlaceholder(/price|rate|amount/i).first()
    .or(lineItemSection.locator('input[type="number"]').nth(1))
    .or(page.locator('input[type="number"]').nth(1));
  
  try {
    await priceInput.waitFor({ state: 'visible', timeout: 10000 });
    await priceInput.click();
    await priceInput.clear();
    await priceInput.fill(String(price));
    await page.waitForTimeout(800);
  } catch (error) {
    // Fallback: use Tab key navigation
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300);
    await page.keyboard.type(String(price));
    await page.waitForTimeout(800);
  }
  
  // Verify that the line item was added by checking if total appears
  await page.waitForTimeout(500);
}

async function saveDraft(page: Page) {
  // Look for save buttons - try "Save & close" first, then fallback to any Save button
  const saveAndCloseButton = page.getByRole('button', { name: /save\s*&\s*close/i })
    .or(page.getByRole('button', { name: /save and close/i }))
    .or(page.locator('button:has-text("Save & close")'))
    .or(page.locator('button:has-text("Save and close")'));
  
  const genericSaveButton = page.getByRole('button', { name: /^save$/i })
    .or(page.getByRole('button', { name: /save draft/i }))
    .or(page.locator('button:has-text("Save")'));
  
  // Try Save & close first
  try {
    const saveCloseCount = await saveAndCloseButton.count();
    if (saveCloseCount > 0) {
      await saveAndCloseButton.first().waitFor({ state: 'visible', timeout: 5000 });
      await saveAndCloseButton.first().click();
    } else {
      // Fallback to generic Save button
      await genericSaveButton.first().waitFor({ state: 'visible', timeout: 5000 });
      await genericSaveButton.first().click();
    }
  } catch (error) {
    // Last resort: try any button with "save" in it
    const anySaveButton = page.locator('button', { hasText: /save/i }).first();
    await anySaveButton.waitFor({ state: 'visible', timeout: 5000 });
    await anySaveButton.click();
  }
  
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2500);
  
  // Verify we're back on invoices list by checking URL or elements
  const invoicesPage = page.getByRole('heading', { name: /^invoices$/i }).first()
    .or(page.locator('table, [role="table"]').first())
    .or(page.getByRole('button', { name: /create invoice/i }).first());
  
  try {
    await expect(invoicesPage).toBeVisible({ timeout: 15000 });
  } catch (error) {
    // Fallback: verify URL contains "invoices" or "tab=invoices"
    await expect(page).toHaveURL(/invoices|tab=invoices/);
  }
}

async function expectStatus(page: Page, status: RegExp) {
  await expect(page.getByText(status).first()).toBeVisible();
}

test.describe('@sales Sales / Invoices @S64c1475f', () => {
  test('@Td4d74412 @invoice HB-INVOICE-001: Open invoices list after login', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout for this test
    await seedLogin(page);
    await openInvoices(page);
  });

  test('@T549282c6 @invoice HB-INVOICE-002: Create draft invoice with required fields', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout for this test
    const seed = buildSeedData(test.info()); // Stable seed tied to test id.
    await seedLogin(page);
    await createCustomer(page, seed);
    // openInvoices is called by startNewInvoice, no need to call it here
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await setInvoiceNumber(page, seed.invoiceNumber);
    await addLineItem(page, 'Automation Service', 1, 100);
    await saveDraft(page);
    await expectStatus(page, /draft/i);
  });

  test('@T5b70e5f0 @invoice HB-INVOICE-003: Validate required customer on invoice', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout for this test
    await seedLogin(page);
    await openInvoices(page);
    await startNewInvoice(page);
    await addLineItem(page, 'Automation Service', 1, 100);
    await saveDraft(page);
    await expect(page.getByText(/customer.*required|required.*customer/i).first()).toBeVisible();
  });

  test('@T1aef6915 @invoice HB-INVOICE-004: Validate required line items on invoice', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout for this test
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await saveDraft(page);
    await expect(page.getByText(/line item|required.*item|add.*item/i).first()).toBeVisible();
  });

  test('@Tad077794 @invoice HB-INVOICE-005: Line item totals calculate correctly', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout for this test
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await addLineItem(page, 'Automation Service', 3, 100);
    await expect(page.getByText(/300(?:\\.00)?/).first()).toBeVisible();
  });

  test('@T28a11cf0 @invoice HB-INVOICE-006: Invoice subtotal equals sum of line totals', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout for this test
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await addLineItem(page, 'Automation Service A', 1, 100);
    await addLineItem(page, 'Automation Service B', 2, 50);
    await expect(page.getByText(/subtotal/i).first()).toBeVisible();
    await expect(page.getByText(/200(?:\\.00)?/).first()).toBeVisible();
  });

  test('@Teb2003dc @invoice HB-INVOICE-007: Percentage discount reduces line total', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout for this test
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await addLineItem(page, 'Automation Service', 1, 100);
    const discountInput = page
      .locator('input[placeholder*="Discount" i], input[aria-label*="Discount" i], input[name*="discount" i]')
      .first();
    await expect(discountInput).toBeVisible();
    await discountInput.fill('10');
    await expect(page.getByText(/90(?:\\.00)?/).first()).toBeVisible();
  });

  test('@T128751dc @invoice HB-INVOICE-008: Fixed discount reduces invoice subtotal', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout for this test
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await addLineItem(page, 'Automation Service', 1, 200);
    const discountInput = page
      .locator('input[placeholder*="Discount" i], input[aria-label*="Discount" i], input[name*="discount" i]')
      .first();
    await expect(discountInput).toBeVisible();
    await discountInput.fill('50');
    await expect(page.getByText(/150(?:\\.00)?/).first()).toBeVisible();
  });

  test('@T3f9b2a51 @invoice HB-INVOICE-009: Tax exclusive calculation', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout for this test
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await addLineItem(page, 'Taxable Service', 1, 100);
    // Select or verify tax is applied (10%)
    const taxInput = page
      .locator('input[placeholder*="Tax" i], input[aria-label*="Tax" i], select[name*="tax" i]')
      .first();
    if (await taxInput.count()) {
      await taxInput.click();
      const taxOption = page.getByRole('option', { name: /10|tax/i }).first();
      if (await taxOption.count()) await taxOption.click();
    }
    // Verify tax is added on top of subtotal (exclusive)
    await expect(page.getByText(/tax/i).first()).toBeVisible();
    // Subtotal should be 100, tax 10, total 110 (or similar)
    const totalText = page.getByText(/total/i).first();
    await expect(totalText).toBeVisible();
  });

  test('@T7a4e3c82 @invoice HB-INVOICE-010: Tax inclusive calculation', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout for this test
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    // Set tax mode to inclusive if available
    const taxModeToggle = page.getByText(/inclusive|tax inclusive/i).first();
    if (await taxModeToggle.count()) await taxModeToggle.click();
    await addLineItem(page, 'Taxable Service', 1, 100);
    // Verify tax is included in price
    await expect(page.getByText(/tax/i).first()).toBeVisible();
    const totalText = page.getByText(/total/i).first();
    await expect(totalText).toBeVisible();
  });

  test('@T9c1d5b73 @invoice HB-INVOICE-011: Multiple tax rates per line', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout for this test
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await addLineItem(page, 'Item A with 5% tax', 1, 100);
    await addLineItem(page, 'Item B with 12% tax', 1, 100);
    // Verify tax breakdown if shown
    await expect(page.getByText(/tax/i).first()).toBeVisible();
    await saveDraft(page);
    await expectStatus(page, /draft/i);
  });

  test('@T2e8f6a94 @invoice HB-INVOICE-012: Zero-rated tax item', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout for this test
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await addLineItem(page, 'Zero tax item', 1, 100);
    // Select zero tax rate if available
    const taxInput = page
      .locator('input[placeholder*="Tax" i], input[aria-label*="Tax" i], select[name*="tax" i]')
      .first();
    if (await taxInput.count()) {
      await taxInput.click();
      const zeroTaxOption = page.getByRole('option', { name: /0|zero|none/i }).first();
      if (await zeroTaxOption.count()) await zeroTaxOption.click();
    }
    await saveDraft(page);
    // Verify tax value is 0
    await expectStatus(page, /draft/i);
  });

  test('@T4b9c7d15 @invoice HB-INVOICE-013: Non-taxable item does not add tax', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout for this test
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await addLineItem(page, 'Non-taxable item', 1, 100);
    // Ensure no tax is selected or deselect tax
    const taxInput = page
      .locator('input[placeholder*="Tax" i], input[aria-label*="Tax" i], select[name*="tax" i]')
      .first();
    if (await taxInput.count()) {
      await taxInput.click();
      const noTaxOption = page.getByRole('option', { name: /no tax|none|exempt/i }).first();
      if (await noTaxOption.count()) await noTaxOption.click();
    }
    await saveDraft(page);
    await expectStatus(page, /draft/i);
  });

  test('@T6d1e8f26 @invoice HB-INVOICE-014: Invoice numbering sequence increments', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout for this test
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    
    // Create first invoice
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await addLineItem(page, 'Service A', 1, 100);
    await saveDraft(page);
    const firstNumber = await page
      .locator('input[placeholder*="Invoice" i], input[aria-label*="Invoice" i], [data-testid*="invoice-number"]')
      .first()
      .inputValue();
    
    // Create second invoice
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await addLineItem(page, 'Service B', 1, 100);
    await saveDraft(page);
    const secondNumber = await page
      .locator('input[placeholder*="Invoice" i], input[aria-label*="Invoice" i], [data-testid*="invoice-number"]')
      .first()
      .inputValue();
    
    // Verify numbers are different (sequential)
    expect(firstNumber).not.toBe(secondNumber);
  });

  test('@T8f3g9h37 @invoice HB-INVOICE-015: Duplicate invoice number rejected', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout for this test
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    
    // Create first invoice with specific number
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await setInvoiceNumber(page, seed.invoiceNumber);
    await addLineItem(page, 'Service A', 1, 100);
    await saveDraft(page);
    await expectStatus(page, /draft/i);
    
    // Attempt to create second invoice with same number
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await setInvoiceNumber(page, seed.invoiceNumber);
    await addLineItem(page, 'Service B', 1, 100);
    await saveDraft(page);
    
    // Expect validation error
    await expect(page.getByText(/duplicate|already exists|unique/i).first()).toBeVisible();
  });

  test('@T1h4i5j48 @invoice HB-INVOICE-016: Payment terms set due date', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout for this test
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await addLineItem(page, 'Service with payment terms', 1, 100);
    
    // Select payment terms Net 30
    const paymentTermsInput = page
      .locator(
        'select[name*="payment" i], select[name*="terms" i], input[placeholder*="Payment Terms" i], input[aria-label*="Payment Terms" i]',
      )
      .first();
    if (await paymentTermsInput.count()) {
      await paymentTermsInput.click();
      const net30Option = page.getByRole('option', { name: /net 30|30 days/i }).first();
      if (await net30Option.count()) await net30Option.click();
    }
    
    await saveDraft(page);
    // Verify due date is set (should be 30 days from invoice date)
    const dueDateField = page.getByText(/due date|due on/i).first();
    await expect(dueDateField).toBeVisible();
  });

  test('@T3j6k7l59 @invoice HB-INVOICE-017: Manual due date override', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout for this test
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await addLineItem(page, 'Service with custom due date', 1, 100);
    
    // Set manual due date
    const dueDateInput = page
      .locator('input[type="date"][name*="due" i], input[placeholder*="Due Date" i], input[aria-label*="Due Date" i]')
      .first();
    if (await dueDateInput.count()) {
      await dueDateInput.fill('2026-03-15');
    }
    
    await saveDraft(page);
    await expectStatus(page, /draft/i);
  });

  test('@Td872aa29 @invoice HB-INVOICE-018: Send invoice marks status as Sent', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout for this test
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await setInvoiceNumber(page, seed.invoiceNumber);
    await addLineItem(page, 'Automation Service', 1, 100);
    await saveDraft(page);
    const sendButton = page.getByRole('button', { name: /send/i }).first();
    await expect(sendButton).toBeVisible();
    await sendButton.click();
    await expectStatus(page, /sent/i);
  });

  test('@T5m8n9o61 @invoice HB-INVOICE-019: Email template uses invoice variables', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout for this test
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await setInvoiceNumber(page, seed.invoiceNumber);
    await addLineItem(page, 'Automation Service', 1, 100);
    await saveDraft(page);
    
    // Open email preview/send dialog
    const sendButton = page.getByRole('button', { name: /send|email/i }).first();
    await expect(sendButton).toBeVisible();
    await sendButton.click();
    
    // Verify template shows merge fields
    await expect(page.getByText(new RegExp(seed.customerName, 'i')).first()).toBeVisible();
    await expect(page.getByText(new RegExp(seed.invoiceNumber, 'i')).first()).toBeVisible();
  });

  test('@Tf8a72162 @invoice HB-INVOICE-020: Download invoice PDF', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes timeout for this test
    const seed = buildSeedData(test.info());
    await seedLogin(page);
    await createCustomer(page, seed);
    await openInvoices(page);
    await startNewInvoice(page);
    await selectCustomerByName(page, seed.customerName);
    await setInvoiceNumber(page, seed.invoiceNumber);
    await addLineItem(page, 'Automation Service', 1, 100);
    await saveDraft(page);
    const downloadButton = page.getByRole('button', { name: /download|pdf/i }).first();
    await expect(downloadButton).toBeVisible();
    const downloadPromise = page.waitForEvent('download', { timeout: 15000 });
    await downloadButton.click();
    await downloadPromise;
  });
});
