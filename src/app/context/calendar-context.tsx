"use client";

import useCalendarWithExpenseStore from "@/hooks/use-calendar-with-expense-store";
import { Expense } from "@prisma/client";
import { PropsWithChildren, createContext, useContext } from "react";

const CalendarContext = createContext<
  { data: Expense; setData: (newData: Expense) => void } | undefined
>(undefined);

export const useCalendarContext = () => {
  return useContext(CalendarContext);
};

export const CalendarProvider = ({ children }: PropsWithChildren) => {
  const { data, setData } = useCalendarWithExpenseStore();

  return (
    <CalendarContext.Provider value={{ data, setData }}>
      {children}
    </CalendarContext.Provider>
  );
};
