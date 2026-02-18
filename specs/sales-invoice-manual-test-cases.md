
# Manual Test Cases - Sales Invoices (HelloBooks.ai)

Format used here is automation-ready for later conversion to Playwright.

---

- ID: HB-SALES-INV-001
- Title: Navigate to New Invoice and verify required fields
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: N/A
- Steps to Reproduce:
  1) Navigate to Sales > Invoices
  2) Click Create Invoice
  3) Observe the form layout
- Expected Result:
  - Form displays Customer (required), Invoice No. (required), Date, Due Date, Reference, Currency, Tax handling, Line items table, Early Payment Discount, Late Fee, Notes, Terms, Planned Payment Date, Attachments, and actions (Cancel, Save & close, Approve if present)
  - Accounting Impact: None (no GL posting until saved/approved)
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
- Automation Notes: Confirm required fields are marked with * if applicable

---

- ID: HB-SALES-INV-002
- Title: Customer field is mandatory
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: N/A
- Steps to Reproduce:
  1) Open New Invoice form
  2) Leave Customer blank
  3) Attempt Save & close
- Expected Result:
  - Save is blocked with a validation message such as "Please select a customer"
  - Accounting Impact: Invoice cannot be created without customer linkage to AR
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Negative / Functional
- Automation Notes: Use field-level error or disabled Save assertion

---

- ID: HB-SALES-INV-003
- Title: Invoice number auto-generation is sequential and unique
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: N/A
- Steps to Reproduce:
  1) Create a new invoice without manual number entry
  2) Observe the auto-generated number
  3) Create another invoice and observe the number
- Expected Result:
  - Numbers follow the configured sequence and are unique
  - Accounting Impact: Invoice numbers remain unique for GL references and audit trail
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional
- Automation Notes: Assert number increments by 1 if sequence is strictly linear

---

- ID: HB-SALES-INV-004
- Title: Manual invoice number entry is accepted
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Manual invoice number
- Steps to Reproduce:
  1) Create a new invoice
  2) Disable auto-generate (if applicable)
  3) Enter a custom number such as CUST-2026-001
  4) Save
- Expected Result:
  - Custom number is accepted and persisted
  - Accounting Impact: Manual numbering is allowed but must remain unique
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Verify number appears in list and details

---

- ID: HB-SALES-INV-005
- Title: Duplicate invoice number is rejected
- Module: Sales / Invoices
- Preconditions: Existing invoice with number TEST-001
- Test Data: Invoice number TEST-001
- Steps to Reproduce:
  1) Create a new invoice
  2) Enter invoice number TEST-001
  3) Attempt to save
- Expected Result:
  - Error message indicates number already exists
  - Accounting Impact: Prevents duplicate GL references
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Negative / Functional
- Automation Notes: Assert on unique constraint message

---

- ID: HB-SALES-INV-006
- Title: Invoice Date validation for required and format
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Valid and invalid date formats
- Steps to Reproduce:
  1) Enter a valid date in expected format (e.g., 17/02/2026)
  2) Enter an invalid format (e.g., 2026-02-17)
  3) Clear Date and attempt to save
- Expected Result:
  - Valid date is accepted
  - Invalid format and blank date are rejected with errors
  - Accounting Impact: Invoice date controls posting period
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Negative / Functional
- Automation Notes: Accept format per system locale; adjust input examples as needed

---

- ID: HB-SALES-INV-007
- Title: Due Date must be on or after Invoice Date
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Invoice Date 17/02/2026; Due Date 16/02/2026
- Steps to Reproduce:
  1) Set Invoice Date to 17/02/2026
  2) Set Due Date to 16/02/2026
  3) Attempt to save
- Expected Result:
  - System blocks save and shows validation error
  - Accounting Impact: Prevents invalid AR aging calculations
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Negative / Functional
- Automation Notes: Check for inline error text

---

- ID: HB-SALES-INV-008
- Title: Reference field auto-numbering and edit behavior
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: N/A
- Steps to Reproduce:
  1) Open a new invoice
  2) Observe default Reference value
  3) Create another invoice and observe Reference
  4) Modify Reference manually and save
- Expected Result:
  - Reference auto-increments if configured
  - Field is editable and optional
  - Accounting Impact: Reference aids PO matching and customer reconciliation
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional / UI
- Automation Notes: If no default exists, mark as not applicable

---

- ID: HB-SALES-INV-009
- Title: Currency display is set to entity base currency
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Entity base currency = INR
- Steps to Reproduce:
  1) Open a new invoice
  2) Observe Currency field and amount formatting
