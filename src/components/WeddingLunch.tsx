import { MapPinned, Utensils } from "lucide-react";
import { wedding } from "../data/wedding";
import Button from "./Shared/Button";
import Section from "./Shared/Section";
import PronunciationButton from "./PronunciationButton";

export default function WeddingLunch() {
  return (
    <Section id="celebration">
      <div className="pb-20 text-center sm:pb-24">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#b08d57]/30 bg-white/70 px-6 py-10 shadow-[0_18px_50px_rgba(41,37,36,0.04)] sm:px-12 sm:py-12">
          <Utensils className="mx-auto text-[#b08d57]" size={28} strokeWidth={1.4} aria-hidden="true" />
          <h2 className="mt-5 font-serif text-4xl font-medium leading-tight text-black sm:text-5xl">
            After the Ceremony
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-stone-600 sm:text-lg">
            Following the ceremony and photos, we warmly invite you to join us
            for lunch at Københavner Caféen and celebrate our Wedding Day together.
            It would mean so much to us to share this special moment with you.
          </p>
          <div className="mt-8 border-y border-[#b08d57]/20 py-7">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-500">17 October 2026 · Lunch</p>
            <p className="mt-3 font-serif text-5xl font-medium text-[#987445]">{wedding.lunch.time}</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <h3 className="font-serif text-3xl font-medium text-black">{wedding.lunch.venue}</h3>
              <PronunciationButton />
            </div>
            <p className="mt-2 text-base font-light leading-relaxed text-stone-600">{wedding.lunch.address}</p>
          </div>
          <div className="mx-auto mt-7 flex max-w-[340px] flex-col gap-3">
            <Button href="#menu" variant="secondary">
              <span className="inline-flex items-center gap-2">
                <Utensils size={22} strokeWidth={1.5} aria-hidden="true" />
                View the Menu
              </span>
            </Button>
            <Button href={wedding.lunch.mapsUrl} target="_blank" rel="noopener noreferrer">
              <span className="inline-flex items-center gap-2">
                <MapPinned size={24} strokeWidth={1.75} aria-hidden="true" />
                Open in Google Maps
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
