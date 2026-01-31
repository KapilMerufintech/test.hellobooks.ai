import { test, expect } from '@playwright/test';

test.describe('Accounting Masters @Sxrmm4t2c', () => {
  
  test('Update Vendor Details via UI @T23vnln3n', async ({ page }) => {
    // 1. Navigate to the application login page
    await page.goto('https://app.merufintech.net/login');
    
    // Expected Result: Login page loads successfully
    await expect(page.getByPlaceholder(/email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/password/i)).toBeVisible();

    // 2. Enter email
    const emailInput = page.getByPlaceholder(/email/i);
    await emailInput.fill('harshpadaliya@merufintech.net');
    await expect(emailInput).toHaveValue('harshpadaliya@merufintech.net');

    // 3. Enter password
    const passwordInput = page.getByPlaceholder(/password/i);
    await passwordInput.fill('Harsh@12345');
    // Expected Result: Password field masks characters (type="password")
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // 4. Click the Login button
    await page.getByRole('button', { name: /login/i }).click();

    // Expected Result: User is authenticated and redirected to dashboard
    // We wait for a dashboard-specific element or URL change
    await expect(page).not.toHaveURL(/.*login.*/);
    
    // 5. Navigate to Accounting Masters > Contacts from the sidebar
    // Note: Adjusting selectors based on common sidebar patterns
    await page.getByText('Accounting Masters').click();
    await page.getByRole('link', { name: 'Contacts' }).click();

    // Expected Result: Contacts list page loads
    await expect(page).toHaveURL(/.*contacts.*/);

    // 6. Filter or search for an existing vendor from the contacts list
    // Assuming a search input exists
    const searchInput = page.getByPlaceholder(/search/i).first();
    await searchInput.fill('Vendor'); 
    await page.keyboard.press('Enter');

    // 7. Click on the vendor row to open vendor details
    // Selecting the first available row in the table
    const firstVendorRow = page.locator('table tbody tr').first();
    await expect(firstVendorRow).toBeVisible();
    await firstVendorRow.click();

    // Expected Result: Vendor details page opens
    await expect(page.getByRole('heading', { name: /vendor details/i }).or(page.getByText(/vendor info/i))).toBeVisible();

    // 8. Click the Edit button to enter edit mode
    await page.getByRole('button', { name: /edit/i }).click();

    // Expected Result: Edit form is displayed
    const nameInput = page.getByLabel(/name/i).or(page.getByPlaceholder(/enter name/i));
    await expect(nameInput).toBeVisible();

    // 9. Update vendor fields (e.g., name, phone)
    const updatedName = `Updated Vendor ${Date.now()}`;
    await nameInput.clear();
    await nameInput.fill(updatedName);

    const phoneInput = page.getByLabel(/phone/i).or(page.getByPlaceholder(/phone/i));
    if (await phoneInput.isVisible()) {
        await phoneInput.clear();
        await phoneInput.fill('1234567890');
    }

    // 10. Click Save to submit the updated vendor information
    await page.getByRole('button', { name: /save|update/i }).click();

    // Expected Result: Success message is displayed and details are updated
    // Checking for a toast notification or success alert
    const successMessage = page.getByText(/successfully|updated|saved/i);
    await expect(successMessage).toBeVisible();

    // Verify the UI reflects the change
    await expect(page.getByText(updatedName)).toBeVisible();
  });

});