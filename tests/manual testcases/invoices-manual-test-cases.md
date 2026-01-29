# Manual Test Cases - Sales Invoices (Sales > Invoices)

## Seed Credentials
- Email: fapopi7433@feanzier.com
- Password: Kapil08dangar@

- ID: HB-INVOICE-001
- Title: Open Invoices list after login
- Module: Sales / Invoices
- Preconditions: User is logged out
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Login with seed credentials
  2) Navigate to Sales > Invoices
- Expected Result:
  - Invoices list loads without errors
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Use login helper, verify list heading

- ID: HB-INVOICE-002
- Title: Create draft invoice with required fields
- Module: Sales / Invoices
- Preconditions: User is logged in
- Test Data: Existing customer and item
- Steps to Reproduce:
  1) Click New Invoice
  2) Select customer
  3) Add one item with qty and price
  4) Save as Draft
- Expected Result:
  - Draft invoice saved with correct totals
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Verify status Draft and totals

- ID: HB-INVOICE-003
- Title: Validate required customer on invoice
- Module: Sales / Invoices
- Preconditions: User is logged in
- Test Data: None
- Steps to Reproduce:
  1) Click New Invoice
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

- ID: HB-INVOICE-004
- Title: Validate required line items on invoice
- Module: Sales / Invoices
- Preconditions: User is logged in
- Test Data: Customer only
- Steps to Reproduce:
  1) Click New Invoice
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

- ID: HB-INVOICE-005
- Title: Line item totals calculate correctly
- Module: Sales / Invoices
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

- ID: HB-INVOICE-006
- Title: Invoice subtotal equals sum of line totals
- Module: Sales / Invoices
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

- ID: HB-INVOICE-007
- Title: Percentage discount reduces line total
- Module: Sales / Invoices
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

- ID: HB-INVOICE-008
- Title: Fixed discount reduces invoice subtotal
- Module: Sales / Invoices
- Preconditions: User is logged in
- Test Data: Fixed discount amount
- Steps to Reproduce:
  1) Add items
  2) Apply invoice discount of 50
- Expected Result:
  - Subtotal reduces by 50 and taxes recalc
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check totals after discount

- ID: HB-INVOICE-009
- Title: Tax exclusive calculation
- Module: Sales / Invoices / Tax
- Preconditions: Tax mode exclusive
- Test Data: Taxable item with 10 percent tax
- Steps to Reproduce:
  1) Add taxable item
  2) Save invoice
- Expected Result:
  - Tax added on top of subtotal
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Validate tax and total

- ID: HB-INVOICE-010
- Title: Tax inclusive calculation
- Module: Sales / Invoices / Tax
- Preconditions: Tax mode inclusive
- Test Data: Taxable item
- Steps to Reproduce:
  1) Add taxable item
  2) Save invoice
- Expected Result:
  - Tax included in price and totals correct
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify tax portion

- ID: HB-INVOICE-011
- Title: Multiple tax rates per line
- Module: Sales / Invoices / Tax
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

- ID: HB-INVOICE-012
- Title: Zero-rated tax item
- Module: Sales / Invoices / Tax
- Preconditions: Zero tax rate exists
- Test Data: Item with zero tax
- Steps to Reproduce:
  1) Add item with zero tax rate
  2) Save invoice
- Expected Result:
  - Tax for the line is zero
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify tax value is 0

- ID: HB-INVOICE-013
- Title: Non-taxable item does not add tax
- Module: Sales / Invoices / Tax
- Preconditions: Non-taxable item configured
- Test Data: Non-taxable item
- Steps to Reproduce:
  1) Add non-taxable item
  2) Save invoice
- Expected Result:
  - No tax applied to that line
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check tax column

- ID: HB-INVOICE-014
- Title: Invoice numbering sequence increments
- Module: Sales / Invoices
- Preconditions: Numbering configured
- Test Data: Create two invoices
- Steps to Reproduce:
  1) Create invoice A
  2) Create invoice B
- Expected Result:
  - Invoice numbers are unique and sequential
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Capture numbers

- ID: HB-INVOICE-015
- Title: Duplicate invoice number rejected
- Module: Sales / Invoices
- Preconditions: Manual number allowed
- Test Data: Existing invoice number
- Steps to Reproduce:
  1) Create invoice with existing number
- Expected Result:
  - Validation prevents duplicate
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Negative
- Automation Notes: Error message shown

- ID: HB-INVOICE-016
- Title: Payment terms set due date
- Module: Sales / Invoices / Workflow
- Preconditions: Payment terms configured
- Test Data: Net 30
- Steps to Reproduce:
  1) Select payment terms Net 30
  2) Save invoice
- Expected Result:
  - Due date is invoice date plus 30 days
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify due date

