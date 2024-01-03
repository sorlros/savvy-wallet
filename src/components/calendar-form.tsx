"use client";

import { FormInput } from "./form-input";
import { ElementRef, useRef } from "react";

interface CalendarFormProps {
  label: string;
  id: string;
  name: string;
  type: string;
}

const CalendarForm = ({ label, id, name, type }: CalendarFormProps) => {
  const inputRef = useRef<ElementRef<"input">>(null);

  return (
    <div className="w-full p-3 bg-white space-y-4 shadow-md">
      <FormInput id={id} name={name} ref={inputRef} label={label} type={type} />
    </div>
  );
};

export default CalendarForm;
