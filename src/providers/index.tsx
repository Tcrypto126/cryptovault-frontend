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

import { NextUIProvider } from "@nextui-org/react";

const ThemeClient = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ThemeProvider>
      <NextUIProvider>
        <NotificationProvider>
          <AuthProvider>{children}</AuthProvider>
        </NotificationProvider>
      </NextUIProvider>
    </ThemeProvider>
  );
};

export default ThemeClient;
