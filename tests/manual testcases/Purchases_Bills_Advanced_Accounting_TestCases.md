# Purchases - Bills Advanced Accounting Test Cases (Hellobooks)

**Test Environment:** https://test.hellobooks.ai/login
**Test Credentials:**
- Email: fapopi7433@feanzier.com
- Password: Kapil08dangar@

## Advanced Accrual Accounting

ID: HB-BILL-ADV-001
Title: Accrual to cash basis conversion for bills
Module: Purchases - Bills (Advanced Accounting)
Preconditions: System configured for both methods
Test Data: Bill $5,000 recorded on accrual, convert to cash
Steps to Reproduce:
1) Create bill on accrual basis (Dec 31)
2) Bill not paid in December
3) Convert to cash basis reporting
4) Review year-end financials
Expected Result:
- Accrual: Expense recognized Dec 31
- Cash: Expense recognized when paid
- Reconciliation schedule shows timing difference
- Both reports available
- Adjustment journal entries documented
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Advanced Accounting

ID: HB-BILL-ADV-002
Title: Deferred expense allocation from bill
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Multi-period expense
Test Data: 3-year software license $3,600
Steps to Reproduce:
1) Create bill for $3,600
2) Post to Deferred Expense account
3) Set up 36-month amortization schedule
4) Generate monthly amortization entries
Expected Result:
- Initial GL: Dr. Deferred Expense $3,600, Cr. AP $3,600
- Monthly: Dr. Software Expense $100, Cr. Deferred Expense $100
- Balance sheet shows declining deferred asset
- P&L shows monthly expense of $100
- Schedule tracks remaining deferred balance
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Advanced Accounting

ID: HB-BILL-ADV-003
Title: Expense vs capital expenditure determination
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Capitalization policy defined
Test Data: Equipment repair $800 vs equipment upgrade $8,000
Steps to Reproduce:
1) Create bill for $800 repair (expense)
2) Create bill for $8,000 upgrade (capitalize)
3) Review GL coding
4) Verify capitalization policy compliance
Expected Result:
- Repair: Dr. Repair Expense $800, Cr. AP $800 (P&L impact)
- Upgrade: Dr. Fixed Assets $8,000, Cr. AP $8,000 (Balance sheet)
- Capitalization threshold policy applied
- Asset depreciation schedule created for upgrade
- Policy adherence documented
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Advanced Accounting

ID: HB-BILL-ADV-004
Title: Cost allocation by percentage to departments
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Multiple departments; Allocation rules
Test Data: Utility bill $10,000 (Sales 40%, Admin 30%, Production 30%)
Steps to Reproduce:
1) Create bill for $10,000
2) Apply allocation rule
3) System splits by department
4) Save bill
Expected Result:
- GL entries:
  - Dr. Utilities - Sales $4,000
  - Dr. Utilities - Admin $3,000
  - Dr. Utilities - Production $3,000
  - Cr. AP $10,000
- Departmental P&L shows allocated expenses
- Cost center reports accurate
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Advanced Accounting

ID: HB-BILL-ADV-005
Title: Activity-based costing allocation from bill
Module: Purchases - Bills (Advanced Accounting)
Preconditions: ABC costing model configured
Test Data: Overhead expense allocated to products
Steps to Reproduce:
1) Create bill for overhead expense $15,000
2) Allocate based on activity drivers (machine hours)
3) System distributes to products
4) Review product cost updates
Expected Result:
- Overhead allocated to products by activity
- Product costs updated
- ABC report shows allocation
- GL reflects allocation by product line
- Cost of goods manufactured updated
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Advanced Accounting

## Revenue vs Capital Distinction

ID: HB-BILL-ADV-006
Title: Revenue expenditure proper classification
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Operational expenses
Test Data: Monthly maintenance $500
Steps to Reproduce:
1) Create bill for routine maintenance
2) Code to expense account
3) Verify P&L impact
Expected Result:
- GL: Dr. Maintenance Expense $500, Cr. AP $500
- Appears in P&L immediately
- Reduces net income
- Not capitalized to balance sheet
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Advanced Accounting

