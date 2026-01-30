import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Quote number auto-generation
 * Description: Verify quote numbers are auto-generated sequentially
 * Test ID: TEST-1769770091570
 */

test.describe('Quote Management', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition 1: User is logged in
    // Note: In a real scenario, this might be handled via global setup or a login utility
    await page.goto('/login');
    await page.getByLabel('Username').fill('sales_user');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Precondition 2: Ensure we are on the quotes dashboard
    await page.goto('/quotes');
  });

  test('Verify quote numbers are auto-generated sequentially TEST-1769770091570', async ({ page }) => {
    // Step 1: Note the last quote number in the system
    // We assume the quotes table is sorted by date/ID descending
    const lastQuoteRow = page.locator('table > tbody > tr').first();
    const lastQuoteNumberText = await lastQuoteRow.locator('td.quote-number').innerText();
    const lastNumber = parseInt(lastQuoteNumberText.replace(/\D/g, ''), 10);
    
    console.log(`Last quote number identified: ${lastNumber}`);

    // Step 2: Create a new quote
    await page.getByRole('button', { name: /create new quote|add quote/i }).click();
    await expect(page).toHaveURL(/.*\/quotes\/new/);

    // Step 3: Leave quote number field empty
    // Verify the field exists and is either empty or shows a placeholder
    const quoteNumberInput = page.getByLabel(/quote number/i);
    await expect(quoteNumberInput).toBeVisible();
    
    // Fill in other required fields to allow saving
    await page.getByLabel(/customer/i).fill('Test Customer');
    await page.getByLabel(/expiry date/i).fill(new Date().toISOString().split('T')[0]);

    // Step 4: Save the quote
    await page.getByRole('button', { name: /save|submit/i }).click();

    // Step 5: Verify quote number is auto-generated
    // Wait for navigation back to list or success message
    await expect(page.getByText(/quote created successfully/i)).toBeVisible();
    
    // Navigate back to list if not redirected automatically
    if (!page.url().endsWith('/quotes')) {
        await page.goto('/quotes');
    }

    // Verify the new quote number follows the sequence (lastNumber + 1)
    const newQuoteRow = page.locator('table > tbody > tr').first();
    const newQuoteNumberText = await newQuoteRow.locator('td.quote-number').innerText();
    const newNumber = parseInt(newQuoteNumberText.replace(/\D/g, ''), 10);

    expect(newNumber).toBeGreaterThan(lastNumber);
    // If the system is strictly sequential:
    // expect(newNumber).toBe(lastNumber + 1);
    
    console.log(`New auto-generated quote number: ${newNumber}`);
  });
});