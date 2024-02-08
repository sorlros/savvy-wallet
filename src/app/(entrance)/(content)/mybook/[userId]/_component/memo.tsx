"use client";

import { createMemo } from "@/actions/create-memo";
import { getMemos } from "@/actions/get-memos";
import { updateMemo } from "@/actions/update-memo";
import { useParams } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { PiPlusBold } from "react-icons/pi";
import { nanoid } from "nanoid";
import { toast } from "sonner";

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
  // const textAreaRefs = useRef<(HTMLTextAreaElement)[]>();
  const formRef = useRef<ElementRef<"form">>(null);
  const [data, setData] = useState<MemoData[]>([]);
  const [content, setContent] = useState("");

  // 첫 렌더링시 기존의 memo데이터 호출
  useEffect(() => {
    async function getMemoData() {
      const memoData = await getMemos(params.userId as string);

      console.log("memoData", memoData);
      if (memoData) {
        setData(memoData);
      } else {
        setData([]);
      }
    }

    getMemoData();
  }, [params.userId]);

  // blur 이벤트 발생시마다 새롭게 호출
  useEffect(() => {
    if (!isEditing) {
      const handleBlur = async () => {
        const existingData = await getMemos(params.userId as string);
        if (existingData) {
          const memoIds = existingData.map((memo) => memo.memoId);
          const existingMemoId = data.find((item) =>
            memoIds.includes(item.memoId),
          )?.memoId;

          if (existingMemoId && existingData !== undefined && content !== "") {
            updateMemo(params.userId as string, content, existingMemoId);
            toast.success("메모가 업데이트되었습니다.");
          } else {
            toast.error(
              "memoId가 존재하지 않거나 공백은 메모로 저장되지 않습니다.",
            );
          }

          if (!existingMemoId && content !== "") {
            const memoId = nanoid();
            createMemo(params.userId as string, content, memoId);
            toast.success("메모가 생성되었습니다.");
          } else if (!existingMemoId && content === "") {
            toast.error("공백은 메모로 저장되지 않습니다.");
          }
        }

        // if (isEditing === false) {
        //   window.addEventListener("blur", handleBlur);
        // } else {
        //   window.removeEventListener("blur", handleBlur);
        // }

        // return () => {
        //   window.removeEventListener("blur", handleBlur);
        // };
      };
      handleBlur();
    }
  }, [isEditing, params.userId]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const enableEditing = () => {
    setIsEditing(true);
    // setTimeout(() => {
    //   textAreaRef.current?.focus();
    //   textAreaRef.current?.select();
    // });
  };

  const unavailableEditing = () => {
    setIsEditing(false);
  };

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
        {data ? (
          data.map((item, index) => (
            <textarea
              key={item.memoId}
              // ref={(ref) => (textAreaRefs.current[index] = ref)}
              onClick={enableEditing}
              onBlur={unavailableEditing}
              value={item.content}
              onChange={handleChange}
              className="w-full h-[36px] items-center rounded-lg bg-yellow-400 p-2"
              name="content"
            />
          ))
        ) : (
          <textarea
            // ref={(ref) => (textAreaRefs.current = ref)}
            onClick={enableEditing}
            onBlur={unavailableEditing}
            name="content"
            className="w-full h-[36px] items-center rounded-lg bg-yellow-400 p-2"
            value={content}
            onChange={handleChange}
          />
        )}
      </form>
      <div className="flex justify-center">
        <PiPlusBold
          // onClick={handleClick}
          className="text-black w-[20px] h-[20px] cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Memo;
