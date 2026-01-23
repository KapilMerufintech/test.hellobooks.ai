# Manual Test Cases - Overview (https://test.hellobooks.ai/)

## Seed Credentials
- Email: fapopi7433@feanzier.com
- Password: Kapil08dangar@

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
- Title: Overview is default landing page after login
- Module: Financial Overview
- Preconditions: User is logged out
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/login
  2) Login with seed credentials
- Expected Result:
  - User lands on Overview page
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Assert URL is /

- ID: HB-OVERVIEW-003
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
- Automation Notes: Expect /login in URL

- ID: HB-OVERVIEW-004
- Title: Greeting displays user name
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - Greeting shows user name (e.g., "Hi, john!")
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check greeting text contains "Hi,"

- ID: HB-OVERVIEW-005
- Title: Financial Overview heading is visible
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/
- Expected Result:
  - "Financial Overview" heading is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: UI
- Automation Notes: Validate heading text

- ID: HB-OVERVIEW-006
- Title: KPI cards show Total Revenue and Total Expenses
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
- Expected Result:
  - "Total Revenue" and "Total Expenses" cards are visible with values
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: UI
- Automation Notes: Assert values present and non-empty

- ID: HB-OVERVIEW-007
- Title: KPI cards show Net Profit and Expense/Sales Ratio
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
- Expected Result:
  - "Net Profit" and "Expense/Sales Ratio" cards are visible with values
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: UI
- Automation Notes: Assert values present and non-empty

- ID: HB-OVERVIEW-008
- Title: KPI values show currency formatting
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
  2) Inspect KPI values
- Expected Result:
  - Values use consistent currency format (symbol, separators)
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: UI
- Automation Notes: Regex for currency format

- ID: HB-OVERVIEW-009
- Title: Reminders widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
- Expected Result:
  - "Reminders" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check widget title

- ID: HB-OVERVIEW-010
- Title: Match Status widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
- Expected Result:
  - "Match Status" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check widget title

- ID: HB-OVERVIEW-011
- Title: Match Type Distribution widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
- Expected Result:
  - "Match Type Distribution" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check widget title

- ID: HB-OVERVIEW-012
- Title: Recent Matches widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
- Expected Result:
  - "Recent Matches" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check widget title

- ID: HB-OVERVIEW-013
- Title: Industry Benchmarks widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
- Expected Result:
  - "Industry Benchmarks" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check widget title

- ID: HB-OVERVIEW-014
- Title: Expense Breakdown by Category chart renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
- Expected Result:
  - "Expense Breakdown by Category" chart is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: UI
- Automation Notes: Check chart container with title

- ID: HB-OVERVIEW-015
- Title: Budget Tracker widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
- Expected Result:
  - "Budget Tracker" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check widget title

- ID: HB-OVERVIEW-016
- Title: AI Spending Insights widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
- Expected Result:
  - "AI Spending Insights" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check widget title

- ID: HB-OVERVIEW-017
- Title: Predictive Cash Flow widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
- Expected Result:
  - "Predictive Cash Flow" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check widget title

- ID: HB-OVERVIEW-018
- Title: Anomaly Detection widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
- Expected Result:
  - "Anomaly Detection" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check widget title

- ID: HB-OVERVIEW-019
- Title: Expense Forecast widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
- Expected Result:
  - "Expense Forecast" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check widget title

- ID: HB-OVERVIEW-020
- Title: Top Vendors by Spend widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
- Expected Result:
  - "Top Vendors by Spend" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check widget title

- ID: HB-OVERVIEW-021
- Title: Expense Heatmap widget renders
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
- Expected Result:
  - "Expense Heatmap" widget is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check widget title

- ID: HB-OVERVIEW-022
- Title: Overview navigation highlights active state
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
  2) Observe sidebar navigation
- Expected Result:
  - "Overview" is highlighted as active
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check aria-current or active class

- ID: HB-OVERVIEW-023
- Title: Overview page supports refresh without logout
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
  2) Refresh the page
- Expected Result:
  - User remains logged in and Overview reloads
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Ensure URL is not /login

- ID: HB-OVERVIEW-024
- Title: Overview load time under 10 seconds
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
  2) Measure time until main widgets are visible
- Expected Result:
  - Page and key widgets load within 10 seconds
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Use timing assertions

- ID: HB-OVERVIEW-025
- Title: Overview page has no console errors on load
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
  2) Capture console logs
- Expected Result:
  - No severe console errors
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Fail on console error severity error

- ID: HB-OVERVIEW-026
- Title: Overview page blocks mixed content
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
  2) Monitor console for mixed content
- Expected Result:
  - No mixed content warnings
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Security
- Automation Notes: Check console for mixed content warnings

- ID: HB-OVERVIEW-027
- Title: Overview page works on mobile viewport
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Set viewport to 375x667
  2) Navigate to Overview page
- Expected Result:
  - Layout is responsive and no horizontal scroll
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: UI
- Automation Notes: Check body scroll width

- ID: HB-OVERVIEW-028
- Title: Overview widgets are keyboard accessible
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
  2) Use Tab to cycle focusable elements
- Expected Result:
  - Focus moves in logical order without traps
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Accessibility
- Automation Notes: Assert focusable element change

- ID: HB-OVERVIEW-029
- Title: Overview page shows consistent branding
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
- Expected Result:
  - Hellobooks branding/logo is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check header logo or text

- ID: HB-OVERVIEW-030
- Title: Overview page allows opening Settings from header
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
  2) Click Settings
- Expected Result:
  - Settings page opens
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Assert URL contains /settings

- ID: HB-OVERVIEW-031
- Title: Overview page allows opening Help from header
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
  2) Click Help