ID: HB-BILL-ADV-007
Title: Capital expenditure and depreciation setup
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Asset acquisition
Test Data: Machinery $50,000
Steps to Reproduce:
1) Create bill for machinery
2) Capitalize to Fixed Assets
3) Set up depreciation (10 year, straight-line)
4) Review asset register
Expected Result:
- GL: Dr. Fixed Assets - Machinery $50,000, Cr. AP $50,000
- Asset register updated
- Depreciation schedule created ($5,000/year)
- No immediate P&L impact
- Balance sheet assets increased
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Advanced Accounting

ID: HB-BILL-ADV-008
Title: Betterment vs repair accounting treatment
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Existing asset; Improvement made
Test Data: Building repair $2,000 vs addition $20,000
Steps to Reproduce:
1) Bill for repair: Expense immediately
2) Bill for addition: Capitalize
3) Review accounting treatment
Expected Result:
- Repair: Dr. Building Repair Expense, Cr. AP (P&L)
- Addition: Dr. Building (increases asset basis), Cr. AP (Balance sheet)
- Addition extends useful life or increases value
- Proper GAAP treatment applied
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Advanced Accounting

ID: HB-BILL-ADV-009
Title: Asset acquisition with installation costs
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Asset purchase with setup
Test Data: Equipment $40,000, Installation $3,000, Training $1,500
Steps to Reproduce:
1) Create bill for equipment
2) Add installation costs
3) Determine if training is capitalized
4) Save bill with proper allocation
Expected Result:
- Equipment + Installation capitalized: $43,000
- Training expensed: $1,500
- GL: Dr. Fixed Assets $43,000, Dr. Training Expense $1,500, Cr. AP $44,500
- Costs to get asset ready for use capitalized
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Advanced Accounting

ID: HB-BILL-ADV-010
Title: Research vs development cost treatment
Module: Purchases - Bills (Advanced Accounting)
Preconditions: R&D project expenses
Test Data: Research $10,000, Development $15,000
Steps to Reproduce:
1) Bill for research phase: Expense
2) Bill for development phase: May capitalize
3) Apply accounting policy
Expected Result:
- Research expensed: Dr. R&D Expense $10,000, Cr. AP
- Development: Capitalize if criteria met, else expense
- GAAP/IFRS rules applied
- Policy documentation maintained
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Advanced Accounting

## Matching Principle and Period Allocation

ID: HB-BILL-ADV-011
Title: Matching expense to revenue period
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Revenue earned in Q1; Related expense in Q2
Test Data: Commission on Q1 sales, paid in Q2
Steps to Reproduce:
1) Accrue commission expense in Q1
2) Receive actual bill in Q2
3) Reverse accrual and post actual
4) Verify matching
Expected Result:
- Q1: Dr. Commission Expense, Cr. Accrued Commission (accrual)
- Q2: Reverse accrual, post actual bill
- Expense matched to revenue period
- Matching principle applied
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Advanced Accounting

ID: HB-BILL-ADV-012
Title: Unbilled accruals for goods received
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Goods received Dec 31, Bill received Jan 5
Test Data: Inventory received $8,000
Steps to Reproduce:
1) Goods received Dec 31
2) Accrue at month-end
3) Receive bill Jan 5
4) Reverse accrual and post bill
Expected Result:
- Dec 31: Dr. Inventory $8,000, Cr. Accrued Expenses $8,000
- Jan 5: Reverse accrual, post bill to AP
- Inventory in correct period
- No duplicate expense
- Cut-off properly handled
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Advanced Accounting

