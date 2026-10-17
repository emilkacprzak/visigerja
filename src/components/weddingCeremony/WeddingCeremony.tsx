import { useCallback, useEffect, useRef, useState } from "react";
import ceremonyBears from "../../assets/illustrations/wedding-bears-copenhagen.webp";
import { wedding } from "../../data/wedding";
import {
  finishEasterEgg,
  preloadAudio,
  startEasterEgg,
  stopAudio,
  stopEasterEgg,
} from "../../lib/easterEggs";
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

        <section className="mx-auto mt-16 max-w-4xl rounded-3xl border border-stone-200 bg-white/70 px-6 py-12 sm:px-12 sm:py-16" aria-labelledby="thank-you-heading">
          <div lang="en">
            <h3 id="thank-you-heading" className="font-serif text-4xl font-medium leading-tight text-stone-900 sm:text-5xl">Thank you for being part of our day</h3>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-stone-600">To everyone who celebrated with us in Copenhagen, and everyone who joined us online to watch us say “I do” — thank you from the bottom of our hearts.</p>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-stone-600">Whether you were beside us at City Hall or cheering us on from afar, your love and presence made our wedding day even more special. We’re so grateful to have shared this moment with you.</p>
            <p className="mt-6 text-lg leading-relaxed text-stone-700">With all our love,<br />Emil &amp; Karol 🤍</p>
          </div>
          <div lang="pl" className="mt-10 border-t border-stone-200 pt-10">
            <h3 className="font-serif text-4xl font-medium leading-tight text-stone-900 sm:text-5xl">Dziękujemy, że byliście z nami</h3>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-stone-600">Wszystkim, którzy świętowali z nami w Kopenhadze, oraz tym, którzy oglądali transmisję i towarzyszyli nam online, gdy mówiliśmy sobie „tak” — dziękujemy z całego serca.</p>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-stone-600">Niezależnie od tego, czy byliście obok nas w ratuszu, czy kibicowaliście nam z daleka, Wasza miłość i obecność sprawiły, że nasz ślub był jeszcze piękniejszy. Jesteśmy ogromnie wdzięczni, że mogliśmy dzielić z Wami tę chwilę.</p>
            <p className="mt-6 text-lg leading-relaxed text-stone-700">Z miłością,<br />Emil i Karol 🤍</p>
          </div>
          <a href="https://www.youtube.com/watch?v=Wm3fKmv12kc" target="_blank" rel="noopener noreferrer" className="mx-auto mt-10 flex min-h-24 w-full max-w-lg items-center justify-center gap-4 rounded-3xl border border-stone-200 bg-white px-5 py-6 shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-colors hover:border-red-300 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600 sm:gap-6">
            <svg viewBox="0 0 64 46" className="h-10 w-14 shrink-0 sm:h-12 sm:w-16" aria-hidden="true"><rect width="64" height="46" rx="12" fill="#FF0000" /><path d="M26 12 45 23 26 34Z" fill="white" /></svg>
            <span className="text-left"><span lang="en" className="block text-xl font-semibold text-stone-900 sm:text-2xl">Watch our wedding</span><span lang="pl" className="mt-1 block text-base text-stone-600 sm:text-lg">Obejrzyj nasz ślub</span></span>
          </a>
        </section>

        <aside className="mx-auto mt-12 max-w-4xl rounded-3xl border border-[#c5a660] bg-[#fffaf0] px-6 py-10 shadow-[0_18px_50px_rgba(185,154,82,0.12)] sm:px-12 sm:py-14" aria-labelledby="photo-request-heading">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#75551e]">A little request from the newlyweds</p>
          <h3 id="photo-request-heading" className="mt-5 font-serif text-4xl font-medium leading-tight text-stone-900 sm:text-5xl">Please share your wedding photos!</h3>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-stone-700 sm:text-2xl">Dear guests, we’d love to relive our special day through your eyes. Please upload your photos and videos as soon as you can using the link below — every moment means so much to us.</p>
          <p className="mt-5 text-lg text-stone-600">With love and thanks, Emil &amp; Karol 🤍</p>
          <div className="mx-auto mt-8 max-w-sm">
            <Button href={wedding.photos.uploadUrl} target="_blank" rel="noopener noreferrer" variant="primary">Upload your photos &amp; videos</Button>
          </div>
          <p className="mt-4 text-sm text-stone-500">No Dropbox account needed.</p>
        </aside>
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
