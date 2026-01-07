# Manual Test Cases - Banking Transactions (https://test.hellobooks.ai/?tab=transactions)

Format used here is automation-ready for later conversion to Playwright.

Credentials for automation:
- email=xeyibi3421@gavrom.com
- password=Kapil08dangar@

---

- ID: HB-BANK-TXN-001
- Title: Navigate to Banking > Transactions page
- Module: Banking / Transactions
- Preconditions: Logged in as a user with banking access
- Test Data: N/A
- Steps to Reproduce:
  1) Log in
  2) Open https://test.hellobooks.ai/?tab=transactions
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional / UI
- Automation Notes: Use login from tests/seed.spec.ts, then visit /?tab=transactions

---

- ID: HB-BANK-TXN-002
- Title: Transactions page loads without errors
- Module: Banking / Transactions
- Preconditions: Logged in as a user with banking access
- Test Data: N/A
- Steps to Reproduce:
  1) Navigate to Transactions page
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Page renders without console errors or blank state glitches
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional / UI
- Automation Notes: Capture console errors and ensure main container is visible

---

- ID: HB-BANK-TXN-003
- Title: Access control blocks users without banking permissions
- Module: Banking / Transactions
- Preconditions: User without banking permissions exists
- Test Data: Restricted-role user
- Steps to Reproduce:
  1) Log in as restricted user
  2) Open Transactions page URL
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Access is denied or page is hidden from navigation
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Security / Functional
- Automation Notes: Use alternate credentials if available; otherwise mark as manual-only

---

- ID: HB-BANK-TXN-004
- Title: Default date range is applied on first load (if present)
- Module: Banking / Transactions
- Preconditions: Logged in as a user with banking access
- Test Data: N/A
- Steps to Reproduce:
  1) Open Transactions page
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Date filter shows a default range and list respects it
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional / UI
- Automation Notes: Skip if no date filter is present

---

- ID: HB-BANK-TXN-005
- Title: Transactions list/table is visible
- Module: Banking / Transactions
- Preconditions: Logged in as a user with banking access
- Test Data: At least one transaction exists
- Steps to Reproduce:
  1) Open Transactions page
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - List/table renders with rows
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional / UI
- Automation Notes: Detect rows or an empty-state message if no data

---

- ID: HB-BANK-TXN-006
- Title: Empty state appears when no transactions match filters
- Module: Banking / Transactions
- Preconditions: Logged in; a filter that yields zero results exists
- Test Data: Date range or filter yielding no results
- Steps to Reproduce:
  1) Apply filters that yield zero results
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Empty state message and no rows are shown
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional / UI
- Automation Notes: Skip if no filters are available

---

- ID: HB-BANK-TXN-007
- Title: Transaction row shows key fields (date, description, amount) if present
- Module: Banking / Transactions
- Preconditions: Logged in; list has at least one row
- Test Data: Existing transaction row
- Steps to Reproduce:
  1) Open Transactions page
  2) Observe a row
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Date, description, and amount fields are visible
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional / UI
- Automation Notes: Validate visible columns by text or aria headers

---

- ID: HB-BANK-TXN-008
- Title: Amounts are formatted with currency and separators
- Module: Banking / Transactions
- Preconditions: Logged in; list has at least one row with amount
- Test Data: Transaction with currency amount
- Steps to Reproduce:
  1) Open Transactions page
  2) Inspect amount formatting
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Amount uses correct currency format and separators
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: UI
- Automation Notes: Compare against regex like /[\d,.]+/ and currency symbol if known

---

- ID: HB-BANK-TXN-009
- Title: Negative amounts are visually distinguished (if supported)
- Module: Banking / Transactions
- Preconditions: Logged in; at least one negative transaction exists
- Test Data: Negative amount transaction
- Steps to Reproduce:
  1) Open Transactions page
  2) Locate a negative amount row
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Negative amount is shown with minus sign and/or distinct styling
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: UI
- Automation Notes: Skip if no negative amounts exist

---

