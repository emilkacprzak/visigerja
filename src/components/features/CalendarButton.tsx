import { CalendarDays } from "lucide-react";
import { wedding } from "../../data/wedding";
import Button from "../ui/Button";

function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function formatDateTime(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  const hours = String(value.getHours()).padStart(2, "0");
  const minutes = String(value.getMinutes()).padStart(2, "0");

  return `${year}${month}${day}T${hours}${minutes}00`;
}

function createCalendarFile() {
  const startDate = new Date(
    `${wedding.ceremony.date} ${wedding.ceremony.time || "12:00"}`,
  );
  const endDate = new Date(startDate);
  const title = wedding.title;
  const location = [wedding.ceremony.venue, wedding.ceremony.address]
    .filter(Boolean)
    .join(", ");

  endDate.setHours(endDate.getHours() + 2);

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Visigerja//Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@visigerja`,
    `SUMMARY:${escapeIcsText(title)}`,
    `LOCATION:${escapeIcsText(location)}`,
    `DTSTART:${formatDateTime(startDate)}`,
    `DTEND:${formatDateTime(endDate)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export default function CalendarButton() {
  const hasDate = Boolean(wedding.ceremony.date);
  const content = (
    <span className="inline-flex items-center gap-2">
      <CalendarDays size={20} strokeWidth={1.75} />
      {hasDate ? "Add to Calendar" : "Date coming soon"}
    </span>
  );

  const handleDownload = () => {
    if (!hasDate) {
      return;
    }

    const calendar = createCalendarFile();
    const blob = new Blob([calendar], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "wedding.ics";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="secondary" disabled={!hasDate} onClick={handleDownload}>
      {content}
    </Button>
  );
}
