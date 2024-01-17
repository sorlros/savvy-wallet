"use client";

import { useEffect, useState, useTransition } from "react";
import MyCalendar from "./_component/calendar";
import { redirect, useParams } from "next/navigation";
import { db } from "@/libs/db";
import { ExpenseSchema } from "@/schemas";

interface MyPageProps {
  data: {};
}

const MyPage = ({ data }: MyPageProps) => {
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const [user, setUser] = useState([
    {
      userId: "",
      date: "",
      transportation: 0,
      communication: 0,
      food: 0,
      shopping: 0,
      tax: 0,
      accommodation: 0,
    },
  ]);

  useEffect(() => {
    if (!params.userId) {
      return redirect("/auth/login");
    }

    const fetchData = () => {
      try {
        const user = db.user
          .findUnique({
            where: {
              id: params.userId as string,
            },
          })
          .expenses()
          .then((userWithExpenses) => {
            if (userWithExpenses) {
              console.log("userWithExpenses", userWithExpenses);
              setUser(userWithExpenses);
            } else {
              setUser([]);
              return;
            }
          });
      } catch (error) {
        return { error: "fetching 오류" };
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-between w-full h-full items-center">
      <div className="flex w-[50%] ml-7">
        <MyCalendar />
      </div>
      <div className="flex w-[40%] h-[60vh] bg-white mr-7 shadow-lg rounded-md">
        {user.map((data) => (
          <div key={data.userId}>
            <p>userId: {data.userId}</p>
            <p>data: {data.date}</p>
            <p>accommodation: {data.accommodation}</p>
            <p>communication: {data.communication}</p>
            <p>food: {data.food}</p>
            <p>shopping: {data.shopping}</p>
            <p>tax: {data.tax}</p>
            <p>transportation: {data.transportation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage;
