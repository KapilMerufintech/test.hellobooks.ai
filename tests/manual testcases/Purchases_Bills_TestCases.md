# Purchases - Bills Manual Test Cases (Hellobooks)

**Test Environment:** https://test.hellobooks.ai/login
**Test Credentials:**
- Email: fapopi7433@feanzier.com
- Password: Kapil08dangar@

## Basic Bill Recording

ID: HB-BILL-001
Title: Create bill with required fields - simple entry
Module: Purchases - Bills
Preconditions: Vendor exists; Chart of accounts configured
Test Data: Vendor ABC Suppliers, Amount $2,000, Expense account
Steps to Reproduce:
1) Navigate to Purchases > Bills
2) Click "New Bill"
3) Select vendor
4) Enter bill date and due date
5) Add line item: Expense account $2,000
6) Save bill
Expected Result:
- Bill created successfully
- Bill status: Awaiting Payment
- GL entries: Dr. Expense $2,000, Cr. Accounts Payable $2,000
- AP balance increased by $2,000
- Vendor balance shows $2,000 due
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-002
Title: Create bill from purchase order - three-way match
Module: Purchases - Bills
Preconditions: Approved PO exists; Goods received
Test Data: PO-1001 for $5,000, Goods receipt confirmed
Steps to Reproduce:
1) Navigate to Bills
2) Create bill from PO-1001
3) System populates bill details from PO
4) Verify quantities and amounts
5) Save bill
Expected Result:
- Bill created with PO reference
- Quantities match PO and goods receipt
- Three-way match successful (PO, Receipt, Bill)
- PO status updated to "Billed"
- GL: Dr. Expense/Inventory $5,000, Cr. AP $5,000
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-003
Title: Create bill with multiple line items and GL distribution
Module: Purchases - Bills
Preconditions: Vendor exists; Multiple expense accounts
Test Data: Office Supplies $500, Utilities $300, Rent $2,000
Steps to Reproduce:
1) Create new bill
2) Add line item 1: Office Supplies $500
3) Add line item 2: Utilities $300
4) Add line item 3: Rent $2,000
5) Save bill
Expected Result:
- Bill saved with multiple lines
- Total: $2,800
- GL entries:
  - Dr. Office Supplies $500
  - Dr. Utilities $300
  - Dr. Rent $2,000
  - Cr. Accounts Payable $2,800
- Each expense properly classified
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-004
Title: Bill entry with purchase tax/VAT/GST
Module: Purchases - Bills
Preconditions: Tax configuration enabled; Input tax account exists
Test Data: Bill amount $1,000, Tax 18% = $180, Total $1,180
Steps to Reproduce:
1) Create bill
2) Enter amount $1,000
3) Select tax code (18% GST)
4) System calculates tax $180
5) Save bill
Expected Result:
- Bill total: $1,180
- GL entries:
  - Dr. Expense $1,000
  - Dr. Input Tax/GST $180
  - Cr. Accounts Payable $1,180
- Input tax available for offset
- Tax report shows input tax claim
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-005
Title: Partial bill entry against purchase order
Module: Purchases - Bills
Preconditions: PO for 100 units exists
Test Data: PO 100 units @ $10 = $1,000; Bill for 60 units
Steps to Reproduce:
1) Create bill from PO
2) Enter quantity 60 (partial)
3) Amount calculated: $600
4) Save bill
Expected Result:
- Bill created for $600
- PO shows 60 units billed, 40 units open
- PO status: Partially Billed
- Remaining qty available for future billing
- GL: Dr. Expense $600, Cr. AP $600
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

## Vendor Management and Terms

ID: HB-BILL-006
Title: Bill with payment terms Net 30
Module: Purchases - Bills
Preconditions: Vendor with payment terms configured
Test Data: Bill date Jan 1, Terms Net 30
Steps to Reproduce:
1) Create bill
2) Bill date: Jan 1
3) Payment terms: Net 30
4) Save bill
Expected Result:
- Due date auto-calculated: Jan 31
- Aging report shows in current bucket
- Payment reminder scheduled for due date
- No early payment discount applicable
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-007
Title: Bill with early payment discount terms 2/10 Net 30
Module: Purchases - Bills
Preconditions: Discount terms configured
Test Data: Bill $1,000, Terms 2/10 Net 30, Payment on day 8
Steps to Reproduce:
1) Create bill $1,000 with discount terms
2) Record payment within 10 days
3) Apply 2% discount = $20
4) Payment amount: $980
Expected Result:
- Discount $20 captured
- GL on payment: Dr. AP $1,000, Cr. Bank $980, Cr. Purchase Discount $20
- Discount shows as income/contra-expense
- Vendor balance cleared
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-008
Title: Bill for inactive vendor
Module: Purchases - Bills
Preconditions: Vendor marked as inactive
Test Data: Inactive vendor
Steps to Reproduce:
1) Attempt to create bill
2) Select inactive vendor
3) Try to save
Expected Result:
- Warning message displayed
- Option to reactivate vendor
- Or block bill creation for inactive vendor
- Prevent accidental vendor usage
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Negative

ID: HB-BILL-009
Title: Duplicate bill number detection
Module: Purchases - Bills
Preconditions: Bill exists with number INV-5001
Test Data: Duplicate bill number INV-5001
Steps to Reproduce:
1) Create new bill
2) Enter bill number INV-5001 (already exists)
3) Attempt to save
Expected Result:
- Duplicate warning displayed
- Shows existing bill details
- Option to use different number
- Prevents duplicate bill posting
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-BILL-010
Title: Bill with vendor credit application
Module: Purchases - Bills
Preconditions: Vendor has credit balance $500; New bill $1,000
Test Data: Credit $500, Bill $1,000
Steps to Reproduce:
1) Create bill $1,000
2) System shows available credit $500
3) Apply credit to bill
4) Save
Expected Result:
- Credit applied: $500
- Net payable: $500
- GL: Dr. Expense $1,000, Cr. Vendor Credit $500, Cr. AP $500
- Vendor credit balance reduced to $0
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

