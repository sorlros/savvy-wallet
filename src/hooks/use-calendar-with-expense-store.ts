import { z } from "zod";
import { create } from "zustand";
import { ExpenseSchema } from "../schemas/index";

interface CalendarWithCalendarStore {
  data: {
    userId: string;
    date: string;
    transportation: number;
    communication: number;
    food: number;
    shopping: number;
    tax: number;
    accommodation: number;
  };
  setData: (newData: {
    userId: string;
    date: string;
    transportation: number;
    communication: number;
    food: number;
    shopping: number;
    tax: number;
    accommodation: number;
  }) => void;
}

const useCalendarWithExpenseStore = create<CalendarWithCalendarStore>(
  (set) => ({
    data: {
      userId: "",
      date: "",
      transportation: 0,
      communication: 0,
      food: 0,
      shopping: 0,
      tax: 0,
      accommodation: 0,
    },
    setData: (newData) => set({ data: newData }),
  }),
);

export default useCalendarWithExpenseStore;