- Expected Result:
  - Help page or modal opens
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Assert navigation or modal visible

- ID: HB-OVERVIEW-032
- Title: Overview page allows opening Profile menu
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
  2) Click profile/email in header
- Expected Result:
  - Profile menu opens with user email
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Assert menu visible

- ID: HB-OVERVIEW-033
- Title: Overview page logout from profile menu
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
  2) Open profile menu
  3) Click Logout
- Expected Result:
  - User is redirected to login page
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Expect /login URL

- ID: HB-OVERVIEW-034
- Title: Overview page retains state after navigation back
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
  2) Click Transactions in menu
  3) Use browser back button
- Expected Result:
  - Returns to Overview without logout
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Assert URL is /

- ID: HB-OVERVIEW-035
- Title: Overview page redirect from /login when authenticated
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to https://test.hellobooks.ai/login
- Expected Result:
  - User is redirected to Overview or home
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Use seed login then visit /login

- ID: HB-OVERVIEW-036
- Title: Overview page shows data for linked bank accounts
- Module: Financial Overview
- Preconditions: User has at least one bank account linked
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
- Expected Result:
  - Widgets reflect data from linked accounts
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Validate data presence in charts

- ID: HB-OVERVIEW-037
- Title: Overview page empty state when no data
- Module: Financial Overview
- Preconditions: User has no transactions
- Test Data: Empty tenant credentials
- Steps to Reproduce:
  1) Navigate to Overview page
- Expected Result:
  - Widgets show empty state without errors
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Negative
- Automation Notes: Manual-only if no empty tenant

- ID: HB-OVERVIEW-038
- Title: Overview handles API failure gracefully
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Force Overview API to return 500
  2) Navigate to Overview page
- Expected Result:
  - User sees retry or friendly error state
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative
- Automation Notes: Stub API responses

- ID: HB-OVERVIEW-039
- Title: AI insights prompt input accepts query
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: "Summarize my financial health in simple terms"
- Steps to Reproduce:
  1) Navigate to Overview page
  2) Enter query in AI prompt input
  3) Submit query
- Expected Result:
  - Input accepts text and submission triggers loading/response
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Assert loading indicator or response container

- ID: HB-OVERVIEW-040
- Title: AI insights rejects empty submission
- Module: Financial Overview
- Preconditions: User is logged in
- Test Data: Empty
- Steps to Reproduce:
  1) Navigate to Overview page
  2) Submit empty AI prompt
- Expected Result:
  - Validation prevents submission
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Negative
- Automation Notes: Assert error or disabled submit

- ID: HB-OVERVIEW-041
- Title: Overview shows recent matches list details
- Module: Financial Overview
- Preconditions: User has recent matches
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Navigate to Overview page
  2) Review Recent Matches widget
- Expected Result:
  - Each item shows description, amount, and date (if available)
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Assert list item structure

- ID: HB-OVERVIEW-042
- Title: Match status totals align with transactions counts
- Module: Financial Overview
- Preconditions: User has transactions
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Note match counts in Overview
  2) Navigate to Transactions
  3) Compare counts
- Expected Result:
  - Counts align within same date range
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Requires consistent data and date filters

- ID: HB-OVERVIEW-043
- Title: Expense breakdown categories sum to total expenses
- Module: Financial Overview
- Preconditions: User has expenses
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Capture category totals in chart
  2) Compare with Total Expenses
- Expected Result:
  - Category totals approximately match Total Expenses
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Tolerate rounding differences

- ID: HB-OVERVIEW-044
- Title: Net Profit equals Total Revenue minus Total Expenses
- Module: Financial Overview
- Preconditions: User has revenue and expenses
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Note Total Revenue and Total Expenses
  2) Calculate Revenue - Expenses
  3) Compare to Net Profit
- Expected Result:
  - Net Profit matches calculation (within rounding tolerance)
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Extract numeric values and compare

- ID: HB-OVERVIEW-045
- Title: Expense/Sales Ratio matches Total Expenses divided by Total Revenue
- Module: Financial Overview
- Preconditions: User has revenue and expenses
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Note Total Revenue and Total Expenses
  2) Calculate Expenses / Revenue
  3) Compare to Expense/Sales Ratio
- Expected Result:
  - Ratio matches calculation (within rounding tolerance)
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Validate ratio format and tolerance

- ID: HB-OVERVIEW-046
- Title: Predictive cash flow respects date range filters (if present)
- Module: Financial Overview
- Preconditions: Date range filter available
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Change date range filter
  2) Observe Predictive Cash Flow values
- Expected Result:
  - Widget updates to reflect selected range
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Skip if no filter

- ID: HB-OVERVIEW-047
- Title: Overview chart tooltips show correct values
- Module: Financial Overview
- Preconditions: Charts are interactive
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Hover over chart points
- Expected Result:
  - Tooltip shows date/category and amount
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Use hover and verify tooltip text

- ID: HB-OVERVIEW-048
- Title: Overview page supports dark/light theme toggle (if present)
- Module: Financial Overview
- Preconditions: Theme toggle available
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Toggle theme
- Expected Result:
  - Theme switches and page remains readable
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Optional

- ID: HB-OVERVIEW-049
- Title: Overview page handles session timeout on refresh
- Module: Financial Overview
- Preconditions: User is logged in and idle timeout applies
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Login and stay idle until timeout
  2) Refresh Overview
- Expected Result:
  - User is redirected to login
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Security
- Automation Notes: Manual-only if timeout long

- ID: HB-OVERVIEW-050
- Title: Overview page shows consistent currency across widgets
- Module: Financial Overview
- Preconditions: User has financial data
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Compare currency symbols across KPI and charts
- Expected Result:
  - Same currency symbol is used consistently
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Assert consistent currency symbol
