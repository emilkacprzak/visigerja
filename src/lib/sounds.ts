type WebAudioWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};

let audioContext: AudioContext | undefined;

function getAudioContext() {
  const AudioContextConstructor =
    window.AudioContext || (window as WebAudioWindow).webkitAudioContext;

  if (!AudioContextConstructor) {
    return undefined;
  }

  audioContext ??= new AudioContextConstructor();

  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }

  return audioContext;
}

function createGain(context: AudioContext, volume: number) {
  const gain = context.createGain();

  gain.gain.value = volume;
  gain.connect(context.destination);

  return gain;
}

function playTone(
  context: AudioContext,
  destination: AudioNode,
  options: {
    frequency: number;
    start: number;
    duration: number;
    volume: number;
    type?: OscillatorType;
  },
) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const end = options.start + options.duration;

  oscillator.type = options.type ?? "sine";
  oscillator.frequency.setValueAtTime(options.frequency, options.start);
  gain.gain.setValueAtTime(0.0001, options.start);
  gain.gain.exponentialRampToValueAtTime(options.volume, options.start + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);

  oscillator.connect(gain);
  gain.connect(destination);
  oscillator.start(options.start);
  oscillator.stop(end + 0.03);
}

function playPercussiveOscillator(
  context: AudioContext,
  destination: AudioNode,
  options: {
    frequency: number;
    start: number;
    duration: number;
    volume: number;
    type?: OscillatorType;
    endFrequency?: number;
  },
) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const end = options.start + options.duration;

  oscillator.type = options.type ?? "triangle";
  oscillator.frequency.setValueAtTime(options.frequency, options.start);
  oscillator.frequency.exponentialRampToValueAtTime(
    options.endFrequency ?? options.frequency,
    end,
  );
  gain.gain.setValueAtTime(0.0001, options.start);
  gain.gain.exponentialRampToValueAtTime(options.volume, options.start + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);

  oscillator.connect(gain);
  gain.connect(destination);
  oscillator.start(options.start);
  oscillator.stop(end + 0.02);
}

export function playWeddingChime() {
  const context = getAudioContext();

  if (!context) {
    return () => {};
  }

  const now = context.currentTime;
  const master = createGain(context, 0.22);

  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.22, now + 0.025);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

  [1046.5, 1318.5, 1568].forEach((frequency, index) => {
    playTone(context, master, {
      frequency,
      start: now + index * 0.08,
      duration: 0.68,
      volume: 0.11,
    });
  });

  playTone(context, master, {
    frequency: 2093,
    start: now + 0.22,
    duration: 0.48,
    volume: 0.055,
  });

  return () => {
    const stopAt = context.currentTime + 0.16;

    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setValueAtTime(master.gain.value, context.currentTime);
    master.gain.exponentialRampToValueAtTime(0.0001, stopAt);
  };
}

export function playRainbowDisco() {
  const context = getAudioContext();

  if (!context) {
    return () => {};
  }

  const now = context.currentTime;
  const master = createGain(context, 0.32);
  const beat = 0.3;

  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.32, now + 0.04);
  master.gain.setValueAtTime(0.32, now + 2.35);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 3.05);

  const bass = [98, 98, 130.81, 98, 146.83, 130.81, 98, 73.42];
  bass.forEach((frequency, index) => {
    playTone(context, master, {
      frequency,
      start: now + index * beat,
      duration: 0.22,
      volume: 0.12,
      type: "sawtooth",
    });
  });

  [0.3, 0.9, 1.5, 2.1].forEach((offset) => {
    [1700, 2300].forEach((frequency, layer) => {
      playPercussiveOscillator(context, master, {
        frequency,
        endFrequency: frequency * 0.72,
        start: now + offset + layer * 0.012,
        duration: 0.09,
        volume: 0.045,
        type: "square",
      });
    });
  });

  [0.15, 0.45, 0.75, 1.05, 1.35, 1.65, 1.95, 2.25].forEach((offset) => {
    playPercussiveOscillator(context, master, {
      frequency: 6200,
      endFrequency: 4200,
      start: now + offset,
      duration: 0.035,
      volume: 0.026,
      type: "square",
    });
  });

  [0, 0.6, 1.2, 1.8, 2.4].forEach((offset) => {
    playPercussiveOscillator(context, master, {
      frequency: 920,
      endFrequency: 760,
      start: now + offset,
      duration: 0.075,
      volume: 0.07,
      type: "square",
    });
  });

  [
    [523.25, 659.25, 783.99],
    [587.33, 739.99, 880],
    [659.25, 830.61, 987.77],
  ].forEach((chord, chordIndex) => {
    chord.forEach((frequency) => {
      playTone(context, master, {
        frequency,
        start: now + 0.15 + chordIndex * 0.75,
        duration: 0.16,
        volume: 0.055,
        type: "triangle",
      });
    });
  });

  [0.45, 1.05, 1.65, 2.25].forEach((offset) => {
    playTone(context, master, {
      frequency: 1200,
      start: now + offset,
      duration: 0.05,
      volume: 0.07,
      type: "triangle",
    });
  });

  return () => {
    const stopAt = context.currentTime + 0.18;

    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setValueAtTime(master.gain.value, context.currentTime);
    master.gain.exponentialRampToValueAtTime(0.0001, stopAt);
  };
}

