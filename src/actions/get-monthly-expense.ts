"use server";

import { db } from "@/libs/db";

export const getMonthlyExpense = async (userId: string) => {
  const nowDate = new Date().getFullYear();
  const currentYear = String(nowDate);

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const yearMonths: string[] = months.map((month) => currentYear + month);

  try {
    const monthlyExpenses = await Promise.all(
      yearMonths.map(async (yearMonth) => {
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

    console.log("DDDDAAATE", monthlyExpenses);
    return monthlyExpenses;
  } catch (error) {
    console.error("월 별 지출 내역을 불러오는데 실패했습니다.");
  }
};
