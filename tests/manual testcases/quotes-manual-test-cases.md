# Manual Test Cases - Sales Quotes (Sales > Quotes)

## Seed Credentials
- Email: fapopi7433@feanzier.com
- Password: Kapil08dangar@

- ID: HB-QUOTE-001
- Title: Open Quotes list after login
- Module: Sales / Quotes
- Preconditions: User is logged out
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Login with seed credentials
  2) Navigate to Sales > Quotes
- Expected Result:
  - Quotes list loads without errors
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Verify list heading and table visible

- ID: HB-QUOTE-002
- Title: Create draft quote with required fields
- Module: Sales / Quotes
- Preconditions: User is logged in
- Test Data: Existing customer and item
- Steps to Reproduce:
  1) Click New Quote
  2) Select customer
  3) Add one item with qty and price
  4) Save as Draft
- Expected Result:
  - Draft quote saved with correct totals
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Verify Draft status and totals

- ID: HB-QUOTE-003
- Title: Validate required customer on quote
- Module: Sales / Quotes
- Preconditions: User is logged in
- Test Data: None
- Steps to Reproduce:
  1) Click New Quote
  2) Leave customer empty
  3) Click Save
- Expected Result:
  - Validation shown and save blocked
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Negative
- Automation Notes: Check error message for customer field

- ID: HB-QUOTE-004
- Title: Validate required line items on quote
- Module: Sales / Quotes
- Preconditions: User is logged in
- Test Data: Customer only
- Steps to Reproduce:
  1) Click New Quote
  2) Select customer
  3) Save without line items
- Expected Result:
  - Validation shown or line items required per policy
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative
- Automation Notes: Document expected behavior

- ID: HB-QUOTE-005
- Title: Line item totals calculate correctly
- Module: Sales / Quotes
- Preconditions: User is logged in
- Test Data: Item with qty and unit price
- Steps to Reproduce:
  1) Add item with qty 3 and unit price 100
  2) Observe line total
- Expected Result:
  - Line total equals qty * unit price
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Verify line total is 300

- ID: HB-QUOTE-006
- Title: Quote subtotal equals sum of line totals
- Module: Sales / Quotes
- Preconditions: User is logged in
- Test Data: Multiple items
- Steps to Reproduce:
  1) Add multiple line items
  2) Compare subtotal with sum of line totals
- Expected Result:
  - Subtotal equals sum of all line totals
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Use deterministic prices

- ID: HB-QUOTE-007
- Title: Percentage discount reduces line total
- Module: Sales / Quotes
- Preconditions: User is logged in
- Test Data: Item with 10 percent discount
- Steps to Reproduce:
  1) Add item
  2) Apply 10 percent discount
- Expected Result:
  - Line total reduces by 10 percent
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Validate discounted total

- ID: HB-QUOTE-008
- Title: Fixed discount reduces quote subtotal
- Module: Sales / Quotes
- Preconditions: User is logged in
- Test Data: Fixed discount amount
- Steps to Reproduce:
  1) Add items
  2) Apply quote discount of 50
- Expected Result:
  - Subtotal reduces by 50 and taxes recalc
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check totals after discount

- ID: HB-QUOTE-009
- Title: Tax exclusive calculation
- Module: Sales / Quotes / Tax
- Preconditions: Tax mode exclusive
- Test Data: Taxable item with 10 percent tax
- Steps to Reproduce:
  1) Add taxable item
  2) Save quote
- Expected Result:
  - Tax added on top of subtotal
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Validate tax and total

- ID: HB-QUOTE-010
- Title: Tax inclusive calculation
- Module: Sales / Quotes / Tax
- Preconditions: Tax mode inclusive
- Test Data: Taxable item
- Steps to Reproduce:
  1) Add taxable item
  2) Save quote
- Expected Result:
  - Tax included in price and totals correct
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify tax portion

- ID: HB-QUOTE-011
- Title: Multiple tax rates per line
- Module: Sales / Quotes / Tax
- Preconditions: Multiple tax rates configured
- Test Data: Two items with different tax rates
- Steps to Reproduce:
  1) Add item A with tax rate 5 percent
  2) Add item B with tax rate 12 percent
- Expected Result:
  - Tax per line matches assigned rate and totals sum
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify tax breakdown

