import { useEffect, useRef, useState } from "react";
import { Hotel, Plane } from "lucide-react";
import hotelSleepEasterEgg from "../../assets/illustrations/bears-hotel-sleep-easter-egg.webp";
import planeEasterEgg from "../../assets/illustrations/bears-plane-easter-egg.webp";
import { playAirplaneTakeoff } from "../../lib/sounds";
import Button from "../Shared/Button";
import Section from "../Shared/Section";

const cards = [
  {
    icon: <Plane className="text-stone-700" size={26} strokeWidth={1.75} />,
    title: "Flights",
    text: "Find the best flights to Copenhagen.",
    button: "Search on Google Flights",
    href: "https://www.google.com/travel/flights",
  },
  {
    icon: <Hotel className="text-stone-700" size={26} strokeWidth={1.75} />,
    title: "Hotels",
    text: "Find accommodation in Copenhagen.",
    button: "Search on Booking.com",
    href: "https://www.booking.com/searchresults.html?ss=Copenhagen",
  },
];

export default function Travel() {
  const tapTimes = useRef<number[]>([]);
  const hasPlayed = useRef(false);
  const hotelTapTimes = useRef<number[]>([]);
  const hasHotelPlayed = useRef(false);
  const snoringAudio = useRef<HTMLAudioElement | undefined>(undefined);
  const snoringFadeTimer = useRef<number | undefined>(undefined);
  const [showPlane, setShowPlane] = useState(false);
  const [showHotelSleep, setShowHotelSleep] = useState(false);
  const [isHotelSleepLeaving, setIsHotelSleepLeaving] = useState(false);

  const clearSnoringFade = () => {
    if (snoringFadeTimer.current) {
      window.clearInterval(snoringFadeTimer.current);
      snoringFadeTimer.current = undefined;
    }
  };

  const fadeSnoringVolume = (
    audio: HTMLAudioElement,
    targetVolume: number,
    duration: number,
    onComplete?: () => void,
  ) => {
    const startVolume = audio.volume;
    const startTime = performance.now();

    clearSnoringFade();
    snoringFadeTimer.current = window.setInterval(() => {
      const progress = Math.min((performance.now() - startTime) / duration, 1);

      audio.volume = startVolume + (targetVolume - startVolume) * progress;

      if (progress >= 1) {
        clearSnoringFade();
        onComplete?.();
      }
    }, 16);
  };

  const startSnoring = () => {
    if (snoringAudio.current) {
      return;
    }

    const audio = new Audio("/audio/bears-snoring-web.mp3");

    audio.preload = "auto";
    audio.volume = 0;
    audio.loop = true;
    snoringAudio.current = audio;

    window.requestAnimationFrame(() => {
      void audio
        .play()
        .then(() => {
          fadeSnoringVolume(audio, 0.65, 300);
        })
        .catch(() => {
          audio.pause();
          audio.currentTime = 0;
          snoringAudio.current = undefined;
        });
    });
  };

  const stopSnoring = () => {
    const audio = snoringAudio.current;

    if (!audio) {
      return;
    }

    fadeSnoringVolume(audio, 0, 500, () => {
      audio.pause();
      audio.currentTime = 0;
      snoringAudio.current = undefined;
    });
  };

  useEffect(() => {
    return () => {
      clearSnoringFade();

      if (snoringAudio.current) {
        snoringAudio.current.pause();
        snoringAudio.current.currentTime = 0;
        snoringAudio.current = undefined;
      }
    };
  }, []);

  const handleTitleTap = () => {
    if (hasPlayed.current) {
      return;
    }

    const now = Date.now();
    tapTimes.current = [...tapTimes.current, now].filter(
      (tapTime) => now - tapTime <= 3000,
    );

    if (tapTimes.current.length >= 3) {
      hasPlayed.current = true;
      setShowPlane(true);
      playAirplaneTakeoff();

      window.setTimeout(() => {
        setShowPlane(false);
      }, 9800);
    }
  };

  const handleHotelTitleTap = () => {
    if (hasHotelPlayed.current) {
      return;
    }

    const now = Date.now();
    hotelTapTimes.current = [...hotelTapTimes.current, now].filter(
      (tapTime) => now - tapTime <= 3000,
    );

    if (hotelTapTimes.current.length >= 3) {
      hasHotelPlayed.current = true;
      setShowHotelSleep(true);
      startSnoring();
      window.setTimeout(() => {
        setIsHotelSleepLeaving(true);
        stopSnoring();
      }, 10000);
      window.setTimeout(() => {
        setShowHotelSleep(false);
        setIsHotelSleepLeaving(false);
      }, 10400);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes travel-plane-flight {
            0% {
              opacity: 1;
              transform: translate3d(-135vw, 30vh, 0);
            }
            18% {
              transform: translate3d(-72vw, 27vh, 0);
            }
            50% {
              transform: translate3d(-50%, 25vh, 0);
            }
            82% {
              transform: translate3d(72vw, 27vh, 0);
            }
            96% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: translate3d(135vw, 30vh, 0);
            }
          }

          @keyframes travel-plane-bob {
            0%, 100% {
              transform: translateY(0px) rotate(-2deg);
            }
            50% {
              transform: translateY(-4px) rotate(3deg);
            }
          }

          @keyframes travel-plane-heart-shimmer {
            0%, 43%, 58%, 100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.96);
            }
            50% {
              opacity: 0.22;
              transform: translate(-50%, -50%) scale(1.04);
            }
          }

          .travel-plane-flight {
            animation: travel-plane-flight 9.8s ease-in-out 1;
          }

          .travel-plane-bob {
            animation: travel-plane-bob 2.4s ease-in-out infinite;
          }

          .travel-plane-heart-shimmer {
            animation: travel-plane-heart-shimmer 9.8s ease-in-out 1;
          }

          @keyframes hotel-sleep-float {
            0%, 100% {
              transform: translate(-50%, -50%) translateY(0px) scale(0.99);
            }
            50% {
              transform: translate(-50%, -50%) translateY(-2px) scale(1);
            }
          }

          .hotel-sleep-float {
            animation: hotel-sleep-float 4.8s ease-in-out infinite;
          }
        `}
      </style>

      {showPlane && (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
          <div className="travel-plane-flight absolute left-1/2 top-0 w-[220px]">
            <div className="travel-plane-bob relative">
              <img
                src={planeEasterEgg}
                alt=""
                className="h-auto w-full select-none drop-shadow-[0_18px_38px_rgba(0,0,0,0.12)]"
                draggable={false}
              />
              <div className="travel-plane-heart-shimmer absolute left-[55%] top-[35%] h-14 w-14 rounded-full bg-[#D4AF37]/25 blur-xl" />
            </div>
          </div>
        </div>
      )}

      <Section>
        <div className="mx-auto flex w-full max-w-[340px] flex-col items-center py-20 text-center">
          <h2 className="font-serif text-5xl font-medium leading-none tracking-tight text-black">
            Travel
          </h2>

          <div className="mt-12 flex w-full flex-col gap-6">
            {cards.map((card) => (
              <article
                key={card.title}
                className="relative rounded-3xl border border-stone-200 bg-white/70 p-6 text-center shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl"
              >
                {card.title === "Hotels" && showHotelSleep && (
                  <div
                    className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-400 ${
                      isHotelSleepLeaving ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <img
                      src={hotelSleepEasterEgg}
                      alt=""
                      className="hotel-sleep-float w-[86%] select-none rounded-3xl shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
                      draggable={false}
                    />
                  </div>
                )}
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-700">
                  {card.icon}
                </div>

                <h3
                  className="mt-5 font-serif text-3xl font-medium leading-none tracking-tight text-black"
                  onClick={
                    card.title === "Flights"
                      ? handleTitleTap
                      : card.title === "Hotels"
                        ? handleHotelTitleTap
                        : undefined
                  }
                >
                  {card.title}
                </h3>

                <p className="mt-4 text-base font-light leading-7 text-stone-500">
                  {card.text}
                </p>

                <div className="mt-6">
                  <Button
                    variant="secondary"
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {card.button}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