- ID: HB-BANK-TXN-010
- Title: Sorting by date works (if sortable)
- Module: Banking / Transactions
- Preconditions: Logged in; list supports sorting
- Test Data: At least two transactions with different dates
- Steps to Reproduce:
  1) Click date column header to sort
  2) Click again to reverse sort
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Rows reorder correctly in asc/desc order
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional / UI
- Automation Notes: Skip if headers are not clickable

---

- ID: HB-BANK-TXN-011
- Title: Sorting persists after refresh (if supported)
- Module: Banking / Transactions
- Preconditions: Logged in; list supports sorting
- Test Data: N/A
- Steps to Reproduce:
  1) Apply sort order
  2) Refresh page
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Sort order remains applied or resets consistently per spec
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional / UI
- Automation Notes: Skip if no sorting

---

- ID: HB-BANK-TXN-012
- Title: Pagination controls appear when results exceed page size (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; many transactions exist
- Test Data: Transaction list > page size
- Steps to Reproduce:
  1) Open Transactions page with many rows
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Pagination controls are visible
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional / UI
- Automation Notes: Skip if list is infinite scroll

---

- ID: HB-BANK-TXN-013
- Title: Pagination next/previous navigates between pages (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; pagination visible
- Test Data: Transaction list > page size
- Steps to Reproduce:
  1) Click Next
  2) Click Previous
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Page changes and rows update accordingly
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Skip if pagination is not present

---

- ID: HB-BANK-TXN-014
- Title: Page size selector changes row count (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; page size control exists
- Test Data: N/A
- Steps to Reproduce:
  1) Open page size selector
  2) Choose a different size
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Number of visible rows updates
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional / UI
- Automation Notes: Skip if no size selector

---

- ID: HB-BANK-TXN-015
- Title: Keyword search filters by description or memo (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; search input present
- Test Data: Search term that matches a transaction
- Steps to Reproduce:
  1) Enter a known search term
  2) Submit/observe results
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Only matching transactions are shown
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Skip if no search input

---

- ID: HB-BANK-TXN-016
- Title: Search supports partial matches (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; search input present
- Test Data: Partial string from a transaction
- Steps to Reproduce:
  1) Enter a partial string
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Relevant transactions are returned
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional
- Automation Notes: Skip if no search input

---

- ID: HB-BANK-TXN-017
- Title: Clearing search restores full list (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; search input present
- Test Data: Any search term
- Steps to Reproduce:
  1) Search for a term
  2) Clear the search
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Full list returns
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional
- Automation Notes: Skip if no search input

---

- ID: HB-BANK-TXN-018
- Title: Date range filter applies correctly (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; date filter present
- Test Data: Known date range with expected results
- Steps to Reproduce:
  1) Select a date range
  2) Apply filter
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Results are limited to the selected range
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Skip if no date filter

---

- ID: HB-BANK-TXN-019
- Title: Date presets work (Today, This Month, etc.) if present
- Module: Banking / Transactions
- Preconditions: Logged in; date presets exist
- Test Data: N/A
- Steps to Reproduce:
  1) Open date presets
  2) Select a preset
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Preset applies correctly to list
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional / UI
- Automation Notes: Skip if no presets

---

- ID: HB-BANK-TXN-020
- Title: Account filter limits transactions to selected bank account (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; multiple bank accounts exist
- Test Data: Two bank accounts with distinct transactions
- Steps to Reproduce:
  1) Select Account A
  2) Observe results
  3) Select Account B
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Results change based on selected account
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Skip if no account filter

---

- ID: HB-BANK-TXN-021
- Title: Status filter shows pending/posted/reconciled (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; status filter exists
- Test Data: Transactions with different statuses
- Steps to Reproduce:
  1) Apply each status filter
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Only transactions with chosen status appear
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Skip if no status filter

---

- ID: HB-BANK-TXN-022
- Title: Amount range filter restricts results (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; amount filter exists
- Test Data: Range with known results
- Steps to Reproduce:
  1) Set min/max amount
  2) Apply filter
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Only amounts in range appear
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional
- Automation Notes: Skip if no amount filter

---

- ID: HB-BANK-TXN-023
- Title: Clear all filters resets to default state (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; filters present
- Test Data: Any applied filters
- Steps to Reproduce:
  1) Apply one or more filters
  2) Click Clear/Reset
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Filters clear and full list returns
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional / UI
- Automation Notes: Skip if no clear action

