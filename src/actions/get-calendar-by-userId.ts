"use server";

import { db } from "@/libs/db";
import { Calendar } from "@/libs/types";
import { Expense } from "@prisma/client";

export const getCalendarByUserId = async (
  userId: string,
  date: string,
): Promise<Expense | null> => {
  try {
    const data = await db.expense.findUnique({
      where: {
        userId,
        date,
      },
    });

    return data || null;
  } catch (error) {
    console.error("DB값을 불러오지 못했습니다.");
  }

  return null;
};
