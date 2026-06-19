import { CalendarDays, MapPinned } from "lucide-react";
import Button from "../Shared/Button";
import Section from "../Shared/Section";

export default function Ceremony() {
  return (
    <Section>
      <div className="mx-auto flex w-full max-w-[340px] flex-col items-center py-20 text-center">
        <h2 className="font-serif text-5xl font-medium leading-none tracking-tight text-black">
          🏛️ Ceremony
        </h2>

        <div className="mt-8 space-y-3 text-stone-500">
          <p className="text-lg font-light text-black">Copenhagen City Hall</p>
          <div className="space-y-1 text-base font-light leading-7">
            <p>Rådhuspladsen 1</p>
            <p>1550 København V</p>
            <p>Denmark</p>
          </div>
        </div>

        <div className="mt-10 flex w-full flex-col gap-4">
          <Button variant="primary">
            <span className="inline-flex items-center gap-2">
              <MapPinned className="text-stone-700" size={26} strokeWidth={1.75} />
              Open in Google Maps
            </span>
          </Button>
          <Button variant="secondary">
            <span className="inline-flex items-center gap-2">
              <CalendarDays
                className="text-stone-700"
                size={26}
                strokeWidth={1.75}
              />
              Add to Calendar
            </span>
          </Button>
        </div>
      </div>
    </Section>
  );
}
