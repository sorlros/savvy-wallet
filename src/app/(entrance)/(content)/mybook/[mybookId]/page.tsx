"use client";

import MyCalendar from "./_component/calendar";

interface MyBookPageProps {
  params: {
    mybookId: string;
  };
}

const MybookPage = ({ params }: MyBookPageProps) => {
  return (
    <div className="flex w-full h-full">
      <div className="flex w-full items-center justify-center">
        <MyCalendar />
      </div>
    </div>
  );
};

export default MybookPage;
