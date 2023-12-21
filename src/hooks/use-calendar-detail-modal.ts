import { create } from "zustand";

interface CalendarDetailModalStore {
  isOpen?: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCalendarDetailModal = create<CalendarDetailModalStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCalendarDetailModal;