- Expected Result:
  - Currency shows entity base currency (INR)
  - Amounts display with consistent currency formatting
  - Accounting Impact: GL postings use base currency
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional / UI
- Automation Notes: If multi-currency is supported, adjust accordingly

---

- ID: HB-SALES-INV-010
- Title: Tax exclusive mode calculates tax on top of line amount
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Qty=1, Price=100, Tax=18%
- Steps to Reproduce:
  1) Create new invoice
  2) Ensure Amounts are set to Tax exclusive
  3) Add a line item with Qty=1, Price=100, Tax=18%
- Expected Result:
  - Line amount = 100; tax = 18; total = 118
  - Accounting Impact: Revenue posted net; tax posted to liability
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional
- Automation Notes: Verify totals section reflects calculation

---

- ID: HB-SALES-INV-011
- Title: Tax inclusive mode recalculates net and tax portions
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Qty=1, Price=100, Tax=18%
- Steps to Reproduce:
  1) Create new invoice
  2) Set Amounts are to Tax inclusive
  3) Add line item with Qty=1, Price=100, Tax=18%
- Expected Result:
  - Total remains 100; tax is extracted from total; net amount is reduced
  - Accounting Impact: Revenue posted net; tax portion separated
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional
- Automation Notes: Validate expected rounding rules

---

- ID: HB-SALES-INV-012
- Title: Line item without tax code uses 0% tax
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Item with No Tax
- Steps to Reproduce:
  1) Create a new invoice
  2) Add a line item with No Tax selected
  3) Save
- Expected Result:
  - No tax is calculated; subtotal equals total
  - Accounting Impact: Revenue posted only; no tax liability
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Verify tax total is zero

---

- ID: HB-SALES-INV-013
- Title: Line item tax at 5% is calculated correctly
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Qty=1, Price=1000, Tax=5%
- Steps to Reproduce:
  1) Create invoice in Tax exclusive mode
  2) Add line item with Qty=1, Price=1000, Tax=5%
- Expected Result:
  - Tax = 50; total = 1050
  - Accounting Impact: Revenue 1000; tax 50
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Validate totals row

---

- ID: HB-SALES-INV-014
- Title: Line item tax at 18% is calculated correctly
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Qty=1, Price=1000, Tax=18%
- Steps to Reproduce:
  1) Create invoice in Tax exclusive mode
  2) Add line item with Qty=1, Price=1000, Tax=18%
- Expected Result:
  - Tax = 180; total = 1180
  - Accounting Impact: Revenue 1000; tax 180
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Validate totals row

---

- ID: HB-SALES-INV-015
- Title: Tax-exempt line item applies 0% tax
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Tax-exempt item
- Steps to Reproduce:
  1) Create invoice
  2) Add a tax-exempt item
  3) Save
- Expected Result:
  - No tax calculated
  - Accounting Impact: Revenue only; item appears as exempt in tax reports
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Confirm tax summary shows exempt if supported

---

- ID: HB-SALES-INV-016
- Title: Reverse charge line item shows 0% tax and flags correctly
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Reverse charge line item
- Steps to Reproduce:
  1) Create invoice for GST-registered customer
  2) Add line item marked as Reverse Charge
- Expected Result:
  - Tax = 0%; total equals line amount
  - Accounting Impact: No GST liability for supplier
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional
- Automation Notes: Mark as optional if reverse charge not supported

---

- ID: HB-SALES-INV-017
- Title: Multiple tax rates across line items calculate correctly
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: 18%, 5%, 0% items
- Steps to Reproduce:
  1) Add three line items with different tax rates
  2) Observe subtotal, total tax, and grand total
- Expected Result:
  - Totals match sum of each line with its tax rate
  - Accounting Impact: Tax liability split by rate
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional
- Automation Notes: Use fixed values to validate math

---

- ID: HB-SALES-INV-018
- Title: Line item fixed discount reduces taxable base
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Price=1000, Discount=50, Tax=18%
- Steps to Reproduce:
  1) Add line item with fixed discount
  2) Apply tax
- Expected Result:
  - Discount reduces base; tax computed on discounted amount
  - Accounting Impact: Revenue and tax reduced accordingly
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Validate discount impact in totals

---

- ID: HB-SALES-INV-019
- Title: Line item percentage discount reduces taxable base
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Price=1000, Discount=10%, Tax=18%
- Steps to Reproduce:
  1) Add line item with percentage discount
  2) Apply tax
