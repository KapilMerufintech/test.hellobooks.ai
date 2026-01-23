# Manual Test Cases - Banking (https://test.hellobooks.ai/?tab=transactions)

## Seed Credentials
- Email: fapopi7433@feanzier.com
- Password: Kapil08dangar@

- ID: HB-BANK-001
- Title: Access Banking from left navigation
- Module: Banking / Navigation
- Preconditions: User is logged out
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Login with seed credentials
  2) Click Banking in left navigation
- Expected Result:
  - Banking area opens and Transactions tab is visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Use login from tests/seed.spec.ts; click Banking and assert URL contains tab=transactions

- ID: HB-BANK-002
- Title: Direct URL access to Banking Transactions
- Module: Banking / Navigation
- Preconditions: User is logged out
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/?tab=transactions
  2) Login if prompted
- Expected Result:
  - User lands on Transactions tab after login
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Assert redirect to tab=transactions

- ID: HB-BANK-003
- Title: Banking page blocks access when not authenticated
- Module: Banking / Security
- Preconditions: User is logged out
- Test Data: None
- Steps to Reproduce:
  1) Open https://test.hellobooks.ai/?tab=transactions
- Expected Result:
  - User is redirected to login page
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Security
- Automation Notes: Expect /login in URL

- ID: HB-BANK-004
- Title: Transactions table renders with expected columns
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Open Banking Transactions
- Expected Result:
  - Table shows Date, Description, Amount, Contact, Account, Tax, Match Status, Confidence
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: UI
- Automation Notes: Verify header texts

- ID: HB-BANK-005
- Title: Default date range is applied on load
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Open Banking Transactions
  2) Observe date filter (if present)
- Expected Result:
  - Default range is shown and list matches it
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check date filter value or label

- ID: HB-BANK-006
- Title: Search filters transactions by keyword
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Keyword matching a known transaction
- Steps to Reproduce:
  1) Open Banking Transactions
  2) Enter keyword in Search
- Expected Result:
  - List filters to matching rows
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Use a known description if available

- ID: HB-BANK-007
- Title: Search by amount matches numeric values
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Amount value present in list
- Steps to Reproduce:
  1) Open Banking Transactions
  2) Search using a numeric amount
- Expected Result:
  - Rows containing the amount are shown
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Use known amount from a row

- ID: HB-BANK-008
- Title: Clear search restores full list
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Any keyword
- Steps to Reproduce:
  1) Search with keyword
  2) Clear the search input
- Expected Result:
  - Full list is restored
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check row count increases

- ID: HB-BANK-009
- Title: Sorting by Date toggles ascending/descending
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Transactions with different dates
- Steps to Reproduce:
  1) Click Date column header
  2) Click Date column header again
- Expected Result:
  - Sort order toggles between asc/desc
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Compare first row dates after each click

- ID: HB-BANK-010
- Title: Sorting by Amount toggles ascending/descending
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Transactions with different amounts
- Steps to Reproduce:
  1) Click Amount column header
  2) Click Amount column header again
- Expected Result:
  - Sort order toggles between asc/desc
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Compare first row amounts after each click

- ID: HB-BANK-011
- Title: Pagination next/previous works
- Module: Banking / Transactions
- Preconditions: User is logged in and list spans multiple pages
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Click Next page
  2) Click Previous page
- Expected Result:
  - Page changes and rows update accordingly
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Skip if pagination not visible

- ID: HB-BANK-012
- Title: Page size selector changes row count
- Module: Banking / Transactions
- Preconditions: User is logged in and page size control exists
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Change page size to 50
- Expected Result:
  - Rows per page update to selected size
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check row count and control value

- ID: HB-BANK-013
- Title: Filter by Match Status
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Match status filter values
- Steps to Reproduce:
  1) Open filter panel
  2) Select a Match Status
  3) Apply filter
- Expected Result:
  - Rows show only selected match status
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Validate status values in list

- ID: HB-BANK-014
- Title: Filter by Date Range
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Start/end date
- Steps to Reproduce:
  1) Open filter panel
  2) Set date range
  3) Apply filter
- Expected Result:
  - Rows are within selected date range
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Compare row dates to filter

- ID: HB-BANK-015
- Title: Clear filters resets to default list
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Any filter applied
- Steps to Reproduce:
  1) Apply a filter
  2) Click Clear/Reset filters
- Expected Result:
  - List returns to default state
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify filter controls reset

- ID: HB-BANK-016
- Title: Transactions show positive/negative signage correctly
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Transactions with debit/credit
- Steps to Reproduce:
  1) Open Banking Transactions
- Expected Result:
  - Debits and credits have correct sign/format
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check amount formatting

- ID: HB-BANK-017
- Title: Transaction row opens details drawer
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Any row
- Steps to Reproduce:
  1) Click a transaction row
- Expected Result:
  - Details panel opens with transaction info
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Assert details panel visible

- ID: HB-BANK-018
- Title: Transaction details include amount, date, and account
- Module: Banking / Transactions
- Preconditions: User is logged in and details panel is open
- Test Data: Selected row
- Steps to Reproduce:
  1) Open a transaction details panel
