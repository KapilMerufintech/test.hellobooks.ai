# Manual Test Cases - Login (https://test.hellobooks.ai/login)

Format used here is automation-ready for later conversion to Playwright.

---

- ID: HB-LOGIN-001
- Title: Login with valid credentials
- Module: Onboarding / Login
- Preconditions: Active user account exists
- Test Data: email=fikoy39188@emaxasp.com, password=kapil08dangar@
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter valid email
  3) Enter valid password
  4) Click Login
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - User is redirected to the post-login landing page
  - No error message is shown
- Priority: P1
- Type: Functional / UI
- Automation Notes: Verify URL change and a stable dashboard heading

---

- ID: HB-LOGIN-002
- Title: Login with valid email and wrong password
- Module: Onboarding / Login
- Preconditions: Active user account exists
- Test Data: email=fikoy39188@emaxasp.com, password=wrongPassword123
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter valid email
  3) Enter invalid password
  4) Click Login
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Login fails with a generic error message
  - User remains on login page
- Priority: P1
- Type: Negative / Security
- Automation Notes: Ensure error does not reveal whether email exists

---

- ID: HB-LOGIN-003
- Title: Login with non-existent user
- Module: Onboarding / Login
- Preconditions: None
- Test Data: email=unknown.user+nope@example.com, password=AnyPassword123!
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter a non-existent email
  3) Enter any password
  4) Click Login
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Login fails with a generic error message
  - User remains on login page
- Priority: P1
- Type: Negative / Security
- Automation Notes: Confirm no user enumeration in UI

---

- ID: HB-LOGIN-004
- Title: Required validation on empty email and password
- Module: Onboarding / Login
- Preconditions: None
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Leave email and password empty
  3) Click Login
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Required field errors display for both fields
  - Login is not attempted
- Priority: P1
- Type: Negative / UI
- Automation Notes: Check inline errors and aria-live if available

---

- ID: HB-LOGIN-005
- Title: Required validation on empty email only
- Module: Onboarding / Login
- Preconditions: None
- Test Data: password=AnyPassword123!
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Leave email empty
  3) Enter password
  4) Click Login
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Email required error displayed
  - Login is not attempted
- Priority: P2
- Type: Negative / UI
- Automation Notes: Ensure password is not cleared

---

- ID: HB-LOGIN-006
- Title: Required validation on empty password only
- Module: Onboarding / Login
- Preconditions: None
- Test Data: email=fikoy39188@emaxasp.com
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter email
  3) Leave password empty
  4) Click Login
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Password required error displayed
  - Login is not attempted
- Priority: P2
- Type: Negative / UI
- Automation Notes: Check focus moved to password field if expected

---

- ID: HB-LOGIN-007
- Title: Invalid email format validation (missing @)
- Module: Onboarding / Login
- Preconditions: None
- Test Data: email=invalid.email.com, password=AnyPassword123!
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter invalid email format
  3) Enter password
  4) Click Login
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Email format validation message shown
  - Login is not attempted
- Priority: P2
- Type: Negative / UI
- Automation Notes: Verify client-side validation

---

- ID: HB-LOGIN-008
- Title: Invalid email format validation (missing domain)
- Module: Onboarding / Login
- Preconditions: None
- Test Data: email=user@, password=AnyPassword123!
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter invalid email format
  3) Enter password
  4) Click Login
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Email format validation message shown
  - Login is not attempted
- Priority: P2
- Type: Negative / UI
- Automation Notes: Verify browser or custom validation behavior

---

- ID: HB-LOGIN-009
- Title: Email is trimmed of leading/trailing spaces
- Module: Onboarding / Login
- Preconditions: Active user account exists
- Test Data: email="  fikoy39188@emaxasp.com  ", password=kapil08dangar@
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter email with leading/trailing spaces
  3) Enter valid password
  4) Click Login
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Email is trimmed and login succeeds
- Priority: P2
- Type: Functional / UI
- Automation Notes: Verify email field value after blur

---

- ID: HB-LOGIN-010
- Title: Email is case-insensitive
- Module: Onboarding / Login
- Preconditions: Active user account exists
- Test Data: email=FIKOY39188@EMAXASP.COM, password=kapil08dangar@
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter email in uppercase
  3) Enter valid password
  4) Click Login
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Login succeeds
- Priority: P2
- Type: Functional
- Automation Notes: Verify case handling in UI or backend

---

- ID: HB-LOGIN-011
- Title: Password is case-sensitive
- Module: Onboarding / Login
- Preconditions: Active user account exists
- Test Data: email=fikoy39188@emaxasp.com, password=Kapil08dangar@
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter valid email
  3) Enter password with different case
  4) Click Login
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Login fails with generic error
- Priority: P2
- Type: Negative / Security
- Automation Notes: Ensure error is generic

---

- ID: HB-LOGIN-012
- Title: Password visibility toggle shows and hides password
- Module: Onboarding / Login
- Preconditions: None
- Test Data: password=AnyPassword123!
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter password
  3) Toggle show/hide password
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Password switches between masked and visible
- Priority: P3
- Type: UI
- Automation Notes: Validate input type change

