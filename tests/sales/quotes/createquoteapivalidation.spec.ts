import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Create quote API validation
 * Test ID: TEST-1769770062874
 */

test.describe('Quote API Validation Suite', () => {
  const API_ENDPOINT = '/api/v1/quotes';
  const VALID_CUSTOMER_ID = 'CUST-12345';
  const INVALID_CUSTOMER_ID = 'NON-EXISTENT-999';

  // Precondition: API authentication token is typically handled in playwright.config.ts 
  // or via a global setup. Here we assume the request context is pre-configured.

  test('Create quote API validation TEST-1769770062874', async ({ request }) => {
    
    // Step 1 & 2: Send POST request to create quote endpoint with valid data and verify
    const validPayload = {
      customerId: VALID_CUSTOMER_ID,
      items: [
        { sku: 'PROD-001', quantity: 2, price: 150.00 },
        { sku: 'PROD-002', quantity: 1, price: 50.00 }
      ],
      currency: 'USD',
      expiryDate: '2025-12-31'
    };

    const createResponse = await request.post(API_ENDPOINT, {
      data: validPayload
    });

    // Expected Result: 201 Created response with quote object and ID
    expect(createResponse.status()).toBe(201);
    const responseBody = await createResponse.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.id).not.toBeNull();
    expect(responseBody.customerId).toBe(VALID_CUSTOMER_ID);
    console.log(`Successfully created quote with ID: ${responseBody.id}`);

    // Step 3 & 4: Send POST request with missing required fields and verify error
    const invalidPayloadMissingFields = {
      currency: 'USD'
      // Missing customerId and items
    };

    const missingFieldsResponse = await request.post(API_ENDPOINT, {
      data: invalidPayloadMissingFields
    });

    // Expected Result: 400 Bad Request with field validation errors
    expect(missingFieldsResponse.status()).toBe(400);
    const errorBody = await missingFieldsResponse.json();
    expect(errorBody.errors).toBeDefined();
    
    // Verify clear error messages for missing fields
    const errorString = JSON.stringify(errorBody.errors);
    expect(errorString).toContain('customerId');
    expect(errorString).toContain('items');

    // Step 5: Send POST request with invalid customer ID
    const invalidCustomerPayload = {
      ...validPayload,
      customerId: INVALID_CUSTOMER_ID
    };

    const invalidCustomerResponse = await request.post(API_ENDPOINT, {
      data: invalidCustomerPayload
    });

    // Expected Result: 404 or 400 error for invalid customer
    // Depending on API design, both can be valid; we check for non-success
    const status = invalidCustomerResponse.status();
    expect([400, 404]).toContain(status);
    
    if (status === 404) {
        const customerError = await invalidCustomerResponse.json();
        expect(customerError.message).toContain('not found');
    }
  });
});