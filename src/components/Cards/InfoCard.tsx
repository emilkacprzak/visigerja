import type { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href?: string;
  disabled?: boolean;
}

export default function InfoCard({
  title,
  description,
  icon,
  href,
  disabled = false,
}: InfoCardProps) {
  const className = `block rounded-3xl border border-stone-200 bg-white/70 p-6 backdrop-blur-xl transition-all duration-300 ${
    href && !disabled
      ? "hover:-translate-y-1 hover:shadow-xl"
      : "pointer-events-none opacity-50"
  }`;

  const content = (
    <>
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-900">
        {icon}
      </div>

      <h3 className="font-serif text-3xl font-bold text-black">{title}</h3>
      <p className="mt-3 text-base font-light leading-7 text-stone-500">
        {description}
      </p>
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return <article className={className}>{content}</article>;
}