ID: HB-BILL-ADV-013
Title: Prepaid expense amortization
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Annual insurance paid upfront
Test Data: Insurance $12,000 for 12 months
Steps to Reproduce:
1) Create bill $12,000
2) Post to Prepaid Insurance
3) Set up monthly amortization ($1,000/month)
4) Track prepaid balance
Expected Result:
- Initial: Dr. Prepaid Insurance $12,000, Cr. AP $12,000
- Monthly: Dr. Insurance Expense $1,000, Cr. Prepaid Insurance $1,000
- Balance sheet shows declining prepaid asset
- Expense recognized ratably over benefit period
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Advanced Accounting

ID: HB-BILL-ADV-014
Title: 13-month expense allocation
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Annual expense spanning fiscal years
Test Data: Dec-to-Dec contract billed annually
Steps to Reproduce:
1) Bill received for Dec Year 1 to Nov Year 2
2) Allocate 1 month to Year 1, 11 months to Year 2
3) Create prepaid for Year 2 portion
Expected Result:
- Year 1: Dr. Expense $X (1 month), Dr. Prepaid $Y (11 months), Cr. AP
- Year 2: Monthly amortization of prepaid
- Proper period allocation
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Advanced Accounting

ID: HB-BILL-ADV-015
Title: Expense allocation by usage metrics
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Shared service expense
Test Data: IT support $20,000 allocated by headcount
Steps to Reproduce:
1) Create bill for shared IT support
2) Allocate by department headcount
3) Dept A: 60 employees, Dept B: 40 employees
4) Split 60/40
Expected Result:
- Dept A: $12,000 (60%)
- Dept B: $8,000 (40%)
- GL entries reflect allocation
- Fair allocation based on usage driver
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Advanced Accounting

## Job Costing and Project Accounting

ID: HB-BILL-ADV-016
Title: Bill allocation to job/project
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Job costing enabled; Project exists
Test Data: Materials for Project A $5,000
Steps to Reproduce:
1) Create bill
2) Assign to Project A
3) Save bill
Expected Result:
- GL: Dr. Project A - Materials $5,000, Cr. AP $5,000
- Project cost tracking updated
- Job costing report shows expense
- Project margin analysis updated
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Advanced Accounting

ID: HB-BILL-ADV-017
Title: Split bill across multiple projects
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Multiple active projects
Test Data: Shared resource bill $10,000
Steps to Reproduce:
1) Create bill $10,000
2) Allocate: Project A $6,000, Project B $4,000
3) Save allocation
Expected Result:
- GL split by project
- Each project P&L updated correctly
- Job cost reports accurate
- Project budgets updated
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Advanced Accounting

ID: HB-BILL-ADV-018
Title: Overhead allocation to projects
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Overhead pool and allocation method
Test Data: Indirect costs $15,000
Steps to Reproduce:
1) Bill for overhead expense
2) Allocate to projects based on direct labor $
3) Review allocated costs
Expected Result:
- Overhead allocated proportionally
- Each project bears fair share of overhead
- Project costs include direct + allocated overhead
- Full absorption costing achieved
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Advanced Accounting

ID: HB-BILL-ADV-019
Title: Project cost vs budget variance analysis
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Project budget set; Bills posted to project
Test Data: Budget $50,000, Actual bills $55,000
Steps to Reproduce:
1) Post bills to project
2) Compare actual to budget
3) Review variance report
Expected Result:
- Variance: $5,000 over budget (10%)
- Variance analysis available
- Budget alerts triggered
- Project manager notified
- Corrective action initiated
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Advanced Accounting

ID: HB-BILL-ADV-020
Title: Work-in-progress (WIP) accounting for projects
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Long-term project; Costs accumulating
Test Data: Project costs $30,000, Not yet billed to customer
Steps to Reproduce:
1) Post bills to project
2) Costs accumulate in WIP
3) Review WIP balance
Expected Result:
- GL: Dr. WIP - Project X $30,000, Cr. AP/Bank
- WIP shown as current asset
- Revenue recognition pending
- Balance sheet reflects unbilled work
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Advanced Accounting

