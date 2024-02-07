"use server";

import { db } from "@/libs/db";

export const createMemo = async (
  userId: string,
  content: string,
  memoId: string,
) => {
  if (!userId || typeof userId !== "string") {
    throw new Error("유효하지 않은 ID 값입니다.");
  }

  let memo;

  try {
    memo = await db.memo.create({
      data: {
        userId,
        content,
        memoId,
        createdAt: new Date(),
      },
    });
    console.log("메모가 생성되었습니다", memo)
  } catch (error) {
    console.error("메모를 저장하는데 실패했습니다.");
  }
};
