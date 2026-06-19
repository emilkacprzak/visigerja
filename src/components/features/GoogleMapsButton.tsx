import { MapPinned } from "lucide-react";
import { wedding } from "../../data/wedding";
import Button from "../ui/Button";

export default function GoogleMapsButton() {
  const mapsUrl = wedding.ceremony.mapsUrl;
  const label = mapsUrl ? "Open in Google Maps" : "Location coming soon";
  const content = (
    <span className="inline-flex items-center gap-2">
      <MapPinned size={20} strokeWidth={1.75} />
      {label}
    </span>
  );

  if (!mapsUrl) {
    return <Button disabled>{content}</Button>;
  }

  return (
    <Button href={mapsUrl} target="_blank" rel="noopener noreferrer">
      {content}
    </Button>
  );
}
