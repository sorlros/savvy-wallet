import useCalendarWithExpenseStore from "@/hooks/use-calendar-with-expense-store";
import { Expense } from "@prisma/client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend);

const CircleGraph = () => {
  const { data: expenseData, setData } = useCalendarWithExpenseStore();
  const [user, setUser] = useState<Expense | undefined>(undefined);

  const chartData = {
    plugins: [ChartDataLabels],
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
        backgroundColor: ["red", "skyblue", "green", "yellow", "pink", "grey"],
      },
    ],
  };

  return (
    <div className="flex items-center">
      <Doughnut
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          interaction: {
            mode: "index" as const,
            intersect: false,
          },
          plugins: {
            legend: {
              position: "left",
            },
          },
        }}
      />
    </div>
  );
};

export default CircleGraph;
