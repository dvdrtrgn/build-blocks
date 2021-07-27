import * as Tone from 'tone';
import constructMajorChord from './constructMajorChord';

const chord1 = constructMajorChord('AMinor', 5, 'A4');
const chord4 = constructMajorChord('AMinor', 4, 'D4');
const chord5 = constructMajorChord('AMinor', 5, 'E5');
const chord6 = constructMajorChord('AMinor', 4, 'F4');

export function makeAccent(volume) {
  const vol = new Tone.Volume(volume).toDestination();

  const data = [
    { time: '0:0', note: chord1, duration: '2n' },
    { time: '0:3', note: chord5, duration: '4n' },
    { time: '1:0', note: chord6, duration: '2n' },
    { time: '1:3', note: chord5, duration: '4n' },
    { time: '2:0', note: chord4, duration: '2n' },
    { time: '2:3', note: chord5, duration: '4n' },
    { time: '3:0', note: chord6, duration: '2n' },
    { time: '3:2', note: chord5, duration: '4n' },
    { time: '3:3', note: chord4, duration: '4n' },
    { time: '4:0', note: chord1, duration: '2n' },
    { time: '4:3', note: chord5, duration: '4n' },
    { time: '5:0', note: chord6, duration: '2n' },
    { time: '5:3', note: chord5, duration: '4n' },
    { time: '6:0', note: chord4, duration: '2n' },
    { time: '6:3', note: chord5, duration: '4n' },
    { time: '7:0', note: chord6, duration: '2n' },
    { time: '7:2', note: chord5, duration: '4n' },
    { time: '7:3', note: chord4, duration: '4n' },
  ];

  const synth = new Tone.PolySynth(Tone.Synth, {
    count: 6,
    spread: 80,
    oscillator: {
      type: 'fatsawtooth',
    },
  }).connect(vol);

  const part = new Tone.Part(function(time, value) {
    try {
      synth.triggerAttackRelease(value.note, value.duration, time, 0.5);
    } catch (err) {
      console.log(err);
    }
  }, data).start(0);

  return { data, synth, part, vol };
}
