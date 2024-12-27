import type { User } from "next-auth";
import type { NewPasswordSchema } from "~/schemas";
import type z from "zod";

export interface ExtendedSessionUser extends User {
  username: string;
  image: string;
}

export type NewPasswordValues = z.infer<typeof NewPasswordSchema>;
