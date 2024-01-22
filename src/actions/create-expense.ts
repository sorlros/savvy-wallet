"use server";

import { db } from "@/libs/db";

export const createExpense = async (formData: {
  id?: string;
  userId: string;
  date: string;
  transportation: number;
  communication: number;
  food: number;
  shopping: number;
  tax: number;
  accommodation: number;
}) => {
  if (!formData) return;

  try {
    const {
      id,
      userId,
      date,
      transportation,
      communication,
      food,
      shopping,
      tax,
      accommodation,
    } = formData;

    let expense = await db.expense.findUnique({
      where: { date },
    });

    if (!expense) {
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
    } else {
      expense = await db.expense.update({
        where: { date },
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
    }

    console.log("expense", expense);
    return expense;
  } catch (error) {
    return;
  }
};
