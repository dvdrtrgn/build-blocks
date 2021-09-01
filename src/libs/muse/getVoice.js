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
  #cue;
  #timeout;
  #tone;

  constructor(name) {
    this.name = name;
    this.#tone = new Tone.Synth().toDestination();
  }

  timer(cb, sec) {
    this.#timeout = setTimeout(cb, sec * 1000);
  }

  stop() {
    clearTimeout(this.#timeout);

    this.#tone.triggerRelease();
    this.running = false;
    this.#cue.playing = false;
    this.#cue.cutShort();
  }

  play(cue, cb) {
    if (cue.isNote) {
      this.#tone.triggerAttackRelease(...cue.params);
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
    this.#cue = makeCue(pitch, duration || 0.1);

    if (this.running) this.stop();

    this.play(this.#cue);

    return this.#cue;
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
