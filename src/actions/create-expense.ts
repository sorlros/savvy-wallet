"use server";

import { ExpenseSchema } from "@/schemas";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/libs/db";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

export const createExpense = async (values: z.infer<typeof ExpenseSchema>) => {
  const validatedFields = ExpenseSchema.safeParse(values);
  const { auth } = NextAuth(authConfig);

  if (!validatedFields.success) {
    return { error: "유효하지 않은 요청입니다." };
  }

  const {
    userId,
    date,
    transportation,
    communication,
    food,
    shopping,
    tax,
    accommodation,
  } = validatedFields.data;

  let calendar;

  try {
    calendar = await db.expense.create({
      data: {
        userId,
        date,
        transportation,
        communication,
        food,
        shopping,
        tax,
        accommodation,
      },
    });
  } catch (error) {
    return { error: "오류발생" };
  }
};
