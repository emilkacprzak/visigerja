import { useEffect, useState } from "react";

const translations = [
  "We say yes",
  "Mówimy sobie tak",
  "Wir sagen Ja",
  "Wij zeggen ja",
  "Diciamo sì",
  "Казваме да",
];

export default function RotatingTitle() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % translations.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative grid h-6 w-full place-items-center overflow-hidden text-center">
      {translations.map((translation, index) => (
        <p
          key={translation}
          className={`absolute text-sm font-light text-stone-500 transition-all duration-700 ease-out ${
            index === activeIndex
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          }`}
        >
          {translation}
        </p>
      ))}
    </div>
  );
}
