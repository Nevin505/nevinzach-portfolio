import React, { forwardRef } from "react";
import { SpinnerIcon } from "@/components/svg";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-secondary text-[#080f14] font-mono font-semibold shadow-[0_0_20px_rgba(76,215,246,0.4)] hover:shadow-[0_0_30px_rgba(76,215,246,0.65)] hover:brightness-105 active:scale-[0.98] border border-secondary focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  secondary:
    "bg-transparent text-secondary border border-secondary font-mono font-semibold hover:bg-secondary/10 hover:shadow-[0_0_18px_rgba(76,215,246,0.25)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  outline:
    "bg-transparent text-on-surface border border-outline/50 hover:bg-surface-container hover:border-outline active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-outline focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  ghost:
    "bg-transparent text-on-surface hover:bg-surface-container-high/70 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-surface-tint focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  danger:
    "bg-error text-on-error font-semibold hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2 focus-visible:ring-offset-background",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-xs gap-2 rounded-md",
  md: "h-11 px-5 text-sm gap-2.5 rounded-md",
  lg: "h-12 px-6 text-sm sm:text-base gap-2.5 rounded-md",
  icon: "h-11 w-11 p-0 rounded-md justify-center",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center transition-all duration-200 cursor-pointer select-none outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:scale-100";

    const variantClass = variantStyles[variant] || variantStyles.primary;
    const sizeClass = sizeStyles[size] || sizeStyles.md;
    const widthClass = fullWidth ? "w-full" : "";

    const combinedClassName = [
      baseStyles,
      variantClass,
      sizeClass,
      widthClass,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={combinedClassName}
        {...props}
      >
        {isLoading && <SpinnerIcon className="-ml-0.5 h-4 w-4 text-current" />}
        {!isLoading && leftIcon && (
          <span className="inline-flex shrink-0 items-center">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0 items-center">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