- Expected Result:
  - Discount reduces base; tax computed on discounted amount
  - Accounting Impact: Revenue and tax reduced accordingly
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Validate computed totals

---

- ID: HB-SALES-INV-020
- Title: Invoice-level flat discount applies after line item totals
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Two items with tax; invoice discount=100
- Steps to Reproduce:
  1) Create invoice with two taxable line items
  2) Set invoice-level discount to flat 100
- Expected Result:
  - Discount applied to invoice total per system rules
  - Accounting Impact: Discount posted to appropriate account
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Confirm whether discount applies before/after tax
---

- ID: HB-SALES-INV-021
- Title: Shipping and handling charges add to total
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Shipping charge=200
- Steps to Reproduce:
  1) Create invoice with line items
  2) Add shipping/handling charge
- Expected Result:
  - Shipping adds to total per system rules
  - Accounting Impact: Shipping posted to configured income account
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional
- Automation Notes: Confirm if shipping is taxable

---

- ID: HB-SALES-INV-022
- Title: Other charges or fees add to total
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Other charges=50
- Steps to Reproduce:
  1) Create invoice with line items
  2) Add other/misc charges
- Expected Result:
  - Total updates to include the additional charges
  - Accounting Impact: Charges post to configured revenue account
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional
- Automation Notes: Confirm whether tax applies to charges

---

- ID: HB-SALES-INV-023
- Title: Tax rounding rules are applied consistently
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Price=333.33, Tax=18%
- Steps to Reproduce:
  1) Add a line item with Price=333.33 and Tax=18%
  2) Observe tax rounding
- Expected Result:
  - Tax rounds to configured precision (usually 2 decimals)
  - Accounting Impact: Rounding differences are consistent for reconciliation
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Record exact rounding behavior for automation

---

- ID: HB-SALES-INV-024
- Title: Invoice number sequence continues after deletion
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Sequential invoices
- Steps to Reproduce:
  1) Create invoices with sequential numbers
  2) Delete one invoice if allowed
  3) Create another invoice
- Expected Result:
  - Sequence continues without reusing deleted numbers
  - Accounting Impact: Audit trail remains intact
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional
- Automation Notes: Skip if deletion is not allowed

---

- ID: HB-SALES-INV-025
- Title: Custom invoice numbers accept special characters if supported
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: 2026/INV-001, INV_2026_001
- Steps to Reproduce:
  1) Enter custom number with slash
  2) Save
  3) Enter custom number with underscore
  4) Save
- Expected Result:
  - Custom numbers are accepted per validation rules
  - Accounting Impact: Number appears in GL and reports
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional
- Automation Notes: Update if special characters are disallowed

---

- ID: HB-SALES-INV-026
- Title: Reference field auto-increment after manual entry
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Manual reference PO-2026-001
- Steps to Reproduce:
  1) Create invoice with default reference
  2) Change reference manually and save
  3) Create a new invoice and observe reference
- Expected Result:
  - Reference follows configured rules after manual override
  - Accounting Impact: Reference remains consistent for customer reconciliation
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional
- Automation Notes: Document actual behavior for automation

---

- ID: HB-SALES-INV-027
- Title: Select item from item master populates defaults
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Item exists in master
- Steps to Reproduce:
  1) Add a line item
  2) Select an existing item from the list
- Expected Result:
  - Item name, description, unit, and default account populate
  - Accounting Impact: Default revenue account is used unless overridden
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Verify account is not blank

---

- ID: HB-SALES-INV-028
- Title: Create new item from invoice line item
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: New item name
- Steps to Reproduce:
  1) Type a new item name in Item/Service field
  2) Choose Create new item
  3) Complete required fields
- Expected Result:
  - New item is created and used on the invoice
  - Accounting Impact: New item may require account mapping
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional
- Automation Notes: Skip if inline item creation is not supported

---

- ID: HB-SALES-INV-029
- Title: Line item description can be customized
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Custom description text
- Steps to Reproduce:
  1) Add a line item
  2) Update the description text
  3) Save invoice
- Expected Result:
  - Custom description is saved and appears on PDF
  - Accounting Impact: None, display only
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional / UI
- Automation Notes: Validate multi-line input if supported

---

- ID: HB-SALES-INV-030
- Title: Unit of measure selection updates line calculation
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Unit = BOX or KG
- Steps to Reproduce:
  1) Add line item
  2) Change Unit
  3) Update Qty and Price
