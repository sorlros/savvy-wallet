import useCalendarWithExpenseStore from "@/hooks/use-calendar-with-expense-store";
import { Expense } from "@prisma/client";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

const CircleGraph = () => {
  const { data: expenseData, setData } = useCalendarWithExpenseStore();
  const [user, setUser] = useState<Expense | undefined>(undefined);

  const chartData = {
    labels: ["통신비", "주거비용", "세금", "식비", "교통비", "쇼핑비"],
    datasets: [
      {
        data: [
          expenseData.communication,
          expenseData.accommodation,
          expenseData.tax,
          expenseData.food,
          expenseData.transportation,
          expenseData.shopping,
        ],
        backgroundColor: ["red", "blue", "green", "yellow", "pink", "emerald"],
      },
    ],
  };
  return (
    <div className="flex w-full h-full justify-center items-center">
      <Doughnut data={chartData} />
    </div>
  );
};

export default CircleGraph;
