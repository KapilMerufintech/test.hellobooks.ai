# Purchases > Bills UI map (Playwright selectors and flow)

Source files:
- `src/components/BillsTab.tsx`
- `src/components/BillDrawer.tsx`
- `src/components/BillsTableToolbar.tsx`
- `src/components/SmartContactPicker.tsx`
- `src/components/SmartItemPicker.tsx`
- `src/components/AccountsDropdown.tsx`
- `src/components/ui/searchable-select.tsx`
- `src/components/ui/tax-rate-select.tsx`

## Navigation flow
- Sidebar: Purchases menu -> Bills page
  - Purchases menu button: `getByTestId('sidebar-purchases-button')`
  - Bills link: `getByTestId('purchases-bills-link')`
  - Bills page root: `getByTestId('bills-page')`
- Direct New Bill URL: `https://test.hellobooks.ai/purchases/bills/new-bill`

## Bills page header and tabs
- Page title: text `Bills`
- Main tabs (top): `getByRole('tab', { name: 'Bills' })`, `getByRole('tab', { name: 'Analytics' })`
- Status tabs (row under main tabs):
  - `getByTestId('bills-tab-all')`
  - `getByTestId('bills-tab-draft')`
  - Others use button text: `Awaiting Approval`, `Awaiting Payment`, `Paid`, `Overdue`, `Void`

## Bills page toolbar (left side)
- Search input: `getByPlaceholder('Search bills...')`
- Clear search button: `getByRole('button', { name: 'Clear search' })`
- Vendor filter popover:
  - Open: `getByRole('button', { name: 'Vendor' })`
  - Vendor search: `getByPlaceholder('Search vendors...')`
  - Vendor list item: `getByRole('button', { name: vendorName })`
  - Clear vendor: `getByRole('button', { name: 'Clear' })`
- Filter popover:
  - Open: `getByRole('button', { name: 'Filter' })`
  - Date range: `getByRole('button', { name: 'Pick a date range' })`
  - Status items inside popover: `getByRole('button', { name: 'Draft' })`, etc.
  - Clear all: `getByRole('button', { name: 'Clear all' })`

## Bills page toolbar (right side)
- Export to Excel: icon-only button (no test id). Prefer tooltip name if exposed: `getByRole('button', { name: 'Export to Excel' })`
- Archive toggle: icon-only button with tooltip text:
  - `View Archived Bills` or `View Active Bills`
- New Bill dropdown:
  - Open: `getByTestId('bill-new-button')`
  - Menu items:
    - `getByTestId('bill-new-action')`
    - `getByTestId('debit-note-new-action')`
    - `getByTestId('credit-note-new-action')`
    - `getByRole('menuitem', { name: 'Upload Bills (OCR)' })`
    - `getByRole('menuitem', { name: 'Import from CSV/Excel' })`
    - `getByRole('menuitem', { name: 'Download Template' })`

## Bills list and bulk actions
- Table row click opens Bill Drawer (row is clickable).
  - Use table row: `page.locator('table tbody tr').nth(i).click()`
- Row selection checkboxes: `getByRole('checkbox')` within table header/rows.
- Bulk action bar appears when any row selected (all buttons by text):
  - `Email`
  - `PDF Download`
  - `Record Payment`
  - `Apply Debit Note`
  - `Approve`
  - `Approve & Pay`
  - `Archive` or `Restore`

## Bill Drawer container
- Drawer root: `getByTestId('bill-drawer')`
- Title text:
  - `New Bill`, `Edit Bill`
  - `New Debit Note`, `Edit Debit Note`
  - `New Credit Note`, `Edit Credit Note`

### Drawer actions (header in container mode, footer in drawer mode)
Scope all locators to `getByTestId('bill-drawer')` to avoid duplicates.

Primary buttons:
- `Cancel`
- `Archive` (only for existing bill)
- `Void` (only for eligible statuses)
- `Save` (draft)
- `Approve`
- `Update Notes` (only when status is `void`)
- `Apply Debit Note` (only for eligible bills)

Save dropdown (click chevron button next to Save, then menuitems):
- `Save as draft`
- `Save (continue editing)`
- `Save & submit for approval`
- `Save & add another`

Approve dropdown (click chevron button next to Approve, then menuitems):
- `Approve`
- `Approve & add another`
- `Approve & view next`

