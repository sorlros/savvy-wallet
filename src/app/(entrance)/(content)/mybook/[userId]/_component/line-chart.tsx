import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useParams } from "next/navigation";
import { getMonthlyExpense } from "@/actions/get-monthly-expense";
import useCalendarWithExpenseStore from "@/hooks/use-calendar-with-expense-store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
const LineChart = () => {
  const params = useParams();
  const [totalData, setTotalData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const { data: stateData, setData } = useCalendarWithExpenseStore();

  useEffect(() => {
    const fetchData = async () => {
      const expenses = await getMonthlyExpense(params.userId as string);

      if (expenses !== undefined) {
        // console.log("expenses", expenses);
        const totalSum = expenses.monthlyExpenses
          .map((data) => data.totalSumExpenses)
          .reverse();
        // console.log("totalData", totalData);
        setTotalData(totalSum);
        setLabels(expenses.months.reverse());
      }
    };

    fetchData();
  }, [params.userId, stateData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "지난 1년 지출 내역",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "월 총지출",
        data: totalData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default LineChart;