## Inventory Valuation and COGS

ID: HB-BILL-ADV-021
Title: Inventory bill with FIFO costing
Module: Purchases - Bills (Advanced Accounting)
Preconditions: FIFO inventory method
Test Data: Purchase 100 units @ $10, then 100 @ $12
Steps to Reproduce:
1) Bill for first purchase: 100 @ $10
2) Bill for second purchase: 100 @ $12
3) Sell 150 units
4) Review COGS calculation
Expected Result:
- COGS: (100 @ $10) + (50 @ $12) = $1,600
- Ending inventory: 50 @ $12 = $600
- FIFO method properly applied
- Oldest costs flow to COGS first
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Advanced Accounting

ID: HB-BILL-ADV-022
Title: Inventory bill with LIFO costing
Module: Purchases - Bills (Advanced Accounting)
Preconditions: LIFO inventory method (where allowed)
Test Data: Purchase 100 units @ $10, then 100 @ $12
Steps to Reproduce:
1) Bill for first purchase: 100 @ $10
2) Bill for second purchase: 100 @ $12
3) Sell 150 units
4) Review COGS calculation
Expected Result:
- COGS: (100 @ $12) + (50 @ $10) = $1,700
- Ending inventory: 50 @ $10 = $500
- LIFO method properly applied
- Most recent costs flow to COGS first
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Advanced Accounting

ID: HB-BILL-ADV-023
Title: Inventory bill with weighted average costing
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Weighted average inventory method
Test Data: Purchase 100 @ $10, then 100 @ $12
Steps to Reproduce:
1) Bill for first purchase
2) Bill for second purchase
3) Calculate weighted average: $11
4) Sell 150 units
Expected Result:
- Average cost: ($1,000 + $1,200) / 200 = $11/unit
- COGS: 150 @ $11 = $1,650
- Ending inventory: 50 @ $11 = $550
- Weighted average applied correctly
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Advanced Accounting

ID: HB-BILL-ADV-024
Title: Inventory obsolescence provision from bill review
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Slow-moving inventory identified
Test Data: Inventory value $10,000, 20% obsolete
Steps to Reproduce:
1) Review inventory bills and aging
2) Identify obsolete items
3) Create obsolescence provision $2,000
4) Adjust inventory value
Expected Result:
- GL: Dr. Obsolescence Expense $2,000, Cr. Inventory Reserve $2,000
- Net inventory value: $8,000
- Balance sheet shows net realizable value
- Conservative accounting applied
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Advanced Accounting

ID: HB-BILL-ADV-025
Title: Lower of cost or market inventory adjustment
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Inventory cost $15,000, Market value $13,000
Test Data: Market decline in inventory value
Steps to Reproduce:
1) Review inventory costs from bills
2) Compare to current market value
3) Write down to lower value
Expected Result:
- GL: Dr. Inventory Write-down $2,000, Cr. Inventory $2,000
- Inventory at NRV (net realizable value)
- LCM rule applied
- Conservative valuation
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Advanced Accounting

## Foreign Currency and Exchange

ID: HB-BILL-ADV-026
Title: Foreign currency bill revaluation at period-end
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Unpaid foreign currency bill; Rate changed
Test Data: Bill €10,000 at rate 1.10 ($11,000); Period-end rate 1.12
Steps to Reproduce:
1) Create EUR bill at rate 1.10
2) Bill remains unpaid at month-end
3) Revalue at current rate 1.12
4) Record unrealized FX loss
Expected Result:
- Original: AP $11,000
- Revaluation: AP $11,200 (€10,000 × 1.12)
- GL: Dr. Unrealized FX Loss $200, Cr. AP $200
- P&L shows unrealized loss
- Balance sheet shows updated AP value
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Advanced Accounting

