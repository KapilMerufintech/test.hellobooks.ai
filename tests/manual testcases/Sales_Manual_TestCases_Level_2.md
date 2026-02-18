# Sales Manual Test Cases - Level 2 (Advanced Accounting Focus)

## Invoices - Level 2

ID: HB-INV-L2-001  
Title: Approval required for invoice above threshold  
Module: Sales - Invoices  
Preconditions: Approval workflow enabled; threshold configured  
Test Data: Invoice total above threshold (e.g., 25,000)  
Steps to Reproduce:  
1) Create invoice above threshold  
2) Attempt to post/send invoice  
Expected Result:  
- Invoice status changes to Pending Approval; posting/sending blocked until approval  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-INV-L2-002  
Title: Credit limit enforcement on posting  
Module: Sales - Invoices  
Preconditions: Customer credit limit configured; existing AR balance  
Test Data: Credit limit 10,000; existing AR 9,500; new invoice 1,000  
Steps to Reproduce:  
1) Create invoice for customer  
2) Attempt to post invoice  
Expected Result:  
- Posting blocked or requires override approval; clear credit limit message shown  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Negative  

ID: HB-INV-L2-003  
Title: Deferred revenue schedule for service item  
Module: Sales - Invoices  
Preconditions: Revenue recognition enabled; service item with deferral rule  
Test Data: Service item 6,000 deferred over 6 months  
Steps to Reproduce:  
1) Create invoice with deferred service item  
2) Post invoice  
Expected Result:  
- Deferred revenue liability created; monthly revenue schedule generated  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-INV-L2-004  
Title: Revenue recognition catch-up after schedule change  
Module: Sales - Invoices  
Preconditions: Deferred revenue schedule exists  
Test Data: Change schedule from 6 months to 3 months mid-cycle  
Steps to Reproduce:  
1) Edit recognition schedule  
2) Save changes  
Expected Result:  
- Remaining revenue recognized per updated schedule without duplicating prior periods  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-INV-L2-005  
Title: Multi-currency revaluation at period close  
Module: Sales - Invoices  
Preconditions: Multi-currency enabled; period close process available  
Test Data: Invoice in EUR; base currency USD; period-end FX rate change  
Steps to Reproduce:  
1) Post EUR invoice  
2) Run period-end revaluation  
Expected Result:  
- Unrealized FX gain/loss posted; AR revalued in base currency  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-INV-L2-006  
Title: Realized FX gain/loss on payment  
Module: Sales - Invoices  
Preconditions: Multi-currency enabled; invoice in foreign currency  
Test Data: Invoice rate 1.10; payment rate 1.15  
Steps to Reproduce:  
1) Record payment with new FX rate  
Expected Result:  
- Realized FX gain/loss posted; AR cleared at invoice rate  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-INV-L2-007  
Title: Apply customer retainer against invoice  
Module: Sales - Invoices  
Preconditions: Customer has retainer/advance balance  
Test Data: Retainer 500; invoice 1,200  
Steps to Reproduce:  
1) Create invoice  
2) Apply retainer  
Expected Result:  
- Retainer liability reduced; invoice balance reduced correctly  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-INV-L2-008  
Title: Withholding tax (customer deducted)  
Module: Sales - Invoices  
Preconditions: Withholding tax configured  
Test Data: Invoice 1,000; withholding 10%  
Steps to Reproduce:  
1) Create and post invoice with withholding tax  
2) Record net payment 900  
Expected Result:  
- Withholding posted to appropriate account; invoice closes with correct balance  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-INV-L2-009  
Title: Round-off adjustment posts to rounding account  
Module: Sales - Invoices  
Preconditions: Rounding account configured  
Test Data: Totals with fractional rounding difference  
Steps to Reproduce:  
1) Create invoice with fractional totals  
2) Post invoice  
Expected Result:  
- Round-off amount posted to rounding account; total matches payable  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-INV-L2-010  
Title: Consolidated invoice from multiple delivery challans  
Module: Sales - Invoices  
Preconditions: Multiple open challans for same customer  
Test Data: Challan A qty 2; Challan B qty 3  
Steps to Reproduce:  
1) Convert multiple challans into one invoice  
Expected Result:  
- Invoice aggregates lines without duplication; challans marked as billed  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-INV-L2-011  
Title: Partial billing from quote with remaining balance tracked  
Module: Sales - Invoices  
Preconditions: Accepted quote exists; partial billing allowed  
Test Data: Quote qty 10; invoice qty 4  
Steps to Reproduce:  
1) Convert quote to invoice with partial quantities  
Expected Result:  
- Invoice created for partial qty; remaining qty stays open on quote  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-INV-L2-012  
Title: Price list effective date applied based on invoice date  
Module: Sales - Invoices  
Preconditions: Customer price list with effective dates  
Test Data: Price list valid for current month  
Steps to Reproduce:  
1) Create invoice dated within price list window  
Expected Result:  
- Item prices pulled from active price list without manual override  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-INV-L2-013  
Title: Restricted discount override requires approval  
Module: Sales - Invoices  
Preconditions: Discount override permission restricted; approval enabled  
Test Data: Attempt 30% discount without permission  
Steps to Reproduce:  
1) Create invoice  
2) Apply restricted discount  
Expected Result:  
- Save blocked or routed for approval; audit log captures attempt  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Security  

