// import { InputType, ReturnType } from "./types";
// import { db } from "@/libs/db";
// import { revalidatePath } from "next/cache";
// import { createSafeAction } from "@/libs/create-safe-action";
// import { CreateDayExpense } from "./schema";
// import { getSession, useSession } from "next-auth/react";

// const handler = async (data: InputType): Promise<ReturnType> => {
//   const session = await getSession();
//   console.log(session, "session");

//   if (!session) {
//     return {
//       error: "유저정보가 일치하지 않습니다.",
//     };
//   }

//   const {
//     id,
//     date,
//     transportation,
//     communication,
//     food,
//     shopping,
//     tax,
//     accommodation,
//   } = data;

//   let calendar;

//   try {
//     calendar = await db.calendar.create({
//       data: {
//         id,
//         date,
//         expenses: {
//           create: {
//             transportation,
//             communication,
//             food,
//             shopping,
//             tax,
//             accommodation,
//           },
//         },
//         user: {
//           create: {
//             id,
//           },
//         },
//       },
//     });
//   } catch (error) {
//     return {
//       error: "지출비용 추가에 실패했습니다.",
//     };
//   }

//   revalidatePath(`/mybook/${id}`);
//   return { data: calendar };
// };

// export const createCalendar = createSafeAction(CreateDayExpense, handler);
