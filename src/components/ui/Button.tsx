import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

const variantStyles = {
  primary:
    "bg-gsm-red text-white shadow-lg shadow-gsm-red/25 hover:brightness-110 focus-visible:ring-gsm-red",
  secondary:
    "border-2 border-gsm-navy/15 bg-white text-gsm-navy hover:border-gsm-blue hover:text-gsm-blue focus-visible:ring-gsm-navy",
  outline:
    "border-2 border-white/30 bg-transparent text-white hover:bg-white/10 focus-visible:ring-white",
  ghost:
    "bg-gsm-navy/5 text-gsm-navy hover:bg-gsm-navy/10 focus-visible:ring-gsm-navy",
} as const;

type ButtonVariant = keyof typeof variantStyles;

type ButtonBaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeStyles = {
  sm: "px-5 py-2 text-sm",
  md: "px-8 py-3.5 text-sm",
  lg: "px-10 py-4 text-base",
} as const;

type ButtonAsLink = ButtonBaseProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonBaseProps | "href">;

type ButtonAsButton = ButtonBaseProps & {
  href?: undefined;
} & ComponentPropsWithoutRef<"button">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

function buttonClassName(
  variant: ButtonVariant,
  size: keyof typeof sizeStyles,
  className?: string,
) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gsm-light",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: ButtonProps) {
  const classes = buttonClassName(variant, size, className);

  if (href) {
    const linkProps = props as Omit<ButtonAsLink, keyof ButtonBaseProps | "href">;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props as ButtonAsButton;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