ID: HB-INV-L2-014  
Title: AR sub-ledger entry matches posted invoice  
Module: Sales - Invoices  
Preconditions: AR sub-ledger enabled  
Test Data: Invoice total 1,000  
Steps to Reproduce:  
1) Post invoice  
2) Review AR sub-ledger details  
Expected Result:  
- AR sub-ledger entry matches customer, amount, and posting date  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-INV-L2-015  
Title: Cancel invoice after partial payment prompts refund/credit  
Module: Sales - Invoices  
Preconditions: Invoice partially paid; refund workflow enabled  
Test Data: Invoice 1,000; payment 400  
Steps to Reproduce:  
1) Attempt to cancel invoice  
Expected Result:  
- System prompts for refund or credit; ledger remains balanced  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-INV-L2-016  
Title: Invoice created from multiple sales orders preserves linkage  
Module: Sales - Invoices  
Preconditions: Sales orders enabled; multiple open orders  
Test Data: SO-1 and SO-2 for same customer  
Steps to Reproduce:  
1) Create consolidated invoice from two orders  
Expected Result:  
- Invoice lines link to original orders; order status updates  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-INV-L2-017  
Title: Posting blocked when item is inactive  
Module: Sales - Invoices  
Preconditions: Item inactive; invoice draft exists with that item  
Test Data: Inactive item included  
Steps to Reproduce:  
1) Attempt to post invoice  
Expected Result:  
- Posting blocked with clear inactive item message  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Negative  

ID: HB-INV-L2-018  
Title: GL override on line item captured in audit trail  
Module: Sales - Invoices  
Preconditions: GL override enabled; audit log enabled  
Test Data: Override revenue account on one line  
Steps to Reproduce:  
1) Override GL account  
2) Save invoice  
Expected Result:  
- Audit log records user, timestamp, and old/new account  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-INV-L2-019  
Title: Revenue allocation by project/job code  
Module: Sales - Invoices  
Preconditions: Project/job tracking enabled  
Test Data: Project P-100 on line item  
Steps to Reproduce:  
1) Create invoice with project code  
2) Post invoice  
Expected Result:  
- Revenue and AR tagged to project in reports  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-INV-L2-020  
Title: VAT reverse charge on customer-specific tax rule  
Module: Sales - Invoices  
Preconditions: VAT reverse charge configured for customer  
Test Data: Reverse charge tax applied  
Steps to Reproduce:  
1) Create invoice for customer  
2) Apply reverse charge tax rule  
Expected Result:  
- Tax not added to total; tax liability posted per reverse charge rules  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-INV-L2-021  
Title: Multi-branch sequence with branch-specific numbering  
Module: Sales - Invoices  
Preconditions: Multi-branch enabled; branch numbering rules configured  
Test Data: Branch A invoice, Branch B invoice  
Steps to Reproduce:  
1) Create invoice in Branch A  
2) Create invoice in Branch B  
Expected Result:  
- Invoice numbers follow branch-specific sequences  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-INV-L2-022  
Title: Intercompany invoice creates due to/due from entries  
Module: Sales - Invoices  
Preconditions: Intercompany enabled; related entities configured  
Test Data: Invoice issued to related entity  
Steps to Reproduce:  
1) Create invoice to intercompany customer  
2) Post invoice  
Expected Result:  
- Due to/due from accounts posted correctly in both entities  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-INV-L2-023  
Title: Milestone billing with retention held back  
Module: Sales - Invoices  
Preconditions: Retention/holdback configured  
Test Data: Milestone 10,000 with 10% retention  
Steps to Reproduce:  
1) Create milestone invoice  
2) Post invoice  
Expected Result:  
- Retention recorded as separate liability/receivable; net invoice posted  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-INV-L2-024  
Title: E-invoice generation and IRN storage  
Module: Sales - Invoices  
Preconditions: E-invoicing enabled  
Test Data: Invoice eligible for e-invoicing  
Steps to Reproduce:  
1) Post invoice  
2) Generate e-invoice  
Expected Result:  
- IRN generated and stored; QR/JSON attached to invoice  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

