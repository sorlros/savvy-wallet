"use server";

import { db } from "@/libs/db";

export const deleteMemo = async (userId: string, memoId: string) => {
  try {
    const memoData = await db.memo.findUnique({
      where: {
        userId,
        memoId,
      },
    });

    if (!memoData) {
      throw new Error("해당 메모를 찾을 수 없습니다.");
    }

    await db.memo.delete({
      where: {
        userId,
        memoId,
      },
    });
  } catch (error) {
    console.error("메모 삭제에 실패했습니다.", error);
  }
};
