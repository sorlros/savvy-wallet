"use client";

import useCalendarDetailModal from "@/hooks/use-calendar-detail-modal";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { format } from "date-fns";
import CalendarForm from "../calendar-form";
import { useParams, useRouter } from "next/navigation";

const CalendarDetailModal = () => {
  const modal = useCalendarDetailModal();
  const isOpen = useCalendarDetailModal((state) => state.isOpen);
  const date = useCalendarDetailModal((state) => state.date);

  const params = useParams();
  const router = useRouter();

  const dateString = format(date, "yyyyMMdd");

  return (
    <Dialog open={isOpen} onOpenChange={modal.onClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden">
        <div className="aspect-video flex flex-col">
          <DialogHeader className="flex w-full h-[30px] justify-center items-center">
            {format(date, "yyyy년 MM월 dd일")}
          </DialogHeader>

          <CalendarForm label="교통비" id="transportation" />
          <CalendarForm label="식비" id="food" />
          <CalendarForm label="통신비" id="communication" />
          <CalendarForm label="쇼핑비용" id="shopping" />
          <CalendarForm label="세금" id="tax" />
          <CalendarForm label="주거비용" id="accommodation" />

          <input
            hidden
            value={params.userId}
            name="userId"
            onChange={() => {}}
          />
          <input
            hidden
            value={dateString}
            id="date"
            name="date"
            onChange={() => {}}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarDetailModal;
