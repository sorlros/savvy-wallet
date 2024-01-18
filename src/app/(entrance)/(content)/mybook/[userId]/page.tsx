"use client";

import { useEffect, useState, useTransition } from "react";
import MyCalendar from "./_component/calendar";
import { redirect, useParams } from "next/navigation";
import { db } from "@/libs/db";
import { ExpenseSchema } from "@/schemas";
import useCalendarWithExpenseStore from "@/hooks/use-calendar-with-expense-store";
import { Expense } from "@prisma/client";

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
      console.log("data", data);
      setUser(data);
    });
  }, [data, params.userId, startTransition]);

  return (
    <div className="flex justify-between w-full h-full items-center">
      <div className="flex w-[50%] ml-7">
        <MyCalendar />
      </div>
      <div className="flex w-[40%] h-[60vh] bg-white mr-7 shadow-lg rounded-md">
        {user !== undefined ? (
          <div key={data.userId}>
            <p>userId: {data.userId}</p>
            <p>date: {data.date}</p>
            <p>accommodation: {data.accommodation}</p>
            <p>communication: {data.communication}</p>
            <p>food: {data.food}</p>
            <p>shopping: {data.shopping}</p>
            <p>tax: {data.tax}</p>
            <p>transportation: {data.transportation}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyPage;
