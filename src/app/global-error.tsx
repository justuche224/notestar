"use client";

import React from "react";
import { Home, RefreshCcw, Bug } from "lucide-react";
import { Button } from "~/components/ui/button";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="bg-sidebar flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-2xl space-y-8 text-center">
        {/* Animated Error Symbol */}
        <div className="relative">
          <h1 className="animate-pulse text-9xl font-bold text-gray-200">
            500
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Bug className="h-20 w-20 animate-bounce text-orange-500" />
          </div>
        </div>

        {/* Error Message with Glitch Effect */}
        <div className="relative">
          <h2 className="mb-2 text-4xl font-bold text-gray-800 transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-600 hover:bg-clip-text hover:text-transparent">
            Oops! Something Went Wrong
          </h2>
          <p className="mx-auto max-w-md text-gray-600">
            Don&apos;t worry, it&apos;s not you - it&apos;s us! Our team of
            digital mechanics has been notified and is working on fixing this
            issue.
          </p>
        </div>

        {/* Error Details (if available) */}
        {error && (
          <div className="mx-auto max-w-md rounded-lg bg-white/50 p-4 backdrop-blur-sm">
            <p className="font-mono text-sm text-gray-600">
              {error.message || "An unexpected error occurred"}
            </p>
          </div>
        )}

        {/* Interactive Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            variant="outline"
            className="group relative overflow-hidden rounded-lg bg-white px-6 py-3 text-gray-800 shadow-md transition-all duration-300 ease-in-out hover:bg-gray-50"
            onClick={() => reset?.()}
          >
            <span className="relative z-10 flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </span>
          </Button>

          <Button
            className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-white shadow-md transition-all duration-300 ease-in-out hover:from-orange-600 hover:to-red-600"
            onClick={() => (window.location.href = "/")}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Home className="h-4 w-4" />
              Return Home
            </span>
          </Button>
        </div>

        {/* Animated Loading Bars */}
        <div className="mt-12 grid grid-cols-3 gap-4 opacity-50">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-2 animate-pulse rounded-full bg-gradient-to-r from-orange-400 to-red-500"
              style={{
                animationDelay: `${i * 200}ms`,
                opacity: 1 - i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Technical Details (Optional) */}
        <div className="mt-8">
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-gray-500 transition-colors duration-300 hover:text-gray-700"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-gray-400" />
              Refresh Page
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
