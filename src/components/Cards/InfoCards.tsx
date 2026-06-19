import { CalendarDays, Camera, MapPinned } from "lucide-react";
import { content } from "../../data/content";
import { wedding } from "../../data/wedding";
import Section from "../Shared/Section";
import InfoCard from "./InfoCard";

export default function InfoCards() {
  const photosUrl = wedding.photos.uploadUrl || wedding.photos.galleryUrl;

  return (
    <Section>
      <div className="grid grid-cols-1 gap-6 py-20 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard
          title={content.cards.ceremony.title}
          description={content.cards.ceremony.description}
          icon={<MapPinned className="text-stone-700" size={28} strokeWidth={1.75} />}
          href={wedding.ceremony.mapsUrl || undefined}
          disabled={!wedding.ceremony.mapsUrl}
        />

        <InfoCard
          title={content.cards.calendar.title}
          description={content.cards.calendar.description}
          icon={<CalendarDays className="text-stone-700" size={28} strokeWidth={1.75} />}
          href={wedding.links.calendar || undefined}
          disabled={!wedding.links.calendar}
        />

        <InfoCard
          title={content.cards.photos.title}
          description={content.cards.photos.description}
          icon={<Camera className="text-stone-700" size={28} strokeWidth={1.75} />}
          href={photosUrl || undefined}
          disabled={!photosUrl}
        />
      </div>
    </Section>
  );
}
