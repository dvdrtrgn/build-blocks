/*
  create a list of voices for reuse
  todo: split into `voice` and `voices`
*/
import * as Tone from 'tone';
import makeCue from './makeCue.js';

const CACHE = {};

class Voice {
  // _parent = Tone;
  running = false;
  _cue;
  _timeout;
  _tone;

  constructor(name) {
    this.name = name;
    this._tone = new Tone.Synth().toDestination();
  }

  timer(cb, sec) {
    this._timeout = setTimeout(cb, sec * 1000);
  }

  stop() {
    clearTimeout(this._timeout);

    this._tone.triggerRelease();
    this.running = false;
    this._cue.playing = false;
    this._cue.cutShort();
  }

  play(cue, cb) {
    if (cue.isNote) {
      this._tone.triggerAttackRelease(...cue.params);
      cue.playing = true;
    }

    this.running = true;

    this.timer(() => {
      this.running = false;
      cue.playing = false;

      if (cb) cb();
    }, cue.duration);
  }

  makeCue(pitch, duration) {
    // why remake? just expect a cue?
    this._cue = makeCue(pitch, duration || 0.1);

    if (this.running) this.stop();

    this.play(this._cue);

    return this._cue;
  }
}

function getVoice(name = 'default') {
  let voice = CACHE[name];

  if (!voice) {
    voice = new Voice(name);
    CACHE[name] = voice;

    console.log('get', voice);
  }

  return voice;
}

export default getVoice;

window.addEventListener('load', function() {
  window.Tone = Tone;
  getVoice().makeCue(33); // init default voice
});