- ID: HB-QUOTE-012
- Title: Zero-rated tax item
- Module: Sales / Quotes / Tax
- Preconditions: Zero tax rate exists
- Test Data: Item with zero tax
- Steps to Reproduce:
  1) Add item with zero tax rate
  2) Save quote
- Expected Result:
  - Tax for the line is zero
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify tax value is 0

- ID: HB-QUOTE-013
- Title: Non-taxable item does not add tax
- Module: Sales / Quotes / Tax
- Preconditions: Non-taxable item configured
- Test Data: Non-taxable item
- Steps to Reproduce:
  1) Add non-taxable item
  2) Save quote
- Expected Result:
  - No tax applied to that line
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check tax column

- ID: HB-QUOTE-014
- Title: Quote numbering sequence increments
- Module: Sales / Quotes
- Preconditions: Numbering configured
- Test Data: Create two quotes
- Steps to Reproduce:
  1) Create quote A
  2) Create quote B
- Expected Result:
  - Quote numbers are unique and sequential
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Capture numbers

- ID: HB-QUOTE-015
- Title: Duplicate quote number rejected
- Module: Sales / Quotes
- Preconditions: Manual number allowed
- Test Data: Existing quote number
- Steps to Reproduce:
  1) Create quote with existing number
- Expected Result:
  - Validation prevents duplicate
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Negative
- Automation Notes: Error message shown

- ID: HB-QUOTE-016
- Title: Set quote expiration date
- Module: Sales / Quotes / Workflow
- Preconditions: User is logged in
- Test Data: Expiration date
- Steps to Reproduce:
  1) Set expiration date on quote
  2) Save quote
- Expected Result:
  - Expiration date saved and visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify saved date

- ID: HB-QUOTE-017
- Title: Expired quote status updates after expiration
- Module: Sales / Quotes / Workflow
- Preconditions: Quote expiration date in past
- Test Data: Expired quote
- Steps to Reproduce:
  1) Open quotes list
- Expected Result:
  - Quote marked as Expired
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check status badge

- ID: HB-QUOTE-018
- Title: Send quote marks status as Sent
- Module: Sales / Quotes / Workflow
- Preconditions: Draft quote exists
- Test Data: Recipient email
- Steps to Reproduce:
  1) Open draft quote
  2) Click Send
- Expected Result:
  - Status changes to Sent and email queued
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Check status and activity log

- ID: HB-QUOTE-019
- Title: Email template uses quote variables
- Module: Sales / Quotes / Workflow
- Preconditions: Email template available
- Test Data: Quote with known totals
- Steps to Reproduce:
  1) Preview quote email
- Expected Result:
  - Template shows customer name, quote number, amount
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Verify merge fields

- ID: HB-QUOTE-020
- Title: Download quote PDF
- Module: Sales / Quotes / Documents
- Preconditions: Quote exists
- Test Data: Any quote
- Steps to Reproduce:
  1) Open quote
  2) Download PDF
- Expected Result:
  - PDF downloads successfully
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check file download

- ID: HB-QUOTE-021
- Title: PDF matches quote totals
- Module: Sales / Quotes / Documents
- Preconditions: Quote exists
- Test Data: Known totals
- Steps to Reproduce:
  1) Download quote PDF
  2) Compare totals to UI
- Expected Result:
  - PDF totals match UI totals
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Manual compare

- ID: HB-QUOTE-022
- Title: Attach file to quote
- Module: Sales / Quotes / Documents
- Preconditions: Quote exists
- Test Data: Small file
- Steps to Reproduce:
  1) Upload attachment to quote
- Expected Result:
  - Attachment appears in quote
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify attachment list

- ID: HB-QUOTE-023
- Title: Edit draft quote recalculates totals
- Module: Sales / Quotes / Workflow
- Preconditions: Draft quote exists
- Test Data: Update quantity
- Steps to Reproduce:
  1) Open draft quote
  2) Change quantity
  3) Save
- Expected Result:
  - Totals update and audit log records change
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check totals and history

- ID: HB-QUOTE-024
- Title: Edit sent quote follows policy
- Module: Sales / Quotes / Workflow
- Preconditions: Sent quote exists
- Test Data: Update description
- Steps to Reproduce:
  1) Open sent quote
  2) Attempt edit