---

- ID: HB-BANK-TXN-024
- Title: Transaction details open on row click (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; list has rows
- Test Data: Any transaction
- Steps to Reproduce:
  1) Click a transaction row
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Details panel/page opens
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional / UI
- Automation Notes: Skip if rows are not clickable

---

- ID: HB-BANK-TXN-025
- Title: Transaction details show full metadata (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; details view exists
- Test Data: Any transaction
- Steps to Reproduce:
  1) Open transaction details
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Date, amount, description, account, and status are visible
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional / UI
- Automation Notes: Skip if no details view

---

- ID: HB-BANK-TXN-026
- Title: Back navigation returns to list state
- Module: Banking / Transactions
- Preconditions: Logged in; details view exists
- Test Data: Any transaction
- Steps to Reproduce:
  1) Open details
  2) Navigate back
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - List view returns with previous filters and scroll position
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional / UI
- Automation Notes: Skip if details view is not a separate route

---

- ID: HB-BANK-TXN-027
- Title: Export transactions to CSV (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; export control exists
- Test Data: Any transaction list
- Steps to Reproduce:
  1) Click Export
  2) Choose CSV (if prompted)
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - File downloads with correct headers
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Skip if no export control

---

- ID: HB-BANK-TXN-028
- Title: Export respects active filters (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; export control exists
- Test Data: Filtered list
- Steps to Reproduce:
  1) Apply filter
  2) Export transactions
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Export contains only filtered results
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Skip if no export control

---

- ID: HB-BANK-TXN-029
- Title: Print view renders correctly (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; print action exists
- Test Data: N/A
- Steps to Reproduce:
  1) Open print view
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Layout is readable and includes key columns
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: UI
- Automation Notes: Skip if no print action

---

- ID: HB-BANK-TXN-030
- Title: Bulk select transactions (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; list has selectable rows
- Test Data: At least two transactions
- Steps to Reproduce:
  1) Select multiple rows
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Bulk actions become available
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional / UI
- Automation Notes: Skip if no checkboxes

---

- ID: HB-BANK-TXN-031
- Title: Bulk categorize transactions (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; bulk categorize action exists
- Test Data: Multiple transactions
- Steps to Reproduce:
  1) Select multiple rows
  2) Choose category
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Selected transactions update with chosen category
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Skip if no bulk action

---

- ID: HB-BANK-TXN-032
- Title: Mark transaction as reconciled (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; reconcile control exists
- Test Data: Unreconciled transaction
- Steps to Reproduce:
  1) Open transaction
  2) Click Reconcile
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Status updates to reconciled
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Skip if reconcile is not supported

---

- ID: HB-BANK-TXN-033
- Title: Undo reconcile (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; reconciled transaction exists
- Test Data: Reconciled transaction
- Steps to Reproduce:
  1) Open transaction
  2) Click Undo Reconcile
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Status returns to unreconciled
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional
- Automation Notes: Skip if undo is not supported

---

- ID: HB-BANK-TXN-034
- Title: Attach receipt to transaction (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; attachment control exists
- Test Data: Valid image/PDF file
- Steps to Reproduce:
  1) Open transaction
  2) Upload attachment
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Attachment is saved and visible
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional / UI
- Automation Notes: Skip if attachment not supported

---

- ID: HB-BANK-TXN-035
- Title: Remove attachment from transaction (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; attachment exists
- Test Data: Transaction with attachment
- Steps to Reproduce:
  1) Open transaction
  2) Remove attachment
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Attachment is removed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional
- Automation Notes: Skip if attachment not supported

---

- ID: HB-BANK-TXN-036
- Title: Split transaction into multiple categories (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; split action exists
- Test Data: Transaction with amount > 0
- Steps to Reproduce:
  1) Open transaction
  2) Split into two lines
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Split lines sum to original amount
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Skip if split not supported

---

- ID: HB-BANK-TXN-037
- Title: Split validation prevents total mismatch (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; split action exists
- Test Data: Invalid split totals
- Steps to Reproduce:
  1) Open transaction
  2) Create split lines that do not add up
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Validation error prevents save
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Negative / Functional
- Automation Notes: Skip if split not supported

