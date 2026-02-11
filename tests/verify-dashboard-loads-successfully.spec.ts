import { test, expect } from '@playwright/test';

//
// GLOBAL CONFIGURATION
//
test.setTimeout(5 * 60 * 1000); // 5 minutes per test

const ACTION_TIMEOUT = 3 * 60 * 1000;
const EXPECT_TIMEOUT = 3 * 60 * 1000;

//
// TEST SUITE
//
test.describe('Reports @Slpu7cp5i', () => {

  test('@Tzf570o4f @dashboard MODULE-001: Verify Dashboard Loads Successfully', async ({ page }) => {

    const startTime = Date.now();

    //
    // STEP 1: Navigate to the dashboard URL
    //
    await page.goto('/dashboard', { timeout: ACTION_TIMEOUT });

    //
    // STEP 2: Wait for the page to fully load
    //
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000);

    //
    // STEP 3: Observe the dashboard components and layout
    //
    const dashboardHeader = page.getByTestId('dashboard-header');
    await dashboardHeader.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(dashboardHeader).toBeVisible({ timeout: EXPECT_TIMEOUT });

    const summaryWidget = page.getByTestId('dashboard-widget-summary');
    await summaryWidget.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(summaryWidget).toBeVisible({ timeout: EXPECT_TIMEOUT });

    const chartWidget = page.getByTestId('dashboard-widget-chart');
    await chartWidget.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(chartWidget).toBeVisible({ timeout: EXPECT_TIMEOUT });

    const tableWidget = page.getByTestId('dashboard-widget-table');
    await tableWidget.waitFor({ state: 'visible', timeout: ACTION_TIMEOUT });
    await expect(tableWidget).toBeVisible({ timeout: EXPECT_TIMEOUT });

  });

});