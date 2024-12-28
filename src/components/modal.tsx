"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardFooter, CardHeader } from "~/components/ui/card";

export const AccountCreatedModal = () => {
  return (
    <section className="fixed left-0 top-0 z-[997] flex min-h-screen w-full flex-col items-center justify-center bg-[#0000007e] backdrop-blur-lg">
      <Card className="w-[370px] shadow-md sm:w-[420px] md:w-[500px]">
        <CardHeader className="flex flex-col items-center justify-center">
          <Link href="/">
            <Image
              src="/images/logo-long.png"
              alt="Logo"
              width={130}
              height={50}
              className="h-auto drop-shadow-lg"
            />
          </Link>
        </CardHeader>
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-semibold">
            Account Successfully Created
          </h2>
          <p className="text-gray-600">
            A verification link has been sent to your email. Please check your
            inbox to activate your account.
          </p>
          <div className="mt-4 border-l-4 border-yellow-500 bg-yellow-100 p-3">
            <p className="text-sm text-yellow-700">
              📧 Can&apos;t find the email? Check your spam folder and mark it
              as &quot;Not Spam&quot; to ensure future emails reach your inbox.
            </p>
          </div>
        </div>
        <CardFooter className="mt-4 flex items-center justify-center text-center font-semibold text-yellow-500 hover:text-yellow-400 hover:underline">
          <Link href="/auth/login">Back to login</Link>
        </CardFooter>
      </Card>
    </section>
  );
};
export const PasswordResetModal = () => {
  return (
    <section className="fixed left-0 top-0 z-[997] flex min-h-screen w-full flex-col items-center justify-center bg-[#0000007e] backdrop-blur-lg">
      <Card className="w-[370px] shadow-md sm:w-[420px] md:w-[500px]">
        <CardHeader className="flex flex-col items-center justify-center">
          <Link href="/">
            <Image
              src="/images/logo-long.png"
              alt="Logo"
              width={130}
              height={50}
              className="h-auto drop-shadow-lg"
            />
          </Link>
        </CardHeader>
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-semibold">Email sent!</h2>
          <p className="text-gray-600">
            A link to reset your password has been sent to your email. Please
            check your inbox to reset your password.
          </p>
          <div className="mt-4 border-l-4 border-yellow-500 bg-yellow-100 p-3">
            <p className="text-sm text-yellow-700">
              📧 Can&apos;t find the email? Check your spam folder and mark it
              as &quot;Not Spam&quot; to ensure future emails reach your inbox.
            </p>
          </div>
        </div>
        <CardFooter className="mt-4 flex items-center justify-center text-center font-semibold text-yellow-500 hover:text-yellow-400 hover:underline">
          <Link href="/auth/login">Back to login</Link>
        </CardFooter>
      </Card>
    </section>
  );
};
export const PasswordResetSuccessfulModal = () => {
  return (
    <section className="fixed left-0 top-0 z-[997] flex min-h-screen w-full flex-col items-center justify-center bg-[#0000007e] backdrop-blur-lg">
      <Card className="w-[370px] shadow-md sm:w-[420px] md:w-[500px]">
        <CardHeader className="flex flex-col items-center justify-center">
          <Link href="/">
            <Image
              src="/images/logo-long.png"
              alt="Logo"
              width={130}
              height={50}
              className="h-auto drop-shadow-lg"
            />
          </Link>
        </CardHeader>
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-semibold">Success!</h2>
          <p className="text-gray-600">
            You&apos;ve Successfuly updated your password! you can return to
            login.
          </p>
        </div>
        <CardFooter className="mt-4 flex items-center justify-center text-center font-semibold text-yellow-500 hover:text-yellow-400 hover:underline">
          <Link href="/auth/login">Back to login</Link>
        </CardFooter>
      </Card>
    </section>
  );
};
