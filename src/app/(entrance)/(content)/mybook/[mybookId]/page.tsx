"use client";

import MyCalendar from "./_component/calendar";

interface MyBookPageProps {
  params: {
    mybookId: string;
  };
}

const MybookPage = ({ params }: MyBookPageProps) => {
  return (
    <div className="flex justify-between w-full h-full items-center">
      <div className="flex w-[50%] ml-7">
        <MyCalendar />
      </div>
      <div className="flex w-[40%] h-[60vh] bg-black mr-7">asd</div>
    </div>
  );
};

export default MybookPage;
