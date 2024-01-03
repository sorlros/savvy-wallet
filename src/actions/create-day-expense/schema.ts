import { z } from "zod";

export const CreateDayExpense = z.object({
  id: z.string(),
  date: z.string(),
  transportation: z.number(),
  communication: z.number(),
  food: z.number(),
  shopping: z.number(),
  tax: z.number(),
  accommodation: z.number(),
});
