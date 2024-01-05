import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/libs/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/libs/create-safe-action";
import { CreateDayExpense } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "유저정보가 일치하지 않습니다.",
    };
  }

  const {
    id,
    date,
    transportation,
    communication,
    food,
    shopping,
    tax,
    accommodation,
  } = data;

  let calendar;

  try {
    calendar = await db.calendar.create({
      data: {
        id,
        userId,
        date,
        expense: {
          create: {
            transportation,
            communication,
            food,
            shopping,
            tax,
            accommodation,
          },
        },
      },
    });
  } catch (error) {
    return {
      error: "지출비용 추가에 실패했습니다.",
    };
  }

  revalidatePath(`/mybook/${userId}`);
  return { data: calendar };
};

export const createCalendar = createSafeAction(CreateDayExpense, handler);