## Quotes - Level 2

ID: HB-QUO-L2-001  
Title: Quote versioning after customer view  
Module: Sales - Quotes  
Preconditions: Quote sent and viewed by customer  
Test Data: Update item quantity  
Steps to Reproduce:  
1) Edit quote after customer view  
2) Save  
Expected Result:  
- New version created; prior version retained for audit  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-QUO-L2-002  
Title: Approval required for high discount quote  
Module: Sales - Quotes  
Preconditions: Discount approval rules configured  
Test Data: Discount threshold 20%; apply 30%  
Steps to Reproduce:  
1) Create quote with 30% discount  
2) Attempt to send  
Expected Result:  
- Quote routed for approval; sending blocked until approval  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-QUO-L2-003  
Title: Auto-expiry changes quote status  
Module: Sales - Quotes  
Preconditions: Expiry date set; auto-expiry job enabled  
Test Data: Expiry date in past  
Steps to Reproduce:  
1) Run auto-expiry job  
Expected Result:  
- Quote status changes to Expired; conversion blocked  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-QUO-L2-004  
Title: Partial acceptance converts only selected items  
Module: Sales - Quotes  
Preconditions: Optional items supported  
Test Data: Accept 2 of 3 items  
Steps to Reproduce:  
1) Accept quote with partial items  
2) Convert to invoice  
Expected Result:  
- Invoice includes accepted items only; rejected items excluded  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-QUO-L2-005  
Title: Acceptance-date FX rate used on conversion  
Module: Sales - Quotes  
Preconditions: Multi-currency enabled  
Test Data: Quote rate 1.10; acceptance date rate 1.12  
Steps to Reproduce:  
1) Accept quote  
2) Convert to invoice  
Expected Result:  
- Invoice uses acceptance-date rate; FX rate stored for audit  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-QUO-L2-006  
Title: Margin check blocks below-cost pricing  
Module: Sales - Quotes  
Preconditions: Cost tracking enabled; margin rule configured  
Test Data: Item cost 90; price 85  
Steps to Reproduce:  
1) Create quote below cost  
2) Save  
Expected Result:  
- Save blocked or routed to approval with margin warning  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Negative  

ID: HB-QUO-L2-007  
Title: Tiered pricing applied by quantity brackets  
Module: Sales - Quotes  
Preconditions: Tiered pricing configured  
Test Data: Qty 100 with tier price  
Steps to Reproduce:  
1) Create quote with high quantity  
Expected Result:  
- Unit price adjusts per tier; totals correct  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-QUO-L2-008  
Title: Quote copy excludes acceptance metadata  
Module: Sales - Quotes  
Preconditions: Accepted quote exists  
Test Data: Copy/Clone quote  
Steps to Reproduce:  
1) Copy accepted quote  
Expected Result:  
- New quote has no acceptance signature or timestamps  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-QUO-L2-009  
Title: Acceptance audit captures IP and timestamp  
Module: Sales - Quotes  
Preconditions: Customer acceptance portal enabled  
Test Data: Accept quote via link  
Steps to Reproduce:  
1) Accept quote as customer  
2) Review audit log  
Expected Result:  
- Audit log stores IP, timestamp, and acceptance method  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-QUO-L2-010  
Title: Prevent conversion of expired quote  
Module: Sales - Quotes  
Preconditions: Quote expired  
Test Data: Expired quote  
Steps to Reproduce:  
1) Attempt to convert quote to invoice  
Expected Result:  
- Conversion blocked with expiry message  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Negative  

