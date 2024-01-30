export type Calendar = {
  id: string;
  userId: string;
  date: string;
  expenses: Expense[]; // Expense 배열
  user: User; // User 타입
};

// Expense 타입
export type Expense = {
  id?: string;
  userId: string;
  date: string;
  transportation: number;
  communication: number;
  food: number;
  shopping: number;
  tax: number;
  accommodation: number;
};

// User 타입
export type User = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  hashedPassword: string | null;
  expenses: Expense[]; // Expense 배열
  calendars: Calendar[]; // Calendar 배열
};
