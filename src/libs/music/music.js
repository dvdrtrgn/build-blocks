import * as Tone from 'tone';
import constructMajorChord from './constructMajorChord';

Tone.Transport.bpm.value = 150;

function makeMisc(volume) {
  const IChord = constructMajorChord('AMinor', 4, 'A3');
  const VChord = constructMajorChord('AMinor', 4, 'E4');
  const VIChord = constructMajorChord('AMinor', 3, 'F3');
  const IVChord = constructMajorChord('AMinor', 3, 'D3');

  IChord.push('A2', 'G4');
  VChord.push('E2', 'G3');
  VIChord.push('F2', 'E4');
  IVChord.push('D2', 'C4');
  IChord.push('A3', 'G5');
  VChord.push('E3', 'D5');
  VIChord.push('F3', 'E5');
  IVChord.push('D3', 'C5');

  const mainChords = [
    { time: 0, note: IChord, duration: '2n.' },
    { time: '0:3', note: VChord, duration: '4n' },
    { time: '1:0', note: VIChord, duration: '2n.' },
    { time: '1:3', note: VChord, duration: '4n' },
    { time: '2:0', note: IVChord, duration: '2n.' },
    { time: '2:3', note: VChord, duration: '4n' },
    { time: '3:0', note: VIChord, duration: '2n' },
    { time: '3:2', note: VChord, duration: '4n' },
    { time: '3:3', note: IVChord, duration: '4n' },
    { time: '4:0', note: IChord, duration: '2n.' },
    { time: '4:3', note: VChord, duration: '4n' },
    { time: '5:0', note: VIChord, duration: '2n.' },
    { time: '5:3', note: VChord, duration: '4n' },
    { time: '6:0', note: IVChord, duration: '2n.' },
    { time: '6:3', note: VChord, duration: '4n' },
    { time: '7:0', note: VIChord, duration: '2n' },
    { time: '7:2', note: VChord, duration: '4n' },
    { time: '7:3', note: IVChord, duration: '4n' },
  ];

  const synth = new Tone.PolySynth(Tone.Synth, {
    volume: volume,
    oscillator: {
      type: 'sawtooth',
    },
  }).toDestination();

  const miscPart = new Tone.Part(function(time, note) {
    synth.triggerAttackRelease(note.note, note.duration, time);
  }, mainChords).start(0);

  return miscPart;
}

function makeHigh(volume) {
  const IChord1 = constructMajorChord('AMinor', 5, 'A4');
  const VChord1 = constructMajorChord('AMinor', 5, 'E5');
  const VIChord1 = constructMajorChord('AMinor', 4, 'F4');
  const IVChord1 = constructMajorChord('AMinor', 4, 'D4');

  const highOctaveChords = [
    { time: 0, note: IChord1, duration: '2n.' },
    { time: '0:3', note: VChord1, duration: '4n' },
    { time: '1:0', note: VIChord1, duration: '2n.' },
    { time: '1:3', note: VChord1, duration: '4n' },
    { time: '2:0', note: IVChord1, duration: '2n.' },
    { time: '2:3', note: VChord1, duration: '4n' },
    { time: '3:0', note: VIChord1, duration: '2n' },
    { time: '3:2', note: VChord1, duration: '4n' },
    { time: '3:3', note: IVChord1, duration: '4n' },
    { time: '4:0', note: IChord1, duration: '2n.' },
    { time: '4:3', note: VChord1, duration: '4n' },
    { time: '5:0', note: VIChord1, duration: '2n.' },
    { time: '5:3', note: VChord1, duration: '4n' },
    { time: '6:0', note: IVChord1, duration: '2n.' },
    { time: '6:3', note: VChord1, duration: '4n' },
    { time: '7:0', note: VIChord1, duration: '2n' },
    { time: '7:2', note: VChord1, duration: '4n' },
    { time: '7:3', note: IVChord1, duration: '4n' },
  ];

  const highSynth = new Tone.PolySynth(Tone.Synth, {
    volume: volume,
    count: 6,
    spread: 80,
    oscillator: {
      type: 'fatsawtooth',
    },
  }).toDestination();

  const highOctaveChordPart = new Tone.Part(function(time, note) {
    highSynth.triggerAttackRelease(note.note, note.duration, time, 0.5);
  }, highOctaveChords).start(0);

  return highOctaveChordPart;
}

