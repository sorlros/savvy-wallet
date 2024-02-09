"use client";

import { createMemo } from "@/actions/create-memo";
import { getMemos } from "@/actions/get-memos";
import { updateMemo } from "@/actions/update-memo";
import { useParams } from "next/navigation";
import { ElementRef, useCallback, useEffect, useRef, useState } from "react";
import { PiPlusBold } from "react-icons/pi";
import { FaTrash } from "react-icons/fa";
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
  const [data, setData] = useState<MemoData[]>([]);
  const [content, setContent] = useState("");
  const generateMemoId = nanoid();

  // 첫 렌더링시 기존의 memo데이터 호출
  useEffect(() => {
    async function getMemoData() {
      const memoData = await getMemos(params.userId as string);

      if (memoData) {
        setData(memoData || []);
      }
    }
    getMemoData();
  }, [params.userId]);

  const handleBlur = useCallback(
    async (index: number) => {
      try {
        const memoId = data[index].memoId;
        const content = data[index].content.trim();

        if (memoId && content !== "") {
          await updateMemo(params.userId as string, content, memoId);
          toast.success("메모가 업데이트되었습니다.");
        } else if (!memoId && content !== "") {
          const newMemoId = nanoid();
          await createMemo(params.userId as string, content, newMemoId);
          toast.success("새로운 메모가 생성되었습니다.");
        } else {
          toast.error("공백은 메모로 저장할 수 없습니다.");
        }
      } catch (error) {
        toast.error("메모를 업데이트하거나 생성하는데 오류가 발생했습니다.");
      }
    },
    [params.userId, data],
  );

  const handleChange = (index: number, content: string) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index].content = content;
      return newData;
    });
  };

  const defaultHandleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleTextAreaBlur = (index: number) => {
    handleBlur(index);
  };

  const handleAddTextarea = async () => {
    const newData = [...data];
    const newTextArea = {
      id: nanoid(), // 임의의 ID 부여
      userId: params.userId as string,
      memoId: nanoid(), // 새로운 메모 ID 생성
      content: "", // 새로운 메모의 내용은 빈 문자열로 설정
      createdAt: new Date(), // 생성 시간 설정
    };
    newData.push(newTextArea);
    setData(newData);

    await createMemo(
      newTextArea.userId,
      newTextArea.content,
      newTextArea.memoId,
    );
  };

  return (
    <div className="flex flex-col w-[100%] h-[55vh] rounded-lg bg-slate-300 p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-full h-[36px] justify-between items-center rounded-lg shadow-md bg-yellow-400 mb-4 cursor-pointer"
      >
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={item.memoId} className="relative w-full">
              <textarea
                onClick={() => {}}
                onBlur={() => handleTextAreaBlur(index)}
                value={item.content}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-full h-[36px] items-center rounded-lg bg-yellow-400 p-2"
                name={`content-${index}`}
              />
              <div className="absolute top-0 right-0 mr-2 mt-2">
                <FaTrash className="cursor-pointer" />
              </div>
            </div>
          ))
        ) : (
          <textarea
            onClick={() => {}}
            onBlur={async () =>
              await createMemo(params.userId as string, content, generateMemoId)
            }
            name="content"
            className="w-full h-[36px] items-center rounded-lg bg-yellow-400 p-2"
            value={content}
            onChange={defaultHandleChange}
          />
        )}
        <div className="flex justify-center">
          <PiPlusBold
            onClick={handleAddTextarea}
            className="text-black w-[20px] h-[20px] cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default Memo;
