
# Sales Manual Test Cases - Invoices and Quotes (Accounting Focus)

## Invoices

ID: HB-INV-001
Title: Open invoices list
Module: Sales - Invoices
Preconditions: User logged in with valid access to Sales
Test Data: N/A
Steps to Reproduce:
1) Navigate to Sales
2) Open Invoices list
Expected Result:
- Invoices list loads with no errors
Actual Result:
Current Result:
Not executed
Priority: P1
Type: UI

ID: HB-INV-002
Title: Create invoice with required fields
Module: Sales - Invoices
Preconditions: User logged in; at least one customer and one item exist
Test Data: Customer A, Item 1, Qty 1, Price 100
Steps to Reproduce:
1) Open Invoices list
2) Click New Invoice
3) Select Customer A and add Item 1
4) Save invoice
Expected Result:
- Invoice is created and visible in list
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-003
Title: Required field validation on invoice
Module: Sales - Invoices
Preconditions: User logged in
Test Data: Leave customer and items empty
Steps to Reproduce:
1) Click New Invoice
2) Attempt to save without required fields
Expected Result:
- Validation errors displayed and save blocked
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-INV-004
Title: Auto-generate invoice number
Module: Sales - Invoices
Preconditions: User logged in
Test Data: N/A
Steps to Reproduce:
1) Click New Invoice
2) Observe invoice number field
Expected Result:
- Invoice number is auto-generated and unique
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-INV-005
Title: Duplicate invoice number validation
Module: Sales - Invoices
Preconditions: Existing invoice with number INV-10001
Test Data: INV-10001
Steps to Reproduce:
1) Click New Invoice
2) Enter INV-10001
3) Save invoice
Expected Result:
- System blocks save and shows duplicate number error
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-INV-006
Title: Customer selection search
Module: Sales - Invoices
Preconditions: Multiple customers exist
Test Data: Customer name fragment
Steps to Reproduce:
1) Click New Invoice
2) Open customer dropdown
3) Search by name fragment
Expected Result:
- Matching customers are shown
Actual Result:
Current Result:
Not executed
Priority: P2
Type: UI

