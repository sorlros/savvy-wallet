"use server";

import { db } from "@/libs/db";

export const updateMemo = async (
  userId: string,
  content: string,
  existingMemoId: string,
) => {
  const createdAt = new Date();

  if (!userId || typeof userId !== "string") {
    throw new Error("유효하지않은 ID입니다.");
  }

  let memo;
  try {
    memo = await db.memo.update({
      where: {
        userId,
        memoId: existingMemoId,
      },
      data: {
        content,
        createdAt,
      },
    });
    console.log("메모가 업데이트되었습니다", memo);
  } catch (error) {
    throw new Error("메모를 업데이트하는데 실패했습니다.");
  }
};
