# Manual Test Cases - Delivery Challans (Sales > Delivery Challans)

## Seed Credentials
- Email: fapopi7433@feanzier.com
- Password: Kapil08dangar@

- ID: HB-DC-001
- Title: Open Delivery Challans list after login
- Module: Sales / Delivery Challans
- Preconditions: User is logged out
- Test Data: Seed credentials
- Steps to Reproduce:
  1) Login with seed credentials
  2) Navigate to Sales > Delivery Challans
- Expected Result:
  - Delivery Challans list loads without errors
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Verify list heading

- ID: HB-DC-002
- Title: Create draft delivery challan with required fields
- Module: Sales / Delivery Challans
- Preconditions: User is logged in
- Test Data: Existing customer and item
- Steps to Reproduce:
  1) Click New Delivery Challan
  2) Select customer
  3) Add one item with qty
  4) Save as Draft
- Expected Result:
  - Draft challan saved with correct quantities
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Check status Draft

- ID: HB-DC-003
- Title: Required customer validation on challan
- Module: Sales / Delivery Challans
- Preconditions: User is logged in
- Test Data: None
- Steps to Reproduce:
  1) Click New Delivery Challan
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
- Automation Notes: Check error on customer field

- ID: HB-DC-004
- Title: Required line items validation on challan
- Module: Sales / Delivery Challans
- Preconditions: User is logged in
- Test Data: Customer only
- Steps to Reproduce:
  1) Create challan with customer only
  2) Save
- Expected Result:
  - Validation shown or policy enforced
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative
- Automation Notes: Document expected behavior

- ID: HB-DC-005
- Title: Item quantity required for each line
- Module: Sales / Delivery Challans
- Preconditions: User is logged in
- Test Data: Item without qty
- Steps to Reproduce:
  1) Add item line
  2) Leave qty empty
  3) Save
- Expected Result:
  - Qty validation shown
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Negative
- Automation Notes: Check qty error

- ID: HB-DC-006
- Title: Prevent negative quantity on challan line
- Module: Sales / Delivery Challans
- Preconditions: User is logged in
- Test Data: Negative qty
- Steps to Reproduce:
  1) Add item line with negative qty
  2) Save
- Expected Result:
  - Validation error or block per policy
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Negative
- Automation Notes: Confirm validation message

- ID: HB-DC-007
- Title: Allow zero quantity only if policy permits
- Module: Sales / Delivery Challans
- Preconditions: User is logged in
- Test Data: Zero qty
- Steps to Reproduce:
  1) Add item with qty 0
  2) Save
- Expected Result:
  - Behavior follows policy (blocked or allowed)
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Negative
- Automation Notes: Document behavior

- ID: HB-DC-008
- Title: Multiple line items sum correctly
- Module: Sales / Delivery Challans
- Preconditions: User is logged in
- Test Data: Multiple items
- Steps to Reproduce:
  1) Add multiple items with qty
  2) Save
- Expected Result:
  - Each line shows correct qty; totals (if shown) correct
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify quantities and totals

- ID: HB-DC-009
- Title: Challan numbering sequence increments
- Module: Sales / Delivery Challans
- Preconditions: Numbering configured
- Test Data: Create two challans
- Steps to Reproduce:
  1) Create challan A
  2) Create challan B
- Expected Result:
  - Challan numbers unique and sequential
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Capture numbers

- ID: HB-DC-010
- Title: Duplicate challan number rejected
- Module: Sales / Delivery Challans
- Preconditions: Manual number allowed
- Test Data: Existing challan number
- Steps to Reproduce:
  1) Create challan using existing number
- Expected Result:
  - Validation prevents duplicate
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Negative
- Automation Notes: Check error message

- ID: HB-DC-011
- Title: Delivery date required
- Module: Sales / Delivery Challans
- Preconditions: User is logged in
- Test Data: Missing delivery date
- Steps to Reproduce:
  1) Create challan without delivery date
  2) Save
- Expected Result:
  - Validation shown if delivery date required
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative
- Automation Notes: Document rule

- ID: HB-DC-012
- Title: Delivery date can be edited
- Module: Sales / Delivery Challans
- Preconditions: User is logged in
- Test Data: Any date
- Steps to Reproduce:
  1) Set delivery date
  2) Save challan
