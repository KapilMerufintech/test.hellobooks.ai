# Manual Test Cases - Sign-up Account Setup (https://test.hellobooks.ai/signup)

Format follows `specs/login-manual-test-cases.md`.

---

- ID: HB-SU-SETUP-001
- Title: Account setup page loads successfully
- Module: Sign-up / Account Setup
- Preconditions: User is on sign-up flow
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/signup
  2) Navigate to Account Setup step
- Expected Result:
  - Account Setup page renders without errors
  - Required fields are visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional / UI
- Automation Notes: Verify page title/heading and main form presence

---

- ID: HB-SU-SETUP-002
- Title: Account setup step shows progress indicator (if multi-step)
- Module: Sign-up / Account Setup
- Preconditions: Multi-step sign-up enabled
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/signup
  2) Navigate to Account Setup step
- Expected Result:
  - Progress indicator highlights Account Setup step
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI / UX
- Automation Notes: Skip if no stepper UI

---

- ID: HB-SU-SETUP-003
- Title: Required field validation shows when all fields empty
- Module: Sign-up / Account Setup
- Preconditions: Account Setup form is visible
- Test Data: None
- Steps to Reproduce:
  1) Open Account Setup page
  2) Click Continue/Next/Submit without filling fields
- Expected Result:
  - Required validation shown for mandatory fields
  - Form does not advance
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Negative / UI
- Automation Notes: Check inline validation near each required input

---

- ID: HB-SU-SETUP-004
- Title: Business/Company name accepts valid input
- Module: Sign-up / Account Setup
- Preconditions: Business/Company name field exists
- Test Data: name="HelloBooks Pvt Ltd"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Enter a valid business name
- Expected Result:
  - Value is accepted without validation error
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Verify no error message

---

- ID: HB-SU-SETUP-005
- Title: Business/Company name trims leading/trailing spaces
- Module: Sign-up / Account Setup
- Preconditions: Business/Company name field exists
- Test Data: name="  HelloBooks Pvt Ltd  "
- Steps to Reproduce:
  1) Open Account Setup page
  2) Enter name with leading/trailing spaces
  3) Move focus away
- Expected Result:
  - Name is trimmed or validated consistently
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional / UI
- Automation Notes: Check field value after blur

---

- ID: HB-SU-SETUP-006
- Title: Business/Company name max length enforced
- Module: Sign-up / Account Setup
- Preconditions: Business/Company name field exists
- Test Data: name=256+ chars
- Steps to Reproduce:
  1) Open Account Setup page
  2) Enter a very long business name
- Expected Result:
  - Input is capped or validation error appears
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative / UI
- Automation Notes: Confirm max length behavior

---

- ID: HB-SU-SETUP-007
- Title: Business/Company name rejects invalid characters (if restricted)
- Module: Sign-up / Account Setup
- Preconditions: Business/Company name field exists
- Test Data: name="@@@###"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Enter invalid characters
  3) Move focus away
- Expected Result:
  - Validation message shown or input prevented
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Negative / UI
- Automation Notes: If no restriction, record accepted behavior

---

- ID: HB-SU-SETUP-008
- Title: Industry selection accepts valid option (if present)
- Module: Sign-up / Account Setup
- Preconditions: Industry dropdown exists
- Test Data: industry="Software"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Select an industry from dropdown
- Expected Result:
  - Selected industry is displayed
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional / UI
- Automation Notes: Validate value persists on next/previous

---

- ID: HB-SU-SETUP-009
- Title: Industry dropdown search works (if searchable)
- Module: Sign-up / Account Setup
- Preconditions: Industry dropdown is searchable
- Test Data: query="Soft"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Open industry dropdown
  3) Search with partial text
- Expected Result:
  - Matching options appear
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI / UX
- Automation Notes: Skip if dropdown not searchable

---

