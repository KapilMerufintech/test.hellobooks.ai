/**
 * EXAMPLE: How to use seed.config.ts in ANY test file
 * Copy this pattern to all your test files
 */

import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

// ✅ IMPORT ONCE - Works everywhere (local, Jenkins, Testomat.io)
import { seedLogin, seedCredentials, buildSeedData, navigateToInvoices } from './seed.config';

test.describe('Example Test Suite @example', () => {
  
  test('Example Test 1: Using seedLogin @T123', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes
    
    // Step 1: Login (one line!)
    await seedLogin(page);
    
    // Step 2: Navigate
    await navigateToInvoices(page);
    
    // Step 3: Your test logic
    await expect(page.getByRole('heading', { name: /invoices/i })).toBeVisible();
  });

  test('Example Test 2: Generate unique test data @T124', async ({ page }) => {
    test.setTimeout(180000);
    
    // Generate unique data for this test
    const seed = buildSeedData(test.info().testId);
    console.log('Test data:', seed);
    
    await seedLogin(page);
    
    // Use seed data in your test
    console.log(`Creating invoice: ${seed.invoiceNumber}`);
    console.log(`For customer: ${seed.customerName}`);
  });

  test('Example Test 3: Access credentials directly @T125', async ({ page }) => {
    test.setTimeout(180000);
    
    // Direct access to credentials if needed
    console.log('Using email:', seedCredentials.email);
    
    await seedLogin(page);
    
    // Your test logic
  });
});