Data-test ids (footer buttons in drawer mode):
- Save button: `getByTestId('bill-save-draft-button')`
- Approve button: `getByTestId('bill-approve-button')`

## Bill form fields (right side)
All fields are inside `getByTestId('bill-drawer')`.

Header fields:
- Vendor picker:
  - Trigger: `getByTestId('vendor-picker-trigger')`
  - Search input: `getByPlaceholder('Search vendor...')` (uses dynamic label based on industry)
  - Create vendor: `getByTestId('vendor-quick-create-button')`
- Bill No.:
  - Input: `getByPlaceholder('BILL-001')` (Debit Note uses `DBN-001`)
  - Auto generate: `getByRole('button', { name: 'Auto Generate' })`
  - Note: bill number is auto-generated; no manual entry required for normal flow
- Date:
  - Date input uses placeholder `MM/DD/YYYY` inside the "Date" field group
- Due Date:
  - Date input uses placeholder `MM/DD/YYYY` inside the "Due Date" field group
- Reference:
  - Input: `getByPlaceholder('REF-000001')`
- Currency (only when multi-currency enabled):
  - Trigger/button text: `Select currency`
- Amounts are:
  - Select with values: `Tax Exclusive`, `Tax Inclusive`, `No Tax`

## Line items table
Use row scoping to avoid ambiguous placeholders:
```
const billDrawer = page.getByTestId('bill-drawer');
const line = billDrawer.locator('tbody tr').nth(0);
```

Per line item:
- Item picker: `line.getByTestId('item-picker-trigger')`
  - Search input: `getByPlaceholder('Search items or type to create new...')`
  - Create item: `getByTestId('item-create-new-button')`
- Description: `line.getByPlaceholder('Description')`
- Unit select: `line.getByRole('combobox', { name: 'Unit' })` (or `line.getByText('Unit')` trigger)
- Qty: `line.getByPlaceholder('Qty')`
- Price: `line.getByPlaceholder('0.00')` (price input)
- Account dropdown: button with placeholder text `Search or create account...`
- Tax select: button with placeholder `No Tax`
- Discount type: select with `Fixed` or `%`
- Discount value: `line.getByPlaceholder('0.00')` (discount input, after discount type)
- Remove line: icon-only button in last column (use row scope and `getByRole('button').last()` as fallback)

Add line:
- `getByRole('button', { name: 'Add a new line' })`

## Notes and terms
- Notes / Remarks: `getByPlaceholder('Add any additional notes or remarks about this bill...')`
- Terms & Conditions: `getByPlaceholder('Payment terms, conditions, etc...')`

## Totals section (right side)
Text-only assertions:
- `Subtotal:`
- `Bill Discount:` (select + input)
- `Total Discount:` (only if discount exists)
- `Total Tax:`
- `Total Amount:`
- `Amount Due:` (only when payments/debit notes exist)

## Attachments / document preview (left side)
Initial upload (no preview):
- Upload label: `getByRole('button', { name: 'Upload' })`
- File input: `input#bill-file-upload`

Replace upload (when preview exists):
- File input: `input#bill-file-upload-replace`
- Preview controls (icon buttons use `title`):
  - `Zoom out`, `Zoom in`, `Rotate`, `Reset view`

## Common quick assertions
- Drawer open: `getByTestId('bill-drawer')`
- Vendor required message: text `Vendor is required` or `Select a vendor`
- Save/approve menus: menuitems listed above (role `menuitem`)
- After successful save, app returns to Bills list: `/purchases/bills`


Here’s the exact UI flow and selectors for opening the New Bill drawer (from BillsTab.tsx + BillDrawer.tsx):

New Bill button text: "New Bill"
Type: dropdown button (DropdownMenu trigger)
TestId: bill-new-button
Aria-label: Create new bill
Menu item text: "New Bill"
Menu item TestId: bill-new-action
Drawer root: data-testid="bill-drawer"

DOM snippet:

<button data-testid="bill-new-button" aria-label="Create new bill">
  New Bill
</button>
<div data-testid="bill-drawer">...</div>
Flow:

Click getByTestId('bill-new-button')
Click getByTestId('bill-new-action') (menu item “New Bill”)
Assert drawer: getByTestId('bill-drawer') visible

# URL

Bill list page URL: /purchases/bills
New Bill URL: /purchases/bills/new-bill
