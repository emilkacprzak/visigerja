import { useEffect, useRef, useState } from "react";
import illustration from "../../assets/illustrations/hero.webp";
import selfie from "../../assets/illustrations/bears-selfie-love.webp";
import {
  finishEasterEgg,
  startEasterEgg,
  stopEasterEgg,
} from "../../lib/easterEggs";
import { playWeddingChime } from "../../lib/sounds";
import EasterEggOverlay from "../Shared/EasterEggOverlay";

type SecretState = "idle" | "selfie" | "return";

const HERO_CHIME_EASTER_EGG_ID = "hero-chime";
const HERO_SELFIE_EASTER_EGG_ID = "hero-selfie";

export default function HeroIllustration() {
  const rootRef = useRef<HTMLDivElement>(null);
  const secretTimers = useRef<number[]>([]);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [secretState, setSecretState] = useState<SecretState>("idle");
  const [showFinalShimmer, setShowFinalShimmer] = useState(false);

  const resetSecretSelfie = () => {
    secretTimers.current.forEach((timer) => window.clearTimeout(timer));
    secretTimers.current = [];
    setSecretState("idle");
    setShowFinalShimmer(false);
  };

  const closeSecretSelfie = () => {
    resetSecretSelfie();
    finishEasterEgg(HERO_SELFIE_EASTER_EGG_ID);
  };

  useEffect(() => {
    let endTimer: number | undefined;
    const startTimer = window.setTimeout(() => {
      setShowEasterEgg(true);

      endTimer = window.setTimeout(() => {
        setShowEasterEgg(false);
      }, 1800);
    }, 60000);

    return () => {
      window.clearTimeout(startTimer);

      if (endTimer) {
        window.clearTimeout(endTimer);
      }
    };
  }, []);

  useEffect(() => {
    const runSecretSelfie = () => {
      startEasterEgg(HERO_SELFIE_EASTER_EGG_ID, () => {
        resetSecretSelfie();
        rootRef.current?.closest("section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        secretTimers.current.push(
          window.setTimeout(() => setSecretState("selfie"), 1000),
          window.setTimeout(() => setSecretState("return"), 11000),
          window.setTimeout(() => {
            setSecretState("idle");
            setShowFinalShimmer(true);
          }, 11520),
          window.setTimeout(() => {
            setShowFinalShimmer(false);
            finishEasterEgg(HERO_SELFIE_EASTER_EGG_ID);
          }, 12220),
        );

        return resetSecretSelfie;
      });
    };

    window.addEventListener("secret-selfie", runSecretSelfie);

    return () => {
      window.removeEventListener("secret-selfie", runSecretSelfie);
      stopEasterEgg(HERO_SELFIE_EASTER_EGG_ID);
    };
  }, []);

  const handleHeartClick = () => {
    startEasterEgg(HERO_CHIME_EASTER_EGG_ID, () => {
      const stopChime = playWeddingChime();
      const timer = window.setTimeout(
        () => finishEasterEgg(HERO_CHIME_EASTER_EGG_ID),
        900,
      );

      return () => {
        window.clearTimeout(timer);
        stopChime();
      };
    });
  };

  return (
    <>
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-2px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          @keyframes heart-glow {
            0%, 18%, 88%, 100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.96);
            }
            6%, 92% {
              opacity: 0.16;
              transform: translate(-50%, -50%) scale(1);
            }
          }

          @keyframes bear-easter-egg {
            0%, 100% {
              transform: translateY(0px) rotate(0deg) scale(1);
            }
            28% {
              transform: translateY(0px) rotate(-1.4deg) scale(1.012);
            }
            56% {
              transform: translateY(0px) rotate(1.2deg) scale(1.014);
            }
            82% {
              transform: translateY(0px) rotate(0deg) scale(1.004);
            }
          }

          @keyframes kiss-sparkle {
            0%, 100% {
              opacity: 0;
              transform: translate(-50%, -50%) translateY(4px) scale(0.82);
            }
            28%, 72% {
              opacity: 0.9;
              transform: translate(-50%, -50%) translateY(0px) scale(1);
            }
          }

          @keyframes secret-final-shimmer {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.82) rotate(-18deg);
            }
            42% {
              opacity: 0.42;
              transform: translate(-50%, -50%) scale(1.08) rotate(8deg);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(1.2) rotate(18deg);
            }
          }

          .animate-float {
            animation: float 7s ease-in-out infinite;
          }

          .animate-heart-glow {
            animation: heart-glow 9s ease-in-out infinite;
          }

          .animate-bear-easter-egg {
            animation: bear-easter-egg 1.8s ease-in-out 1;
          }

          .animate-kiss-sparkle {
            animation: kiss-sparkle 1s ease-in-out 1;
          }

          .animate-secret-final-shimmer {
            animation: secret-final-shimmer 700ms ease-out 1;
          }
        `}
      </style>

      <div
        ref={rootRef}
        className={`relative mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] ${
          secretState !== "idle"
            ? ""
            : showEasterEgg
              ? "animate-bear-easter-egg"
              : "animate-float"
        }`}
      >
        <div className="animate-heart-glow pointer-events-none absolute left-1/2 top-[9%] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DA9100]/20 blur-xl" />
        <button
          type="button"
          className="absolute left-1/2 top-[9%] z-20 h-12 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
          aria-label="Play wedding chime"
          onClick={handleHeartClick}
        />
        {showEasterEgg && (
          <div className="animate-kiss-sparkle pointer-events-none absolute left-1/2 top-[30%] z-10 -translate-x-1/2 -translate-y-1/2 text-lg leading-none text-[#DA9100]">
            ♥
          </div>
        )}
        {showFinalShimmer && (
          <div className="animate-secret-final-shimmer pointer-events-none absolute left-1/2 top-[9%] z-10 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DA9100]/35 blur-xl" />
        )}
        <img
          src={illustration}
          alt=""
          className="pointer-events-none h-auto w-full select-none drop-shadow-[0_18px_38px_rgba(0,0,0,0.055)]"
          loading="eager"
          draggable={false}
        />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-[16px] w-[58%] -translate-x-1/2 rounded-full bg-black/[0.045] blur-lg" />
      </div>
      {secretState !== "idle" && (
        <EasterEggOverlay
          ariaLabel="Close selfie Easter egg"
          onClose={closeSecretSelfie}
        >
          <img
            src={selfie}
            alt=""
            className="h-auto max-h-[90vh] w-[min(90vw,420px)] select-none object-contain drop-shadow-[0_18px_38px_rgba(0,0,0,0.055)]"
            draggable={false}
          />
        </EasterEggOverlay>
      )}
    </>
  );
}
