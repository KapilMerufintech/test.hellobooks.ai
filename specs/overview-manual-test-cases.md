# Manual Test Cases - Overview (https://test.hellobooks.ai/)

## Seed Credentials
- Email: gowifa1510@gavrom.com
- Password: Kapil08dangar@

## Overview Page (Financial Overview)
- ID: HB-OVERVIEW-001
- Title: Load Overview page after login
- Module: Financial Overview
- Preconditions: User is logged out
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Login with seed credentials
  3) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - Overview page loads without errors
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Use login from tests/seed.spec.ts, then visit /

- ID: HB-OVERVIEW-002
- Title: Overview page is default landing after login
- Module: Financial Overview
- Preconditions: User is logged out
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Login with seed credentials
- Expected Result:
  - User lands on the Overview page
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Use login from tests/seed.spec.ts and assert URL is /

- ID: HB-OVERVIEW-003
- Title: Overview page shows greeting and user name
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - Greeting is visible (e.g., "Hi, john!")
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: UI
- Automation Notes: Check heading text contains "Hi,"

- ID: HB-OVERVIEW-004
- Title: Overview page shows Financial Overview heading
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - "Financial Overview" section heading is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: UI
- Automation Notes: Validate heading contains "Financial Overview"

- ID: HB-OVERVIEW-005
- Title: Reminders widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - "Reminders" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: UI
- Automation Notes: Check heading or card title contains "Reminders"

- ID: HB-OVERVIEW-006
- Title: Match Status widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - "Match Status" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: UI
- Automation Notes: Check heading or card title contains "Match Status"

- ID: HB-OVERVIEW-007
- Title: Match Type Distribution widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - "Match Type Distribution" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: UI
- Automation Notes: Check heading or card title contains "Match Type Distribution"

- ID: HB-OVERVIEW-008
- Title: Recent Matches widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - "Recent Matches" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: UI
- Automation Notes: Check heading or card title contains "Recent Matches"

- ID: HB-OVERVIEW-009
- Title: Industry Benchmarks widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - "Industry Benchmarks" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check heading or card title contains "Industry Benchmarks"

- ID: HB-OVERVIEW-010
- Title: Expense Breakdown by Category chart renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - "Expense Breakdown by Category" chart is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: UI
- Automation Notes: Validate chart container exists with title text

- ID: HB-OVERVIEW-011
- Title: Budget Tracker widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - "Budget Tracker" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check heading or card title contains "Budget Tracker"

- ID: HB-OVERVIEW-012
- Title: AI Spending Insights widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - "AI Spending Insights" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check heading or card title contains "AI Spending Insights"

- ID: HB-OVERVIEW-013
- Title: KPI cards show Total Revenue and Total Expenses
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - "Total Revenue" and "Total Expenses" cards are visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: UI
- Automation Notes: Locate KPI titles and assert values are present

- ID: HB-OVERVIEW-014
- Title: KPI cards show Net Profit and Expense/Sales Ratio
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - "Net Profit" and "Expense/Sales Ratio" cards are visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: UI
- Automation Notes: Locate KPI titles and assert values are present

- ID: HB-OVERVIEW-015
- Title: Predictive Cash Flow widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - "Predictive Cash Flow" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check heading or card title contains "Predictive Cash Flow"

- ID: HB-OVERVIEW-016
- Title: Anomaly Detection widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - "Anomaly Detection" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check heading or card title contains "Anomaly Detection"

- ID: HB-OVERVIEW-017
- Title: Expense Forecast widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - "Expense Forecast" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check heading or card title contains "Expense Forecast"

- ID: HB-OVERVIEW-018
- Title: Top Vendors by Spend widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - "Top Vendors by Spend" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check heading or card title contains "Top Vendors by Spend"

- ID: HB-OVERVIEW-019
- Title: Expense Heatmap widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - "Expense Heatmap" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check heading or card title contains "Expense Heatmap"

- ID: HB-OVERVIEW-020
- Title: Overview page loads within acceptable time
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
  2) Measure time until main widgets are visible
- Expected Result:
  - Page and key widgets load within 10 seconds
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Use timing assertions with reasonable timeout

- ID: HB-OVERVIEW-021
- Title: Overview page handles API failure with user-friendly message
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Intercept Overview API calls and force 500
  2) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - Error state is visible with retry or guidance
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative
- Automation Notes: Stub network responses to 500 and verify error UI

- ID: HB-OVERVIEW-022
- Title: Overview page shows empty state when no data
- Module: Financial Overview
- Preconditions: User is logged in with no financial data
- Test Data: Seed credentials on empty tenant
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - Widgets show empty or placeholder state without breaking layout
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Negative
- Automation Notes: Use alternate tenant if available; otherwise manual-only

