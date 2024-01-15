import { optional, z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "올바른 이메일이 아닙니다.",
  }),
  password: z.string().min(1, {
    message: "올바른 비밀번호가 아닙니다.",
  }),
  id: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "올바른 이메일이 아닙니다.",
  }),
  password: z.string().min(6, {
    message: "최소 6자리 이상의 비밀번호를 설정해야합니다.",
  }),
  name: z.string().min(1, {
    message: "이름을 설정해야합니다.",
  }),
});

export const ExpenseSchema = z.object({
  userId: z.string(),
  date: z.string(),
  transportation: z.number().int().min(0),
  communication: z.number().int().min(0),
  food: z.number().int().min(0),
  shopping: z.number().int().min(0),
  tax: z.number().int().min(0),
  accommodation: z.number().int().min(0),
});
