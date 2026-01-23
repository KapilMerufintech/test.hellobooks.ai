# Manual Test Cases - Login (https://test.hellobooks.ai/login)

## Seed Credentials
- Email: fapopi7433@feanzier.com
- Password: Kapil08dangar@

- ID: HB-LOGIN-001
- Title: Login with valid credentials
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter seed email
  3) Enter seed password
  4) Click Login
- Expected Result:
  - User is redirected to the post-login landing page
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Use login from tests/seed.spec.ts and assert not on /login

- ID: HB-LOGIN-002
- Title: Login with valid email and wrong password
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed email, invalid password
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter seed email
  3) Enter wrong password
  4) Click Login
- Expected Result:
  - Login fails with a generic error message
  - User remains on login page
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Negative
- Automation Notes: Assert URL contains /login and error toast visible

- ID: HB-LOGIN-003
- Title: Login with non-existent user
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: unknown.user+nope@example.com / AnyPassword123!
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter unknown email
  3) Enter any password
  4) Click Login
- Expected Result:
  - Login fails with a generic error message
  - User remains on login page
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Negative
- Automation Notes: Use synthetic email; assert generic error only

- ID: HB-LOGIN-004
- Title: Required validation on empty email and password
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Click Login without filling fields
- Expected Result:
  - Required validation is shown for email and password
  - Login is not attempted
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Negative
- Automation Notes: Check for validation text or disabled submit

- ID: HB-LOGIN-005
- Title: Required validation on empty email only
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Password only
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter any password
  3) Click Login
- Expected Result:
  - Email validation shown
  - Login is not attempted
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative
- Automation Notes: Assert email error state

- ID: HB-LOGIN-006
- Title: Required validation on empty password only
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Email only
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter seed email
  3) Click Login
- Expected Result:
  - Password validation shown
  - Login is not attempted
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative
- Automation Notes: Assert password error state

- ID: HB-LOGIN-007
- Title: Invalid email format validation (missing @)
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: invalid.email.com / AnyPassword123!
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter invalid email
  3) Enter any password
  4) Click Login
- Expected Result:
  - Email format validation shown
  - Login is not attempted
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative
- Automation Notes: Validate email error text

- ID: HB-LOGIN-008
- Title: Invalid email format validation (missing domain)
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: user@ / AnyPassword123!
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter invalid email
  3) Enter any password
  4) Click Login
- Expected Result:
  - Email format validation shown
  - Login is not attempted
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative
- Automation Notes: Validate email error text

- ID: HB-LOGIN-009
- Title: Email is trimmed of leading/trailing spaces
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: "  fapopi7433@feanzier.com  " / seed password
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter email with spaces
  3) Enter seed password
  4) Click Login
- Expected Result:
  - Email is trimmed and login succeeds
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: If not supported, log behavior consistently

- ID: HB-LOGIN-010
- Title: Email is case-insensitive
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: FAPOPI7433@FEANZIER.COM / seed password
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter uppercase email
  3) Enter seed password
  4) Click Login
- Expected Result:
  - Login succeeds
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: If not supported, log behavior consistently

- ID: HB-LOGIN-011
- Title: Password is case-sensitive
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed email / KAPIL08DANGAR@
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter seed email
  3) Enter password in wrong case
  4) Click Login
- Expected Result:
  - Login fails with generic error
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative
- Automation Notes: Assert error and stay on /login

- ID: HB-LOGIN-012
- Title: Password visibility toggle shows and hides password
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Any password
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter any password
  3) Toggle password visibility on
  4) Toggle password visibility off
- Expected Result:
  - Password field switches between text and password types
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check input type changes

- ID: HB-LOGIN-013
- Title: Submit with Enter key from password field
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter seed email
  3) Enter seed password
  4) Press Enter in password field
- Expected Result:
  - Login succeeds
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Trigger Enter and expect navigation

- ID: HB-LOGIN-014
- Title: Prevent double-submit during loading
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter seed credentials
  3) Click Login multiple times quickly
- Expected Result:
  - Only one login request is processed
  - UI shows loading state
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Count network requests or disable button

- ID: HB-LOGIN-015
- Title: Remember me persists session across reload (if present)
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed credentials; remember me checked
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Check Remember me
  3) Login with seed credentials
  4) Refresh the page
- Expected Result:
  - User remains logged in
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Skip if checkbox not present

- ID: HB-LOGIN-016
- Title: Login page redirects when already authenticated
- Module: Onboarding / Login
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/login
- Expected Result:
  - User is redirected to app home
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Use login seed then visit /login

