import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
}

export default function Section({ children }: SectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 lg:px-8">
      {children}
    </section>
  );
}
