import * as Tone from 'tone';
import makeCue from './makeCue.js';

const voices = {};

function findVoice(name) {
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
    this.cue.cutShort();
  }

  play(cue, cb) {
    if (cue.isNote) {
      this.voice.triggerAttackRelease(...cue.params);
    }

    this.playing = true;

    this.timer(() => {
      this.playing = false;
      if (cb) cb();
    }, cue.duration);
  }

  start(pitch, duration) {
    this.cue = makeCue(pitch, duration || 0.1);

    if (this.playing) this.stop();

    this.play(this.cue);
  }
}

function make(voicename) {
  let voice = findVoice(voicename);
  let self = new SynthWrapper(voice);

  return self;
}

export default make;
