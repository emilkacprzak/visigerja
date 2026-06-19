let hasPlayed = false;

export function consumeSecretEasterEgg() {
  if (hasPlayed) {
    return false;
  }

  hasPlayed = true;
  return true;
}

export function requestSecretSelfie() {
  window.dispatchEvent(new Event("secret-selfie"));
}
