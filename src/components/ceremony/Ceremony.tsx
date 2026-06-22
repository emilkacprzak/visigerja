import { useRef, useState } from "react";
import { MapPinned } from "lucide-react";
import googleGLogo from "../../assets/google-g-logo.svg";
import ceremonyBears from "../../assets/illustrations/bears-ceremony-easter-egg.webp";
import {
  getAppleCalendarUrl,
  weddingEvent,
} from "../../lib/eventLinks";
import { playCeremonyMusicBox } from "../../lib/sounds";
import Button from "../Shared/Button";
import Section from "../Shared/Section";

function wait(duration: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
}

export default function Ceremony() {
  const tapTimes = useRef<number[]>([]);
  const hasSecretPlayed = useRef(false);
  const isSecretRunning = useRef(false);
  const stopMusic = useRef<(() => void) | undefined>(undefined);
  const [showSecret, setShowSecret] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [isSecretExiting, setIsSecretExiting] = useState(false);

  const runCeremonySecret = async () => {
    if (hasSecretPlayed.current || isSecretRunning.current) {
      return;
    }

    hasSecretPlayed.current = true;
    isSecretRunning.current = true;
    stopMusic.current = playCeremonyMusicBox();
    setShowSecret(true);
    await wait(2000);
    setShowParticles(true);
    await wait(8000);
    setIsSecretExiting(true);
    stopMusic.current?.();
    await wait(500);
    setShowSecret(false);
    setShowParticles(false);
    setIsSecretExiting(false);
    stopMusic.current = undefined;
    isSecretRunning.current = false;
  };

  const handleTitleTap = () => {
    const now = Date.now();

    tapTimes.current = [...tapTimes.current, now].filter(
      (tapTime) => now - tapTime <= 3000,
    );

    if (tapTimes.current.length >= 3) {
      tapTimes.current = [];
      void runCeremonySecret();
    }
  };

  return (
    <Section>
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
              transform: translate(-50%, -50%) scale(1);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.99);
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

          @keyframes ceremony-golden-particle {
            0%, 100% {
              opacity: 0;
              transform: translate3d(0, 8px, 0) scale(0.75);
            }
            36%, 72% {
              opacity: 0.75;
              transform: translate3d(0, -8px, 0) scale(1);
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

          .ceremony-golden-particle {
            animation: ceremony-golden-particle 3.4s ease-in-out infinite;
          }
        `}
      </style>
      <div className="mx-auto flex w-full max-w-[340px] flex-col items-center py-20 text-center">
        <h2
          className="font-serif text-5xl font-medium leading-none tracking-tight text-black"
          onClick={handleTitleTap}
        >
          🏛️ Ceremony
        </h2>

        <div className="mt-8 space-y-3 text-stone-500">
          <p className="text-lg font-light text-black">Copenhagen City Hall</p>
          <div className="space-y-1 text-base font-light leading-7">
            <p>Rådhuspladsen 1</p>
            <p>1550 København V</p>
            <p>Denmark</p>
          </div>
        </div>

        <div className="mt-10 flex w-full flex-col gap-4">
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
        <div
          className={`pointer-events-none fixed left-1/2 top-1/2 z-50 w-[min(86vw,380px)] ${
            isSecretExiting ? "ceremony-secret-exit" : "ceremony-secret-enter"
          }`}
        >
          <div className="relative">
            <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/15 blur-3xl" />
            {showParticles && (
              <>
                <span className="ceremony-golden-particle absolute left-8 top-12 text-[9px] leading-none text-[#D4AF37]">
                  ✦
                </span>
                <span className="ceremony-golden-particle absolute right-9 top-10 text-[8px] leading-none text-[#DA9100] [animation-delay:500ms]">
                  ✦
                </span>
                <span className="ceremony-golden-particle absolute bottom-16 left-12 text-[8px] leading-none text-[#D4AF37] [animation-delay:1100ms]">
                  ✦
                </span>
                <span className="ceremony-golden-particle absolute bottom-20 right-8 text-[9px] leading-none text-[#DA9100] [animation-delay:1600ms]">
                  ✦
                </span>
              </>
            )}
            <img
              src={ceremonyBears}
              alt=""
              className="ceremony-float relative h-auto w-full select-none drop-shadow-[0_28px_70px_rgba(0,0,0,0.14)]"
              draggable={false}
            />
          </div>
        </div>
      )}
    </Section>
  );
}
