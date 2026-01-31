import { test, expect } from '@playwright/test';

/**
 * @description Verify that a user can successfully create a new bill credit note from the bills list page
 * @priority high
 * @type e2e
 */
test('Create Bill Credit Note from Bills List TEST-1769840388311', async ({ page }) => {
  // 1. Navigate to Bills list page
  await page.goto('/list-bills');
  
  // Expected Result: Bills list page loads successfully
  await expect(page).toHaveURL(/.*list-bills/);
  const billsHeader = page.getByRole('heading', { name: /Bills/i });
  await expect(billsHeader).toBeVisible();

  // 2. Click on the 'New Bill' dropdown button
  // 3. Select 'New Credit Note' option from the dropdown
  const newBillDropdown = page.getByRole('button', { name: /New Bill/i });
  await newBillDropdown.click();
  
  const creditNoteOption = page.getByRole('menuitem', { name: /New Credit Note/i });
  await expect(creditNoteOption).toBeVisible();
  await creditNoteOption.click();

  // Expected Result: User is redirected to credit note creation page
  await expect(page).toHaveURL(/\/purchase\/creditnotes\/create/);

  // 4. Select a vendor from the vendor dropdown
  // Using a generic selector for a searchable dropdown/combobox
  const vendorDropdown = page.getByLabel(/Vendor/i).first();
  await vendorDropdown.click();
  await page.keyboard.type('Global Supplies');
  await page.getByRole('option').first().click();

  // Expected Result: Vendor is selected
  await expect(vendorDropdown).not.toBeEmpty();

  // 5. Enter credit note number and date
  const creditNoteNo = `CN-${Date.now()}`;
  await page.getByLabel(/Credit Note #/i).fill(creditNoteNo);
  
  // Assuming date picker or text input for date
  const dateInput = page.getByLabel(/Credit Note Date/i);
  await dateInput.fill(new Date().toISOString().split('T')[0]);

  // 6. Add line item with description, quantity, rate, and tax
  // Using table-based selectors or ARIA roles for line items
  const lineItemRow = page.locator('tr.line-item').first();
  
  await lineItemRow.locator('input[name*="description"]').fill('Defective Goods Return');
  await lineItemRow.locator('input[name*="quantity"]').fill('2');
  await lineItemRow.locator('input[name*="rate"]').fill('50.00');
  
  // Select tax if applicable
  const taxDropdown = lineItemRow.locator('select[name*="tax"], .tax-select');
  if (await taxDropdown.isVisible()) {
    await taxDropdown.selectOption({ label: 'Standard Rate (10%)' });
  }

  // Expected Result: Line item is added with calculated totals
  // (2 * 50) + 10% tax = 110.00
  const totalAmount = page.locator('.total-amount, [data-testid="total-amount"]');
  await expect(totalAmount).toContainText('110.00');

  // 7. Click 'Save' button
  const saveButton = page.getByRole('button', { name: /Save/i, exact: true });
  await saveButton.click();

  // Expected Result: Credit note is created successfully and user is redirected
  // We expect a success toast or redirection to the credit notes list/details
  await expect(page).toHaveURL(/\/purchase\/creditnotes/);
  const successMessage = page.getByText(/Credit Note created successfully/i);
  await expect(successMessage).toBeVisible();
  
  // Verify the new credit note exists in the list
  await expect(page.getByText(creditNoteNo)).toBeVisible();
});