- ID: HB-INVOICE-017
- Title: Manual due date override
- Module: Sales / Invoices / Workflow
- Preconditions: User can edit due date
- Test Data: Custom due date
- Steps to Reproduce:
  1) Set due date manually
  2) Save invoice
- Expected Result:
  - Due date saved as selected
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify saved date

- ID: HB-INVOICE-018
- Title: Send invoice marks status as Sent
- Module: Sales / Invoices / Workflow
- Preconditions: Draft invoice exists
- Test Data: Recipient email
- Steps to Reproduce:
  1) Open draft invoice
  2) Click Send
- Expected Result:
  - Invoice status changes to Sent and email queued
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Check status and activity log

- ID: HB-INVOICE-019
- Title: Email template uses invoice variables
- Module: Sales / Invoices / Workflow
- Preconditions: Email template available
- Test Data: Invoice with known totals
- Steps to Reproduce:
  1) Preview invoice email
- Expected Result:
  - Template shows customer name, invoice number, amount
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Verify merge fields

- ID: HB-INVOICE-020
- Title: Download invoice PDF
- Module: Sales / Invoices / Documents
- Preconditions: Invoice exists
- Test Data: Any invoice
- Steps to Reproduce:
  1) Open invoice
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

- ID: HB-INVOICE-021
- Title: PDF matches invoice totals
- Module: Sales / Invoices / Documents
- Preconditions: Invoice exists
- Test Data: Known totals
- Steps to Reproduce:
  1) Download invoice PDF
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

- ID: HB-INVOICE-022
- Title: Attach file to invoice
- Module: Sales / Invoices / Documents
- Preconditions: Invoice exists
- Test Data: Small file
- Steps to Reproduce:
  1) Upload attachment to invoice
- Expected Result:
  - Attachment appears in invoice
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify attachment list

- ID: HB-INVOICE-023
- Title: Edit draft invoice recalculates totals
- Module: Sales / Invoices / Workflow
- Preconditions: Draft invoice exists
- Test Data: Update quantity
- Steps to Reproduce:
  1) Open draft invoice
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

- ID: HB-INVOICE-024
- Title: Edit sent invoice follows policy
- Module: Sales / Invoices / Workflow
- Preconditions: Sent invoice exists
- Test Data: Update description
- Steps to Reproduce:
  1) Open sent invoice
  2) Attempt edit
- Expected Result:
  - System restricts or requires void/credit note
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative
- Automation Notes: Document behavior

- ID: HB-INVOICE-025
- Title: Approve invoice in workflow
- Module: Sales / Invoices / Approval
- Preconditions: Approval workflow enabled
- Test Data: Draft invoice pending approval
- Steps to Reproduce:
  1) Submit invoice for approval
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

- ID: HB-INVOICE-026
- Title: Reject invoice approval
- Module: Sales / Invoices / Approval
- Preconditions: Approval workflow enabled
- Test Data: Draft invoice pending approval
- Steps to Reproduce:
  1) Submit invoice for approval
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

- ID: HB-INVOICE-027
- Title: Post invoice creates GL entries
- Module: Sales / Invoices / Accounting
- Preconditions: Invoice is approved and ready to post
- Test Data: Invoice with tax
- Steps to Reproduce:
  1) Post invoice
  2) Open GL entries
- Expected Result:
  - Debit AR, credit Revenue, credit Tax Payable
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Validate accounts used

- ID: HB-INVOICE-028
- Title: Item revenue account mapping
- Module: Sales / Invoices / Accounting
- Preconditions: Item mapped to specific revenue account
- Test Data: Mapped item
- Steps to Reproduce:
  1) Create and post invoice with mapped item
- Expected Result:
  - Revenue posted to mapped account
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check GL account

- ID: HB-INVOICE-029
- Title: Tax liability account mapping
- Module: Sales / Invoices / Accounting
- Preconditions: Tax account configured
- Test Data: Taxable invoice
- Steps to Reproduce:
  1) Post taxable invoice
  2) Review GL
- Expected Result:
  - Tax amount posted to tax liability account
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify tax account

- ID: HB-INVOICE-030
- Title: Split revenue across multiple accounts
- Module: Sales / Invoices / Accounting
- Preconditions: Multiple items mapped to different accounts
- Test Data: Items A and B
- Steps to Reproduce:
  1) Create invoice with items A and B
  2) Post invoice
- Expected Result:
  - Revenue split across mapped accounts
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check GL lines

- ID: HB-INVOICE-031
- Title: Multi-currency invoice applies exchange rate
- Module: Sales / Invoices / Accounting
- Preconditions: Customer currency differs from base
- Test Data: Foreign currency customer
- Steps to Reproduce:
  1) Create invoice for foreign customer
- Expected Result:
  - Exchange rate applied and base amounts shown
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check currency and base total

