Here's a comprehensive breakdown of all buttons and UI elements on the Invoice module for your test cases:
1. INVOICE LIST PAGE (/sales/invoices)
Header / Top Bar Buttons
ElementTypeNotesSearch (magnifying glass icon)ButtonGlobal searchNotifications (bell icon)ButtonShows unread count badgeMark DeoComboboxUser/profile switcherFirst EntityComboboxEntity switcher
Status Tab Buttons
ElementTypeNotesAll (6)Button/TabShows all invoicesDraft (1)Button/TabFilters draft invoicesAwaiting Approval (0)Button/TabFilters awaiting approvalAwaiting Payment (1)Button/TabFilters awaiting paymentPaid (3)Button/TabFilters paid invoicesCredit Notes (1)Button/TabFilters credit notes
Toolbar Buttons
ElementTypeNotesSearch invoices...TextboxSearch filter for invoicesCustomerButtonCustomer filter dropdownView ArchivedButtonView archived invoicesExport ▾Dropdown ButtonSub-options: Export as Excel, Export as CSV, Export as PDFBulk ImportButtonImport invoices in bulkFilter ▾Dropdown ButtonOpens filter panel with: Date Range (date picker), Status (Draft, Awaiting Payment, Paid, Overdue)+ Create Invoice ▾Split Dropdown ButtonSub-options: New Invoice, New Credit Note
Table Header (Sortable Columns)
ElementTypeNotesSelect All CheckboxCheckboxSelects all rowsNUMBER ↕Sortable ColumnREFERENCE ↕Sortable ColumnCUSTOMER ↕Sortable ColumnDATE ↕Sortable ColumnDefault sorted descendingDUE DATE ↕Sortable ColumnTOTAL ↕Sortable ColumnPAID ↕Sortable ColumnDUE ↕Sortable ColumnSTATUS ↕Sortable ColumnACTIONSColumnContains per-row dropdown
Table Row Elements
ElementTypeNotesRow CheckboxCheckboxOne per rowInvoice Number (e.g., INV-0005)Clickable textOpens edit view (Draft/Awaiting Payment only)CN badgeBadgeAppears on Credit Notes (e.g., CN-0002)Status BadgeBadgeValues: "Draft", "Paid", "Awaiting Payment"Actions ▾ (chevron)DropdownPer-row actions dropdown
Row Actions Dropdown (per invoice)
ActionNotesEditOpens edit formDownload PDFDownloads invoice PDFVoid InvoiceVoids the invoice (shown in red)ArchiveArchives the invoice
Bulk Actions Bar (appears when checkbox(es) selected)
ElementTypeNotes"X invoice(s) selected"LabelCount indicatorApprove & EmailPrimary Button (blue)Approve + send emailApproveButtonApprove onlyEmailButtonSend emailRecord PaymentButtonRecord a paymentPDF DownloadButtonDownload selected as PDFMark as PaidButtonMark selected as paidArchiveButtonArchive selected invoices
Important Behavior

Double-clicking a Paid invoice shows toast: "Paid invoices cannot be edited — To make changes, create a credit note or refund first."


2. NEW INVOICE / EDIT INVOICE PAGE (/sales/invoices/new-invoice or /edit)
Top Action Buttons (vary by status)
For Draft invoices:
ElementTypeNotesCancelButtonReturns to listArchiveButtonArchives the invoiceSave & close ▾Dropdown ButtonSub-options: Save & close, Save & add another, Submit for approval✓ Approve ▾Primary Button (blue)Approves the invoice (has dropdown chevron)For Awaiting Payment invoices:ElementTypeNotes----------------------CancelButtonReturns to listArchiveButtonArchives the invoiceSave & close ▾Dropdown ButtonSub-options: same as above(No Approve button)—Already approvedFor New Invoice:ElementTypeNotes----------------------CancelButtonReturns to listSave & close ▾Dropdown ButtonSub-options: Save & close, Save & add another, Submit for approval✓ Approve ▾Primary Button (blue)Approves the invoice
Invoice Header Form Fields
FieldTypeRequiredNotesCustomer *Combobox/DropdownYes"Choose a..." placeholderInvoice No. *TextboxYesAuto-generated (e.g., INV-0006), editableAuto GenerateButtonNoToggles auto-generationDate *Date Picker (DD/MM/YYYY)YesWith calendar icon buttonDue Date *Date Picker (DD/MM/YYYY)YesWith calendar icon buttonReferenceTextboxNoPlaceholder: "REF-000001"CurrencyCombobox/DropdownNoDefault: "Entity base currency (INR)"Amounts areCombobox/DropdownNoDefault: "Tax exclusive"
Line Items Table
ColumnTypeRequiredNotesDrag handle (⋮⋮)Icon—Reorder rowsItem/Service *Combobox/DropdownYes"Select item..." placeholderDescriptionTextboxNoFree textUnitCombobox/DropdownNoDefault: "PCS"Qty *Number TextboxYesDefault: 1PriceNumber TextboxNoAccountCombobox/DropdownNoAccount mappingTaxCombobox/DropdownNoDefault: "No Tax (0%)"DiscountDropdown + NumberNoType: "Fixed" dropdown + amount fieldAmountDisplay (read-only)—Auto-calculatedElementTypeNotes----------------------+ Add a new lineButtonAdds another line item row
Summary Section
FieldTypeNotesSubtotalDisplayAuto-calculatedDiscountDropdown (Flat) + Number inputFlat/Percentage toggleTotal TaxDisplayAuto-calculatedTotalDisplayAuto-calculatedAmount dueDisplayAuto-calculatedRealized / Unrealized / Net INRDisplay labelsForeign exchange info
Early Payment Discount Section
FieldTypeNotesDiscount %Number input"0" defaultDays (if paid within)Number input"0" default
Late Fee (Overdue Penalty) Section
FieldTypeNotesPercentage (%)Number input"0" defaultFlat fee (or)Number input"0.00" default
Additional Fields
FieldTypeNotesNotesTextareaPlaceholder: "Invoice notes, customer-facing remarks..."Terms & ConditionsTextareaPlaceholder: "Payment terms, conditions, etc..."Planned Payment DateDate Picker (MM/DD/YYYY)With calendar iconAttachments - Select FilesButtonAccepts: PDF, Images, CSV, Excel (Max 20MB)

