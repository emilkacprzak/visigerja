type EasterEggCleanup = () => void;

let activeEasterEgg:
  | {
      id: string;
      cleanup: EasterEggCleanup;
    }
  | undefined;
const usedEasterEggs = new Set<string>();

export function startEasterEgg(
  id: string,
  start: () => EasterEggCleanup | void,
) {
  if (activeEasterEgg || usedEasterEggs.has(id)) {
    return false;
  }

  usedEasterEggs.add(id);

  const cleanup = start() ?? (() => {});
  activeEasterEgg = { id, cleanup };

  return true;
}

export function finishEasterEgg(id: string) {
  if (activeEasterEgg?.id === id) {
    activeEasterEgg = undefined;
  }
}

export function stopEasterEgg(id: string) {
  if (activeEasterEgg?.id !== id) {
    return;
  }

  activeEasterEgg.cleanup();
  activeEasterEgg = undefined;
}

export function preloadAudio(src: string) {
  const audio = new Audio(src);

  audio.preload = "auto";
  audio.load();

  return audio;
}

export function stopAudio(audio: HTMLAudioElement) {
  audio.pause();
  audio.currentTime = 0;
}

export function playAudio(audio: HTMLAudioElement) {
  void audio.play().catch(() => {
    stopAudio(audio);
  });
}
