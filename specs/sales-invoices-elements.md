# Sales > Invoices - Frontend Elements for Automation

This file captures key UI elements on the Sales > Invoices area to speed up manual-to-automation conversion.

URLs
- List page: https://test.hellobooks.ai/sales/invoices
- New invoice: https://test.hellobooks.ai/sales/invoices/new-invoice

---

## Section: Invoices List Page

Purpose: View invoices, filter/search, select rows, use bulk actions.

Primary elements
- Page heading:
  - `page.getByRole('heading', { name: /invoices/i })`
- Status tabs:
  - `page.getByRole('button', { name: /all \\(/i })`
  - `page.getByRole('button', { name: /draft \\(/i })`
  - `page.getByRole('button', { name: /awaiting approval/i })`
  - `page.getByRole('button', { name: /awaiting payment/i })`
  - `page.getByRole('button', { name: /paid \\(/i })`
  - `page.getByRole('button', { name: /credit notes/i })`
- Search input:
  - `page.getByPlaceholder('Search invoices...')`
- Customer filter button:
  - `page.getByRole('button', { name: 'Customer' })`
- Filter button:
  - `page.getByRole('button', { name: 'Filter' })`
- View archived:
  - `page.getByRole('button', { name: 'View Archived' })`
- Export:
  - `page.getByRole('button', { name: 'Export' })`
- Bulk import:
  - `page.getByRole('button', { name: 'Bulk Import' })`
- Create invoice:
  - `page.getByRole('button', { name: 'Create Invoice' })`

Table elements
- Table rows:
  - `page.locator('table tbody tr')`
- Invoice number cell (text):
  - `page.getByText(/INV-\\d+|CN-\\d+/i).first()`
- Row checkbox:
  - `row.locator('input[type=\"checkbox\"], [role=\"checkbox\"]').first()`
- Row status badge:
  - `row.getByText(/draft|approved|sent|paid|awaiting payment|awaiting approval/i).first()`
- Row actions button (kebab):
  - `row.locator('button').last()` (confirm in UI, varies by build)

Bulk action bar (visible after row select)
- Approve & Email:
  - `page.getByRole('button', { name: /approve & email/i })`
- Approve:
  - `page.getByRole('button', { name: 'Approve' })`
- Email:
  - `page.getByRole('button', { name: /^Email$/i })`
- Record Payment:
  - `page.getByRole('button', { name: /record payment/i })`
- PDF Download:
  - `page.getByRole('button', { name: /pdf download/i })`
- Mark as Paid:
  - `page.getByRole('button', { name: /mark as paid/i })`
- Archive:
  - `page.getByRole('button', { name: /archive/i })`

---

## Section: New Invoice Page

Purpose: Create/edit an invoice with customer, line items, taxes, discounts, notes.

Primary elements
- Page heading:
  - `page.getByRole('heading', { name: /new invoice/i })`
- Customer combobox:
  - `page.getByLabel('Customer').locator('[role=\"combobox\"]')`
- Invoice No:
  - `page.getByLabel(/invoice no/i)`
- Auto Generate link/button:
  - `page.getByRole('button', { name: /auto generate/i })`
- Date:
  - `page.getByLabel('Date').locator('input')`
- Due Date:
  - `page.getByLabel('Due Date').locator('input')`
- Reference:
  - `page.locator('input[placeholder*=\"REF\" i], input[aria-label*=\"reference\" i]')`
- Currency (display only):
  - `page.getByText(/entity base currency/i)`
- Amounts are (Tax exclusive/inclusive):
  - `page.locator('[role=\"combobox\"]').filter({ hasText: /tax exclusive|tax inclusive/i })`

Line items table
- Item/Service combobox (first row):
  - `page.locator('table tbody tr').first().getByRole('combobox').first()`
- Description input:
  - `page.locator('table tbody tr').first().locator('input[placeholder=\"Description\"]')`
- Unit dropdown:
  - `page.locator('table tbody tr').first().getByRole('combobox').nth(1)`
- Qty:
  - `page.locator('input[placeholder=\"1\"]')`
- Price:
  - `page.locator('input[type=\"number\"][placeholder=\"Price\"]')`
- Account dropdown:
  - `page.locator('table tbody tr').first().getByRole('combobox').filter({ hasText: /account|search or create account/i })`
- Tax dropdown:
  - `page.locator('table [role=\"combobox\"]').filter({ hasText: /no tax|tax/i })`
- Discount type dropdown:
  - `page.locator('table [role=\"combobox\"]').filter({ hasText: /fixed|percent/i })`
- Discount amount input:
  - `page.locator('input[type=\"number\"][placeholder=\"0.00\"]')`
- Add new line:
  - `page.getByText(/add a new line|add line/i)`

Notes and terms
- Notes textarea:
  - `page.getByPlaceholder('Invoice notes, customer-facing remarks...')`
- Terms & Conditions textarea:
  - `page.getByPlaceholder('Payment terms, conditions, etc...')`

Footer actions
- Cancel:
  - `page.getByRole('button', { name: 'Cancel' })`
- Save & close (dropdown button):
  - `page.getByRole('button', { name: /save & close/i })`
- Save & close menu item:
  - `page.getByRole('menuitem', { name: 'Save & close' })`
- Save & add another:
  - `page.getByRole('menuitem', { name: /save & add another/i })`
- Submit for approval:
  - `page.getByRole('menuitem', { name: /submit for approval/i })`

---

## Section: Archive Confirmation Modal

Triggered from list page (bulk action bar)
- Dialog:
  - `page.getByRole('dialog').filter({ hasText: /archive invoices/i })`
- Confirm button:
  - `dialog.getByRole('button', { name: 'Archive' })`
- Cancel button:
  - `dialog.getByRole('button', { name: 'Cancel' })`

---
## pages URLS

invoice page URL - https://test.hellobooks.ai/sales/invoices
new invoice page URL - https://test.hellobooks.ai/sales/invoices/new-invoice

## Section: Record Payment Modal (Bulk)

Triggered from list page (bulk action bar)
- Dialog title:
  - `page.getByRole('dialog').filter({ hasText: /record bulk payments/i })`
- Payment Date:
  - `dialog.getByLabel(/payment date/i).locator('input')`
- Payment Method:
  - `dialog.getByLabel(/payment method/i)`
- Deposit To:
  - `dialog.getByLabel(/deposit to/i)`
- Reference Number:
  - `dialog.getByLabel(/reference number/i)`
- Notes:
  - `dialog.getByLabel(/notes/i)`
- Record Payments button:
  - `dialog.getByRole('button', { name: /record payments/i })`
- Cancel:
  - `dialog.getByRole('button', { name: /cancel/i })`

---

## Section: Email Dialog (from list)

Triggered from list page (bulk action bar)
- Dialog:
  - `page.getByRole('dialog').filter({ hasText: /email/i })`
- Send/Confirm button:
  - `dialog.getByRole('button', { name: /send|email/i })`
- Cancel/Close:
  - `dialog.getByRole('button', { name: /cancel|close/i })`

---

Notes for automation
- In list page, invoice numbers are rendered as text inside table rows. Use `page.getByText(/INV-\\d+/i)` to locate.
- For selecting a row, prefer checkbox first; if not available, click the row.
- Some dropdowns are custom combobox controls; use listbox options or `.ant-select-dropdown` to select values.
- New Item modal can appear if no item is selected; avoid by choosing an existing item from the list.
