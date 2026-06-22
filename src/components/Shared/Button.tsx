import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
  rel?: string;
  target?: string;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  href,
  disabled = false,
  onClick,
  rel,
  target,
  variant = "primary",
}: ButtonProps) {
  const baseClass =
    "inline-flex h-14 w-full items-center justify-center rounded-full px-6 font-medium transition-all duration-200 hover:scale-[1.02] disabled:opacity-40";
  const disabledClass = disabled ? " opacity-40 pointer-events-none" : "";
  const variantClass =
    variant === "primary"
      ? " bg-black text-white hover:bg-stone-800"
      : " border border-stone-300 bg-white/70 backdrop-blur hover:bg-white";
  const className = `${baseClass}${variantClass}${disabledClass}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}
