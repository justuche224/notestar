"use client";
import { Rocket, Clock } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";

const ComingSoon = () => {
  //   const [email, setEmail] = useState("");

  return (
    <div className="bg-sidebar flex min-h-screen items-center justify-center p-4">
      <div className="mx-auto max-w-2xl space-y-8 text-center">
        {/* Animated Rocket */}
        <div className="relative">
          <h1 className="animate-pulse text-9xl font-bold text-gray-200">
            SOON
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Rocket className="h-20 w-20 animate-bounce text-purple-500" />
          </div>
        </div>

        {/* Glitch Effect Text */}
        <div className="relative">
          <h2 className="mb-2 text-4xl font-bold text-gray-800 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:text-transparent dark:text-gray-200 dark:hover:bg-gradient-to-r dark:hover:from-purple-400 dark:hover:to-pink-600 dark:hover:bg-clip-text dark:hover:text-transparent">
            Something Awesome is Coming
          </h2>
          <p className="mx-auto max-w-md text-gray-600">
            We&apos;re working hard to bring you an incredible experience. Stay
            tuned and be the first to know when we launch!
          </p>
        </div>

        {/* Email Signup */}
        {/* <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <div className="relative w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 pr-16 rounded-lg border 
                         focus:ring-2 focus:ring-purple-400 
                         focus:border-transparent 
                         transition duration-300"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2 
                         hover:bg-purple-100 rounded-full"
            >
              <ChevronRight className="w-5 h-5 text-purple-600" />
            </Button>
          </div>
        </div> */}

        {/* Countdown Timer */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Clock className="h-6 w-6 text-gray-500" />
          <span className="text-xl font-semibold text-gray-700">
            Launching in: Soon
          </span>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 grid grid-cols-3 gap-4 opacity-50">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-2 animate-pulse rounded-full bg-gradient-to-r from-purple-400 to-pink-500"
              style={{
                animationDelay: `${i * 200}ms`,
                opacity: 1 - i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