## Approval Workflow

ID: HB-BILL-011
Title: Bill requires approval above threshold
Module: Purchases - Bills
Preconditions: Approval workflow enabled; Threshold $5,000
Test Data: Bill $7,500
Steps to Reproduce:
1) Create bill for $7,500
2) Submit bill
3) Check bill status
Expected Result:
- Bill status: Pending Approval
- Notification sent to approver
- GL posting deferred until approval
- Bill not available for payment
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-012
Title: Approver approves bill
Module: Purchases - Bills
Preconditions: Bill pending approval
Test Data: Bill awaiting approval
Steps to Reproduce:
1) Login as approver
2) Navigate to pending bills
3) Review bill details
4) Approve bill
Expected Result:
- Bill status: Approved/Awaiting Payment
- GL entries posted
- AP balance updated
- Available for payment scheduling
- Creator notified of approval
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-013
Title: Approver rejects bill with reason
Module: Purchases - Bills
Preconditions: Bill pending approval
Test Data: Bill with issues
Steps to Reproduce:
1) Login as approver
2) Review bill
3) Reject with reason "Missing supporting documents"
4) Submit rejection
Expected Result:
- Bill status: Rejected
- Rejection reason captured
- Bill returns to creator
- No GL posting
- Creator notified with reason
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-014
Title: Multi-level approval workflow
Module: Purchases - Bills
Preconditions: Two-level approval configured; Bill $25,000
Test Data: Bill requiring Level 1 and Level 2 approval
Steps to Reproduce:
1) Create bill $25,000
2) Level 1 approver approves
3) Routes to Level 2 approver
4) Level 2 approver approves
Expected Result:
- Sequential approval routing
- Status updates at each level
- Final approval posts to GL
- All approvals logged in audit trail
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-015
Title: Approval bypass for bills below threshold
Module: Purchases - Bills
Preconditions: Approval threshold $5,000
Test Data: Bill $2,000
Steps to Reproduce:
1) Create bill $2,000
2) Save bill
Expected Result:
- Bill directly posted (no approval required)
- Status: Awaiting Payment
- GL entries posted immediately
- Available for payment
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

## Multi-Currency Bills

ID: HB-BILL-016
Title: Create bill in foreign currency
Module: Purchases - Bills
Preconditions: Multi-currency enabled; Vendor in GBP
Test Data: Bill £1,000, Exchange rate 1.25 USD
Steps to Reproduce:
1) Create bill for GBP vendor
2) Enter amount £1,000
3) Exchange rate 1.25
4) Base currency equivalent: $1,250
5) Save bill
Expected Result:
- Bill recorded in GBP
- Base currency (USD) amount: $1,250
- GL: Dr. Expense $1,250, Cr. AP $1,250
- Exchange rate locked on bill
- Foreign currency tracking maintained
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-017
Title: Exchange rate override on bill
Module: Purchases - Bills
Preconditions: Permission to override rates
Test Data: System rate 1.25, Override rate 1.27
Steps to Reproduce:
1) Create foreign currency bill
2) Override system rate from 1.25 to 1.27
3) Save bill
Expected Result:
- Custom rate applied
- Base currency calculated using override
- Override rate logged in audit trail
- Reason for override captured
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-018
Title: Foreign exchange loss on bill payment
Module: Purchases - Bills
Preconditions: Bill in EUR; Rate changed between bill and payment
Test Data: Bill €1,000 at rate 1.10 = $1,100; Payment at rate 1.12 = $1,120
Steps to Reproduce:
1) Create bill at rate 1.10
2) Pay bill when rate is 1.12
3) Review FX variance
Expected Result:
- Realized FX loss: $20
- GL on payment: Dr. AP $1,100, Dr. FX Loss $20, Cr. Bank $1,120
- FX loss in P&L
- Exchange variance documented
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-019
Title: Foreign exchange gain on bill payment
Module: Purchases - Bills
Preconditions: Bill in EUR; Favorable rate at payment
Test Data: Bill €1,000 at rate 1.10 = $1,100; Payment at rate 1.08 = $1,080
Steps to Reproduce:
1) Create bill at rate 1.10
2) Pay bill when rate is 1.08
3) Review FX variance
Expected Result:
- Realized FX gain: $20
- GL on payment: Dr. AP $1,100, Cr. Bank $1,080, Cr. FX Gain $20
- FX gain in P&L
- Favorable variance documented
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-020
Title: Multi-currency bill reporting
Module: Purchases - Bills
Preconditions: Bills in multiple currencies
Test Data: Bills in USD, EUR, GBP
Steps to Reproduce:
1) Create bills in different currencies
2) Run AP aging report
3) Review currency presentation
Expected Result:
- Report shows both foreign and base currency
- Proper currency conversion applied
- Exchange rates displayed
- Total AP in base currency accurate
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

## Inventory and Asset Integration

