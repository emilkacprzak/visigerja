export const weddingEvent = {
  title: "Wedding of Emil & Karol",
  location: "Copenhagen City Hall, Rådhuspladsen 1, 1550 København V, Denmark",
  description: "Wedding ceremony at Copenhagen City Hall.",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Copenhagen%20City%20Hall%2C%20R%C3%A5dhuspladsen%201%2C%201550%20K%C3%B8benhavn%20V%2C%20Denmark",
  googleCalendarUrl:
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding%20of%20Emil%20%26%20Karol&dates=20261017T100000/20261017T110000&ctz=Europe%2FCopenhagen&details=Wedding%20ceremony%20at%20Copenhagen%20City%20Hall.&location=Copenhagen%20City%20Hall%2C%20R%C3%A5dhuspladsen%201%2C%201550%20K%C3%B8benhavn%20V%2C%20Denmark",
};

export function getAppleCalendarUrl() {
  return `${import.meta.env.BASE_URL}emil-karol-wedding.ics`;
}
