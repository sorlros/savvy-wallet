"use server";

import { db } from "@/libs/db";

export const getMemos = async (userId: string) => {
  try {
    const memoData = await db.memo.findMany({
      where: {
        userId,
      },
    });
    console.log("server", memoData);
    return memoData;
  } catch (error) {
    return console.error("기존에 존재하는 메모가 없습니다.");
  }
};
