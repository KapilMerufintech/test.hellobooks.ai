import { test, expect } from '@playwright/test';

/**
 * @test-id API-AUTH-01
 * @priority medium
 * @tags auth, forgot-password, api, negative-test
 * @description Validates the forgot password API returns appropriate error for invalid email
 */

test.describe('Forgot Password API Tests', () => {
  const ENDPOINT = '/api/v1/auth/forgot-password';

  test('POST request with invalid email format should return 400 Bad Request', async ({ request }) => {
    // Step 1: Send POST request to forgot password endpoint with invalid email format
    const response = await request.post(ENDPOINT, {
      data: {
        email: 'invalid-email-format',
      },
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Step 2: Verify response status code is 400 Bad Request
    // Expected Result: Request is rejected with 400 status
    expect(response.status(), 'Response status should be 400 Bad Request').toBe(400);

    // Step 3: Verify error message in response
    // Expected Result: Response contains validation error message
    const responseBody = await response.json();
    
    expect(responseBody, 'Response body should contain an error property').toHaveProperty('error');
    expect(responseBody.message || responseBody.error).toContain('invalid email');
    
    // Additional assertion to ensure the structure matches common API error patterns
    expect(responseBody).toMatchObject({
      status: 'error',
      message: expect.stringContaining('email')
    });
  });
});