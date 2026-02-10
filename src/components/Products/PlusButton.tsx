import React from "react";

export const PlusButton: React.FC = () => {
  return (
    <div className="relative flex justify-center items-center w-[52px] h-[27px] bg-[#242EDB] rounded-[23px]">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[24px] h-[24px]">
        <div className="absolute left-1/2 top-1/2 w-0 h-[16px] border-l-2 border-white -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute left-1/2 top-1/2 w-[16px] h-0 border-t-2 border-white -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
};
