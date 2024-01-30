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

interface LineChartProps {
  chartData: any[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
const LineChart = ({ chartData }): LineChartProps => {
  const params = useParams();
  const [totalData, setTotalData] = useState([]);

  useEffect(() => {
    setTotalData(chartData);
  }, [params.userId, chartData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const getData = async () => {
    const expenseData = await getMonthlyExpense(params.userId as string);

    return expenseData;
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() =>
          expenseData.datatype.number({ min: -1000, max: 1000 }),
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default LineChart;