export function playCameraShutter() {
  const context = getAudioContext();

  if (!context) {
    return () => {};
  }

  const now = context.currentTime;
  const master = createGain(context, 0.18);

  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);

  playPercussiveOscillator(context, master, {
    frequency: 180,
    endFrequency: 90,
    start: now,
    duration: 0.055,
    volume: 0.08,
    type: "triangle",
  });

  playPercussiveOscillator(context, master, {
    frequency: 2400,
    endFrequency: 900,
    start: now + 0.035,
    duration: 0.08,
    volume: 0.045,
    type: "square",
  });

  playPercussiveOscillator(context, master, {
    frequency: 520,
    endFrequency: 260,
    start: now + 0.14,
    duration: 0.12,
    volume: 0.05,
    type: "triangle",
  });

  return () => {
    const stopAt = context.currentTime + 0.08;

    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setValueAtTime(master.gain.value, context.currentTime);
    master.gain.exponentialRampToValueAtTime(0.0001, stopAt);
  };
}

export function playCeremonyMusicBox() {
  const context = getAudioContext();

  if (!context) {
    return () => {};
  }

  const now = context.currentTime;
  const master = createGain(context, 0.18);
  const shimmer = context.createGain();
  const notes = [
    523.25, 659.25, 783.99, 987.77, 880, 783.99, 659.25, 587.33,
    659.25, 783.99, 1046.5, 987.77, 783.99, 659.25, 587.33, 523.25,
    587.33, 659.25, 783.99, 880, 987.77, 880, 783.99, 659.25,
  ];

  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.18, now + 0.4);
  shimmer.gain.setValueAtTime(0.7, now);
  shimmer.connect(master);

  notes.forEach((frequency, index) => {
    const start = now + index * 0.34;
    const oscillator = context.createOscillator();
    const overtone = context.createOscillator();
    const gain = context.createGain();
    const overtoneGain = context.createGain();
    const end = start + 1.05;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    overtone.type = "triangle";
    overtone.frequency.setValueAtTime(frequency * 2.01, start);

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.08, start + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, end);
    overtoneGain.gain.setValueAtTime(0.0001, start);
    overtoneGain.gain.exponentialRampToValueAtTime(0.024, start + 0.018);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.55);

    oscillator.connect(gain);
    overtone.connect(overtoneGain);
    gain.connect(shimmer);
    overtoneGain.connect(shimmer);
    oscillator.start(start);
    overtone.start(start);
    oscillator.stop(end + 0.04);
    overtone.stop(start + 0.6);
  });

  [261.63, 329.63, 392, 493.88].forEach((frequency, index) => {
    playTone(context, master, {
      frequency,
      start: now + index * 1.36,
      duration: 2.4,
      volume: 0.025,
      type: "sine",
    });
  });

  return () => {
    const stopAt = context.currentTime + 0.45;

    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setValueAtTime(master.gain.value, context.currentTime);
    master.gain.exponentialRampToValueAtTime(0.0001, stopAt);
  };
}

