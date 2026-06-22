import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function Section({ children, id, className }: SectionProps) {
  return (
    <section
      id={id}
      className={["mx-auto max-w-6xl px-6 lg:px-8", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </section>
  );
}
