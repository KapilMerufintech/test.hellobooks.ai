Sales / Invoices UI elements (for test case generation)

Page: /sales/invoices

Top navigation
- Page heading: Invoices
- Search input: "Search invoices..."
- Customer filter button
- View archived button
- Export dropdown (Excel, CSV, PDF)
- Bulk import button
- Filter dropdown (Date range, Status)
- + Create Invoice split button (New Invoice, New Credit Note)

Status tabs
- All
- Draft
- Awaiting Approval
- Awaiting Payment
- Paid
- Credit Notes

Table
- Select all checkbox
- Columns: Number, Reference, Customer, Date, Due Date, Total, Paid, Due, Status, Actions
- Row checkbox
- Invoice number link (opens invoice)
- Status badge (Draft, Paid, Awaiting Payment, etc.)
- Row actions dropdown (Edit, Download PDF, Record Payment, Apply Advance, Void Invoice, Archive)

Bulk actions bar (appears when rows selected)
- Approve & Email
- Approve
- Email
- Record Payment
- PDF Download
- Mark as Paid
- Archive

Behavior notes
- Paid invoices are read-only (toast: "Paid invoices cannot be edited...")


Page: /sales/invoices/new-invoice (also used for edit)

Top action buttons
- Cancel
- Save & close dropdown (Save & close, Save & add another, Submit for approval)
- Approve dropdown (Approve)

Header fields
- Customer (required combobox, placeholder: "Choose a Customer")
- Invoice No. (required, auto-generated)
- Auto Generate button
- Date (required, date picker)
- Due Date (required, date picker)
- Reference (text, placeholder: "REF-000001")
- Currency (combobox, read-only)
- Amounts are (combobox: Tax exclusive / Tax inclusive)

Line items table
- Drag handle (reorder rows)
- Item/Service (required combobox, placeholder: "Select item...")
- Description (text)
- Unit (combobox, default PCS)
- Qty (required number, placeholder "1")
- Price (number, placeholder "Price")
- Account (combobox, "Search or create account")
- Tax (combobox, default "No Tax (0%)")
- Discount type (Fixed/Percent) + Discount value
- Amount (read-only)
- Add a new line button

Summary section
- Subtotal (read-only)
- Discount type (Flat/Percent) + value
- Total Tax (read-only)
- Total (read-only)
- Amount due (read-only)
- FX info (Realized/Unrealized/Net INR labels)

Additional sections
- Early payment discount (Discount %, Days if paid within)
- Late fee (Percentage %, Flat fee)
- Notes (textarea)
- Terms & Conditions (textarea)
- Planned Payment Date (date picker, placeholder "MM/DD/YYYY")
- Attachments (file upload, PDF/Images/CSV/Excel, max 20MB)

Selectors (Playwright)

Page: /sales/invoices
- Heading: page.getByRole('heading', { name: /invoices/i }).first()
- Search input: page.getByPlaceholder(/search invoices/i).first()
- Export button: page.getByRole('button', { name: /export/i }).first()
- Filter button: page.getByRole('button', { name: /filter/i }).first()
- Bulk import button: page.getByRole('button', { name: /bulk import/i }).first()
- View archived button: page.getByRole('button', { name: /view archived/i }).first()
- Create invoice split button: page.getByRole('button', { name: /\+?\s*create invoice|new invoice/i }).first()
- Tabs: page.getByRole('button', { name: /all|draft|awaiting approval|awaiting payment|paid|credit notes/i })
- Table header: page.getByRole('columnheader', { name: /number|customer|status/i })
- Row checkbox: page.locator('table').getByRole('checkbox').first()
- Row actions: page.locator('tr').first().locator('button, [role="button"]').last()
- Invoice link: page.locator('tr').first().getByRole('link').first()

Page: /sales/invoices/new-invoice
- Heading: page.getByRole('heading', { name: /new invoice/i }).first()
- Cancel: page.getByRole('button', { name: /cancel/i }).first()
- Save & close dropdown: page.getByRole('button', { name: /save & close/i }).first()
- Save & close menu item: page.getByRole('menuitem', { name: /save & close/i }).first()
- Save & add another: page.getByRole('menuitem', { name: /save & add another/i }).first()
- Submit for approval: page.getByRole('menuitem', { name: /submit for approval/i }).first()
- Approve: page.getByRole('button', { name: /approve/i }).first()