export function playAirplaneTakeoff() {
  const context = getAudioContext();

  if (!context) {
    return () => {};
  }

  const now = context.currentTime;
  const master = createGain(context, 0.34);
  const filter = context.createBiquadFilter();
  const engine = context.createOscillator();
  const engineGain = context.createGain();
  const lift = context.createOscillator();
  const liftGain = context.createGain();
  const rumble = context.createOscillator();
  const rumbleGain = context.createGain();

  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.34, now + 0.15);
  master.gain.setValueAtTime(0.34, now + 2.8);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(420, now);
  filter.frequency.exponentialRampToValueAtTime(2400, now + 2.7);
  filter.Q.setValueAtTime(0.8, now);
  filter.connect(master);

  engine.type = "sawtooth";
  engine.frequency.setValueAtTime(82, now);
  engine.frequency.exponentialRampToValueAtTime(210, now + 3.2);
  engineGain.gain.setValueAtTime(0.0001, now);
  engineGain.gain.exponentialRampToValueAtTime(0.16, now + 0.22);
  engineGain.gain.setValueAtTime(0.16, now + 2.7);
  engineGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);
  engine.connect(engineGain);
  engineGain.connect(filter);

  rumble.type = "triangle";
  rumble.frequency.setValueAtTime(42, now);
  rumble.frequency.exponentialRampToValueAtTime(70, now + 2.4);
  rumbleGain.gain.setValueAtTime(0.0001, now);
  rumbleGain.gain.exponentialRampToValueAtTime(0.11, now + 0.18);
  rumbleGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.6);
  rumble.connect(rumbleGain);
  rumbleGain.connect(master);

  lift.type = "sine";
  lift.frequency.setValueAtTime(360, now + 0.8);
  lift.frequency.exponentialRampToValueAtTime(980, now + 3.35);
  liftGain.gain.setValueAtTime(0.0001, now + 0.8);
  liftGain.gain.exponentialRampToValueAtTime(0.075, now + 1.7);
  liftGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.75);
  lift.connect(liftGain);
  liftGain.connect(master);

  [0.65, 1.25, 1.85, 2.45].forEach((offset) => {
    playPercussiveOscillator(context, master, {
      frequency: 150,
      endFrequency: 95,
      start: now + offset,
      duration: 0.09,
      volume: 0.045,
      type: "triangle",
    });
  });

  engine.start(now);
  rumble.start(now);
  lift.start(now + 0.8);
  engine.stop(now + 3.85);
  rumble.stop(now + 3.65);
  lift.stop(now + 3.8);

  return () => {
    const stopAt = context.currentTime + 0.18;

    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setValueAtTime(master.gain.value, context.currentTime);
    master.gain.exponentialRampToValueAtTime(0.0001, stopAt);
  };
}

