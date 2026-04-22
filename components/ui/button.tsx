import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 py-2 text-xs",
  md: "min-h-11 px-6 py-2.5 text-sm",
  lg: "min-h-11 px-8 py-3.5 text-base",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-navy-deepest hover:bg-gold-light font-semibold",
  ghost:
    "border border-gold text-gold hover:bg-gold/10 font-medium",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-sm tracking-wide transition-colors duration-200 cursor-pointer font-sans ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
