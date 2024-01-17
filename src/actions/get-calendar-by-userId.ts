"use server";

import { db } from "@/libs/db";
import { Calendar, Expense } from "@/libs/types";

export const getCalendarByUserId = async (
  userId: string,
  date: string,
): Promise<Expense | null> => {
  let data;

  data = await db.expense.findUnique({
    where: {
      userId,
      date,
    },
  });

  if (data && data !== null) {
    return data;
  }

  return data;
};