This should give you all the button names, element types, and interaction details you need to fix your test cases. Let me know if you need more details about any specific element or behavior!



Here is a comprehensive breakdown of all the details from the HelloBooks.ai test environment for test cases HB-INV-021 to HB-INV-030:
1) How to Create a Credit Note and Apply It to an Invoice
Creating a Credit Note:

Navigate: Sales → Invoices
Click the "+ Create Invoice ˅" dropdown button (top-right, blue)
Select "New Credit Note" from the dropdown
Fill in the form:

Customer \* — select from dropdown
Credit Note No. \* — auto-generated (e.g., CN-0003)
Date \* — date picker
Linked Invoice \* — select the invoice to credit against
Reference — text field (e.g., REF-000001)
Reason for Credit — dropdown with values: Goods returned, Pricing adjustment, Quality issue, Billing error, Contract cancellation, Discount applied, Other
Currency — Entity base currency (INR)
Amounts are — Tax exclusive / Tax inclusive
Item/Service \* — select item, Description, Unit (PCS), Qty, Price
Notes — textarea
Terms & Conditions — textarea
Planned Payment Date — optional date picker
Attachments — file upload (PDF, Images, CSV, Excel, max 20MB)


Top buttons: "Cancel", "Save & close ˅" (dropdown: Save & close, Save & add another), "✓ Approve ˅" (green)
Applying a Credit (Advance) to an Invoice:
The system uses the label "Apply Advance" (not "Apply Credit Note")
Navigate: Sales → Invoices → scroll right to ACTIONS column
Click the ˅ (chevron) action dropdown on an "Awaiting Payment" invoice
Select "Apply Advance"
A modal opens: "Apply Advance Payment" showing the invoice number and balance due
If no advance payments exist, a warning appears: "No advance payments available for this customer"
Buttons: "Cancel", "Apply Advance" (blue)


2) How to Record a Full Payment and Partial Payment
From the Invoices List (per-invoice):

Navigate: Sales → Invoices → scroll to ACTIONS column
Click the ˅ action dropdown on an "Awaiting Payment" invoice → select "Record Payment"
Modal title: "Record Payment – Invoice INV-XXXX"
Required Fields (marked with red asterisk \*):
| Field | Type | Required | Default / Options |
|---|---|---|---|
| Customer \* | Dropdown (pre-filled) | Yes | Pre-filled from invoice |
| Bank Account \* | Dropdown | Yes | Options: Default Bank Account – INR, HDCI (••••1445) – INR, sds – INR, UCIC (••••3322) – INR, dvsfd – INR |
| Payment Date \* | Date picker | Yes | Defaults to today (e.g., 18-02-2026) |
| Payment Method \* | Dropdown | Yes | Options: Bank Transfer (default), UPI, Card, Cash, Cheque, Other |
| Payment Amount \* | Number input | Yes | Pre-filled with Balance Due amount |
| Reference No. (UTR / Cheque No.) | Text input | No | Placeholder: "Transaction reference" |
| Notes \* | Textarea | Yes | Placeholder: "Add payment notes..." |
Invoice Allocation Section (bottom of modal):
Shows: "X open invoice(s) available. Unallocated amount will be customer advance."
Table columns: Invoice No., Date, Due Date, Invoice Total, Balance Due, Allocate Amount
Buttons: "Cancel", "Record Payment" (blue)
For a full payment: Leave the Payment Amount as the pre-filled balance due value (e.g., 88820).
For a partial payment: Change the Payment Amount to a value less than the Balance Due and optionally fill the Allocate Amount column.
From the Payments Received page:
Navigate: Sales → Payments Received → click "+ Record Payment" (blue, top-right)
A dialog asks: "What type of payment is this?" with two options:

