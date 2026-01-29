import { test, expect } from '@playwright/test';

/**
 * @name Apply credit note to bill
 * @description Verify eligible credit notes can be applied to reduce bill amount
 * @priority medium
 * @type e2e
 * @tags bills, credit-note, apply, adjustment
 */

test.describe('Bill Adjustments', () => {
  
  // Preconditions: User is logged in (handled via global setup or auth file)
  // Assuming storageState is configured in playwright.config.ts
  
  const TEST_DATA = {
    billId: 'BILL-123',
    vendorName: 'Acme Corp',
    creditNoteNumber: 'CN-001',
    billAmount: 1000.00,
    creditAmount: 200.00,
    expectedTotal: 800.00
  };

  test('Apply credit note to bill', async ({ page }) => {
    // 1. Open bill in edit mode
    // Using semantic navigation to find the specific bill
    await page.goto(`/bills/${TEST_DATA.billId}/edit`);
    
    // Verify we are on the correct page
    await expect(page.getByRole('heading', { name: /edit bill/i })).toBeVisible();
    await expect(page.getByText(TEST_DATA.billId)).toBeVisible();

    // 2. Click Apply Credit Notes option
    // Expected Result 1: Eligible credit notes fetched via API
    // We monitor the API response to ensure credit notes are fetched
    const creditNoteRequest = page.waitForResponse(response => 
      response.url().includes('/api/credit-notes') && response.status() === 200
    );

    await page.getByRole('button', { name: /apply credit notes/i }).click();
    
    const response = await creditNoteRequest;
    const creditNotes = await response.json();
    expect(creditNotes.length).toBeGreaterThan(0);

    // 3. Select eligible credit note from list
    // Expected Result 2: Credit note selection updates bill preview
    const creditNoteRow = page.getByRole('row').filter({ hasText: TEST_DATA.creditNoteNumber });
    await creditNoteRow.getByRole('checkbox').check();
    
    // Enter the amount to apply if required
    const amountInput = creditNoteRow.getByRole('textbox', { name: /amount to apply/i });
    if (await amountInput.isVisible()) {
      await amountInput.fill(TEST_DATA.creditAmount.toString());
    }

    await page.getByRole('button', { name: /confirm/i }).click();

    // Expected Result 3: Applied amount reduces bill total
    const totalDisplay = page.getByTestId('bill-total-amount');
    await expect(totalDisplay).toHaveText(new RegExp(TEST_DATA.expectedTotal.toString()));

    // 4. Save bill with applied credit
    // Expected Result 4: Bill saved with credit note reference
    const saveRequest = page.waitForResponse(response => 
      response.url().includes(`/api/bills/${TEST_DATA.billId}`) && response.request().method() === 'PUT'
    );

    await page.getByRole('button', { name: /save/i }).click();

    const saveResponse = await saveRequest;
    const savedData = await saveResponse.json();
    
    // Verify the payload or response contains the credit note reference
    expect(saveResponse.status()).toBe(200);
    expect(savedData.applied_credits).toContainEqual(
      expect.objectContaining({
        credit_note_number: TEST_DATA.creditNoteNumber,
        amount: TEST_DATA.creditAmount
      })
    );

    // Final UI Verification
    await expect(page.getByText(/bill updated successfully/i)).toBeVisible();
    await expect(page.getByText(TEST_DATA.creditNoteNumber)).toBeVisible();
  });

  test.afterEach(async ({ page }) => {
    // Teardown: Optional cleanup if the test created specific state
    // In e2e, this might involve deleting the test bill or unlinking the credit note
  });
});