- Expected Result:
  - Delivery date saved and visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify saved date

- ID: HB-DC-013
- Title: Ship-to address selection
- Module: Sales / Delivery Challans
- Preconditions: Customer has multiple addresses
- Test Data: Ship-to address
- Steps to Reproduce:
  1) Select ship-to address
  2) Save challan
- Expected Result:
  - Selected address saved and shown on challan
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify address

- ID: HB-DC-014
- Title: Bill-to address selection
- Module: Sales / Delivery Challans
- Preconditions: Customer has multiple addresses
- Test Data: Bill-to address
- Steps to Reproduce:
  1) Select bill-to address
  2) Save challan
- Expected Result:
  - Selected bill-to saved and displayed
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify address

- ID: HB-DC-015
- Title: Attach file to delivery challan
- Module: Sales / Delivery Challans
- Preconditions: Challan exists
- Test Data: Small attachment
- Steps to Reproduce:
  1) Upload attachment to challan
- Expected Result:
  - Attachment saved and listed
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify attachment list

- ID: HB-DC-016
- Title: Attachment size limit enforced
- Module: Sales / Delivery Challans
- Preconditions: Attachment limit configured
- Test Data: File over size limit
- Steps to Reproduce:
  1) Upload oversized file
- Expected Result:
  - Upload blocked with clear error
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Negative
- Automation Notes: Check error message

- ID: HB-DC-017
- Title: Notes and terms displayed on challan
- Module: Sales / Delivery Challans
- Preconditions: Challan exists
- Test Data: Notes and terms
- Steps to Reproduce:
  1) Add notes and terms
  2) Save and view challan
- Expected Result:
  - Notes and terms displayed in view/PDF
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Manual PDF check

- ID: HB-DC-018
- Title: Print or download delivery challan PDF
- Module: Sales / Delivery Challans
- Preconditions: Challan exists
- Test Data: Any challan
- Steps to Reproduce:
  1) Click Print/Download PDF
- Expected Result:
  - PDF downloads successfully
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check download event

- ID: HB-DC-019
- Title: PDF content matches challan details
- Module: Sales / Delivery Challans
- Preconditions: Challan exists
- Test Data: Known items and quantities
- Steps to Reproduce:
  1) Download PDF
  2) Compare line items and quantities
- Expected Result:
  - PDF matches UI values
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Manual compare

- ID: HB-DC-020
- Title: Edit draft challan updates quantities
- Module: Sales / Delivery Challans
- Preconditions: Draft challan exists
- Test Data: Update qty
- Steps to Reproduce:
  1) Open draft challan
  2) Change qty
  3) Save
- Expected Result:
  - Qty updated and reflected in list
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check updated qty

- ID: HB-DC-021
- Title: Edit sent challan follows policy
- Module: Sales / Delivery Challans
- Preconditions: Sent challan exists
- Test Data: Update description
- Steps to Reproduce:
  1) Attempt to edit sent challan
- Expected Result:
  - Edit restricted or requires cancel/revision
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Negative
- Automation Notes: Document behavior

- ID: HB-DC-022
- Title: Mark challan as Delivered
- Module: Sales / Delivery Challans / Workflow
- Preconditions: Challan exists
- Test Data: Any challan
- Steps to Reproduce:
  1) Click Mark as Delivered
- Expected Result:
  - Status changes to Delivered
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Verify status badge

- ID: HB-DC-023
- Title: Mark challan as Returned
- Module: Sales / Delivery Challans / Workflow
- Preconditions: Challan exists
- Test Data: Any challan
- Steps to Reproduce:
  1) Click Mark as Returned
- Expected Result:
  - Status changes to Returned and reason stored if required
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check status and reason

- ID: HB-DC-024
- Title: Convert challan to invoice
- Module: Sales / Delivery Challans / Workflow
- Preconditions: Delivered challan exists
- Test Data: Challan with items
- Steps to Reproduce:
  1) Click Convert to Invoice
- Expected Result:
  - Invoice created with same items and quantities
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Verify linkage

- ID: HB-DC-025
- Title: Prevent duplicate invoice conversion
- Module: Sales / Delivery Challans / Workflow
- Preconditions: Challan already converted
- Test Data: Converted challan
- Steps to Reproduce:
  1) Attempt to convert again
