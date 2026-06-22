import { getAppleCalendarUrl } from "../../lib/eventLinks";
import Button from "./Button";

export default function CalendarButton() {
  return (
    <Button
      variant="secondary"
      href={getAppleCalendarUrl()}
      rel="noopener noreferrer"
    >
      Apple Calendar
    </Button>
  );
}
