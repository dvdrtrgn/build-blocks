import * as Tone from 'tone';
import Note from './Note.js';

const voices = {};

function getVoice(voicename) {
  let voice = new Tone.Synth().toDestination();

  if (voicename) {
    if (voices[voicename]) {
      voice = voices[voicename];
    } else {
      voices[voicename] = voice;
      console.log('new synth wrapper', voicename, voice);
    }
  }

  return voice;
}

class Wrapper {
  constructor(voice) {
    this.voice = voice;
    this.schedule = null;
    this.playing = false;
    this.pitch = 'C4';
    this.duration = 1;
  }

  getMaster() {
    return Tone;
  }

  timer(fn) {
    this.schedule = setTimeout(fn, this.duration * 1000);
  }

  stop() {
    clearTimeout(this.schedule);

    this.voice.triggerRelease();
    this.playing = false;
    this.note.cutShort();
  }

  start(pitch, duration) {
    this.note = new Note(pitch, duration);

    if (this.playing) this.stop();

    this.voice.triggerAttackRelease(...this.note.params);
    this.playing = true;

    this.timer(() => (this.playing = false));
  }
}

function make(voicename) {
  let voice = getVoice(voicename);
  let self = new Wrapper(voice);

  return self;
}

export default { make, voices };
