import { useEffect, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import thumbnail from "../assets/illustrations/wedding-live.jpg";
import noticeBear from "../assets/illustrations/navy-bear-cutout.png";
import Section from "./Shared/Section";
import { wedding } from "../data/wedding";

const liveUrl = "https://www.youtube.com/live/Wm3fKmv12kc";

export default function Livestream() {
  const [showNotice, setShowNotice] = useState(true);

  useEffect(() => {
    const hideTimer = window.setTimeout(() => setShowNotice(false), 5000);
    const scrollTimer = window.setTimeout(() => {
      // Preserve direct links to other sections of the wedding page.
      if (window.location.hash && window.location.hash !== "#live") return;
      document.getElementById("live")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        block: "start",
      });
    }, 900);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <>
      <div
        role="status"
        aria-live="polite"
        className={`live-notice wedding-notice ${showNotice ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <span aria-hidden="true" className="wedding-notice-signature">Emil &amp; Karol</span>
        <div className="wedding-notice-content">
          <div className="wedding-notice-bear-column">
            <img src={noticeBear} alt="" aria-hidden="true" className="wedding-notice-bear" />
            <p className="wedding-notice-time" aria-label={`Ceremony time ${wedding.ceremony.time}`}>{wedding.ceremony.time}</p>
          </div>
          <div className="wedding-notice-copy">
            <span aria-hidden="true" className="wedding-notice-ornament">✧</span>
            <p lang="pl" className="wedding-notice-title">Link do ślubu już dostępny.</p>
            <span aria-hidden="true" className="wedding-notice-divider" />
            <p lang="en" className="wedding-notice-translation">The wedding livestream link is now available.</p>
          </div>
        </div>
        <span aria-hidden="true" className="wedding-notice-date">17 · 10 · 2026</span>
      </div>
      <Section id="live" className="pb-16 pt-8 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#b08d57]">Emil &amp; Karol · 17 October 2026</p>
          <h2 className="mt-4 font-serif text-5xl font-medium tracking-tight text-black">Join us live</h2>
          <p className="mx-auto mt-5 max-w-xl text-stone-500">Celebrate with us, wherever you are. Our wedding livestream is ready on YouTube.</p>
          <p lang="pl" className="mx-auto mt-2 max-w-xl text-sm text-stone-500">Bądźcie z nami, gdziekolwiek jesteście — link do transmisji naszego ślubu jest już dostępny.</p>
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Watch Emil and Karol’s wedding livestream on YouTube (opens in a new tab)" className="group relative mt-8 block overflow-hidden rounded-3xl border border-stone-200 shadow-[0_18px_50px_rgba(0,0,0,0.08)] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#b08d57]">
            <img src={thumbnail} width="1280" height="720" alt="Emil i Karol jako misie w granatowym i bordowym garniturze przed kamerą — ślub 17.10.2026" className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
            <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-black/5 transition-colors group-hover:bg-black/15">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/70 bg-white/90 text-stone-900 shadow-xl backdrop-blur sm:h-20 sm:w-20"><Play className="ml-1 h-7 w-7 fill-current" /></span>
            </span>
          </a>
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="mx-auto mt-6 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-stone-900 px-7 py-3 font-medium text-white transition-colors hover:bg-stone-700 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#b08d57]">Watch on YouTube <ArrowUpRight size={20} /></a>
          <p lang="pl" className="mt-3 text-sm text-stone-500">Kliknij obrazek lub przycisk, aby przejść do transmisji.</p>
        </div>
      </Section>
    </>
  );
}
