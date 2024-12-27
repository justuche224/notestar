"use server";

import { db } from "~/server/db";
import { getUserByEmail } from "~/data/user";
import { getVerificationTokenByToken } from "~/data/verificationToken";
import logger from "~/utils/logger";

export const newVerification = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) return { error: "Invalid token!" };

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) return { error: "Token has expired!" };

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) return { error: "User not found!" };

    await db.$transaction([
      db.user.update({
        where: { id: existingUser.id },
        data: { emailVerified: new Date() },
      }),
      db.verificationToken.delete({
        where: { id: existingToken.id },
      }),
    ]);
    return { success: "Email verified!" };
  } catch (error) {
    logger.error(error);
    return { error: "Something went wrong!" };
  }
};
