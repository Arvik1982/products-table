import React, { forwardRef } from "react";
import * as Icons from "lucide-react";

interface AppCheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  error?: string;
  icon?: keyof typeof Icons;
  iconSize?: number;
  containerClassName?: string;
  labelClassName?: string;
  showIcon?: boolean;
}

export const AppCheckbox = forwardRef<HTMLInputElement, AppCheckboxProps>(
  (
    {
      label,
      error,
      icon = "Check",
      iconSize = 16,
      containerClassName = "",
      labelClassName = "",
      className = "",
      checked,
      disabled,
      showIcon = true,
      ...props
    },
    ref,
  ) => {
    const IconComponent = Icons[icon] as React.ComponentType<{
      size?: number;
      className?: string;
      strokeWidth?: number;
    }>;

    return (
      <div className={containerClassName}>
        <div className="flex items-center">
          <label className="inline-flex items-center cursor-pointer">
            <input
              ref={ref}
              type="checkbox"
              checked={checked}
              disabled={disabled}
              className="sr-only"
              aria-invalid={error ? "true" : "false"}
              {...props}
            />

            <span
              className={`relative flex items-center justify-center h-5 w-5 rounded border transition-colors
                ${disabled ? "bg-gray-200 border-gray-300 cursor-not-allowed" : "cursor-pointer"}
                ${checked ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"}
                ${className}
              `}
            >
              {checked && showIcon && IconComponent && (
                <IconComponent
                  size={iconSize}
                  className="text-white"
                  strokeWidth={2}
                />
              )}
            </span>

            {label && (
              <span
                className={`ml-3 font-inter font-medium text-base leading-relaxed text-[#9C9C9C] select-none ${
                  disabled ? "opacity-50 cursor-default" : "hover:text-gray-700"
                } ${labelClassName}`}
              >
                {label}
              </span>
            )}
          </label>
        </div>

        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </div>
    );
  },
);

AppCheckbox.displayName = "AppCheckbox";