- ID: HB-SU-SETUP-010
- Title: Business type selection (if present) accepts valid option
- Module: Sign-up / Account Setup
- Preconditions: Business type field exists
- Test Data: type="LLC"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Select a business type option
- Expected Result:
  - Selected type is saved
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify no validation errors

---

- ID: HB-SU-SETUP-011
- Title: Country selection defaults correctly
- Module: Sign-up / Account Setup
- Preconditions: Country field exists
- Test Data: None
- Steps to Reproduce:
  1) Open Account Setup page
  2) Observe default country selection
- Expected Result:
  - Default country matches expected locale
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI / UX
- Automation Notes: Check geo/IP default if applicable

---

- ID: HB-SU-SETUP-012
- Title: Country selection changes available regions (if present)
- Module: Sign-up / Account Setup
- Preconditions: Country and State/Region fields exist
- Test Data: country="India"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Change country
  3) Open state/region dropdown
- Expected Result:
  - Region list updates according to country
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional / UI
- Automation Notes: Validate dependent dropdown behavior

---

- ID: HB-SU-SETUP-013
- Title: State/Region required validation (if required)
- Module: Sign-up / Account Setup
- Preconditions: State/Region is required
- Test Data: None
- Steps to Reproduce:
  1) Open Account Setup page
  2) Leave state/region blank
  3) Attempt to continue
- Expected Result:
  - Validation error appears for state/region
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative / UI
- Automation Notes: Skip if field not present

---

- ID: HB-SU-SETUP-014
- Title: City input accepts valid value (if present)
- Module: Sign-up / Account Setup
- Preconditions: City field exists
- Test Data: city="Mumbai"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Enter city
- Expected Result:
  - City is accepted without error
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Validate field is not blocked

---

- ID: HB-SU-SETUP-015
- Title: Address line accepts valid input (if present)
- Module: Sign-up / Account Setup
- Preconditions: Address field exists
- Test Data: address="123 Main Street"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Enter address
- Expected Result:
  - Address is accepted without error
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Validate no client-side error

---

- ID: HB-SU-SETUP-016
- Title: Postal/ZIP code validation accepts correct format (if present)
- Module: Sign-up / Account Setup
- Preconditions: Postal/ZIP code field exists
- Test Data: zip="400001"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Enter a valid postal code
- Expected Result:
  - Postal code is accepted
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Validate per country format

---

- ID: HB-SU-SETUP-017
- Title: Postal/ZIP code rejects invalid format (if present)
- Module: Sign-up / Account Setup
- Preconditions: Postal/ZIP code field exists
- Test Data: zip="ABCDE"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Enter an invalid postal code
- Expected Result:
  - Validation error displayed
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative / UI
- Automation Notes: Confirm error messaging

---

- ID: HB-SU-SETUP-018
- Title: Currency selection defaults correctly (if present)
- Module: Sign-up / Account Setup
- Preconditions: Currency field exists
- Test Data: None
- Steps to Reproduce:
  1) Open Account Setup page
  2) Observe default currency
- Expected Result:
  - Default currency matches locale or company settings
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional / UI
- Automation Notes: Verify default selection

---

- ID: HB-SU-SETUP-019
- Title: Currency selection changes accepted formats (if present)
- Module: Sign-up / Account Setup
- Preconditions: Currency dropdown exists
- Test Data: currency="USD"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Change currency selection
- Expected Result:
  - Currency selection is saved
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify persists after navigation

---

- ID: HB-SU-SETUP-020
- Title: Timezone selection defaults correctly (if present)
- Module: Sign-up / Account Setup
- Preconditions: Timezone field exists
- Test Data: None
- Steps to Reproduce:
  1) Open Account Setup page
  2) Observe default timezone
- Expected Result:
  - Default timezone is correct for locale
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI / UX
- Automation Notes: Validate timezone text

---

- ID: HB-SU-SETUP-021
- Title: Timezone selection accepts valid option (if present)
- Module: Sign-up / Account Setup
- Preconditions: Timezone field exists
- Test Data: timezone="Asia/Kolkata"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Select a timezone
- Expected Result:
  - Selection is saved
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify selection persists

