"use server";

import { db } from "@/libs/db";
import { getMonthExpense } from "./get-month-expense";

export const getMonthlyExpense = async (date: string, userId: string) => {
  const yearMonth = date.substring(0, 6);

  try {
    const thisMonthExpense = await getMonthExpense(yearMonth, userId);

    if (thisMonthExpense) {
      const { totalExpenses, monthlyExpenses } = thisMonthExpense;

      let monthlyExpense = await db.monthlyExpense.findUnique({
        where: {
          userId,
          yearMonth,
        },
      });

      if (!monthlyExpense) {
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error("이번달 지출내역을 불러오는데 실패했습니다.");
    return null;
  }
};
// let monthlyExpense = await db.monthlyExpense.findUnique({
//   where: {
//     userId,
//     yearMonth,
//   },
// });

// console.log("thisMonthExpense", thisMonthExpense);

// if (thisMonthExpense !== monthlyExpense?.totalExpenses) {
//   await db.monthlyExpense;
// }

// if (!monthlyExpense) {
//   monthlyExpense = await db.monthlyExpense.create({
//     data: {
//       userId,
//       yearMonth,
//       totalTransportation: thisMonthExpense.monthlyExpenses.
//       totalAccommodation: thisMonthExpense.accommodation,
//       totalCommunication: thisMonthExpense.communication,
//       totalFood: thisMonthExpense.food,
//       totalShopping: thisMonthExpense.shopping,
//       totalTax: thisMonthExpense.tax,
//       totalExpenses,
//     },
//   });
//   return null;
