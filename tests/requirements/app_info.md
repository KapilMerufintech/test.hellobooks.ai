HelloBooks AI - App & Feature Review (Bank & Cash / Transactions)

Environment URL
- Current URL: https://test.hellobooks.ai/?tab=transactions&bankAccountId=dbc7c4ac-aac4-406c-8ab6-a3459800da69
- Environment: Test
- Status: Application is fully loaded

Role/Credentials
- Current User: Kapil (fapopi7433@feanzier.com)
- Active Workspace: Mark Deo (user dropdown available)
- Active Entity: First Entity (entity selector visible)
- Access Level: Appears to have full access to accounting features

Entry URL + Navigation Steps
- Primary Navigation: Left sidebar with expandable/collapsible sections:
  - Overview (Dashboard)
  - Banking (expanded) -> Bank & Cash, Reconciliation
  - Sales -> Invoices, Quotes, Delivery Challans, Recurring Invoices, Payments Received
  - Purchases (collapsible)
  - Master Data (collapsible)
  - Accountant (collapsible)
  - Reports (collapsible)
  - Documents (collapsible)
  - Bug Management -> My Bug Reports, My Test Cases
- Current Page: Bank & Cash (Transactions tab)

Expected Success Behavior
- Display account balance (UCIC: -INR 49,300.00)
- Show transaction tabs: Draft Transactions (0), Confirmed (3), Reconciliation
- Display notifications panel with system alerts (8 unread notifications visible)
- Load transaction search and filter functionality
- Enable transaction import from CSV/Excel files
- Display table columns: Date, Description, Amount, Contact, Account, Tax, Match Status, Source

Expected Failure/Validation Rules
- Issue: Confirmed tab shows (3) but table displays "0 to 0 of 0 transactions"
- Draft Transactions shows (0); tab should filter appropriately
- Import Bank Statement section visible with call-to-action to upload files
- Connect Bank (Plaid) button available
- Pagination set to 50 items per page

Potential Validation Points
- Empty state handling when no transactions exist
- Pagination behavior with large datasets
- Filter/search functionality on empty results
- Plaid bank connection flow
- CSV/Excel file upload validation

UI Labels/Inputs/Buttons
Top Navigation Bar:
- User selector: "Mark Deo" (dropdown)
- Entity selector: "First Entity" (dropdown)
- Logo/Brand badge: "YFM"
- Search button
- Notifications button (8 unread)
- Theme toggle
- Settings
- Sidebar toggle

Bank & Cash Section:
- Heading: "Bank & Cash"
- Subheading: "Manage transactions across your accounts"
- Account Selector: Dropdown showing "UCIC -INR 49,300.00"
- Action Buttons:
  - "Connect Bank (Plaid)"
  - Info icon (help/details)
  - "Add Transaction" (primary blue button)

Tabs:
- Draft Transactions (0)
- Confirmed (3)
- Reconciliation

Filter Controls:
- Search box (placeholder: "Search")
- Person filter
- Filter button
- Hide button

Table Headers:
- Date, Description, Amount, Contact (payee), Account, Tax, Match status, Source

Import Section:
- "Import Bank Statement"
- File upload prompt: "Upload a CSV or Excel file to begin."
- "Import Transactions" button (blue)

Redirect/Remember-me Rules
- Deep linking: URL includes specific tab (?tab=transactions) and bank account ID
- Session management: User remains logged in with visible profile info
- Entity context: Selected entity (First Entity) appears to persist
- Workspace context: Selected workspace (Mark Deo) appears to persist
- No visible "Remember Me" checkbox on current screen
- Navigation: All links use relative paths (client-side routing)

Data Setup/Cleanup
Current Data State:
- Notifications: 8 unread
- 1 Bill Created (BILL-006, 21 hours ago)
- 6 Invoices Created (INV-0001 through INV-0021, 18-20 hours ago)
- Accounts: 1 account visible (UCIC with -INR 49,300.00 balance)
- Transactions: "Confirmed (3)" label but "0 to 0 of 0 transactions" shown
- Vendors/Contacts: At least 1 vendor (New Vendor in bill notification)

Cleanup Requirements:
- Clear notifications after testing
- Reset transaction state if modifications occur
- Verify account balances after test runs
- Confirm invoice/bill counts match system state

Browsers/Viewport
- Current viewport: 1061 x 713 (desktop)
- Responsive design: Sidebar collapses with toggle
- Browser: Windows/Linux compatible
- Tested resolution: 1061 x 765 (screenshot capture)

Recommended Test Coverage:
- Desktop: 1920x1080, 1366x768, 1024x768
- Tablet: 768x1024
- Mobile: 375x667

Timeout Limit
- Not explicitly defined; app appears responsive
- Notifications load asynchronously
- Import functionality likely has file size/timeout thresholds
- Suggested timeouts:
  - Page load: 5-10 seconds
  - API calls: 3-5 seconds
  - File import: 10-30 seconds