---

- ID: HB-SU-SETUP-022
- Title: Fiscal year start date accepts valid value (if present)
- Module: Sign-up / Account Setup
- Preconditions: Fiscal year start field exists
- Test Data: date="01-04"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Select fiscal year start
- Expected Result:
  - Selected fiscal year start is accepted
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Confirm date picker behavior

---

- ID: HB-SU-SETUP-023
- Title: Fiscal year start date validation blocks invalid value (if present)
- Module: Sign-up / Account Setup
- Preconditions: Fiscal year start field exists
- Test Data: date="31-02"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Enter an invalid date if allowed
- Expected Result:
  - Validation error shown or input rejected
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative / UI
- Automation Notes: If date picker only, verify no invalid selection

---

- ID: HB-SU-SETUP-024
- Title: Accounting method defaults correctly (if present)
- Module: Sign-up / Account Setup
- Preconditions: Accounting method field exists
- Test Data: None
- Steps to Reproduce:
  1) Open Account Setup page
  2) Observe accounting method default
- Expected Result:
  - Default method matches product expectations
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI / UX
- Automation Notes: Verify default selection text

---

- ID: HB-SU-SETUP-025
- Title: Accounting method selection saved (if present)
- Module: Sign-up / Account Setup
- Preconditions: Accounting method field exists
- Test Data: method="Accrual" or "Cash"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Select accounting method
- Expected Result:
  - Selection is saved and used for setup
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify persisted after navigation

---

- ID: HB-SU-SETUP-026
- Title: Tax registration toggle works (if present)
- Module: Sign-up / Account Setup
- Preconditions: Tax registration toggle exists
- Test Data: None
- Steps to Reproduce:
  1) Open Account Setup page
  2) Toggle tax registration on/off
- Expected Result:
  - Tax fields appear when enabled and hide when disabled
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional / UI
- Automation Notes: Validate dependent field visibility

---

- ID: HB-SU-SETUP-027
- Title: Tax ID/GST number validation accepts valid input (if present)
- Module: Sign-up / Account Setup
- Preconditions: Tax ID field exists
- Test Data: taxId="27AAEPM0111C1Z9"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Enter valid tax ID
- Expected Result:
  - Tax ID accepted
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Validate format per locale

---

- ID: HB-SU-SETUP-028
- Title: Tax ID/GST number rejects invalid input (if present)
- Module: Sign-up / Account Setup
- Preconditions: Tax ID field exists
- Test Data: taxId="INVALID123"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Enter invalid tax ID
- Expected Result:
  - Validation error displayed
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative / UI
- Automation Notes: Check inline error

---

- ID: HB-SU-SETUP-029
- Title: Phone number accepts valid value (if present)
- Module: Sign-up / Account Setup
- Preconditions: Phone field exists
- Test Data: phone="+91 9876543210"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Enter phone number with country code
- Expected Result:
  - Phone number is accepted
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Validate formatting is preserved or normalized

---

- ID: HB-SU-SETUP-030
- Title: Phone number rejects letters (if present)
- Module: Sign-up / Account Setup
- Preconditions: Phone field exists
- Test Data: phone="PHONE123"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Enter letters in phone number field
- Expected Result:
  - Validation error displayed or input blocked
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Negative / UI
- Automation Notes: Confirm numeric-only handling

---

- ID: HB-SU-SETUP-031
- Title: Website URL accepts valid format (if present)
- Module: Sign-up / Account Setup
- Preconditions: Website field exists
- Test Data: url="https://example.com"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Enter a valid website URL
- Expected Result:
  - URL is accepted
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify no validation error

---

- ID: HB-SU-SETUP-032
- Title: Website URL rejects invalid format (if present)
- Module: Sign-up / Account Setup
- Preconditions: Website field exists
- Test Data: url="htp://bad"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Enter invalid website URL
- Expected Result:
  - Validation error displayed
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Negative / UI
- Automation Notes: Check error message