export function playSleepLoop() {
  const context = getAudioContext();

  if (!context) {
    return () => {};
  }

  const now = context.currentTime;
  const master = createGain(context, 0.56);
  const activeNodes: OscillatorNode[] = [];
  const phraseTimers: number[] = [];
  const snoreTimers: number[] = [];
  let isStopping = false;

  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.56, now + 0.3);

  const playSnore = (intensity: "small" | "big") => {
    if (isStopping) {
      return;
    }

    const start = context.currentTime;
    const isBig = intensity === "big";
    const duration = isBig ? 1.28 + Math.random() * 0.16 : 0.76 + Math.random() * 0.12;
    const baseFrequency = (isBig ? 118 : 136) + Math.random() * 10;
    const throat = context.createOscillator();
    const buzz = context.createOscillator();
    const nasal = context.createOscillator();
    const throatGain = context.createGain();
    const buzzGain = context.createGain();
    const nasalGain = context.createGain();
    const throatFilter = context.createBiquadFilter();
    const nasalFilter = context.createBiquadFilter();

    throat.type = "sawtooth";
    throat.frequency.setValueAtTime(baseFrequency, start);
    throat.frequency.linearRampToValueAtTime(
      baseFrequency * (isBig ? 0.68 : 0.76),
      start + duration,
    );

    buzz.type = "triangle";
    buzz.frequency.setValueAtTime(baseFrequency * 0.52, start);
    buzz.frequency.linearRampToValueAtTime(
      baseFrequency * (isBig ? 0.42 : 0.47),
      start + duration,
    );

    nasal.type = "square";
    nasal.frequency.setValueAtTime(baseFrequency * (isBig ? 2.55 : 2.85), start);
    nasal.frequency.linearRampToValueAtTime(
      baseFrequency * (isBig ? 2.05 : 2.25),
      start + duration * 0.86,
    );

    throatFilter.type = "bandpass";
    throatFilter.frequency.setValueAtTime(isBig ? 245 : 310, start);
    throatFilter.frequency.linearRampToValueAtTime(
      isBig ? 185 : 235,
      start + duration,
    );
    throatFilter.Q.setValueAtTime(isBig ? 1.05 : 1.25, start);

    nasalFilter.type = "bandpass";
    nasalFilter.frequency.setValueAtTime(isBig ? 760 : 880, start);
    nasalFilter.frequency.linearRampToValueAtTime(
      isBig ? 540 : 680,
      start + duration,
    );
    nasalFilter.Q.setValueAtTime(2.4, start);

    throatGain.gain.setValueAtTime(0.0001, start);
    throatGain.gain.exponentialRampToValueAtTime(isBig ? 0.24 : 0.16, start + 0.16);
    throatGain.gain.setValueAtTime(isBig ? 0.22 : 0.14, start + duration * 0.48);
    throatGain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    buzzGain.gain.setValueAtTime(0.0001, start);
    buzzGain.gain.exponentialRampToValueAtTime(isBig ? 0.09 : 0.055, start + 0.18);
    buzzGain.gain.exponentialRampToValueAtTime(0.0001, start + duration * 0.92);

    nasalGain.gain.setValueAtTime(0.0001, start + 0.04);
    nasalGain.gain.exponentialRampToValueAtTime(isBig ? 0.105 : 0.075, start + 0.2);
    nasalGain.gain.exponentialRampToValueAtTime(0.0001, start + duration * 0.82);

    throat.connect(throatFilter);
    buzz.connect(throatFilter);
    throatFilter.connect(throatGain);
    throatGain.connect(master);
    buzz.connect(buzzGain);
    buzzGain.connect(master);
    nasal.connect(nasalFilter);
    nasalFilter.connect(nasalGain);
    nasalGain.connect(master);

    [throat, buzz, nasal].forEach((node) => {
      activeNodes.push(node);
      node.start(start);
      node.stop(start + duration + 0.04);
      node.onended = () => {
        const index = activeNodes.indexOf(node);

        if (index >= 0) {
          activeNodes.splice(index, 1);
        }
      };
    });
  };

  const schedulePhrase = () => {
    if (isStopping) {
      return;
    }

    [
      [0, "small"],
      [1120 + Math.random() * 120, "small"],
      [2280 + Math.random() * 160, "big"],
      [4740 + Math.random() * 180, "small"],
      [5900 + Math.random() * 120, "small"],
    ].forEach(([delay, intensity]) => {
      snoreTimers.push(
        window.setTimeout(() => playSnore(intensity as "small" | "big"), delay as number),
      );
    });

    phraseTimers.push(window.setTimeout(schedulePhrase, 7200 + Math.random() * 450));
  };

  schedulePhrase();

  return () => {
    const stopAt = context.currentTime + 0.5;

    isStopping = true;
    phraseTimers.forEach((timer) => window.clearTimeout(timer));
    snoreTimers.forEach((timer) => window.clearTimeout(timer));
    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setValueAtTime(master.gain.value, context.currentTime);
    master.gain.exponentialRampToValueAtTime(0.0001, stopAt);
    activeNodes.forEach((node) => {
      try {
        node.stop(stopAt + 0.05);
      } catch {
        // The snore node may already have ended naturally.
      }
    });
  };
}

