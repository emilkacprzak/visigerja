import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  href,
  disabled = false,
  variant = "primary",
}: ButtonProps) {
  const baseClass =
    "rounded-full px-6 py-3 transition-all duration-300 disabled:opacity-40";
  const disabledClass = disabled ? " opacity-40 pointer-events-none" : "";
  const variantClass =
    variant === "primary"
      ? " bg-stone-900 text-white hover:bg-stone-800"
      : " border border-stone-300 bg-white/70 backdrop-blur hover:bg-white";
  const className = `${baseClass}${variantClass}${disabledClass}`;

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" disabled={disabled} className={className}>
      {children}
    </button>
  );
}
