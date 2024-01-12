"use client";

import useCalendarDetailModal from "@/hooks/use-calendar-detail-modal";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { format } from "date-fns";
import CalendarForm from "../calendar-form";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { createCalendar } from "@/actions/create-day-expense";
import { toast } from "sonner";

const CalendarDetailModal = () => {
  const modal = useCalendarDetailModal();
  const isOpen = useCalendarDetailModal((state) => state.isOpen);
  const date = useCalendarDetailModal((state) => state.date);
  const params = useParams();
  const router = useRouter();
  const id = params.userId;

  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);

  const { execute } = useAction(createCalendar, {
    onSuccess: (data) => {
      toast.success("해당 날짜 지출이 추가되었습니다.");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const parseNumber = (value: FormDataEntryValue | null): number | null => {
    if (value === null) {
      return null;
    }

    const parsedValue = Number(value);
    return isNaN(parsedValue) ? null : parsedValue;
  };

  const handleSubmit = (formData: FormData) => {
    const userId = formData.get("userId") as string;
    const date = formData.get("date") as string;
    const transportation = parseNumber(formData.get("transportation"));
    const communication = parseNumber(formData.get("communication"));
    const food = parseNumber(formData.get("food"));
    const tax = parseNumber(formData.get("tax"));
    const accommodation = parseNumber(formData.get("accommodation"));
    const shopping = parseNumber(formData.get("shopping"));

    console.log(
      userId,
      date,
      transportation,
      communication,
      food,
      tax,
      accommodation,
      shopping,
    );

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

    execute({
      userId,
      date,
      transportation,
      communication,
      food,
      shopping,
      tax,
      accommodation,
    });
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

            <input
              hidden
              value={params.userId}
              name="userId"
              onChange={() => {}}
            />
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