ID: HB-BILL-021
Title: Bill for inventory purchase
Module: Purchases - Bills
Preconditions: Inventory item configured; PO for inventory exists
Test Data: 100 units @ $50 = $5,000
Steps to Reproduce:
1) Create bill from inventory PO
2) Receive 100 units
3) Enter bill for $5,000
4) Save bill
Expected Result:
- GL: Dr. Inventory $5,000, Cr. AP $5,000
- Inventory quantity increased by 100
- Inventory value increased by $5,000
- Unit cost updated in inventory records
- Not expensed (capitalized to inventory)
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-022
Title: Bill for fixed asset purchase
Module: Purchases - Bills
Preconditions: Fixed asset account configured
Test Data: Equipment purchase $25,000
Steps to Reproduce:
1) Create bill
2) Code to Fixed Assets account
3) Enter amount $25,000
4) Save bill
Expected Result:
- GL: Dr. Fixed Assets $25,000, Cr. AP $25,000
- Asset capitalized (not expensed)
- Asset available for depreciation setup
- Not shown in P&L
- Balance sheet increased
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-023
Title: Bill with freight charges allocation to inventory
Module: Purchases - Bills
Preconditions: Inventory purchase with freight
Test Data: Inventory $5,000, Freight $200
Steps to Reproduce:
1) Create bill for inventory
2) Add freight charge line
3) Allocate freight to inventory cost
4) Save bill
Expected Result:
- Total inventory cost: $5,200
- GL: Dr. Inventory $5,200, Cr. AP $5,200
- Freight capitalized to inventory
- Unit cost includes freight allocation
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-024
Title: Bill for non-inventory item (expense)
Module: Purchases - Bills
Preconditions: Non-inventory PO exists
Test Data: Office supplies $300
Steps to Reproduce:
1) Create bill for office supplies
2) Code to expense account
3) Save bill
Expected Result:
- GL: Dr. Office Supplies Expense $300, Cr. AP $300
- Expensed immediately
- Appears in P&L
- No inventory impact
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-025
Title: Bill with inventory quantity variance
Module: Purchases - Bills
Preconditions: PO for 100 units; Received 95 units
Test Data: PO 100 units, Receipt 95 units, Bill 95 units
Steps to Reproduce:
1) Create bill for actual quantity received
2) System flags variance
3) Adjust PO quantity
4) Save bill
Expected Result:
- Bill matches receipt (95 units)
- Variance documented
- PO updated to reflect actuals
- Exception report updated
- Three-way match with variance explanation
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

## Tax and Withholding

ID: HB-BILL-026
Title: Bill with TDS/withholding tax
Module: Purchases - Bills
Preconditions: TDS applicable; Rate 2%
Test Data: Bill $10,000, TDS $200
Steps to Reproduce:
1) Create bill $10,000
2) System calculates TDS 2% = $200
3) Net payable: $9,800
4) Save bill
Expected Result:
- GL: Dr. Expense $10,000, Cr. AP $9,800, Cr. TDS Payable $200
- Vendor receives $9,800
- TDS $200 remitted to tax authority
- TDS certificate tracking
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-027
Title: Bill with multiple tax codes
Module: Purchases - Bills
Preconditions: Multiple tax jurisdictions
Test Data: State tax 6%, City tax 2%
Steps to Reproduce:
1) Create bill
2) Apply state tax 6%
3) Apply city tax 2%
4) Total tax: 8%
5) Save bill
Expected Result:
- Taxes calculated correctly
- Each tax posted to separate account
- Input tax credits properly allocated
- Tax compliance reports show breakdown
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-028
Title: Bill with reverse charge VAT
Module: Purchases - Bills
Preconditions: Reverse charge mechanism applicable
Test Data: EU vendor, Reverse charge VAT
Steps to Reproduce:
1) Create bill from EU vendor
2) Apply reverse charge
3) Save bill
Expected Result:
- No VAT paid to vendor
- Output VAT and input VAT self-assessed
- GL shows offsetting VAT entries
- VAT return shows reverse charge
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-029
Title: Bill with non-deductible tax
Module: Purchases - Bills
Preconditions: Some expenses have non-deductible tax
Test Data: Entertainment expense, Tax 50% non-deductible
Steps to Reproduce:
1) Create bill for entertainment
2) Tax applied
3) 50% of tax non-deductible
4) Save bill
Expected Result:
- Deductible tax to input tax account
- Non-deductible tax added to expense
- GL properly splits tax treatment
- Tax report shows correct input tax claim
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-030
Title: Bill exempt from tax
Module: Purchases - Bills
Preconditions: Tax-exempt purchase category
Test Data: Tax-exempt item purchase
Steps to Reproduce:
1) Create bill
2) Select tax-exempt item
3) No tax applied
4) Save bill
Expected Result:
- Bill created without tax
- Exemption reason captured
- Tax report shows exempt purchase
- Compliance documentation maintained
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

## Bill Reversal and Adjustments

ID: HB-BILL-031
Title: Void unpaid bill
Module: Purchases - Bills
Preconditions: Bill exists, not yet paid
Test Data: Bill $1,500
Steps to Reproduce:
1) Open bill
2) Click "Void Bill"
3) Enter void reason
4) Confirm void
Expected Result:
- Bill status: Voided
- GL reversal: Dr. AP $1,500, Cr. Expense $1,500
- AP balance reduced
- Vendor balance reduced
- Audit trail shows void with reason
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-032
Title: Prevent void of paid bill
Module: Purchases - Bills
Preconditions: Bill fully paid
Test Data: Paid bill
Steps to Reproduce:
1) Attempt to void paid bill
Expected Result:
- Void action blocked
- Error: "Cannot void paid bill. Create vendor credit instead."
- Bill remains intact
- Proper reversal workflow required
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-BILL-033
Title: Create vendor credit note
Module: Purchases - Bills
Preconditions: Bill exists for $2,000
Test Data: Return goods worth $500
Steps to Reproduce:
1) Create vendor credit note
2) Reference original bill
3) Enter credit amount $500
4) Save credit
Expected Result:
- Credit note created
- GL: Dr. AP $500, Cr. Expense $500
- Vendor balance reduced by $500
- Available to offset future bills
- Linked to original bill
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-034
Title: Apply vendor credit to new bill
Module: Purchases - Bills
Preconditions: Vendor credit $500 exists; New bill $1,000
Test Data: Credit $500, Bill $1,000
Steps to Reproduce:
1) Create new bill $1,000
2) Apply existing credit $500
3) Save bill
Expected Result:
- Net payable: $500
- Credit consumed
- GL: Dr. Expense $1,000, Cr. Vendor Credit $500, Cr. AP $500
- Vendor balance net of credit
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-035
Title: Edit unpaid bill - amount change
Module: Purchases - Bills
Preconditions: Unpaid bill exists
Test Data: Change amount from $1,000 to $1,200
Steps to Reproduce:
1) Open unpaid bill
2) Modify amount to $1,200
3) Save changes
Expected Result:
- Bill amount updated
- GL entries adjusted
- Adjustment entry in audit trail
- AP balance updated by $200
- Version history maintained
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

