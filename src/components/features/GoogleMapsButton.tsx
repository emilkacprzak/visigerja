import { MapPinned } from "lucide-react";
import { weddingEvent } from "../../lib/eventLinks";
import Button from "../ui/Button";

export default function GoogleMapsButton() {
  return (
    <Button href={weddingEvent.mapsUrl} target="_blank" rel="noopener noreferrer">
      <span className="inline-flex items-center gap-2">
        <MapPinned size={20} strokeWidth={1.75} />
        Open in Google Maps
      </span>
    </Button>
  );
}
