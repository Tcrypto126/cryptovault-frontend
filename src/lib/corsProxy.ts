// CORS Proxy Helper for ngrok issues
export const createCorsProxyUrl = (url: string): string => {
  // If using ngrok, you can use a CORS proxy
  // Option 1: Use a public CORS proxy (for development only)
  // return `https://cors-anywhere.herokuapp.com/${url}`;

  // Option 2: Use your own proxy or keep original URL
  return url;
};

// Alternative: Use a different approach for GET requests
export const fetchWithCorsProxy = async (
  url: string,
  options: RequestInit = {}
) => {
  try {
    // First try direct request
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (response.ok) {
      return response;
    }

    // If direct request fails, try with CORS proxy
    const proxyUrl = createCorsProxyUrl(url);
    if (proxyUrl !== url) {
      return await fetch(proxyUrl, options);
    }

    throw new Error(`HTTP error! status: ${response.status}`);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
