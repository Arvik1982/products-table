import React from "react";

interface QuantityBarsProps {
  stock: number;
}

export const QuantityBars: React.FC<QuantityBarsProps> = ({ stock }) => {
  const maxBars = 3;
  const filledBars = Math.min(Math.floor(stock / 34), maxBars);

  return (
    <div className="flex justify-center items-center gap-2">
      {Array.from({ length: maxBars }).map((_, index) => (
        <div
          key={index}
          className={`w-1.5 h-4.5 rounded ${
            index < filledBars ? "bg-gray-600" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
};