ID: HB-INV-007
Title: Add multiple line items
Module: Sales - Invoices
Preconditions: At least two items exist
Test Data: Item 1 Qty 1, Item 2 Qty 2
Steps to Reproduce:
1) Click New Invoice
2) Add Item 1 and Item 2
3) Save invoice
Expected Result:
- Both items are listed and totals are correct
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-008
Title: Edit line item quantity updates totals
Module: Sales - Invoices
Preconditions: New invoice with one line item
Test Data: Qty change from 1 to 3
Steps to Reproduce:
1) Add a line item
2) Change quantity to 3
Expected Result:
- Line total and invoice total update correctly
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-009
Title: Remove line item updates totals
Module: Sales - Invoices
Preconditions: New invoice with two line items
Test Data: Remove Item 2
Steps to Reproduce:
1) Remove one line item
Expected Result:
- Totals recalculate and removed item is not shown
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-010
Title: Item-level discount applies before tax
Module: Sales - Invoices
Preconditions: Discount field available; tax configured
Test Data: Item 1 price 100, discount 10%, tax 10%
Steps to Reproduce:
1) Add Item 1
2) Apply 10% item discount
3) Apply 10% tax
Expected Result:
- Tax calculated on discounted amount (90), not original
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-011
Title: Invoice-level discount applies after item discounts
Module: Sales - Invoices
Preconditions: Item and invoice discounts available
Test Data: Item 1 price 100 with 10% item discount, invoice discount 5%
Steps to Reproduce:
1) Add item with item discount
2) Apply invoice-level discount
Expected Result:
- Invoice discount applied on subtotal after item discounts
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-INV-012
Title: Tax inclusive pricing calculation
Module: Sales - Invoices
Preconditions: Tax inclusive pricing enabled
Test Data: Item price 110, tax 10%
Steps to Reproduce:
1) Add item with tax-inclusive price
2) Save invoice
Expected Result:
- Subtotal and tax extracted correctly (tax 10, net 100)
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-013
Title: Tax exclusive pricing calculation
Module: Sales - Invoices
Preconditions: Tax exclusive pricing enabled
Test Data: Item price 100, tax 10%
Steps to Reproduce:
1) Add item with tax-exclusive price
2) Save invoice
Expected Result:
- Tax added correctly; total is 110
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-014
Title: Multiple taxes per line item
Module: Sales - Invoices
Preconditions: Two tax rates configured
Test Data: Tax A 5%, Tax B 10%, Item price 100
Steps to Reproduce:
1) Add item
2) Apply both taxes
Expected Result:
- Both tax amounts calculated and total reflects sum
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-015
Title: Tax rounding to currency precision
Module: Sales - Invoices
Preconditions: Currency has 2 decimals
Test Data: Item price 0.99, tax 18%
Steps to Reproduce:
1) Add item with price 0.99
2) Apply 18% tax
Expected Result:
- Tax rounded consistently to 2 decimals and total matches
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-016
Title: Invoice total rounding with multiple line items
Module: Sales - Invoices
Preconditions: Currency has 2 decimals
Test Data: Three items with fractional totals
Steps to Reproduce:
1) Add three items with fractional totals
2) Save invoice
Expected Result:
- Subtotal, tax, and total rounding consistent across lines and invoice
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-017
Title: Negative quantity validation
Module: Sales - Invoices
Preconditions: Invoice form available
Test Data: Qty = -1
Steps to Reproduce:
1) Add line item
2) Enter quantity -1
3) Save invoice
Expected Result:
- Validation error and save blocked
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-INV-018
Title: Zero quantity validation
Module: Sales - Invoices
Preconditions: Invoice form available
Test Data: Qty = 0
Steps to Reproduce:
1) Add line item
2) Enter quantity 0
3) Save invoice
Expected Result:
- Validation error and save blocked
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-INV-019
Title: Negative price validation
Module: Sales - Invoices
Preconditions: Invoice form available
Test Data: Price = -100
Steps to Reproduce:
1) Add line item
2) Enter price -100
3) Save invoice
Expected Result:
- Validation error and save blocked
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-INV-020
Title: Item price override audit
Module: Sales - Invoices
Preconditions: Item has default price; override allowed
Test Data: Default price 100, override 80
Steps to Reproduce:
1) Add item with default price
2) Override price to 80
3) Save invoice
Expected Result:
- Invoice saves with override price and audit/log captured if supported
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional
ID: HB-INV-021
Title: Discount percent validation above 100%
Module: Sales - Invoices
Preconditions: Discount field editable
Test Data: 150%
Steps to Reproduce:
1) Add item
2) Enter discount 150%
3) Save invoice
Expected Result:
- Validation error shown and save blocked
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-INV-022
Title: Fixed discount greater than subtotal
Module: Sales - Invoices
Preconditions: Invoice discount available
Test Data: Subtotal 100, discount 150
Steps to Reproduce:
1) Add item subtotal 100
2) Apply invoice discount 150
3) Save invoice
Expected Result:
- Validation error or total floors at 0 per business rules
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-INV-023
Title: Apply credit note to invoice
Module: Sales - Invoices
Preconditions: Credit note exists
Test Data: Credit note 50 against invoice total 200
Steps to Reproduce:
1) Open invoice
2) Apply credit note
Expected Result:
- Invoice balance reduces by credit note amount and ledger updated
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-024
Title: Credit note exceeds invoice balance
Module: Sales - Invoices
Preconditions: Credit note exists
Test Data: Credit note 250 against invoice total 200
Steps to Reproduce:
1) Apply credit note to invoice
Expected Result:
- System prevents over-application or creates remaining credit balance
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-INV-025
Title: Record full payment
Module: Sales - Invoices
Preconditions: Sent invoice exists
Test Data: Payment amount equals total
Steps to Reproduce:
1) Open invoice
2) Record payment for full amount
Expected Result:
- Status changes to Paid; ledger updated
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-026
Title: Record partial payment
Module: Sales - Invoices
Preconditions: Sent invoice exists
Test Data: Payment amount less than total
Steps to Reproduce:
1) Open invoice
2) Record partial payment
Expected Result:
- Status changes to Partially Paid; balance updates
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-027
Title: Overpayment validation
Module: Sales - Invoices
Preconditions: Sent invoice exists
Test Data: Payment amount greater than total
Steps to Reproduce:
1) Open invoice
2) Enter payment greater than total
3) Save payment
Expected Result:
- System blocks overpayment or creates credit balance per rules
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-INV-028
Title: Payment allocation across multiple invoices
Module: Sales - Invoices
Preconditions: Customer has multiple open invoices
Test Data: Payment amount covers two invoices
Steps to Reproduce:
1) Open customer payment screen
2) Allocate payment across invoices
Expected Result:
- Allocation totals match payment amount and balances update correctly
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-029
Title: Unapplied payment handling
Module: Sales - Invoices
Preconditions: Customer payment module available
Test Data: Payment received without invoice selection
Steps to Reproduce:
1) Record payment without applying to any invoice
Expected Result:
- Payment stored as unapplied credit and visible in customer balance
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-INV-030
Title: Write-off small balance
Module: Sales - Invoices
Preconditions: Invoice with small remaining balance; write-off enabled
Test Data: Remaining balance 0.01
Steps to Reproduce:
1) Open invoice
2) Write off remaining balance
Expected Result:
- Balance becomes zero and write-off recorded in ledger
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-INV-031
Title: Reverse or delete payment
Module: Sales - Invoices
Preconditions: Payment recorded for invoice
Test Data: Payment entry
Steps to Reproduce:
1) Open invoice payments
2) Reverse or delete payment
Expected Result:
- Invoice balance restores and ledger entries reversed
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-032
Title: Change tax rate after partial payment
Module: Sales - Invoices
Preconditions: Partial payment exists; invoice editable
Test Data: Change tax from 5% to 10%
Steps to Reproduce:
1) Edit invoice tax rate
2) Save changes
Expected Result:
- Totals and balance recalculated correctly; payment remains applied
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-033
Title: Backdated invoice posting
Module: Sales - Invoices
Preconditions: Accounting period open; backdate allowed
Test Data: Invoice date in previous month
Steps to Reproduce:
1) Create invoice with backdated date
2) Save invoice
Expected Result:
- Invoice posts to correct period and appears in aging
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-034
Title: Prevent posting into closed period
Module: Sales - Invoices
Preconditions: Accounting period closed
Test Data: Invoice date in closed period
Steps to Reproduce:
1) Create invoice with closed period date
2) Save invoice
Expected Result:
- System blocks posting and shows clear message
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-INV-035
Title: Invoice currency matches customer currency
Module: Sales - Invoices
Preconditions: Customer has currency set
Test Data: Customer currency EUR
Steps to Reproduce:
1) Create invoice for customer
2) Observe currency
Expected Result:
- Invoice currency defaults to customer currency and totals follow
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-INV-036
Title: Multi-currency exchange rate application
Module: Sales - Invoices
Preconditions: Multi-currency enabled; exchange rate configured
Test Data: Invoice currency EUR, base USD, rate 1.10
Steps to Reproduce:
1) Create invoice in EUR
2) Save invoice
Expected Result:
- Base currency amounts calculated using stored rate
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-037
Title: Lock exchange rate after posting
Module: Sales - Invoices
Preconditions: Invoice posted
Test Data: Change exchange rate after posting
Steps to Reproduce:
1) Open posted invoice
2) Attempt to edit exchange rate
Expected Result:
- Exchange rate is locked or changes require reversal
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-INV-038
Title: Shipping and handling affects tax
Module: Sales - Invoices
Preconditions: Shipping field available; tax on shipping enabled
Test Data: Shipping 20, tax 10%
Steps to Reproduce:
1) Add shipping 20
2) Apply tax
Expected Result:
- Tax includes shipping when configured
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-INV-039
Title: Shipping not taxed when disabled
Module: Sales - Invoices
Preconditions: Shipping field available; tax on shipping disabled
Test Data: Shipping 20, tax 10%
Steps to Reproduce:
1) Add shipping 20
2) Apply tax
Expected Result:
- Tax excludes shipping amount
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-INV-040
Title: Early payment discount terms
Module: Sales - Invoices
Preconditions: Payment terms support early discount
Test Data: 2% if paid within 10 days
Steps to Reproduce:
1) Create invoice with early discount terms
2) Record payment within 10 days
Expected Result:
- Discount applied correctly and balance becomes zero
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional
ID: HB-INV-041
Title: Late fee calculation
Module: Sales - Invoices
Preconditions: Late fee rules configured
Test Data: Overdue invoice
Steps to Reproduce:
1) Allow invoice to become overdue
2) Apply late fee
Expected Result:
- Late fee calculated correctly and balance updated
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-INV-042
Title: Prevent editing after invoice is paid
Module: Sales - Invoices
Preconditions: Invoice marked as Paid
Test Data: Try editing line item
Steps to Reproduce:
1) Open paid invoice
2) Attempt to edit
Expected Result:
- Edit is blocked or warning displayed
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-INV-043
Title: Void invoice reverses ledger impact
Module: Sales - Invoices
Preconditions: Posted invoice exists
Test Data: Void reason text
Steps to Reproduce:
1) Open invoice
2) Void invoice and confirm
Expected Result:
- Invoice status updates to Void and ledger entries reversed
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-044
Title: Delete draft invoice has no ledger impact
Module: Sales - Invoices
Preconditions: Draft invoice exists
Test Data: N/A
Steps to Reproduce:
1) Open draft invoice
2) Delete and confirm
Expected Result:
- Invoice removed and no accounting entries created
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-INV-045
Title: Aging report includes invoice correctly
Module: Sales - Invoices
Preconditions: Aging report available; invoice overdue
Test Data: Invoice due date past
Steps to Reproduce:
1) Open aging report
2) Find invoice
Expected Result:
- Invoice appears in correct aging bucket
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-046
Title: Customer balance updates after invoice creation
Module: Sales - Invoices
Preconditions: Customer has existing balance
Test Data: New invoice total 200
Steps to Reproduce:
1) Create invoice for customer
2) View customer balance
Expected Result:
- Balance increases by invoice total
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-047
Title: Customer balance updates after payment
Module: Sales - Invoices
Preconditions: Customer has open invoice
Test Data: Payment 100
Steps to Reproduce:
1) Record payment
2) View customer balance
Expected Result:
- Balance decreases by payment amount
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-048
Title: GL account mapping for sales
Module: Sales - Invoices
Preconditions: Items mapped to revenue accounts
Test Data: Item mapped to Sales-4000
Steps to Reproduce:
1) Create invoice with mapped item
2) Post invoice
Expected Result:
- Revenue posted to correct GL account
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-049
Title: Tax liability posted to correct account
Module: Sales - Invoices
Preconditions: Tax account configured
Test Data: Tax 10%
Steps to Reproduce:
1) Create invoice with tax
2) Post invoice
Expected Result:
- Tax liability posted to configured account
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-050
Title: Discounts posted to correct account
Module: Sales - Invoices
Preconditions: Discount account configured
Test Data: Invoice discount 5%
Steps to Reproduce:
1) Create invoice with discount
2) Post invoice
Expected Result:
- Discount posted to discount account, net revenue correct
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-051
Title: Attachment does not affect totals
Module: Sales - Invoices
Preconditions: Attachment feature available
Test Data: PDF attachment
Steps to Reproduce:
1) Attach file to invoice
2) Save invoice
Expected Result:
- Attachment saved and totals unchanged
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Functional