- Expected Result:
  - Conversion blocked or warning shown
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Negative
- Automation Notes: Check warning message

- ID: HB-DC-026
- Title: Inventory reduced on delivery (if integrated)
- Module: Sales / Delivery Challans / Accounting
- Preconditions: Inventory integration enabled
- Test Data: Inventory item
- Steps to Reproduce:
  1) Deliver challan
  2) Check stock balance
- Expected Result:
  - Stock reduced by delivered quantity
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Accounting
- Automation Notes: Manual check if inventory exists

- ID: HB-DC-027
- Title: Stock not reduced for draft challan
- Module: Sales / Delivery Challans / Accounting
- Preconditions: Inventory integration enabled
- Test Data: Draft challan
- Steps to Reproduce:
  1) Save challan as Draft
  2) Check stock balance
- Expected Result:
  - Stock not reduced until delivery
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Accounting
- Automation Notes: Manual check if inventory exists

- ID: HB-DC-028
- Title: Partial delivery supported
- Module: Sales / Delivery Challans / Workflow
- Preconditions: Challan with multiple items
- Test Data: Partial quantities
- Steps to Reproduce:
  1) Mark partial quantities as delivered
- Expected Result:
  - Status shows Partial Delivered and remaining qty tracked
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify remaining qty

- ID: HB-DC-029
- Title: Backorder created for remaining qty
- Module: Sales / Delivery Challans / Workflow
- Preconditions: Partial delivery
- Test Data: Remaining qty
- Steps to Reproduce:
  1) Complete partial delivery
  2) Check for backorder record
- Expected Result:
  - Backorder created if configured
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Manual-only if feature exists

- ID: HB-DC-030
- Title: Cancel challan changes status to Cancelled
- Module: Sales / Delivery Challans / Workflow
- Preconditions: Challan exists
- Test Data: Any challan
- Steps to Reproduce:
  1) Cancel challan
- Expected Result:
  - Status changes to Cancelled
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Check status badge

- ID: HB-DC-031
- Title: Delete draft challan
- Module: Sales / Delivery Challans
- Preconditions: Draft challan exists
- Test Data: Draft challan
- Steps to Reproduce:
  1) Delete draft challan
- Expected Result:
  - Challan removed from list and audit logged
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify removal

- ID: HB-DC-032
- Title: Delete delivered challan is restricted
- Module: Sales / Delivery Challans
- Preconditions: Delivered challan exists
- Test Data: Delivered challan
- Steps to Reproduce:
  1) Attempt to delete delivered challan
- Expected Result:
  - Deletion blocked; use cancel or reverse
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Negative
- Automation Notes: Check restriction message

- ID: HB-DC-033
- Title: Search challans by number
- Module: Sales / Delivery Challans / List
- Preconditions: Challan exists
- Test Data: Known challan number
- Steps to Reproduce:
  1) Use search with challan number
- Expected Result:
  - Matching challan shown
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify list filtered

- ID: HB-DC-034
- Title: Filter challans by status
- Module: Sales / Delivery Challans / List
- Preconditions: Multiple statuses exist
- Test Data: Draft, Delivered, Cancelled
- Steps to Reproduce:
  1) Filter list by status
- Expected Result:
  - Only challans with selected status appear
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Validate status filter

- ID: HB-DC-035
- Title: Filter challans by date range
- Module: Sales / Delivery Challans / List
- Preconditions: Challans across dates
- Test Data: Date range
- Steps to Reproduce:
  1) Apply date range filter
- Expected Result:
  - List matches selected range
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Verify filter results

- ID: HB-DC-036
- Title: Export challans to CSV
- Module: Sales / Delivery Challans / Reporting
- Preconditions: Challans exist
- Test Data: None
- Steps to Reproduce:
  1) Export challan list to CSV
- Expected Result:
  - CSV downloads with correct columns
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify file columns

- ID: HB-DC-037
- Title: Challan list pagination works
- Module: Sales / Delivery Challans / List
- Preconditions: Many challans exist
- Test Data: Multiple pages
- Steps to Reproduce:
  1) Click Next page
  2) Click Previous page
- Expected Result:
  - List updates to correct page
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Verify page indicator

