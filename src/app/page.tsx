"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  FileText,
  Table,
  CheckSquare,
  Archive,
  Trash2,
  Smartphone,
  Lock,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NotestarLanding = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (event: MouseEvent) => {
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: event.clientX, y: event.clientY });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black/30 text-white">
      {/* Background Glow Effects */}
      <div className="fixed inset-0 -z-10">
        {/* Primary background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black" />

        {/* Animated glowing orbs with slow and subtle animation */}
        <div
          className="absolute left-1/4 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-yellow-500/5 blur-[150px]"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute right-1/4 top-1/2 h-[600px] w-[600px] animate-pulse rounded-full bg-yellow-400/5 blur-[150px]"
          style={{ animationDuration: "10s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 h-[400px] w-[400px] animate-pulse rounded-full bg-yellow-300/5 blur-[150px]"
          style={{ animationDuration: "12s" }}
        />

        {/* Cursor-following glow */}
        <div
          className="pointer-events-none absolute h-[300px] w-[300px] rounded-full bg-yellow-500/10 blur-[100px]"
          style={{
            transform: `translate3d(${mousePosition.x - 150}px, ${mousePosition.y - 150}px, 0)`,
            willChange: "transform",
          }}
        />

        {/* Subtle gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(255,215,0,0.05),transparent)]" />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50" />
      </div>

      {/* Navigation */}
      <nav className="fixed left-0 top-0 z-50 w-full bg-black/70 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <Link href="/home">
              <Image
                src="/images/logo-long.png"
                width={150}
                height={50}
                alt="Notstar"
                className="w-28"
                priority
              />
            </Link>
          </div>
          <Link href="/auth/login">
            <button className="flex items-center gap-2 rounded-lg bg-yellow-500 px-6 py-2 font-medium text-black transition-all hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20">
              Get Started <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative mx-auto mt-20 min-h-screen max-w-7xl px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight">
              Your thoughts, <span className="text-yellow-500">organized</span>{" "}
              and <span className="text-yellow-500">beautiful</span>
            </h1>
            <p className="mb-8 text-lg text-gray-300">
              A modern rich text editor with built-in database integration,
              table support, and task management capabilities.
            </p>
            <div className="flex gap-4">
              <Link href="/auth/login">
                <button className="rounded-lg bg-yellow-500 px-8 py-3 font-medium text-black transition-all hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20">
                  Try it free
                </button>
              </Link>
              <button className="rounded-lg border border-yellow-500/50 px-8 py-3 font-medium text-yellow-500 transition-all hover:border-yellow-500 hover:bg-yellow-500/10 hover:shadow-lg hover:shadow-yellow-500/10">
                Learn more
              </button>
            </div>
          </div>

          {/* App Preview with Glow */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 blur-lg" />
            <div className="group relative rotate-6 rounded-xl border border-zinc-800/50 bg-zinc-900 p-6 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:rotate-0 hover:scale-105 hover:border-yellow-500/20 hover:shadow-yellow-500/10">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-500/5 to-transparent" />
              <Image
                src={"/images/screenshots/editor-preview.png"}
                alt="App Preview"
                width={500}
                height={500}
                className="relative h-auto w-full rounded-lg transition-transform group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
          Everything you need in one{" "}
          <span className="text-yellow-500">place</span>
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: FileText,
              title: "Rich Text Editing",
              desc: "Advanced formatting options at your fingertips",
            },
            {
              icon: Table,
              title: "Table Support",
              desc: "Create and manage data in structured tables",
            },
            {
              icon: CheckSquare,
              title: "Task Tracking",
              desc: "Stay organized with built-in task management",
            },
            {
              icon: Archive,
              title: "Archive System",
              desc: "Keep your workspace clean and organized",
            },
            {
              icon: Trash2,
              title: "Soft Delete",
              desc: "Safely delete with recovery options",
            },
            {
              icon: Smartphone,
              title: "Responsive Design",
              desc: "Work seamlessly across all devices",
            },
            {
              icon: Lock,
              title: "Authentication",
              desc: "Secure access to your content",
            },
            {
              icon: Mail,
              title: "Email Integration",
              desc: "Share and collaborate effortlessly",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/5"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <feature.icon className="relative mb-4 h-12 w-12 text-yellow-500 transition-transform group-hover:scale-110" />
              <h3 className="relative mb-2 text-xl font-medium">
                {feature.title}
              </h3>
              <p className="relative text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NotestarLanding;
