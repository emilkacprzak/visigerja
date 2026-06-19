import { Hotel, Plane } from "lucide-react";
import Button from "../Shared/Button";
import Section from "../Shared/Section";

const cards = [
  {
    icon: <Plane className="text-stone-700" size={26} strokeWidth={1.75} />,
    title: "Flights",
    text: "Find the best flights to Copenhagen.",
    button: "Search on Google Flights",
    href: "https://www.google.com/travel/flights",
  },
  {
    icon: <Hotel className="text-stone-700" size={26} strokeWidth={1.75} />,
    title: "Hotels",
    text: "Find accommodation in Copenhagen.",
    button: "Search on Booking.com",
    href: "https://www.booking.com/searchresults.html?ss=Copenhagen",
  },
];

export default function Travel() {
  return (
    <Section>
      <div className="mx-auto flex w-full max-w-[340px] flex-col items-center py-20 text-center">
        <h2 className="font-serif text-5xl font-medium leading-none tracking-tight text-black">
          Travel
        </h2>

        <div className="mt-12 flex w-full flex-col gap-6">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-3xl border border-stone-200 bg-white/70 p-6 text-center shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-700">
                {card.icon}
              </div>

              <h3 className="mt-5 font-serif text-3xl font-medium leading-none tracking-tight text-black">
                {card.title}
              </h3>

              <p className="mt-4 text-base font-light leading-7 text-stone-500">
                {card.text}
              </p>

              <div className="mt-6">
                <Button
                  variant="secondary"
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {card.button}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