- Expected Result:
  - Amount, date, and account fields are visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Validate detail fields exist

- ID: HB-BANK-019
- Title: Add Transaction button opens create form
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: None
- Steps to Reproduce:
  1) Click Add Transaction
- Expected Result:
  - Create Transaction form/modal opens
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Verify create form fields visible

- ID: HB-BANK-020
- Title: Create transaction with required fields
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Date, amount, description, account
- Steps to Reproduce:
  1) Open Add Transaction
  2) Fill required fields
  3) Save
- Expected Result:
  - Transaction is created and appears in list
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Clean up after create if possible

- ID: HB-BANK-021
- Title: Create transaction validates required fields
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Missing required field
- Steps to Reproduce:
  1) Open Add Transaction
  2) Leave a required field empty
  3) Click Save
- Expected Result:
  - Validation errors are shown and save is blocked
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative
- Automation Notes: Assert validation text

- ID: HB-BANK-022
- Title: Edit transaction updates values
- Module: Banking / Transactions
- Preconditions: User is logged in and row is editable
- Test Data: Updated description or category
- Steps to Reproduce:
  1) Open a transaction details panel
  2) Edit a field
  3) Save
- Expected Result:
  - Updated values persist and show in list
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Use editable test data

- ID: HB-BANK-023
- Title: Delete transaction removes from list
- Module: Banking / Transactions
- Preconditions: User is logged in and row is deletable
- Test Data: A test transaction
- Steps to Reproduce:
  1) Open details for a test transaction
  2) Click Delete and confirm
- Expected Result:
  - Transaction is removed from list
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Use created test data only

- ID: HB-BANK-024
- Title: Import bank statement opens upload flow
- Module: Banking / Import
- Preconditions: User is logged in
- Test Data: Sample CSV/OFX file
- Steps to Reproduce:
  1) Click Import Transactions
  2) Select a valid file
- Expected Result:
  - Import wizard opens and validates file
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Use sample file from fixtures

- ID: HB-BANK-025
- Title: Import rejects unsupported file type
- Module: Banking / Import
- Preconditions: User is logged in
- Test Data: Unsupported file (e.g., .txt)
- Steps to Reproduce:
  1) Click Import Transactions
  2) Upload unsupported file
- Expected Result:
  - Error message shown and import blocked
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative
- Automation Notes: Verify error toast

- ID: HB-BANK-026
- Title: Import shows mapping for bank file columns
- Module: Banking / Import
- Preconditions: User is logged in and upload succeeds
- Test Data: Sample CSV with columns
- Steps to Reproduce:
  1) Upload a valid file
  2) Proceed to mapping step
- Expected Result:
  - Column mapping is displayed and editable
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Assert mapping fields present

- ID: HB-BANK-027
- Title: Import creates transactions and shows summary
- Module: Banking / Import
- Preconditions: User is logged in
- Test Data: Valid bank file
- Steps to Reproduce:
  1) Complete import
  2) Review summary
- Expected Result:
  - Summary shows created/ignored rows and list updates
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Validate summary counts

- ID: HB-BANK-028
- Title: Duplicate detection flags duplicates on import
- Module: Banking / Import
- Preconditions: User is logged in with existing transactions
- Test Data: File containing duplicate rows
- Steps to Reproduce:
  1) Import file with duplicates
- Expected Result:
  - Duplicates are flagged and not added twice
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Use deterministic duplicate data

- ID: HB-BANK-029
- Title: Reconciliation tab is accessible
- Module: Banking / Reconciliation
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Click Reconciliation tab
- Expected Result:
  - Reconciliation view loads
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Assert URL contains tab=reconciliation

- ID: HB-BANK-030
- Title: Match transaction to invoice/bill
- Module: Banking / Reconciliation
- Preconditions: User is logged in and matching candidates exist
- Test Data: A transaction with a matching invoice/bill
- Steps to Reproduce:
  1) Open a transaction in Reconciliation
  2) Select a matching item
  3) Confirm match
- Expected Result:
  - Match status updates to Matched
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Requires stable test data

- ID: HB-BANK-031
- Title: Unmatch a previously matched transaction
- Module: Banking / Reconciliation
- Preconditions: User is logged in and match exists
- Test Data: A matched transaction
- Steps to Reproduce:
  1) Open matched transaction
  2) Click Unmatch
- Expected Result:
  - Match status returns to Unmatched
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Use test data only

- ID: HB-BANK-032
- Title: Split transaction into multiple categories
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Amount and split categories
- Steps to Reproduce:
  1) Open transaction details
  2) Choose Split
  3) Add multiple category lines
  4) Save
- Expected Result:
  - Split lines sum to total amount and save succeeds
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Validate sum equals total

- ID: HB-BANK-033
- Title: Assign contact (payee) to transaction
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Existing contact
- Steps to Reproduce:
  1) Open transaction details
  2) Select a contact
  3) Save
- Expected Result:
  - Contact appears in list and details
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Requires contact data

- ID: HB-BANK-034
- Title: Assign tax code to transaction
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Tax code
- Steps to Reproduce:
  1) Open transaction details
  2) Select tax code
  3) Save