## Recurring Bills and Scheduling

ID: HB-BILL-036
Title: Set up recurring bill
Module: Purchases - Bills
Preconditions: Recurring bill feature enabled
Test Data: Monthly rent $2,000
Steps to Reproduce:
1) Create recurring bill
2) Amount: $2,000
3) Frequency: Monthly
4) Start date: Jan 1
5) Save recurring schedule
Expected Result:
- Recurring bill template created
- First bill generated automatically
- Schedule for future bills set
- Notification for each generation
- GL entries posted monthly
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-037
Title: Auto-generate bill from recurring schedule
Module: Purchases - Bills
Preconditions: Recurring bill schedule exists
Test Data: Monthly schedule, due date reached
Steps to Reproduce:
1) Recurring schedule triggers
2) System auto-generates bill
3) Review generated bill
Expected Result:
- Bill created automatically
- Amount and details match template
- Status: Awaiting Approval/Payment
- GL posted automatically
- Next bill scheduled
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-038
Title: Stop recurring bill schedule
Module: Purchases - Bills
Preconditions: Active recurring schedule
Test Data: Cancel subscription/contract
Steps to Reproduce:
1) Open recurring bill
2) Stop/End schedule
3) Enter end date
4) Save
Expected Result:
- No future bills generated after end date
- Existing bills unaffected
- Schedule status: Inactive
- Audit trail shows schedule stop
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

## Payment Scheduling and Terms

ID: HB-BILL-039
Title: Schedule bill payment for future date
Module: Purchases - Bills
Preconditions: Bill approved, payment due in 30 days
Test Data: Bill $5,000, Due date 30 days
Steps to Reproduce:
1) Open bill
2) Schedule payment for due date
3) Save schedule
Expected Result:
- Payment scheduled in system
- Reminder created for due date
- Cash flow forecast updated
- Payment batch ready on due date
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-040
Title: Bill aging calculation
Module: Purchases - Bills
Preconditions: Bills with various due dates
Test Data: Current, 30-day, 60-day, 90+ day bills
Steps to Reproduce:
1) Run AP aging report
2) Review aging buckets
Expected Result:
- Bills categorized by age
- Aging buckets: Current, 1-30, 31-60, 61-90, 90+ days
- Totals for each bucket
- Overdue amounts highlighted
- Vendor-wise aging available
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-041
Title: Installment payment tracking for bill
Module: Purchases - Bills
Preconditions: Large bill with installment agreement
Test Data: Bill $12,000, 4 monthly installments
Steps to Reproduce:
1) Create bill with installment terms
2) Set up payment schedule
3) Track installments
Expected Result:
- Payment plan created
- Installment schedule visible
- Each payment updates balance
- Reminders for upcoming installments
- Partial payment tracking
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Functional

## GL Integration and Accounting

ID: HB-BILL-042
Title: Verify double-entry on bill posting
Module: Purchases - Bills
Preconditions: Bill ready to post
Test Data: Bill $3,000
Steps to Reproduce:
1) Create and post bill
2) Review GL entries
3) Verify debits equal credits
Expected Result:
- Dr. Expense $3,000
- Cr. Accounts Payable $3,000
- Debits = Credits
- Trial balance remains balanced
- GL equation maintained
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Accounting Verification

ID: HB-BILL-043
Title: Bill posting to correct accounting period
Module: Purchases - Bills
Preconditions: Bill dated in previous month
Test Data: Bill date Jan 30, System date Feb 5
Steps to Reproduce:
1) Create bill with January date
2) Post bill in February
3) Review period allocation
Expected Result:
- Bill posted to January (bill date)
- Appears in January reports
- Period close considerations
- Accrual if period closed
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Accounting Verification

ID: HB-BILL-044
Title: Prevent posting to closed period
Module: Purchases - Bills
Preconditions: January period closed
Test Data: Bill dated January
Steps to Reproduce:
1) Attempt to post bill dated in January
2) System checks period status
Expected Result:
- Posting blocked
- Error: "Cannot post to closed period"
- Bill remains draft
- Period integrity maintained
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-BILL-045
Title: Subsidiary ledger vs control account reconciliation
Module: Purchases - Bills
Preconditions: Multiple bills posted
Test Data: Various vendor bills
Steps to Reproduce:
1) Post multiple bills
2) Run vendor subsidiary ledger
3) Compare to AP control account
Expected Result:
- Subsidiary ledger total = Control account balance
- No discrepancies
- Reconciliation report balanced
- All bills accounted for
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Accounting Verification

ID: HB-BILL-046
Title: Bill impact on balance sheet
Module: Purchases - Bills
Preconditions: Bill posted
Test Data: Bill $5,000
Steps to Reproduce:
1) Note balance sheet before bill
2) Post bill
3) Review updated balance sheet
Expected Result:
- Current Liabilities (AP) increased by $5,000
- If expense: No asset change, equity reduced via P&L
- If asset: Current/Fixed Assets increased by $5,000
- Balance sheet equation maintained
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Accounting Verification

ID: HB-BILL-047
Title: Bill impact on cash flow statement
Module: Purchases - Bills
Preconditions: Bill posted but not paid
Test Data: Bill $2,000
Steps to Reproduce:
1) Post bill
2) Review cash flow statement
3) Check operating activities
Expected Result:
- No immediate cash flow impact (accrual basis)
- Increase in AP shown as source of cash
- Cash outflow occurs at payment
- Indirect method shows AP increase
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Accounting Verification

