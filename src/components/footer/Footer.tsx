import { useEffect, useRef, useState } from "react";
import dancingBears from "../../assets/illustrations/bears-dancing.webp";
import goodbyeBears from "../../assets/illustrations/bears-goodbye.webp";
import { wedding } from "../../data/wedding";
import {
  finishEasterEgg,
  preloadAudio,
  startEasterEgg,
  stopAudio,
  stopEasterEgg,
} from "../../lib/easterEggs";
import { playGoodbyeWave } from "../../lib/sounds";
import EasterEggOverlay from "../Shared/EasterEggOverlay";

const FOOTER_DANCE_EASTER_EGG_ID = "footer-dance";
const FOOTER_GOODBYE_EASTER_EGG_ID = "footer-goodbye";
const HEART_EASTER_EGG_AUDIO_URL = `${import.meta.env.BASE_URL}audio/jbie-mono-fade.mp3`;

export default function Footer() {
  const [showPrideEffect, setShowPrideEffect] = useState(false);
  const [showDanceRipple, setShowDanceRipple] = useState(false);
  const [showDanceOverlay, setShowDanceOverlay] = useState(false);
  const [isDanceExiting, setIsDanceExiting] = useState(false);
  const [showGoodbyeOverlay, setShowGoodbyeOverlay] = useState(false);
  const [isGoodbyeExiting, setIsGoodbyeExiting] = useState(false);
  const danceTimers = useRef<number[]>([]);
  const goodbyeTimers = useRef<number[]>([]);
  const danceAudio = useRef<HTMLAudioElement | undefined>(undefined);
  const stopGoodbyeSound = useRef<(() => void) | undefined>(undefined);
  const coupleNames = `${wedding.couple.partner1} & ${wedding.couple.partner2}`;

  const resetDanceSecret = () => {
    danceTimers.current.forEach((timer) => window.clearTimeout(timer));
    danceTimers.current = [];

    if (danceAudio.current) {
      danceAudio.current.onended = null;
      stopAudio(danceAudio.current);
    }

    setShowPrideEffect(false);
    setShowDanceRipple(false);
    setShowDanceOverlay(false);
    setIsDanceExiting(false);
  };

  const resetGoodbyeSecret = () => {
    goodbyeTimers.current.forEach((timer) => window.clearTimeout(timer));
    goodbyeTimers.current = [];
    stopGoodbyeSound.current?.();
    stopGoodbyeSound.current = undefined;
    setShowGoodbyeOverlay(false);
    setIsGoodbyeExiting(false);
  };

  useEffect(() => {
    danceAudio.current = preloadAudio(HEART_EASTER_EGG_AUDIO_URL);

    return () => {
      stopEasterEgg(FOOTER_DANCE_EASTER_EGG_ID);
      stopEasterEgg(FOOTER_GOODBYE_EASTER_EGG_ID);

      if (danceAudio.current) {
        danceAudio.current.onended = null;
        stopAudio(danceAudio.current);
      }
    };
  }, []);

  const runDanceSecret = () => {
    startEasterEgg(FOOTER_DANCE_EASTER_EGG_ID, () => {
      resetDanceSecret();
      setShowDanceRipple(true);
      setShowPrideEffect(true);

      const audio = danceAudio.current ?? preloadAudio(HEART_EASTER_EGG_AUDIO_URL);

      danceAudio.current = audio;
      audio.currentTime = 0;
      audio.onended = closeDanceSecret;

      void audio
        .play()
        .then(() => {
          setShowDanceOverlay(true);
        })
        .catch(() => {
          stopAudio(audio);
          finishEasterEgg(FOOTER_DANCE_EASTER_EGG_ID);
        });

      danceTimers.current.push(
        window.setTimeout(() => setShowDanceRipple(false), 300),
        window.setTimeout(() => setShowPrideEffect(false), 2000),
      );

      return resetDanceSecret;
    });
  };

  const handleHeartClick = () => {
    runDanceSecret();
  };

  const closeDanceSecret = () => {
    if (isDanceExiting) {
      return;
    }

    danceTimers.current.forEach((timer) => window.clearTimeout(timer));
    danceTimers.current = [];

    if (danceAudio.current) {
      danceAudio.current.onended = null;
      stopAudio(danceAudio.current);
    }

    setShowPrideEffect(false);
    setShowDanceRipple(false);
    setIsDanceExiting(true);

    danceTimers.current.push(
      window.setTimeout(() => {
        setShowDanceOverlay(false);
        setIsDanceExiting(false);
        finishEasterEgg(FOOTER_DANCE_EASTER_EGG_ID);
      }, 400),
    );
  };

  const runGoodbyeSecret = () => {
    startEasterEgg(FOOTER_GOODBYE_EASTER_EGG_ID, () => {
      resetGoodbyeSecret();
      stopGoodbyeSound.current = playGoodbyeWave();
      setShowGoodbyeOverlay(true);

      goodbyeTimers.current.push(
        window.setTimeout(() => {
          setIsGoodbyeExiting(true);
          stopGoodbyeSound.current?.();
          stopGoodbyeSound.current = undefined;
        }, 10000),
        window.setTimeout(() => {
          setShowGoodbyeOverlay(false);
          setIsGoodbyeExiting(false);
          finishEasterEgg(FOOTER_GOODBYE_EASTER_EGG_ID);
        }, 10500),
      );

      return resetGoodbyeSecret;
    });
  };

  const handleGoodbyeClick = () => {
    runGoodbyeSecret();
  };

  const closeGoodbyeSecret = () => {
    if (isGoodbyeExiting) {
      return;
    }

    goodbyeTimers.current.forEach((timer) => window.clearTimeout(timer));
    goodbyeTimers.current = [];
    stopGoodbyeSound.current?.();
    stopGoodbyeSound.current = undefined;
    setIsGoodbyeExiting(true);

    goodbyeTimers.current.push(
      window.setTimeout(() => {
        setShowGoodbyeOverlay(false);
        setIsGoodbyeExiting(false);
        finishEasterEgg(FOOTER_GOODBYE_EASTER_EGG_ID);
      }, 500),
    );
  };

  return (
    <footer className="px-6 pb-20 pt-10 text-center text-stone-500">
      <style>
        {`
          @keyframes pride-heart {
            0% {
              fill: #D4AF37;
            }
            4.545% {
              fill: #E40303;
            }
            9.091% {
              fill: #D4AF37;
            }
            13.636% {
              fill: #FF8C00;
            }
            18.182% {
              fill: #D4AF37;
            }
            22.727% {
              fill: #FFED00;
            }
            27.273% {
              fill: #D4AF37;
            }
            31.818% {
              fill: #008026;
            }
            36.364% {
              fill: #D4AF37;
            }
            40.909% {
              fill: #24408E;
            }
            45.455% {
              fill: #D4AF37;
            }
            50% {
              fill: #732982;
            }
            54.545% {
              fill: #D4AF37;
            }
            59.091% {
              fill: #5BCEFA;
            }
            63.636% {
              fill: #D4AF37;
            }
            68.182% {
              fill: #F5A9B8;
            }
            72.727% {
              fill: #D4AF37;
            }
            77.273% {
              fill: #FFFFFF;
            }
            81.818% {
              fill: #D4AF37;
            }
            86.364% {
              fill: #613915;
            }
            90.909% {
              fill: #D4AF37;
            }
            95.455% {
              fill: #000000;
            }
            100% {
              fill: #D4AF37;
            }
          }

          .pride-heart {
            animation: pride-heart 75s linear infinite;
          }

          @keyframes footer-heart-pulse {
            0%, 100% {
              transform: scale(1);
            }
            18%, 48% {
              transform: scale(1.08);
            }
            30%, 60% {
              transform: scale(1);
            }
          }

          @keyframes footer-rainbow-glow {
            0%, 100% {
              opacity: 0;
            }
            20%, 72% {
              opacity: 0.28;
            }
          }

          @keyframes footer-sparkle {
            0%, 100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.7);
            }
            35%, 72% {
              opacity: 0.85;
              transform: translate(-50%, -50%) scale(1);
            }
          }

          .footer-heart-pulse {
            animation: footer-heart-pulse 2s ease-in-out 1;
          }

          .footer-rainbow-glow {
            animation: footer-rainbow-glow 2s ease-in-out 1;
          }

          .footer-sparkle {
            animation: footer-sparkle 1.6s ease-in-out 1;
          }

          @keyframes footer-dance-ripple {
            0% {
              opacity: 0.26;
              transform: scale(0.82);
            }
            100% {
              opacity: 0;
              transform: scale(3.2);
            }
          }

          @keyframes dancing-bears-enter {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.95);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }

          @keyframes dancing-bears-exit {
            0% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.985);
            }
          }

          @keyframes dancing-bears-groove {
            0%, 100% {
              transform: translateY(0px) rotate(-2deg);
            }
            50% {
              transform: translateY(-4px) rotate(2deg);
            }
          }

          @keyframes dance-sparkle {
            0%, 100% {
              opacity: 0;
              transform: translate3d(0, 6px, 0) scale(0.78);
            }
            34%, 68% {
              opacity: 0.72;
              transform: translate3d(0, -4px, 0) scale(1);
            }
          }

          .footer-dance-ripple {
            animation: footer-dance-ripple 300ms ease-out 1;
          }

          .dancing-bears-enter {
            animation: dancing-bears-enter 400ms ease-out 1 both;
          }

          .dancing-bears-exit {
            animation: dancing-bears-exit 400ms ease-in 1 both;
          }

          .dancing-bears-groove {
            animation: dancing-bears-groove 700ms ease-in-out infinite;
            transform-origin: center bottom;
          }

          .dance-sparkle {
            animation: dance-sparkle 2.4s ease-in-out infinite;
          }

          @keyframes goodbye-bears-enter {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.985);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }

          @keyframes goodbye-bears-exit {
            0% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.99);
            }
          }

          @keyframes goodbye-wave {
            0%, 100% {
              transform: translateY(0px) rotate(-1deg);
            }
            50% {
              transform: translateY(-2px) rotate(1deg);
            }
          }

          .goodbye-bears-enter {
            animation: goodbye-bears-enter 500ms ease-out 1 both;
          }

          .goodbye-bears-exit {
            animation: goodbye-bears-exit 500ms ease-in 1 both;
          }

          .goodbye-wave {
            animation: goodbye-wave 800ms ease-in-out infinite;
            transform-origin: center bottom;
          }
        `}
      </style>
      <div className="mx-auto flex max-w-[340px] flex-col items-center gap-4">
        <button
          type="button"
          className="relative flex h-8 w-8 items-center justify-center"
          aria-label="Play pride celebration"
          onClick={handleHeartClick}
        >
          {showDanceRipple && (
            <span className="footer-dance-ripple pointer-events-none absolute h-10 w-10 rounded-full bg-[conic-gradient(from_90deg,#E40303,#FF8C00,#FFED00,#008026,#24408E,#732982,#5BCEFA,#F5A9B8,#D4AF37)] blur-sm" />
          )}
          {showPrideEffect && (
            <>
              <span className="footer-rainbow-glow pointer-events-none absolute h-10 w-10 rounded-full bg-[conic-gradient(from_90deg,#E40303,#FF8C00,#FFED00,#008026,#24408E,#732982,#5BCEFA,#F5A9B8,#D4AF37)] blur-md" />
              <span className="footer-sparkle pointer-events-none absolute left-1 top-1 text-[8px] leading-none text-[#D4AF37]">
                ✦
              </span>
              <span className="footer-sparkle pointer-events-none absolute right-1 top-2 text-[7px] leading-none text-[#5BCEFA]">
                ✦
              </span>
              <span className="footer-sparkle pointer-events-none absolute bottom-1 left-1/2 text-[7px] leading-none text-[#F5A9B8]">
                ✦
              </span>
            </>
          )}
          <svg
            className={`relative h-6 w-6 ${showPrideEffect ? "footer-heart-pulse" : ""}`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              className="pride-heart"
              d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
              fill="#D4AF37"
            />
          </svg>
        </button>
        <p className="text-sm font-light">Made with love</p>
        <p className="font-['Great_Vibes',cursive] text-[2.3rem] font-normal leading-none text-stone-800">
          {coupleNames}
        </p>
        <p className="text-sm font-light" onClick={handleGoodbyeClick}>
          See you in Copenhagen 🇩🇰
        </p>
      </div>
      {showDanceOverlay && (
        <EasterEggOverlay
          ariaLabel="Close dance Easter egg"
          isExiting={isDanceExiting}
          onClose={closeDanceSecret}
        >
          <div className="relative w-[min(90vw,360px)] max-h-[90vh]">
            <span className="dance-sparkle absolute -left-2 top-8 text-[10px] leading-none text-[#E40303]">
              ✦
            </span>
            <span className="dance-sparkle absolute right-6 top-0 text-[9px] leading-none text-[#5BCEFA] [animation-delay:450ms]">
              ✦
            </span>
            <span className="dance-sparkle absolute -right-1 top-28 text-[10px] leading-none text-[#FFED00] [animation-delay:900ms]">
              ✦
            </span>
            <span className="dance-sparkle absolute bottom-8 left-8 text-[8px] leading-none text-[#F5A9B8] [animation-delay:1350ms]">
              ✦
            </span>
            <img
              src={dancingBears}
              alt=""
              className="dancing-bears-groove h-auto max-h-[90vh] w-full select-none object-contain drop-shadow-[0_24px_55px_rgba(0,0,0,0.12)]"
              draggable={false}
            />
          </div>
        </EasterEggOverlay>
      )}
      {showGoodbyeOverlay && (
        <EasterEggOverlay
          ariaLabel="Close goodbye Easter egg"
          isExiting={isGoodbyeExiting}
          onClose={closeGoodbyeSecret}
        >
          <img
            src={goodbyeBears}
            alt=""
            className="goodbye-wave h-auto max-h-[90vh] w-[min(90vw,360px)] select-none object-contain drop-shadow-[0_26px_60px_rgba(0,0,0,0.12)]"
            draggable={false}
          />
        </EasterEggOverlay>
      )}
    </footer>
  );
}
