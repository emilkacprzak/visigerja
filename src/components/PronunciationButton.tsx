import { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";

export default function PronunciationButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setFailed(false);
    audio.currentTime = 0;
    void audio.play().catch(() => {
      setPlaying(false);
      setFailed(true);
    });
  };

  return (
    <span className="inline-flex items-center align-middle">
      <button
        type="button"
        onClick={play}
        aria-label="Hear Københavner Caféen pronounced in Danish"
        title="Listen to the Danish pronunciation"
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#b08d57]/30 text-[#987445] transition-colors hover:bg-[#b08d57]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#987445] ${playing ? "bg-[#b08d57]/15" : ""}`}
      >
        <Volume2 size={18} strokeWidth={1.6} aria-hidden="true" />
      </button>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}audio/restaurant-pronunciation.mp3`}
        preload="none"
        onPlay={() => setPlaying(true)}
        onEnded={() => setPlaying(false)}
        onError={() => { setPlaying(false); setFailed(true); }}
      />
      {failed && <span role="status" className="ml-2 text-xs text-stone-500">Please try again.</span>}
    </span>
  );
}