---

- ID: HB-BANK-TXN-038
- Title: Edit transaction memo/notes (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; memo field editable
- Test Data: Memo text
- Steps to Reproduce:
  1) Open transaction
  2) Edit memo
  3) Save
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Memo saves and persists after refresh
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional
- Automation Notes: Skip if memo not editable

---

- ID: HB-BANK-TXN-039
- Title: Vendor/payee assignment (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; payee field exists
- Test Data: Existing payee
- Steps to Reproduce:
  1) Open transaction
  2) Assign payee
  3) Save
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Payee association is saved
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Skip if payee field not present

---

- ID: HB-BANK-TXN-040
- Title: Category assignment (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; category field exists
- Test Data: Valid category
- Steps to Reproduce:
  1) Open transaction
  2) Set category
  3) Save
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Category appears in list/details
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Skip if category field not present

---

- ID: HB-BANK-TXN-041
- Title: Reject invalid amount edits (if editable)
- Module: Banking / Transactions
- Preconditions: Logged in; amount editable
- Test Data: Invalid amount (letters)
- Steps to Reproduce:
  1) Open transaction
  2) Attempt to edit amount to invalid value
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Validation error is shown and save is blocked
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Negative / Functional
- Automation Notes: Skip if amount not editable

---

- ID: HB-BANK-TXN-042
- Title: Filter state is reflected in URL (if supported)
- Module: Banking / Transactions
- Preconditions: Logged in; filters present
- Test Data: Any filter selection
- Steps to Reproduce:
  1) Apply filter
  2) Observe URL
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - URL contains filter parameters or page state persists
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional / UI
- Automation Notes: Skip if no filters

---

- ID: HB-BANK-TXN-043
- Title: Refresh retains filters (if supported)
- Module: Banking / Transactions
- Preconditions: Logged in; filters present
- Test Data: Any filter
- Steps to Reproduce:
  1) Apply filter
  2) Refresh page
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Filters persist or reset per expected behavior
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional
- Automation Notes: Skip if no filters

---

- ID: HB-BANK-TXN-044
- Title: Column resize or reorder works (if supported)
- Module: Banking / Transactions
- Preconditions: Logged in; column controls exist
- Test Data: N/A
- Steps to Reproduce:
  1) Resize or reorder columns
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Column layout updates and remains usable
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: UI
- Automation Notes: Skip if no column controls

---

- ID: HB-BANK-TXN-045
- Title: Totals/summary bar matches visible results (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; totals/summary present
- Test Data: Known transactions
- Steps to Reproduce:
  1) Observe totals
  2) Apply a filter
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Totals update to match filtered rows
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional / UI
- Automation Notes: Skip if no summary

---

- ID: HB-BANK-TXN-046
- Title: Unauthorized API error shows friendly message (if simulated)
- Module: Banking / Transactions
- Preconditions: Logged in; API can be intercepted
- Test Data: Simulated 401 response
- Steps to Reproduce:
  1) Simulate unauthorized response
  2) Observe UI
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - User sees a friendly error and is redirected to login or prompted
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Security / Functional
- Automation Notes: Use route interception in automation; skip in manual if not possible

---

- ID: HB-BANK-TXN-047
- Title: API error shows retry option (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; API can be intercepted
- Test Data: Simulated 500 response
- Steps to Reproduce:
  1) Simulate server error
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Error message shown with retry or reload guidance
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional
- Automation Notes: Use route interception in automation

---

- ID: HB-BANK-TXN-048
- Title: Keyboard navigation through list rows
- Module: Banking / Transactions
- Preconditions: Logged in; list rows focusable
- Test Data: N/A
- Steps to Reproduce:
  1) Use Tab/Arrow keys to navigate
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Focus moves predictably across controls/rows
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Accessibility
- Automation Notes: Skip if no focusable elements in rows

---

- ID: HB-BANK-TXN-049
- Title: Screen reader labels for filters (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; filter inputs present
- Test Data: N/A
- Steps to Reproduce:
  1) Inspect filter inputs for labels
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Inputs have aria-label or visible labels
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Accessibility
- Automation Notes: Validate aria-label or label[for]

---