Tags/IDs Format
- Account IDs: UUID format (e.g., dbc7c4ac-aac4-406c-8ab6-a3459800da69)
- Invoice IDs: INV-#### (e.g., INV-0001, INV-0021)
- Bill IDs: BILL-#### (e.g., BILL-006)
- UI elements: React-style ref attributes used for DOM elements
- User email: fapopi7433@feanzier.com
- Workspace/entity names: Mark Deo, First Entity

Known Issues/Flaky Areas
- Transaction count discrepancy: Confirmed (3) but table shows 0 results
- Empty state handling: No transactions visible despite confirmed count
- Notification panel: 8 unread, actions include "Mark all as read" and "Clear all"
- Dynamic content loading: tabs and tabpanels may load asynchronously
- Sidebar expandability: collapsible sections and state persistence
- Plaid integration: external dependency, may need mock/stub for automation

Missing Details for Stable, CI-Safe Playwright Tests

1) Missing Details (Bulleted)
Authentication & Session Persistence
- Login method (form-based, API, OAuth, pre-authenticated browser state)
- Session storage mechanism (cookies, localStorage, sessionStorage, bearer tokens)
- Session timeout duration and re-authentication strategy
- Test user credentials and permissions matrix for different roles
- How to establish authenticated session for CI pipelines

Stable Selectors & Data Attributes
- data-testid values for all interactive elements (buttons, inputs, tabs, filters)
- Selectors for dynamic table rows and transaction items
- How to query the account dropdown and navigation tabs reliably
- Selectors for notification items and success/error messages
- Element selectors for file upload input and progress indicators

Test Data Setup & Reset
- API endpoints or database procedures to create/reset test transactions
- How to populate the "Confirmed (3)" discrepancy (test fixture design)
- Account balance initialization and verification method
- Data cleanup procedure between test runs
- Transaction state dependencies and prerequisites

File Upload Schema & Constraints
- CSV/Excel file structure (exact column names, order, data types)
- Supported file formats, size limits, and encoding
- File upload endpoint details and request format
- Processing behavior (sync vs. async, webhook callbacks, polling)
- Sample valid and invalid test files

Expected Error Messages
- Exact text for validation errors (malformed CSV, missing fields, wrong types)
- Error messages for file upload failures (timeout, size limit, unsupported format)
- Plaid connection error messages
- Transaction field validation errors
- Network and timeout error messages

CI Environment & External Dependencies
- Plaid integration approach (sandbox, mock, or skip in CI)
- Database reset/seed scripts for CI
- Environment variable configuration for test vs. staging
- How to handle asynchronous operations in CI (webhooks, polling)
- Browser context and storage isolation for parallel test execution

2) Numbered Questions (Grouped by Category)

AUTH: Session & Authentication Flow
1. What is the primary authentication method for the test environment?
   - Form-based login (email/password)?
   - API token/bearer auth?
   - OAuth/SSO?
   - Pre-authenticated session (stored credentials file)?

2. How should the test user (Kapil / fapopi7433@feanzier.com) authenticate in CI? Please provide:
   - Username/email and password (or API endpoint to generate auth token)
   - Any MFA/2FA requirements and how to bypass in CI

3. Where is the session token/credential stored?
   - HTTP-only cookie name(s)?
   - localStorage or sessionStorage key?
   - Authorization header format (Bearer, Basic, Custom)?

4. What is the session timeout duration? If session expires mid-test, should tests:
   - Auto-refresh the token?
   - Re-authenticate and retry the request?
   - Fail the test?

5. Does the application require workspace/entity selection (Mark Deo, First Entity) as part of auth, or can it be set after login via URL/API?
6. Can we establish a pre-authenticated Playwright browserContext (via stored session state) for faster test execution, and if so, what is the exact procedure?

SELECTORS: DOM Identification & Stability
7. What is the stable selector (CSS, XPath, or data-testid) for these key elements?
   - "Add Transaction" button
   - Account dropdown (UCIC selector)
   - Draft Transactions tab
   - Confirmed tab
   - Reconciliation tab

8. What selector identifies the file upload input in "Import Bank Statement"? Is it a hidden input[type="file"] or a custom component?
9. How are transaction table rows identified for assertions? Please provide:
   - Row selector (e.g., [data-testid="transaction-row-{id}"])
   - Cell selectors for Date, Description, Amount, Contact, Account, Tax, Match Status, Source columns

10. What selectors identify the filter controls (Search, Person filter, Filter button, Hide button)?
11. How do we query notification items in the notification panel? Provide selector for:
   - Individual notification
   - Unread notification count
   - "Mark all as read" button
   - "Clear all" button

12. Are there any dynamic class names or IDs that change on each page load? If so, how should we query them (e.g., role-based selectors)?

DATA SETUP: Test Fixtures & State Management
13. How can we create test transactions programmatically?
   - Is there a REST API endpoint (POST /api/transactions, /api/imports)?
   - Sample JSON payload for creating a transaction?
   - Or must we use the UI and capture the exact steps?

