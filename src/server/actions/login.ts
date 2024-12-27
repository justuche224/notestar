"use server";

import type z from "zod";
import { LoginSchema } from "~/schemas";
import { signIn } from "../auth/auth";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "~/data/user";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "~/utils/tokens";
import { sendVerificationEmail, sendTwoFactorEmail } from "~/utils/mail";
import { getTwoFactorTokenByEmail } from "~/data/two-factor-token";
import { db } from "../db";
import { getTwoFactorConfirmationByUserId } from "~/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser?.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Confirmation email sent!" };
  }
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorCode = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorCode) return { error: "Invalid code!" };
      if (twoFactorCode.token !== code) return { error: "Invalid code!" };
      const hasExpired = new Date(twoFactorCode.expires) < new Date();
      if (hasExpired) return { error: "Code has expired!" };
      await db.twoFactorToken.delete({ where: { id: twoFactorCode.id } });
      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }
      await db.twoFactorConfirmation.create({
        data: { userId: existingUser.id },
      });
    } else {
      const TwoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorEmail(TwoFactorToken.email, TwoFactorToken.token);
      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
