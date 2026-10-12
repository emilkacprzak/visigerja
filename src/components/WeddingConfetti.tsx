import { useEffect, useState, type CSSProperties } from "react";

const START = Date.parse("2026-10-16T10:00:00+02:00");
const END = Date.parse("2026-10-19T00:00:00+02:00");
const particles = Array.from({ length: 44 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  delay: `${(index % 8) * 0.07}s`,
  drift: `${((index * 29) % 180) - 90}px`,
  turn: `${index % 2 ? 280 : -240}deg`,
  heart: index % 9 === 0,
  color: index % 3 === 0 ? "#fffdf7" : index % 3 === 1 ? "#c5a15c" : "#e5d4af",
}));

export default function WeddingConfetti() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let hideTimer: number | undefined;
    let shownDay = "";
    const check = () => {
      const now = Date.now();
      if (now < START || now >= END || reducedMotion.matches || document.hidden) return;
      const day = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Europe/Copenhagen", year: "numeric", month: "2-digit", day: "2-digit",
      }).format(new Date(now));
      if (shownDay === day) return;
      const key = `wedding-confetti-${day}`;
      try {
        if (localStorage.getItem(key)) return;
        localStorage.setItem(key, "shown");
      } catch { /* Still celebrate when browser storage is unavailable. */ }
      shownDay = day;
      setVisible(true);
      hideTimer = window.setTimeout(() => setVisible(false), 4000);
    };
    check();
    const interval = window.setInterval(check, 1000);
    document.addEventListener("visibilitychange", check);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(hideTimer);
      document.removeEventListener("visibilitychange", check);
    };
  }, []);

  if (!visible) return null;
  return (
    <div className="wedding-confetti" aria-hidden="true">
      {particles.map((particle, index) => (
        <span key={index} className={particle.heart ? "wedding-confetti-heart" : "wedding-confetti-piece"}
          style={{ left: particle.left, color: particle.color, backgroundColor: particle.heart ? "transparent" : particle.color,
            animationDelay: particle.delay, "--drift": particle.drift, "--turn": particle.turn } as CSSProperties}>
          {particle.heart ? "♥" : ""}
        </span>
      ))}
    </div>
  );
}
