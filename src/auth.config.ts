import type { NextAuthConfig } from "next-auth";
import Credential from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/actions/get-user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credential({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.hashedPassword) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.hashedPassword,
          );

          if (passwordsMatch) {
            return {
              ...user,
              id: user.id,
            };
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
