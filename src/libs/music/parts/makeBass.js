import * as Tone from 'tone';

export function makeBass(volume) {
  const bassline = [
    { time: '0:0', note: 'A1', duration: '2n' },
    { time: '0:3', note: 'F1', duration: '2n' },
    { time: '1:3', note: 'D1', duration: '2n' },
    { time: '2:3', note: 'F1', duration: '1:1' },
  ];

  const bass = new Tone.Synth({
    oscillator: {
      type: 'triangle',
      volume: volume,
    },
  }).toDestination();

  const bassPart = new Tone.Part(function(time, note) {
    bass.triggerAttackRelease(note.note, note.duration, time);
  }, bassline).start(0);

  return bassPart;
}
