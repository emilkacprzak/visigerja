import { CalendarDays, Camera, MapPinned } from "lucide-react";
import { wedding } from "../../data/wedding";
import { getAppleCalendarUrl, weddingEvent } from "../../lib/eventLinks";
import Section from "../Shared/Section";
import InfoCard from "./InfoCard";

export default function InfoCards() {
  const photosUrl = wedding.photos.uploadUrl || wedding.photos.galleryUrl;

  return (
    <Section>
      <div className="grid grid-cols-1 gap-6 py-20 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard
          title="Ceremony"
          description="Open in Google Maps"
          icon={<MapPinned className="text-stone-700" size={28} strokeWidth={1.75} />}
          href={weddingEvent.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        />

        <InfoCard
          title="Calendar"
          description="Apple Calendar"
          icon={<CalendarDays className="text-stone-700" size={28} strokeWidth={1.75} />}
          href={getAppleCalendarUrl()}
          rel="noopener noreferrer"
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
