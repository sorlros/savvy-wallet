"use client";

import { createMemo } from "@/actions/create-memo";
import { getMemos } from "@/actions/get-memos";
import { updateMemo } from "@/actions/update-memo";
import { useParams } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { PiPlusBold } from "react-icons/pi";
import { nanoid } from "nanoid";

type MemoData = {
  id: string;
  userId: string;
  memoId: string;
  content: string;
  createdAt: Date;
};

const Memo = () => {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<ElementRef<"form">>(null);
  const [data, setData] = useState<MemoData[]>([]);
  const [content, setContent] = useState("");

  // 첫 렌더링시 기존의 memo데이터 호출
  useEffect(() => {
    const getMemoData = async () => {
      const memoData = await getMemos(params.userId as string);

      if (memoData) {
        setData(memoData);
      } else {
        setData([]);
      }
    };
    console.log("memoData", data);
    getMemoData();
  }, [params.userId]);

  // blur 이벤트 발생시마다 새롭게 호출
  useEffect(() => {
    const handleBlur = () => {
      setIsEditing(false);

      const memoId = nanoid(); // 길이 21의 랜덤 문자열을 생성합니다.
      const memoToUpdate = data.find((memo) => memo.memoId === memoId);
      if (memoToUpdate) {
        updateMemo(params.userId as string, content, memoId);
      } else {
        createMemo(params.userId as string, content, memoId);
      }
    };

    if (isEditing) {
      window.addEventListener("blur", handleBlur);
    } else {
      window.removeEventListener("blur", handleBlur);
    }

    return () => {
      window.removeEventListener("blur", handleBlur);
    };
  }, [isEditing, content, data, params.userId]);

  const handleClick = () => {};

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
      textAreaRef.current?.select();
    });
  };

  // const onBlur = (memoId: string) => {
  //   setIsEditing(false);

  //   const memoToUpdate = data.find((memo) => memo.memoId === memoId);
  //   if (memoToUpdate) {
  //     updateMemo(params.userId as string, content, memoId);
  //   } else {
  //     createMemo(params.userId as string, content, memoId);
  //   }
  // };

  return (
    <div className="flex flex-col w-[100%] h-[55vh] rounded-lg bg-slate-300 p-4">
      <form
        id="memoForm"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        ref={formRef}
        className="w-full h-[36px] justify-between items-center rounded-lg shadow-md bg-yellow-400 mb-4 cursor-pointer"
      >
        {data.length > 0 ? (
          data.map((item, index) => (
            <textarea
              key={item.memoId}
              ref={textAreaRef}
              onClick={enableEditing}
              value={item.content}
              onChange={(e) => setContent(e.target.value)}
              name="content"
            />
          ))
        ) : (
          <textarea
            ref={textAreaRef}
            // onBlur={() => {
            //   onBlur(memoId);
            // }}
            onClick={enableEditing}
            name="content"
            className="w-full h-[36px] items-center rounded-lg bg-yellow-400 p-2"
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
