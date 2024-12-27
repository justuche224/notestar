"use server";

import { db } from "../db";
import bcrypt from "bcryptjs";
import type z from "zod";
import type { RegisterSchema as RegisterSchemaType } from "~/schemas";
import { RegisterSchema } from "~/schemas";
import { getUserByEmail, getUserByUsername } from "~/data/user";
import { generateVerificationToken } from "~/utils/tokens";
import { sendVerificationEmail } from "~/utils/mail";

type RegisterValues = z.infer<typeof RegisterSchemaType>;

export const register = async (values: RegisterValues) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, firstname, lastname, username, confirmPassword } =
    validatedFields.data;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const existingUsername = await getUserByUsername(username);

  if (existingUsername) {
    return { error: "Username already in use!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      firstname: firstname.charAt(0).toUpperCase() + firstname.slice(1),
      lastname: lastname.charAt(0).toUpperCase() + lastname.slice(1),
      username: username.toLowerCase().trim(),
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);
  return { success: "Confirmation email sent!" };
};
