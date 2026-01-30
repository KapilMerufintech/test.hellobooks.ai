import { test, expect } from '@playwright/test';

/**
 * @test-id API-AUTH-01
 * @priority high
 * @tags auth, forgot-password, api, positive-test
 * @description Validates the forgot password API endpoint returns correct response for valid email
 */

test.describe('Forgot Password API Tests', () => {
  // Configuration for the API endpoint
  const FORGOT_PASSWORD_ENDPOINT = '/api/v1/auth/forgot-password';
  const TEST_EMAIL = 'testuser@example.com';

  test('should return 200 OK and success message for valid registered email', async ({ request }) => {
    // Step 1: Send POST request to forgot password endpoint with valid registered email
    const response = await request.post(FORGOT_PASSWORD_ENDPOINT, {
      data: {
        email: TEST_EMAIL,
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Step 2: Verify response status code
    // Expected Result: Response status code is 200 OK
    expect(response.status(), 'API should return 200 OK status').toBe(200);

    // Step 3: Verify response body structure
    // Expected Result: Response contains success message
    const responseBody = await response.json();
    
    expect(responseBody, 'Response body should be defined').toBeDefined();
    
    // Asserting specific structure and success message
    expect(responseBody).toMatchObject({
      success: true,
      message: expect.any(String)
    });

    // Verify the content of the success message
    expect(responseBody.message.toLowerCase()).toContain('sent');
    
    // Optional: Verify headers
    expect(response.headers()['content-type']).toContain('application/json');
  });
});