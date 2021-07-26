import * as Tone from 'tone';

export function makeSnare(volume) {
  const lowPass = new Tone.Filter({
    frequency: 8000,
  }).toDestination();

  const snareDrum = new Tone.NoiseSynth({
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
    volume: volume,
  }).connect(lowPass);

  const snares = [
    { time: '0:2' },
    { time: '1:2' },
    { time: '2:2' },
    { time: '3:2' },
    { time: '4:2' },
    { time: '5:2' },
    { time: '6:2' },
    { time: '7:2' },
  ];

  const snarePart = new Tone.Part(function(time) {
    snareDrum.triggerAttackRelease('4n', time);
  }, snares).start(0);

  return { snareDrum, snares, snarePart };
}
