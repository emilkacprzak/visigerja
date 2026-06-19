import Section from "../Shared/Section";

const items = [
  {
    title: "Ceremony",
    lines: ["Date to be announced", "Copenhagen City Hall"],
  },
  {
    title: "Photos",
    lines: ["Share memories together"],
  },
  {
    title: "Celebration",
    lines: ["Details coming soon"],
  },
  {
    title: "Thank You",
    lines: ["Thank you for celebrating with us"],
  },
];

export default function Timeline() {
  return (
    <Section>
      <div className="py-20 sm:py-24">
        <h2 className="text-center font-serif text-5xl font-medium tracking-normal text-black sm:text-6xl">
          The Day
        </h2>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 sm:mt-12">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-stone-200 bg-stone-50/80 p-6 text-center shadow-[0_18px_50px_rgba(41,37,36,0.06)] backdrop-blur sm:p-8"
            >
              <h3 className="font-serif text-3xl font-medium text-black sm:text-4xl">
                {item.title}
              </h3>

              <div className="mt-3 space-y-1 text-base font-light text-stone-600 sm:text-lg">
                {item.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