---

- ID: HB-SU-SETUP-033
- Title: Logo upload accepts supported file type (if present)
- Module: Sign-up / Account Setup
- Preconditions: Logo upload control exists
- Test Data: file="logo.png"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Upload a PNG/JPG logo
- Expected Result:
  - Logo is uploaded and previewed
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional / UI
- Automation Notes: Verify preview thumbnail appears

---

- ID: HB-SU-SETUP-034
- Title: Logo upload rejects unsupported file type (if present)
- Module: Sign-up / Account Setup
- Preconditions: Logo upload control exists
- Test Data: file="logo.exe"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Upload unsupported file type
- Expected Result:
  - Validation error displayed
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Negative / Security
- Automation Notes: Confirm rejection message

---

- ID: HB-SU-SETUP-035
- Title: Logo upload rejects large file size (if present)
- Module: Sign-up / Account Setup
- Preconditions: Logo upload control exists
- Test Data: file="large-image.png" (> max size)
- Steps to Reproduce:
  1) Open Account Setup page
  2) Upload a file exceeding size limit
- Expected Result:
  - File rejected with size error
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Negative / UI
- Automation Notes: Validate max size message

---

- ID: HB-SU-SETUP-036
- Title: Continue button enabled only when required fields complete
- Module: Sign-up / Account Setup
- Preconditions: Required fields present
- Test Data: None
- Steps to Reproduce:
  1) Open Account Setup page
  2) Fill required fields
  3) Observe Continue/Next button state
- Expected Result:
  - Button is disabled until required fields are valid
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional / UI
- Automation Notes: Verify enable/disable state

---

- ID: HB-SU-SETUP-037
- Title: Form submission succeeds with valid required fields
- Module: Sign-up / Account Setup
- Preconditions: Required fields known
- Test Data: Valid values for all required fields
- Steps to Reproduce:
  1) Open Account Setup page
  2) Complete all required fields
  3) Click Continue/Next
- Expected Result:
  - Form submits and advances to next step
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Verify navigation to next step

---

- ID: HB-SU-SETUP-038
- Title: Back button returns to previous step (if present)
- Module: Sign-up / Account Setup
- Preconditions: Multi-step sign-up enabled
- Test Data: None
- Steps to Reproduce:
  1) Open Account Setup page
  2) Click Back
- Expected Result:
  - User is returned to previous step
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional / UX
- Automation Notes: Skip if no Back button

---

- ID: HB-SU-SETUP-039
- Title: Form retains values when navigating back and forth
- Module: Sign-up / Account Setup
- Preconditions: Multi-step sign-up enabled
- Test Data: Sample values in fields
- Steps to Reproduce:
  1) Open Account Setup page
  2) Fill some fields
  3) Navigate back and then return to Account Setup
- Expected Result:
  - Previously entered values are preserved
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional / UX
- Automation Notes: Verify persistence

---

- ID: HB-SU-SETUP-040
- Title: Cancel exits sign-up flow (if present)
- Module: Sign-up / Account Setup
- Preconditions: Cancel link/button exists
- Test Data: None
- Steps to Reproduce:
  1) Open Account Setup page
  2) Click Cancel
- Expected Result:
  - User returns to login or home page
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional / UX
- Automation Notes: Skip if no Cancel control

---

- ID: HB-SU-SETUP-041
- Title: Inline error messages appear near fields
- Module: Sign-up / Account Setup
- Preconditions: Validation errors triggered
- Test Data: Invalid or empty inputs
- Steps to Reproduce:
  1) Open Account Setup page
  2) Trigger validation errors
- Expected Result:
  - Errors are shown near the related fields
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: UI / UX
- Automation Notes: Confirm error placement

---

