"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
// import "react-calendar/dist/Calendar.css";
// import styles from "./calendar.module.css";

const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
});

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate: any) => {
    console.log("Selected date:", newDate);
    setDate(newDate);
  };

  return (
    <div>
      <Calendar onChange={handleDateChange} value={date} />
    </div>
  );
};

export default MyCalendar;
