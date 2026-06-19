import { useEffect, useState } from "react";
import Bears from "./Bears";
import CalendarButton from "../Shared/CalendarButton";
import Section from "../Shared/Section";
import GoogleMapsButton from "../features/GoogleMapsButton";
import Heading from "../ui/Heading";
import { wedding } from "../../data/wedding";

export default function Hero() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const ceremonyDate = wedding.ceremony.date || "Date to be announced";
  const coupleNames = `${wedding.couple.partner1} & ${wedding.couple.partner2}`;

  useEffect(() => {
    const revealIndicator = window.setTimeout(() => {
      setShowScrollIndicator(true);
    }, 1000);

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(revealIndicator);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      className="relative flex min-h-svh items-center py-3 text-black sm:py-4"
      aria-labelledby="hero-heading"
    >
      <Section>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center text-center">
          <div className="flex aspect-square w-full max-w-80 items-center justify-center text-7xl sm:max-w-md sm:text-8xl">
            <Bears />
          </div>

          <div className="mt-8">
            <Heading title="Vi siger ja" subtitle="COPENHAGEN · DENMARK" />
          </div>

          <div className="mt-5 text-sm font-light text-stone-500 sm:text-lg">
            <p className="text-base text-black sm:text-xl">{coupleNames}</p>

            <div className="mt-4 space-y-1">
              <p>{ceremonyDate}</p>
              <p>{wedding.ceremony.venue}</p>
            </div>
          </div>

          <div className="mt-5 flex w-full max-w-xs flex-col items-center justify-center gap-3 sm:mt-6 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">
            <GoogleMapsButton />

            <CalendarButton />
          </div>

          <div
            className={`mt-4 text-xl font-light text-stone-400 transition-opacity duration-700 motion-safe:animate-pulse ${
              showScrollIndicator && !hasScrolled ? "opacity-70" : "opacity-0"
            }`}
            aria-hidden="true"
          >
            ↓
          </div>
        </div>
      </Section>
    </section>
  );
}
