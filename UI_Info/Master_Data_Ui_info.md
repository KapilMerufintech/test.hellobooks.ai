Master Data UI elements (Contacts, Items)

Page: /master-data/contacts
- Page heading: Contacts
- Search input: "Search contacts..."
- + New Contact button
- Table columns: Name, Type, Email, Phone, Status, Actions

Page: /master-data/contacts/new
- Page heading: New Contact / New Customer
- Name input: label or placeholder matches /name|contact name|customer name|display name/i
- Email input: label or placeholder matches /email/i
- Phone input: label or placeholder matches /phone|mobile/i
- Save button: role button name /save|create|submit/i
- Cancel button: role button name /cancel/i

Page: /master-data/items
- Page heading: Items
- Search input: "Search items..."
- + New Item button
- Table columns: Code, Name, Type, Price, Status, Actions

Page: /master-data/items/new
- Page heading: New Item / Create Item
- Code input: label or placeholder matches /code|sku/i
- Name input: label or placeholder matches /name/i
- Sale price input: label or placeholder matches /sale price|selling price|price/i
- Purchase/Sell checkboxes: label /purchase|sell/i (if present)
- Save button: role button name /save|create|submit/i
- Cancel button: role button name /cancel/i

Notes
- These selectors are fallback-friendly and should be validated against the current UI.
- If a field label differs, update the regex to match the visible text.
