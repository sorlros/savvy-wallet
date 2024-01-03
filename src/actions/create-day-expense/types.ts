import { z } from "zod";
import { CreateDayExpense } from "./schema";
import { ActionState } from "@/hooks/use-action";
import { Calendar } from "@prisma/client";

export type InputType = z.infer<typeof CreateDayExpense>;

export type ReturnType = ActionState<InputType, Calendar>;