Header fields
- Customer input: page.getByPlaceholder(/choose a customer/i).first()
- Invoice no: page.getByLabel(/invoice no\./i).first()
- Auto generate: page.getByRole('button', { name: /auto generate/i }).first()
- Date: page.getByPlaceholder('DD/MM/YYYY').first()
- Due date: page.getByPlaceholder('DD/MM/YYYY').nth(1)
- Reference: page.getByPlaceholder(/ref-000001/i).first()
- Currency: page.getByRole('combobox').filter({ hasText: /entity base currency|currency/i }).first()
- Amounts are: page.getByRole('combobox').filter({ hasText: /amounts are|tax exclusive|tax inclusive/i }).first()

Line items table
- Item/Service combobox: page.getByRole('combobox').filter({ hasText: /select item/i }).first()
- Description: page.getByPlaceholder(/description/i).first()
- Unit combobox: page.getByRole('combobox').filter({ hasText: /pcs/i }).first()
- Qty: page.getByPlaceholder('1').first()
- Price: page.getByPlaceholder(/price/i).first()
- Account combobox: page.getByRole('combobox').filter({ hasText: /search or create account/i }).first()
- Tax combobox: page.getByRole('combobox').filter({ hasText: /tax/i }).first()
- Discount type: page.getByRole('combobox').filter({ hasText: /fixed|percent|%/i }).first()
- Discount value: page.getByPlaceholder('0').first()
- Add a new line: page.getByRole('button', { name: /add a new line/i }).first()

Additional sections
- Notes: page.getByPlaceholder(/invoice notes|notes/i).first()
- Terms: page.getByPlaceholder(/payment terms|terms/i).first()
- Planned payment date: page.getByPlaceholder(/mm\/dd\/yyyy/i).first()
- Attachments: page.getByRole('button', { name: /select files|attachments/i }).first()


# new invoice page Ui
Here's a comprehensive breakdown of all the UI elements and form fields on the New Invoice page:
Header / Action Buttons

Cancel — button to discard the invoice
Save & close — dropdown button to save and exit
Approve — primary action button (green) with a dropdown chevron


Invoice Header Fields
FieldTypeDetailsCustomer *Combobox (dropdown)"Choose a Customer" — requiredInvoice No. *Text inputAuto-populated as "INV-0001", with an Auto Generate toggle buttonDate *Date picker (text + calendar icon)Default: 19/02/2026 — requiredDue Date *Date picker (text + calendar icon)Default: 19/03/2026 — requiredReferenceText inputPlaceholder: "REF-000001"CurrencyStatic displayShows "Entity base currency (INR)" (non-editable)Amounts areCombobox (dropdown)Options include "Tax exclusive"

Line Items Table
Each row contains these columns:
ColumnTypeDetailsItem/Service *Combobox (dropdown)"Select item…" — requiredDescriptionText inputFree-text descriptionUnitCombobox (dropdown)Default: "PCS"Qty *Text input (number)Default: 1 — requiredPriceNumber inputPlaceholder: "Price"AccountCombobox (dropdown)"Search or create account…"TaxCombobox (dropdown)Default: "No Tax (0%)"DiscountCombobox (dropdown) + Number inputType selector ("Fixed") + amount ("0.00")AmountStatic displayCalculated: "₹0.00"

+ Add a new line — button to add additional line items


Totals / Summary Section
FieldTypeDetailsSubtotalStatic display₹0.00DiscountCombobox ("Flat") + Number inputOverall invoice discountTotal TaxStatic display₹0.00Shipping & HandlingNumber inputPlaceholder: "0.00"Other ChargesNumber inputPlaceholder: "0.00"TotalStatic display₹0.00Amount dueStatic display0.00Realized / Unrealized / NetStatic displayINR 0.00 each

Early Payment Discount

Discount % — Number input (default: 0)
"if paid within" — Number input for days (default: 0)
Late Fee (Overdue Penalty)
Percentage — Number input (default: 0) with "%" label
Flat fee — Number input (default: 0.00)


Additional Fields
FieldTypeDetailsNotesTextareaPlaceholder: "Invoice notes, customer-facing remarks…"Terms & ConditionsTextareaPlaceholder: "Payment terms, conditions, etc…"Planned Payment DateDate picker (text + calendar icon)Placeholder: "MM/DD/YYYY"AttachmentsFile upload button"Select Files" — Accepts PDF, Images, CSV, Excel (Max 20MB)

In total, the page has approximately 25+ interactive fields/elements, spanning dropdowns, text inputs, number inputs, date pickers, textareas, file upload, and action buttons. Fields marked with \* are required.