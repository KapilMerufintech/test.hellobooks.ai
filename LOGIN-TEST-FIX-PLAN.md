# 🔧 Login Test Cases Fix Plan

## 📋 Issue:
Sign In button is **DISABLED** until both email AND password fields have data entered.

## 🎯 Tests That Need Fixing:

### **HB-LOGIN-004** (Line 73-77) ❌
**Current:** Tries to click submit with empty email and password
**Issue:** Submit button is disabled, click will fail
**Fix:** Verify button is disabled instead of trying to click

### **HB-LOGIN-005** (Line 79-84) ❌
**Current:** Tries to submit with empty email, password filled
**Issue:** Submit button is disabled, click will fail
**Fix:** Verify button is disabled instead of trying to click

### **HB-LOGIN-006** (Line 86-91) ❌
**Current:** Tries to submit with email filled, empty password
**Issue:** Submit button is disabled, click will fail
**Fix:** Verify button is disabled instead of trying to click

### **HB-LOGIN-012** (Line 128-141) ⚠️
**Current:** Fills password only (no email) for visibility toggle test
**Issue:** Button might be disabled (though test doesn't click it)
**Fix:** Fill email field as well to ensure button is enabled (best practice)

### **HB-LOGIN-013** (Line 143-150) ✅
**Status:** OK - fills both email and password before pressing Enter

### **HB-LOGIN-024** (Line 213-218) ✅
**Status:** OK - only tests tab order, doesn't interact with submit button

---

## 🛠️ Proposed Changes:

### **Change 1: Update Helper Function**
Add new helper to check if submit button is disabled:

```typescript
async function expectSubmitDisabled(page: Page) {
  const { submit } = getLoginLocators(page);
  await expect(submit).toBeDisabled();
}

async function expectSubmitEnabled(page: Page) {
  const { submit } = getLoginLocators(page);
  await expect(submit).toBeEnabled();
}
```

### **Change 2: Fix HB-LOGIN-004**
```typescript
// BEFORE:
test('HB-LOGIN-004: Required validation on empty email and password', async ({ page }) => {
  await openLogin(page);
  await submitLogin(page); // ❌ Will fail - button is disabled
  await expectLoginFailed(page);
});

// AFTER:
test('HB-LOGIN-004: Required validation on empty email and password', async ({ page }) => {
  await openLogin(page);
  await expectSubmitDisabled(page); // ✅ Verify button is disabled
  await expectLoginFailed(page); // ✅ Still on login page
});
```

### **Change 3: Fix HB-LOGIN-005**
```typescript
// BEFORE:
test('HB-LOGIN-005: Required validation on empty email only', async ({ page }) => {
  await openLogin(page);
  await fillLogin(page, '', 'AnyPassword123!');
  await submitLogin(page); // ❌ Will fail - button is disabled
  await expectLoginFailed(page);
});

// AFTER:
test('HB-LOGIN-005: Required validation on empty email only', async ({ page }) => {
  await openLogin(page);
  const { password } = getLoginLocators(page);
  await password.fill('AnyPassword123!'); // Fill only password
  await expectSubmitDisabled(page); // ✅ Verify button is disabled
  await expectLoginFailed(page); // ✅ Still on login page
});
```

### **Change 4: Fix HB-LOGIN-006**
```typescript
// BEFORE:
test('HB-LOGIN-006: Required validation on empty password only', async ({ page }) => {
  await openLogin(page);
  await fillLogin(page, 'fapopi7433@feanzier.com', '');
  await submitLogin(page); // ❌ Will fail - button is disabled
  await expectLoginFailed(page);
});

// AFTER:
test('HB-LOGIN-006: Required validation on empty password only', async ({ page }) => {
  await openLogin(page);
  const { email } = getLoginLocators(page);
  await email.fill('fapopi7433@feanzier.com'); // Fill only email
  await expectSubmitDisabled(page); // ✅ Verify button is disabled
  await expectLoginFailed(page); // ✅ Still on login page
});
```

### **Change 5: Fix HB-LOGIN-012**
```typescript
// BEFORE:
test('HB-LOGIN-012: Password visibility toggle shows and hides password', async ({ page }) => {
  await openLogin(page);
  const { password } = getLoginLocators(page);
  await password.fill('AnyPassword123!'); // Only password filled
  // ... rest of test
});

// AFTER:
test('HB-LOGIN-012: Password visibility toggle shows and hides password', async ({ page }) => {
  await openLogin(page);
  const { email, password } = getLoginLocators(page);
  await email.fill('test@example.com'); // ✅ Fill email too
  await password.fill('AnyPassword123!');
  // ... rest of test
});
```

---

## 📊 Summary:

| Test Case | Current Status | Action Required |
|-----------|---------------|-----------------|
| HB-LOGIN-004 | ❌ Broken | Fix: Check button disabled |
| HB-LOGIN-005 | ❌ Broken | Fix: Check button disabled |
| HB-LOGIN-006 | ❌ Broken | Fix: Check button disabled |
| HB-LOGIN-012 | ⚠️ Needs improvement | Fix: Fill email field |
| HB-LOGIN-013 | ✅ OK | No change needed |
| HB-LOGIN-024 | ✅ OK | No change needed |

---

**Total Changes:** 4 test cases + 2 new helper functions

**Approve this plan to proceed with fixes!** ✅
