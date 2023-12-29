import { create } from "zustand";

interface CalendarDetailModalStore {
  date: string;
  isOpen?: boolean;
  onOpen: (date: string) => void;
  onClose: () => void;
}

const useCalendarDetailModal = create<CalendarDetailModalStore>((set) => ({
  date: "",
  isOpen: false,
  onOpen: (date: string) => set({ isOpen: true, date }),
  onClose: () => set({ isOpen: false }),
}));

export default useCalendarDetailModal;
