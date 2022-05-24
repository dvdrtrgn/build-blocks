import * as Tone from 'tone';
import constructMajorChord from './constructMajorChord.js';

const chord1 = constructMajorChord('AMinor', 4, 'A3');
chord1.push('A2', 'G4');
chord1.push('A3', 'G5');

const chord4 = constructMajorChord('AMinor', 3, 'D3');
chord4.push('D2', 'C4');
chord4.push('D3', 'C5');

const chord5 = constructMajorChord('AMinor', 4, 'E4');
chord5.push('E2', 'G3');
chord5.push('E3', 'D5');

const chord6 = constructMajorChord('AMinor', 3, 'F3');
chord6.push('F2', 'E4');
chord6.push('F3', 'E5');

export function makeChords(volume) {
  const vol = volume;

  const data = [
    { time: '0:0', note: chord1, duration: '2n.' },
    { time: '0:3', note: chord5, duration: '4n' },
    { time: '1:0', note: chord6, duration: '2n.' },
    { time: '1:3', note: chord5, duration: '4n' },
    { time: '2:0', note: chord4, duration: '2n.' },
    { time: '2:3', note: chord5, duration: '4n' },
    { time: '3:0', note: chord6, duration: '2n' },
    { time: '3:2', note: chord5, duration: '4n' },
    { time: '3:3', note: chord4, duration: '4n' },
    { time: '4:0', note: chord1, duration: '2n.' },
    { time: '4:3', note: chord5, duration: '4n' },
    { time: '5:0', note: chord6, duration: '2n.' },
    { time: '5:3', note: chord5, duration: '4n' },
    { time: '6:0', note: chord4, duration: '2n.' },
    { time: '6:3', note: chord5, duration: '4n' },
    { time: '7:0', note: chord6, duration: '2n' },
    { time: '7:2', note: chord5, duration: '4n' },
    { time: '7:3', note: chord4, duration: '4n' },
  ];

  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: 'sawtooth',
    },
  });

  const trigger = (time, value) => {
    synth.triggerAttackRelease(value.note, value.duration, time);
  };

  return { data, synth, vol, trigger };
}