function makeMelody(volume) {
  const mainMelody = [
    { time: 0, note: 'G4', duration: '8n' },
    { time: '0:0:2', note: 'F4', duration: '8n' },
    { time: '0:1', note: 'D4', duration: '8n.' },
    { time: '0:2', note: 'D4', duration: '8n' },
    { time: '0:2:2', note: 'F4', duration: '8n.' },
    { time: '0:3', note: 'G4', duration: '8n' },
    { time: '0:3:2', note: 'A4', duration: '2n' },
    { time: '2:0', note: 'A4', duration: '8n' },
    { time: '2:0:2', note: 'G4', duration: '8n' },
    { time: '2:1', note: 'F4', duration: '8n' },
    { time: '2:2', note: 'A4', duration: '8n' },
    { time: '2:2:2', note: 'G4', duration: '8n' },
    { time: '2:3', note: 'E4', duration: '8n' },
    { time: '2:3:2', note: 'F4', duration: '2n' },
    { time: '4:0', note: 'G4', duration: '8n' },
    { time: '4:0:2', note: 'F4', duration: '8n' },
    { time: '4:1', note: 'D4', duration: '8n' },
    { time: '4:2', note: 'F4', duration: '8n' },
    { time: '4:2:2', note: 'A4', duration: '8n' },
    { time: '4:3', note: 'G4', duration: '8n' },
    { time: '4:3:2', note: 'A4', duration: '2n' },
    { time: '5:2:2', note: 'G4', duration: '8n' },
    { time: '5:3', note: 'A4', duration: '8n' },
    { time: '5:3:2', note: 'B4', duration: '8n' },
    { time: '6:0', note: 'C5', duration: '8n' },
    { time: '6:1', note: 'B4', duration: '8n' },
    { time: '6:1:2', note: 'A4', duration: '8n' },
    { time: '6:2', note: 'B4', duration: '8n' },
    { time: '6:2:2', note: 'A4', duration: '8n' },
    { time: '6:3', note: 'G4', duration: '8n' },
    { time: '6:3:2', note: 'A4', duration: '1n' },
  ];

  const synth2 = new Tone.Synth({
    oscillator: {
      volume: volume,
      count: 3,
      spread: 40,
      type: 'fatsawtooth',
    },
  }).toDestination();

  const mainMelodyPart = new Tone.Part(function(time, note) {
    synth2.triggerAttackRelease(note.note, note.duration, time);
  }, mainMelody).start(0);

  return mainMelodyPart;
}

function makeSnare(volume) {
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

function makeKick(volume) {
  const kickDrum = new Tone.MembraneSynth({
    volume: volume,
  }).toDestination();

  const kicks = [
    { time: '0:0' },
    { time: '0:3:2' },
    { time: '1:1' },
    { time: '2:0' },
    { time: '2:1:2' },
    { time: '2:3:2' },
    { time: '3:0:2' },
    { time: '3:1:' },
    { time: '4:0' },
    { time: '4:3:2' },
    { time: '5:1' },
    { time: '6:0' },
    { time: '6:1:2' },
    { time: '6:3:2' },
    { time: '7:0:2' },
    { time: '7:1:' },
  ];

  const kickPart = new Tone.Part(function(time) {
    kickDrum.triggerAttackRelease('C1', '8n', time);
  }, kicks).start(0);

  return kickPart;
}

function makeBass(volume) {
  const bassline = [
    { time: 0, note: 'A1', duration: '2n' },
    { time: '0:3', note: 'F1', duration: '2n.' },
    { time: '1:3', note: 'D1', duration: '2n.' },
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

const MAX = 0;

function hasStarted() {
  return Tone.Transport.state === 'started';
}

function tryToggle() {
  if (!this.started) {
    Tone.Transport.start();
    this.started = true;
  } else {
    Tone.Transport.stop();
    this.started = false;
  }
}

export default {
  started: hasStarted(),
  tryToggle,
};

export const misc = {
  '.': 'music/misc',
  mainMelodyPart: makeMelody(MAX - 15),
  snarePart: makeSnare(MAX - 20),
  bassPart: makeBass(MAX - 0),
  kickPart: makeKick(MAX - 10),
  highOctaveChordPart: makeHigh(MAX - 10),
  miscPart: makeMisc(MAX - 25),
};
