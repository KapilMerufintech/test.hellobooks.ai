const defaultCredentials = {
  email: 'gowifa1510@gavrom.com',
  password: 'Kapil08dangar@',
};

export async function login(page, credentials = defaultCredentials) {
  await page.goto('https://test.hellobooks.ai/login');

  const emailField = page.locator(
    'input[name="email"], input[type="email"], input[placeholder*="Email" i], input[aria-label*="Email" i]',
  );
  await emailField.first().waitFor({ state: 'visible', timeout: 60000 });
  await emailField.first().fill(credentials.email);

  const passwordField = page.locator(
    'input[name="password"], input[type="password"], input[placeholder*="Password" i], input[aria-label*="Password" i]',
  );
  await passwordField.first().waitFor({ state: 'visible', timeout: 60000 });
  await passwordField.first().fill(credentials.password);

  const submitButton = page.locator(
    'button[type="submit"], button:has-text("Login"), button:has-text("Sign in"), button:has-text("Log in")',
  );
  await submitButton.first().waitFor({ state: 'visible', timeout: 30000 });
  await submitButton.first().click();

  await page.waitForLoadState('networkidle');
}