ID: HB-BILL-ADV-027
Title: Realized vs unrealized FX gains/losses
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Foreign currency bills
Test Data: Multiple FX transactions
Steps to Reproduce:
1) Track unpaid bills (unrealized)
2) Pay bills (realized)
3) Separate reporting
Expected Result:
- Unrealized: Period-end revaluation (may reverse)
- Realized: Actual cash impact at payment
- Separate P&L line items
- Clear distinction in reporting
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Advanced Accounting

ID: HB-BILL-ADV-028
Title: Hedge accounting for foreign currency bills
Module: Purchases - Bills (Advanced Accounting)
Preconditions: FX hedge instrument in place
Test Data: EUR bill hedged with forward contract
Steps to Reproduce:
1) Create EUR bill
2) Link to FX forward contract
3) Apply hedge accounting
4) Review hedge effectiveness
Expected Result:
- FX gains/losses offset by hedge instrument
- Net exposure minimized
- Hedge documentation maintained
- Effective portion deferred to equity (cash flow hedge)
- P&L volatility reduced
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Advanced Accounting

ID: HB-BILL-ADV-029
Title: Multi-currency consolidation of AP
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Bills in multiple currencies
Test Data: Bills in USD, EUR, GBP, JPY
Steps to Reproduce:
1) Create bills in various currencies
2) Consolidate to reporting currency (USD)
3) Apply current exchange rates
4) Review consolidated AP
Expected Result:
- All foreign currency AP converted to USD
- Current rates applied
- Consolidated AP balance accurate
- Multi-currency drill-down available
- Currency risk exposure visible
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Advanced Accounting

ID: HB-BILL-ADV-030
Title: FX impact on cash flow forecasting
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Foreign currency bills payable
Test Data: Future payments in foreign currencies
Steps to Reproduce:
1) Review payables in foreign currencies
2) Forecast payments
3) Apply forward rates
4) Estimate FX impact on cash
Expected Result:
- Cash flow forecast includes FX impact
- Multiple rate scenarios available
- Risk analysis for currency movements
- Hedging recommendations
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Advanced Accounting

## Intercompany Transactions

ID: HB-BILL-ADV-031
Title: Intercompany bill and elimination entries
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Multi-entity structure
Test Data: Entity A purchases from Entity B $20,000
Steps to Reproduce:
1) Entity A records bill (Expense + IC AP)
2) Entity B records sale (Revenue + IC AR)
3) Generate consolidation eliminations
4) Review consolidated statements
Expected Result:
- Stand-alone: Each entity records transaction
- Consolidated: Elimination entries remove IC balances
- No IC revenue/expense in consolidated P&L
- No IC AR/AP in consolidated balance sheet
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Advanced Accounting

ID: HB-BILL-ADV-032
Title: Intercompany profit elimination on inventory
Module: Purchases - Bills (Advanced Accounting)
Preconditions: IC inventory transfer with markup
Test Data: Entity B sells to Entity A at 20% markup
Steps to Reproduce:
1) Entity A bills for inventory from Entity B
2) Inventory includes IC profit
3) Eliminate unrealized profit in consolidation
4) Realize profit upon external sale
Expected Result:
- Unrealized IC profit eliminated from inventory
- Consolidated inventory at cost to group
- Profit recognized upon external sale
- Proper consolidation adjustments
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Advanced Accounting

ID: HB-BILL-ADV-033
Title: Intercompany services and cost allocation
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Shared services center
Test Data: Corporate services billed to subsidiaries
Steps to Reproduce:
1) Corporate bills subsidiaries for services
2) Allocate by appropriate driver
3) Review IC billing
4) Consolidation treatment
Expected Result:
- Services fairly allocated
- IC eliminations applied
- Management reporting shows allocations
- Consolidated view removes IC transactions
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Advanced Accounting

## Lease Accounting