- ID: HB-DC-038
- Title: Challan list sorting by date
- Module: Sales / Delivery Challans / List
- Preconditions: Challans exist
- Test Data: Multiple dates
- Steps to Reproduce:
  1) Sort by challan date
- Expected Result:
  - List order updates correctly
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Compare first row date

- ID: HB-DC-039
- Title: Challan list sorting by customer
- Module: Sales / Delivery Challans / List
- Preconditions: Challans exist
- Test Data: Multiple customers
- Steps to Reproduce:
  1) Sort by customer
- Expected Result:
  - List order updates correctly
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Compare first row customer

- ID: HB-DC-040
- Title: Challan list shows delivery status badge
- Module: Sales / Delivery Challans / List
- Preconditions: Challans exist
- Test Data: Delivered challan
- Steps to Reproduce:
  1) Open challan list
- Expected Result:
  - Status badge shows Draft/Delivered/Cancelled
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: UI
- Automation Notes: Verify badge text

- ID: HB-DC-041
- Title: Generate delivery challan from sales order (if supported)
- Module: Sales / Delivery Challans / Workflow
- Preconditions: Sales order exists
- Test Data: Approved sales order
- Steps to Reproduce:
  1) Open sales order
  2) Click Create Delivery Challan
- Expected Result:
  - Challan created with order line items
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Manual-only if sales orders exist

- ID: HB-DC-042
- Title: Convert delivery challan to invoice preserves quantities
- Module: Sales / Delivery Challans / Workflow
- Preconditions: Delivered challan exists
- Test Data: Challan items and qty
- Steps to Reproduce:
  1) Convert challan to invoice
  2) Compare invoice qty
- Expected Result:
  - Invoice quantities match delivered quantities
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Functional
- Automation Notes: Verify linkage

- ID: HB-DC-043
- Title: Delivery challan does not post to GL
- Module: Sales / Delivery Challans / Accounting
- Preconditions: Challan exists
- Test Data: Any challan
- Steps to Reproduce:
  1) Create challan
  2) Check GL
- Expected Result:
  - No GL entries created for challan
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Accounting
- Automation Notes: Manual check for GL impact

- ID: HB-DC-044
- Title: Invoice posting creates GL entries (post-conversion)
- Module: Sales / Delivery Challans / Accounting
- Preconditions: Challan converted to invoice
- Test Data: Converted invoice
- Steps to Reproduce:
  1) Post invoice created from challan
  2) Review GL
- Expected Result:
  - AR and Revenue entries created
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Accounting
- Automation Notes: Verify GL lines

- ID: HB-DC-045
- Title: Role permissions - view only user cannot create challan
- Module: Sales / Delivery Challans / Security
- Preconditions: Read-only role exists
- Test Data: Read-only user
- Steps to Reproduce:
  1) Login as read-only user
  2) Open Delivery Challans
- Expected Result:
  - New challan action not available
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P1
- Type: Security
- Automation Notes: Manual-only for roles

- ID: HB-DC-046
- Title: Role permissions - creator cannot cancel delivered challan
- Module: Sales / Delivery Challans / Security
- Preconditions: Role without cancel permission
- Test Data: Creator user
- Steps to Reproduce:
  1) Login as creator
  2) Open delivered challan
- Expected Result:
  - Cancel action not available
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Security
- Automation Notes: Manual-only for roles

- ID: HB-DC-047
- Title: Audit log records status changes
- Module: Sales / Delivery Challans / Compliance
- Preconditions: Challan exists
- Test Data: Status transitions
- Steps to Reproduce:
  1) Change status Draft -> Delivered -> Cancelled
  2) Review audit log
- Expected Result:
  - Each change recorded with user/time
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Manual-only if audit UI

- ID: HB-DC-048
- Title: Challan supports multiple contacts per customer
- Module: Sales / Delivery Challans
- Preconditions: Customer with multiple contacts
- Test Data: Contact selection
- Steps to Reproduce:
  1) Select a contact on challan
- Expected Result:
  - Contact saved and visible
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Verify contact field

- ID: HB-DC-049
- Title: Challan supports transport details (if available)
- Module: Sales / Delivery Challans
- Preconditions: Transport fields enabled
- Test Data: Vehicle/driver details
- Steps to Reproduce:
  1) Enter transport details
  2) Save challan
