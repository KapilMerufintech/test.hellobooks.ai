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