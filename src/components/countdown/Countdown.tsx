import { useEffect, useState } from "react";
import { wedding } from "../../data/wedding";

function getCountdown() {
  const target = new Date(
    `${wedding.ceremony.date} ${wedding.ceremony.time || "00:00"}`,
  ).getTime();
  const remaining = Math.max(target - Date.now(), 0);
  const totalMinutes = Math.floor(remaining / 1000 / 60);
  const days = Math.floor(totalMinutes / 60 / 24);
  const hours = Math.floor((totalMinutes / 60) % 24);
  const minutes = totalMinutes % 60;

  return { days, hours, minutes };
}

export default function Countdown() {
  const hasDate = Boolean(wedding.ceremony.date);
  const [time, setTime] = useState(() =>
    hasDate ? getCountdown() : { days: 0, hours: 0, minutes: 0 },
  );

  useEffect(() => {
    if (!hasDate) {
      return;
    }

    const timer = window.setInterval(() => {
      setTime(getCountdown());
    }, 60000);

    return () => window.clearInterval(timer);
  }, [hasDate]);

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[340px] text-center">
        <h2 className="font-serif text-5xl font-medium leading-none tracking-tight text-black">
          Countdown
        </h2>

        <p className="mt-4 text-base font-light text-stone-500">
          until we say "I do"
        </p>

        <div className="mt-12 rounded-3xl border border-stone-200 bg-white/70 px-6 py-10 shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl">
          {hasDate ? (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="text-3xl font-light text-black">{time.days}</p>
                <p className="mt-1 text-xs font-light text-stone-500">days</p>
              </div>
              <div>
                <p className="text-3xl font-light text-black">{time.hours}</p>
                <p className="mt-1 text-xs font-light text-stone-500">hours</p>
              </div>
              <div>
                <p className="text-3xl font-light text-black">{time.minutes}</p>
                <p className="mt-1 text-xs font-light text-stone-500">minutes</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-base font-light text-stone-500">
                Countdown coming soon
              </p>
              <p className="text-sm font-light leading-6 text-stone-500">
                The countdown will begin once we announce our date.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
