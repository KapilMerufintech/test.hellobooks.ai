import { test } from '@playwright/test';
import { login } from './utils/login';

test.setTimeout(120000);

test('seed', async ({ page }) => {
  await login(page);
});
 
