import { test, expect } from '@playwright/test';
import path from 'path';

/**
 * @name Upload bill with OCR processing
 * @description Verify bill can be created via file upload with OCR extraction
 * @priority medium
 * @type e2e
 * @tags bills, ocr, upload, automation
 */

test.describe('Bills Management - OCR Upload', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: Assuming authentication state is handled via global setup or storageState
    await page.goto('/dashboard');
    
    // Precondition 2: OCR feature enabled
    // This is typically a backend/config state, but we ensure we are on the right page
    await expect(page).toBeVisible;
  });

  test('Upload bill with OCR processing', async ({ page }) => {
    const filePath = path.join(__dirname, '../fixtures/sample-bill.pdf');

    // Step 1: Navigate to Bills list > Click New Bill dropdown > Upload Bills
    await page.getByRole('link', { name: 'Bills', exact: true }).click();
    await page.getByRole('button', { name: /new bill/i }).click();
    await page.getByRole('menuitem', { name: /upload bills/i }).click();

    // Expected Result 1: Upload modal opens successfully
    const uploadModal = page.getByRole('dialog', { name: /upload bills/i });
    await expect(uploadModal).toBeVisible();

    // Step 2: Upload PDF/image file in UploadBillsModal
    // Using setInputFiles on the hidden input or the dropzone
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByText(/click to upload/i).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);

    // Expected Result 2: File uploaded and OCR triggered
    await expect(page.getByText(/uploading/i)).toBeVisible();
    await expect(page.getByText(/processing ocr/i)).toBeVisible();

    // Step 3: Wait for OCR processing to complete
    // We wait for the processing indicator to disappear and the form to populate
    await expect(page.getByText(/processing ocr/i)).getCount() === 0;
    await expect(page.getByRole('status')).toContainText(/ocr complete/i, { timeout: 30000 });

    // Expected Result 3: Extracted fields populate bill form
    // We verify that key fields like Vendor or Amount are no longer empty
    const vendorInput = page.getByLabel(/vendor/i);
    const amountInput = page.getByLabel(/total amount/i);
    
    await expect(vendorInput).not.toHaveValue('');
    await expect(amountInput).not.toHaveValue('');

    // Step 4: Review extracted data and save bill
    await page.getByRole('button', { name: /save bill/i }).click();

    // Expected Result 4: Bill created with attachment stored
    await expect(page.getByText(/bill created successfully/i)).toBeVisible();
    
    // Verify redirection to the bill detail or list and check for attachment icon
    await expect(page.getByRole('heading', { name: /bill details/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /sample-bill\.pdf/i })).toBeVisible();
  });
});