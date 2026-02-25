# Sales > Invoices (New Invoice) item-level discount UI map

Source files:
- `src/components/InvoicesTab.tsx`
- `src/components/InvoiceDrawer.tsx`
- `src/components/SmartContactPicker.tsx`
- `src/components/SmartItemPicker.tsx`
- `src/components/AccountsDropdown.tsx`
- `src/components/ui/searchable-select.tsx`
- `src/components/ui/tax-rate-select.tsx`

## Navigation to New Invoice
- Sidebar Sales -> Invoices:
  - Sales menu link: `getByTestId('sales-invoices-link')`
  - Invoices page root: `getByTestId('invoices-page')`
- New Invoice:
  - New button: `getByTestId('invoice-new-button')`
  - New invoice action (dropdown): `getByTestId('invoice-new-action')`
  - Invoice form root: `getByTestId('invoice-form')`
  - Invoice drawer root: `getByTestId('invoice-drawer')`

## Invoice header actions (container mode)
Scope with `#invoice-header-actions` (in `InvoiceDrawer.tsx`):
- Cancel: button text `Cancel` inside `#invoice-header-actions`
- Save & close dropdown trigger: button text `Save & close` inside `#invoice-header-actions`
  - Menu items:
    - `Save & close`
    - `Save & add another`
    - `Submit for approval` (only for invoices, not quotes, and eligible statuses)
- Approve dropdown trigger: button text `Approve` inside `#invoice-header-actions`
  - Menu items:
    - `Approve`
    - `Approve & add another`
    - `Approve & email`

## Invoice form fields (for context)
All below are inside `getByTestId('invoice-drawer')`.
- Customer picker:
  - Trigger: `getByTestId('customer-picker-trigger')`
  - Search input: `getByPlaceholder('Search customer...')` (label varies by industry)
  - Create customer: `getByTestId('customer-quick-create-button')`
- Invoice No. input: placeholder depends on doc type (`Invoice No.` for invoices)
- Invoice Date / Due Date: date pickers (no test id; target by label text)
- Reference: `getByLabel('Reference')` or `getByPlaceholder('REF-000001')`
- Amounts are: SearchableSelect with values `Tax exclusive`, `Tax inclusive`, `No tax`

## Line items (item-level discount)
Use row scoping to avoid ambiguity:
```
const invoice = page.getByTestId('invoice-drawer');
const line = invoice.locator('tbody tr').nth(0);
```

Per line item controls (new invoice):
- Item/Service picker: `line.getByTestId('item-picker-trigger')`
- Description: `line.getByPlaceholder('Description')`
- Unit: `line.getByPlaceholder('Unit')` (Combobox trigger)
- Qty: `line.getByPlaceholder('1')`
- Price: `line.getByPlaceholder('Price')`
- Account: button with placeholder text `Search or create account...`
- Tax: select with placeholder `No Tax`

### Item-level Discount controls (this request)
Located in the `Discount` column for each line:
- Discount type select:
  - Uses a Select trigger showing `Fixed` or `%`
  - Target by the button text inside the line, e.g.
    - `line.getByRole('button', { name: 'Fixed' })`
    - or if currently `%`: `line.getByRole('button', { name: '%' })`
- Discount value input:
  - Placeholder `0.00`
  - Target inside line row:
    - `line.getByPlaceholder('0.00')`

#### Robust row-scoped locator (recommended)
Prefer scoping by the discount input cell, then find the combobox inside it:
```
const invoice = page.getByTestId('invoice-drawer');
const line = invoice.locator('tbody tr').first();
const discountCell = line.locator('td', { has: line.locator('input[placeholder="0.00"]') }).first();
const discountType = discountCell.locator('button[role="combobox"]').first();
const discountInput = discountCell.locator('input[placeholder="0.00"]').first();
```

If visibility is flaky (Turnstile / async render):
```
await line.scrollIntoViewIfNeeded();
await expect(line).toBeVisible();
await discountType.scrollIntoViewIfNeeded();
```

Behavior notes (from `InvoiceDrawer.tsx`):
- Percent discount is capped at `100`.
- Flat discount is capped at `line quantity * line price`.
- Line amount updates to `lineSubtotal - lineDiscount`.

## Add / remove lines
- Add line: `getByRole('button', { name: 'Add a new line' })`
- Remove line: icon button in last column of the row (use row scope and `getByRole('button').last()` as fallback)

## HB-INV-010 test flow notes
Suggested row-scoped flow for item-level discount:
1) Open new invoice
2) Fill required fields (customer, item, qty, price)
3) Find discount combobox inside the cell that contains `input[placeholder="0.00"]`
4) Choose `%`
5) Fill discount input with `10`
6) Select `10%` tax

Example snippet:
```
const invoice = page.getByTestId('invoice-drawer');
const line = invoice.locator('tbody tr').first();

const discountCell = line.locator('td', { has: line.locator('input[placeholder="0.00"]') }).first();
const discountType = discountCell.locator('button[role="combobox"]').first();
await discountType.click();
await page.getByRole('option', { name: '%' }).click();
await discountCell.locator('input[placeholder="0.00"]').fill('10');

const taxSelect = line.locator('button[role="combobox"]', { hasText: 'No Tax' });
await taxSelect.click();
await page.getByRole('option', { name: /10%/ }).click();
```
