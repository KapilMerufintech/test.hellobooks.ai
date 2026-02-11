import { test, expect } from '@playwright/test';
import type { TestInfo } from '@playwright/test';

test.setTimeout(5 * 60 * 1000);
const ACTION_TIMEOUT = 3 * 60 * 1000;
const EXPECT_TIMEOUT = 3 * 60 * 1000;

async function navigateToWorkspaceFromSidebar(page, testInfo: TestInfo) {
  try {
    const workspaceNav = page.getByTestId('sidebar-workspace');
    await workspaceNav.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await workspaceNav.click();
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: testInfo.outputPath('workspace-navigation.png'), fullPage: true });
  } catch (error) {
    await page.screenshot({ path: testInfo.outputPath('workspace-navigation-error.png'), fullPage: true });
    throw error;
  }
}

async function openBankingDashboard(page, testInfo: TestInfo) {
  try {
    const bankingNav = page.getByTestId('nav-banking');
    await bankingNav.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await bankingNav.click();
    await page.waitForLoadState('networkidle');
    await page.waitForURL(/\/banking/, { timeout: ACTION_TIMEOUT });
    await page.screenshot({ path: testInfo.outputPath('banking-dashboard-navigation.png'), fullPage: true });
  } catch (error) {
    await page.screenshot({ path: testInfo.outputPath('banking-dashboard-navigation-error.png'), fullPage: true });
    throw error;
  }
}

test.describe('Your Workspace @Svqx35fwv', () => {
  test('@Ty0o6ug1t @dashboard BANKING-001: Verify Banking Dashboard loads with correct transaction summary', async ({ page }, testInfo) => {
    await page.goto('/banking');
    await page.waitForLoadState('networkidle');

    await navigateToWorkspaceFromSidebar(page, testInfo);
    await openBankingDashboard(page, testInfo);

    await expect(page).toHaveURL(/\/banking/, { timeout: EXPECT_TIMEOUT });

    const loadingSpinner = page.getByTestId('loading-spinner');
    await loadingSpinner.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await loadingSpinner.waitFor({ state: 'hidden', timeout: ACTION_TIMEOUT });

    const transactionSummary = page.getByTestId('transaction-summary');
    await transactionSummary.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(transactionSummary).toBeVisible({ timeout: EXPECT_TIMEOUT });

    const pendingCount = page.getByTestId('pending-transactions-count');
    await pendingCount.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(pendingCount).toHaveText(/\d+/, { timeout: EXPECT_TIMEOUT });

    const reconciliationStatus = page.getByTestId('reconciliation-status');
    await reconciliationStatus.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(reconciliationStatus).toBeVisible({ timeout: EXPECT_TIMEOUT });

    const matchedCount = page.getByTestId('matched-transactions-count');
    await matchedCount.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(matchedCount).toHaveText(/\d+/, { timeout: EXPECT_TIMEOUT });

    const unmatchedCount = page.getByTestId('unmatched-transactions-count');
    await unmatchedCount.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(unmatchedCount).toHaveText(/\d+/, { timeout: EXPECT_TIMEOUT });

    const accountBalanceTotal = page.getByTestId('account-balance-total');
    await accountBalanceTotal.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(accountBalanceTotal).toHaveText(/\d+/, { timeout: EXPECT_TIMEOUT });

    await page.screenshot({ path: testInfo.outputPath('banking-dashboard-validated.png'), fullPage: true });
  });
});