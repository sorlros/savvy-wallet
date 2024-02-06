"use server";

import { db } from "@/libs/db";

export const getMemos = async (userId: string) => {
  const memoData = await db.memo.findMany({
    where: {
      userId,
    },
  });

  if (!memoData) {
    return null;
  }
};
