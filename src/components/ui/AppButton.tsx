import React, { forwardRef } from "react";
import * as Icons from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "danger" | "success";
type ButtonSize = "sm" | "md" | "lg";

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  icon?: keyof typeof Icons;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  showDropdown?: boolean;
}

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingText,
      icon,
      iconPosition = "left",
      fullWidth = false,
      showDropdown = false,
      className = "",
      disabled,
      ...props
    },
    ref,
  ) => {
    const IconComponent = icon
      ? (Icons[icon] as React.ComponentType<{
          size?: number;
          className?: string;
        }>)
      : null;

    const variantStyles = {
      primary: {
        base: `bg-[#242EDB] text-[#EBF3EA] relative`,
        hover: "hover:opacity-90",
        active: "active:scale-[0.98]",
        disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
      },
      secondary: {
        base: "bg-gray-100 text-gray-700 border border-gray-300",
        hover: "hover:bg-gray-200",
        active: "active:scale-[0.98]",
        disabled: "bg-gray-200 text-gray-500 cursor-not-allowed",
      },
      danger: {
        base: "bg-red-600 text-white",
        hover: "hover:bg-red-700",
        active: "active:scale-[0.98]",
        disabled: "bg-gray-200 text-gray-500 cursor-not-allowed",
      },
      success: {
        base: "bg-green-600 text-white",
        hover: "hover:bg-green-700",
        active: "active:scale-[0.98]",
        disabled: "bg-gray-200 text-gray-500 cursor-not-allowed",
      },
    };

    const sizeStyles = {
      sm: "py-2 px-3 text-sm rounded-[6px] gap-2",
      md: "py-[10px] px-[20px] text-[14px] rounded-[6px] gap-[15px] h-[42px] min-h-[42px]",
      lg: "py-4 px-6 text-lg rounded-xl gap-4",
    };

    const currentVariant = variantStyles[variant];
    const isDisabled = disabled || isLoading;

    const buttonClass = `
      inline-flex items-center justify-center
      font-semibold transition-all duration-200
      font-['Cairo']
      ${fullWidth ? "w-full" : ""}
      ${sizeStyles[size]}
      ${isDisabled ? currentVariant.disabled : `${currentVariant.base} ${currentVariant.hover} ${currentVariant.active}`}
      ${className}
    `.trim();

    const iconSizes = {
      sm: 16,
      md: 22,
      lg: 24,
    };

    const iconSize = iconSizes[size];

    const renderIcon = (position: "left" | "right") => {
      if (isLoading && position === "left") {
        return (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
        );
      }

      if (IconComponent && iconPosition === position && !isLoading) {
        return <IconComponent size={iconSize} className="shrink-0" />;
      }

      return null;
    };

    const renderContent = () => {
      if (isLoading && loadingText) {
        return (
          <>
            {renderIcon("left")}
            <span className="leading-[26px]">{loadingText}</span>
          </>
        );
      }

      if (isLoading) {
        return (
          <>
            {renderIcon("left")}
            <span className="leading-[26px]">{children}</span>
          </>
        );
      }

      return (
        <>
          {iconPosition === "left" && renderIcon("left")}
          <span className="leading-[26px]">{children}</span>
          {iconPosition === "right" && renderIcon("right")}
          {showDropdown && (
            <Icons.ChevronDown
              size={18}
              className="shrink-0 text-[#FFFFFF] ml-2"
            />
          )}
        </>
      );
    };

    return (
      <button
        ref={ref}
        className={buttonClass}
        disabled={isDisabled}
        style={{
          fontFamily: "'Cairo', sans-serif",
          fontWeight: 600,
          fontSize: "14px",
          lineHeight: "26px",
        }}
        {...props}
      >
        {renderContent()}
      </button>
    );
  },
);

AppButton.displayName = "AppButton";
