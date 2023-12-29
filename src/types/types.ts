import { Expense, Calendar } from "@prisma/client";

export type ExpenseListWithDate = Expense & { calendar: Calendar };
