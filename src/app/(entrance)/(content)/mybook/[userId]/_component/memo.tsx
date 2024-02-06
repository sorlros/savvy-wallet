"use client";

import { createMemo } from "@/actions/create-memo";
import { getMemos } from "@/actions/get-memos";
import { useParams } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { PiPlusBold } from "react-icons/pi";

type MemoData = {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

const Memo = () => {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>();
  const formRef = useRef<ElementRef<"form">>(null);
  const [data, setData] = useState<MemoData[]>([]);
  const [content, setContent] = useState("");

  const handleClick = () => {};

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRefs.current?.focus();
      inputRef.current?.select();
    });
  };

  const onBlur = () => {
    setIsEditing(false);
    formRef.current?.requestSubmit();
  };

  const handleSubmit = async () => {
    await createMemo(params.userId as string, content);
  };

  useEffect(() => {
    const getMemoData = async () => {
      const memoData = await getMemos(params.userId as string);

      if (memoData) {
        setData(memoData);
      } else return;
    };

    getMemoData();
  }, [params.userId]);

  return (
    <div className="flex flex-col w-[100%] h-[55vh] rounded-lg bg-slate-300 p-4">
      <form
        id="memoForm"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        ref={formRef}
        className="w-full h-[36px] justify-between items-center rounded-lg shadow-md bg-yellow-400 mb-4 cursor-pointer"
      >
        {data.length > 0 ? (
          data.map((item, index) => (
            <input
              key={item.id}
              type="text"
              ref={(el) => {
                inputRefs.current[index] = el!;
              }}
              value={item.content}
              onChange={(e) => setContent(e.target.value)}
              id="content"
              name="content"
            />
          ))
        ) : (
          <input
            ref={(el) => {
              inputRefs.current[index] = el!;
            }}
            onBlur={onBlur}
            // onClick={enableEditing}
            id="content"
            name="content"
            className="w-full h-[36px] items-center rounded-lg bg-yellow-400 p-2"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}
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
