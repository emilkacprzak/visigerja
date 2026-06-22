import { CalendarDays } from "lucide-react";
import { getAppleCalendarUrl } from "../../lib/eventLinks";
import Button from "../ui/Button";

export default function CalendarButton() {
  return (
    <Button
      variant="secondary"
      href={getAppleCalendarUrl()}
      rel="noopener noreferrer"
    >
      <span className="inline-flex items-center gap-2">
        <CalendarDays size={20} strokeWidth={1.75} />
        Apple Calendar
      </span>
    </Button>
  );
}
