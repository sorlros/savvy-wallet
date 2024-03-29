"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import MyCalendar from "./_component/calendar";
import { redirect, useParams } from "next/navigation";
import { db } from "@/libs/db";
import { ExpenseSchema } from "@/schemas";
import useCalendarWithExpenseStore from "@/hooks/use-calendar-with-expense-store";
import { Expense } from "@prisma/client";
import CircleGraph from "./_component/circle-graph";
import { getMonthExpense } from "@/actions/get-month-expense";
import { Button } from "@/components/ui/button";
import { getMonthlyExpense } from "@/actions/get-monthly-expense";
import LineChart from "./_component/line-chart";
import Memo from "./_component/memo";

const MyPage = () => {
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const { data, setData } = useCalendarWithExpenseStore();

  const [user, setUser] = useState<Expense | undefined>(undefined);
  const [page, setPage] = useState<number>(1);

  const year = data.date.substring(0, 4);
  const month = data.date.substring(4, 6);
  const day = data.date.substring(6, 8);

  useEffect(() => {
    if (!params.userId) {
      return redirect("/auth/login");
    }

    startTransition(() => {
      getMonthExpense(data.date, params.userId as string);

      setUser(data);
    });
  }, [data, params.userId, startTransition]);

  const handlePage = (value: number) => {
    setPage(value);
  };

  const getTotalExpense = (data: Expense) => {
    return (
      data.accommodation +
      data.communication +
      data.food +
      data.shopping +
      data.tax +
      data.transportation
    );
  };

  const totalExpense = getTotalExpense(data);

  return (
    <div className="flex justify-between w-full h-full items-center">
      <div className="flex w-[50%] ml-7">
        <MyCalendar />
      </div>
      <div className="flex flex-col w-[40%] h-[70vh] bg-white mr-10 shadow-lg rounded-md p-5">
        <div className="flex gap-6 w-full h-[40px] bg-slate-300 rounded-lg items-center justify-center mb-3 p-6">
          <Button
            onClick={() => handlePage(1)}
            className="bg-white text-purple-600"
          >
            요일 별 지출
          </Button>
          <Button
            onClick={() => handlePage(2)}
            className="bg-white text-rose-400"
          >
            월 별 지출
          </Button>
          <Button
            onClick={() => handlePage(3)}
            className="bg-white text-yellow-400"
          >
            메모
          </Button>
        </div>

        {user !== undefined && page === 1 ? (
          <div className="flex-col items-center justify-center text-center">
            <p className="border-b-4 mb-4">{`${year}년 ${month}월 ${day}일`}</p>
            <div className="flex justify-center items-center border-b-4">
              <CircleGraph />
            </div>

            <div className="border-b-2 mt-4">
              <p className="flex justify-between ml-6 mr-6">
                <span className="">주거비용</span>￦{data.accommodation}
              </p>
            </div>
            <div className="border-b-2">
              <p className="flex justify-between ml-6 mr-6">
                <span>통신비</span> ￦{data.communication}
              </p>
            </div>
            <div className="border-b-2">
              <p className="flex justify-between ml-6 mr-6">
                <span>식비</span>￦{data.food}
              </p>
            </div>
            <div className="border-b-2">
              <p className="flex justify-between ml-6 mr-6">
                <span>쇼핑비</span>￦{data.shopping}
              </p>
            </div>
            <div className="border-b-2">
              <p className="flex justify-between ml-6 mr-6">
                <span>세금</span>￦{data.tax}
              </p>
            </div>
            <div className="border-b-2">
              <p className="flex justify-between ml-6 mr-6">
                <span>교통비</span>￦{data.transportation}
              </p>
            </div>
            <div className="flex mt-4 mr-4 justify-end">
              총지출 : ￦{totalExpense}
            </div>
          </div>
        ) : user !== undefined && page === 2 ? (
          <div className="flex-col items-center justify-center text-center w-[100%] h-[100%]">
            <div className="flex justify-center items-center border-b-4">
              <LineChart />
            </div>
          </div>
        ) : user !== undefined && page === 3 ? (
          <div>
            <Memo />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyPage;