ID: HB-INV-052
Title: Invoice PDF totals match UI
Module: Sales - Invoices
Preconditions: Invoice exists
Test Data: Invoice with tax and discount
Steps to Reproduce:
1) Open invoice
2) Download PDF
Expected Result:
- PDF subtotal, tax, discount, and total match UI values
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-INV-053
Title: Copy invoice creates new number
Module: Sales - Invoices
Preconditions: Invoice exists; copy action available
Test Data: N/A
Steps to Reproduce:
1) Open invoice
2) Click Copy
Expected Result:
- New invoice created with new number and same line items
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-INV-054
Title: Prevent negative invoice total
Module: Sales - Invoices
Preconditions: Discount fields available
Test Data: Subtotal 100, discount 150
Steps to Reproduce:
1) Apply excessive discount
2) Save invoice
Expected Result:
- System prevents negative total or floors at zero
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-INV-055
Title: Invoice status changes to Overdue
Module: Sales - Invoices
Preconditions: Invoice sent with past due date
Test Data: Due date in past
Steps to Reproduce:
1) Open invoice list
Expected Result:
- Status shows Overdue
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-INV-056
Title: Search invoices by number
Module: Sales - Invoices
Preconditions: Multiple invoices exist
Test Data: Invoice number
Steps to Reproduce:
1) Use search box with invoice number
Expected Result:
- Matching invoice displayed
Actual Result:
Current Result:
Not executed
Priority: P2
Type: UI

ID: HB-INV-057
Title: Filter invoices by status
Module: Sales - Invoices
Preconditions: Invoices in different statuses
Test Data: Status = Paid
Steps to Reproduce:
1) Apply status filter
Expected Result:
- Only invoices with Paid status displayed
Actual Result:
Current Result:
Not executed
Priority: P2
Type: UI

ID: HB-INV-058
Title: Filter invoices by date range
Module: Sales - Invoices
Preconditions: Invoices across different dates
Test Data: Date range this month
Steps to Reproduce:
1) Apply date range filter
Expected Result:
- Invoices within range displayed
Actual Result:
Current Result:
Not executed
Priority: P2
Type: UI

ID: HB-INV-059
Title: Unauthorized direct URL access blocked
Module: Sales - Invoices
Preconditions: User logged out
Test Data: Invoice URL
Steps to Reproduce:
1) Open invoice URL directly
Expected Result:
- User redirected to login or shown access denied
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Security

ID: HB-INV-060
Title: XSS input blocked in invoice notes
Module: Sales - Invoices
Preconditions: Notes field available
Test Data: <script>alert(1)</script>
Steps to Reproduce:
1) Enter script tag in notes
2) Save invoice
3) Reopen invoice
Expected Result:
- Script is sanitized and not executed
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Security

ID: HB-INV-061
Title: Keyboard navigation on invoice list
Module: Sales - Invoices
Preconditions: Invoices list open
Test Data: N/A
Steps to Reproduce:
1) Use Tab/Shift+Tab through controls
Expected Result:
- Focus order is logical and visible
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Accessibility

ID: HB-INV-062
Title: Accessible labels on invoice form
Module: Sales - Invoices
Preconditions: Invoice form open
Test Data: N/A
Steps to Reproduce:
1) Inspect labels with screen reader
Expected Result:
- Inputs have accessible names/labels
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Accessibility

ID: HB-INV-063
Title: Session timeout while editing invoice
Module: Sales - Invoices
Preconditions: Session timeout configured
Test Data: N/A
Steps to Reproduce:
1) Start editing invoice
2) Wait for session timeout
3) Attempt to save
Expected Result:
- User prompted to re-login and data handling is clear
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-INV-064
Title: Concurrent edit conflict handling
Module: Sales - Invoices
Preconditions: Same invoice open in two sessions
Test Data: Edit in both sessions
Steps to Reproduce:
1) Edit invoice in session A and save
2) Edit invoice in session B and save
Expected Result:
- Conflict is handled with clear messaging
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-INV-065
Title: Currency formatting on totals
Module: Sales - Invoices
Preconditions: Invoice form available
Test Data: Item total 1234.5
Steps to Reproduce:
1) Add item with price 1234.5
Expected Result:
- Totals display with correct currency format
Actual Result:
Current Result:
Not executed
Priority: P3
Type: UI

ID: HB-INV-066
Title: Notes and terms saved on invoice
Module: Sales - Invoices
Preconditions: Notes/terms fields available
Test Data: Terms text
Steps to Reproduce:
1) Enter notes/terms
2) Save invoice
Expected Result:
- Notes/terms visible on invoice and PDF
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-INV-067
Title: Invoice list status badge accurate
Module: Sales - Invoices
Preconditions: Invoices in different statuses
Test Data: Draft, Sent, Paid
Steps to Reproduce:
1) Open invoice list
Expected Result:
- Each invoice shows correct status
Actual Result:
Current Result:
Not executed
Priority: P2
Type: UI