- ID: HB-LOGIN-017
- Title: Logout clears session and blocks protected pages
- Module: Onboarding / Login
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Logout from app
  2) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - User is redirected to login
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Security
- Automation Notes: Ensure protected pages redirect to /login

- ID: HB-LOGIN-018
- Title: Forgot password link opens reset flow (if present)
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Click Forgot Password?
- Expected Result:
  - Reset password page opens
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify URL contains /forgot-password

- ID: HB-LOGIN-019
- Title: Network error displays friendly message
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter seed credentials
  3) Simulate network failure and click Login
- Expected Result:
  - User sees friendly error message
  - Login does not succeed
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative
- Automation Notes: Intercept login request and fail

- ID: HB-LOGIN-020
- Title: Accessibility labels are present for email and password
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Inspect email and password fields
- Expected Result:
  - Inputs have accessible labels or aria-labels
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Accessibility
- Automation Notes: Use accessibility snapshot

- ID: HB-LOGIN-021
- Title: Login page is usable on mobile viewport
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Set viewport to 375x667
  2) Open https://test.hellobooks.ai/login
  3) Enter seed credentials
  4) Click Login
- Expected Result:
  - Login succeeds and layout is usable without horizontal scroll
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Verify no horizontal scroll

- ID: HB-LOGIN-022
- Title: Login works in private/incognito mode
- Module: Onboarding / Login
- Preconditions: New incognito context
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Open incognito window
  2) Navigate to https://test.hellobooks.ai/login
  3) Login with seed credentials
- Expected Result:
  - Login succeeds and session starts
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Use new browser context

- ID: HB-LOGIN-023
- Title: Login retains email after failed attempt
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed email / wrong password
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter seed email
  3) Enter wrong password
  4) Click Login
- Expected Result:
  - Email remains populated after failure
  - Password is cleared or masked per policy
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Validate input values after error

- ID: HB-LOGIN-024
- Title: Login form tab order is logical
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Use Tab to navigate focus order
- Expected Result:
  - Focus moves Email -> Password -> Login
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Accessibility
- Automation Notes: Track focused element sequence

- ID: HB-LOGIN-025
- Title: Login page blocks mixed content
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Monitor console for mixed content
- Expected Result:
  - No mixed content warnings
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Security
- Automation Notes: Fail on mixed content console warnings

- ID: HB-LOGIN-026
- Title: Login error message is non-specific to prevent user enumeration
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: unknown.user@example.com / AnyPassword123!
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter unknown email
  3) Enter any password
  4) Click Login
- Expected Result:
  - Error message does not reveal whether user exists
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Security
- Automation Notes: Compare error text across wrong password and unknown user

- ID: HB-LOGIN-027
- Title: Login rate limit triggers after repeated failures
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed email / wrong password
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Attempt login with wrong password multiple times
- Expected Result:
  - Rate limit or cooldown message appears
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Security
- Automation Notes: May be manual-only due to rate limits

- ID: HB-LOGIN-028
- Title: Rate limit cooldown expires and login allowed
- Module: Onboarding / Login
- Preconditions: User is rate-limited
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Wait for cooldown period
  2) Login with seed credentials
- Expected Result:
  - Login succeeds after cooldown
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Manual-only if cooldown unknown

- ID: HB-LOGIN-029
- Title: Login page uses HTTPS
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Check browser address bar
- Expected Result:
  - Connection is secure (HTTPS)
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Security
- Automation Notes: Assert URL starts with https://

- ID: HB-LOGIN-030
- Title: Sensitive data is not present in URL after login
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Login with seed credentials
  2) Inspect URL
- Expected Result:
  - URL does not contain email or password
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Security
- Automation Notes: Regex assert URL excludes email

- ID: HB-LOGIN-031
- Title: Login page supports paste into password field
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed password
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Paste seed password into password field
  3) Enter seed email
  4) Click Login
- Expected Result:
  - Paste works and login succeeds
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Use clipboard paste if supported

- ID: HB-LOGIN-032
- Title: Login page supports copy/paste for email field
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed email
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Paste seed email into email field
  3) Enter seed password
  4) Click Login
- Expected Result:
  - Paste works and login succeeds
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Use clipboard paste if supported

- ID: HB-LOGIN-033
- Title: Login form preserves focus after validation error
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Empty fields
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Click Login with empty fields
- Expected Result:
  - Focus moves to first invalid field
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Accessibility
- Automation Notes: Check focus target after submit

