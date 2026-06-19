import { wedding } from "../../data/wedding";
import Button from "../Shared/Button";

export default function GoogleMapsButton() {
  const mapsUrl = wedding.ceremony.mapsUrl;

  if (!mapsUrl) {
    return <Button disabled>Location coming soon</Button>;
  }

  return (
    <Button href={mapsUrl} target="_blank" rel="noopener noreferrer">
      Open in Google Maps
    </Button>
  );
}