ID: HB-INV-068
Title: Export invoice list totals
Module: Sales - Invoices
Preconditions: Export option available
Test Data: CSV export
Steps to Reproduce:
1) Click Export
2) Choose CSV
Expected Result:
- Exported totals match UI totals and tax/discount columns correct
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-INV-069
Title: Invoice summary totals match list
Module: Sales - Invoices
Preconditions: Invoices list with summary totals
Test Data: Multiple invoices
Steps to Reproduce:
1) Open invoice list
2) Compare list summary totals with sum of rows
Expected Result:
- Summary totals match row totals
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-INV-070
Title: Line item description length limit
Module: Sales - Invoices
Preconditions: Invoice form available
Test Data: 300+ characters description
Steps to Reproduce:
1) Enter long description
2) Save invoice
Expected Result:
- Description is limited or validated without breaking layout
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Negative

## Quotes

ID: HB-QUO-001
Title: Open quotes list
Module: Sales - Quotes
Preconditions: User logged in with valid access to Sales
Test Data: N/A
Steps to Reproduce:
1) Navigate to Sales
2) Open Quotes list
Expected Result:
- Quotes list loads with no errors
Actual Result:
Current Result:
Not executed
Priority: P1
Type: UI

ID: HB-QUO-002
Title: Create quote with required fields
Module: Sales - Quotes
Preconditions: User logged in; at least one customer and one item exist
Test Data: Customer A, Item 1, Qty 1, Price 100
Steps to Reproduce:
1) Open Quotes list
2) Click New Quote
3) Select Customer A and add Item 1
4) Save quote
Expected Result:
- Quote is created and visible in list
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-QUO-003
Title: Required field validation on quote
Module: Sales - Quotes
Preconditions: User logged in
Test Data: Leave customer and items empty
Steps to Reproduce:
1) Click New Quote
2) Attempt to save without required fields
Expected Result:
- Validation errors displayed and save blocked
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-QUO-004
Title: Auto-generate quote number
Module: Sales - Quotes
Preconditions: User logged in
Test Data: N/A
Steps to Reproduce:
1) Click New Quote
2) Observe quote number field
Expected Result:
- Quote number is auto-generated and unique
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-QUO-005
Title: Duplicate quote number validation
Module: Sales - Quotes
Preconditions: Existing quote with number QUO-10001
Test Data: QUO-10001
Steps to Reproduce:
1) Click New Quote
2) Enter QUO-10001
3) Save quote
Expected Result:
- System blocks save and shows duplicate number error
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-QUO-006
Title: Add multiple line items to quote
Module: Sales - Quotes
Preconditions: At least two items exist
Test Data: Item 1 Qty 1, Item 2 Qty 2
Steps to Reproduce:
1) Add Item 1 and Item 2
2) Save quote
Expected Result:
- Both items are listed and totals are correct
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-QUO-007
Title: Discount and tax calculation on quote
Module: Sales - Quotes
Preconditions: Discount and tax available
Test Data: 10% discount, VAT 10%
Steps to Reproduce:
1) Add items
2) Apply discount and tax
Expected Result:
- Totals reflect discount and tax correctly
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-QUO-008
Title: Quote date default
Module: Sales - Quotes
Preconditions: User logged in
Test Data: N/A
Steps to Reproduce:
1) Click New Quote
Expected Result:
- Quote date defaults to current date
Actual Result:
Current Result:
Not executed
Priority: P3
Type: UI

ID: HB-QUO-009
Title: Expiration date after quote date
Module: Sales - Quotes
Preconditions: User logged in
Test Data: Quote date today, expiry today+14
Steps to Reproduce:
1) Set quote date to today
2) Set expiry date to today+14
3) Save quote
Expected Result:
- Quote saved with correct expiry date
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-QUO-010
Title: Expiration date before quote date validation
Module: Sales - Quotes
Preconditions: User logged in
Test Data: Quote date today, expiry yesterday
Steps to Reproduce:
1) Set quote date to today
2) Set expiry date to yesterday
3) Save quote
Expected Result:
- Validation error shown for expiry date
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-QUO-011
Title: Save quote as draft
Module: Sales - Quotes
Preconditions: Draft status supported
Test Data: Customer A, Item 1
Steps to Reproduce:
1) Create quote
2) Save as draft
Expected Result:
- Quote saved with Draft status
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-QUO-012
Title: Send quote to customer
Module: Sales - Quotes
Preconditions: Quote exists; email configured
Test Data: Customer email
Steps to Reproduce:
1) Open quote
2) Click Send
Expected Result:
- Quote is sent and status updates accordingly
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-QUO-013
Title: Download or print quote PDF
Module: Sales - Quotes
Preconditions: Quote exists
Test Data: N/A
Steps to Reproduce:
1) Open quote
2) Click Download/Print
Expected Result:
- PDF generated and matches quote data
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-QUO-014
Title: Edit quote before acceptance
Module: Sales - Quotes
Preconditions: Draft or Sent quote exists
Test Data: Update item quantity
Steps to Reproduce:
1) Open quote
2) Edit line item
3) Save
Expected Result:
- Quote updated with new values
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-QUO-015
Title: Convert accepted quote to invoice
Module: Sales - Quotes
Preconditions: Quote exists and is accepted
Test Data: N/A
Steps to Reproduce:
1) Open accepted quote
2) Click Convert to Invoice
Expected Result:
- Invoice created with quote data and totals preserved
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-QUO-016
Title: Accepted quote totals match invoice totals
Module: Sales - Quotes
Preconditions: Accepted quote converted to invoice
Test Data: Quote with tax and discount
Steps to Reproduce:
1) Convert quote to invoice
2) Compare totals
Expected Result:
- Invoice totals exactly match accepted quote totals
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-QUO-017
Title: Accept quote (customer action)
Module: Sales - Quotes
Preconditions: Quote sent to customer
Test Data: N/A
Steps to Reproduce:
1) Open quote link as customer
2) Accept quote
Expected Result:
- Quote status changes to Accepted
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-QUO-018
Title: Reject quote (customer action)
Module: Sales - Quotes
Preconditions: Quote sent to customer
Test Data: Rejection reason
Steps to Reproduce:
1) Open quote link as customer
2) Reject quote and provide reason
Expected Result:
- Quote status changes to Rejected
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-QUO-019
Title: Expired quote status update
Module: Sales - Quotes
Preconditions: Quote with past expiry date
Test Data: N/A
Steps to Reproduce:
1) Open quotes list
Expected Result:
- Quote shows Expired status
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-QUO-020
Title: Delete draft quote
Module: Sales - Quotes
Preconditions: Draft quote exists
Test Data: N/A
Steps to Reproduce:
1) Open draft quote
2) Delete and confirm
Expected Result:
- Quote removed from list
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional
ID: HB-QUO-021
Title: Quote totals rounding consistency
Module: Sales - Quotes
Preconditions: Currency has 2 decimals
Test Data: Items with fractional prices and taxes
Steps to Reproduce:
1) Add items with fractional prices
2) Apply tax and discount
Expected Result:
- Subtotal, tax, discount, and total rounding consistent
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-QUO-022
Title: Negative quantity validation on quote
Module: Sales - Quotes
Preconditions: Quote form available
Test Data: Qty = -1
Steps to Reproduce:
1) Add line item
2) Enter quantity -1
3) Save quote
Expected Result:
- Validation error shown and save blocked
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-QUO-023
Title: Discount above 100% validation on quote
Module: Sales - Quotes
Preconditions: Discount field editable
Test Data: 150%
Steps to Reproduce:
1) Add item
2) Enter discount 150%
3) Save quote
Expected Result:
- Validation error shown and save blocked
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-QUO-024
Title: Fixed discount greater than subtotal
Module: Sales - Quotes
Preconditions: Quote discount available
Test Data: Subtotal 100, discount 150
Steps to Reproduce:
1) Add item subtotal 100
2) Apply discount 150
3) Save quote
Expected Result:
- Validation error or total floors at 0 per business rules
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-QUO-025
Title: Quote currency matches customer currency
Module: Sales - Quotes
Preconditions: Customer has currency set
Test Data: Customer currency EUR
Steps to Reproduce:
1) Create quote for customer
2) Observe currency
Expected Result:
- Quote currency defaults to customer currency
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-QUO-026
Title: Multi-currency quote exchange rate
Module: Sales - Quotes
Preconditions: Multi-currency enabled
Test Data: Quote currency EUR, base USD, rate 1.10
Steps to Reproduce:
1) Create quote in EUR
2) Save quote
Expected Result:
- Base currency amounts calculated using rate
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-QUO-027
Title: Quote PDF totals match UI
Module: Sales - Quotes
Preconditions: Quote exists
Test Data: Quote with tax and discount
Steps to Reproduce:
1) Open quote
2) Download PDF
Expected Result:
- PDF totals match UI totals
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-QUO-028
Title: Search quotes by number
Module: Sales - Quotes
Preconditions: Multiple quotes exist
Test Data: Quote number
Steps to Reproduce:
1) Use search box with quote number
Expected Result:
- Matching quote displayed
Actual Result:
Current Result:
Not executed
Priority: P2
Type: UI

