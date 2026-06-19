import { useEffect, useState } from "react";
import illustration from "../../assets/illustrations/hero.webp";

export default function HeroIllustration() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);

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
        `}
      </style>

      <div
        className={`relative mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] ${
          showEasterEgg ? "animate-bear-easter-egg" : "animate-float"
        }`}
      >
        <div className="animate-heart-glow pointer-events-none absolute left-1/2 top-[9%] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DA9100]/20 blur-xl" />
        {showEasterEgg && (
          <div className="animate-kiss-sparkle pointer-events-none absolute left-1/2 top-[30%] z-10 -translate-x-1/2 -translate-y-1/2 text-lg leading-none text-[#DA9100]">
            ♥
          </div>
        )}
        <img
          src={illustration}
          alt=""
          className="h-auto w-full select-none drop-shadow-[0_18px_38px_rgba(0,0,0,0.055)] pointer-events-none"
          loading="eager"
          draggable={false}
        />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-[16px] w-[58%] -translate-x-1/2 rounded-full bg-black/[0.045] blur-lg" />
      </div>
    </>
  );
}
