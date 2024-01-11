"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from 'bcrypt';
import { db } from "@/libs/db";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/router";


export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "유효하지 않은 요청입니다.",
    };
  }

  const { email, name, password} = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await db.user.findUnique({
    where: {
      email,
    }
  })

  if (existingUser) {
    return {
      error: "해당 이메일이 이미 존재합니다."
    }
  }

  await db.user.create({
    data: {
      name,
      email,
      hashedPassword
    }
  })

  const user = await db.user.findUnique({
    where: {
      email
    }
  })

  return {
    success: "계정이 생성되었습니다.",
    user
  };
};
