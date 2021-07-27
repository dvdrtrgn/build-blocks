import * as Tone from 'tone';

export function makeBass(volume) {
  const vol = new Tone.Volume(volume).toDestination();

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
  }).connect(vol);

  const addPart = () => {
    return new Tone.Part(function(time, value) {
      try {
        synth.triggerAttackRelease(value.note, value.duration, time);
      } catch (err) {
        console.log(err.message);
      }
    }, data).start(0);
  };

  return { data, synth, vol, addPart };
}
