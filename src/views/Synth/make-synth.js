import * as Tone from 'tone';
import makeNote from './make-note.js';

const voices = {};

function getVoice(name) {
  let voice = new Tone.Synth().toDestination();

  if (name) {
    if (voices[name]) {
      voice = voices[name];
    } else {
      voices[name] = voice;
      console.log('new synth wrapper', name, voice);
    }
  }

  return voice;
}

class SynthWrapper {
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
    this.note = makeNote(pitch, duration || 0.1);

    if (this.playing) this.stop();

    this.play(this.note);
  }
}

function make(voicename) {
  let voice = getVoice(voicename);
  let self = new SynthWrapper(voice);

  return self;
}

export default make;
