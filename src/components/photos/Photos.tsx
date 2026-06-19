import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import selfie from "../../assets/illustrations/bears-selfie-love.webp";
import { wedding } from "../../data/wedding";
import {
  consumeSecretEasterEgg,
  requestSecretSelfie,
} from "../../lib/secretEasterEgg";
import { playCameraShutter } from "../../lib/sounds";
import Button from "../Shared/Button";
import Section from "../Shared/Section";

function wait(duration: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
}

export default function Photos() {
  const tapTimes = useRef<number[]>([]);
  const isSecretRunning = useRef(false);
  const [isTitlePressed, setIsTitlePressed] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(false);
  const galleryUrl = wedding.photos.isEnabled
    ? wedding.photos.galleryUrl || undefined
    : undefined;

  const handleTitleTap = async () => {
    const now = Date.now();
    tapTimes.current = [...tapTimes.current, now].filter(
      (tapTime) => now - tapTime <= 3000,
    );

    if (
      tapTimes.current.length >= 3 &&
      !isSecretRunning.current &&
      consumeSecretEasterEgg()
    ) {
      isSecretRunning.current = true;
      tapTimes.current = [];
      setIsTitlePressed(true);
      await wait(200);
      setIsTitlePressed(false);

      playCameraShutter();
      setShowFlash(true);
      window.setTimeout(() => setShowFlash(false), 150);

      setShowThumbnail(true);
      await wait(320);
      setShowThumbnail(false);
      requestSecretSelfie();
    }
  };
  const uploadUrl = wedding.photos.isEnabled
    ? wedding.photos.uploadUrl || undefined
    : undefined;

  return (
    <Section>
      <style>
        {`
          @keyframes camera-thumbnail {
            0% {
              opacity: 0;
              transform: translate3d(0, 10px, 0) scale(0.72);
            }
            32% {
              opacity: 1;
              transform: translate3d(0, 0, 0) scale(1);
            }
            100% {
              opacity: 0;
              transform: translate3d(18px, -30px, 0) scale(0.86);
            }
          }

          @keyframes photo-secret-flash {
            0% {
              opacity: 0;
            }
            30% {
              opacity: 0.82;
            }
            100% {
              opacity: 0;
            }
          }

          .animate-camera-thumbnail {
            animation: camera-thumbnail 320ms ease-out 1;
          }

          .animate-photo-secret-flash {
            animation: photo-secret-flash 150ms ease-out 1;
          }
        `}
      </style>
      <div className="mx-auto flex w-full max-w-[340px] flex-col items-center py-20 text-center">
        <article className="w-full rounded-3xl border border-stone-200 bg-white/70 p-6 text-center shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-700">
            <Camera className="text-stone-700" size={26} strokeWidth={1.75} />
          </div>

          <h2
            className={`mt-5 inline-block font-serif text-5xl font-medium leading-none tracking-tight text-black transition-transform duration-200 ease-out ${
              isTitlePressed ? "scale-[0.98]" : "scale-100"
            }`}
            onClick={handleTitleTap}
          >
            Photos
          </h2>

          <p className="mt-5 text-base font-light leading-7 text-stone-500">
            After the wedding you'll find our official gallery here. We'd love
            to see your photos too. Please upload them as soon as possible after
            the wedding. Thank you! 🤍
          </p>

          <div className="mt-8 flex w-full flex-col gap-4">
            <Button
              variant="primary"
              href={galleryUrl}
              disabled={!galleryUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View gallery
            </Button>
            <Button
              variant="secondary"
              href={uploadUrl}
              disabled={!uploadUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Upload photos
            </Button>
          </div>

          <p className="mx-auto mt-6 inline-flex rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-xs font-medium text-stone-500">
            Available after the wedding
          </p>
        </article>
      </div>
      {showFlash && (
        <div className="animate-photo-secret-flash pointer-events-none fixed inset-0 z-50 bg-white" />
      )}
      {showThumbnail && (
        <div className="animate-camera-thumbnail pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-50 h-16 w-16 overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
          <img
            src={selfie}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
      )}
    </Section>
  );
}
