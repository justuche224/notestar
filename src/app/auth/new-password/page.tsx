import React from "react";
import NewPasswordForm from "../_components/new-password-form";
import { redirect } from "next/navigation";

type searchParams = Promise<{ token: string }>;

const page = async ({ searchParams }: { searchParams: searchParams }) => {
  const { token } = await searchParams;
  if (!token) return redirect("/");
  return <NewPasswordForm token={token} />;
};

export default page;