ID: HB-BILL-048
Title: Accrual accounting - expense recognition
Module: Purchases - Bills
Preconditions: Accrual accounting method
Test Data: Bill for December service, posted Dec 31
Steps to Reproduce:
1) Post bill for service received in December
2) Review December P&L
Expected Result:
- Expense recognized in December
- Matching principle applied
- Period revenue/expense matched
- AP shown on balance sheet
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Accounting Verification

ID: HB-BILL-049
Title: Prepaid expense from bill
Module: Purchases - Bills
Preconditions: Annual insurance bill
Test Data: 12-month insurance $1,200
Steps to Reproduce:
1) Create bill for annual insurance
2) Post to prepaid asset account
3) Set up amortization schedule
Expected Result:
- GL: Dr. Prepaid Insurance $1,200, Cr. AP $1,200
- Asset recorded, not expensed
- Monthly amortization scheduled
- $100/month expense recognition
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Accounting Verification

ID: HB-BILL-050
Title: Accrued expenses - bill not yet received
Module: Purchases - Bills
Preconditions: Service received, bill pending
Test Data: Utilities consumed, bill not received
Steps to Reproduce:
1) Accrue expense at month-end
2) Receive actual bill next month
3) Reverse accrual
4) Post actual bill
Expected Result:
- Month-end: Dr. Utilities Expense, Cr. Accrued Expenses
- Next month: Reverse accrual
- Post actual bill
- No duplicate expense
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Accounting Verification

## Three-Way Matching

ID: HB-BILL-051
Title: Perfect three-way match - PO, Receipt, Bill
Module: Purchases - Bills
Preconditions: PO and receipt exist
Test Data: PO 100 units @ $10, Receipt 100 units, Bill $1,000
Steps to Reproduce:
1) Create bill from PO
2) System matches quantities and prices
3) All match perfectly
4) Save bill
Expected Result:
- Three-way match successful
- No variances
- Automatic approval (if configured)
- GL posted
- Match status: Complete
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-052
Title: Quantity variance in three-way match
Module: Purchases - Bills
Preconditions: PO 100 units, Receipt 95 units
Test Data: Bill for 95 units (actual receipt)
Steps to Reproduce:
1) Create bill from PO
2) System detects quantity variance
3) Explain variance
4) Approve exception
Expected Result:
- Variance flagged: 5 units
- Exception approval required
- Variance report updated
- Match with tolerance acceptance
- GL reflects actual quantity
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-053
Title: Price variance in three-way match
Module: Purchases - Bills
Preconditions: PO @ $10/unit, Bill @ $10.50/unit
Test Data: 100 units, Price variance $0.50/unit = $50
Steps to Reproduce:
1) Create bill from PO
2) Bill price higher than PO
3) System flags price variance
4) Review and approve
Expected Result:
- Price variance: $50 identified
- Variance approval workflow triggered
- Purchase price variance account
- GL adjustment for variance
- Buyer notified of variance
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-054
Title: Three-way match tolerance settings
Module: Purchases - Bills
Preconditions: Tolerance: 2% price, 5% quantity
Test Data: Variance within tolerance
Steps to Reproduce:
1) Bill with 3% quantity variance
2) Check against tolerance
3) System evaluates
Expected Result:
- 3% variance within 5% tolerance
- Auto-approved
- No exception handling needed
- GL posted automatically
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-055
Title: Three-way match exception report
Module: Purchases - Bills
Preconditions: Multiple bills with variances
Test Data: Various matching issues
Steps to Reproduce:
1) Run exception report
2) Review bills with match issues
Expected Result:
- Report shows all unmatched bills
- Variance details for each
- Aging of unresolved exceptions
- Drilldown to bill details
- Action required list
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

## Reporting and Analytics

ID: HB-BILL-056
Title: AP aging summary report
Module: Purchases - Bills
Preconditions: Bills in various aging buckets
Test Data: Multiple bills with different due dates
Steps to Reproduce:
1) Navigate to Reports > AP Aging
2) Run report
3) Review aging buckets
Expected Result:
- Bills grouped by age: Current, 30, 60, 90+ days
- Totals for each bucket
- Vendor-wise breakdown available
- Export to Excel
- Snapshot of AP position
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-057
Title: Vendor balance report
Module: Purchases - Bills
Preconditions: Multiple vendors with balances
Test Data: Various vendor bills
Steps to Reproduce:
1) Run Vendor Balance report
2) Review by vendor
Expected Result:
- Current balance for each vendor
- Outstanding bills listed
- Payment history
- Contact information
- Sortable and filterable
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-058
Title: Purchase by category report
Module: Purchases - Bills
Preconditions: Bills coded to various expense categories
Test Data: Bills across multiple GL accounts
Steps to Reproduce:
1) Run Purchase by Category report
2) Review spending by category
Expected Result:
- Total spend by expense category
- Period comparison
- Budget vs actual
- Trend analysis
- Top expense categories highlighted
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-059
Title: Unpaid bills report
Module: Purchases - Bills
Preconditions: Mix of paid and unpaid bills
Test Data: Various bill statuses
Steps to Reproduce:
1) Run Unpaid Bills report
2) Review open items
Expected Result:
- All unpaid bills listed
- Sorted by due date
- Amount due for each
- Total AP outstanding
- Payment prioritization list
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-060
Title: Bills pending approval report
Module: Purchases - Bills
Preconditions: Bills awaiting approval
Test Data: Bills in approval workflow
Steps to Reproduce:
1) Run Pending Approvals report
2) Review bills needing action
Expected Result:
- All bills awaiting approval
- Approver assigned
- Days pending
- Amount pending approval
- Aging of pending bills
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

## Security and Permissions

ID: HB-BILL-061
Title: User without bill creation permission
Module: Purchases - Bills
Preconditions: User role lacks bill creation permission
Test Data: Restricted user
Steps to Reproduce:
1) Login as restricted user
2) Attempt to access Bills module
Expected Result:
- Bills menu hidden or disabled
- Access denied if URL accessed directly
- Proper permission enforcement
- Security violation logged
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Security

