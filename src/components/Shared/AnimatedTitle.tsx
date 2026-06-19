import { useEffect, useMemo, useState } from "react";

interface AnimatedTitleProps {
  text: string;
}

export default function AnimatedTitle({ text }: AnimatedTitleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const letters = useMemo(() => Array.from(text), [text]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));

    return () => cancelAnimationFrame(frame);
  }, [text]);

  return (
    <span aria-label={text} className="inline-block">
      {letters.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          aria-hidden="true"
          className={`inline-block transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          } ${letter === " " ? "w-[0.28em]" : ""}`}
          style={{ transitionDelay: `${index * 40}ms` }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </span>
  );
}
