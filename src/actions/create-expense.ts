"use server";

import { ExpenseSchema } from "@/schemas";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/libs/db";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

export const createExpense = async (values: z.infer<typeof ExpenseSchema>) => {
  const validatedFields = ExpenseSchema.safeParse(values);

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

  let expense;

  expense = await db.expense.findUnique({
    where: {
      date: validatedFields.data.date,
    },
  });

  console.log("expense", expense);

  if (!expense) {
    try {
      expense = await db.expense.create({
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
      return { error: "Expense 생성 오류" };
    } finally {
      console.log("Expense 생성 완료");
    }
  } else {
    try {
      expense = await db.expense.updateMany({
        where: {
          date,
        },
        data: {
          transportation,
          communication,
          food,
          shopping,
          tax,
          accommodation,
        },
      });
    } catch (error) {
      return {
        error: "Expense 업데이트 오류",
      };
    } finally {
      console.log("Expense 업데이트 완료");
    }
  }
};
