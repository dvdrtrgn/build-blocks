import * as Tone from 'tone';

export function makeBass(volume) {
  const vol = new Tone.Volume(volume).toDestination();

  const data = [
    { time: '0:0', note: 'A1', duration: '2n' },
    { time: '0:3', note: 'F1', duration: '2n' },
    { time: '1:3', note: 'D1', duration: '2n' },
    { time: '2:3', note: 'F1', duration: '1:1' },
  ];

  const synth = new Tone.Synth({
    oscillator: {
      type: 'triangle',
    },
  }).connect(vol);

  const part = new Tone.Part(function(time, note) {
    synth.triggerAttackRelease(note.note, note.duration, time);
  }, data).start(0);

  return { data, synth, part, vol };
}