- Expected Result:
  - Line amount recalculates based on updated unit, qty, and price
  - Accounting Impact: Unit impacts inventory tracking where applicable
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional
- Automation Notes: Skip if unit is fixed

---

- ID: HB-SALES-INV-031
- Title: Quantity accepts decimals for applicable units
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Qty=5.5 for unit that allows decimals
- Steps to Reproduce:
  1) Add line item with decimal quantity
  2) Save invoice
- Expected Result:
  - Decimal quantities are accepted where allowed
  - Accounting Impact: Quantity affects inventory and revenue recognition
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional
- Automation Notes: Validate behavior for integer-only units

---

- ID: HB-SALES-INV-032
- Title: Price validation rejects negative values
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Price=0 and Price=-100
- Steps to Reproduce:
  1) Add line item with Price=0
  2) Attempt to save
  3) Add line item with Price=-100
  4) Attempt to save
- Expected Result:
  - Price=0 is allowed if free items are supported
  - Negative price is rejected or requires a credit note workflow
  - Accounting Impact: Prevents unintended negative revenue
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Negative / Functional
- Automation Notes: Confirm policy for zero-priced items

---

- ID: HB-SALES-INV-033
- Title: Line item account selection posts to correct GL
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Revenue account selection
- Steps to Reproduce:
  1) Add line item
  2) Select a specific revenue account
  3) Save invoice
- Expected Result:
  - GL posting uses the selected account
  - Accounting Impact: Dr AR, Cr selected revenue account
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional / Accounting
- Automation Notes: Validate posting in ledger or journal view if available

---

- ID: HB-SALES-INV-034
- Title: Default account from item master is auto-populated
- Module: Sales / Invoices
- Preconditions: Item master contains default account
- Test Data: Existing item with mapped account
- Steps to Reproduce:
  1) Add line item from item master
  2) Observe Account field
- Expected Result:
  - Account auto-fills from item master
  - Accounting Impact: Reduces posting errors
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: If no account set, expect required validation

---

- ID: HB-SALES-INV-035
- Title: Large number of line items are supported
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: 50+ line items
- Steps to Reproduce:
  1) Create invoice with 50+ line items
  2) Save invoice
- Expected Result:
  - Invoice saves successfully; totals are correct
  - Accounting Impact: GL entries include all lines
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Performance / Functional
- Automation Notes: Manual performance check

---

- ID: HB-SALES-INV-036
- Title: Delete a line item recalculates totals
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Invoice with 3 line items
- Steps to Reproduce:
  1) Delete one line item
  2) Observe subtotal and total
- Expected Result:
  - Totals recalculate without the removed line
  - Accounting Impact: Prevents unintended GL postings
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional
- Automation Notes: Ensure row is removed from DOM

---

- ID: HB-SALES-INV-037
- Title: Duplicate line item creates editable copy
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Any line item
- Steps to Reproduce:
  1) Add a line item
  2) Use duplicate/copy action if available
- Expected Result:
  - Duplicate line item is created and editable
  - Accounting Impact: None, reduces entry time
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional / UI
- Automation Notes: Skip if no duplicate action

---

- ID: HB-SALES-INV-038
- Title: Add a new line creates a blank line item
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: N/A
- Steps to Reproduce:
  1) Click Add a new line
  2) Observe a new row
- Expected Result:
  - New blank line appears
  - Accounting Impact: None until saved
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional / UI
- Automation Notes: Validate focus is on new line

---

- ID: HB-SALES-INV-039
- Title: Early payment discount applies within allowed period
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Discount 2% if paid within 5 days
- Steps to Reproduce:
  1) Configure early payment discount
  2) Pay within discount window
- Expected Result:
  - Discount applied to payment amount
  - Accounting Impact: Discount posted to appropriate account
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional / Accounting
- Automation Notes: Validate discount in payment posting

---

- ID: HB-SALES-INV-040
- Title: Early payment discount expires after period
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Discount 2% if paid within 5 days
- Steps to Reproduce:
  1) Configure early payment discount
  2) Pay after discount window
- Expected Result:
  - Discount is not applied
  - Accounting Impact: Full AR settled without discount
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional / Accounting
- Automation Notes: Confirm payment amount equals invoice total
---

- ID: HB-SALES-INV-041
- Title: Early payment discount accepts percentage format
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Discount percentage value
- Steps to Reproduce:
  1) Enter discount in percentage field
  2) Save invoice
