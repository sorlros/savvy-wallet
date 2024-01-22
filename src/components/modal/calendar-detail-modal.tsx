"use client";

import useCalendarDetailModal from "@/hooks/use-calendar-detail-modal";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import CalendarForm from "../calendar-form";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import { createExpense } from "@/actions/create-expense";
import useCalendarWithExpenseStore from "@/hooks/use-calendar-with-expense-store";

const CalendarDetailModal = () => {
  const modal = useCalendarDetailModal();
  const isOpen = useCalendarDetailModal((state) => state.isOpen);
  const date = useCalendarDetailModal((state) => state.date);
  const { data: storeData, setData: setStoreData } =
    useCalendarWithExpenseStore();

  const params = useParams();
  const id = params.userId;

  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);

  console.log("date", date);

  const parseNumber = (value: FormDataEntryValue | null): number | null => {
    if (value === null) {
      return null;
    }

    const parsedValue = Number(value);
    return isNaN(parsedValue) ? null : parsedValue;
  };

  const handleSubmit = async (formData: FormData) => {
    const id = formData.get("id") as string;
    const userId = formData.get("userId") as string;
    const date = formData.get("date") as string;
    const transportation = parseNumber(formData.get("transportation"));
    const communication = parseNumber(formData.get("communication"));
    const food = parseNumber(formData.get("food"));
    const tax = parseNumber(formData.get("tax"));
    const accommodation = parseNumber(formData.get("accommodation"));
    const shopping = parseNumber(formData.get("shopping"));

    if (
      transportation === null ||
      communication === null ||
      food === null ||
      tax === null ||
      accommodation === null ||
      shopping === null
    ) {
      return;
    }

    const data = {
      id,
      userId,
      date,
      transportation,
      communication,
      food,
      tax,
      accommodation,
      shopping,
    };

    try {
      const newExpense = await createExpense(data);

      // 여기서 newExpense를 활용하여 상태를 업데이트하면 됨
      console.log("새로 생성된 비용 데이터", newExpense);

      // 예시: useCalendarWithExpenseStore에서 setData로 상태 업데이트
      if (newExpense && newExpense !== undefined) {
        setStoreData(newExpense);
      }
    } catch (error) {
      console.error("오류 발생", error);
    }

    await createExpense(data);
    modal.onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={modal.onClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden">
        <div className="aspect-video flex flex-col">
          <DialogHeader className="flex w-full justify-center items-center mt-3">
            {`${year}년 ${month}월 ${day}일`}
          </DialogHeader>

          <form action={handleSubmit}>
            <CalendarForm
              label="교통비"
              id="transportation"
              name="transportation"
              type="number"
            />
            <CalendarForm label="식비" id="food" name="food" type="number" />
            <CalendarForm
              label="통신비"
              id="communication"
              name="communication"
              type="number"
            />
            <CalendarForm
              label="쇼핑비용"
              id="shopping"
              name="shopping"
              type="number"
            />
            <CalendarForm label="세금" id="tax" name="tax" type="number" />
            <CalendarForm
              label="주거비용"
              id="accommodation"
              name="accommodation"
              type="number"
            />

            <input hidden value={id} name="userId" onChange={() => {}} />
            <input
              hidden
              value={date}
              id="date"
              name="date"
              onChange={() => {}}
            />
            <Button className="mt-1 w-full" variant="outline" type="submit">
              저장
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarDetailModal;
