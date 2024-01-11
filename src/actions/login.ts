"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "./get-user";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "유효하지 않은 요청입니다." };
  }

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);

  const id = user?.id;

  // TODO: NextAuth 문헌 참조 => signIn을 통해 반환되는 객체중에 id가 포함되는지 찾을것

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: `/mybook/${user?.id}`,
    });
  } catch (error) {}
};
