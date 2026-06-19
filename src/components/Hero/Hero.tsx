import Bears from "./Bears";
import Button from "../Shared/Button";
import Section from "../Shared/Section";
import { wedding } from "../../data/wedding";

export default function Hero() {
  const ceremonyDate = wedding.ceremony.date || "Coming soon";
  const coupleNames = `${wedding.couple.partner1} & ${wedding.couple.partner2}`;

  return (
    <section
      className="min-h-screen bg-stone-50 px-6 py-10 text-black sm:px-8 lg:px-12"
      aria-labelledby="hero-heading"
    >
      <Section>
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-[1100px] flex-col items-center justify-center text-center">
          <div className="flex aspect-square w-full max-w-[360px] items-center justify-center rounded-3xl border border-stone-200 bg-white/40 text-7xl shadow-2xl shadow-stone-300/40 backdrop-blur-xl sm:text-8xl">
            <Bears />
          </div>

          <p className="mt-12 text-xs font-medium uppercase tracking-[0.32em] text-stone-500 sm:text-sm">
            COPENHAGEN · DENMARK
          </p>

          <h1
            id="hero-heading"
            className="mt-5 font-serif text-7xl font-medium leading-none tracking-normal text-black sm:text-8xl md:text-9xl lg:text-[10rem]"
          >
            {wedding.title}
          </h1>

          <div className="mt-8 space-y-3 text-base font-light text-stone-700 sm:text-lg">
            <p className="text-xl text-black sm:text-2xl">{coupleNames}</p>
            <p>{ceremonyDate}</p>
            <p>{wedding.ceremony.venue}</p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