- Expected Result:
  - System restricts or requires revision
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative
- Automation Notes: Document behavior

- ID: HB-QUOTE-025
- Title: Approve quote in workflow
- Module: Sales / Quotes / Approval
- Preconditions: Approval workflow enabled
- Test Data: Draft quote pending approval
- Steps to Reproduce:
  1) Submit quote for approval
  2) Approver approves
- Expected Result:
  - Status changes to Approved
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Requires approver role

- ID: HB-QUOTE-026
- Title: Reject quote approval
- Module: Sales / Quotes / Approval
- Preconditions: Approval workflow enabled
- Test Data: Draft quote pending approval
- Steps to Reproduce:
  1) Submit quote for approval
  2) Approver rejects with reason
- Expected Result:
  - Status changes to Rejected and reason saved
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check rejection reason

- ID: HB-QUOTE-027
- Title: Convert quote to invoice
- Module: Sales / Quotes / Workflow
- Preconditions: Approved quote exists
- Test Data: Quote ready for conversion
- Steps to Reproduce:
  1) Open approved quote
  2) Click Convert to Invoice
- Expected Result:
  - Invoice created with quote line items and totals
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Verify invoice number and linkage

- ID: HB-QUOTE-028
- Title: Converted invoice preserves tax and discount
- Module: Sales / Quotes / Accounting
- Preconditions: Quote with tax and discount
- Test Data: Quote with 10 percent discount and tax
- Steps to Reproduce:
  1) Convert quote to invoice
- Expected Result:
  - Invoice retains same tax and discount values
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Compare fields

- ID: HB-QUOTE-029
- Title: Quote conversion prevents duplicate invoicing
- Module: Sales / Quotes / Workflow
- Preconditions: Quote already converted
- Test Data: Converted quote
- Steps to Reproduce:
  1) Attempt to convert quote again
- Expected Result:
  - Conversion blocked or creates revision per policy
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Negative
- Automation Notes: Verify warning

- ID: HB-QUOTE-030
- Title: Quote accepted by customer
- Module: Sales / Quotes / Workflow
- Preconditions: Quote sent to customer
- Test Data: Customer action
- Steps to Reproduce:
  1) Use customer portal or acceptance link
  2) Accept quote
- Expected Result:
  - Status updates to Accepted and time logged
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Manual-only if external portal

- ID: HB-QUOTE-031
- Title: Quote declined by customer
- Module: Sales / Quotes / Workflow
- Preconditions: Quote sent to customer
- Test Data: Customer action
- Steps to Reproduce:
  1) Use customer portal or decline link
  2) Decline quote with reason
- Expected Result:
  - Status updates to Declined and reason stored
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Manual-only if external portal

- ID: HB-QUOTE-032
- Title: Quote revision creates new version
- Module: Sales / Quotes / Workflow
- Preconditions: Sent or approved quote
- Test Data: Quote needing changes
- Steps to Reproduce:
  1) Create revision of quote
- Expected Result:
  - New version created with incremented revision number
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify versioning

- ID: HB-QUOTE-033
- Title: Multi-currency quote applies exchange rate
- Module: Sales / Quotes / Accounting
- Preconditions: Customer currency differs from base
- Test Data: Foreign currency customer
- Steps to Reproduce:
  1) Create quote for foreign customer
- Expected Result:
  - Exchange rate applied and base amounts shown
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check currency and base total

- ID: HB-QUOTE-034
- Title: Exchange rate override recalculates totals
- Module: Sales / Quotes / Accounting
- Preconditions: Multi-currency enabled
- Test Data: Override exchange rate
- Steps to Reproduce:
  1) Edit exchange rate
  2) Save quote
- Expected Result:
  - Base totals update to reflect new rate
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify base totals

- ID: HB-QUOTE-035
- Title: Quote does not post to GL
- Module: Sales / Quotes / Accounting
- Preconditions: Quote exists
- Test Data: Any quote
- Steps to Reproduce:
  1) Create and send quote
  2) Review GL
- Expected Result:
  - No GL entries created for quote
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Accounting
- Automation Notes: Verify no GL impact

- ID: HB-QUOTE-036
- Title: Quote conversion posts only when invoice posted
- Module: Sales / Quotes / Accounting
- Preconditions: Converted invoice exists
- Test Data: Converted invoice
- Steps to Reproduce:
  1) Convert quote to invoice
  2) Do not post invoice
  3) Review GL