- ID: HB-SU-SETUP-042
- Title: Error messages clear after correcting input
- Module: Sign-up / Account Setup
- Preconditions: Validation errors triggered
- Test Data: Invalid then valid input
- Steps to Reproduce:
  1) Open Account Setup page
  2) Trigger validation error
  3) Correct the input
- Expected Result:
  - Error message disappears
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional / UX
- Automation Notes: Validate error clearing

---

- ID: HB-SU-SETUP-043
- Title: Keyboard-only navigation works
- Module: Sign-up / Account Setup
- Preconditions: Account Setup page is visible
- Test Data: None
- Steps to Reproduce:
  1) Open Account Setup page
  2) Use Tab/Shift+Tab to navigate fields
- Expected Result:
  - Focus order is logical and visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Accessibility / UX
- Automation Notes: Check focus outline

---

- ID: HB-SU-SETUP-044
- Title: Screen reader labels exist for all inputs
- Module: Sign-up / Account Setup
- Preconditions: Account Setup page is visible
- Test Data: None
- Steps to Reproduce:
  1) Open Account Setup page
  2) Inspect labels/aria-labels for inputs
- Expected Result:
  - Each input has accessible label
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Accessibility
- Automation Notes: Use accessibility snapshot

---

- ID: HB-SU-SETUP-045
- Title: Form is usable at 200% browser zoom
- Module: Sign-up / Account Setup
- Preconditions: Account Setup page is visible
- Test Data: None
- Steps to Reproduce:
  1) Open Account Setup page
  2) Zoom browser to 200%
- Expected Result:
  - Inputs and buttons remain visible and usable
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI / Accessibility
- Automation Notes: Verify no overlap/cutoff

---

- ID: HB-SU-SETUP-046
- Title: Mobile viewport layout renders correctly
- Module: Sign-up / Account Setup
- Preconditions: Account Setup page is visible
- Test Data: None
- Steps to Reproduce:
  1) Set viewport to mobile size
  2) Open Account Setup page
- Expected Result:
  - No clipped inputs or overlapping text
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI / Responsive
- Automation Notes: Use 375x812 viewport

---

- ID: HB-SU-SETUP-047
- Title: Tablet viewport layout renders correctly
- Module: Sign-up / Account Setup
- Preconditions: Account Setup page is visible
- Test Data: None
- Steps to Reproduce:
  1) Set viewport to tablet size
  2) Open Account Setup page
- Expected Result:
  - Layout is readable and usable
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI / Responsive
- Automation Notes: Use 768x1024 viewport

---

- ID: HB-SU-SETUP-048
- Title: Cross-browser layout parity
- Module: Sign-up / Account Setup
- Preconditions: Account Setup page is visible
- Test Data: None
- Steps to Reproduce:
  1) Open Account Setup page in Chromium, Firefox, WebKit
- Expected Result:
  - Layout and validation behave consistently
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI / Compatibility
- Automation Notes: Run in 3 browsers

---

- ID: HB-SU-SETUP-049
- Title: Form handles slow network gracefully
- Module: Sign-up / Account Setup
- Preconditions: Network throttling available
- Test Data: Valid inputs
- Steps to Reproduce:
  1) Open Account Setup page
  2) Throttle network to slow
  3) Submit form
- Expected Result:
  - Loading state shown and no UI freeze
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Resiliency / UX
- Automation Notes: Use throttling or route delay

---

- ID: HB-SU-SETUP-050
- Title: API error shows friendly message
- Module: Sign-up / Account Setup
- Preconditions: API failure simulated
- Test Data: Valid inputs
- Steps to Reproduce:
  1) Open Account Setup page
  2) Submit form while API returns 500
- Expected Result:
  - Friendly error toast/message displayed
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative / Resiliency
- Automation Notes: Intercept API and return 500

---

- ID: HB-SU-SETUP-051
- Title: Duplicate business name handled gracefully (if validated)
- Module: Sign-up / Account Setup
- Preconditions: Business name uniqueness enforced
- Test Data: name="Existing Company"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Enter an existing business name
  3) Submit form
