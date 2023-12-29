"use client";

import CalendarDetailModal from "@/components/modal/calendar-detail-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CalendarDetailModal />
    </>
  );
};
