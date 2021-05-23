import * as Tone from 'tone';
import makeCue from './makeCue.js';

const allVoices = {};

function findVoice(name) {
  let voice = new Tone.Synth().toDestination();

  if (allVoices[name]) {
    voice = allVoices[name];
  } else {
    allVoices[name] = voice;
    console.log('new synth wrapper', name, allVoices);
  }

  return voice;
}

class Voice {
  _parent = Tone;

  constructor(voice) {
    this.voice = voice;
    this.timeout = null;
    this.playing = false;
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
    // why remake? just expect a cue?
    this.cue = makeCue(pitch, duration || 0.1);

    if (this.playing) this.stop();

    this.play(this.cue);
  }
}

function get(voicename) {
  let voice = findVoice(voicename);
  let self = new Voice(voice);

  return self;
}

export default get;

window.addEventListener('load', function() {
  window.Tone = Tone;
  get().start(33);
});
