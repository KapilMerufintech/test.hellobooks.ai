import { test, expect } from '@playwright/test';

/**
 * @name Submit forgot password with empty email field
 * @description Verifies that the form cannot be submitted with an empty email field
 * @priority medium
 * @type e2e
 * @tags auth, forgot-password, validation, negative-test
 */

test.describe('Forgot Password Validation', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User is on the Forgot Password page
    // Using a generic path; replace with actual URL if known
    await page.goto('/forgot-password');
  });

  test('Submit forgot password with empty email field', async ({ page }) => {
    // Step 1: Leave the email field empty
    const emailInput = page.getByRole('textbox', { name: /email/i });
    await emailInput.clear();

    // Step 2: Click the 'Submit' or 'Reset Password' button
    // We use a regex to match common button labels for this action
    const submitButton = page.getByRole('button', { name: /submit|reset password/i });
    await submitButton.click();

    // Expected Result 1: Form submission is prevented
    // We verify the URL hasn't changed to a success page
    await expect(page).not.toHaveURL(/success|confirmation/);

    // Expected Result 2: Validation error message is displayed indicating email is required
    // Check for common validation message patterns
    const errorMessage = page.getByText(/email is required|field is required|please enter your email/i);
    await expect(errorMessage).toBeVisible();

    // Alternative: Check for HTML5 validation if the app uses native browser validation
    const isNativeInvalid = await emailInput.evaluate((el: HTMLInputElement) => {
      return el.validity.valueMissing || !el.checkValidity();
    });
    
    // If the app uses custom UI errors, the 'errorMessage' assertion above handles it.
    // If it uses native validation, we can assert on the validation state:
    if (await emailInput.getAttribute('required') !== null) {
        expect(isNativeInvalid).toBeTruthy();
    }
  });
});