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

  const handleDateChange = (newDate: any) => {
    setDate(newDate);
  };

  useEffect(() => {
    if (date) {
      format(date, "yyyyMMdd");
      const dateToString = date.toISOString();
      calendarModal.onOpen(dateToString);
    }
  }, [date]);

  return (
    <div>
      <Calendar onChange={handleDateChange} value={date} />
    </div>
  );
};

export default MyCalendar;