ID: HB-BILL-062
Title: Segregation of duties - creator cannot approve
Module: Purchases - Bills
Preconditions: SOD policy enabled
Test Data: User A creates bill
Steps to Reproduce:
1) User A creates bill
2) User A attempts to approve own bill
Expected Result:
- Approval action blocked
- Error: "Cannot approve own bill"
- Requires different approver
- SOD policy enforced
- Audit log records attempt
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Security

ID: HB-BILL-063
Title: Audit trail for bill lifecycle
Module: Purchases - Bills
Preconditions: Audit logging enabled
Test Data: Bill through complete lifecycle
Steps to Reproduce:
1) Create bill
2) Approve bill
3) Pay bill
4) Review audit trail
Expected Result:
- Every action logged
- User, timestamp, IP address captured
- Before/after values shown
- Complete audit trail
- Immutable log
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Security

ID: HB-BILL-064
Title: Bill amount limit by user role
Module: Purchases - Bills
Preconditions: User limit $5,000
Test Data: Bill $7,000
Steps to Reproduce:
1) User attempts to create $7,000 bill
Expected Result:
- Bill creation allowed
- Automatic routing for approval
- Higher authority required
- Limit enforcement logged
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Security

ID: HB-BILL-065
Title: Vendor-specific access restrictions
Module: Purchases - Bills
Preconditions: User restricted to specific vendors
Test Data: Attempt bill for restricted vendor
Steps to Reproduce:
1) User attempts bill for unauthorized vendor
Expected Result:
- Vendor not visible in dropdown
- Or error if directly accessed
- Access restriction enforced
- Security policy maintained
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Security

## Import and Integration

ID: HB-BILL-066
Title: Import bills from CSV file
Module: Purchases - Bills
Preconditions: CSV import template available
Test Data: CSV with multiple bills
Steps to Reproduce:
1) Navigate to Import Bills
2) Upload CSV file
3) Map columns
4) Validate and import
Expected Result:
- Valid bills imported
- Errors reported for invalid rows
- GL entries posted for valid bills
- Import summary displayed
- Audit trail for import
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Functional

ID: HB-BILL-067
Title: Import bills from email (OCR)
Module: Purchases - Bills
Preconditions: Email integration and OCR enabled
Test Data: PDF bill received via email
Steps to Reproduce:
1) Forward bill to system email
2) OCR extracts data
3) Review extracted bill
4) Confirm and save
Expected Result:
- Bill data extracted via OCR
- Vendor, amount, date captured
- Manual verification required
- Save creates bill
- Original PDF attached
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Functional

ID: HB-BILL-068
Title: API integration - create bill via API
Module: Purchases - Bills
Preconditions: API access configured
Test Data: API call with bill data
Steps to Reproduce:
1) Send POST request to /api/bills
2) Include vendor, amount, line items
3) Receive response
Expected Result:
- Bill created via API
- Response includes bill ID
- Same validation as UI
- GL entries posted
- API call logged
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Functional

ID: HB-BILL-069
Title: Export bills to accounting software
Module: Purchases - Bills
Preconditions: Export integration configured
Test Data: Month's bills
Steps to Reproduce:
1) Navigate to Export
2) Select date range
3) Choose export format
4) Export bills
Expected Result:
- Bills exported in compatible format
- GL codes included
- Vendor references maintained
- Import-ready for target system
- Export log maintained
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Functional

## Edge Cases and Validation

ID: HB-BILL-070
Title: Prevent negative bill amount
Module: Purchases - Bills
Preconditions: N/A
Test Data: Amount: -$500
Steps to Reproduce:
1) Create bill
2) Enter negative amount
3) Attempt to save
Expected Result:
- Validation error displayed
- Save blocked
- Message: "Bill amount must be positive. Use vendor credit for returns."
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-BILL-071
Title: Prevent bill without vendor
Module: Purchases - Bills
Preconditions: N/A
Test Data: Bill with no vendor selected
Steps to Reproduce:
1) Create bill
2) Leave vendor blank
3) Attempt to save
Expected Result:
- Validation error: "Vendor required"
- Save blocked
- Field highlighted
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-BILL-072
Title: Prevent bill with future date beyond threshold
Module: Purchases - Bills
Preconditions: Future date policy: Max 7 days
Test Data: Bill date 30 days in future
Steps to Reproduce:
1) Create bill
2) Enter date 30 days ahead
3) Attempt to save
Expected Result:
- Validation error
- Date must be within allowed range
- Save blocked or requires approval
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Negative

ID: HB-BILL-073
Title: Bill with zero amount
Module: Purchases - Bills
Preconditions: N/A
Test Data: Amount: $0.00
Steps to Reproduce:
1) Create bill
2) Enter amount $0
3) Attempt to save
Expected Result:
- Validation error
- "Bill amount must be greater than zero"
- Save blocked
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Negative

ID: HB-BILL-074
Title: Bill with date before vendor creation date
Module: Purchases - Bills
Preconditions: Vendor created on Jan 1
Test Data: Bill date Dec 1 (previous year)
Steps to Reproduce:
1) Create bill with backdated date
2) Date before vendor exists
3) Attempt to save
Expected Result:
- Warning displayed
- Option to proceed or correct date
- Unusual transaction flagged
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Negative

ID: HB-BILL-075
Title: Bill exceeding vendor credit limit
Module: Purchases - Bills
Preconditions: Vendor credit limit $10,000; Current balance $9,500
Test Data: New bill $1,000
Steps to Reproduce:
1) Create bill that exceeds limit
2) Attempt to save
Expected Result:
- Warning: "Credit limit exceeded"
- Approval required to proceed
- Or save blocked based on policy
- Credit management enforced
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Negative