- Expected Result:
  - Tax code is saved and displayed
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Requires tax codes

- ID: HB-BANK-035
- Title: Attach receipt to transaction
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Receipt file
- Steps to Reproduce:
  1) Open transaction details
  2) Upload attachment
- Expected Result:
  - Attachment is saved and listed
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Use small file fixture

- ID: HB-BANK-036
- Title: Transaction memo supports max length
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Long memo text
- Steps to Reproduce:
  1) Open transaction details
  2) Enter long memo
  3) Save
- Expected Result:
  - Memo is saved or validation is shown
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Negative
- Automation Notes: Validate max length rule

- ID: HB-BANK-037
- Title: Bank account switch changes transaction list
- Module: Banking / Accounts
- Preconditions: User is logged in with multiple accounts
- Test Data: Account A and Account B
- Steps to Reproduce:
  1) Open account selector
  2) Switch to another account
- Expected Result:
  - Transactions list updates to selected account
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Requires multiple accounts

- ID: HB-BANK-038
- Title: Account balance matches sum of transactions (approx)
- Module: Banking / Accounts
- Preconditions: User is logged in
- Test Data: Known account with transactions
- Steps to Reproduce:
  1) Note account balance
  2) Sum listed transactions for date range
- Expected Result:
  - Balance aligns with computed sum (within tolerance)
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Requires stable data and defined range

- ID: HB-BANK-039
- Title: Export transactions to CSV (if present)
- Module: Banking / Export
- Preconditions: User is logged in and export option exists
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Click Export
  2) Download CSV
- Expected Result:
  - CSV downloads and contains column headers
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Validate download file

- ID: HB-BANK-040
- Title: Error state on Banking API failure
- Module: Banking / Error Handling
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Force transactions API to return 500
  2) Open Banking Transactions
- Expected Result:
  - Friendly error and retry option displayed
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative
- Automation Notes: Mock API response

- ID: HB-BANK-041
- Title: Empty state when no transactions
- Module: Banking / Transactions
- Preconditions: User has no transactions
- Test Data: Empty tenant credentials
- Steps to Reproduce:
  1) Open Banking Transactions
- Expected Result:
  - Empty state message shown
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Negative
- Automation Notes: Manual-only if no empty tenant

- ID: HB-BANK-042
- Title: Transactions list persists filters on refresh
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Any filter
- Steps to Reproduce:
  1) Apply filter
  2) Refresh page
- Expected Result:
  - Filter remains applied or is restored per design
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify filter state and list

- ID: HB-BANK-043
- Title: Unauthorized user cannot access Banking
- Module: Banking / Security
- Preconditions: User has restricted role
- Test Data: Restricted-role credentials
- Steps to Reproduce:
  1) Login with restricted role
  2) Open Banking tab
- Expected Result:
  - Access is denied or limited
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Security
- Automation Notes: Manual-only if no restricted role

- ID: HB-BANK-044
- Title: Transaction confidence values display properly
- Module: Banking / Transactions
- Preconditions: User is logged in
- Test Data: Transactions with confidence values
- Steps to Reproduce:
  1) Open Banking Transactions
- Expected Result:
  - Confidence column shows numeric/label values
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check column text not empty

- ID: HB-BANK-045
- Title: Match Status filter counts reflect list totals
- Module: Banking / Reconciliation
- Preconditions: User is logged in
- Test Data: Transactions with matched/unmatched
- Steps to Reproduce:
  1) Note match status counts
  2) Filter to each status
- Expected Result:
  - Filtered list count matches indicator
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Compare badge counts to rows

- ID: HB-BANK-046
- Title: Reconciliation action updates audit trail (if present)
- Module: Banking / Compliance
- Preconditions: User is logged in and audit trail exists
- Test Data: Matched transaction
- Steps to Reproduce:
  1) Match a transaction
  2) Open audit history
- Expected Result:
  - Audit entry recorded with user and timestamp
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Manual-only if audit UI not available

- ID: HB-BANK-047
- Title: Transaction list supports horizontal scroll on small screens
- Module: Banking / UI
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Set viewport to 375x667
  2) Open Transactions list
- Expected Result:
  - Table is usable via horizontal scroll or responsive layout
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Verify no layout break

- ID: HB-BANK-048
- Title: Transactions list handles large amounts without overflow
- Module: Banking / UI
- Preconditions: User is logged in
- Test Data: High-value transaction
- Steps to Reproduce:
  1) Open Transactions list
  2) Locate high-value amount
- Expected Result:
  - Amount displays fully without truncation
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Use large amount if present

- ID: HB-BANK-049
- Title: Transaction date respects timezone
- Module: Banking / Data Quality
- Preconditions: User is logged in
- Test Data: Known transaction date
- Steps to Reproduce:
  1) Compare transaction date to source
- Expected Result:
  - Date displays in correct timezone
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Manual-only unless source known

- ID: HB-BANK-050
- Title: No sensitive data in Banking URL
- Module: Banking / Security
- Preconditions: User is logged in
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Open Banking Transactions
  2) Inspect URL
- Expected Result:
  - URL contains no sensitive data
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Security
- Automation Notes: Assert URL does not contain email or password
