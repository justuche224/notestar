"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { newVerification } from "~/server/actions/new-verification";
import Link from "next/link";

const NewVerification = ({ token }: { token: string }) => {
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error ?? null);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="bg-black font-[sans-serif]">
      <div className="fle-col flex min-h-screen items-center justify-center px-4 py-6">
        <div className="grid w-full max-w-6xl items-center gap-4 md:grid-cols-2">
          <div className="max-w-md rounded-lg border border-yellow-600/20 bg-zinc-900 p-6 shadow-[0_2px_22px_-4px_rgba(255,200,0,0.2)] max-md:mx-auto">
            <div className="mb-8">
              <div className="flex w-full items-center justify-between">
                <h3 className="text-3xl font-extrabold text-yellow-500">
                  Verifying
                </h3>
                <Link href="/">
                  <Image
                    src="/images/logo-long.png"
                    alt="Logo"
                    width={130}
                    height={50}
                    className="h-auto drop-shadow-lg"
                  />
                </Link>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-400">
                Please wait while we verify your email.
              </p>
            </div>
            <div className="flex w-full items-center justify-center">
              {!success && !error && <BeatLoader color="yellow" />}
              <FormSuccess message={success} />
              <FormError message={error} />
            </div>
          </div>
          <div className="hidden max-md:mt-8 md:block md:h-[300px] lg:h-[400px]">
            <Image
              src="/images/login-image.png"
              alt="Login Image"
              width={500}
              height={500}
              className="mx-auto block h-full w-full object-cover max-md:w-4/5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVerification;
