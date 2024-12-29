"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import Link from "next/link";
import type z from "zod";
import { ClipLoader } from "react-spinners";
import { Form } from "~/components/ui/form";
import type { RegisterSchema as RegisterSchemaType } from "~/schemas";
import { RegisterSchema } from "~/schemas";
import { Button } from "~/components/ui/button";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { register } from "~/server/actions/register";
import RegisterFormStep from "./register-form-step";
import { AccountCreatedModal } from "~/components/modal";

type RegisterValues = z.infer<typeof RegisterSchemaType>;

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const [accountCreated, setAccountCreated] = useState(false);
  const [step, setStep] = useState(1);
  const form = useForm<RegisterValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      username: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: RegisterValues) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      await register(values).then((data) => {
        setError(data?.error ?? "");
        setSuccess(data?.success ?? "");
        if (data?.success) setAccountCreated(true);
      });
    });
  };

  const handleNextStep = () => {
    void form.trigger(["firstname", "lastname", "username"]).then((isValid) => {
      if (isValid) setStep(2);
    });
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  return (
    <>
      {accountCreated && <AccountCreatedModal />}
      <div className="bg-black font-[sans-serif]">
        <div className="flex min-h-screen items-center justify-center px-4 py-6">
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
                        Register
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
                      Welcome, Register to create, view and manage your notes.
                    </p>
                  </div>

                  {step === 1 && (
                    <RegisterFormStep
                      form={form}
                      fields={["firstname", "lastname", "username"]}
                      isPending={isPending}
                    />
                  )}

                  {step === 2 && (
                    <RegisterFormStep
                      form={form}
                      fields={["email", "password", "confirmPassword"]}
                      isPending={isPending}
                    />
                  )}

                  <div className="!mt-8">
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    {step === 1 ? (
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        className="mt-8 w-full rounded-lg bg-yellow-500 px-4 py-3 text-sm tracking-wide text-black shadow-xl hover:bg-yellow-400 focus:outline-none"
                      >
                        Next
                      </Button>
                    ) : (
                      <div className="flex justify-between gap-4">
                        <Button
                          type="button"
                          onClick={handlePrevStep}
                          className="mt-8 w-full rounded-lg bg-zinc-700 px-4 py-3 text-sm tracking-wide text-white shadow-xl hover:bg-zinc-600 focus:outline-none"
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          disabled={isPending}
                          className="mt-8 w-full rounded-lg bg-yellow-500 px-4 py-3 text-sm tracking-wide text-black shadow-xl hover:bg-yellow-400 focus:outline-none"
                        >
                          <span className="mr-2">Register</span>{" "}
                          {isPending && <ClipLoader color="blue" size={20} />}
                        </Button>
                      </div>
                    )}
                  </div>

                  <p className="!mt-8 text-center text-sm text-gray-300">
                    Already have an account?{" "}
                    <Link
                      href="/auth/login"
                      className="ml-1 whitespace-nowrap font-semibold text-yellow-500 hover:text-yellow-400 hover:underline"
                    >
                      Login here
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

export default RegisterForm;
