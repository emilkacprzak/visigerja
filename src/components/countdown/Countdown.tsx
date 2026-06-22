import { useEffect, useRef, useState } from "react";
import countdownBears from "../../assets/illustrations/bears-countdown-easter-egg.webp";
import { wedding } from "../../data/wedding";
import { playWatchTickLoop } from "../../lib/sounds";

function getTimeZoneOffset(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  );
  const zonedTime = Date.UTC(
    values.year,
    values.month - 1,
    values.day,
    values.hour,
    values.minute,
    values.second,
  );

  return zonedTime - date.getTime();
}

function getZonedDateTime(dateValue: string, timeValue: string, timeZone: string) {
  const [year, month, day] = dateValue.split("-").map(Number);
  const [hour = 0, minute = 0] = timeValue.split(":").map(Number);
  const utcTime = Date.UTC(year, month - 1, day, hour, minute);
  const offset = getTimeZoneOffset(new Date(utcTime), timeZone);

  return utcTime - offset;
}

function getCountdown() {
  const target = getZonedDateTime(
    wedding.ceremony.date,
    wedding.ceremony.time || "00:00",
    wedding.ceremony.timeZone,
  );
  const remaining = target - Date.now();
  const totalMinutes = Math.max(Math.ceil(remaining / 1000 / 60), 0);
  const days = Math.floor(totalMinutes / 60 / 24);
  const hours = Math.floor((totalMinutes / 60) % 24);
  const minutes = totalMinutes % 60;

  return { days, hours, minutes, isComplete: remaining <= 0 };
}

function wait(duration: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
}

export default function Countdown() {
  const hasDate = Boolean(wedding.ceremony.date);
  const tapTimes = useRef<number[]>([]);
  const hasSecretPlayed = useRef(false);
  const isSecretRunning = useRef(false);
  const stopTicking = useRef<(() => void) | undefined>(undefined);
  const [time, setTime] = useState(() =>
    hasDate
      ? getCountdown()
      : { days: 0, hours: 0, minutes: 0, isComplete: false },
  );
  const [showSecret, setShowSecret] = useState(false);
  const [isSecretExiting, setIsSecretExiting] = useState(false);

  useEffect(() => {
    if (!hasDate) {
      return;
    }

    const timer = window.setInterval(() => {
      setTime(getCountdown());
    }, 1000);

    return () => window.clearInterval(timer);
  }, [hasDate]);

  const runCountdownSecret = async () => {
    if (hasSecretPlayed.current || isSecretRunning.current) {
      return;
    }

    hasSecretPlayed.current = true;
    isSecretRunning.current = true;
    stopTicking.current = playWatchTickLoop();
    setShowSecret(true);
    await wait(10000);
    setIsSecretExiting(true);
    stopTicking.current?.();
    await wait(400);
    setShowSecret(false);
    setIsSecretExiting(false);
    stopTicking.current = undefined;
    isSecretRunning.current = false;
  };

  const handleTitleTap = () => {
    const now = Date.now();

    tapTimes.current = [...tapTimes.current, now].filter(
      (tapTime) => now - tapTime <= 3000,
    );

    if (tapTimes.current.length >= 3) {
      tapTimes.current = [];
      void runCountdownSecret();
    }
  };

  return (
    <section className="px-6 pb-20 pt-16">
      <style>
        {`
          @keyframes countdown-secret-enter {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.985);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }

          @keyframes countdown-secret-exit {
            0% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.99);
            }
          }

          @keyframes countdown-float {
            0%, 100% {
              transform: translateY(0px) scale(0.99);
            }
            50% {
              transform: translateY(-2px) scale(1);
            }
          }

          @keyframes countdown-tick-pulse {
            0%, 100% {
              transform: scale(1);
            }
            8% {
              transform: scale(1.003);
            }
          }

          .countdown-secret-enter {
            animation: countdown-secret-enter 400ms ease-out 1 both;
          }

          .countdown-secret-exit {
            animation: countdown-secret-exit 400ms ease-in 1 both;
          }

          .countdown-float {
            animation: countdown-float 3.8s ease-in-out infinite;
            transform-origin: center bottom;
          }

          .countdown-tick-pulse {
            animation: countdown-tick-pulse 1s ease-out infinite;
            transform-origin: center;
          }
        `}
      </style>
      <div className="mx-auto max-w-[340px] text-center">
        <h2
          className="font-serif text-5xl font-medium leading-none tracking-tight text-black"
          onClick={handleTitleTap}
        >
          Countdown
        </h2>

        <p className="mt-4 text-base font-light text-stone-500">
          until we say "I do"
        </p>

        <div className="mt-12 rounded-3xl border border-stone-200 bg-white/70 px-6 py-10 shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl">
          {hasDate && time.isComplete ? (
            <p className="font-serif text-3xl font-medium leading-tight text-black">
              Today is our wedding day ❤️
            </p>
          ) : hasDate ? (
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
      {showSecret && (
        <div
          className={`pointer-events-none fixed left-1/2 top-1/2 z-50 w-[min(86vw,360px)] ${
            isSecretExiting ? "countdown-secret-exit" : "countdown-secret-enter"
          }`}
        >
          <div className="countdown-tick-pulse">
            <img
              src={countdownBears}
              alt=""
              className="countdown-float h-auto w-full select-none drop-shadow-[0_26px_60px_rgba(0,0,0,0.12)]"
              draggable={false}
            />
          </div>
        </div>
      )}
    </section>
  );
}
