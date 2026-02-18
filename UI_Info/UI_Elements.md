# HelloBooks.ai Sales Section - UI Elements Inventory for QA Automation
## 1. Sales > Invoices List
### Page URL
`https://test.hellobooks.ai/sales/invoices`
### Page Purpose
View, search, filter, and manage all invoices with different statuses (Draft, Awaiting Approval, Awaiting Payment, Paid, Credit Notes).
### Key User Flows
- Search and filter invoices by various criteria (customer, status, date range)
- View invoice details by clicking on invoice number
- Create new invoices or credit notes
- Export invoices to Excel, CSV, or PDF
- Perform bulk actions on selected invoices
- Access archived invoices
- Edit, download PDF, void, or archive individual invoices via action menu
- Record payments for unpaid invoices
### UI Elements
| Element Name | Visible Label/Text | Role/Type | Suggested Playwright Locator | Notes |
|--------------|-------------------|-----------|------------------------------|-------|
| Page Heading | Invoices | heading | `page.getByRole('heading', { name: 'Invoices' })` | Main page title |
| Tab All | All (6) | button | `page.getByRole('button', { name: /All \\(\\d+\\)/ })` | Dynamic count in parentheses |
| Tab Draft | Draft (1) | button | `page.getByRole('button', { name: /Draft \\(\\d+\\)/ })` | Dynamic count |
| Tab Awaiting Approval | Awaiting Approval (0) | button | `page.getByRole('button', { name: /Awaiting Approval \\(\\d+\\)/ })` | Dynamic count |
| Tab Awaiting Payment | Awaiting Payment (1) | button | `page.getByRole('button', { name: /Awaiting Payment \\(\\d+\\)/ })` | Dynamic count |
| Tab Paid | Paid (3) | button | `page.getByRole('button', { name: /Paid \\(\\d+\\)/ })` | Dynamic count |
| Tab Credit Notes | Credit Notes (1) | button | `page.getByRole('button', { name: /Credit Notes \\(\\d+\\)/ })` | Dynamic count |
| Search Input | Search invoices... | textbox | `page.getByPlaceholder('Search invoices...')` | Free text search |
| Customer Filter Button | Customer | button | `page.getByRole('button', { name: 'Customer' })` | Opens customer filter |
| Filter Button | Filter | button | `page.getByRole('button', { name: 'Filter' })` | Opens filter dialog |
| View Archived Button | View Archived | button | `page.getByRole('button', { name: 'View Archived' })` | Navigate to archived invoices |
| Export Button | Export | button | `page.getByRole('button', { name: 'Export' })` | Opens export menu |
| Bulk Import Button | Bulk Import | button | `page.getByRole('button', { name: 'Bulk Import' })` | Import invoices |
| Create Invoice Button | Create Invoice | button | `page.getByRole('button', { name: 'Create Invoice' })` | Opens create menu |
| Bulk Actions Message | Select invoices to enable bulk actions | generic | `page.getByText('Select invoices to enable bulk actions')` | Appears when no invoices selected |
| Table Header - Checkbox | — | checkbox | `page.locator('table').getByRole('checkbox').first()` | Select all invoices |
| Table Header - Number | Number | button | `page.getByRole('button', { name: 'Number' })` | Sortable column |
| Table Header - Reference | Reference | button | `page.getByRole('button', { name: 'Reference' })` | Sortable column |
| Table Header - Customer | Customer | button | `page.getByRole('button', { name: 'Customer' })` | Sortable column |
| Table Header - Date | Date | button | `page.getByRole('button', { name: 'Date' })` | Sortable column |
| Table Header - Due Date | Due Date | button | `page.getByRole('button', { name: 'Due Date' })` | Sortable column |
| Table Header - Total | Total | button | `page.getByRole('button', { name: 'Total' })` | Sortable column |
| Table Header - Paid | Paid | button | `page.getByRole('button', { name: 'Paid' })` | Sortable column |
| Table Header - Due | Due | button | `page.getByRole('button', { name: 'Due' })` | Sortable column |
| Table Header - Status | Status | button | `page.getByRole('button', { name: 'Status' })` | Sortable column |
| Table Header - Actions | Actions | generic | `page.getByText('Actions')` | Column header |
| Invoice Row Checkbox | — | checkbox | `page.locator('table tbody tr').first().getByRole('checkbox')` | Per-row selection |
| Invoice Number Link | INV-0005, etc. | generic | `page.getByText('INV-0005')` | Dynamic invoice number |
| Customer Name | ABC Company, etc. | generic | `page.getByText('ABC Company')` | Dynamic customer name |
| Invoice Date | 17 Feb 2026, etc. | generic | — | Dynamic date |
| Due Date | 17 Mar 2026, etc. | generic | — | Dynamic date |
| Total Amount | ₹700.00, etc. | generic | — | Dynamic amount |
| Paid Amount | ₹0.00, etc. | generic | — | Dynamic amount |
| Due Amount | ₹700.00, etc. | generic | — | Dynamic amount |
| Status Badge | Draft, Paid, etc. | generic | `page.getByText('Draft')` | Dynamic status |
| Row Actions Button | ⋮ (three dots) | button | `page.locator('table tbody tr').first().getByRole('button').last()` | Opens action menu |
### Modals/Dialogs
#### Filter Dialog
| Element Name | Visible Label/Text | Role/Type | Suggested Playwright Locator | Notes |
|--------------|-------------------|-----------|------------------------------|-------|
| Dialog Heading | Filters | heading | `page.getByRole('heading', { name: 'Filters' })` | Modal title |
| Date Range Heading | Date Range | heading | `page.getByRole('heading', { name: 'Date Range' })` | Section heading |
| Date Range Picker | Pick a date range | button | `page.getByRole('button', { name: 'Pick a date range' })` | Opens date picker |
| Status Heading | Status | heading | `page.getByRole('heading', { name: 'Status' })` | Section heading |
| Status - Draft | Draft | button | `page.getByRole('button', { name: 'Draft' })` | Filter toggle with count badge |
| Status - Awaiting Payment | Awaiting Payment | button | `page.getByRole('button', { name: 'Awaiting Payment' })` | Filter toggle with count badge |
| Status - Paid | Paid | button | `page.getByRole('button', { name: 'Paid' })` | Filter toggle with count badge |
| Status - Overdue | Overdue | button | `page.getByRole('button', { name: 'Overdue' })` | Filter toggle with count badge |
#### Export Menu
| Element Name | Visible Label/Text | Role/Type | Suggested Playwright Locator | Notes |
|--------------|-------------------|-----------|------------------------------|-------|
| Export as Excel | Export as Excel | menuitem | `page.getByRole('menuitem', { name: 'Export as Excel' })` | Export option |
| Export as CSV | Export as CSV | menuitem | `page.getByRole('menuitem', { name: 'Export as CSV' })` | Export option |
| Export as PDF | Export as PDF | menuitem | `page.getByRole('menuitem', { name: 'Export as PDF' })` | Export option |
#### Create Invoice Menu
| Element Name | Visible Label/Text | Role/Type | Suggested Playwright Locator | Notes |
|--------------|-------------------|-----------|------------------------------|-------|
| New Invoice | New Invoice | menuitem | `page.getByRole('menuitem', { name: 'New Invoice' })` | Navigate to new invoice form |
| New Credit Note | New Credit Note | menuitem | `page.getByRole('menuitem', { name: 'New Credit Note' })` | Navigate to credit note form |
#### Invoice Row Actions Menu
| Element Name | Visible Label/Text | Role/Type | Suggested Playwright Locator | Notes |
|--------------|-------------------|-----------|------------------------------|-------|
| Edit | Edit | menuitem | `page.getByRole('menuitem', { name: 'Edit' })` | Edit invoice |
| Download PDF | Download PDF | menuitem | `page.getByRole('menuitem', { name: 'Download PDF' })` | Download invoice PDF |
| Create Delivery Challan | Create Delivery Challan | menuitem | `page.getByRole('menuitem', { name: 'Create Delivery Challan' })` | Only for approved invoices |
| Record Payment | Record Payment | menuitem | `page.getByRole('menuitem', { name: 'Record Payment' })` | Only for awaiting payment invoices |
| Apply Advance | Apply Advance | menuitem | `page.getByRole('menuitem', { name: 'Apply Advance' })` | Only for awaiting payment invoices |
| Void Invoice | Void Invoice | menuitem | `page.getByRole('menuitem', { name: 'Void Invoice' })` | Void option |
| Archive | Archive | menuitem | `page.getByRole('menuitem', { name: 'Archive' })` | Archive invoice |
---
## 2. Sales > New Invoice
### Page URL
`https://test.hellobooks.ai/sales/invoices/new-invoice`
### Page Purpose
Create a new invoice with customer details, line items, tax calculations, discounts, and payment terms.
### Key User Flows
- Select customer and configure invoice header (date, due date, reference)
- Add multiple line items with items/services, quantities, prices, taxes
- Apply invoice-level discounts, shipping charges, and other fees
- Configure early payment discounts and late fee penalties
- Add notes, terms & conditions, and file attachments
- Save as draft or approve invoice for sending
### UI Elements
| Element Name | Visible Label/Text | Role/Type | Suggested Playwright Locator | Notes |
|--------------|-------------------|-----------|------------------------------|-------|
| Page Heading | New Invoice | heading | `page.getByRole('heading', { name: 'New Invoice' })` | Main page title |
| Cancel Button | Cancel | button | `page.getByRole('button', { name: 'Cancel' })` | Discard and return |
| Save & Close Button | Save & close | button | `page.getByRole('button', { name: 'Save & close' })` | Save as draft |
| Approve Button | Approve | button | `page.getByRole('button', { name: 'Approve' })` | Approve invoice |
| Customer Label | Customer * | label | `page.getByText('Customer').filter({ hasText: '*' })` | Required field |
| Customer Dropdown | Choose a Customer | combobox | `page.getByRole('combobox').filter({ hasText: 'Choose a Customer' })` | Select customer |
| Invoice No Label | Invoice No. * | label | `page.getByText('Invoice No.').filter({ hasText: '*' })` | Required field |
| Auto Generate Button | Auto Generate | button | `page.getByRole('button', { name: 'Auto Generate' })` | Generate invoice number |
| Invoice No Input | Auto-generated on save | textbox | `page.getByPlaceholder('Auto-generated on save')` | Read-only until saved |
| Date Label | Date * | label | `page.getByText('Date').filter({ hasText: '*' })` | Required field |
| Date Input | DD/MM/YYYY | textbox | `page.getByPlaceholder('DD/MM/YYYY').first()` | Date picker input |
| Due Date Label | Due Date * | label | `page.getByText('Due Date').filter({ hasText: '*' })` | Required field |
| Due Date Input | DD/MM/YYYY | textbox | `page.getByPlaceholder('DD/MM/YYYY').nth(1)` | Date picker input |
| Reference Label | Reference | label | `page.getByText('Reference')` | Optional field |
| Reference Input | REF-000001 | textbox | `page.getByPlaceholder('REF-000001')` | Reference number |
| Currency Label | Currency | label | `page.getByText('Currency')` | Display only |
| Currency Display | Entity base currency (INR) | generic | `page.getByText('Entity base currency (INR)')` | Read-only |
| Amounts Are Label | Amounts are | generic | `page.getByText('Amounts are')` | Tax setting label |
| Tax Mode Dropdown | Tax exclusive | combobox | `page.getByRole('combobox').filter({ hasText: 'Tax exclusive' })` | Tax inclusive/exclusive toggle |
| Item Dropdown | Select item... | combobox | `page.getByRole('combobox').filter({ hasText: 'Select item...' })` | Select item/service |
| Description Input | Description | textbox | `page.getByPlaceholder('Description')` | Line item description |
| Unit Dropdown | PCS | combobox | `page.getByRole('combobox').filter({ hasText: 'PCS' })` | Unit of measure |
| Quantity Input | 1 | textbox | `page.getByPlaceholder('1')` | Quantity |
| Price Input | Price | textbox | `page.getByPlaceholder('Price')` | Unit price |
| Account Dropdown | Search or create account... | combobox | `page.getByRole('combobox').filter({ hasText: 'Search or create account...' })` | GL account |
| Tax Dropdown | No Tax (0%) | combobox | `page.getByRole('combobox').filter({ hasText: 'No Tax' })` | Tax rate |
| Line Discount Type | Fixed | combobox | `page.getByRole('combobox').filter({ hasText: 'Fixed' })` | Fixed or percentage |
| Line Discount Input | 0.00 | textbox | `page.getByPlaceholder('0.00').first()` | Discount amount |
| Add New Line Button | Add a new line | button | `page.getByRole('button', { name: 'Add a new line' })` | Add another line item |
| Subtotal Label | Subtotal: | generic | `page.getByText('Subtotal:')` | Subtotal label |
| Discount Type | Flat | combobox | `page.getByRole('combobox').filter({ hasText: 'Flat' })` | Invoice discount type |
| Discount Input | 0 | textbox | `page.getByPlaceholder('0')` | Invoice discount value |
| Total Tax Label | Total Tax: | generic | `page.getByText('Total Tax:')` | Tax label |
| Shipping Input | 0.00 | textbox | `page.getByPlaceholder('0.00').nth(1)` | Shipping & handling |
| Other Charges Input | 0.00 | textbox | `page.getByPlaceholder('0.00').nth(2)` | Other charges |
| Total Label | Total | generic | `page.getByText('Total')` | Total label |
| Amount Due Label | Amount due | generic | `page.getByText('Amount due')` | Amount due label |
| Early Payment Discount % | 0 | textbox | `page.getByPlaceholder('0').first()` | Early payment discount percentage |
| Early Payment Days | 0 | textbox | `page.getByPlaceholder('0').nth(1)` | Days for early payment |
| Late Fee % | 0 | textbox | `page.getByPlaceholder('0').nth(2)` | Late fee percentage |
| Late Fee Flat | 0.00 | textbox | `page.getByPlaceholder('0.00').nth(3)` | Late fee flat amount |
| Notes Textarea | Invoice notes, customer-facing remarks... | textbox | `page.getByPlaceholder('Invoice notes, customer-facing remarks...')` | Customer-facing notes |
| Terms Textarea | Payment terms, conditions, etc... | textbox | `page.getByPlaceholder('Payment terms, conditions, etc...')` | Terms & conditions |
| Planned Payment Date | MM/DD/YYYY | textbox | `page.getByPlaceholder('MM/DD/YYYY')` | Optional planned date |
| Select Files Button | Select Files | button | `page.getByRole('button', { name: 'Select Files' })` | Upload attachments |
| File Input | — | button | `page.getByRole('button', { type: 'file' })` | Hidden file input |
---
## 3. Sales > Quotes List
### Page URL
`https://test.hellobooks.ai/sales/quotes`
### Page Purpose
View, search, filter, and manage all quotes with different statuses (Draft, Sent, Declined, Accepted, Invoiced, Expired).
### Key User Flows
- Search and filter quotes by customer, status, date
- Create new quotes
- Export quotes to Excel, CSV, or PDF
- View and manage archived quotes
- Edit, send, convert to invoice, or archive quotes via action menu
### UI Elements
| Element Name | Visible Label/Text | Role/Type | Suggested Playwright Locator | Notes |
|--------------|-------------------|-----------|------------------------------|-------|
| Page Heading | Quotes | heading | `page.getByRole('heading', { name: 'Quotes' })` | Main page title |
| Tab All | All (0) | button | `page.getByRole('button', { name: /All \\(\\d+\\)/ })` | Dynamic count |
| Tab Draft | Draft | button | `page.getByRole('button', { name: 'Draft' })` | Draft quotes |
| Tab Sent | Sent | button | `page.getByRole('button', { name: 'Sent' })` | Sent quotes |
| Tab Declined | Declined | button | `page.getByRole('button', { name: 'Declined' })` | Declined quotes |
| Tab Accepted | Accepted | button | `page.getByRole('button', { name: 'Accepted' })` | Accepted quotes |
| Tab Invoiced | Invoiced | button | `page.getByRole('button', { name: 'Invoiced' })` | Converted to invoice |
| Tab Expired | Expired | button | `page.getByRole('button', { name: 'Expired' })` | Expired quotes |
| Search Input | Search quotes... | textbox | `page.getByPlaceholder('Search quotes...')` | Free text search |
| View Archived Button | View Archived | button | `page.getByRole('button', { name: 'View Archived' })` | Navigate to archived |
| Export Button | Export | button | `page.getByRole('button', { name: 'Export' })` | Opens export menu |
| New Quote Button | New Quote | button | `page.getByRole('button', { name: 'New Quote' })` | Create new quote |
| Table Header - Checkbox | — | checkbox | `page.locator('table').getByRole('checkbox').first()` | Select all quotes |
| Table Header - Quote No. | Quote No. | button | `page.getByRole('button', { name: 'Quote No.' })` | Sortable column |
| Table Header - Reference | Reference | button | `page.getByRole('button', { name: 'Reference' })` | Sortable column |
| Table Header - Customer | Customer | button | `page.getByRole('button', { name: 'Customer' })` | Sortable column |
| Table Header - Date | Date | button | `page.getByRole('button', { name: 'Date' })` | Sortable column |
| Table Header - Valid Until | Valid Until | button | `page.getByRole('button', { name: 'Valid Until' })` | Sortable column |
| Table Header - Amount | Amount | button | `page.getByRole('button', { name: 'Amount' })` | Sortable column |
| Table Header - Status | Status | button | `page.getByRole('button', { name: 'Status' })` | Sortable column |
| Table Header - Actions | Actions | generic | `page.getByText('Actions')` | Column header |
| Empty State Message | No quotes yet. Create your first quote! | generic | `page.getByText('No quotes yet. Create your first quote!')` | Shown when empty |
---
## 4. Sales > New Quote
### Page URL
`https://test.hellobooks.ai/sales/quotes/new-quote`
### Page Purpose
Create a new quote with customer details, line items, validity period, and pricing.
### Key User Flows
- Select customer and configure quote header (date, valid until, reference)
- Add multiple line items with items/services, quantities, prices
- Apply discounts and taxes
- Add notes and terms & conditions
- Save as draft or send quote to customer
### UI Elements
| Element Name | Visible Label/Text | Role/Type | Suggested Playwright Locator | Notes |
|--------------|-------------------|-----------|------------------------------|-------|
| Page Heading | New Quote | heading | `page.getByRole('heading', { name: 'New Quote' })` | Main page title |
| Cancel Button | Cancel | button | `page.getByRole('button', { name: 'Cancel' })` | Discard and return |
| Save & Close Button | Save & close | button | `page.getByRole('button', { name: 'Save & close' })` | Save as draft |
| Customer Label | Customer * | label | `page.getByText('Customer').filter({ hasText: '*' })` | Required field |
| Customer Dropdown | Choose a Customer | combobox | `page.getByRole('combobox').filter({ hasText: 'Choose a Customer' })` | Select customer |
| Quote No Label | Quote No. * | label | `page.getByText('Quote No.').filter({ hasText: '*' })` | Required field |
| Auto Generate Button | Auto Generate | button | `page.getByRole('button', { name: 'Auto Generate' })` | Generate quote number |
| Quote No Input | QTE-0001 | textbox | `page.getByDisplayValue('QTE-0001')` | Quote number |
| Quote Date Label | Quote Date * | label | `page.getByText('Quote Date').filter({ hasText: '*' })` | Required field |
| Quote Date Input | DD/MM/YYYY | textbox | `page.getByPlaceholder('DD/MM/YYYY').first()` | Date picker input |
| Valid Until Label | Valid Until | label | `page.getByText('Valid Until')` | Optional field |
| Valid Until Input | DD/MM/YYYY | textbox | `page.getByPlaceholder('DD/MM/YYYY').nth(1)` | Validity date |
| Reference Label | Reference | label | `page.getByText('Reference')` | Optional field |
| Reference Input | REF-000001 | textbox | `page.getByPlaceholder('REF-000001')` | Reference number |
| Currency Display | Entity base currency (INR) | generic | `page.getByText('Entity base currency (INR)')` | Read-only |
| Tax Mode Dropdown | Tax exclusive | combobox | `page.getByRole('combobox').filter({ hasText: 'Tax exclusive' })` | Tax inclusive/exclusive |
| Item Dropdown | Select item... | combobox | `page.getByRole('combobox').filter({ hasText: 'Select item...' })` | Select item/service |
| Description Input | Description | textbox | `page.getByPlaceholder('Description')` | Line item description |
| Unit Dropdown | PCS | combobox | `page.getByRole('combobox').filter({ hasText: 'PCS' })` | Unit of measure |
| Quantity Input | 1 | textbox | `page.getByPlaceholder('1')` | Quantity |
| Add New Line Button | Add a new line | button | `page.getByRole('button', { name: 'Add a new line' })` | Add another line item |
| Validation Message | Please enter a price for at least one line item | generic | `page.getByText('Please enter a price for at least one line item')` | Form validation |
| Subtotal Label | Subtotal: | generic | `page.getByText('Subtotal:')` | Subtotal label |
| Discount Type | Flat | combobox | `page.getByRole('combobox').filter({ hasText: 'Flat' })` | Quote discount type |
---
## 5. Sales > Delivery Challans List
### Page URL
`https://test.hellobooks.ai/sales/delivery-challans`
### Page Purpose
View, search, filter, and manage delivery challans with different statuses (Draft, Sent, Delivered, Cancelled, Linked).
### Key User Flows
- Search and filter delivery challans by customer, status, date
- Create new delivery challans
- Export delivery challans to various formats
- View and manage archived delivery challans
- Edit, send, mark as delivered, or archive challans via action menu
### UI Elements
| Element Name | Visible Label/Text | Role/Type | Suggested Playwright Locator | Notes |
|--------------|-------------------|-----------|------------------------------|-------|
| Page Heading | Delivery Challans | heading | `page.getByRole('heading', { name: 'Delivery Challans' })` | Main page title |
| Export Button | Export | button | `page.getByRole('button', { name: 'Export' })` | Opens export menu |
| Tab All | All (0) | button | `page.getByRole('button', { name: /All \\(\\d+\\)/ })` | Dynamic count |
| Tab Draft | Draft (0) | button | `page.getByRole('button', { name: /Draft \\(\\d+\\)/ })` | Dynamic count |
| Tab Sent | Sent (0) | button | `page.getByRole('button', { name: /Sent \\(\\d+\\)/ })` | Dynamic count |
| Tab Delivered | Delivered (0) | button | `page.getByRole('button', { name: /Delivered \\(\\d+\\)/ })` | Dynamic count |
| Tab Cancelled | Cancelled (0) | button | `page.getByRole('button', { name: /Cancelled \\(\\d+\\)/ })` | Dynamic count |
| Tab Linked | Linked (0) | button | `page.getByRole('button', { name: /Linked \\(\\d+\\)/ })` | Dynamic count |
| Search Input | Search delivery challans... | textbox | `page.getByPlaceholder('Search delivery challans...')` | Free text search |
| Customer Filter Button | Customer | button | `page.getByRole('button', { name: 'Customer' })` | Opens customer filter |
| Filter Button | Filter | button | `page.getByRole('button', { name: 'Filter' })` | Opens filter dialog |
| Show Archived Button | Show Archived | button | `page.getByRole('button', { name: 'Show Archived' })` | Navigate to archived |
| New Delivery Challan Button | New Delivery Challan | button | `page.getByRole('button', { name: 'New Delivery Challan' })` | Create new challan |
| Table Header - Checkbox | — | checkbox | `page.locator('table').getByRole('checkbox').first()` | Select all |
| Table Header - DC Number | DC Number | button | `page.getByRole('button', { name: 'DC Number' })` | Sortable column |
| Table Header - Date | Date | button | `page.getByRole('button', { name: 'Date' })` | Sortable column |
| Table Header - Customer | Customer | button | `page.getByRole('button', { name: 'Customer' })` | Sortable column |
| Table Header - Reference | Reference | button | `page.getByRole('button', { name: 'Reference' })` | Sortable column |
| Table Header - Amount | Amount | button | `page.getByRole('button', { name: 'Amount' })` | Sortable column |
| Table Header - Status | Status | button | `page.getByRole('button', { name: 'Status' })` | Sortable column |
| Table Header - Actions | Actions | generic | `page.getByText('Actions')` | Column header |
| Empty State Message | No delivery challans yet. Click "New Delivery Challan" to create one. | generic | `page.getByText(/No delivery challans yet/)` | Shown when empty |
---
## 6. Sales > Recurring Invoices List
### Page URL
`https://test.hellobooks.ai/sales/recurring-invoices`
### Page Purpose
View, manage, and create recurring invoice templates that automatically generate invoices on a schedule.
### Key User Flows
- Create recurring invoice templates with schedule configuration
- Run due templates to generate invoices
- Export recurring invoice data
- Toggle between Active and Archived templates
- Filter by status and hide incomplete templates
- Edit, pause, or archive recurring templates
### UI Elements
| Element Name | Visible Label/Text | Role/Type | Suggested Playwright Locator | Notes |
|--------------|-------------------|-----------|------------------------------|-------|
| Page Heading | Recurring Invoices | heading | `page.getByRole('heading', { name: 'Recurring Invoices' })` | Main page title |
| Run Due Button | Run Due | button | `page.getByRole('button', { name: 'Run Due' })` | Generate due invoices |
| Export Button | Export | button | `page.getByRole('button', { name: 'Export' })` | Opens export menu |
| New Template Button | New Template | button | `page.getByRole('button', { name: 'New Template' })` | Create template |
| Tab Active | Active | tab | `page.getByRole('tab', { name: 'Active' })` | Active templates |
| Tab Archived | Archived | tab | `page.getByRole('tab', { name: 'Archived' })` | Archived templates |
| Status Label | Status: | generic | `page.getByText('Status:')` | Status filter label |
| Status Dropdown | All Statuses | combobox | `page.getByRole('combobox').filter({ hasText: 'All Statuses' })` | Filter by status |
| Hide Incomplete Toggle | Hide Incomplete | switch | `page.getByRole('switch', { name: 'Hide Incomplete' })` | Toggle incomplete |
| Hide Incomplete Label | Hide Incomplete | label | `page.getByText('Hide Incomplete')` | Toggle label |
| Empty State Heading | No recurring invoice templates | heading | `page.getByRole('heading', { name: 'No recurring invoice templates' })` | Empty state |
| Empty State Message | Create templates to automatically generate invoices on a schedule... | generic | `page.getByText(/Create templates to automatically generate invoices/)` | Helper text |
| Create First Template Button | Create First Template | button | `page.getByRole('button', { name: 'Create First Template' })` | Create first template |
---
## 7. Sales > Payments Received List
### Page URL
`https://test.hellobooks.ai/sales/payments-received`
### Page Purpose
View, search, filter, and manage all payments received from customers, including allocation to invoices.
### Key User Flows
- Search and filter payments by customer, date, method
- Record new payments (against invoice or direct income)
- Export payment records to various formats
- View payment details including allocation status
- Edit, download receipt, or delete payments
### UI Elements
| Element Name | Visible Label/Text | Role/Type | Suggested Playwright Locator | Notes |
|--------------|-------------------|-----------|------------------------------|-------|
| Page Heading | Payments Received | heading | `page.getByRole('heading', { name: 'Payments Received' })` | Main page title |
| Export Button | Export | button | `page.getByRole('button', { name: 'Export' })` | Opens export menu |
| Record Payment Button | Record Payment | button | `page.getByRole('button', { name: 'Record Payment' })` | Opens payment dialog |
| Search Input | Search by receipt no, customer, or reference... | textbox | `page.getByPlaceholder('Search by receipt no, customer, or reference...')` | Free text search |
| Customer Filter Button | Customer | button | `page.getByRole('button', { name: 'Customer' })` | Opens customer filter |
| Filter Button | Filter | button | `page.getByRole('button', { name: 'Filter' })` | Opens filter dialog |
| Table Header - Checkbox | Select all | checkbox | `page.getByRole('checkbox', { name: 'Select all' })` | Select all payments |
| Table Header - Receipt No. | Receipt No. | generic | `page.getByText('Receipt No.')` | Column header |
| Table Header - Date | Date | generic | `page.getByText('Date')` | Column header |
| Table Header - Customer | Customer | generic | `page.getByText('Customer')` | Column header |
| Table Header - Method | Method | generic | `page.getByText('Method')` | Column header |
| Table Header - Amount | Amount | generic | `page.getByText('Amount')` | Column header |
| Table Header - Allocated | Allocated | generic | `page.getByText('Allocated')` | Column header |
| Table Header - Unallocated | Unallocated | generic | `page.getByText('Unallocated')` | Column header |
| Table Header - Ref No. | Ref No. | generic | `page.getByText('Ref No.')` | Column header |
| Table Header - Actions | Actions | generic | `page.getByText('Actions')` | Column header |
| Payment Row Checkbox | — | checkbox | `page.locator('table tbody tr').first().getByRole('checkbox')` | Per-row selection |
| Receipt Number | REC-1771312550667-0, etc. | generic | `page.getByText(/REC-\\d+/)` | Dynamic receipt number |
| Payment Date | Feb 17, 2026, etc. | generic | — | Dynamic date |
| Customer Name | kkkk, etc. | generic | — | Dynamic customer |
| Payment Method | bank transfer, etc. | generic | — | Dynamic method |
| Payment Amount | INR 48000.00, etc. | generic | — | Dynamic amount |
| Allocated Amount | 48000.00, etc. | generic | — | Dynamic allocated |
| Unallocated Amount | 0.00, etc. | generic | — | Dynamic unallocated |
| Download Receipt Button | Download receipt | button | `page.getByRole('button', { name: 'Download receipt' })` | Download PDF |
| Edit Payment Button | Edit payment | button | `page.getByRole('button', { name: 'Edit payment' })` | Edit payment |
| Delete Button | Delete | button | `page.getByRole('button', { name: 'Delete' })` | Delete payment |
### Modals/Dialogs
#### Record Payment - Type Selection Dialog
| Element Name | Visible Label/Text | Role/Type | Suggested Playwright Locator | Notes |
|--------------|-------------------|-----------|------------------------------|-------|
| Dialog Heading | What type of payment is this? | heading | `page.getByRole('heading', { name: 'What type of payment is this?' })` | Modal title |
| Dialog Description | Choose whether this payment is against an existing invoice or direct income | generic | `page.getByText('Choose whether this payment is against an existing invoice or direct income')` | Helper text |
| Against Invoice Heading | Against Invoice | heading | `page.getByRole('heading', { name: 'Against Invoice' })` | Option heading |
| Against Invoice Description | Payment received for an existing invoice. Will update invoice status and allocate payment. | generic | `page.getByText('Payment received for an existing invoice')` | Helper text |
| Select Invoice Button | Select Invoice | button | `page.getByRole('button', { name: 'Select Invoice' })` | Proceed to invoice selection |
| Direct Income Heading | Direct Income | heading | `page.getByRole('heading', { name: 'Direct Income' })` | Option heading |
| Direct Income Description | Income not linked to any invoice. Will be recorded directly to income account. | generic | `page.getByText('Income not linked to any invoice')` | Helper text |
| Record Income Button | Record Income | button | `page.getByRole('button', { name: 'Record Income' })` | Proceed to income form |
| Close Button | Close | button | `page.getByRole('button', { name: 'Close' }).filter({ hasText: /Close dialog/ })` | Close dialog |
#### Record Payment Against Invoice Dialog
| Element Name | Visible Label/Text | Role/Type | Suggested Playwright Locator | Notes |
|--------------|-------------------|-----------|------------------------------|-------|
| Dialog Heading | Record Payment Received | heading | `page.getByRole('heading', { name: 'Record Payment Received' })` | Modal title |
| Customer Label | Customer * | label | `page.getByText('Customer').filter({ hasText: '*' })` | Required field |
| Customer Dropdown | Select customer | combobox | `page.getByRole('combobox').filter({ hasText: 'Select customer' })` | Select customer |
| Bank Account Label | Bank Account * | label | `page.getByText('Bank Account').filter({ hasText: '*' })` | Required field |
| Bank Account Dropdown | Select bank account | combobox | `page.getByRole('combobox').filter({ hasText: 'Select bank account' })` | Select account |
| Payment Date Label | Payment Date * | label | `page.getByText('Payment Date').filter({ hasText: '*' })` | Required field |
| Payment Date Input | 2026-02-17 | textbox | `page.locator('input[type="date"]')` | Date input |
| Payment Method Label | Payment Method * | label | `page.getByText('Payment Method').filter({ hasText: '*' })` | Required field |
| Payment Method Dropdown | Bank Transfer | combobox | `page.getByRole('combobox').filter({ hasText: 'Bank Transfer' })` | Select method |
| Payment Amount Label | Payment Amount * | label | `page.getByText('Payment Amount').filter({ hasText: '*' })` | Required field |
| Payment Amount Input | 0.00 | textbox | `page.getByPlaceholder('0.00')` | Amount input |
| Reference No Label | Reference No. (UTR / Cheque No.) | label | `page.getByText('Reference No. (UTR / Cheque No.)')` | Optional field |
| Reference No Input | Transaction reference | textbox | `page.getByPlaceholder('Transaction reference')` | Reference input |
| Notes Label | Notes | label | `page.getByText('Notes')` | Optional field |
| Notes Textarea | Add payment notes... | textbox | `page.getByPlaceholder('Add payment notes...')` | Notes input |
| Cancel Button | Cancel | button | `page.getByRole('button', { name: 'Cancel' })` | Cancel dialog |
| Record Payment Button | Record Payment | button | `page.getByRole('button', { name: 'Record Payment' })` | Submit payment |
| Close Button | Close | button | `page.getByRole('button', { name: 'Close' }).filter({ hasText: /Close dialog/ })` | Close dialog |
---
## Summary
This comprehensive UI elements inventory covers all 7 sections requested:
1. **Sales > Invoices List** - 30+ elements + 4 modals/dialogs
2. **Sales > New Invoice** - 40