- Expected Result:
  - Transport details saved and displayed
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Manual-only if field exists

- ID: HB-DC-050
- Title: Challan currency matches customer currency
- Module: Sales / Delivery Challans / Accounting
- Preconditions: Multi-currency enabled
- Test Data: Foreign currency customer
- Steps to Reproduce:
  1) Create challan for foreign customer
- Expected Result:
  - Currency displayed matches customer currency
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Accounting
- Automation Notes: Verify currency symbol

- ID: HB-DC-051
- Title: Delivery challan supports item price list (if shown)
- Module: Sales / Delivery Challans
- Preconditions: Price list configured
- Test Data: Customer with price list
- Steps to Reproduce:
  1) Select customer with price list
  2) Add item
- Expected Result:
  - Item price auto-populated if price shown
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Manual-only if pricing shown

- ID: HB-DC-052
- Title: Delivery challan list shows item count
- Module: Sales / Delivery Challans / List
- Preconditions: Challans exist
- Test Data: Challan with multiple items
- Steps to Reproduce:
  1) Open challan list
- Expected Result:
  - List shows item count or total qty
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Verify list columns

- ID: HB-DC-053
- Title: Delivery challan supports custom fields
- Module: Sales / Delivery Challans
- Preconditions: Custom fields configured
- Test Data: Custom field values
- Steps to Reproduce:
  1) Fill custom fields
  2) Save challan
- Expected Result:
  - Custom fields saved and displayed
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Manual-only if custom fields exist

- ID: HB-DC-054
- Title: Delivery challan list supports bulk actions
- Module: Sales / Delivery Challans / List
- Preconditions: Bulk actions enabled
- Test Data: Multiple challans
- Steps to Reproduce:
  1) Select multiple challans
  2) Apply bulk action (send/cancel/export)
- Expected Result:
  - Bulk action applies to all selected
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Manual-only if bulk UI exists

- ID: HB-DC-055
- Title: Delivery challan list refresh preserves filters
- Module: Sales / Delivery Challans / List
- Preconditions: Filters applied
- Test Data: Status filter
- Steps to Reproduce:
  1) Apply status filter
  2) Refresh page
- Expected Result:
  - Filter persists or is restored per design
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Check filter state after refresh

- ID: HB-DC-056
- Title: Challan shows customer contact details on view
- Module: Sales / Delivery Challans
- Preconditions: Challan exists with contact
- Test Data: Contact info
- Steps to Reproduce:
  1) Open challan view
- Expected Result:
  - Contact details visible on challan
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: UI
- Automation Notes: Verify contact section

- ID: HB-DC-057
- Title: Challan uses correct timezone for delivery date
- Module: Sales / Delivery Challans
- Preconditions: Known timezone
- Test Data: Delivery date
- Steps to Reproduce:
  1) Set delivery date near midnight
  2) Re-open challan
- Expected Result:
  - Date stored and displayed correctly
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Manual-only

- ID: HB-DC-058
- Title: Challan list shows status counts (if present)
- Module: Sales / Delivery Challans / List
- Preconditions: Status counts visible
- Test Data: Multiple statuses
- Steps to Reproduce:
  1) Observe status count badges
- Expected Result:
  - Counts match filtered list totals
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Compare counts to list rows

- ID: HB-DC-059
- Title: Challan supports package/box details (if available)
- Module: Sales / Delivery Challans
- Preconditions: Packaging fields enabled
- Test Data: Box count and weight
- Steps to Reproduce:
  1) Enter package details
  2) Save challan
- Expected Result:
  - Package details saved and shown
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P3
- Type: Functional
- Automation Notes: Manual-only if fields exist

- ID: HB-DC-060
- Title: Challan conversion respects delivered qty only
- Module: Sales / Delivery Challans / Workflow
- Preconditions: Partial delivery completed
- Test Data: Partial delivered qty
- Steps to Reproduce:
  1) Convert partial delivery challan to invoice
- Expected Result:
  - Invoice includes only delivered qty
- Actual Result:
  - 
- Current Result:
  - Not executed
- Priority: P2
- Type: Functional
- Automation Notes: Manual-only if partial delivery supported