## Month-End and Year-End

ID: HB-BILL-076
Title: Cut-off testing for bills
Module: Purchases - Bills
Preconditions: Month-end close process
Test Data: Bills near month-end
Steps to Reproduce:
1) Identify bills around month-end
2) Verify recording in correct period
3) Check for timing issues
Expected Result:
- Bills recorded in correct accounting period
- Cut-off procedures documented
- Adjusting entries if needed
- Period integrity maintained
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Period Close

ID: HB-BILL-077
Title: Accrued expenses reconciliation
Module: Purchases - Bills
Preconditions: Month-end with accruals
Test Data: Accrued vs actual bills
Steps to Reproduce:
1) Review accrued expense accounts
2) Match actual bills received
3) Reverse accruals
4) Post actual bills
Expected Result:
- Accruals matched to actual bills
- Variances identified and explained
- Accruals reversed upon bill receipt
- No duplicate expense recognition
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Period Close

ID: HB-BILL-078
Title: Unmatched receipts at month-end
Module: Purchases - Bills
Preconditions: Goods received, bills not received
Test Data: Receipts without bills
Steps to Reproduce:
1) Run unmatched receipts report
2) Accrue for unbilled receipts
3) Clear accruals when bills received
Expected Result:
- Unbilled receipts identified
- Accrual entries created
- Expense matched to period of receipt
- Matching principle applied
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Period Close

ID: HB-BILL-079
Title: Year-end AP balance verification
Module: Purchases - Bills
Preconditions: Year-end close
Test Data: All outstanding bills
Steps to Reproduce:
1) Run AP aging at year-end
2) Verify all open bills
3) Reconcile to control account
4) Confirm vendor statements
Expected Result:
- AP balance accurate
- All bills accounted for
- Reconciled to vendor statements
- Subsidiary = Control account
- Ready for year-end close
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Period Close

ID: HB-BILL-080
Title: Post year-end adjusting entries
Module: Purchases - Bills
Preconditions: Year-end adjustments needed
Test Data: Adjusting entries for bills
Steps to Reproduce:
1) Identify year-end adjustments
2) Post adjusting entries
3) Update bills if needed
Expected Result:
- Adjusting entries posted to correct year
- Bills adjusted if necessary
- Financial statements accurate
- Audit trail complete
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Period Close

## Advanced Scenarios

ID: HB-BILL-081
Title: Consolidated bill for multiple locations
Module: Purchases - Bills
Preconditions: Multi-location company
Test Data: Single vendor bill for 3 locations
Steps to Reproduce:
1) Create consolidated bill
2) Allocate amounts to locations
3) Split GL coding by location
4) Save bill
Expected Result:
- Bill split by location/department
- Location-specific GL accounts
- Cost center allocation
- Management reporting by location
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-082
Title: Bill with retainage held
Module: Purchases - Bills
Preconditions: Construction contract with retainage
Test Data: Bill $10,000, 10% retainage = $1,000
Steps to Reproduce:
1) Create bill from construction PO
2) Calculate retainage 10%
3) Net payable: $9,000
4) Save bill
Expected Result:
- GL: Dr. Expense $10,000, Cr. AP $9,000, Cr. Retainage Payable $1,000
- Retainage tracked separately
- Released upon contract completion
- Proper liability classification
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-083
Title: Bill for commission payment
Module: Purchases - Bills
Preconditions: Commission structure configured
Test Data: Sales commission $5,000
Steps to Reproduce:
1) Create bill for commission
2) Link to sales transactions
3) Code to commission expense
4) Save bill
Expected Result:
- GL: Dr. Commission Expense $5,000, Cr. AP $5,000
- Linked to sales for reconciliation
- Commission report updated
- Expense matched to revenue period
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Functional

ID: HB-BILL-084
Title: Bill for warranty claim settlement
Module: Purchases - Bills
Preconditions: Warranty claim approved
Test Data: Warranty work $800
Steps to Reproduce:
1) Create bill from approved warranty claim
2) Code appropriately
3) Save bill
Expected Result:
- Charged to warranty expense/reserve
- Claim tracking updated
- GL reflects warranty cost
- Product warranty analysis updated
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Functional

ID: HB-BILL-085
Title: Bill for intercompany purchase
Module: Purchases - Bills
Preconditions: Multi-entity setup; Intercompany transaction
Test Data: Purchase from sister company $15,000
Steps to Reproduce:
1) Create intercompany bill
2) Mark as intercompany
3) Save bill
Expected Result:
- GL: Dr. Expense $15,000, Cr. Intercompany AP $15,000
- Elimination entries for consolidation
- Intercompany reconciliation updated
- Both entities' records balanced
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-086
Title: Bill with progress payment terms
Module: Purchases - Bills
Preconditions: Contract with milestone payments
Test Data: 30% progress payment
Steps to Reproduce:
1) Create bill for milestone completion
2) Verify milestone criteria met
3) Calculate 30% of contract value
4) Save bill
Expected Result:
- Payment tied to progress
- Contract value tracked
- Remaining payments scheduled
- Progress billing monitored
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-087
Title: Bill with disputed amount
Module: Purchases - Bills
Preconditions: Dispute over charges
Test Data: Bill $2,000, Dispute $500
Steps to Reproduce:
1) Create bill
2) Flag disputed amount $500
3) Pay undisputed amount $1,500
4) Track dispute resolution
Expected Result:
- Undisputed amount payable
- Disputed amount held
- Dispute tracking activated
- Resolution workflow initiated
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-088
Title: Bill for subcontractor work
Module: Purchases - Bills
Preconditions: Subcontractor agreement exists
Test Data: Subcontractor work $8,000
Steps to Reproduce:
1) Create bill for subcontractor
2) Verify work completion
3) Check for lien waivers if applicable
4) Save bill
Expected Result:
- Work completion documented
- Lien waiver attached if required
- Job costing updated
- GL: Dr. Subcontractor Expense, Cr. AP
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Functional