ID: HB-QUO-L2-011  
Title: Quote uses customer-specific tax exemption  
Module: Sales - Quotes  
Preconditions: Customer marked tax-exempt  
Test Data: Taxable item  
Steps to Reproduce:  
1) Create quote for tax-exempt customer  
Expected Result:  
- Tax not applied; exemption shown on quote  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-QUO-L2-012  
Title: Quote approval chain with multi-level approvers  
Module: Sales - Quotes  
Preconditions: Multi-level approvals configured  
Test Data: Quote requires two approvals  
Steps to Reproduce:  
1) Create quote that triggers approvals  
2) Approve at level 1 and level 2  
Expected Result:  
- Status progresses through approvals; only final approval allows sending  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

## Delivery Challans - Level 2

ID: HB-DC-L2-001  
Title: Stock reservation on challan creation  
Module: Sales - Delivery Challans  
Preconditions: Inventory reservation enabled  
Test Data: Item with limited stock  
Steps to Reproduce:  
1) Create challan for item  
2) Check available stock  
Expected Result:  
- Stock reserved; available quantity reduced  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-DC-L2-002  
Title: Partial delivery creates backorder balance  
Module: Sales - Delivery Challans  
Preconditions: Sales order linked  
Test Data: Order qty 10; deliver 6  
Steps to Reproduce:  
1) Create challan with partial qty  
Expected Result:  
- Backorder qty tracked; order remains partially fulfilled  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-DC-L2-003  
Title: Challan reversal restores stock with audit record  
Module: Sales - Delivery Challans  
Preconditions: Posted challan exists  
Test Data: Reverse challan  
Steps to Reproduce:  
1) Reverse challan  
2) Check inventory and audit log  
Expected Result:  
- Stock restored; audit entry recorded  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-DC-L2-004  
Title: Multi-warehouse challan posts to correct locations  
Module: Sales - Delivery Challans  
Preconditions: Multiple warehouses enabled  
Test Data: Line 1 WH-A, Line 2 WH-B  
Steps to Reproduce:  
1) Create challan with mixed warehouse lines  
Expected Result:  
- Stock reduced in correct warehouses per line  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-DC-L2-005  
Title: Prevent duplicate invoicing of challan  
Module: Sales - Delivery Challans  
Preconditions: Challan already invoiced  
Test Data: Attempt to invoice same challan again  
Steps to Reproduce:  
1) Convert challan to invoice  
2) Try to convert again  
Expected Result:  
- System blocks duplicate invoice; status shows already billed  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Negative  

ID: HB-DC-L2-006  
Title: Serial/batch tracking enforced  
Module: Sales - Delivery Challans  
Preconditions: Item requires serial/batch tracking  
Test Data: Item without serial selected  
Steps to Reproduce:  
1) Create challan for serialized item without serial  
Expected Result:  
- Validation error; posting blocked until serial captured  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Negative  

ID: HB-DC-L2-007  
Title: Challan posts inventory only (no revenue/AR)  
Module: Sales - Delivery Challans  
Preconditions: Accounting integration enabled  
Test Data: Posted challan  
Steps to Reproduce:  
1) Post challan  
2) Review GL  
Expected Result:  
- Inventory movement recorded; no revenue/AR entry created  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-DC-L2-008  
Title: Challan linked to invoice updates delivery status  
Module: Sales - Delivery Challans  
Preconditions: Invoice created from challan  
Test Data: Convert challan to invoice  
Steps to Reproduce:  
1) Convert challan to invoice  
Expected Result:  
- Challan status updates to Invoiced; link visible on invoice  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-DC-L2-009  
Title: Delivery with substitute item requires approval  
Module: Sales - Delivery Challans  
Preconditions: Substitute item workflow enabled  
Test Data: Replace item A with item B  
Steps to Reproduce:  
1) Create challan with substitute item  
2) Attempt to post  
Expected Result:  
- Approval required; audit log captures substitution  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-DC-L2-010  
Title: Over-delivery blocked by policy  
Module: Sales - Delivery Challans  
Preconditions: Over-delivery disabled  
Test Data: Deliver qty greater than order qty  
Steps to Reproduce:  
1) Create challan with higher qty than order  
Expected Result:  
- Validation error; posting blocked  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Negative  

## Recurring Invoices - Level 2

