import Link from "next/link";
import { twMerge } from "tailwind-merge";

const VARIANTS = {
  primary: "bg-brand-gradient text-foreground",

  outline:
    "border-2 border-brand-primary bg-transparent text-foreground hover:bg-brand-gradient",

  white:
    "bg-foreground text-black hover:bg-brand-primary hover:text-foreground",
};

export function Button({
  href,
  type = "button",
  disabled = false,
  variant = "primary",
  children,
  className = "",
  onClick,
  ...props
}) {
  const classes = twMerge(
    "inline-flex min-h-[66px] min-w-[220px] items-center justify-center rounded-[10px] px-4 text-base font-medium transition cursor-pointer",
    VARIANTS[variant] || VARIANTS.primary,
    disabled && "cursor-not-allowed opacity-50",
    className
  );

  // NAVIGATION LINK
  if (href && type !== "submit" && !disabled) {
    return (
      <Link
        {...props}
        href={href}
        onClick={onClick}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  // NORMAL BUTTON / POPUP / FORM SUBMIT
  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}