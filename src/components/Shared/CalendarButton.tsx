import { wedding } from "../../data/wedding";
import Button from "./Button";

function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function formatDate(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

function formatDateTime(value: Date) {
  const hours = String(value.getHours()).padStart(2, "0");
  const minutes = String(value.getMinutes()).padStart(2, "0");

  return `${formatDate(value)}T${hours}${minutes}00`;
}

function createCalendarFile() {
  const dateValue = wedding.ceremony.date;
  const timeValue = wedding.ceremony.time;
  const date = new Date(`${dateValue}${timeValue ? ` ${timeValue}` : ""}`);
  const endDate = new Date(date);
  const title = `${wedding.couple.partner1} & ${wedding.couple.partner2} Wedding Ceremony`;
  const location = [wedding.ceremony.venue, wedding.ceremony.address]
    .filter(Boolean)
    .join(", ");

  if (timeValue) {
    endDate.setHours(endDate.getHours() + 1);
  } else {
    endDate.setDate(endDate.getDate() + 1);
  }

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Visigerja//Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@visigerja`,
    `SUMMARY:${escapeIcsText(title)}`,
    timeValue
      ? `DTSTART:${formatDateTime(date)}`
      : `DTSTART;VALUE=DATE:${formatDate(date)}`,
    timeValue
      ? `DTEND:${formatDateTime(endDate)}`
      : `DTEND;VALUE=DATE:${formatDate(endDate)}`,
    `LOCATION:${escapeIcsText(location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export default function CalendarButton() {
  const hasDate = Boolean(wedding.ceremony.date);

  const handleDownload = () => {
    if (!hasDate) {
      return;
    }

    const calendar = createCalendarFile();
    const blob = new Blob([calendar], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "emil-karol-wedding.ics";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="secondary" disabled={!hasDate} onClick={handleDownload}>
      {hasDate ? "Add to Calendar" : "Date coming soon"}
    </Button>
  );
}
