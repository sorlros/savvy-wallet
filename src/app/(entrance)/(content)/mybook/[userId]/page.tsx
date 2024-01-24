"use client";

import { useEffect, useState, useTransition } from "react";
import MyCalendar from "./_component/calendar";
import { redirect, useParams } from "next/navigation";
import { db } from "@/libs/db";
import { ExpenseSchema } from "@/schemas";
import useCalendarWithExpenseStore from "@/hooks/use-calendar-with-expense-store";
import { Expense } from "@prisma/client";
import CircleGraph from "./_component/circle-graph";
import { getMonthExpense } from "@/actions/get-month-expense";

const MyPage = () => {
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const { data, setData } = useCalendarWithExpenseStore();

  const [user, setUser] = useState<Expense | undefined>(undefined);

  useEffect(() => {
    if (!params.userId) {
      return redirect("/auth/login");
    }

    startTransition(() => {
      getMonthExpense(data.date, params.userId as string);

      setUser(data);
    });
  }, [data, params.userId, startTransition]);

  return (
    <div className="flex justify-between w-full h-full items-center">
      <div className="flex w-[50%] ml-7">
        <MyCalendar />
      </div>
      <div className="flex w-[40%] h-[60vh] bg-white mr-7 shadow-lg rounded-md p-5">
        {user !== undefined ? (
          <div key={data.userId}>
            <p>date: {data.date}</p>
            <p>주거비용: ￦{data.accommodation}</p>
            <p>통신비: ￦{data.communication}</p>
            <p>식비: ￦{data.food}</p>
            <p>쇼핑비: ￦{data.shopping}</p>
            <p>세금: ￦{data.tax}</p>
            <p>교통비: ￦{data.transportation}</p>
          </div>
        ) : null}

        <CircleGraph />
      </div>
    </div>
  );
};

export default MyPage;
