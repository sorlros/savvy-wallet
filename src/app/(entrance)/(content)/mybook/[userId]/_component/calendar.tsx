"use client";

import { getCalendarByUserId } from "@/actions/get-calendar-by-userId";
import useCalendarDetailModal from "@/hooks/use-calendar-detail-modal";
import useCalendarWithExpenseStore from "@/hooks/use-calendar-with-expense-store";
import { db } from "@/libs/db";
import { Expense } from "@prisma/client";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
});

const MyCalendar = () => {
  const calendarModal = useCalendarDetailModal();
  const params = useParams();
  const userId = params.userId as string;

  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const { data, setData } = useCalendarWithExpenseStore();

  const handleDateChange = async (newDate: any) => {
    setIsLoading(true);
    setDate((prevDate) => newDate);

    try {
      const dateToString = format(newDate, "yyyyMMdd");
      const fetchedData = await getCalendarByUserId(userId, dateToString);

      if (fetchedData && fetchedData !== null) {
        setData(fetchedData);
        setIsLoading(false);
      }

      if (!fetchedData) {
        setData({
          id: "",
          userId: "",
          date: dateToString,
          transportation: 0,
          communication: 0,
          food: 0,
          shopping: 0,
          tax: 0,
          accommodation: 0,
        });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      return console.error("오류 발생");
    }
  };

  useEffect(() => {
    if (isLoading) {
      const dateToString = format(date, "yyyyMMdd");
      calendarModal.onOpen(dateToString);
      setIsLoading(false);
    }
  }, [isLoading, date, calendarModal]);

  return (
    <div>
      <Calendar onChange={handleDateChange} value={date} />
    </div>
  );
};

export default MyCalendar;
