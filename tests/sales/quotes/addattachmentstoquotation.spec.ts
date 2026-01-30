import { test, expect } from '@playwright/test';
import path from 'path';

/**
 * Test Scenario: Add attachments to quotation
 * Test ID: TEST-1769770078248
 * Description: Verify user can attach files to a quotation
 */

test.describe('Quotation Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: In a real scenario, this would use a global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Username').fill('test_user');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: /log in/i }).click();
  });

  test('Add attachments to quotation TEST-1769770078248', async ({ page }) => {
    // Step 1: Open quote form
    await page.goto('/quotes/new');
    await expect(page.getByRole('heading', { name: /create new quotation/i })).toBeVisible();

    // Step 2: Click on attachments section
    const attachmentSection = page.getByText(/attachments/i);
    await attachmentSection.scrollIntoViewIfNeeded();
    await expect(attachmentSection).toBeVisible();

    // Define file paths (assuming these exist in a 'test-assets' folder)
    const pdfPath = path.join(__dirname, 'test-assets/sample.pdf');
    const imagePath = path.join(__dirname, 'test-assets/sample.png');

    // Step 3 & 4: Upload a PDF file and an image file
    // Using the file input selector (usually hidden, so we target the input[type="file"])
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: /upload files/i }).click();
    const fileChooser = await fileChooserPromise;
    
    await fileChooser.setFiles([pdfPath, imagePath]);

    // Verify files are listed in the UI before saving
    await expect(page.getByText('sample.pdf')).toBeVisible();
    await expect(page.getByText('sample.png')).toBeVisible();

    // Step 5: Save the quote
    // Fill required fields first to ensure save is enabled
    await page.getByLabel(/customer/i).fill('Acme Corp');
    await page.getByRole('button', { name: /save quote/i }).click();

    // Step 6: Verify attachments are saved
    // Wait for navigation or success message
    await expect(page.getByText(/quotation saved successfully/i)).toBeVisible();

    // Verify attachments visible in quote preview/detail view
    await expect(page.locator('section.attachments-list')).toContainText('sample.pdf');
    await expect(page.locator('section.attachments-list')).toContainText('sample.png');
    
    // Final check for the presence of download links or icons
    await expect(page.getByRole('link', { name: 'sample.pdf' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'sample.png' })).toBeVisible();
  });
});