ID: HB-BILL-ADV-034
Title: Operating lease - monthly rent bill
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Operating lease agreement
Test Data: Monthly rent $5,000
Steps to Reproduce:
1) Create bill for monthly rent
2) Code to rent expense
3) Straight-line over lease term if escalating
Expected Result:
- GL: Dr. Rent Expense $5,000, Cr. AP $5,000
- Expensed immediately (operating lease)
- No asset or liability on balance sheet (old GAAP)
- Or ROU asset + lease liability (new GAAP)
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Advanced Accounting

ID: HB-BILL-ADV-035
Title: Finance lease - capitalize lease asset from bill
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Lease meets capitalization criteria
Test Data: Equipment lease, present value $30,000
Steps to Reproduce:
1) Create bill/entry for lease
2) Capitalize ROU asset and lease liability
3) Set up depreciation and interest
Expected Result:
- GL: Dr. ROU Asset $30,000, Cr. Lease Liability $30,000
- Depreciation on ROU asset
- Interest expense on liability
- Principal reduction with payments
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Advanced Accounting

ID: HB-BILL-ADV-036
Title: Lease incentive accounting
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Lease with landlord incentive
Test Data: Rent abatement first 3 months
Steps to Reproduce:
1) Record lease with incentive
2) Amortize incentive over lease term
3) Straight-line rent expense
Expected Result:
- Incentive creates deferred rent liability
- Rent expense straight-lined over term
- No revenue spike from incentive
- Proper matching over lease period
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Advanced Accounting

## Internal Controls and SOX Compliance

ID: HB-BILL-ADV-037
Title: Three-way match control testing
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Three-way match control enabled
Test Data: PO, Receipt, Bill
Steps to Reproduce:
1) Create bill without matching PO
2) Attempt to post
3) Verify control prevents posting
Expected Result:
- Bill posting blocked without proper match
- Exception approval required
- Control effectiveness demonstrated
- SOX compliance maintained
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Internal Controls

ID: HB-BILL-ADV-038
Title: Maker-checker control for bill approval
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Dual control policy
Test Data: Bill requiring two approvals
Steps to Reproduce:
1) User A creates bill
2) User B reviews and approves
3) User C verifies and final approval
Expected Result:
- Segregation of duties enforced
- No single-person control over bill process
- Both approvals required before posting
- Audit trail shows both approvers
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Internal Controls

ID: HB-BILL-ADV-039
Title: Duplicate payment prevention control
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Same bill entered twice
Test Data: Duplicate bill
Steps to Reproduce:
1) Create bill
2) Attempt to create same bill again
3) System detects duplicate
Expected Result:
- Duplicate detection triggers
- Warning displayed with match details
- Prevents duplicate payment
- Control prevents fraud/error
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Internal Controls

ID: HB-BILL-ADV-040
Title: Segregation of duties - AP clerk cannot approve
Module: Purchases - Bills (Advanced Accounting)
Preconditions: SOD matrix configured
Test Data: AP clerk role
Steps to Reproduce:
1) AP clerk creates bill
2) Attempts to approve own bill
Expected Result:
- Approval action blocked
- Must route to authorized approver
- SOD violation prevented
- Audit log records attempt
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Internal Controls

ID: HB-BILL-ADV-041
Title: Authorization limit controls
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Hierarchical approval limits
Test Data: Manager limit $10K, Director $50K, VP $100K+
Steps to Reproduce:
1) Create bills of varying amounts
2) System routes to appropriate approver
3) Verify escalation
Expected Result:
- Bills route to approver with sufficient authority
- Escalation for amounts exceeding limit
- Approval hierarchy enforced
- No unauthorized approvals possible
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Internal Controls

## Audit and Compliance

ID: HB-BILL-ADV-042
Title: Audit trail completeness for bill lifecycle
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Full audit logging enabled
Test Data: Bill from creation to payment
Steps to Reproduce:
1) Create, modify, approve, pay bill
2) Review complete audit trail
3) Verify all changes logged
Expected Result:
- Every action logged with timestamp, user, IP
- Before/after values for changes
- Deletion attempts blocked
- Complete reconstruction possible
- Meets audit requirements
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Audit & Compliance

