import * as Tone from 'tone';
import ScaleNotes from './scaleNotes.js';
import Synths from './synths/index.js';

const TICK = 0.3;
const HOLD = TICK / 1.7;

const API = {
  Tone,
  synth: Synths.get(),
  synthname: 'default',
  setSynth(arg = this.synthname) {
    if (this.synth) this.synth.dispose();
    this.synthname = arg;
    this.synth = Synths.get(this.synthname);
  },
  enable() {
    Tone.start();
  },
  stop() {
    this.setSynth(); // convenience
  },
  hitNote(note = 'C4', delay = 0) {
    const now = Tone.now();
    this.enable();

    if (note === '_') return; //  console.log('rest')

    let start = now + delay;
    let duration = start + HOLD;

    this.synth.triggerAttack(note, start);
    this.synth.triggerRelease(duration);
  },
  playSequence(notes = ['C4', 'F#4', 'G4']) {
    this.stop();
    for (let i = 0; i < notes.length; i++) {
      this.hitNote(notes[i], i * TICK);
    }
  },
};

window._ = {
  ScaleNotes,
  wrap: API,
};

export default API;
