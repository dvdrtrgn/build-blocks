import * as Tone from 'tone';

export function makeSnare(volume) {
  const vol = volume;

  const lowPass = new Tone.Filter({
    frequency: 8000,
  });

  const synth = new Tone.NoiseSynth({
    noise: {
      type: 'white',
      playbackRate: 3,
    },
    envelope: {
      attack: 0.001,
      decay: 0.2,
      sustain: 0.15,
      release: 0.03,
    },
  }).connect(lowPass);

  const data = [
    { time: '0:2' },
    { time: '1:2' },
    { time: '2:2' },
    { time: '3:2' },
    { time: '4:2' },
    { time: '5:2' },
    { time: '6:2' },
    { time: '7:2' },
  ];

  const trigger = (time, value) => {
    synth.triggerAttackRelease('4n', time);
  };

  return { data, synth, vol, trigger };
}
