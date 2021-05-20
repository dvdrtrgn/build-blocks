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
    this.timeout = null;
    this.playing = false;
  }

  getMaster() {
    return Tone;
  }

  timer(cb, sec) {
    this.timeout = setTimeout(cb, sec * 1000);
  }

  stop() {
    clearTimeout(this.timeout);

    this.voice.triggerRelease();
    this.playing = false;
    this.note.cutShort();
  }

  play(note, cb) {
    this.voice.triggerAttackRelease(...note.params);

    this.playing = true;

    this.timer(() => {
      this.playing = false;
      if (cb) cb();
    }, note.duration);
  }

  start(pitch, duration) {
    this.note = new Note(pitch, duration || 0.1);

    if (this.playing) this.stop();

    this.play(this.note);
  }
}

function make(voicename) {
  let voice = getVoice(voicename);
  let self = new Wrapper(voice);

  return self;
}

export default { make, voices };
