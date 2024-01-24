"use server";

import { db } from "@/libs/db";

export const getMonthExpense = async (date: string, userId: string) => {
  const yearMonth = date.substring(0, 6);

  console.log("asd", yearMonth);

  try {
    const monthlyExpenses = await db.expense.findMany({
      where: {
        userId: userId,
        date: {
          startsWith: yearMonth,
        },
      },
    });

    const sumExpenses = (monthlyExpenses: any) => {
      return monthlyExpenses.reduce(
        (total: any, expense: any) => {
          total.transportation += expense.transportation || 0;
          total.communication += expense.communication || 0;
          total.food += expense.food || 0;
          total.shopping += expense.shopping || 0;
          total.tax += expense.tax || 0;
          total.accommodation += expense.accommodation || 0;
          return total;
        },
        {
          transportation: 0,
          communication: 0,
          food: 0,
          shopping: 0,
          tax: 0,
          accommodation: 0,
        },
      );
    };

    // monthlyExpenses 배열에서 값들을 모두 더함
    const totalExpenses = sumExpenses(monthlyExpenses);

    console.log("Total Expenses:", totalExpenses);
    return monthlyExpenses;
  } catch (error) {
    console.log(error);
  }
};
