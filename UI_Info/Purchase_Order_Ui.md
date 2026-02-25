List/select POs: /purchases/purchase-orders (sidebar entry “Purchase Orders”). 
Create new PO: /purchases/purchase-orders/new (button “New Purchase Order”). 
Edit PO (route exists): /purchases/purchase-orders/:id/edit (drawer is also opened from list without URL change).
Buttons / Menu Items (text)

List page header/actions:
“New Purchase Order”
Export (icon) tooltip “Export to Excel”
Archive toggle (icon) tooltip “View Archived (…)” / “View Active Purchase Orders”
Import (icon) tooltip “Import”
Bulk actions (when rows selected):
“Convert to Bill”
“Approve”
“Cancel”
“Move to Draft”
“Email”
“PDF Download”
“Archive”
“Restore” (archived view)
Table row actions (icon buttons with tooltips):
“Receive Items”
“Convert to Bill”
“Undo Receipt”
Drawer header actions (when editing):
“Approve” (draft → approved)
“Send to Vendor” (approved → sent)
“Mark Received” (sent → received)
“Receive Items”
“Convert to Bill”
“Close PO”
“Archive”
“Save Draft”
“Send” dropdown: “Save & Submit”, “Send & Mark as Sent”
“Cancel”
Required Inputs + Selectors/Placeholders
Required validation from validatePOForm():

Vendor: required
Label: “Vendor *”
Picker placeholder: “Select vendor”
PO Date: required by schema + validation (future date blocked)
Label: “PO Date *”
Placeholder: “MM/DD/YYYY”
At least one line item (item required; quantity > 0; price ≥ 0; total must be > 0)
Line items row fields/placeholders:
Item: placeholder “Select item”
Description: placeholder “Description”
Unit: placeholder “Unit”
Qty: placeholder “Qty”
Price: placeholder “0.00”
Account: placeholder “Search or create account...”
Tax: placeholder “No Tax”
Discount: placeholder “0” or “0.00”
Other visible fields (not required):
Expected Delivery: placeholder “MM/DD/YYYY”
Currency (select)
Payment Terms (select)
Shipping Method: placeholder “e.g., Express, Standard”
Delivery Address: placeholder “Enter delivery address”
Notes: placeholder “Notes for vendor”
Internal Notes: placeholder “Internal notes”
Terms & Conditions: placeholder “Enter terms and conditions”
Table/List Selectors for PO Rows

Desktop table: <Table className="sales-table-compact"> with columns:
“PO Number”, “Vendor”, “Date”, “Expected Delivery”, “Status”, “Amount”, “Actions”
Row click opens drawer (entire row clickable)
Checkbox column for selection
Save/Submit Actions + Confirmation Dialogs

Save Draft: “Save Draft” button
Send dropdown:
“Save & Submit”
“Send & Mark as Sent”
Confirmation:
If editing approved/sent PO and clicking Save Draft (non-send), uses window.confirm:
“This Purchase Order has been approved. Saving will revert it to "Pending Approval" and require re-approval. Continue?”
Archive confirmation dialog (drawer):
Title: “Archive Purchase Order”
Description: “Are you sure you want to archive this purchase order? You can restore it later from the archived view.”
Confirm text: “Archive”
Bulk archive/restore confirm dialogs (list):
“Archive Purchase Orders” / “Restore Purchase Orders”

Toasts (examples):
“PO {poNumber} sent to vendor”
“PO {poNumber} created successfully”
“PO {poNumber} updated successfully”
“Purchase Order archived”
Status change toast: “PO {StatusLabel}”
Status badge in drawer header (Badge shows Draft/Approved/Sent/etc.)
URL change when creating via “New Purchase Order” (route /purchases/purchase-orders/new)


# New Purchase Order Ui Info

New Purchase Order page UI (create flow)

Page/URL

/purchases/purchase-orders/new (Create PO form). 
Create page actions

“Save Draft”
“Send” dropdown: “Save & Submit”, “Send & Mark as Sent”
“Cancel”
“Archive” is only for existing POs (not shown for new)
Required inputs (create)

Vendor: label “Vendor *”, placeholder “Select vendor”
PO Date: label “PO Date *”, placeholder “MM/DD/YYYY”
At least one line item with:
Item: placeholder “Select item”
Qty: placeholder “Qty”
Price: placeholder “0.00”
Total must be > 0 (validation)
Line items table (create)

Table headers: Item*, Description, Unit, Qty, Price, Account, Tax, Discount, Amount
“Add a new line” button to add rows
Optional fields (create)

Expected Delivery (placeholder “MM/DD/YYYY”)
Currency
Payment Terms
Shipping Method (placeholder “e.g., Express, Standard”)
Delivery Address (placeholder “Enter delivery address”)
Notes / Internal Notes / Terms & Conditions (placeholders provided)
Attachments uploader (“Drop files here or click to upload”)
Success indicators (create)

Toast: “PO {poNumber} created successfully” or “PO {poNumber} sent to vendor”
Status badge in header (e.g., Draft)
