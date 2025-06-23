# Loading System Documentation

This project implements a comprehensive loading system that shows loading effects during:

- Page refreshes
- Route changes
- Manual loading states

## Components

### 1. LoadingProvider (`src/providers/loadingProvider.tsx`)

The main provider that manages global loading state during route changes and page refreshes.

**Features:**

- Automatically shows loading during route changes
- Handles page refresh loading
- Provides loading context to child components

### 2. LoadingOverlay (`src/components/LoadingOverlay.tsx`)

A reusable loading overlay component that can be used for specific loading states.

**Usage:**

```tsx
import LoadingOverlay from "@/components/LoadingOverlay";

// Use with global loading state
<LoadingOverlay />

// Use with custom loading state
<LoadingOverlay show={isCustomLoading} message="Processing..." />
```

### 3. Loading Component (`src/app/loading/page.tsx`)

The main loading animation component with pulsing circles.

## Hooks

### useLoading (`src/providers/loadingProvider.tsx`)

Access the global loading state and controls.

```tsx
import { useLoading } from "@/providers/loadingProvider";

const { isLoading, setIsLoading } = useLoading();
```

### useLoadingState (`src/hooks/useLoadingState.ts`)

Local loading state management for components.

```tsx
import { useLoadingState } from "@/hooks/useLoadingState";

const { isLoading, startLoading, stopLoading, withLoading } = useLoadingState();

// Manual control
startLoading();
// ... do something
stopLoading();

// Automatic control with async function
const result = await withLoading(async () => {
  // Your async operation
  return await someApiCall();
});
```

## Next.js App Router Loading Files

The following loading files are automatically used by Next.js during route transitions:

- `src/app/loading.tsx` - Global loading for all routes
- `src/app/dashboard/loading.tsx` - Dashboard-specific loading
- `src/app/admin-dashboard/loading.tsx` - Admin dashboard loading

## How It Works

1. **Route Changes**: The LoadingProvider detects route changes using `usePathname` and `useSearchParams` hooks and automatically shows the loading overlay.

2. **Page Refresh**: Event listeners for `beforeunload` and `load` events handle page refresh loading states.

3. **Manual Control**: Components can use the `useLoading` hook or `LoadingOverlay` component for custom loading states.

4. **Next.js Integration**: Loading files in route directories provide automatic loading during navigation.

## Example Usage

```tsx
"use client";

import { useLoading } from "@/providers/loadingProvider";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useLoadingState } from "@/hooks/useLoadingState";

export default function MyComponent() {
  const { isLoading: globalLoading } = useLoading();
  const { isLoading: localLoading, withLoading } = useLoadingState();

  const handleSubmit = async () => {
    await withLoading(async () => {
      // Your async operation
      await submitForm();
    });
  };

  return (
    <div>
      {/* Your component content */}

      {/* Show loading overlay for local loading state */}
      <LoadingOverlay show={localLoading} message="Submitting form..." />
    </div>
  );
}
```

## Customization

To customize the loading animation, modify the SVG in `src/app/loading/page.tsx` or create a new loading component and update the imports accordingly.