- Expected Result:
  - Discount percentage is accepted and displayed correctly
  - Accounting Impact: Percentage drives discount amount
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional
- Automation Notes: Confirm UI label and computed value

---

- ID: HB-SALES-INV-042
- Title: Late fee fixed amount applies on overdue invoices
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Late fee 500
- Steps to Reproduce:
  1) Configure late fee as fixed amount
  2) Make invoice overdue
  3) Apply payment
- Expected Result:
  - Late fee is added to amount due
  - Accounting Impact: Late fee posted to finance charges income
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional / Accounting
- Automation Notes: Validate fee appears on invoice or statement

---

- ID: HB-SALES-INV-043
- Title: Late fee percentage applies to overdue balance
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Late fee 1.5% monthly
- Steps to Reproduce:
  1) Configure late fee as percentage
  2) Make invoice overdue
- Expected Result:
  - Late fee calculated based on overdue balance
  - Accounting Impact: Finance charge revenue posted
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional / Accounting
- Automation Notes: Clarify compounding vs simple interest

---

- ID: HB-SALES-INV-044
- Title: Late fee with percentage and flat amount uses correct rule
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Rule such as max(1%, 500)
- Steps to Reproduce:
  1) Configure combined late fee rule if available
  2) Make invoice overdue
- Expected Result:
  - Late fee follows rule logic (higher of percent or flat)
  - Accounting Impact: Accurate penalty revenue
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional / Accounting
- Automation Notes: Mark as optional if not supported

---

- ID: HB-SALES-INV-045
- Title: Early payment discount and late fee do not conflict
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: Discount 2% and late fee 1%
- Steps to Reproduce:
  1) Configure both discount and late fee
  2) Pay early (within window)
  3) Pay late (after due date) on a separate invoice
- Expected Result:
  - Early payment applies discount; late fee does not apply
  - Late payment applies late fee; discount does not apply
  - Accounting Impact: Correct posting based on timing
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional / Accounting
- Automation Notes: Use two invoices to avoid state conflicts

---

- ID: HB-SALES-INV-046
- Title: New invoice default status is Draft
- Module: Sales / Invoices
- Preconditions: Logged in as a user with sales access
- Test Data: N/A
- Steps to Reproduce:
  1) Create invoice with required fields
  2) Save & close
- Expected Result:
  - Status is Draft and invoice remains editable
  - Accounting Impact: No GL posting for Draft
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional / Accounting
- Automation Notes: Verify status on list and detail

---

- ID: HB-SALES-INV-047
- Title: Awaiting Approval status appears when workflow enabled
- Module: Sales / Invoices
- Preconditions: Approval workflow enabled
- Test Data: N/A
- Steps to Reproduce:
  1) Create invoice and submit for approval
- Expected Result:
  - Status changes to Awaiting Approval
  - Accounting Impact: No GL posting until approval
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional / Accounting
- Automation Notes: Skip if approvals are disabled

---

- ID: HB-SALES-INV-048
- Title: Approver can approve invoice and lock edits
- Module: Sales / Invoices
- Preconditions: Invoice in Awaiting Approval; approver role user
- Test Data: N/A
- Steps to Reproduce:
  1) Log in as approver
  2) Open invoice
  3) Click Approve
- Expected Result:
  - Status changes to Approved (or Sent)
  - Accounting Impact: GL posting occurs at approval or send per system rules
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional / Accounting
- Automation Notes: Capture approval user and timestamp if visible

---

- ID: HB-SALES-INV-049
- Title: Sent status is set when invoice is emailed
- Module: Sales / Invoices
- Preconditions: Approved invoice
- Test Data: Valid customer email
- Steps to Reproduce:
  1) Open approved invoice
  2) Send via email
- Expected Result:
  - Status changes to Sent and send time is recorded
  - Accounting Impact: GL posting may trigger on send
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional / Accounting
- Automation Notes: Validate send confirmation message

---

- ID: HB-SALES-INV-050
- Title: Awaiting Payment status after sending
- Module: Sales / Invoices
- Preconditions: Invoice sent to customer
- Test Data: N/A
- Steps to Reproduce:
  1) Send invoice to customer
  2) Observe status in list
- Expected Result:
  - Status shows Awaiting Payment with full balance
  - Accounting Impact: AR shows full outstanding balance
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional / Accounting
- Automation Notes: Verify amount due equals invoice total

---

- ID: HB-SALES-INV-051
- Title: Partially Paid status after partial payment
- Module: Sales / Invoices
- Preconditions: Invoice awaiting payment
- Test Data: Partial payment amount
- Steps to Reproduce:
  1) Record partial payment
  2) Observe status and remaining balance
