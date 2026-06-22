import { wedding } from "../../data/wedding";
import Section from "../Shared/Section";

const ceremonyCards = [
  {
    label: "Date",
    value: "17 October 2026",
  },
  {
    label: "Time",
    value: wedding.ceremony.time,
  },
  {
    label: "Venue",
    value: wedding.ceremony.venue,
  },
  {
    label: "Location",
    value: wedding.ceremony.address,
  },
];

export default function WeddingCeremony() {
  return (
    <Section id="wedding">
      <div className="mx-auto w-full pb-20 pt-16 text-center">
        <h2 className="font-serif text-5xl font-medium leading-none tracking-tight text-black">
          Wedding Ceremony
        </h2>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ceremonyCards.map((card) => (
            <article
              key={card.label}
              className="rounded-3xl border border-stone-200 bg-white/70 px-5 py-8 text-center backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-stone-300 hover:bg-white/85 hover:shadow-[0_18px_50px_rgba(0,0,0,0.06)]"
            >
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-400">
                {card.label}
              </p>
              <p className="mt-5 font-serif text-3xl font-medium leading-tight text-black">
                {card.value}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