ID: HB-QUO-029
Title: Filter quotes by status
Module: Sales - Quotes
Preconditions: Quotes in different statuses
Test Data: Status = Accepted
Steps to Reproduce:
1) Apply status filter
Expected Result:
- Only quotes with Accepted status displayed
Actual Result:
Current Result:
Not executed
Priority: P2
Type: UI

ID: HB-QUO-030
Title: Filter quotes by date range
Module: Sales - Quotes
Preconditions: Quotes across different dates
Test Data: Date range this month
Steps to Reproduce:
1) Apply date range filter
Expected Result:
- Quotes within range displayed
Actual Result:
Current Result:
Not executed
Priority: P2
Type: UI

ID: HB-QUO-031
Title: Unauthorized direct URL access blocked
Module: Sales - Quotes
Preconditions: User logged out
Test Data: Quote URL
Steps to Reproduce:
1) Open quote URL directly
Expected Result:
- User redirected to login or shown access denied
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Security

ID: HB-QUO-032
Title: XSS input blocked in quote notes
Module: Sales - Quotes
Preconditions: Notes field available
Test Data: <script>alert(1)</script>
Steps to Reproduce:
1) Enter script tag in notes
2) Save quote
3) Reopen quote
Expected Result:
- Script is sanitized and not executed
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Security

ID: HB-QUO-033
Title: Keyboard navigation on quotes list
Module: Sales - Quotes
Preconditions: Quotes list open
Test Data: N/A
Steps to Reproduce:
1) Use Tab/Shift+Tab through controls
Expected Result:
- Focus order is logical and visible
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Accessibility

ID: HB-QUO-034
Title: Accessible labels on quote form
Module: Sales - Quotes
Preconditions: Quote form open
Test Data: N/A
Steps to Reproduce:
1) Inspect labels with screen reader
Expected Result:
- Inputs have accessible names/labels
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Accessibility

ID: HB-QUO-035
Title: Session timeout while editing quote
Module: Sales - Quotes
Preconditions: Session timeout configured
Test Data: N/A
Steps to Reproduce:
1) Start editing quote
2) Wait for session timeout
3) Attempt to save
Expected Result:
- User prompted to re-login and data handling is clear
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-QUO-036
Title: Concurrent edit conflict handling
Module: Sales - Quotes
Preconditions: Same quote open in two sessions
Test Data: Edit in both sessions
Steps to Reproduce:
1) Edit quote in session A and save
2) Edit quote in session B and save
Expected Result:
- Conflict is handled with clear messaging
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-QUO-037
Title: Currency formatting on quote totals
Module: Sales - Quotes
Preconditions: Quote form available
Test Data: Item total 1234.5
Steps to Reproduce:
1) Add item with price 1234.5
Expected Result:
- Totals display with correct currency format
Actual Result:
Current Result:
Not executed
Priority: P3
Type: UI

ID: HB-QUO-038
Title: Notes and terms saved on quote
Module: Sales - Quotes
Preconditions: Notes/terms fields available
Test Data: Terms text
Steps to Reproduce:
1) Enter notes/terms
2) Save quote
Expected Result:
- Notes/terms visible on quote and PDF
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-QUO-039
Title: Quote list status badge accurate
Module: Sales - Quotes
Preconditions: Quotes in different statuses
Test Data: Draft, Sent, Accepted
Steps to Reproduce:
1) Open quotes list
Expected Result:
- Each quote shows correct status
Actual Result:
Current Result:
Not executed
Priority: P2
Type: UI

ID: HB-QUO-040
Title: Quote line item description length limit
Module: Sales - Quotes
Preconditions: Quote form available
Test Data: 300+ characters description
Steps to Reproduce:
1) Enter long description
2) Save quote
Expected Result:
- Description is limited or validated without breaking layout
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Negative

## Delivery Challans

ID: HB-DC-001
Title: Open delivery challans list
Module: Sales - Delivery Challans
Preconditions: User logged in with valid access to Sales
Test Data: N/A
Steps to Reproduce:
1) Navigate to Sales
2) Open Delivery Challans list
Expected Result:
- Delivery challans list loads with no errors
Actual Result:
Current Result:
Not executed
Priority: P1
Type: UI

