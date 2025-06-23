// Debug helper for API issues
export const debugApiCall = async (url: string, method: string = "GET") => {
  console.log(`🔍 Debugging ${method} request to: ${url}`);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      },
    });

    console.log(`✅ Response status: ${response.status}`);
    console.log(
      `✅ Response headers:`,
      Object.fromEntries(response.headers.entries())
    );

    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Response data:`, data);
      return { success: true, data, status: response.status };
    } else {
      console.log(`❌ Error response:`, response.statusText);
      return {
        success: false,
        error: response.statusText,
        status: response.status,
      };
    }
  } catch (error: unknown) {
    console.error(`❌ Fetch error:`, error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred' };
  }
};

// Test specific endpoints
export const testEndpoints = async (baseUrl: string) => {
  const endpoints = [
    "/api/user/profile",
    "/api/user/all-user",
    "/api/transactions/get-transaction",
    "/api/transactions/all-transaction",
    "/api/support/get-supports",
    "/api/support/get-all-support",
  ];

  console.log("🧪 Testing all endpoints...");

  for (const endpoint of endpoints) {
    console.log(`\n--- Testing ${endpoint} ---`);
    await debugApiCall(`${baseUrl}${endpoint}`);
  }
};
