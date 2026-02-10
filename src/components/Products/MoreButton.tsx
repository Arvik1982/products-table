import React from "react";
import { CircleEllipsis } from "lucide-react";

export const MoreButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  return (
    <button
      {...props}
      className="flex items-center justify-center hover:opacity-80 transition-opacity focus:outline-none"
      style={{
        width: "32px",
        height: "32px",
      }}
    >
      <CircleEllipsis size={32} color="#B2B3B9" strokeWidth={1.5} />
    </button>
  );
};
