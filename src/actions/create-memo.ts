"use server";

import { db } from "@/libs/db";

export const createMemo = async (userId: string, content: string) => {
  if (!userId) {
    return;
  }

  try {
    const data = await db.memo.findMany({
      where: {
        userId,
        createdAt,
      },
    });

    let memo;

    if (!data) {
      memo = await db.memo.create({
        data: {
          userId,
          content,
          createdAt: new Date(),
        },
      });
    } else if (data) {
      memo = await db.memo.update({
        where: {
          userId: data.userId,
          createdAt,
        },
        data: {
          content,
          createdAt: new Date(),
        },
      });
    }
  } catch (error) {
    console.error("메모를 불러오는데 실패했습니다.");
  }
};
