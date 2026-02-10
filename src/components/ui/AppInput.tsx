import React, { forwardRef } from "react";
import type { LucideIcon } from "lucide-react";
import { X, Eye, EyeOff, AlertCircle } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: LucideIcon;
  leftIconClassName?: string;
  rightIcon?: LucideIcon;
  rightIconClassName?: string;
  onRightIconClick?: () => void;
  clearable?: boolean;
  showPasswordToggle?: boolean;
  isPasswordVisible?: boolean;
  onPasswordToggle?: () => void;
  containerClassName?: string;
}

export const AppInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon: LeftIcon,
      leftIconClassName = "",
      rightIcon: RightIcon,
      rightIconClassName = "",
      onRightIconClick,
      clearable = true,
      showPasswordToggle = false,
      isPasswordVisible = false,
      onPasswordToggle,
      containerClassName = "",
      className = "",
      value,
      onChange,
      disabled,
      type = "text",
      ...props
    },
    ref,
  ) => {
    const showClearButton =
      clearable &&
      value &&
      typeof value === "string" &&
      value.length > 0 &&
      !disabled &&
      type !== "password";

    const getPaddingClasses = () => {
      let paddingClasses = "";
      if (LeftIcon) paddingClasses += "pl-12 ";
      if (showClearButton || RightIcon || showPasswordToggle)
        paddingClasses += "pr-12";
      return paddingClasses || "px-4";
    };

    const renderRightContent = () => {
      if (showPasswordToggle) {
        return (
          <button
            type="button"
            onClick={onPasswordToggle}
            disabled={disabled}
            className="text-gray-400 hover:text-gray-600 transition-colors p-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 disabled:opacity-50"
            aria-label={isPasswordVisible ? "Скрыть пароль" : "Показать пароль"}
          >
            {isPasswordVisible ? (
              <EyeOff color="#C9C9C9" size={24} />
            ) : (
              <Eye color="#C9C9C9" size={24} />
            )}
          </button>
        );
      }

      if (RightIcon) {
        return (
          <button
            type="button"
            onClick={onRightIconClick}
            disabled={disabled || !onRightIconClick}
            className={`text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-50 ${
              onRightIconClick ? "cursor-pointer" : "cursor-default"
            } ${rightIconClassName}`}
          >
            <RightIcon color="#C9C9C9" size={24} />
          </button>
        );
      }

      if (showClearButton) {
        return (
          <button
            type="button"
            onClick={() => {
              if (onChange) {
                const event = {
                  target: { value: "" },
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(event);
              }
            }}
            disabled={disabled}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            aria-label="Очистить поле"
          >
            <X color="#C9C9C9" size={24} />
          </button>
        );
      }

      return null;
    };

    return (
      <div className={`relative space-y-4 ${containerClassName}`}>
        {label && (
          <label className="block font-inter font-medium text-[18px] leading-[150%] tracking-[-0.27px] text-[#232323] mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          {LeftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <LeftIcon
                size={20}
                className={`text-gray-400 ${disabled ? "opacity-50" : ""} ${leftIconClassName}`}
              />
            </div>
          )}

          <input
            ref={ref}
            value={value}
            onChange={onChange}
            disabled={disabled}
            type={showPasswordToggle && isPasswordVisible ? "text" : type}
            className={`w-full py-3.5 border border-gray-200 rounded-[11.25px] focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all text-base font-normal disabled:opacity-50 disabled:cursor-not-allowed bg-white ${getPaddingClasses()} ${className} ${
              error
                ? "border-red-400 focus:ring-red-400/10 focus:border-red-400"
                : ""
            }`}
            aria-invalid={error ? "true" : "false"}
            {...props}
          />

          {renderRightContent() && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {renderRightContent()}
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-600 flex items-center gap-2 mt-2 absolute -bottom-6 right-0">
            <AlertCircle size={14} />
            {error}
          </p>
        )}
      </div>
    );
  },
);

AppInput.displayName = "AppInput";
