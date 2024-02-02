"use server";

import { db } from "@/libs/db";

export const getMonthlyExpense = async (userId: string) => {
  const nowTime = new Date();
  const currentYear = nowTime.getFullYear();
  const currentMonth = nowTime.getMonth() + 1; // getMonth() returns 0-indexed month

  let months: string[] = [];

  if (currentYear && currentMonth) {
    for (let i = 0; i < 12; i++) {
      let month = currentMonth - i;
      let year = currentYear;
      if (month <= 0) {
        month = 12 + month;
        year -= 1;
      }
      months.push(`${year}${month.toString().padStart(2, "0")}`);
    }
  }

  try {
    const monthlyExpenses = await Promise.all(
      months.map(async (yearMonth) => {
        const getMonthExpense = await db.expense.findMany({
          where: {
            userId,
            date: {
              startsWith: yearMonth,
            },
          },
        });

        const sumExpenses = (getMonthExpense: any) => {
          return getMonthExpense.reduce(
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

        const totalExpenses = sumExpenses(getMonthExpense);

        const getTotalSum = (totalExpenses: any) => {
          return Object.values(totalExpenses).reduce(
            (total: number, value: any) => {
              return total + value;
            },
            0,
          );
        };

        const totalSumExpenses = getTotalSum(totalExpenses);

        return {
          yearMonth,
          expenses: getMonthExpense,
          totalExpenses,
          totalSumExpenses,
        };
      }),
    );

    //console.log("DDDDAAATE", monthlyExpenses);
    return { monthlyExpenses, months };
  } catch (error) {
    console.error("월 별 지출 내역을 불러오는데 실패했습니다.");
  }
};
