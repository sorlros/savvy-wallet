"use client";

import { FormInput } from "@/components/form-input";
import { Form } from "@/components/ui/form";
import { ElementRef, useRef, useState } from "react";
import { PiPlusBold } from "react-icons/pi";

const Memo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const handleClick = () => {};

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const handleSubmit = async () => {};

  return (
    <div className="flex flex-col w-[100%] h-[55vh] rounded-lg bg-slate-300 p-4">
      <form
        action={handleSubmit}
        ref={formRef}
        className="w-full h-[36px] justify-between items-center rounded-lg shadow-md bg-yellow-400 mb-4 cursor-pointer"
      >
        <input
          ref={inputRef}
          onBlur={onBlur}
          onClick={enableEditing}
          id="content"
          name="content"
          className="w-full h-[36px] items-center rounded-lg bg-yellow-400 p-2"
          type="text"
        ></input>
      </form>
      <div className="flex justify-center">
        <PiPlusBold
          onClick={handleClick}
          className="text-black w-[20px] h-[20px] cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Memo;
