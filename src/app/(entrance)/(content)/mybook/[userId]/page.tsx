"use client";

import { useTransition } from "react";
import MyCalendar from "./_component/calendar";

const MyPage = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex justify-between w-full h-full items-center">
      <div className="flex w-[50%] ml-7">
        <MyCalendar />
      </div>
      <div className="flex w-[40%] h-[60vh] bg-white mr-7 shadow-lg rounded-md"></div>
    </div>
  );
};

export default MyPage;