ID: HB-RI-L2-001  
Title: Prorated invoice for mid-cycle start  
Module: Sales - Recurring Invoices  
Preconditions: Proration supported  
Test Data: Monthly plan starting mid-month  
Steps to Reproduce:  
1) Create schedule with mid-month start  
2) Generate first invoice  
Expected Result:  
- First invoice prorated; subsequent invoices full amount  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-RI-L2-002  
Title: Auto-post generated invoices to ledger  
Module: Sales - Recurring Invoices  
Preconditions: Auto-post enabled  
Test Data: Active schedule  
Steps to Reproduce:  
1) Run schedule  
Expected Result:  
- Generated invoices auto-post with accounting entries  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-RI-L2-003  
Title: Schedule failure logs error without partial invoice  
Module: Sales - Recurring Invoices  
Preconditions: Item becomes inactive before run  
Test Data: Inactive item in schedule  
Steps to Reproduce:  
1) Run schedule  
Expected Result:  
- Generation fails with clear log; no partial invoice created  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Negative  

ID: HB-RI-L2-004  
Title: Auto-apply customer credit on generated invoice  
Module: Sales - Recurring Invoices  
Preconditions: Auto-apply credit enabled; customer has credit  
Test Data: Credit 100; invoice 300  
Steps to Reproduce:  
1) Generate invoice  
Expected Result:  
- Credit applied; invoice balance 200; credit reduced to zero  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-RI-L2-005  
Title: Customer currency change affects future invoices only  
Module: Sales - Recurring Invoices  
Preconditions: Multi-currency enabled  
Test Data: Change customer currency USD to EUR  
Steps to Reproduce:  
1) Update customer currency  
2) Generate next invoice  
Expected Result:  
- New invoice uses EUR; previous invoices unchanged  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-RI-L2-006  
Title: Tax rate effective date applied on run date  
Module: Sales - Recurring Invoices  
Preconditions: Tax rates with effective dates configured  
Test Data: New tax rate effective today  
Steps to Reproduce:  
1) Run schedule today  
Expected Result:  
- Generated invoice uses new effective tax rate  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-RI-L2-007  
Title: Recurring schedule skipped when customer inactive  
Module: Sales - Recurring Invoices  
Preconditions: Customer set to inactive  
Test Data: Active schedule for inactive customer  
Steps to Reproduce:  
1) Run schedule  
Expected Result:  
- Invoice not generated; error logged with customer status  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Negative  

ID: HB-RI-L2-008  
Title: Recurring invoice respects credit limit  
Module: Sales - Recurring Invoices  
Preconditions: Credit limit enabled  
Test Data: Credit limit 5,000; AR 4,800; recurring 500  
Steps to Reproduce:  
1) Run schedule  
Expected Result:  
- Invoice generation blocked or routed for approval due to credit limit  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Negative  

ID: HB-RI-L2-009  
Title: Schedule time-zone alignment on run date  
Module: Sales - Recurring Invoices  
Preconditions: Multiple time zones configured  
Test Data: Customer time zone different from system  
Steps to Reproduce:  
1) Run schedule on boundary time  
Expected Result:  
- Invoice generated on correct local date for customer time zone  
Actual Result:  
Current Result:  
Not executed  
Priority: P3  
Type: Functional  

## Payments Received - Level 2

