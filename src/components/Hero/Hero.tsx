import { useEffect, useState } from "react";
import HeroIllustration from "./HeroIllustration";
import RotatingTitle from "./RotatingTitle";
import Section from "../Shared/Section";
import { content } from "../../data/content";
import { wedding } from "../../data/wedding";

export default function Hero() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const ceremonyDate = wedding.ceremony.date || content.hero.detailsComingSoon;
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
      className="relative flex min-h-[82svh] items-center py-2 text-black"
      aria-labelledby="hero-heading"
    >
      <Section>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center text-center">
          <div className="flex aspect-square w-full max-w-80 items-center justify-center text-7xl sm:max-w-md sm:text-8xl">
            <HeroIllustration />
          </div>

          <div className="mt-5">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-stone-500 sm:text-sm">
              {content.hero.country}
            </p>
            <h1 className="mt-4 font-serif text-6xl font-medium leading-none tracking-tight text-black sm:text-7xl md:text-8xl">
              {content.hero.title}
            </h1>
            <div className="mt-1.5">
              <RotatingTitle />
            </div>
          </div>

          <div className="mt-8 text-sm font-light text-stone-500 sm:text-lg">
            <p className="text-center font-['Great_Vibes',cursive] text-[2.575rem] font-normal leading-none text-stone-800">
              {coupleNames}
            </p>

            <div className="mt-4 space-y-1">
              <p>{ceremonyDate}</p>
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