ID: HB-DC-002
Title: Create delivery challan with required fields
Module: Sales - Delivery Challans
Preconditions: User logged in; at least one customer and one item exist
Test Data: Customer A, Item 1, Qty 2
Steps to Reproduce:
1) Open Delivery Challans list
2) Click New Delivery Challan
3) Select Customer A and add Item 1 with Qty 2
4) Save challan
Expected Result:
- Delivery challan created and visible in list
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-DC-003
Title: Required field validation on delivery challan
Module: Sales - Delivery Challans
Preconditions: User logged in
Test Data: Leave customer and items empty
Steps to Reproduce:
1) Click New Delivery Challan
2) Attempt to save without required fields
Expected Result:
- Validation errors displayed and save blocked
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-DC-004
Title: Auto-generate delivery challan number
Module: Sales - Delivery Challans
Preconditions: User logged in
Test Data: N/A
Steps to Reproduce:
1) Click New Delivery Challan
2) Observe challan number field
Expected Result:
- Challan number is auto-generated and unique
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-DC-005
Title: Duplicate challan number validation
Module: Sales - Delivery Challans
Preconditions: Existing challan with number DC-10001
Test Data: DC-10001
Steps to Reproduce:
1) Create new challan
2) Enter DC-10001
3) Save challan
Expected Result:
- System blocks save and shows duplicate number error
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-DC-006
Title: Add multiple line items
Module: Sales - Delivery Challans
Preconditions: At least two items exist
Test Data: Item 1 Qty 1, Item 2 Qty 3
Steps to Reproduce:
1) Create new challan
2) Add Item 1 and Item 2
3) Save
Expected Result:
- Both items listed and quantities correct
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-DC-007
Title: Negative quantity validation
Module: Sales - Delivery Challans
Preconditions: Challan form available
Test Data: Qty = -1
Steps to Reproduce:
1) Add line item
2) Enter quantity -1
3) Save challan
Expected Result:
- Validation error shown and save blocked
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-DC-008
Title: Zero quantity validation
Module: Sales - Delivery Challans
Preconditions: Challan form available
Test Data: Qty = 0
Steps to Reproduce:
1) Add line item
2) Enter quantity 0
3) Save challan
Expected Result:
- Validation error shown and save blocked
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-DC-009
Title: Partial delivery tracking
Module: Sales - Delivery Challans
Preconditions: Sales order or invoice exists with Qty 10
Test Data: Deliver Qty 6
Steps to Reproduce:
1) Create challan against order/invoice
2) Set delivered quantity 6
3) Save challan
Expected Result:
- Challan saved with partial delivery status and remaining qty visible
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-DC-010
Title: Prevent delivery quantity exceeding ordered quantity
Module: Sales - Delivery Challans
Preconditions: Sales order or invoice exists with Qty 10
Test Data: Deliver Qty 12
Steps to Reproduce:
1) Create challan against order/invoice
2) Enter quantity 12
3) Save challan
Expected Result:
- Validation error shown and save blocked
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative
ID: HB-DC-011
Title: Link delivery challan to invoice
Module: Sales - Delivery Challans
Preconditions: Invoice exists for customer
Test Data: Invoice INV-10001
Steps to Reproduce:
1) Create challan
2) Link to INV-10001
3) Save challan
Expected Result:
- Challan linked and invoice shows delivery reference
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-DC-012
Title: Prevent invoice creation without delivery (if required)
Module: Sales - Delivery Challans
Preconditions: System requires delivery before invoicing
Test Data: New invoice without challan
Steps to Reproduce:
1) Attempt to create invoice without delivery challan
Expected Result:
- System blocks action or warns user
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Negative

ID: HB-DC-013
Title: Inventory impact on challan creation
Module: Sales - Delivery Challans
Preconditions: Inventory tracking enabled; stock available
Test Data: Item stock 10, deliver 4
Steps to Reproduce:
1) Create challan for item qty 4
2) Save challan
Expected Result:
- Inventory reduces by 4 and stock ledger updated
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-DC-014
Title: Prevent negative inventory on challan
Module: Sales - Delivery Challans
Preconditions: Inventory tracking enabled; stock 2
Test Data: Deliver Qty 5
Steps to Reproduce:
1) Create challan with qty 5
2) Save challan
Expected Result:
- System blocks delivery or warns of insufficient stock
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-DC-015
Title: Delivery challan does not post revenue
Module: Sales - Delivery Challans
Preconditions: GL integration enabled
Test Data: N/A
Steps to Reproduce:
1) Create and save delivery challan
2) Review GL postings
Expected Result:
- No revenue or receivable posted from challan alone
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-DC-016
Title: Delivery challan posting to inventory/COGS
Module: Sales - Delivery Challans
Preconditions: Perpetual inventory enabled
Test Data: Item cost 50, Qty 2
Steps to Reproduce:
1) Create challan for item qty 2
2) Save challan
Expected Result:
- Inventory reduced and COGS recognized if configured
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-DC-017
Title: Reverse challan restores inventory
Module: Sales - Delivery Challans
Preconditions: Challan posted; inventory reduced
Test Data: Void challan
Steps to Reproduce:
1) Open challan
2) Void/cancel challan
Expected Result:
- Inventory restored and stock ledger reversed
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-DC-018
Title: Edit challan after posting restrictions
Module: Sales - Delivery Challans
Preconditions: Challan posted
Test Data: Change quantity
Steps to Reproduce:
1) Open posted challan
2) Attempt to edit qty
Expected Result:
- Edit blocked or requires reversal per policy
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-DC-019
Title: Backdated challan posting
Module: Sales - Delivery Challans
Preconditions: Inventory period open
Test Data: Challan date in previous month
Steps to Reproduce:
1) Create challan with backdated date
2) Save
Expected Result:
- Stock ledger posts to correct period
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-DC-020
Title: Prevent posting into closed period
Module: Sales - Delivery Challans
Preconditions: Inventory period closed
Test Data: Challan date in closed period
Steps to Reproduce:
1) Create challan with closed period date
2) Save
Expected Result:
- System blocks posting and shows clear message
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-DC-021
Title: Delivery challan PDF matches UI
Module: Sales - Delivery Challans
Preconditions: Challan exists
Test Data: N/A
Steps to Reproduce:
1) Open challan
2) Download PDF
Expected Result:
- PDF quantities and items match UI
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-DC-022
Title: Search challans by number
Module: Sales - Delivery Challans
Preconditions: Multiple challans exist
Test Data: Challan number
Steps to Reproduce:
1) Use search box with challan number
Expected Result:
- Matching challan displayed
Actual Result:
Current Result:
Not executed
Priority: P2
Type: UI

ID: HB-DC-023
Title: Filter challans by status
Module: Sales - Delivery Challans
Preconditions: Challans in different statuses
Test Data: Status = Delivered
Steps to Reproduce:
1) Apply status filter
Expected Result:
- Only challans with Delivered status displayed
Actual Result:
Current Result:
Not executed
Priority: P2
Type: UI

ID: HB-DC-024
Title: Unauthorized direct URL access blocked
Module: Sales - Delivery Challans
Preconditions: User logged out
Test Data: Challan URL
Steps to Reproduce:
1) Open challan URL directly
Expected Result:
- User redirected to login or shown access denied
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Security

ID: HB-DC-025
Title: XSS input blocked in challan notes
Module: Sales - Delivery Challans
Preconditions: Notes field available
Test Data: <script>alert(1)</script>
Steps to Reproduce:
1) Enter script tag in notes
2) Save challan
3) Reopen challan
Expected Result:
- Script is sanitized and not executed
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Security