- ID: HB-INVOICE-032
- Title: Exchange rate override recalculates totals
- Module: Sales / Invoices / Accounting
- Preconditions: Multi-currency enabled
- Test Data: Override exchange rate
- Steps to Reproduce:
  1) Edit exchange rate
  2) Save invoice
- Expected Result:
  - Base totals update to reflect new rate
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify base totals

- ID: HB-INVOICE-033
- Title: Partial payment updates balance
- Module: Sales / Invoices / Payments
- Preconditions: Sent or posted invoice
- Test Data: Payment less than total
- Steps to Reproduce:
  1) Record partial payment
- Expected Result:
  - Status becomes Partial and balance reduces
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Check remaining balance

- ID: HB-INVOICE-034
- Title: Full payment marks invoice Paid
- Module: Sales / Invoices / Payments
- Preconditions: Sent or posted invoice
- Test Data: Payment equals total
- Steps to Reproduce:
  1) Record full payment
- Expected Result:
  - Balance is zero and status Paid
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Verify status Paid

- ID: HB-INVOICE-035
- Title: Overpayment creates customer credit
- Module: Sales / Invoices / Payments
- Preconditions: Invoice exists
- Test Data: Payment greater than total
- Steps to Reproduce:
  1) Record payment exceeding invoice total
- Expected Result:
  - Overpayment recorded as customer credit
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check credit balance

- ID: HB-INVOICE-036
- Title: Apply customer credit to invoice
- Module: Sales / Invoices / Payments
- Preconditions: Customer has existing credit
- Test Data: Credit note or overpayment
- Steps to Reproduce:
  1) Apply credit to open invoice
- Expected Result:
  - Invoice balance reduces by credit amount
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify applied credit

- ID: HB-INVOICE-037
- Title: Unapply payment restores balance
- Module: Sales / Invoices / Payments
- Preconditions: Payment applied
- Test Data: Applied payment
- Steps to Reproduce:
  1) Unapply or delete payment
- Expected Result:
  - Invoice balance increases accordingly
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check balance and audit log

- ID: HB-INVOICE-038
- Title: Allocate single payment across multiple invoices
- Module: Sales / Invoices / Payments
- Preconditions: Multiple open invoices
- Test Data: Payment amount split
- Steps to Reproduce:
  1) Record one payment
  2) Allocate across invoices
- Expected Result:
  - Each invoice balance updates by allocated amount
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check allocations

- ID: HB-INVOICE-039
- Title: Write off small balance
- Module: Sales / Invoices / Accounting
- Preconditions: Invoice with small remaining balance
- Test Data: Write-off account configured
- Steps to Reproduce:
  1) Write off remaining balance
- Expected Result:
  - Invoice closed and write-off posted
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify write-off account

- ID: HB-INVOICE-040
- Title: Void unposted invoice
- Module: Sales / Invoices / Workflow
- Preconditions: Draft or sent invoice not posted
- Test Data: Any draft
- Steps to Reproduce:
  1) Void invoice
- Expected Result:
  - Status changes to Void and no GL impact
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Ensure no GL entries

- ID: HB-INVOICE-041
- Title: Void posted invoice creates reversal
- Module: Sales / Invoices / Accounting
- Preconditions: Posted invoice
- Test Data: Posted invoice
- Steps to Reproduce:
  1) Void posted invoice
- Expected Result:
  - Reversal GL entries created
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Validate reversing entries

- ID: HB-INVOICE-042
- Title: Create credit note from invoice
- Module: Sales / Invoices / Accounting
- Preconditions: Posted invoice
- Test Data: Invoice to credit
- Steps to Reproduce:
  1) Create credit note from invoice
- Expected Result:
  - Credit note created and linked to invoice
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Verify linkage

- ID: HB-INVOICE-043
- Title: Credit note reverses tax correctly
- Module: Sales / Invoices / Accounting
- Preconditions: Taxable invoice
- Test Data: Credit note for taxable invoice
- Steps to Reproduce:
  1) Create credit note for taxable lines
- Expected Result:
  - Tax reversed in GL
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check tax reversal

- ID: HB-INVOICE-044
- Title: Refund customer from credit balance
- Module: Sales / Invoices / Accounting
- Preconditions: Customer has credit
- Test Data: Credit balance
- Steps to Reproduce:
  1) Issue refund from credit
- Expected Result:
  - Cash account credited and credit balance reduced
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check GL

- ID: HB-INVOICE-045
- Title: Recurring invoice schedule creation
- Module: Sales / Invoices / Workflow
- Preconditions: Recurring feature enabled
- Test Data: Monthly schedule
- Steps to Reproduce:
  1) Create recurring invoice schedule
- Expected Result:
  - Schedule saved with next run date
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify next run date

- ID: HB-INVOICE-046
- Title: Recurring invoice generates new invoice
- Module: Sales / Invoices / Workflow
- Preconditions: Recurring schedule exists
- Test Data: Due run
- Steps to Reproduce:
  1) Trigger recurrence run
