import React from "react";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  indeterminate?: boolean;
  className?: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  indeterminate = false,
  className = "",
}) => {
  const handleClick = () => {
    onChange(!checked);
  };

  return (
    <div
      className={`relative flex items-center justify-center w-5 h-5 cursor-pointer select-none ${className}`}
      onClick={handleClick}
    >
      <div
        className={`absolute inset-0 border rounded transition-all duration-200 ${
          checked
            ? "bg-[#3C538E] border-[#3C538E]"
            : "bg-white border-[#B2B3B9]"
        } ${indeterminate ? "bg-[#3C538E] border-[#3C538E]" : ""}`}
        style={{
          boxSizing: "border-box",
        }}
      />

      {indeterminate && (
        <div className="relative w-2 h-0.5 bg-white rounded-sm" />
      )}
    </div>
  );
};
