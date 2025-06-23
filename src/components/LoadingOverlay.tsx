"use client";

import React from "react";
import { useLoading } from "@/providers/loadingProvider";

interface LoadingOverlayProps {
  show?: boolean;
  message?: string;
  className?: string;
}

export default function LoadingOverlay({
  show,
  message = "Loading...",
  className = "",
}: LoadingOverlayProps) {
  const { isLoading } = useLoading();
  const shouldShow = show !== undefined ? show : isLoading;

  if (!shouldShow) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-[#060015] bg-opacity-90 z-50 ${className}`}
    >
      <div className="text-center">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-4"
        >
          <style>
            {`
              .dot {
                animation: pulse 1.5s ease-in-out infinite;
              }
              @keyframes pulse {
                0%, 100% {
                  transform: scale(0);
                  opacity: 0;
                }
                50% {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            `}
          </style>
          <circle
            className="dot"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#6c5dd3"
            strokeWidth="4"
            style={{ animationDelay: "0s" }}
          />
          <circle
            className="dot"
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="#7769d3"
            strokeWidth="4"
            style={{ animationDelay: "0.2s" }}
          />
          <circle
            className="dot"
            cx="50"
            cy="50"
            r="15"
            fill="#9387e3"
            style={{ animationDelay: "0.4s" }}
          />
        </svg>
        {message && <p className="text-white text-lg font-medium">{message}</p>}
      </div>
    </div>
  );
}
