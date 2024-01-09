"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "유효하지 않은 요청입니다.",
    };
  }

  return {
    success: "이메일이 전송되었습니다.",
  };
};
