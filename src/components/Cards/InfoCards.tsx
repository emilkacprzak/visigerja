import { CalendarDays, Camera, MapPinned } from "lucide-react";
import { wedding } from "../../data/wedding";
import Section from "../Shared/Section";
import InfoCard from "./InfoCard";

export default function InfoCards() {
  const photosUrl = wedding.photos.uploadUrl || wedding.photos.galleryUrl;

  return (
    <Section>
      <div className="grid grid-cols-1 gap-6 py-20 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard
          title="Ceremony"
          description="Open in Apple Maps"
          icon={<MapPinned className="text-stone-700" size={28} strokeWidth={1.75} />}
          href={wedding.ceremony.mapsUrl || undefined}
          disabled={!wedding.ceremony.mapsUrl}
        />

        <InfoCard
          title="Calendar"
          description="Save the date"
          icon={<CalendarDays className="text-stone-700" size={28} strokeWidth={1.75} />}
          href={wedding.links.calendar || undefined}
          disabled={!wedding.links.calendar}
        />

        <InfoCard
          title="Photos"
          description="Share your memories"
          icon={<Camera className="text-stone-700" size={28} strokeWidth={1.75} />}
          href={photosUrl || undefined}
          disabled={!photosUrl}
        />
      </div>
    </Section>
  );
}
