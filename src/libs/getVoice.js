import * as Tone from 'tone';
import makeCue from './makeCue.js';

const allVoices = {};

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

function findVoice(name) {
  let voice;

  if (allVoices[name]) {
    voice = allVoices[name];
  } else {
    voice = new Tone.Synth().toDestination();
    allVoices[name] = voice;
    console.log('new synth wrapper', name, allVoices);
  }

  return voice;
}

function getVoice(name) {
  let voice = findVoice(name || 'default');
  let self = new Voice(voice);

  return self;
}

export default getVoice;

window.addEventListener('load', function() {
  window.Tone = Tone;
  getVoice().start(33);
});