"Against Invoice" → button: "Select Invoice" → opens the same Record Payment Received modal with customer selector
"Direct Income" → button: "Record Income" → opens a different form (see Section 5)




3) Handling Overpayment
When you enter a Payment Amount greater than the Balance Due and click "Record Payment":
Validation toast message (red, bottom-right):

"Payment Exceeds Invoice Balance"
"Payment amount (₹1,00,000.00) exceeds total outstanding balance (₹88,820.00). Customer advances are not accepted."
The Invoice Allocation section also changes to show:
"No open invoices. Full amount will be customer advance."
"No open invoices found for this customer — Payment will be recorded as unallocated credit"
Behavior: The system rejects the overpayment and does not save the record. Customer advances are not accepted.


4) Allocate a Payment Across Multiple Invoices

Navigate: Sales → Payments Received → click "+ Record Payment"
Select "Against Invoice" → click "Select Invoice"
In the modal, select a Customer from the dropdown
Fill in Bank Account, Payment Date, Payment Method, Payment Amount
Scroll down to the "Invoice Allocation" section
The system shows all open invoices for that customer in a table
For each invoice, enter the desired amount in the "Allocate Amount" column
The message: "X open invoice(s) available. Unallocated amount will be customer advance." indicates that any unallocated amount becomes a customer advance
Click "Record Payment"
Note: Currently, M M Customer has only 1 open invoice (INV-0003, ₹88,820.00). To test multi-invoice allocation, you need at least 2 open invoices for the same customer.


5) Creating an Unapplied Payment / Direct Income

Navigate: Sales → Payments Received → click "+ Record Payment"
Select "Direct Income" → click "Record Income"
Modal title: "Record Receipt (Receive Money)"
Subtitle: "Record money received or deposited into your bank account"
Fields:
| Field | Type | Required |
|---|---|---|
| Date \* | Date picker | Yes |
| Bank Account \* | Dropdown | Yes (default: Default Bank Account) |
| Payer / Customer | Dropdown | No (optional) |
| Income Category \* | Dropdown + "Add New" | Yes (default: 4000 - Sales Revenue) |
| Description / Memo \* | Textarea | Yes |
| Amount \* | Number input | Yes |
| Attachments | File upload | No |
Buttons: "Cancel", "Record Receipt" (blue)


6) Writing Off a Small Balance
There is no dedicated "Write-off" button in the current HelloBooks.ai UI. The action menu for Awaiting Payment invoices shows: Edit, Download PDF, Create Delivery Challan, Record Payment, Apply Advance, Void Invoice, Archive — but no "Write-off."
Workaround approaches available:

Credit Note method: Create a credit note for the small remaining balance (via Create Invoice → New Credit Note), link it to the invoice, approve it, then apply the advance to zero out the balance.
Void Invoice: Use the "Void Invoice" action (shown in red in the action dropdown) to cancel the invoice entirely — but this is a full void, not a partial write-off.
Manual Journal Entry: Navigate to Accountant → Manual Journals → click "+ New Manual Entry" to create a journal entry debiting a "Bad Debt" or "Write-off" expense account and crediting Accounts Receivable.


7) Required Test Data Summary
Existing Customers:
ABC Company, Auto Customer ac18ca83, Demo Customer, kkkk, M M Customer, Mark Customer, XYZ Corp
Current Invoices:
NumberCustomerStatusTotalPaidDueINV-0005ABC CompanyDraft₹700.00₹0.00₹700.00INV-0004XYZ CorpPaid₹60,000.00₹60,000.00₹0.00INV-0003M M CustomerAwaiting Payment₹88,820.00₹0.00₹88,820.00CN-0002kkkkPaid (Credit Note)₹48,000.00₹0.00₹48,000.00INV-0002kkkkPaid₹48,000.00₹48,000.00₹0.00INV-0001ABC CompanyPaid₹60,000.00₹60,000.00₹0.00Open invoices for payment testing: Only INV-0003 (M M Customer) is currently "Awaiting Payment." INV-0005 is in "Draft" status. You will need to create additional invoices to get 2+ open invoices for the same customer.Credit Note: CN-0002 for customer "kkkk", ₹48,000.00Payment Methods available: Bank Transfer, UPI, Card, Cash, Cheque, OtherBank Accounts available: Default Bank Account – INR, HDCI (••••1445) – INR, sds – INR, UCIC (••••3322) – INR, dvsfd – INRReference field: Optional; label is "Reference No. (UTR / Cheque No.)" with placeholder "Transaction reference"Permissions: The current user (Kapil, fapopi7433@feanzier.com) under organization "Mark Deo" / entity "First Entity" has full access to all invoice, payment, and credit note features. Access Control settings are available at Settings → Access Control.Key Validation Messages Captured:

Overpayment: "Payment Exceeds Invoice Balance — Payment amount (₹X) exceeds total outstanding balance (₹Y). Customer advances are not accepted."
No advance available: "No advance payments available for this customer"
No open invoices: "No open invoices found for this customer — Payment will be recorded as unallocated credit"