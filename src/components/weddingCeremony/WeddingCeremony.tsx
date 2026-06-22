import { useCallback, useEffect, useRef, useState } from "react";
import { MapPinned } from "lucide-react";
import googleGLogo from "../../assets/google-g-logo.svg";
import ceremonyBears from "../../assets/illustrations/wedding-bears-copenhagen.webp";
import { wedding } from "../../data/wedding";
import {
  finishEasterEgg,
  preloadAudio,
  startEasterEgg,
  stopAudio,
  stopEasterEgg,
} from "../../lib/easterEggs";
import { getAppleCalendarUrl, weddingEvent } from "../../lib/eventLinks";
import Button from "../Shared/Button";
import EasterEggOverlay from "../Shared/EasterEggOverlay";
import Section from "../Shared/Section";

const ceremonyCards = [
  {
    label: "Date",
    value: "17 October 2026",
  },
  {
    label: "Time",
    value: wedding.ceremony.time,
  },
  {
    label: "Venue",
    value: wedding.ceremony.venue,
  },
  {
    label: "Location",
    value: wedding.ceremony.address,
  },
];

const CEREMONY_EASTER_EGG_ID = "ceremony";
const CEREMONY_AUDIO_URL = `${import.meta.env.BASE_URL}audio/iDo.mp3`;

export default function WeddingCeremony() {
  const timers = useRef<number[]>([]);
  const audioRef = useRef<HTMLAudioElement | undefined>(undefined);
  const isActive = useRef(false);
  const [showSecret, setShowSecret] = useState(false);
  const [isSecretExiting, setIsSecretExiting] = useState(false);

  const resetCeremonySecret = () => {
    isActive.current = false;
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];

    if (audioRef.current) {
      audioRef.current.onended = null;
      stopAudio(audioRef.current);
    }

    setShowSecret(false);
    setIsSecretExiting(false);
  };

  useEffect(() => {
    audioRef.current = preloadAudio(CEREMONY_AUDIO_URL);

    return () => {
      stopEasterEgg(CEREMONY_EASTER_EGG_ID);

      if (audioRef.current) {
        audioRef.current.onended = null;
        stopAudio(audioRef.current);
      }
    };
  }, []);

  const closeCeremonySecret = useCallback(() => {
    if (isSecretExiting) {
      return;
    }

    isActive.current = false;
    setIsSecretExiting(true);

    if (audioRef.current) {
      audioRef.current.onended = null;
      stopAudio(audioRef.current);
    }

    timers.current.push(
      window.setTimeout(() => {
        setShowSecret(false);
        setIsSecretExiting(false);
        finishEasterEgg(CEREMONY_EASTER_EGG_ID);
      }, 500),
    );
  }, [isSecretExiting]);

  useEffect(() => {
    if (!showSecret) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCeremonySecret();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSecret, closeCeremonySecret]);

  const runCeremonySecret = () => {
    startEasterEgg(CEREMONY_EASTER_EGG_ID, () => {
      resetCeremonySecret();

      const audio = audioRef.current ?? preloadAudio(CEREMONY_AUDIO_URL);

      isActive.current = true;
      audioRef.current = audio;
      audio.currentTime = 0;
      audio.onended = closeCeremonySecret;

      void audio
        .play()
        .then(() => {
          if (isActive.current) {
            setShowSecret(true);
          }
        })
        .catch(() => {
          isActive.current = false;
          stopAudio(audio);
          finishEasterEgg(CEREMONY_EASTER_EGG_ID);
        });

      return resetCeremonySecret;
    });
  };

  return (
    <Section id="wedding">
      <style>
        {`
          @keyframes ceremony-secret-enter {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.985);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }

          @keyframes ceremony-secret-exit {
            0% {
              opacity: 1;
              transform: scale(1);
            }
            100% {
              opacity: 0;
              transform: scale(0.99);
            }
          }

          @keyframes ceremony-float {
            0%, 100% {
              transform: translateY(0px) scale(0.99);
            }
            50% {
              transform: translateY(-2px) scale(1);
            }
          }

          .ceremony-secret-enter {
            animation: ceremony-secret-enter 500ms ease-out 1 both;
          }

          .ceremony-secret-exit {
            animation: ceremony-secret-exit 500ms ease-in 1 both;
          }

          .ceremony-float {
            animation: ceremony-float 3.8s ease-in-out infinite;
            transform-origin: center bottom;
          }
        `}
      </style>
      <div className="mx-auto w-full pb-20 pt-16 text-center">
        <h2
          className="font-serif text-5xl font-medium leading-none tracking-tight text-black"
          onClick={runCeremonySecret}
        >
          Wedding Ceremony
        </h2>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ceremonyCards.map((card) => (
            <article
              key={card.label}
              className="rounded-3xl border border-stone-200 bg-white/70 px-5 py-8 text-center backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-stone-300 hover:bg-white/85 hover:shadow-[0_18px_50px_rgba(0,0,0,0.06)]"
            >
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-400">
                {card.label}
              </p>
              <p className="mt-5 font-serif text-3xl font-medium leading-tight text-black">
                {card.value}
              </p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 flex w-full max-w-[340px] flex-col gap-4">
          <Button
            href={weddingEvent.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            <span className="inline-flex items-center gap-2">
              <MapPinned className="text-white" size={26} strokeWidth={1.75} />
              Open in Google Maps
            </span>
          </Button>
          <div className="grid w-full grid-cols-1 gap-4 self-center sm:w-[min(calc(100vw-3rem),520px)] sm:grid-cols-2">
            <Button
              href={getAppleCalendarUrl()}
              rel="noopener noreferrer"
              variant="secondary"
            >
              <span className="inline-flex items-center gap-2">
                <span
                  className="text-3xl leading-none text-stone-900"
                  aria-hidden="true"
                >
                  
                </span>
                <span>Calendar</span>
              </span>
            </Button>
            <Button
              href={weddingEvent.googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              <span className="inline-flex items-center gap-2">
                <img
                  src={googleGLogo}
                  alt=""
                  className="h-7 w-7"
                  draggable={false}
                  aria-hidden="true"
                />
                <span>Calendar</span>
              </span>
            </Button>
          </div>
        </div>
      </div>
      {showSecret && (
        <EasterEggOverlay
          aria-label="Close ceremony Easter egg"
          isExiting={isSecretExiting}
          onClose={closeCeremonySecret}
        >
          <div className="relative w-[min(90vw,420px)] max-h-[90vh]">
            <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/15 blur-3xl" />
            <img
              src={ceremonyBears}
              alt=""
              className="ceremony-float relative h-auto max-h-[90vh] w-full select-none object-contain drop-shadow-[0_28px_70px_rgba(0,0,0,0.14)]"
              draggable={false}
            />
          </div>
        </EasterEggOverlay>
      )}
    </Section>
  );
}