- ID: HB-LOGIN-034
- Title: Login page shows consistent branding and title
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
- Expected Result:
  - Hellobooks branding is visible
  - Page title is correct
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Validate logo text and document.title

- ID: HB-LOGIN-035
- Title: SSO provider button is visible (if enabled)
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Look for "Continue with Google" or other SSO button
- Expected Result:
  - SSO button is visible when enabled
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Skip if SSO not configured

- ID: HB-LOGIN-036
- Title: SSO cancel returns to login with message (if enabled)
- Module: Onboarding / Login
- Preconditions: SSO enabled
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Click SSO provider
  3) Cancel on provider page
- Expected Result:
  - User returns to login with a friendly message
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Manual-only if external provider

- ID: HB-LOGIN-037
- Title: Back button after login does not show login page
- Module: Onboarding / Login
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Login with seed credentials
  2) Press browser back
- Expected Result:
  - User remains in app, not on login page
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Security
- Automation Notes: Validate URL is not /login

- ID: HB-LOGIN-038
- Title: Redirect to originally requested protected page after login
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Open a protected URL (e.g., https://test.hellobooks.ai/?tab=transactions)
  2) Login with seed credentials
- Expected Result:
  - User is redirected to the originally requested page
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Assert URL contains tab=transactions after login

- ID: HB-LOGIN-039
- Title: Login in one tab reflects state in another
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Open login in two tabs
  2) Login in one tab
  3) Refresh the other tab
- Expected Result:
  - Second tab is authenticated and redirects to app
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Use multiple contexts/pages

- ID: HB-LOGIN-040
- Title: Logout in one tab invalidates session in another
- Module: Onboarding / Login
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Open app in two tabs
  2) Logout in one tab
  3) Refresh the other tab
- Expected Result:
  - Second tab is redirected to login
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Security
- Automation Notes: Use multiple contexts/pages

- ID: HB-LOGIN-041
- Title: Login form blocks mixed content and insecure resources
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Inspect console for insecure requests
- Expected Result:
  - No insecure/mixed content warnings
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Security
- Automation Notes: Capture console messages

- ID: HB-LOGIN-042
- Title: Login page handles slow network with loading indicator
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Throttle network to slow
  2) Login with seed credentials
- Expected Result:
  - Loading indicator appears
  - UI does not freeze
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Use network throttling if supported

- ID: HB-LOGIN-043
- Title: Login form does not accept extremely long email input
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: 300+ char email / AnyPassword123!
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Paste very long email
  3) Enter any password
  4) Click Login
- Expected Result:
  - Validation appears or input is trimmed to max length
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Negative
- Automation Notes: Validate max length behavior

- ID: HB-LOGIN-044
- Title: Login form does not accept extremely long password input
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed email / 300+ char password
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter seed email
  3) Paste very long password
  4) Click Login
- Expected Result:
  - Validation appears or input is trimmed to max length
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Negative
- Automation Notes: Validate max length behavior

- ID: HB-LOGIN-045
- Title: Login form handles leading/trailing spaces in password
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed email / "  Kapil08dangar@  "
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter seed email
  3) Enter password with spaces
  4) Click Login
- Expected Result:
  - App trims or rejects consistently
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Document observed behavior

- ID: HB-LOGIN-046
- Title: Login page blocks cached credentials autofill exposure
- Module: Onboarding / Login
- Preconditions: Browser has saved credentials
- Test Data: Saved credentials
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
- Expected Result:
  - Fields may auto-fill but are masked and secure
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Security
- Automation Notes: Manual-only

- ID: HB-LOGIN-047
- Title: Login page uses correct input types
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Inspect email and password field types
- Expected Result:
  - Email uses type="email"
  - Password uses type="password"
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Assert input type attributes

- ID: HB-LOGIN-048
- Title: Login form submits via button click only once
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Enter seed credentials
  3) Double-click Login
- Expected Result:
  - Only one request is sent
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Count login requests if possible

- ID: HB-LOGIN-049
- Title: Login page displays error when server returns 500
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Intercept login API and return 500
  2) Attempt login
- Expected Result:
  - User sees error message and can retry
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative
- Automation Notes: Stub network response

- ID: HB-LOGIN-050
- Title: Login page displays error when server returns 401
- Module: Onboarding / Login
- Preconditions: User is logged out
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Intercept login API and return 401
  2) Attempt login
- Expected Result:
  - User sees generic login failure message
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative
- Automation Notes: Stub network response
