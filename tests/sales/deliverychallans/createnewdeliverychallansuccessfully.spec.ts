import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Create New Delivery Challan Successfully
 * Test ID: TEST-1769841615257
 * Description: Verify that a user can create a new delivery challan with valid customer and item details
 */

test.describe('Sales - Delivery Challans', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is logged in
    // Note: In a real scenario, authentication state is usually handled via global setup
    await page.goto('/login');
    await page.getByLabel('Email').fill('admin@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('Create New Delivery Challan Successfully TEST-1769841615257', async ({ page }) => {
    // 1. Navigate to Sales > Delivery Challans from the sidebar
    await page.getByRole('link', { name: 'Sales' }).click();
    await page.getByRole('link', { name: 'Delivery Challans' }).click();
    
    // Expected Result: Delivery Challans list page is displayed
    await expect(page).toHaveURL(/.*delivery-challans/);
    await expect(page.getByRole('heading', { name: 'Delivery Challans' })).toBeVisible();

    // 2. Click on 'Create Delivery Challan' button
    await page.getByRole('button', { name: 'Create Delivery Challan' }).click();

    // Expected Result: Create Delivery Challan form opens successfully
    await expect(page).toHaveURL(/.*delivery-challans\/new/);
    await expect(page.getByRole('heading', { name: 'New Delivery Challan' })).toBeVisible();

    // 3. Select a customer from the customer dropdown
    // Expected Result: Customer is selected and details are populated
    await page.getByLabel('Customer').click();
    await page.getByRole('option').first().click(); // Selecting the first available customer
    await expect(page.locator('input[name="customer_id"]')).not.toBeEmpty();

    // 4. Enter delivery challan date and expected delivery date
    // Expected Result: Dates are accepted and validated
    const today = new Date().toISOString().split('T')[0];
    await page.getByLabel('Challan Date').fill(today);
    await page.getByLabel('Expected Delivery Date').fill(today);

    // 5. Add line items with item description, quantity, and rate
    // Expected Result: Line items are added with calculated totals
    await page.getByRole('button', { name: 'Add Item' }).click();
    
    const itemRow = page.locator('.item-row').first();
    await itemRow.getByPlaceholder('Select an item').click();
    await page.getByRole('option').first().click();
    
    await itemRow.getByLabel('Quantity').fill('5');
    await itemRow.getByLabel('Rate').fill('100');

    // Assert total calculation (5 * 100 = 500)
    const totalAmount = page.locator('.total-amount');
    await expect(totalAmount).toContainText('500');

    // 6. Enter shipping address and delivery instructions
    // Expected Result: Address and instructions are saved
    await page.getByLabel('Shipping Address').fill('123 Automation Street, Tech City');
    await page.getByLabel('Delivery Instructions').fill('Handle with care. Contact recipient upon arrival.');

    // 7. Click 'Save' button to create the delivery challan
    await page.getByRole('button', { name: 'Save' }).click();

    // Expected Result: Delivery challan is created successfully with unique challan number 
    // and user is redirected to list or preview page
    await expect(page.getByText(/Challan created successfully/i)).toBeVisible();
    
    // Verify redirection to details/preview page or list page
    await expect(page).toHaveURL(/.*delivery-challans\/(view|DC-)/);
    
    // Verify that a Challan Number exists on the page
    const challanNumber = page.locator('.challan-number-display');
    await expect(challanNumber).not.toBeEmpty();
  });
});