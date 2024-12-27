"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type z from "zod";
import { ClipLoader } from "react-spinners";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import type { ResetSchema as ResetSchemaType } from "~/schemas";
import { ResetSchema } from "~/schemas";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { resetPassword } from "~/server/actions/password";
import { PasswordResetModal } from "~/components/modal";

type ResetValues = z.infer<typeof ResetSchemaType>;

const PasswordResetForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAcountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resetLinkSent, setResetLinkSent] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<ResetValues>({
    resolver: zodResolver(ResetSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: ResetValues) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      await resetPassword(values).then((data) => {
        setError(data?.error ?? "");
        setSuccess(data?.success ?? "");
        if (data?.success) setResetLinkSent(true);
      });
    });
  };

  return (
    <>
      {resetLinkSent && <PasswordResetModal />}
      <div className="bg-black font-[sans-serif]">
        <div className="fle-col flex min-h-screen items-center justify-center px-4 py-6">
          <div className="grid w-full max-w-6xl items-center gap-4 md:grid-cols-2">
            <div className="max-w-md rounded-lg border border-yellow-600/20 bg-zinc-900 p-6 shadow-[0_2px_22px_-4px_rgba(255,200,0,0.2)] max-md:mx-auto">
              <Form {...form}>
                <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="mb-8">
                    <div className="flex w-full items-center justify-between">
                      <h3 className="text-3xl font-extrabold text-yellow-500">
                        Reset Password
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
                      Eneter the email associated with your account to reset
                      your password.
                    </p>
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mb-2 block text-sm text-gray-300">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="john.doe@example.com"
                              type="email"
                              disabled={isPending}
                              className="w-full rounded-lg border border-yellow-600/20 bg-zinc-800 px-4 py-4 text-sm text-gray-200 outline-yellow-500 placeholder:text-gray-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="!mt-8">
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="mt-8 w-full rounded-lg bg-yellow-500 px-4 py-3 text-sm tracking-wide text-black shadow-xl hover:bg-yellow-400 focus:outline-none"
                    >
                      <span className="mr-2">Reset Password</span>{" "}
                      {isPending && <ClipLoader color="blue" size={20} />}
                    </Button>
                  </div>

                  <p className="!mt-8 text-center text-sm text-gray-300">
                    <Link
                      href="/auth/login"
                      className="ml-1 whitespace-nowrap font-semibold text-yellow-500 hover:text-yellow-400 hover:underline"
                    >
                      Back to login
                    </Link>
                  </p>
                </form>
              </Form>
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
    </>
  );
};

export default PasswordResetForm;
