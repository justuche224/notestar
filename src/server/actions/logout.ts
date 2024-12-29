"use server";

import { redirect } from "next/navigation";
import { signOut } from "../auth/auth";

export const logout = async () => {
  await signOut();
  return redirect("/");
};
