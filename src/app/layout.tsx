import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { auth } from "~/server/auth/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "~/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Notestar",
  description:
    "A modern rich text editor with built-in database integration ,table support, and task management capabilities.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <html lang="en" className={`${GeistSans.variable} dark`}>
      <body>
        <NextTopLoader color="yellow" zIndex={9999} />
        <SessionProvider session={session}>
          <main>{children}</main>
        </SessionProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
