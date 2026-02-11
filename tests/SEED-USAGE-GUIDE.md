# 🌱 Seed File Usage Guide

## 📁 File Location
**Central Seed File:** `D:\Testing Temp\tests\seed.config.ts`

This file contains:
- ✅ Login credentials (email, password)
- ✅ Login function (`seedLogin`)
- ✅ Test data generator (`buildSeedData`)
- ✅ Navigation helpers
- ✅ Common wait utilities

---

## 🚀 Quick Start - 3 Steps

### Step 1: Import in ANY test file

```typescript
import { seedLogin, buildSeedData } from './seed.config';
```

### Step 2: Use in your test

```typescript
test('My Test @T123', async ({ page }) => {
  test.setTimeout(180000); // 3 minutes
  
  // Login (one line!)
  await seedLogin(page);
  
  // Your test logic here
});
```

### Step 3: Run your test

```bash
npx playwright test your-test.spec.ts
```

---

## 📋 Import Options

### Option 1: Import Everything You Need
```typescript
import { 
  seedLogin, 
  seedCredentials, 
  buildSeedData,
  navigateToInvoices,
  navigateToQuotes,
  waitForToast
} from './seed.config';
```

### Option 2: Import Just Login
```typescript
import { seedLogin } from './seed.config';
```

### Option 3: Import All
```typescript
import * as Seed from './seed.config';

// Usage:
await Seed.seedLogin(page);
const data = Seed.buildSeedData(test.info().testId);
```

---

## 🎯 Common Patterns

### Pattern 1: Simple Login Test
```typescript
import { test, expect } from '@playwright/test';
import { seedLogin } from './seed.config';

test('Login and verify @T001', async ({ page }) => {
  test.setTimeout(180000);
  await seedLogin(page);
  await expect(page).not.toHaveURL(/login/);
});
```

### Pattern 2: Test with Unique Data
```typescript
import { test, expect } from '@playwright/test';
import { seedLogin, buildSeedData } from './seed.config';

test('Create invoice @T002', async ({ page }) => {
  test.setTimeout(180000);
  
  const seed = buildSeedData(test.info().testId);
  await seedLogin(page);
  
  // Use seed.customerName, seed.invoiceNumber, etc.
  console.log(`Creating invoice: ${seed.invoiceNumber}`);
});
```

### Pattern 3: Test with Navigation Helper
```typescript
import { test, expect } from '@playwright/test';
import { seedLogin, navigateToInvoices } from './seed.config';

test('Open invoices page @T003', async ({ page }) => {
  test.setTimeout(180000);
  
  await seedLogin(page);
  await navigateToInvoices(page);
  
  await expect(page.getByRole('heading', { name: /invoices/i })).toBeVisible();
});
```

### Pattern 4: Access Credentials Directly
```typescript
import { test } from '@playwright/test';
import { seedCredentials } from './seed.config';

test('Manual login @T004', async ({ page }) => {
  test.setTimeout(180000);
  
  await page.goto('/login');
  await page.fill('input[name="email"]', seedCredentials.email);
  await page.fill('input[name="password"]', seedCredentials.password);
  await page.click('button[type="submit"]');
});
```

---

## 🔧 Available Functions

### Authentication
- `seedLogin(page)` - Full login with waits and validation
- `seedLoginSimple(page)` - Quick login (minimal waits)
- `seedCredentials` - Direct access to email/password

### Data Generation
- `buildSeedData(testId)` - Generate unique test data
  - Returns: customerName, customerEmail, invoiceNumber, reference, timestamp

### Navigation
- `navigateToInvoices(page)` - Go to invoices page
- `navigateToQuotes(page)` - Go to quotes page
- `navigateToCustomers(page)` - Go to customers page

### Utilities
- `waitForPageReady(page)` - Wait for page to load
- `waitForToast(page, pattern)` - Wait for toast notification

---

## 🏗️ Folder Structure

```
D:\Testing Temp\tests\
├── seed.config.ts           ← Central seed file (credentials + helpers)
├── example.seed.usage.spec.ts ← Example usage
├── SEED-USAGE-GUIDE.md      ← This guide
├── sales\
│   ├── invoices.spec.ts     ← Import from ../seed.config
│   ├── quotes.spec.ts       ← Import from ../seed.config
│   └── loginnn.spec.ts      ← Import from ../seed.config
└── master-data\
    └── customers.spec.ts    ← Import from ../seed.config
```

---

## ✅ Benefits

1. **Single Source of Truth** - Change credentials in ONE place
2. **Works Everywhere** - Local, Jenkins, Testomat.io
3. **No Duplication** - Write once, use everywhere
4. **Easy Maintenance** - Update login logic once
5. **Type Safety** - TypeScript types included
6. **Consistent Data** - Standardized test data generation

---

## 🚨 Important Notes

### For Jenkins/Testomat.io
✅ The relative import `'./seed.config'` works correctly because:
- File is in same `tests/` folder
- No complex path resolution needed
- Works with Node.js module resolution

### Import Path Rules
- Same folder: `import { seedLogin } from './seed.config'`
- Subfolder (e.g., sales/): `import { seedLogin } from '../seed.config'`
- Two levels down: `import { seedLogin } from '../../seed.config'`

### Timeout Settings
Always set timeout in each test:
```typescript
test.setTimeout(180000); // 3 minutes
```

---

## 🎓 Quick Copy-Paste Template

```typescript
import { test, expect } from '@playwright/test';
import { seedLogin, buildSeedData } from './seed.config';

test.describe('My Test Suite @suite-id', () => {
  test('My Test Case @test-id', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes
    
    // 1. Generate unique test data
    const seed = buildSeedData(test.info().testId);
    
    // 2. Login
    await seedLogin(page);
    
    // 3. Your test steps
    await page.goto('/?tab=invoices');
    
    // 4. Assertions
    await expect(page.getByRole('heading', { name: /invoices/i })).toBeVisible();
  });
});
```

---

## 📞 Need Help?

1. Check `example.seed.usage.spec.ts` for working examples
2. Verify import path: `'./seed.config'` or `'../seed.config'`
3. Run with: `npx playwright test --headed` for debugging

---

**✨ Happy Testing! 🎭**