14. The "Confirmed (3)" tab shows 0 transactions in the table. Should tests:
   - Create 3 confirmed transactions as a fixture?
   - Filter results in a specific way to see them?
   - Is this a known bug that should be worked around?

15. What is the data reset procedure for CI? Please provide:
   - API endpoint to clear transactions for a test account?
   - SQL script to reset database state?
   - Procedure to reset account balance to a known value?

16. Does each test need a fresh account/workspace, or can tests share First Entity and Mark Deo? If shared, how should we avoid test data collisions?
17. Should we use database fixtures (seeded test data), API fixtures (programmatic creation), or UI flows for test setup? What is the recommendation for CI performance?
18. What is the exact account balance after reset? Should we verify it as part of test assertions?

FILE UPLOAD: Schema, Limits & Processing
19. What is the exact CSV/Excel file structure for "Import Transactions"?
   - Column names (in exact order)?
   - Data types for each column?
   - Required vs. optional fields?
   - Examples of valid data for each column?

20. Provide examples of valid and invalid CSV files we can use for test automation:
   - A valid CSV with 2-3 transactions (for positive test)
   - Invalid CSVs: missing columns, wrong data types, malformed rows (for negative tests)
   - Can you attach sample files or provide the format?

21. What are the file size limits and supported formats?
   - Max file size (MB)?
   - Supported formats (.csv, .xls, .xlsx)?
   - Character encoding requirement (UTF-8, ISO-8859-1)?

22. What is the file upload API endpoint and request format?
   - Is it multipart form-data?
   - Endpoint path (e.g., POST /api/transactions/import)?
   - Does it return a job ID for tracking async progress?

23. Is the file import synchronous or asynchronous?
   - Does the response include immediate results?
   - Should tests poll an API endpoint or listen for webhooks?
   - What is the expected completion time for a 100-row CSV?

24. How is upload progress tracked? Should tests:
   - Wait for a success message in the UI?
   - Check the transaction table for new rows?
   - Query an API status endpoint?
   - Monitor console logs or network requests?

ERRORS: Validation & Error Messages
25. What is the exact error message when uploading:
   - A malformed/corrupted CSV?
   - A CSV missing required columns?
   - A CSV with wrong data types (text in amount field)?
   - A duplicate transaction (if validation exists)?

26. What validation error messages appear for individual transaction fields?
   - Invalid/missing date (e.g., "Invalid date format")
   - Invalid/missing amount (e.g., "Amount must be a number")
   - Missing or invalid contact/payee?

27. What error messages appear when file upload fails?
   - Network timeout (e.g., "Upload timeout exceeded")
   - File size limit exceeded (exact message)?
   - Unsupported file format?
   - Upload in progress (multiple simultaneous uploads)?

28. What is the exact error message when Plaid connection fails (e.g., network error, user denies access, invalid credentials)?
29. What error message appears for permission/authorization failures (e.g., user lacks permission to import to this account)?

ENVIRONMENT: CI Constraints & External Integrations
30. How should Plaid integration be handled in CI?
   - Use Plaid sandbox environment with test credentials?
   - Mock the Plaid API with Playwright's route interception?
   - Skip Plaid tests in CI (test only in staging)?
   - Provide Plaid sandbox credentials if applicable

31. Is there a database reset script or API endpoint we can call before/after tests?
   - API endpoint (e.g., POST /api/test/reset)?
   - SQL script path?
   - What does reset include (transactions, accounts, balance)?

32. What environment variables are needed for the CI pipeline?
   - API base URL?
   - Database connection string (if applicable)?
   - Test user credentials?
   - Plaid sandbox keys?
   - File upload endpoint?

33. What are the CI constraints and considerations?
   - Should tests run sequentially or in parallel?
   - How should we handle test data isolation in parallel runs?
   - Are there rate limits on API calls we should account for?

34. How are asynchronous operations handled (e.g., file imports, webhooks)?
   - Should tests use polling or event-based waiting?
   - What is the maximum wait time for async operations?
   - Are there any side effects (emails, notifications) that need to be reset?

35. What CI/CD tools and browsers are available?
   - Which browsers should we target (Chromium, Firefox, WebKit)?
   - Are there headless mode requirements?
   - Any performance/timeout constraints we should know about?

Summary: Critical Path for CI-Safe Tests
- Must-have before writing tests:
  - Questions 1-3 (auth method and credentials)
  - Question 7 (stable selectors for core UI elements)
  - Question 13 (how to create test data)
  - Question 19 (file upload schema)
  - Question 31 (database reset mechanism)

- Strongly recommended:
  - Questions 4-6 (session handling and auth optimization)
  - Questions 8-9 (file upload and table row selectors)
  - Questions 25-28 (exact error messages for assertions)
  - Questions 30-32 (Plaid handling and CI env vars)
