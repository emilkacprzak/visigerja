import Bears from "./Bears";
import Button from "../Shared/Button";
import Section from "../Shared/Section";
import Heading from "../ui/Heading";
import { wedding } from "../../data/wedding";

export default function Hero() {
  const ceremonyDate = wedding.ceremony.date || "Coming soon";
  const coupleNames = `${wedding.couple.partner1} & ${wedding.couple.partner2}`;

  return (
    <section
      className="min-h-screen bg-stone-50 px-6 py-6 text-black sm:px-8 lg:px-12"
      aria-labelledby="hero-heading"
    >
      <Section>
        <div className="mx-auto flex min-h-svh max-w-6xl flex-col items-center justify-center text-center">
          <div className="flex aspect-square w-full max-w-xs items-center justify-center rounded-3xl border border-stone-200 bg-white/40 text-7xl shadow-2xl shadow-stone-300/40 backdrop-blur-xl sm:text-8xl">
            <Bears />
          </div>

          <div className="mt-10">
            <Heading title="Vi siger ja" subtitle="COPENHAGEN · DENMARK" />
          </div>

          <div className="mt-6 space-y-2 text-base font-light text-stone-700 sm:text-lg">
            <p className="text-xl text-black sm:text-2xl">{coupleNames}</p>
            <p>{ceremonyDate}</p>
            <p>{wedding.ceremony.venue}</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              href={wedding.ceremony.mapsUrl || undefined}
              disabled={!wedding.ceremony.mapsUrl}
            >
              Open Maps
            </Button>

            <Button
              variant="secondary"
              href={wedding.photos.galleryUrl || undefined}
              disabled={!wedding.photos.galleryUrl}
            >
              Photos
            </Button>
          </div>
        </div>
      </Section>
    </section>
  );
}