- ID: HB-BANK-TXN-050
- Title: High-contrast focus indicator on actionable controls
- Module: Banking / Transactions
- Preconditions: Logged in
- Test Data: N/A
- Steps to Reproduce:
  1) Tab through controls
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Focus ring is visible and clear
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Accessibility / UI
- Automation Notes: Visual check or computed style

---

- ID: HB-BANK-TXN-051
- Title: Mobile layout remains usable (375x812)
- Module: Banking / Transactions
- Preconditions: Logged in
- Test Data: N/A
- Steps to Reproduce:
  1) Set viewport to 375x812
  2) Open Transactions page
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Key controls remain visible and list is scrollable
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: UI
- Automation Notes: Use Playwright setViewportSize

---

- ID: HB-BANK-TXN-052
- Title: Tablet layout remains usable (768x1024)
- Module: Banking / Transactions
- Preconditions: Logged in
- Test Data: N/A
- Steps to Reproduce:
  1) Set viewport to 768x1024
  2) Open Transactions page
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - List and filters are usable
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: UI
- Automation Notes: Use Playwright setViewportSize

---

- ID: HB-BANK-TXN-053
- Title: Large list scroll performance is acceptable
- Module: Banking / Transactions
- Preconditions: Logged in; large number of transactions
- Test Data: 200+ transactions
- Steps to Reproduce:
  1) Scroll through list
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Scrolling is smooth and no severe lag
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Performance / UI
- Automation Notes: Manual performance check or basic timing

---

- ID: HB-BANK-TXN-054
- Title: Duplicate transaction detection message (if supported)
- Module: Banking / Transactions
- Preconditions: Logged in; duplicate detection exists
- Test Data: Duplicate transactions
- Steps to Reproduce:
  1) Open page with duplicates
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Duplicates are flagged or surfaced
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional
- Automation Notes: Skip if feature not supported

---

- ID: HB-BANK-TXN-055
- Title: Transactions show correct timezone for timestamps
- Module: Banking / Transactions
- Preconditions: Logged in; timestamp visible
- Test Data: Known timestamp
- Steps to Reproduce:
  1) Observe date/time value
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Timestamp aligns with expected timezone
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional / UI
- Automation Notes: Compare with known source data

---

- ID: HB-BANK-TXN-056
- Title: Multi-account view shows account name (if supported)
- Module: Banking / Transactions
- Preconditions: Logged in; multiple accounts linked
- Test Data: Transactions from two accounts
- Steps to Reproduce:
  1) Open Transactions page
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Account name is visible per row or column
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional / UI
- Automation Notes: Skip if only single account

---

- ID: HB-BANK-TXN-057
- Title: Amount filter rejects non-numeric input (if present)
- Module: Banking / Transactions
- Preconditions: Logged in; amount filter exists
- Test Data: Input=abc
- Steps to Reproduce:
  1) Enter non-numeric amount
  2) Apply filter
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - Validation error is shown or input is sanitized
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Negative / Functional
- Automation Notes: Skip if no amount filter

---

- ID: HB-BANK-TXN-058
- Title: Search handles special characters safely
- Module: Banking / Transactions
- Preconditions: Logged in; search input present
- Test Data: Search term="' OR 1=1 --"
- Steps to Reproduce:
  1) Enter special characters into search
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - No crash, no script execution, and results are safe
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Security / Negative
- Automation Notes: Validate no console errors or XSS alerts

---

- ID: HB-BANK-TXN-059
- Title: Transaction row selection does not trigger unintended navigation
- Module: Banking / Transactions
- Preconditions: Logged in; selectable rows exist
- Test Data: N/A
- Steps to Reproduce:
  1) Click checkbox or row selector (if present)
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - No navigation occurs; selection only
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional / UI
- Automation Notes: Skip if no row selectors

---

- ID: HB-BANK-TXN-060
- Title: Transactions page supports refresh without losing session
- Module: Banking / Transactions
- Preconditions: Logged in
- Test Data: N/A
- Steps to Reproduce:
  1) Refresh page
- Expected Result:
- Actual Result:
  - 
- Current Result:
  - Not executed
  - User remains logged in and list reloads
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Use login from tests/seed.spec.ts then reload