- Expected Result:
  - New invoice created from template
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify new invoice number

- ID: HB-INVOICE-047
- Title: Cancel recurring invoice schedule
- Module: Sales / Invoices / Workflow
- Preconditions: Recurring schedule exists
- Test Data: None
- Steps to Reproduce:
  1) Disable recurring schedule
- Expected Result:
  - No future invoices generated
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Confirm schedule status

- ID: HB-INVOICE-048
- Title: Copy invoice creates new draft
- Module: Sales / Invoices
- Preconditions: Existing invoice
- Test Data: Any invoice
- Steps to Reproduce:
  1) Click Copy on invoice
- Expected Result:
  - New draft created with new number
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Ensure status Draft

- ID: HB-INVOICE-049
- Title: Search by invoice number
- Module: Sales / Invoices / List
- Preconditions: Invoice exists
- Test Data: Known invoice number
- Steps to Reproduce:
  1) Use search with invoice number
- Expected Result:
  - Matching invoice shown
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify list filtered

- ID: HB-INVOICE-050
- Title: Filter by status
- Module: Sales / Invoices / List
- Preconditions: Invoices in multiple statuses
- Test Data: Draft, Sent, Paid
- Steps to Reproduce:
  1) Filter list by status
- Expected Result:
  - Only invoices with selected status appear
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Validate status values

- ID: HB-INVOICE-051
- Title: Filter by date range
- Module: Sales / Invoices / List
- Preconditions: Invoices across dates
- Test Data: Date range
- Steps to Reproduce:
  1) Filter list by invoice date range
- Expected Result:
  - Invoices within date range appear
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify date filter

- ID: HB-INVOICE-052
- Title: Overdue status applied after due date
- Module: Sales / Invoices / Workflow
- Preconditions: Invoice due date in past
- Test Data: Overdue invoice
- Steps to Reproduce:
  1) Open invoices list
- Expected Result:
  - Invoice marked Overdue
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Check status badge

- ID: HB-INVOICE-053
- Title: AR aging report includes invoice
- Module: Sales / Invoices / Reporting
- Preconditions: Posted invoice
- Test Data: Invoice with balance
- Steps to Reproduce:
  1) Open AR aging report
- Expected Result:
  - Invoice appears in correct aging bucket
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Compare aging bucket

- ID: HB-INVOICE-054
- Title: Customer statement includes invoice balance
- Module: Sales / Invoices / Reporting
- Preconditions: Posted invoice
- Test Data: Customer statement
- Steps to Reproduce:
  1) Generate customer statement
- Expected Result:
  - Invoice appears with correct balance
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify statement lines

- ID: HB-INVOICE-055
- Title: Export invoices to CSV
- Module: Sales / Invoices / Reporting
- Preconditions: Invoices exist
- Test Data: None
- Steps to Reproduce:
  1) Export invoice list to CSV
- Expected Result:
  - CSV downloads with correct columns
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Check file columns

- ID: HB-INVOICE-056
- Title: Permissions - view only user cannot create
- Module: Sales / Invoices / Security
- Preconditions: Read-only role exists
- Test Data: Read-only user
- Steps to Reproduce:
  1) Login as read-only user
  2) Open Invoices
- Expected Result:
  - New Invoice action not available
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Security
- Automation Notes: Manual-only for roles

- ID: HB-INVOICE-057
- Title: Permissions - creator cannot approve
- Module: Sales / Invoices / Security
- Preconditions: Role without approval permission
- Test Data: Creator user
- Steps to Reproduce:
  1) Login as creator
  2) Open invoice pending approval
- Expected Result:
  - Approve action not available
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Security
- Automation Notes: Manual-only for roles

- ID: HB-INVOICE-058
- Title: Fiscal period lock prevents posting
- Module: Sales / Invoices / Accounting
- Preconditions: Period locked
- Test Data: Invoice dated in locked period
- Steps to Reproduce:
  1) Attempt to post invoice in locked period
- Expected Result:
  - Posting blocked with clear message
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Negative
- Automation Notes: Requires locked period

- ID: HB-INVOICE-059
- Title: Delete draft invoice
- Module: Sales / Invoices / Workflow
- Preconditions: Draft invoice exists
- Test Data: Draft invoice
- Steps to Reproduce:
  1) Delete draft invoice
- Expected Result:
  - Invoice removed from list and audit logged
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check audit log if available

- ID: HB-INVOICE-060
- Title: Delete posted invoice is not allowed
- Module: Sales / Invoices / Workflow
- Preconditions: Posted invoice exists
- Test Data: Posted invoice
- Steps to Reproduce:
  1) Attempt to delete posted invoice
- Expected Result:
  - Deletion blocked; user prompted to void or credit
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Negative
- Automation Notes: Verify restriction message