import React from "react";

export const MoreButton: React.FC = () => {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      <div className="absolute inset-[9.38%] border border-[#B2B3B9] rounded-full"></div>
      <div className="flex items-center justify-center gap-1 relative z-10">
        <div className="w-1 h-1 bg-[#B2B3B9] rounded-full"></div>
        <div className="w-1 h-1 bg-[#B2B3B9] rounded-full"></div>
        <div className="w-1 h-1 bg-[#B2B3B9] rounded-full"></div>
      </div>
    </div>
  );
};
