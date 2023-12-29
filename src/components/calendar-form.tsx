"use client";

import { useForm } from "react-hook-form";
import { ExpenseListWithDate } from "@/types/types";
import { FormInput } from "./form-input";
import { ElementRef, useRef } from "react";

interface CalendarFormProps {
  label: string;
  id: string;
}

const CalendarForm = ({ label, id }: CalendarFormProps) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const onSubmit = () => {};

  return (
    <form
      action={onSubmit}
      ref={formRef}
      className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
    >
      <FormInput id={id} ref={inputRef} label={label} />
    </form>
  );
};

export default CalendarForm;