ID: HB-PR-L2-001  
Title: Payment with bank fee posts to expense account  
Module: Sales - Payments Received  
Preconditions: Bank fee account configured  
Test Data: Payment 1,000; fee 10  
Steps to Reproduce:  
1) Record payment with bank fee  
Expected Result:  
- Bank debited 990; fee posted to expense; AR cleared 1,000  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-PR-L2-002  
Title: Undeposited funds workflow to bank deposit  
Module: Sales - Payments Received  
Preconditions: Undeposited funds enabled  
Test Data: Payment 500  
Steps to Reproduce:  
1) Record payment to undeposited funds  
2) Create bank deposit  
Expected Result:  
- Payment clears from undeposited funds to bank account  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-PR-L2-003  
Title: FX gain/loss on foreign currency payment  
Module: Sales - Payments Received  
Preconditions: Multi-currency enabled  
Test Data: Invoice rate 1.10; payment rate 1.05  
Steps to Reproduce:  
1) Record payment at new rate  
Expected Result:  
- FX gain/loss posted; AR cleared at invoice rate  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-PR-L2-004  
Title: Early payment discount auto-applied to GL  
Module: Sales - Payments Received  
Preconditions: Early payment terms configured  
Test Data: 2% discount if paid within 10 days  
Steps to Reproduce:  
1) Record payment within discount period  
Expected Result:  
- Discount applied; AR cleared; discount posted to correct account  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-PR-L2-005  
Title: Chargeback reverses receipt and reopens invoice  
Module: Sales - Payments Received  
Preconditions: Payment recorded; chargeback workflow enabled  
Test Data: Full chargeback  
Steps to Reproduce:  
1) Record chargeback against payment  
Expected Result:  
- Payment reversed; invoice status returns to Open  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-PR-L2-006  
Title: Batch payment import auto-matches invoices  
Module: Sales - Payments Received  
Preconditions: Import and matching rules configured  
Test Data: Import file with invoice numbers  
Steps to Reproduce:  
1) Import payment batch  
Expected Result:  
- Payments auto-applied to matching invoices; exceptions flagged  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-PR-L2-007  
Title: Partial refund from customer credit  
Module: Sales - Payments Received  
Preconditions: Overpayment created customer credit  
Test Data: Credit 200; refund 50  
Steps to Reproduce:  
1) Issue partial refund  
Expected Result:  
- Credit reduced; refund posted to bank; audit recorded  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-PR-L2-008  
Title: Reverse payment in closed period requires adjustment  
Module: Sales - Payments Received  
Preconditions: Closed period; adjustment posting allowed  
Test Data: Reverse payment dated in closed period  
Steps to Reproduce:  
1) Attempt reversal  
Expected Result:  
- System prompts to post adjustment in open period; no direct reversal  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Negative  

ID: HB-PR-L2-009  
Title: Split payment across multiple bank accounts  
Module: Sales - Payments Received  
Preconditions: Split payments allowed  
Test Data: Payment 1,000 split 600/400  
Steps to Reproduce:  
1) Record split payment  
Expected Result:  
- Two bank postings; AR cleared once  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-PR-L2-010  
Title: Apply customer credit with tax adjustment  
Module: Sales - Payments Received  
Preconditions: Credit includes tax component  
Test Data: Credit 110 (100 + tax 10)  
Steps to Reproduce:  
1) Apply credit to invoice  
Expected Result:  
- Tax liability adjusted; invoice balance updated  
Actual Result:  
Current Result:  
Not executed  
Priority: P1  
Type: Functional  

ID: HB-PR-L2-011  
Title: Payment allocation respects invoice priority rules  
Module: Sales - Payments Received  
Preconditions: Allocation priority configured (oldest first)  
Test Data: Three open invoices with different dates  
Steps to Reproduce:  
1) Record payment without manual allocation  
Expected Result:  
- System allocates to oldest invoices per rule  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-PR-L2-012  
Title: Suspense account used when bank mapping missing  
Module: Sales - Payments Received  
Preconditions: Bank account mapping missing; suspense configured  
Test Data: Payment with unmapped bank account  
Steps to Reproduce:  
1) Record payment  
Expected Result:  
- Payment posted to suspense account; warning shown  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-PR-L2-013  
Title: Payment reversal restores invoice aging bucket  
Module: Sales - Payments Received  
Preconditions: Payment recorded on overdue invoice  
Test Data: Reverse payment  
Steps to Reproduce:  
1) Reverse payment  
2) Check aging report  
Expected Result:  
- Invoice returns to correct aging bucket based on due date  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-PR-L2-014  
Title: Apply payment to invoice with retention balance  
Module: Sales - Payments Received  
Preconditions: Invoice includes retention/holdback  
Test Data: Invoice 10,000; retention 1,000; payment 9,000  
Steps to Reproduce:  
1) Record payment for net amount  
Expected Result:  
- Invoice marked Partially Paid with retention outstanding; AR reflects holdback  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  

ID: HB-PR-L2-015  
Title: Customer credit revaluation in foreign currency  
Module: Sales - Payments Received  
Preconditions: Multi-currency enabled; credit balance in foreign currency  
Test Data: Credit in EUR; period-end rate change  
Steps to Reproduce:  
1) Run period-end revaluation  
Expected Result:  
- Credit balance revalued; FX gain/loss recorded  
Actual Result:  
Current Result:  
Not executed  
Priority: P2  
Type: Functional  
