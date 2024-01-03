"use client";

import useCalendarDetailModal from "@/hooks/use-calendar-detail-modal";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// import "react-calendar/dist/Calendar.css";
// import styles from "./calendar.module.css";

const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
});

const MyCalendar = () => {
  const calendarModal = useCalendarDetailModal();

  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (newDate: any) => {
    setIsLoading(true);
    setDate(newDate);
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
      <Calendar onChange={handleDateChange} value={date} />
    </div>
  );
};

export default MyCalendar;