- Expected Result:
  - Status changes to Partially Paid
  - Accounting Impact: Partial AR reduction posted
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional / Accounting
- Automation Notes: Validate paid and due amounts

---

- ID: HB-SALES-INV-052
- Title: Paid status after full payment
- Module: Sales / Invoices
- Preconditions: Invoice with remaining balance
- Test Data: Full payment amount
- Steps to Reproduce:
  1) Record full payment
  2) Observe status
- Expected Result:
  - Status changes to Paid and balance is zero
  - Accounting Impact: AR fully cleared
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional / Accounting
- Automation Notes: Verify payment posting in ledger

---

- ID: HB-SALES-INV-053
- Title: Paid invoices cannot be edited
- Module: Sales / Invoices
- Preconditions: Paid invoice exists
- Test Data: N/A
- Steps to Reproduce:
  1) Open a paid invoice
  2) Attempt to edit line items or dates
- Expected Result:
  - Editing is blocked with a warning message
  - Accounting Impact: Protects audit trail integrity
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional / Accounting
- Automation Notes: Validate edit controls are disabled

---

- ID: HB-SALES-INV-054
- Title: Void or cancel invoice
- Module: Sales / Invoices
- Preconditions: Draft or posted invoice
- Test Data: N/A
- Steps to Reproduce:
  1) Open invoice
  2) Click Void/Cancel
  3) Confirm
- Expected Result:
  - Status changes to Void/Cancelled
  - Accounting Impact: GL postings are reversed if already posted
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional / Accounting
- Automation Notes: Verify reversal entry if visible

---

- ID: HB-SALES-INV-055
- Title: Draft autosave retains data (if supported)
- Module: Sales / Invoices
- Preconditions: Autosave feature enabled
- Test Data: Draft invoice data
- Steps to Reproduce:
  1) Enter invoice details
  2) Wait without saving
  3) Refresh the page
- Expected Result:
  - Draft is preserved after refresh
  - Accounting Impact: None; draft only
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P3
- Type: Functional
- Automation Notes: Skip if autosave not supported

---

- ID: HB-SALES-INV-056
- Title: Sent/approved invoices are locked for edits
- Module: Sales / Invoices
- Preconditions: Invoice in Sent or Approved status
- Test Data: N/A
- Steps to Reproduce:
  1) Open sent/approved invoice
  2) Attempt to edit line items
- Expected Result:
  - Edits are blocked or restricted to notes/terms
  - Accounting Impact: Prevents changes after posting
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional / Accounting
- Automation Notes: Verify allowed fields remain editable if any

---

- ID: HB-SALES-INV-057
- Title: Approval workflow requires separate approver
- Module: Sales / Invoices
- Preconditions: Approval workflow enabled; two user roles exist
- Test Data: User A (creator) and User B (approver)
- Steps to Reproduce:
  1) User A creates invoice and submits for approval
  2) User B logs in and approves
- Expected Result:
  - Creator cannot approve own invoice if separation of duties enforced
  - Accounting Impact: Dual control before posting
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Security / Accounting
- Automation Notes: Skip if approvals are disabled

---

- ID: HB-SALES-INV-058
- Title: Approval rejection returns invoice to draft
- Module: Sales / Invoices
- Preconditions: Approval workflow enabled
- Test Data: N/A
- Steps to Reproduce:
  1) Submit invoice for approval
  2) Approver rejects
- Expected Result:
  - Status returns to Draft or Rejected with reason
  - Accounting Impact: No GL posting occurs
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P2
- Type: Functional / Accounting
- Automation Notes: Validate rejection reason if required

---

- ID: HB-SALES-INV-059
- Title: Approval requirement based on invoice amount or rules
- Module: Sales / Invoices
- Preconditions: Approval thresholds configured
- Test Data: Invoice amount below and above threshold
- Steps to Reproduce:
  1) Create invoice below threshold and save
  2) Create invoice above threshold and save
- Expected Result:
  - Below threshold: invoice can be saved without approval
  - Above threshold: invoice requires approval and moves to Awaiting Approval
  - Accounting Impact: Control over high-value invoices
- Actual Result:
  - 
- Current Result:
  - Not executed
- Automation Result:
  - Not executed
- Automation Failure/Skip Reason:
  - 
- Priority: P1
- Type: Functional / Accounting
- Automation Notes: Skip if approval thresholds are not configured
