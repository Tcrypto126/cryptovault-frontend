"use client";

import React from "react";
import dynamic from "next/dynamic";

const ThemeProvider = dynamic(() => import("@/providers/themeProvider"), {
  ssr: false,
});
const NotificationProvider = dynamic(
  () => import("@/providers/notificationProvider"),
  { ssr: false }
);
const AuthProvider = dynamic(() => import("@/providers/authProvider"), {
  ssr: false,
});
const LoadingProvider = dynamic(() => import("@/providers/loadingProvider"), {
  ssr: false,
});

const ThemeClient = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <LoadingProvider>{children}</LoadingProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default ThemeClient;
