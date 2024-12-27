"use server";
import bcrypt from "bcryptjs";
import { getPasswordResetTokenByToken } from "~/data/passwordResetToken";
import { getUserByEmail } from "~/data/user";
import { sendPasswordResetEmail } from "~/utils/mail";
import { generatePasswordResetToken } from "~/utils/tokens";
import { NewPasswordSchema } from "~/schemas";
import { db } from "~/server/db";
import type { NewPasswordValues } from "~/types";
import logger from "~/utils/logger";

export const resetPassword = async ({ email }: { email: string }) => {
  try {
    if (!email) {
      return { error: "Email is required!" };
    }

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { error: "Email not found!" };
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token,
    );

    return { success: "Reset email sent!" };
  } catch (error) {
    logger.error(error);
    return { error: "Something went wrong!" };
  }
};

export const newPassword = async (
  values: NewPasswordValues,
  token: string | null,
) => {
  try {
    if (!token) {
      return { error: "Missing token!" };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { password, confirmPassword } = validatedFields.data;

    if (password !== confirmPassword) {
      return { error: "Passwords do not match!" };
    }

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
      return { error: "Invalid token!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { error: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { error: "Email does not exist!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.$transaction([
      db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
      }),
      db.passwordResetToken.delete({ where: { id: existingToken.id } }),
    ]);

    return { success: "Password updated" };
  } catch (error) {
    logger.error(error);
    return { error: "Something went wrong!" };
  }
};
