import * as Tone from 'tone';
import constructMajorChord from './constructMajorChord';

export function makeNorm(volume) {
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

  const mainChords = [
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
    volume: volume,
    oscillator: {
      type: 'sawtooth',
    },
  }).toDestination();

  const normChordPart = new Tone.Part(function(time, note) {
    synth.triggerAttackRelease(note.note, note.duration, time);
  }, mainChords).start(0);

  return normChordPart;
}

export function makeHigh(volume) {
  const chord1 = constructMajorChord('AMinor', 5, 'A4');
  const chord4 = constructMajorChord('AMinor', 4, 'D4');
  const chord5 = constructMajorChord('AMinor', 5, 'E5');
  const chord6 = constructMajorChord('AMinor', 4, 'F4');

  const highOctaveChords = [
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

  const highSynth = new Tone.PolySynth(Tone.Synth, {
    volume: volume,
    count: 6,
    spread: 80,
    oscillator: {
      type: 'fatsawtooth',
    },
  }).toDestination();

  const highChordPart = new Tone.Part(function(time, note) {
    highSynth.triggerAttackRelease(note.note, note.duration, time, 0.5);
  }, highOctaveChords).start(0);

  return highChordPart;
}

export function makeMelody(volume) {
  const mainMelody = [
    { note: 'G4', duration: '8n', time: 0 },
    { note: 'F4', duration: '8n', time: '0:0:2' },
    { note: 'D4', duration: '8n', time: '0:1' },
    { note: 'D4', duration: '8n', time: '0:2' },
    { note: 'F4', duration: '8n', time: '0:2:2' },
    { note: 'G4', duration: '8n', time: '0:3' },
    { note: 'A4', duration: '2n', time: '0:3:2' },
    { note: 'A4', duration: '8n', time: '2:0' },
    { note: 'G4', duration: '8n', time: '2:0:2' },
    { note: 'F4', duration: '8n', time: '2:1' },
    { note: 'A4', duration: '8n', time: '2:2' },
    { note: 'G4', duration: '8n', time: '2:2:2' },
    { note: 'E4', duration: '8n', time: '2:3' },
    { note: 'F4', duration: '2n', time: '2:3:2' },
    { note: 'G4', duration: '8n', time: '4:0' },
    { note: 'F4', duration: '8n', time: '4:0:2' },
    { note: 'D4', duration: '8n', time: '4:1' },
    { note: 'F4', duration: '8n', time: '4:2' },
    { note: 'A4', duration: '8n', time: '4:2:2' },
    { note: 'G4', duration: '8n', time: '4:3' },
    { note: 'A4', duration: '2n', time: '4:3:2' },
    { note: 'G4', duration: '8n', time: '5:2:2' },
    { note: 'A4', duration: '8n', time: '5:3' },
    { note: 'B4', duration: '8n', time: '5:3:2' },
    { note: 'C5', duration: '8n', time: '6:0' },
    { note: 'B4', duration: '8n', time: '6:1' },
    { note: 'A4', duration: '8n', time: '6:1:2' },
    { note: 'B4', duration: '8n', time: '6:2' },
    { note: 'A4', duration: '8n', time: '6:2:2' },
    { note: 'G4', duration: '8n', time: '6:3' },
    { note: 'A4', duration: '1n', time: '6:3:2' },
  ];

  const synth2 = new Tone.Synth({
    oscillator: {
      volume: volume,
      count: 3,
      spread: 40,
      type: 'fatsawtooth',
    },
  }).toDestination();

  const melodyPart = new Tone.Part(function(time, note) {
    synth2.triggerAttackRelease(note.note, note.duration, time);
  }, mainMelody).start(0);

  return melodyPart;
}

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

  return snarePart;
}

export function makeKick(volume) {
  const kickDrum = new Tone.MembraneSynth({
    volume: volume,
  }).toDestination();

  const kicks = [
    { time: '0:0:0' },
    { time: '0:3:2' },
    { time: '1:1:0' },
    { time: '2:0:0' },
    { time: '2:1:2' },
    { time: '2:3:2' },
    { time: '3:0:2' },
    { time: '3:1:0' },
    { time: '4:0:0' },
    { time: '4:3:2' },
    { time: '5:1:0' },
    { time: '6:0:0' },
    { time: '6:1:2' },
    { time: '6:3:2' },
    { time: '7:0:2' },
    { time: '7:1:0' },
  ];

  const kickPart = new Tone.Part(function(time) {
    kickDrum.triggerAttackRelease('C1', '8n', time);
  }, kicks).start(0);

  return kickPart;
}

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