## Recurring Invoices

ID: HB-RI-001
Title: Open recurring invoices list
Module: Sales - Recurring Invoices
Preconditions: User logged in with valid access to Sales
Test Data: N/A
Steps to Reproduce:
1) Navigate to Sales
2) Open Recurring Invoices list
Expected Result:
- Recurring invoices list loads with no errors
Actual Result:
Current Result:
Not executed
Priority: P1
Type: UI

ID: HB-RI-002
Title: Create recurring invoice with required fields
Module: Sales - Recurring Invoices
Preconditions: User logged in; customer and item exist
Test Data: Customer A, Item 1, Qty 1, Price 100, Frequency Monthly
Steps to Reproduce:
1) Open Recurring Invoices list
2) Click New Recurring Invoice
3) Fill required fields and save
Expected Result:
- Recurring invoice schedule created
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-RI-003
Title: Required field validation on recurring invoice
Module: Sales - Recurring Invoices
Preconditions: User logged in
Test Data: Leave customer and items empty
Steps to Reproduce:
1) Create recurring invoice
2) Attempt to save without required fields
Expected Result:
- Validation errors displayed and save blocked
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-RI-004
Title: Recurrence schedule starts on correct date
Module: Sales - Recurring Invoices
Preconditions: Schedule options available
Test Data: Start date today, monthly
Steps to Reproduce:
1) Create recurring invoice with start date today
2) Save schedule
Expected Result:
- Next run date is calculated correctly
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-RI-005
Title: Recurrence schedule end date handling
Module: Sales - Recurring Invoices
Preconditions: End date available
Test Data: Start today, end in 3 months
Steps to Reproduce:
1) Create recurring invoice with end date
2) Save schedule
Expected Result:
- Schedule stops after end date and no further invoices generated
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-RI-006
Title: Prevent end date before start date
Module: Sales - Recurring Invoices
Preconditions: End date editable
Test Data: Start today, end yesterday
Steps to Reproduce:
1) Create recurring invoice
2) Set end date before start date
3) Save
Expected Result:
- Validation error shown and save blocked
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative
ID: HB-RI-007
Title: Recurring invoice generates invoice with correct totals
Module: Sales - Recurring Invoices
Preconditions: Schedule active; items with tax/discount
Test Data: Item price 100, discount 10%, tax 10%
Steps to Reproduce:
1) Run schedule or wait for next run
2) Open generated invoice
Expected Result:
- Generated invoice totals match schedule settings
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-RI-008
Title: Recurring invoice uses customer currency
Module: Sales - Recurring Invoices
Preconditions: Customer has currency set
Test Data: Customer currency EUR
Steps to Reproduce:
1) Create recurring invoice for customer
2) Generate invoice
Expected Result:
- Generated invoice uses customer currency and correct rate
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-RI-009
Title: Exchange rate locked on generated invoice
Module: Sales - Recurring Invoices
Preconditions: Multi-currency enabled
Test Data: EUR to USD rate 1.10
Steps to Reproduce:
1) Generate invoice from recurring schedule
2) Open generated invoice
Expected Result:
- Exchange rate stored and not recalculated later
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-RI-010
Title: Pause recurring invoice schedule
Module: Sales - Recurring Invoices
Preconditions: Schedule active
Test Data: N/A
Steps to Reproduce:
1) Open recurring invoice
2) Pause schedule
Expected Result:
- No invoices generated while paused
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-RI-011
Title: Resume recurring invoice schedule
Module: Sales - Recurring Invoices
Preconditions: Schedule paused
Test Data: N/A
Steps to Reproduce:
1) Resume schedule
2) Wait for next run
Expected Result:
- Invoices generate on next scheduled date
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-RI-012
Title: Modify recurring invoice line items
Module: Sales - Recurring Invoices
Preconditions: Schedule active
Test Data: Change item quantity
Steps to Reproduce:
1) Edit recurring invoice
2) Change line item quantity
3) Save
Expected Result:
- Future invoices use updated quantity
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-RI-013
Title: Recurring invoice tax rate update
Module: Sales - Recurring Invoices
Preconditions: Tax rate editable
Test Data: Change tax from 5% to 10%
Steps to Reproduce:
1) Edit recurring invoice tax rate
2) Save
Expected Result:
- Future invoices use updated tax rate
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-RI-014
Title: Prevent overlapping schedules for same customer and item
Module: Sales - Recurring Invoices
Preconditions: Schedule exists
Test Data: Same customer and item, same period
Steps to Reproduce:
1) Create another recurring invoice with same schedule
2) Save
Expected Result:
- System warns or allows with clear duplication notice
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Negative

ID: HB-RI-015
Title: Recurring invoice posting to correct period
Module: Sales - Recurring Invoices
Preconditions: Accounting period open
Test Data: Schedule run on month end
Steps to Reproduce:
1) Run schedule on month end
2) Review posting period
Expected Result:
- Invoice posts in correct accounting period
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-RI-016
Title: Prevent generation into closed period
Module: Sales - Recurring Invoices
Preconditions: Accounting period closed
Test Data: Schedule run date in closed period
Steps to Reproduce:
1) Run schedule
Expected Result:
- Generation blocked with clear message
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-RI-017
Title: Recurring invoice numbering sequence
Module: Sales - Recurring Invoices
Preconditions: Invoice numbering configured
Test Data: N/A
Steps to Reproduce:
1) Generate invoice from schedule
2) Check invoice number
Expected Result:
- Invoice number follows sequence and is unique
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-RI-018
Title: Automatic email on generated invoice
Module: Sales - Recurring Invoices
Preconditions: Auto-email enabled; customer email exists
Test Data: N/A
Steps to Reproduce:
1) Generate invoice
2) Check email log
Expected Result:
- Invoice emailed to customer and logged
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-RI-019
Title: Recurring invoice stops after max count
Module: Sales - Recurring Invoices
Preconditions: Max occurrences configured
Test Data: Max count 3
Steps to Reproduce:
1) Create schedule with max count 3
2) Run schedule through 3 cycles
Expected Result:
- No invoice generated on 4th cycle
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-RI-020
Title: Recurring invoice audit log
Module: Sales - Recurring Invoices
Preconditions: Audit log enabled
Test Data: Edit schedule
Steps to Reproduce:
1) Edit recurring invoice
2) Save
Expected Result:
- Audit log captures change details
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

## Payments Received

ID: HB-PR-001
Title: Open payments received list
Module: Sales - Payments Received
Preconditions: User logged in with valid access to Sales
Test Data: N/A
Steps to Reproduce:
1) Navigate to Sales
2) Open Payments Received list
Expected Result:
- Payments list loads with no errors
Actual Result:
Current Result:
Not executed
Priority: P1
Type: UI