- Expected Result:
  - No GL entries until invoice is posted
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Accounting
- Automation Notes: Check posting rules

- ID: HB-QUOTE-037
- Title: Quote status filter
- Module: Sales / Quotes / List
- Preconditions: Quotes in multiple statuses
- Test Data: Draft, Sent, Accepted
- Steps to Reproduce:
  1) Filter list by status
- Expected Result:
  - Only quotes with selected status appear
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Validate status values

- ID: HB-QUOTE-038
- Title: Search by quote number
- Module: Sales / Quotes / List
- Preconditions: Quote exists
- Test Data: Known quote number
- Steps to Reproduce:
  1) Use search with quote number
- Expected Result:
  - Matching quote shown
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify list filtered

- ID: HB-QUOTE-039
- Title: Filter by date range
- Module: Sales / Quotes / List
- Preconditions: Quotes across dates
- Test Data: Date range
- Steps to Reproduce:
  1) Filter list by quote date range
- Expected Result:
  - Quotes within date range appear
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify date filter

- ID: HB-QUOTE-040
- Title: Delete draft quote
- Module: Sales / Quotes / Workflow
- Preconditions: Draft quote exists
- Test Data: Draft quote
- Steps to Reproduce:
  1) Delete draft quote
- Expected Result:
  - Quote removed from list and audit logged
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check audit log if available

- ID: HB-QUOTE-041
- Title: Delete sent or approved quote is restricted
- Module: Sales / Quotes / Workflow
- Preconditions: Sent or approved quote exists
- Test Data: Sent quote
- Steps to Reproduce:
  1) Attempt to delete sent quote
- Expected Result:
  - Deletion blocked or requires cancel
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Negative
- Automation Notes: Verify restriction message

- ID: HB-QUOTE-042
- Title: Cancel quote changes status to Cancelled
- Module: Sales / Quotes / Workflow
- Preconditions: Sent or approved quote exists
- Test Data: Quote to cancel
- Steps to Reproduce:
  1) Cancel quote
- Expected Result:
  - Status changes to Cancelled and is logged
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check status and activity log

- ID: HB-QUOTE-043
- Title: Quote activity log records status changes
- Module: Sales / Quotes / Workflow
- Preconditions: Quote exists
- Test Data: Status transitions
- Steps to Reproduce:
  1) Change status Draft -> Sent -> Accepted
  2) Review activity log
- Expected Result:
  - Each transition recorded with user and timestamp
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify audit trail

- ID: HB-QUOTE-044
- Title: Customer contact selection on quote
- Module: Sales / Quotes
- Preconditions: Customer has multiple contacts
- Test Data: Customer contacts
- Steps to Reproduce:
  1) Select a contact on quote
- Expected Result:
  - Contact saved and used for email send
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Check email recipient

- ID: HB-QUOTE-045
- Title: Quote terms and notes appear on PDF
- Module: Sales / Quotes / Documents
- Preconditions: Quote exists
- Test Data: Custom notes and terms
- Steps to Reproduce:
  1) Add notes and terms
  2) Download PDF
- Expected Result:
  - Notes and terms displayed on PDF
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Manual check

- ID: HB-QUOTE-046
- Title: Role permissions - view only user cannot create
- Module: Sales / Quotes / Security
- Preconditions: Read-only role exists
- Test Data: Read-only user
- Steps to Reproduce:
  1) Login as read-only user
  2) Open Quotes
- Expected Result:
  - New Quote action not available
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Security
- Automation Notes: Manual-only for roles

- ID: HB-QUOTE-047
- Title: Role permissions - creator cannot approve
- Module: Sales / Quotes / Security
- Preconditions: Role without approval permission
- Test Data: Creator user
- Steps to Reproduce:
  1) Login as creator
  2) Open quote pending approval
- Expected Result:
  - Approve action not available
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Security
- Automation Notes: Manual-only for roles

- ID: HB-QUOTE-048
- Title: Quote list export to CSV
- Module: Sales / Quotes / Reporting
- Preconditions: Quotes exist
- Test Data: None
- Steps to Reproduce:
  1) Export quote list to CSV
- Expected Result:
  - CSV downloads with correct columns
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Check file columns

