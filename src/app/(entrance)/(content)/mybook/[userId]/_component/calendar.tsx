"use client";

import useCalendarDetailModal from "@/hooks/use-calendar-detail-modal";
import useCalendarWithExpenseStore from "@/hooks/use-calendar-with-expense-store";
import { db } from "@/libs/db";
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

  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const { data: storeData, setData: setStoreData } =
    useCalendarWithExpenseStore();

  const handleDateChange = async (newDate: any) => {
    setIsLoading(true);
    setDate(newDate);
    const dateToString = format(date, "yyyyMMdd");

    let calendar;

    calendar = await db.calendar.findUnique({
      where: {
        id: params.userId as string,
        date: dateToString,
      },
      include: {
        expenses: true,
      },
    });

    if (!calendar) {
      return;
    }

    setData(calendar?.expenses);
  };

  useEffect(() => {
    if (isLoading) {
      const dateToString = format(date, "yyyyMMdd");
      calendarModal.onOpen(dateToString);
      setIsLoading(false);
    }
  }, [isLoading, date]);

  return (
    <div>
      <Calendar onChange={handleDateChange} value={date} data={storeData} />
    </div>
  );
};

export default MyCalendar;
