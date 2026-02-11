# 🌱 How to Use seed.spec.ts in ALL Test Files

## ✅ Seed File Location
**`D:\Testing Temp\tests\seed.spec.ts`**

This file contains:
- Login credentials
- `seedLogin()` function
- `buildSeedData()` function
- Navigation helpers

---

## 🚀 3 Simple Steps to Use in ANY Test File

### Step 1: Add Import at Top of Your Test File

```typescript
// At the top of your test file:
import { seedLogin, buildSeedData } from '../seed.spec';
```

**Import Path Examples:**
- From `tests/sales/invoices.spec.ts` → `'../seed.spec'`
- From `tests/banking/transactions.spec.ts` → `'../seed.spec'`
- From `tests/onboarding/login.spec.ts` → `'../seed.spec'`
- From `tests/seed.spec.ts` (same folder) → `'./seed.spec'`

### Step 2: Use in Your Test

```typescript
test('My Test @T123', async ({ page }) => {
  test.setTimeout(180000); // 3 minutes
  
  // Login with one line!
  await seedLogin(page);
  
  // Your test steps here
  await page.goto('/?tab=invoices');
});
```

### Step 3: Run Your Test

```bash
npx playwright test your-file.spec.ts
```

---

## 📋 Complete Example

```typescript
import { test, expect } from '@playwright/test';
import { seedLogin, buildSeedData } from '../seed.spec';

test.describe('My Test Suite @suite', () => {
  test('Create Invoice @T001', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes
    
    // 1. Login
    await seedLogin(page);
    
    // 2. Generate unique test data
    const seed = buildSeedData(test.info());
    console.log('Customer:', seed.customerName);
    console.log('Invoice:', seed.invoiceNumber);
    
    // 3. Your test steps
    await page.goto('/?tab=invoices');
    
    // 4. Assertions
    await expect(page.getByRole('heading', { name: /invoices/i })).toBeVisible();
  });
});
```

---

## 📁 Files Already Updated

✅ **`tests/sales/invoices.spec.ts`** - Using seed.spec
✅ **`tests/sales/loginnn.spec.ts`** - Using seed.spec

## 📁 Files That Need Update

Update these files to use seed.spec:

1. **`tests/sales/quotes.spec.ts`**
2. **`tests/banking/transactions.spec.ts`**
3. **`tests/banking-transactions.spec.ts`**
4. **`tests/purchases/bills/deletebillfrombillslist.spec.ts`**
5. **`tests/planner/onboarding.spec.ts`**
6. **`tests/overview/overview.spec.ts`**
7. **`tests/onboarding/login.spec.ts`**

---

## 🔧 How to Update Each File

### Before (Old Way):
```typescript
import { test, expect } from '@playwright/test';

test('My Test', async ({ page }) => {
  await page.goto('https://test.hellobooks.ai/login');
  await page.fill('input[name="email"]', 'fapopi7433@feanzier.com');
  await page.fill('input[name="password"]', 'Kapil08dangar@');
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');
  
  // rest of test...
});
```

### After (New Way):
```typescript
import { test, expect } from '@playwright/test';
import { seedLogin } from '../seed.spec';  // ✅ Add this

test('My Test', async ({ page }) => {
  await seedLogin(page);  // ✅ Replace all login code with this
  
  // rest of test...
});
```

---

## 💡 Available Functions from seed.spec

### 1. **seedLogin(page)**
Login with credentials automatically
```typescript
await seedLogin(page);
```

### 2. **buildSeedData(testInfo)**
Generate unique test data
```typescript
const seed = buildSeedData(test.info());
// Returns: { customerName, customerEmail, invoiceNumber, reference, timestamp }
```

### 3. **seedCredentials**
Access credentials directly
```typescript
import { seedCredentials } from '../seed.spec';
console.log(seedCredentials.email);    // fapopi7433@feanzier.com
console.log(seedCredentials.password); // Kapil08dangar@
```

### 4. **Navigation Helpers**
```typescript
import { navigateToInvoices, navigateToQuotes, navigateToCustomers } from '../seed.spec';

await navigateToInvoices(page);   // Go to invoices page
await navigateToQuotes(page);     // Go to quotes page
await navigateToCustomers(page);  // Go to customers page
```

### 5. **Wait Helpers**
```typescript
import { waitForPageReady, waitForToast } from '../seed.spec';

await waitForPageReady(page);
await waitForToast(page, /success|saved/i);
```

---

## ✨ Benefits

1. ✅ **One Place to Update** - Change credentials in seed.spec only
2. ✅ **Works Everywhere** - Local, Jenkins, Testomat.io
3. ✅ **Less Code** - No duplication
4. ✅ **Easy Maintenance** - Update login logic once
5. ✅ **Consistent** - All tests use same method

---

## 🎯 Quick Copy-Paste Template

Save this template for new test files:

```typescript
import { test, expect } from '@playwright/test';
import { seedLogin, buildSeedData } from '../seed.spec';

test.describe('Test Suite Name @suite-id', () => {
  test('Test Case Name @test-id', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes
    
    // 1. Login
    await seedLogin(page);
    
    // 2. Generate test data
    const seed = buildSeedData(test.info());
    
    // 3. Navigate
    await page.goto('/?tab=invoices');
    
    // 4. Test steps
    // ... your test logic here ...
    
    // 5. Assertions
    await expect(page).toHaveURL(/invoices/);
  });
});
```

---

## 🚨 Important Notes

- Always use relative import: `'../seed.spec'` (from subfolders) or `'./seed.spec'` (same folder)
- Always set timeout: `test.setTimeout(180000);`
- Always call `seedLogin(page)` first before other actions
- The seed file should NEVER be modified unless changing credentials

---

**✨ Ready to use! Copy this pattern to all your test files! 🎭**
