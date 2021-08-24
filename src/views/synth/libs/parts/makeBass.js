import * as Tone from 'tone';

export function makeBass(volume) {
  const vol = volume;

  const data = [
    { time: '0:0', note: 'A1', duration: '2n' },
    { time: '0:3', note: 'F1', duration: '2n.' },
    { time: '1:3', note: 'D1', duration: '2n.' },
    { time: '2:3', note: 'F1', duration: '1:1' },
  ];

  const synth = new Tone.Synth({
    oscillator: {
      type: 'triangle',
    },
  });

  const trigger = (time, value) => {
    synth.triggerAttackRelease(value.note, value.duration, time);
  };

  return { data, synth, vol, trigger };
}
