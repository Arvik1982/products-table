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
        base: `
      bg-[#242EDB] 
      text-white 
      shadow-lg 
      relative 
      overflow-hidden
      before:absolute 
      before:inset-0 
      before:bg-gradient-to-b 
      before:from-white 
      before:to-transparent 
      before:opacity-10
      before:pointer-events-none
    `,
        hover:
          "hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:scale-[1.02]",
        active: "active:scale-[0.98]",
        disabled: "bg-gray-200 text-gray-500 cursor-not-allowed",
      },
      secondary: {
        base: "bg-gray-100 text-gray-700 border border-gray-300",
        hover: "hover:bg-gray-200",
        active: "active:scale-[0.98]",
        disabled: "bg-gray-200 text-gray-500 cursor-not-allowed",
      },
      danger: {
        base: "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg",
        hover:
          "hover:from-red-700 hover:to-pink-700 hover:shadow-xl hover:scale-[1.02]",
        active: "active:scale-[0.98]",
        disabled: "bg-gray-200 text-gray-500 cursor-not-allowed",
      },
      success: {
        base: "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg",
        hover:
          "hover:from-green-700 hover:to-emerald-700 hover:shadow-xl hover:scale-[1.02]",
        active: "active:scale-[0.98]",
        disabled: "bg-gray-200 text-gray-500 cursor-not-allowed",
      },
    };

    const sizeStyles = {
      sm: "py-2 px-4 text-sm rounded-lg",
      md: "py-3 px-5 text-base rounded-xl",
      lg: "py-4 px-6 text-lg rounded-xl",
    };

    const currentVariant = variantStyles[variant];
    const isDisabled = disabled || isLoading;

    const buttonClass = `
      inline-flex items-center justify-center gap-3
      font-bold transition-all duration-200 transform
      ${fullWidth ? "w-full" : ""}
      ${sizeStyles[size]}
      ${isDisabled ? currentVariant.disabled : `${currentVariant.base} ${currentVariant.hover} ${currentVariant.active}`}
      ${className}
    `.trim();

    const iconSizes = {
      sm: 16,
      md: 20,
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
            {loadingText}
          </>
        );
      }

      if (isLoading) {
        return (
          <>
            {renderIcon("left")}
            {children}
          </>
        );
      }

      return (
        <>
          {iconPosition === "left" && renderIcon("left")}
          {children}
          {iconPosition === "right" && renderIcon("right")}
        </>
      );
    };

    return (
      <button
        ref={ref}
        className={buttonClass}
        disabled={isDisabled}
        {...props}
      >
        {renderContent()}
      </button>
    );
  },
);

AppButton.displayName = "AppButton";
