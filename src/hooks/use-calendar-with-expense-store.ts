import { z } from "zod";
import { create } from "zustand";
import { Expense } from "@prisma/client";

interface CalendarWithExpenseStore {
  data: Expense;
  setData: (newData: Expense) => void;
}

const useCalendarWithExpenseStore = create<CalendarWithExpenseStore>((set) => ({
  data: {
    id: "",
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
}));

export default useCalendarWithExpenseStore;