- ID: HB-OVERVIEW-023
- Title: Overview navigation link highlights active state
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
  2) Observe left navigation
- Expected Result:
  - "Overview" is highlighted as active
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Assert active class or aria-current on Overview link

- ID: HB-OVERVIEW-024
- Title: Overview page supports browser refresh without logout
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
  2) Refresh the page
- Expected Result:
  - User remains logged in and Overview reloads
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify URL and no redirect to /login

- ID: HB-OVERVIEW-025
- Title: Overview page blocks access when not authenticated
- Module: Financial Overview
- Preconditions: User is logged out
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/
- Expected Result:
  - User is redirected to login
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Security
- Automation Notes: Expect URL to contain /login

- ID: HB-OVERVIEW-026
- Title: Overview page respects role-based access
- Module: Financial Overview
- Preconditions: User has restricted role
- Test Data: Restricted-role credentials
- Steps to Reproduce:
  1) Login with restricted-role credentials
  2) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - Access is blocked or limited per role policy
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Security
- Automation Notes: Use alternate credentials if available; otherwise manual-only

- ID: HB-OVERVIEW-027
- Title: Charts display currency values with proper formatting
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
  2) Inspect KPI and chart values
- Expected Result:
  - Currency formatting is consistent (symbol, commas, decimals)
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: UI
- Automation Notes: Validate numeric text pattern, e.g., $ 1,234.56

- ID: HB-OVERVIEW-028
- Title: Overview page has no mixed content warnings
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
  2) Monitor browser console for mixed content
- Expected Result:
  - No mixed content warnings
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Security
- Automation Notes: Check console logs for mixed-content entries

- ID: HB-OVERVIEW-029
- Title: Overview widgets are keyboard accessible
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
  2) Use Tab/Shift+Tab to move through interactive elements
- Expected Result:
  - Focus moves in a logical order and no focus traps
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Accessibility
- Automation Notes: Assert focusable elements and tab order

- ID: HB-OVERVIEW-030
- Title: Overview widgets have accessible names
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
  2) Inspect headings and interactive controls
- Expected Result:
  - Controls have accessible names and headings are semantic
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Accessibility
- Automation Notes: Use accessibility snapshot to check names/roles

- ID: HB-OVERVIEW-031
- Title: Overview layout renders on mobile viewport
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Set viewport to 375x667
  2) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - No horizontal scroll and widgets stack correctly
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: UI
- Automation Notes: Set viewport size and check layout

- ID: HB-OVERVIEW-032
- Title: Overview page retains state after navigation back
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
  2) Click another module (e.g., Transactions)
  3) Use browser back button
- Expected Result:
  - Overview page returns without full logout or errors
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify URL is / and no login redirect

- ID: HB-OVERVIEW-033
- Title: AI insights prompt input is usable
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials; sample prompt text
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
  2) Locate the AI prompt input (e.g., "Ask me anything...")
  3) Enter a prompt and submit if available
- Expected Result:
  - Input accepts text and submission is processed without errors
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Use sample prompt from plan; assert response or loading

- ID: HB-OVERVIEW-034
- Title: Overview page allows opening Settings from header
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
  2) Click Settings link
- Expected Result:
  - Settings page opens successfully
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify navigation to Settings URL

- ID: HB-OVERVIEW-035
- Title: Overview page allows opening Help from header
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
  2) Click Help link
- Expected Result:
  - Help content opens successfully
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify navigation or modal opens

- ID: HB-OVERVIEW-036
- Title: Overview page allows opening Profile menu
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
  2) Click user profile in header
- Expected Result:
  - Profile menu opens with user email
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Assert menu visibility and email text

- ID: HB-OVERVIEW-037
- Title: Overview page logout from profile menu
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
  2) Open profile menu
  3) Click Logout
- Expected Result:
  - User is redirected to login page and session ends
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Verify redirect to /login and protected page blocked

- ID: HB-OVERVIEW-038
- Title: Overview page shows consistent branding header
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - Hellobooks branding or logo is visible in header
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check for logo or brand text in header

- ID: HB-OVERVIEW-039
- Title: Overview page has no console errors on load
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
  2) Capture browser console logs
- Expected Result:
  - No severe errors during page load
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Fail test on console error severity error

- ID: HB-OVERVIEW-040
- Title: Overview page supports reload after session idle
- Module: Financial Overview
- Preconditions: User is logged in and idle timeout applies
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Login and stay idle until session timeout
  2) Refresh Overview page
- Expected Result:
  - User is redirected to login if session expired
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Security
- Automation Notes: Manual-only if session timeout is long