ID: HB-BILL-089
Title: Bill with purchase tax not recoverable
Module: Purchases - Bills
Preconditions: Non-recoverable input tax scenario
Test Data: Entertainment expense, Tax $100 non-recoverable
Steps to Reproduce:
1) Create bill for entertainment
2) Tax portion non-recoverable
3) Capitalize tax to expense
4) Save bill
Expected Result:
- Non-recoverable tax added to expense
- GL: Dr. Entertainment (including tax), Cr. AP
- No input tax credit claimed
- Compliance with tax rules
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-090
Title: Bill payment with cross-currency settlement
Module: Purchases - Bills
Preconditions: Bill in EUR, Payment from USD account
Test Data: Bill €1,000, Pay from USD account
Steps to Reproduce:
1) Create EUR bill
2) Schedule payment from USD account
3) System converts currency
4) Process payment
Expected Result:
- Currency conversion applied
- FX rate at payment date used
- Realized FX gain/loss recorded
- Multi-currency transaction documented
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

## Performance and Scalability

ID: HB-BILL-091
Title: Bulk bill creation performance
Module: Purchases - Bills
Preconditions: Import 1000+ bills
Test Data: CSV with 1000 bills
Steps to Reproduce:
1) Import large bill file
2) Monitor processing time
3) Verify all bills created
Expected Result:
- Import completes within 5 minutes
- All valid bills created
- GL postings completed
- Error report for invalid records
- System remains responsive
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Performance

ID: HB-BILL-092
Title: AP aging report performance with large dataset
Module: Purchases - Bills
Preconditions: 50,000+ bill records
Test Data: Large bill history
Steps to Reproduce:
1) Run AP aging report
2) Monitor response time
Expected Result:
- Report generates within 30 seconds
- Accurate data
- Exportable
- System remains responsive
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Performance

ID: HB-BILL-093
Title: Concurrent bill entry by multiple users
Module: Purchases - Bills
Preconditions: Multiple users entering bills
Test Data: Different bills simultaneously
Steps to Reproduce:
1) User A creates bill for Vendor X
2) User B creates bill for Vendor Y simultaneously
3) Both save
Expected Result:
- Both bills saved successfully
- No conflicts
- Unique bill numbers
- GL postings accurate
- No data corruption
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Performance

## Mobile and Accessibility

ID: HB-BILL-094
Title: Create bill via mobile app
Module: Purchases - Bills
Preconditions: Mobile app configured
Test Data: Bill $1,500
Steps to Reproduce:
1) Open mobile app
2) Navigate to Bills
3) Create new bill
4) Complete and save
Expected Result:
- Mobile interface responsive
- Touch-friendly controls
- Photo capture for receipts
- Sync with web version
- Approval workflow accessible
Actual Result:
Current Result:
Not executed
Priority: P3
Type: UI

ID: HB-BILL-095
Title: Bill approval via mobile notification
Module: Purchases - Bills
Preconditions: Bill pending approval; Mobile notifications enabled
Test Data: Bill requiring approval
Steps to Reproduce:
1) Bill created and submitted
2) Approver receives mobile notification
3) Approver reviews and approves via mobile
Expected Result:
- Push notification received
- Bill details viewable
- Approve/Reject from mobile
- Status updated immediately
- Audit trail captured
Actual Result:
Current Result:
Not executed
Priority: P3
Type: UI

## Data Integrity and Recovery

ID: HB-BILL-096
Title: Bill recovery after system crash
Module: Purchases - Bills
Preconditions: Bill being saved during crash
Test Data: Bill $3,000
Steps to Reproduce:
1) Create bill
2) Simulate crash during save
3) Restart system
4) Check bill status
Expected Result:
- Bill either fully saved or fully rolled back
- No partial GL postings
- Data integrity maintained
- User notified of incomplete transaction
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Functional

ID: HB-BILL-097
Title: Bill backup and restore verification
Module: Purchases - Bills
Preconditions: System backup exists
Test Data: Recent bills
Steps to Reproduce:
1) Restore from backup
2) Verify bill data
3) Check GL consistency
Expected Result:
- All bills restored correctly
- GL balances match
- No duplicate entries
- Audit trail intact
- AP balance accurate
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

## Final Comprehensive Scenarios

ID: HB-BILL-098
Title: End-to-end bill lifecycle
Module: Purchases - Bills
Preconditions: Complete procurement process
Test Data: PO to payment workflow
Steps to Reproduce:
1) Create purchase order
2) Receive goods
3) Create bill from PO
4) Approve bill
5) Schedule payment
6) Process payment
7) Reconcile with bank
Expected Result:
- Complete workflow executes successfully
- Each step documented
- All accounting entries correct
- Three-way match achieved
- Audit trail complete
Actual Result:
Current Result:
Not executed
Priority: P1
Type: End-to-End

ID: HB-BILL-099
Title: Bill exception handling workflow
Module: Purchases - Bills
Preconditions: Various bill issues
Test Data: Multiple exception scenarios
Steps to Reproduce:
1) Bill with missing PO
2) Bill with pricing variance
3) Bill with quantity discrepancy
4) Route through exception handling
5) Resolve issues
Expected Result:
- Exceptions clearly identified
- Resolution workflow provided
- Escalation as needed
- Resolution tracked
- Metrics on resolution time
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional

ID: HB-BILL-100
Title: Vendor statement reconciliation with bills
Module: Purchases - Bills
Preconditions: Vendor statement received
Test Data: Month-end vendor statement
Steps to Reproduce:
1) Receive vendor statement
2) Match statement to bills in system
3) Identify discrepancies
4) Resolve differences
5) Confirm reconciliation
Expected Result:
- All bills matched to statement
- Discrepancies identified and explained
- Timing differences documented
- Disputed items flagged
- Vendor balance confirmed
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Functional