export function playWatchTickLoop() {
  const context = getAudioContext();

  if (!context) {
    return () => {};
  }

  const now = context.currentTime;
  const master = createGain(context, 0.16);
  const timers: number[] = [];

  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.16, now + 0.3);

  const playTick = (isTock: boolean) => {
    const start = context.currentTime;
    const click = context.createOscillator();
    const body = context.createOscillator();
    const clickGain = context.createGain();
    const bodyGain = context.createGain();
    const filter = context.createBiquadFilter();

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(isTock ? 1450 : 1850, start);
    filter.Q.setValueAtTime(2.2, start);

    click.type = "square";
    click.frequency.setValueAtTime(isTock ? 980 : 1320, start);
    clickGain.gain.setValueAtTime(0.0001, start);
    clickGain.gain.exponentialRampToValueAtTime(
      isTock ? 0.038 : 0.046,
      start + 0.004,
    );
    clickGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.045);

    body.type = "triangle";
    body.frequency.setValueAtTime(isTock ? 260 : 310, start);
    body.frequency.exponentialRampToValueAtTime(isTock ? 210 : 240, start + 0.08);
    bodyGain.gain.setValueAtTime(0.0001, start);
    bodyGain.gain.exponentialRampToValueAtTime(
      isTock ? 0.024 : 0.028,
      start + 0.01,
    );
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.12);

    click.connect(clickGain);
    clickGain.connect(filter);
    filter.connect(master);
    body.connect(bodyGain);
    bodyGain.connect(master);
    click.start(start);
    body.start(start);
    click.stop(start + 0.055);
    body.stop(start + 0.14);
  };

  for (let index = 0; index < 20; index += 1) {
    timers.push(
      window.setTimeout(() => playTick(index % 2 === 1), index * 500),
    );
  }

  return () => {
    const stopAt = context.currentTime + 0.3;

    timers.forEach((timer) => window.clearTimeout(timer));
    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setValueAtTime(master.gain.value, context.currentTime);
    master.gain.exponentialRampToValueAtTime(0.0001, stopAt);
  };
}

export function playGoodbyeWave() {
  const context = getAudioContext();

  if (!context) {
    return () => {};
  }

  const now = context.currentTime;
  const master = createGain(context, 0.14);

  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.14, now + 0.3);

  [
    [659.25, 0],
    [783.99, 0.16],
    [987.77, 0.34],
    [880, 0.56],
    [783.99, 1.05],
    [987.77, 1.22],
    [1174.66, 1.42],
    [1046.5, 1.68],
  ].forEach(([frequency, offset]) => {
    playTone(context, master, {
      frequency,
      start: now + offset,
      duration: 0.72,
      volume: 0.04,
      type: "sine",
    });
  });

  [0.08, 0.42, 1.14, 1.52].forEach((offset) => {
    playPercussiveOscillator(context, master, {
      frequency: 1850,
      endFrequency: 1280,
      start: now + offset,
      duration: 0.08,
      volume: 0.018,
      type: "triangle",
    });
  });

  const horn = context.createOscillator();
  const hornLayer = context.createOscillator();
  const hornGain = context.createGain();
  const hornFilter = context.createBiquadFilter();
  const hornStart = now + 0.48;
  const hornEnd = hornStart + 2.8;

  horn.type = "sine";
  horn.frequency.setValueAtTime(146.83, hornStart);
  horn.frequency.linearRampToValueAtTime(138.59, hornEnd);
  hornLayer.type = "triangle";
  hornLayer.frequency.setValueAtTime(293.66, hornStart);
  hornLayer.frequency.linearRampToValueAtTime(277.18, hornEnd);
  hornFilter.type = "lowpass";
  hornFilter.frequency.setValueAtTime(720, hornStart);
  hornFilter.Q.setValueAtTime(0.55, hornStart);
  hornGain.gain.setValueAtTime(0.0001, hornStart);
  hornGain.gain.exponentialRampToValueAtTime(0.028, hornStart + 0.45);
  hornGain.gain.setValueAtTime(0.028, hornStart + 1.65);
  hornGain.gain.exponentialRampToValueAtTime(0.0001, hornEnd);
  horn.connect(hornFilter);
  hornLayer.connect(hornFilter);
  hornFilter.connect(hornGain);
  hornGain.connect(master);
  horn.start(hornStart);
  hornLayer.start(hornStart);
  horn.stop(hornEnd + 0.05);
  hornLayer.stop(hornEnd + 0.05);

  return () => {
    const stopAt = context.currentTime + 0.45;

    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setValueAtTime(master.gain.value, context.currentTime);
    master.gain.exponentialRampToValueAtTime(0.0001, stopAt);
  };
}
