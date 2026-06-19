import { useEffect, useState } from "react";
import Hero from "./Hero/Hero";

type IntroPhase = "hidden" | "visible" | "done";

export default function Intro() {
  const [phase, setPhase] = useState<IntroPhase>("hidden");

  useEffect(() => {
    const fadeIn = window.setTimeout(() => setPhase("visible"), 50);
    const fadeOut = window.setTimeout(() => setPhase("hidden"), 1550);
    const reveal = window.setTimeout(() => setPhase("done"), 2250);

    return () => {
      window.clearTimeout(fadeIn);
      window.clearTimeout(fadeOut);
      window.clearTimeout(reveal);
    };
  }, []);

  if (phase === "done") {
    return <Hero />;
  }

  return (
    <section className="flex min-h-svh items-center justify-center text-black">
      <h1
        className={`font-serif text-6xl font-medium leading-none tracking-tight transition-opacity duration-700 sm:text-7xl md:text-8xl ${
          phase === "visible" ? "opacity-100" : "opacity-0"
        }`}
      >
        Vi siger ja
      </h1>
    </section>
  );
}
