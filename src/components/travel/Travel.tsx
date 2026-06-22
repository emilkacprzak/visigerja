import { useEffect, useRef, useState } from "react";
import { Hotel, Plane } from "lucide-react";
import hotelSleepEasterEgg from "../../assets/illustrations/bears-hotel-sleep-easter-egg.webp";
import planeEasterEgg from "../../assets/illustrations/bears-plane-easter-egg.webp";
import travelEasterEgg from "../../assets/illustrations/bears-travel-easter-egg.webp";
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
    title: "Accommodation",
    text: "Find accommodation in Copenhagen.",
    button: "Search on Booking.com",
    href: "https://www.booking.com/searchresults.html?ss=Copenhagen",
  },
];

export default function Travel() {
  const travelTapTimes = useRef<number[]>([]);
  const tapTimes = useRef<number[]>([]);
  const hasTravelPlayed = useRef(false);
  const hasPlayed = useRef(false);
  const hotelTapTimes = useRef<number[]>([]);
  const hasHotelPlayed = useRef(false);
  const travelAudio = useRef<HTMLAudioElement | undefined>(undefined);
  const travelSecretTimers = useRef<number[]>([]);
  const snoringAudio = useRef<HTMLAudioElement | undefined>(undefined);
  const snoringFadeTimer = useRef<number | undefined>(undefined);
  const [showPlane, setShowPlane] = useState(false);
  const [showTravelSecret, setShowTravelSecret] = useState(false);
  const [isTravelSecretLeaving, setIsTravelSecretLeaving] = useState(false);
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

    const audioUrl = `${import.meta.env.BASE_URL}audio/bears-snoring-web.mp3`;
    const audio = new Audio(audioUrl);

    audio.preload = "auto";
    audio.volume = 0.01;
    audio.loop = true;
    snoringAudio.current = audio;

    void audio
      .play()
      .then(() => {
        fadeSnoringVolume(audio, 0.8, 300);
      })
      .catch((error) => {
        console.warn("Snoring audio blocked:", error);
        audio.pause();
        audio.currentTime = 0;
        snoringAudio.current = undefined;
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
      travelSecretTimers.current.forEach((timer) => window.clearTimeout(timer));
      travelSecretTimers.current = [];
      clearSnoringFade();

      if (snoringAudio.current) {
        snoringAudio.current.pause();
        snoringAudio.current.currentTime = 0;
        snoringAudio.current = undefined;
      }

      if (travelAudio.current) {
        travelAudio.current.pause();
        travelAudio.current.currentTime = 0;
        travelAudio.current = undefined;
      }
    };
  }, []);

  const handleTravelTitleTap = async () => {
    if (hasTravelPlayed.current) {
      return;
    }

    const now = Date.now();
    travelTapTimes.current = [...travelTapTimes.current, now].filter(
      (tapTime) => now - tapTime <= 3000,
    );

    if (travelTapTimes.current.length >= 3) {
      hasTravelPlayed.current = true;
      travelTapTimes.current = [];

      const audio = new Audio(
        `${import.meta.env.BASE_URL}audio/travel-plane-web.mp3`,
      );

      audio.preload = "auto";
      audio.volume = 0.8;
      travelAudio.current = audio;

      try {
        await audio.play();
      } catch (error) {
        console.warn("Travel audio blocked:", error);
      }

      travelSecretTimers.current.push(
        window.setTimeout(() => {
          setShowTravelSecret(true);
        }, 300),
      );

      travelSecretTimers.current.push(
        window.setTimeout(() => {
          setIsTravelSecretLeaving(true);
        }, 10300),
      );

      travelSecretTimers.current.push(
        window.setTimeout(() => {
          audio.pause();
          audio.currentTime = 0;

          if (travelAudio.current === audio) {
            travelAudio.current = undefined;
          }

          setShowTravelSecret(false);
          setIsTravelSecretLeaving(false);
        }, 10700),
      );
    }
  };

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
      startSnoring();
      setShowHotelSleep(true);
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

          @keyframes travel-secret-enter {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.95);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }

          @keyframes travel-secret-exit {
            0% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.985);
            }
          }

          @keyframes travel-secret-float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-3px);
            }
          }

          @keyframes travel-suitcase-bounce {
            0%, 100% {
              transform: translateY(0px) scale(1);
            }
            8% {
              transform: translateY(-2px) scale(1.004);
            }
            16% {
              transform: translateY(0px) scale(1);
            }
          }

          .travel-secret-enter {
            animation: travel-secret-enter 400ms ease-out 1 both;
          }

          .travel-secret-exit {
            animation: travel-secret-exit 400ms ease-in 1 both;
          }

          .travel-secret-float {
            animation: travel-secret-float 4.2s ease-in-out infinite;
          }

          .travel-suitcase-bounce {
            animation: travel-suitcase-bounce 2s ease-in-out infinite;
            transform-origin: center bottom;
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

      {showTravelSecret && (
        <div
          className={`pointer-events-none fixed left-1/2 top-1/2 z-[9999] w-[min(86vw,380px)] ${
            isTravelSecretLeaving ? "travel-secret-exit" : "travel-secret-enter"
          }`}
        >
          <div className="travel-secret-float">
            <img
              src={travelEasterEgg}
              alt=""
              className="travel-suitcase-bounce h-auto w-full select-none drop-shadow-[0_26px_60px_rgba(0,0,0,0.14)]"
              draggable={false}
            />
          </div>
        </div>
      )}

      <Section id="travel">
        <div className="mx-auto flex w-full max-w-[340px] flex-col items-center pb-20 pt-16 text-center">
          <h2
            className="font-serif text-5xl font-medium leading-none tracking-tight text-black"
            onClick={handleTravelTitleTap}
          >
            Travel
          </h2>

          <div className="mt-12 flex w-full flex-col gap-6">
            {cards.map((card) => (
              <article
                key={card.title}
                id={card.title === "Accommodation" ? "accommodation" : undefined}
                className="relative rounded-3xl border border-stone-200 bg-white/70 p-6 text-center shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl"
              >
                {card.title === "Accommodation" && showHotelSleep && (
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
                      : card.title === "Accommodation"
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
