import { test } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { login } from '../utils/login';

test.setTimeout(120000);

function uniqueNonEmpty(values) {
  const seen = new Set();
  for (const value of values) {
    const asciiOnly = value.replace(/[^\x00-\x7F]/g, '');
    const trimmed = asciiOnly.replace(/\s+/g, ' ').trim();
    if (!trimmed) continue;
    seen.add(trimmed);
  }
  return Array.from(seen);
}

async function firstVisibleLocator(locator) {
  const count = await locator.count();
  for (let i = 0; i < count; i += 1) {
    const candidate = locator.nth(i);
    if (await candidate.isVisible()) return candidate;
  }
  return null;
}

async function collectInputs(page) {
  const inputs = page.locator('input:visible');
  const count = await inputs.count();
  const results = [];
  for (let i = 0; i < count; i += 1) {
    const input = inputs.nth(i);
    const type = (await input.getAttribute('type')) || 'text';
    if (type === 'hidden') continue;
    const name = (await input.getAttribute('name')) || '';
    const placeholder = (await input.getAttribute('placeholder')) || '';
    const ariaLabel = (await input.getAttribute('aria-label')) || '';
    const id = (await input.getAttribute('id')) || '';
    const label = [placeholder, ariaLabel, name, id, type].find((value) => value) || type;
    results.push(label);
  }
  return uniqueNonEmpty(results);
}

async function collectCheckboxes(page) {
  const checkboxes = page.locator('input[type="checkbox"]:visible');
  const count = await checkboxes.count();
  const results = [];
  for (let i = 0; i < count; i += 1) {
    const checkbox = checkboxes.nth(i);
    const id = await checkbox.getAttribute('id');
    if (id) {
      const label = await page.locator(`label[for="${id}"]`).first().innerText().catch(() => '');
      if (label) {
        results.push(label);
        continue;
      }
    }
    const ariaLabel = (await checkbox.getAttribute('aria-label')) || '';
    results.push(ariaLabel || 'checkbox');
  }
  return uniqueNonEmpty(results);
}

async function collectPageSnapshot(page) {
  return {
    url: page.url(),
    headings: uniqueNonEmpty(await page.locator('h1, h2, h3').allInnerTexts()),
    buttons: uniqueNonEmpty(await page.locator('button:visible').allInnerTexts()),
    links: uniqueNonEmpty(await page.locator('a:visible').allInnerTexts()),
    inputs: await collectInputs(page),
    checkboxes: await collectCheckboxes(page),
  };
}

async function followLinkIfPresent(page, locator) {
  const attributes = ['href', 'data-href', 'data-to', 'to'];
  for (const attr of attributes) {
    const value = await locator.getAttribute(attr);
    if (!value) continue;
    if (value === '#' || value === 'javascript:void(0)') continue;
    await page.goto(new URL(value, page.url()).toString());
    await page.waitForLoadState('domcontentloaded');
    return true;
  }
  return false;
}

async function tryNavigateByText(page, patterns) {
  for (const pattern of patterns) {
    const candidate = await firstVisibleLocator(
      page.locator('a, button', { hasText: pattern }),
    );
    if (!candidate) continue;
    if (await followLinkIfPresent(page, candidate)) return true;
    await candidate.click();
    await Promise.race([
      page.waitForLoadState('domcontentloaded'),
      page.waitForTimeout(1500),
    ]);
    return true;
  }
  return false;
}

function detectProviders(buttons, links) {
  const providers = new Set();
  const texts = [...buttons, ...links].join(' ').toLowerCase();
  if (texts.includes('google')) providers.add('Google');
  if (texts.includes('microsoft') || texts.includes('office')) providers.add('Microsoft');
  if (texts.includes('apple')) providers.add('Apple');
  if (texts.includes('github')) providers.add('GitHub');
  if (texts.includes('sso')) providers.add('SSO');
  return Array.from(providers);
}

function formatList(values, fallback) {
  if (!values.length) return `- ${fallback}`;
  return values.map((value) => `- ${value}`).join('\n');
}