ID: HB-PR-002
Title: Record payment against single invoice
Module: Sales - Payments Received
Preconditions: Invoice exists and is unpaid
Test Data: Invoice INV-10001, Amount = full total
Steps to Reproduce:
1) Open Payments Received
2) Click New Payment
3) Select customer and invoice
4) Enter full amount and save
Expected Result:
- Payment saved and invoice marked Paid
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-PR-003
Title: Record partial payment against invoice
Module: Sales - Payments Received
Preconditions: Invoice exists and is unpaid
Test Data: Amount less than total
Steps to Reproduce:
1) Create payment
2) Enter partial amount
3) Save
Expected Result:
- Invoice marked Partially Paid and balance updated
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-PR-004
Title: Overpayment handling
Module: Sales - Payments Received
Preconditions: Invoice exists
Test Data: Amount greater than invoice total
Steps to Reproduce:
1) Create payment
2) Enter amount greater than total
3) Save
Expected Result:
- System blocks overpayment or creates customer credit
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-PR-005
Title: Apply payment to multiple invoices
Module: Sales - Payments Received
Preconditions: Customer has multiple open invoices
Test Data: Payment amount covers two invoices
Steps to Reproduce:
1) Create payment for customer
2) Allocate across invoices
3) Save
Expected Result:
- Allocation totals match payment amount and balances update correctly
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-PR-006
Title: Unapplied payment recorded as credit
Module: Sales - Payments Received
Preconditions: Customer exists
Test Data: Payment without invoice selection
Steps to Reproduce:
1) Create payment without selecting invoices
2) Save
Expected Result:
- Payment stored as unapplied credit for customer
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-PR-007
Title: Payment date in closed period validation
Module: Sales - Payments Received
Preconditions: Accounting period closed
Test Data: Payment date in closed period
Steps to Reproduce:
1) Create payment with closed period date
2) Save
Expected Result:
- System blocks posting and shows clear message
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-PR-008
Title: Backdated payment posts to correct period
Module: Sales - Payments Received
Preconditions: Accounting period open
Test Data: Payment date in previous month
Steps to Reproduce:
1) Create payment with backdated date
2) Save
Expected Result:
- Payment posts to correct period and aging updates
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-PR-009
Title: Payment method required validation
Module: Sales - Payments Received
Preconditions: Payment method field required
Test Data: Leave payment method empty
Steps to Reproduce:
1) Create payment
2) Attempt to save without method
Expected Result:
- Validation error shown and save blocked
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-PR-010
Title: Payment reference number validation
Module: Sales - Payments Received
Preconditions: Reference field required
Test Data: Empty reference
Steps to Reproduce:
1) Create payment
2) Leave reference empty and save
Expected Result:
- Validation error shown
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Negative

ID: HB-PR-011
Title: Duplicate payment reference handling
Module: Sales - Payments Received
Preconditions: Payment exists with reference REF-100
Test Data: REF-100
Steps to Reproduce:
1) Create payment
2) Enter reference REF-100
3) Save
Expected Result:
- System blocks or warns on duplicate reference
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Negative

ID: HB-PR-012
Title: Bank account mapping for payment
Module: Sales - Payments Received
Preconditions: Bank accounts configured
Test Data: Select Bank-001
Steps to Reproduce:
1) Create payment
2) Select Bank-001
3) Save
Expected Result:
- Payment posts to correct bank GL account
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-PR-013
Title: Payment applied reduces AR correctly
Module: Sales - Payments Received
Preconditions: GL integration enabled
Test Data: Payment amount 100
Steps to Reproduce:
1) Apply payment to invoice
2) Review GL postings
Expected Result:
- AR reduced and cash/bank increased by payment amount
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-PR-014
Title: Reverse payment restores AR
Module: Sales - Payments Received
Preconditions: Payment recorded
Test Data: Reverse payment entry
Steps to Reproduce:
1) Open payment
2) Reverse or delete
Expected Result:
- AR and bank entries reversed; invoice balance restored
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-PR-015
Title: Apply customer credit to invoice
Module: Sales - Payments Received
Preconditions: Customer has existing credit
Test Data: Credit 50 applied to invoice 200
Steps to Reproduce:
1) Open payment/credit screen
2) Apply credit to invoice
Expected Result:
- Invoice balance reduced and credit balance updated
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-PR-016
Title: Prevent credit application exceeding invoice balance
Module: Sales - Payments Received
Preconditions: Customer credit exists
Test Data: Credit 250 against invoice balance 200
Steps to Reproduce:
1) Apply credit to invoice
Expected Result:
- System prevents over-application or leaves remaining credit
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-PR-017
Title: Payment allocation rounding
Module: Sales - Payments Received
Preconditions: Multiple invoices with fractional amounts
Test Data: Payment 100.00 across invoices 33.33, 33.33, 33.34
Steps to Reproduce:
1) Allocate payment across invoices
2) Save
Expected Result:
- Allocation totals equal payment and rounding consistent
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-PR-018
Title: Payment receipt PDF matches UI
Module: Sales - Payments Received
Preconditions: Payment recorded
Test Data: N/A
Steps to Reproduce:
1) Open payment
2) Download receipt PDF
Expected Result:
- Receipt totals and allocations match UI
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-PR-019
Title: Search payments by reference
Module: Sales - Payments Received
Preconditions: Multiple payments exist
Test Data: Reference number
Steps to Reproduce:
1) Search by reference number
Expected Result:
- Matching payment displayed
Actual Result:
Current Result:
Not executed
Priority: P2
Type: UI

ID: HB-PR-020
Title: Filter payments by date range
Module: Sales - Payments Received
Preconditions: Payments across different dates
Test Data: Date range this month
Steps to Reproduce:
1) Apply date range filter
Expected Result:
- Payments within range displayed
Actual Result:
Current Result:
Not executed
Priority: P2
Type: UI

ID: HB-PR-021
Title: Unauthorized direct URL access blocked
Module: Sales - Payments Received
Preconditions: User logged out
Test Data: Payment URL
Steps to Reproduce:
1) Open payment URL directly
Expected Result:
- User redirected to login or shown access denied
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Security

ID: HB-PR-022
Title: XSS input blocked in payment notes
Module: Sales - Payments Received
Preconditions: Notes field available
Test Data: <script>alert(1)</script>
Steps to Reproduce:
1) Enter script tag in notes
2) Save payment
3) Reopen payment
Expected Result:
- Script is sanitized and not executed
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Security

ID: HB-PR-023
Title: Keyboard navigation on payments list
Module: Sales - Payments Received
Preconditions: Payments list open
Test Data: N/A
Steps to Reproduce:
1) Use Tab/Shift+Tab through controls
Expected Result:
- Focus order is logical and visible
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Accessibility

ID: HB-PR-024
Title: Accessible labels on payment form
Module: Sales - Payments Received
Preconditions: Payment form open
Test Data: N/A
Steps to Reproduce:
1) Inspect labels with screen reader
Expected Result:
- Inputs have accessible names/labels
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Accessibility
