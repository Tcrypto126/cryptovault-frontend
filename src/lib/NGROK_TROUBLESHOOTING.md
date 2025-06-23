# Ngrok CORS Troubleshooting Guide

## Problem Description

GET requests are failing with 204 No Content responses for OPTIONS preflight requests, while POST/PUT requests work fine.

## Root Causes

1. **CORS Configuration**: ngrok doesn't handle CORS headers properly for GET requests
2. **Browser Security**: Modern browsers block cross-origin requests without proper CORS headers
3. **ngrok Limitations**: ngrok has known issues with certain CORS configurations

## Solutions Implemented

### 1. Updated Axios Configuration

- Added `ngrok-skip-browser-warning: true` header
- Added timeout and better error handling
- Disabled credentials for CORS
- Added response interceptors for better error detection

### 2. Enhanced API Functions

- Added explicit CORS headers to all GET requests
- Added cache control headers
- Improved error handling

### 3. Debug Tools

- Created debug helpers to test endpoints
- Added comprehensive logging

## Additional Solutions to Try

### Backend CORS Configuration

Make sure your backend has proper CORS configuration:

```javascript
// Express.js example
app.use(
  cors({
    origin: ["http://localhost:3000", "https://your-frontend-domain.com"],
    credentials: false,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "ngrok-skip-browser-warning",
      "Cache-Control",
    ],
  })
);
```

### Alternative ngrok Commands

Try different ngrok configurations:

```bash
# Option 1: Use ngrok with CORS headers
ngrok http 3000 --host-header="localhost:3000"

# Option 2: Use ngrok with custom headers
ngrok http 3000 --request-header-add="Access-Control-Allow-Origin: *"

# Option 3: Use ngrok with subdomain (if you have a paid plan)
ngrok http 3000 --subdomain=your-subdomain
```

### Environment Variables

Update your `.env.local`:

```env
NEXT_PUBLIC_SERVER_URL=https://your-ngrok-url.ngrok-free.app
```

### Testing Commands

Use the debug helper in browser console:

```javascript
import { testEndpoints } from "@/lib/debugApi";
testEndpoints("https://your-ngrok-url.ngrok-free.app");
```

## Quick Fixes to Try

### 1. Clear Browser Cache

- Clear browser cache and cookies
- Try in incognito/private mode
- Test in different browsers

### 2. Check ngrok Status

```bash
# Check if ngrok is running properly
curl -I https://your-ngrok-url.ngrok-free.app/api/user/profile
```

### 3. Verify Backend

```bash
# Test backend directly (bypass ngrok)
curl -I http://localhost:3000/api/user/profile
```

### 4. Use Different ngrok Region

```bash
ngrok http 3000 --region=us
# or
ngrok http 3000 --region=eu
```

## Fallback Solutions

### 1. Use a Different Tunnel Service

- **localtunnel**: `npx localtunnel --port 3000`
- **serveo**: `ssh -R 80:localhost:3000 serveo.net`
- **ngrok alternatives**: cloudflared, localhost.run

### 2. CORS Proxy (Development Only)

```javascript
// Use a CORS proxy for development
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const apiUrl = `${proxyUrl}${yourNgrokUrl}/api/endpoint`;
```

### 3. Backend Proxy

Create a simple proxy in your Next.js app:

```javascript
// pages/api/proxy/[...path].js
export default async function handler(req, res) {
  const { path } = req.query;
  const targetUrl = `https://your-ngrok-url.ngrok-free.app/api/${path.join(
    "/"
  )}`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

## Monitoring and Debugging

### Check Network Tab

1. Open browser DevTools
2. Go to Network tab
3. Look for failed requests (red)
4. Check response headers for CORS issues

### Console Logs

Look for these error messages:

- `CORS Error or Network Error`
- `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

### ngrok Logs

Check ngrok console for:

- Request logs
- Error messages
- Connection issues

## Prevention for Future

### 1. Use Environment-Specific Configurations

```javascript
const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEV_SERVER_URL
    : process.env.NEXT_PUBLIC_PROD_SERVER_URL;
```

### 2. Implement Retry Logic

```javascript
const retryRequest = async (fn, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

### 3. Health Check Endpoint

Create a simple health check endpoint to verify connectivity:

```javascript
// Test connectivity
const healthCheck = async () => {
  try {
    const response = await fetch(`${baseURL}/api/health`);
    return response.ok;
  } catch {
    return false;
  }
};
```