- Expected Result:
  - Clear error displayed, no form advance
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative / Functional
- Automation Notes: Skip if no uniqueness check

---

- ID: HB-SU-SETUP-052
- Title: Duplicate tax ID handled gracefully (if validated)
- Module: Sign-up / Account Setup
- Preconditions: Tax ID uniqueness enforced
- Test Data: taxId="ExistingTaxId"
- Steps to Reproduce:
  1) Open Account Setup page
  2) Enter an existing tax ID
  3) Submit form
- Expected Result:
  - Error displayed for duplicate tax ID
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative / Functional
- Automation Notes: Skip if no uniqueness check

---

- ID: HB-SU-SETUP-053
- Title: Form retains values after API error
- Module: Sign-up / Account Setup
- Preconditions: API failure simulated
- Test Data: Valid inputs
- Steps to Reproduce:
  1) Open Account Setup page
  2) Fill form
  3) Submit and trigger API error
- Expected Result:
  - User inputs remain populated for retry
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Resiliency / UX
- Automation Notes: Verify fields stay filled

---

- ID: HB-SU-SETUP-054
- Title: Prevent double-submit on submit button
- Module: Sign-up / Account Setup
- Preconditions: Form is valid
- Test Data: Valid inputs
- Steps to Reproduce:
  1) Open Account Setup page
  2) Fill all required fields
  3) Click Continue multiple times quickly
- Expected Result:
  - Only one submission is processed
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional / UX
- Automation Notes: Check button disabled/loading state

---

- ID: HB-SU-SETUP-055
- Title: Enter key submits form when focused (if supported)
- Module: Sign-up / Account Setup
- Preconditions: Form fields present
- Test Data: Valid inputs
- Steps to Reproduce:
  1) Open Account Setup page
  2) Fill required fields
  3) Press Enter
- Expected Result:
  - Form submits or navigates to next step
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional / UX
- Automation Notes: If not supported, document behavior

---

- ID: HB-SU-SETUP-056
- Title: Tooltips/help icons display guidance (if present)
- Module: Sign-up / Account Setup
- Preconditions: Help icons present
- Test Data: None
- Steps to Reproduce:
  1) Open Account Setup page
  2) Hover/click help icon
- Expected Result:
  - Tooltip/help text is shown
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI / UX
- Automation Notes: Skip if no help icon

---

- ID: HB-SU-SETUP-057
- Title: Required fields are clearly marked
- Module: Sign-up / Account Setup
- Preconditions: Account Setup page is visible
- Test Data: None
- Steps to Reproduce:
  1) Open Account Setup page
  2) Review form labels
- Expected Result:
  - Required fields are marked with * or text
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI / UX
- Automation Notes: Document marking style

---

- ID: HB-SU-SETUP-058
- Title: Input placeholders do not overlap labels
- Module: Sign-up / Account Setup
- Preconditions: Account Setup page is visible
- Test Data: None
- Steps to Reproduce:
  1) Open Account Setup page
  2) Inspect inputs with labels/placeholders
- Expected Result:
  - No overlap or clipping of text
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Visual check

---

- ID: HB-SU-SETUP-059
- Title: Privacy policy/terms links open correctly (if present)
- Module: Sign-up / Account Setup
- Preconditions: Links present
- Test Data: None
- Steps to Reproduce:
  1) Open Account Setup page
  2) Click Privacy Policy/Terms links
- Expected Result:
  - Links open correct pages
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional / UI
- Automation Notes: Check new tab or same tab behavior

---

- ID: HB-SU-SETUP-060
- Title: Data is saved after refresh (if autosave expected)
- Module: Sign-up / Account Setup
- Preconditions: Autosave is enabled
- Test Data: Partial form inputs
- Steps to Reproduce:
  1) Open Account Setup page
  2) Fill some fields
  3) Refresh page
- Expected Result:
  - Previously entered data is restored
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UX
- Automation Notes: Skip if autosave not expected

