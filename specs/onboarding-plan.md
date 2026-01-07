# Onboarding - Planner Output

## Metadata
- Generated: 2026-01-05T11:34:43.018Z
- Environment: https://test.hellobooks.ai
- User: fikoy39188@emaxasp.com

## Login Page
- URL: https://test.hellobooks.ai/login
### Headings
- Welcome Back to Hellobooks

### Inputs
- dev@merufintech.com
- rememberMe

### Buttons
- Sign In
- Continue with Google

### Links
- Forgot Password?
- Sign up

### Checkboxes
- Remember me for 7 days

- SSO providers detected: Google
- OTP/Magic link option detected: no

## Sign-up Page
- URL: https://test.hellobooks.ai/signup
### Headings
- Account Setup
- Email Verification
- Organization Setup
- Business Setup
- Get Started with Hellobooks

### Inputs
- Enter your first name
- Enter your last name
- Enter your working email address
- ********
- Re-enter your password

### Buttons
- Create Account
- Continue with Google
- Sign In to Your Account

### Links
- Contact Support
- Terms of Service
- Privacy Policy
- Sign In to Your Account

### Checkboxes
- No checkboxes detected.

## Reset Password Page
- URL: https://test.hellobooks.ai/forgot-password
### Headings
- Reset your password

### Inputs
- you@example.com

### Buttons
- Send reset link

### Links
- Back to login

## Post-login Landing
- URL: https://test.hellobooks.ai/
### Headings
- Hi, john!
- john's Financial Overview
- Reminders
- Match Status
- Match Type Distribution
- Recent Matches
- Industry Benchmarks
- Expense Breakdown by Category
- Budget Tracker
- AI Spending Insights
- Total Revenue
- Total Expenses
- Net Profit
- Expense/Sales Ratio
- Predictive Cash Flow
- Anomaly Detection
- Expense Forecast
- Top Vendors by Spend
- Expense Heatmap
- Hellobooks AI

## Suggested Onboarding Scenarios
- Login happy path with valid credentials.
- Login validation for required fields and invalid email formats.
- Incorrect password and non-existent user handling (generic error).
- Remember-me and session persistence across reloads.
- Forgot password flow entry and reset confirmation.
- Sign-up happy path and validation for required fields.
- Duplicate email sign-up error handling.
- Terms/consent checkbox handling.
- Password policy enforcement and confirm password mismatch.
- OTP/magic link flow if detected.
- SSO login flow for: Google.

## Notes
- Validate UI copy, error placement, and accessibility states.
- Verify redirects between login, sign-up, and reset password.