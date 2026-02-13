import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : 3,

  //
  // REPORTERS
  //
  reporter: [
    // JSON report (required for custom dashboard parsing)
    ['json', { outputFile: 'playwright-report/results.json' }],

    // HTML report (for manual debugging)
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],

  //
  // GLOBAL TEST SETTINGS
  //
  use: {
    baseURL: 'https://test.hellobooks.ai',

    // Screenshot only when test fails
    screenshot: 'only-on-failure',

    // Keep trace when test fails
    trace: 'retain-on-failure',

    // Optional: Keep video on failure
    video: 'retain-on-failure',
  },

  //
  // BROWSER PROJECTS
  //
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});