- ID: HB-QUOTE-049
- Title: Quote list sorting by date and amount
- Module: Sales / Quotes / List
- Preconditions: Quotes exist
- Test Data: Multiple quotes with different totals
- Steps to Reproduce:
  1) Sort by quote date
  2) Sort by total amount
- Expected Result:
  - List order updates correctly
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Compare first row values

- ID: HB-QUOTE-050
- Title: Quote supports item price list
- Module: Sales / Quotes
- Preconditions: Price list configured
- Test Data: Customer with price list
- Steps to Reproduce:
  1) Select customer with price list
  2) Add item
- Expected Result:
  - Item price auto-populates from price list
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify unit price

- ID: HB-QUOTE-051
- Title: Quote handles large amounts without overflow
- Module: Sales / Quotes / UI
- Preconditions: User is logged in
- Test Data: High-value line items
- Steps to Reproduce:
  1) Add item with large amount
  2) Save quote
- Expected Result:
  - Amounts display without truncation and totals correct
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Check formatting

- ID: HB-QUOTE-052
- Title: Quote supports attachments size limit
- Module: Sales / Quotes / Documents
- Preconditions: Attachment limit configured
- Test Data: File over size limit
- Steps to Reproduce:
  1) Upload oversized attachment
- Expected Result:
  - Upload blocked with clear error
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Negative
- Automation Notes: Verify error toast

- ID: HB-QUOTE-053
- Title: Quote keeps attachments after status change
- Module: Sales / Quotes / Documents
- Preconditions: Quote with attachment
- Test Data: Attached file
- Steps to Reproduce:
  1) Change status Draft -> Sent
- Expected Result:
  - Attachment remains available
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Check attachment list

- ID: HB-QUOTE-054
- Title: Quote conversion keeps customer contact
- Module: Sales / Quotes / Workflow
- Preconditions: Quote with selected contact
- Test Data: Customer contact
- Steps to Reproduce:
  1) Convert quote to invoice
- Expected Result:
  - Invoice retains selected contact
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify invoice contact

- ID: HB-QUOTE-055
- Title: Quote respects sales tax exemption for customer
- Module: Sales / Quotes / Tax
- Preconditions: Customer marked tax-exempt
- Test Data: Tax-exempt customer
- Steps to Reproduce:
  1) Create quote for tax-exempt customer
- Expected Result:
  - Tax is not applied
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify tax is zero

- ID: HB-QUOTE-056
- Title: Quote with negative quantity is blocked
- Module: Sales / Quotes
- Preconditions: User is logged in
- Test Data: Negative qty
- Steps to Reproduce:
  1) Add line with negative quantity
  2) Save quote
- Expected Result:
  - Validation error or blocked per policy
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative
- Automation Notes: Check validation message

- ID: HB-QUOTE-057
- Title: Quote with zero quantity follows policy
- Module: Sales / Quotes
- Preconditions: User is logged in
- Test Data: Zero qty
- Steps to Reproduce:
  1) Add line with zero quantity
  2) Save quote
- Expected Result:
  - Validation or allowed per policy
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Negative
- Automation Notes: Document behavior

- ID: HB-QUOTE-058
- Title: Quote with zero price follows policy
- Module: Sales / Quotes
- Preconditions: User is logged in
- Test Data: Zero price
- Steps to Reproduce:
  1) Add line with zero price
  2) Save quote
- Expected Result:
  - Validation or allowed per policy
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Negative
- Automation Notes: Document behavior

- ID: HB-QUOTE-059
- Title: Quote list pagination works
- Module: Sales / Quotes / List
- Preconditions: Many quotes exist
- Test Data: Enough quotes for multiple pages
- Steps to Reproduce:
  1) Click Next page
  2) Click Previous page
- Expected Result:
  - List updates with correct page data
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Verify page indicator

- ID: HB-QUOTE-060
- Title: Quote conversion reflects in AR aging only after invoice posting
- Module: Sales / Quotes / Accounting
- Preconditions: Quote converted to invoice and posted
- Test Data: Converted invoice
- Steps to Reproduce:
  1) Convert quote to invoice
  2) Post invoice
  3) Check AR aging report
- Expected Result:
  - Amount appears only after posting
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Accounting
- Automation Notes: Verify report timing