function buildPlanMarkdown(data) {
  const lines = [];
  lines.push('# Onboarding - Planner Output');
  lines.push('');
  lines.push('## Metadata');
  lines.push(`- Generated: ${new Date().toISOString()}`);
  lines.push(`- Environment: ${data.baseUrl}`);
  lines.push(`- User: ${data.userEmail}`);
  lines.push('');
  lines.push('## Login Page');
  lines.push(`- URL: ${data.login.url}`);
  lines.push('### Headings');
  lines.push(formatList(data.login.headings, 'No headings detected.'));
  lines.push('');
  lines.push('### Inputs');
  lines.push(formatList(data.login.inputs, 'No inputs detected.'));
  lines.push('');
  lines.push('### Buttons');
  lines.push(formatList(data.login.buttons, 'No buttons detected.'));
  lines.push('');
  lines.push('### Links');
  lines.push(formatList(data.login.links, 'No links detected.'));
  lines.push('');
  lines.push('### Checkboxes');
  lines.push(formatList(data.login.checkboxes, 'No checkboxes detected.'));
  lines.push('');
  lines.push(`- SSO providers detected: ${data.login.ssoProviders.length ? data.login.ssoProviders.join(', ') : 'none'}`);
  lines.push(`- OTP/Magic link option detected: ${data.login.otpAvailable ? 'yes' : 'no'}`);
  lines.push('');
  lines.push('## Sign-up Page');
  if (data.signup) {
    lines.push(`- URL: ${data.signup.url}`);
    lines.push('### Headings');
    lines.push(formatList(data.signup.headings, 'No headings detected.'));
    lines.push('');
    lines.push('### Inputs');
    lines.push(formatList(data.signup.inputs, 'No inputs detected.'));
    lines.push('');
    lines.push('### Buttons');
    lines.push(formatList(data.signup.buttons, 'No buttons detected.'));
    lines.push('');
    lines.push('### Links');
    lines.push(formatList(data.signup.links, 'No links detected.'));
    lines.push('');
    lines.push('### Checkboxes');
    lines.push(formatList(data.signup.checkboxes, 'No checkboxes detected.'));
  } else {
    lines.push('- Sign-up page not detected or not reachable from login page.');
  }
  lines.push('');
  lines.push('## Reset Password Page');
  if (data.reset) {
    lines.push(`- URL: ${data.reset.url}`);
    lines.push('### Headings');
    lines.push(formatList(data.reset.headings, 'No headings detected.'));
    lines.push('');
    lines.push('### Inputs');
    lines.push(formatList(data.reset.inputs, 'No inputs detected.'));
    lines.push('');
    lines.push('### Buttons');
    lines.push(formatList(data.reset.buttons, 'No buttons detected.'));
    lines.push('');
    lines.push('### Links');
    lines.push(formatList(data.reset.links, 'No links detected.'));
  } else {
    lines.push('- Reset password page not detected or not reachable from login page.');
  }
  lines.push('');
  lines.push('## Post-login Landing');
  if (data.postLogin) {
    lines.push(`- URL: ${data.postLogin.url}`);
    lines.push('### Headings');
    lines.push(formatList(data.postLogin.headings, 'No headings detected.'));
  } else {
    lines.push('- Post-login landing not captured (login may have failed).');
  }
  lines.push('');
  lines.push('## Suggested Onboarding Scenarios');
  lines.push('- Login happy path with valid credentials.');
  lines.push('- Login validation for required fields and invalid email formats.');
  lines.push('- Incorrect password and non-existent user handling (generic error).');
  lines.push('- Remember-me and session persistence across reloads.');
  lines.push('- Forgot password flow entry and reset confirmation.');
  lines.push('- Sign-up happy path and validation for required fields.');
  lines.push('- Duplicate email sign-up error handling.');
  lines.push('- Terms/consent checkbox handling.');
  lines.push('- Password policy enforcement and confirm password mismatch.');
  lines.push('- OTP/magic link flow if detected.');
  if (data.login.ssoProviders.length) {
    lines.push(`- SSO login flow for: ${data.login.ssoProviders.join(', ')}.`);
  }
  lines.push('');
  lines.push('## Notes');
  lines.push('- Validate UI copy, error placement, and accessibility states.');
  lines.push('- Verify redirects between login, sign-up, and reset password.');

  return lines.join('\n');
}

test.describe('@onboarding Onboarding Planner @sc43a54bb', () => {
  test('planner onboarding @tfd934bc8', async ({ page }) => {
    const baseUrl = 'https://test.hellobooks.ai';
    const planData = {
      baseUrl,
      userEmail: 'fikoy39188@emaxasp.com',
      login: null,
      signup: null,
      reset: null,
      postLogin: null,
    };

    await page.goto(`${baseUrl}/login`);
    await page.waitForLoadState('domcontentloaded');

    const loginSnapshot = await collectPageSnapshot(page);
    const loginText = [...loginSnapshot.buttons, ...loginSnapshot.links].join(' ').toLowerCase();
    loginSnapshot.ssoProviders = detectProviders(loginSnapshot.buttons, loginSnapshot.links);
    loginSnapshot.otpAvailable = /otp|one[-\s]?time|magic link|email me a link/.test(loginText);
    planData.login = loginSnapshot;

    const signupNavigated = await tryNavigateByText(page, [
      /sign up/i,
      /create account/i,
      /register/i,
      /get started/i,
    ]);
    if (signupNavigated) {
      planData.signup = await collectPageSnapshot(page);
      await page.goto(`${baseUrl}/login`);
      await page.waitForLoadState('domcontentloaded');
    }

    const resetNavigated = await tryNavigateByText(page, [
      /forgot password/i,
      /reset password/i,
    ]);
    if (resetNavigated) {
      planData.reset = await collectPageSnapshot(page);
      await page.goto(`${baseUrl}/login`);
      await page.waitForLoadState('domcontentloaded');
    }

    await login(page);
    planData.postLogin = await collectPageSnapshot(page);

    const plan = buildPlanMarkdown(planData);
    const outputPath = path.join(process.cwd(), 'specs', 'onboarding-plan.md');
    await fs.writeFile(outputPath, plan, 'utf8');
  });
});