ID: HB-BILL-ADV-043
Title: Vendor master data change audit
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Vendor bank account changed
Test Data: Bank account modification
Steps to Reproduce:
1) Modify vendor bank account
2) Review change log
3) Verify approval for change
4) Check for fraud indicators
Expected Result:
- Change requires approval
- Old and new values logged
- Notification to AP manager
- Fraud prevention control
- Audit trail maintained
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Audit & Compliance

ID: HB-BILL-ADV-044
Title: Period-end cut-off testing
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Month-end close
Test Data: Bills around period boundary
Steps to Reproduce:
1) Review bills dated near month-end
2) Verify goods receipt dates
3) Ensure proper period allocation
4) Test cut-off accuracy
Expected Result:
- Bills recorded in correct period
- Matched to goods receipt timing
- No material misstatement
- Cut-off procedures documented
- Audit evidence maintained
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Audit & Compliance

ID: HB-BILL-ADV-045
Title: Vendor invoice approval documentation
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Supporting documentation required
Test Data: Bill with no attached invoice
Steps to Reproduce:
1) Attempt to approve bill without attachment
2) System checks for documentation
Expected Result:
- Warning if documentation missing
- Approval blocked or requires override
- Documentation requirement enforced
- Audit requirement met
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Audit & Compliance

ID: HB-BILL-ADV-046
Title: Tax compliance - input tax documentation
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Tax credit claimed
Test Data: Bill with input tax
Steps to Reproduce:
1) Create bill with input tax credit
2) Verify supporting documentation
3) Review tax compliance
Expected Result:
- Tax invoice attached
- Credit properly substantiated
- Compliance with tax law requirements
- Audit trail for tax authorities
Actual Result:
Current Result:
Not executed
Priority: P1
Type: Audit & Compliance

## Management Accounting

ID: HB-BILL-ADV-047
Title: Variance analysis - actual vs budget
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Budget set; Actual bills posted
Test Data: Budget vs actual variances
Steps to Reproduce:
1) Compare actual bills to budget
2) Analyze variances by account
3) Generate variance report
Expected Result:
- Favorable and unfavorable variances identified
- Variance percentages calculated
- Drill-down to transaction detail
- Explanation and corrective action
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Management Accounting

ID: HB-BILL-ADV-048
Title: Flexible budgeting with volume adjustments
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Variable costs in budget
Test Data: Actual volume differs from budgeted
Steps to Reproduce:
1) Review static budget
2) Adjust for actual volume
3) Create flexible budget
4) Compare actual to flexible budget
Expected Result:
- Flexible budget adjusts for volume changes
- More meaningful variance analysis
- Separates volume from price/efficiency variances
- Better performance evaluation
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Management Accounting

ID: HB-BILL-ADV-049
Title: Contribution margin analysis
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Variable vs fixed cost classification
Test Data: Product costs from bills
Steps to Reproduce:
1) Classify bills as variable or fixed
2) Calculate contribution margin by product
3) Review profitability
Expected Result:
- Variable costs separated from fixed
- Contribution margin = Revenue - Variable costs
- Product profitability analysis
- Decision-making insights
Actual Result:
Current Result:
Not executed
Priority: P2
Type: Management Accounting

ID: HB-BILL-ADV-050
Title: Break-even analysis using bill data
Module: Purchases - Bills (Advanced Accounting)
Preconditions: Cost structure from bills
Test Data: Fixed and variable costs
Steps to Reproduce:
1) Extract fixed costs from bills
2) Identify variable costs per unit
3) Calculate break-even point
Expected Result:
- Break-even units = Fixed Costs / Contribution Margin per unit
- Break-even revenue calculated
- Margin of safety analysis
- Strategic planning tool
Actual Result:
Current Result:
Not executed
Priority: P3
Type: Management Accounting
