import { useEffect, useState } from "react";
import HeroIllustration from "./HeroIllustration";
import RotatingTitle from "./RotatingTitle";
import Section from "../Shared/Section";
import { content } from "../../data/content";

export default function Hero() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

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
      id="home"
      className="relative flex min-h-[86svh] items-start pb-8 pt-24 text-black sm:pt-28 lg:pt-32"
      aria-labelledby="hero-heading"
    >
      <Section>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center text-center">
          <div className="flex aspect-square w-full max-w-80 items-center justify-center text-7xl sm:max-w-md sm:text-8xl">
            <HeroIllustration />
          </div>

          <div className="mt-5">
            <h1
              id="hero-heading"
              className="font-serif text-6xl font-medium leading-none tracking-tight text-black sm:text-7xl md:text-8xl"
            >
              {content.hero.title}
            </h1>
            <div className="mt-1.5">
              <RotatingTitle />
            </div>
          </div>

          <div
            className={`mt-3 text-xl font-light text-stone-400 transition-opacity duration-700 motion-safe:animate-pulse ${
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