---

- ID: HB-LOGIN-013
- Title: Submit with Enter key from password field
- Module: Onboarding / Login
- Preconditions: Active user account exists
- Test Data: email=fikoy39188@emaxasp.com, password=kapil08dangar@
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter valid email
  3) Enter valid password
  4) Press Enter
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Login succeeds
- Priority: P2
- Type: Functional / UX
- Automation Notes: Use keyboard press and check redirect

---

- ID: HB-LOGIN-014
- Title: Prevent double-submit during loading
- Module: Onboarding / Login
- Preconditions: Active user account exists
- Test Data: email=fikoy39188@emaxasp.com, password=kapil08dangar@
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter valid credentials
  3) Click Login multiple times quickly
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Only one login request is processed
  - UI shows loading state if supported
- Priority: P2
- Type: Functional / UX
- Automation Notes: Use request interception or loading indicator

---

- ID: HB-LOGIN-015
- Title: Remember-me persists session across reload (if present)
- Module: Onboarding / Login
- Preconditions: Active user account exists
- Test Data: email=fikoy39188@emaxasp.com, password=kapil08dangar@
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Check "Remember me" (if present)
  3) Login with valid credentials
  4) Reload the page
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - User remains authenticated after reload
- Priority: P2
- Type: Functional / Security
- Automation Notes: Skip if checkbox not present

---

- ID: HB-LOGIN-016
- Title: Login page redirects when already authenticated
- Module: Onboarding / Login
- Preconditions: User is already logged in
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - User is redirected to the app landing page
- Priority: P2
- Type: Functional
- Automation Notes: Use stored auth state if available

---

- ID: HB-LOGIN-017
- Title: Logout clears session and blocks protected pages
- Module: Onboarding / Login
- Preconditions: User is logged in
- Test Data: None
- Steps to Reproduce:
  1) Logout from the app
  2) Attempt to open a protected page directly
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - User is redirected to login page
- Priority: P1
- Type: Security / Functional
- Automation Notes: Validate URL and auth cookie cleared

---

- ID: HB-LOGIN-018
- Title: Forgot password link opens reset flow (if present)
- Module: Onboarding / Login
- Preconditions: None
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Click "Forgot password" link
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Reset password page is displayed
- Priority: P2
- Type: Functional / UI
- Automation Notes: Validate URL or heading

---

- ID: HB-LOGIN-019
- Title: Network error displays friendly message
- Module: Onboarding / Login
- Preconditions: None
- Test Data: email=fikoy39188@emaxasp.com, password=kapil08dangar@
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter valid credentials
  3) Simulate network failure and click Login
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - User sees a friendly error and can retry
- Priority: P2
- Type: Resiliency / UX
- Automation Notes: Use network route abort in automation

---

- ID: HB-LOGIN-020
- Title: Accessibility labels are present for email and password
- Module: Onboarding / Login
- Preconditions: None
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Inspect email and password fields for labels or aria-label
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Fields are labeled for screen readers
- Priority: P3
- Type: Accessibility
- Automation Notes: Use Playwright accessibility snapshot

---

- ID: HB-LOGIN-021
- Title: Login page is usable on mobile viewport
- Module: Onboarding / Login
- Preconditions: None
- Test Data: None
- Steps to Reproduce:
  1) Set viewport to mobile size
  2) Open https://test.hellobooks.ai/login
  3) Verify fields and button are visible and usable
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - No clipped inputs or overlapping text
- Priority: P3
- Type: UI / Responsive
- Automation Notes: Use mobile viewport config

---

- ID: HB-LOGIN-022
- Title: Login works in private/incognito mode
- Module: Onboarding / Login
- Preconditions: Active user account exists
- Test Data: email=fikoy39188@emaxasp.com, password=kapil08dangar@
- Steps to Reproduce:
  1) Open a private/incognito browser context
  2) Navigate to https://test.hellobooks.ai/login
  3) Login with valid credentials
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Login succeeds and session starts
- Priority: P3
- Type: Functional
- Automation Notes: Use new context with no storage state

---

- ID: HB-LOGIN-023
- Title: Login retains email after failed attempt
- Module: Onboarding / Login
- Preconditions: Active user account exists
- Test Data: email=fikoy39188@emaxasp.com, password=wrongPassword123
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter valid email and invalid password
  3) Click Login
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Email remains in the field
  - Password is cleared or remains masked per policy
- Priority: P3
- Type: UX
- Automation Notes: Verify email value after error

---

- ID: HB-LOGIN-024
- Title: Login form tab order is logical
- Module: Onboarding / Login
- Preconditions: None
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Use Tab key to navigate inputs and buttons
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Focus order is email -> password -> submit -> links
- Priority: P3
- Type: Accessibility / UX
- Automation Notes: Use keyboard navigation checks

---

- ID: HB-LOGIN-025
- Title: Login page blocks mixed content
- Module: Onboarding / Login
- Preconditions: None
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Inspect console/network for mixed content warnings
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - No mixed content warnings
- Priority: P3
- Type: Security / UI
- Automation Notes: Check console messages
