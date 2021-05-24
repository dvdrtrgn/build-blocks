import * as Tone from 'tone';
import makeCue from './makeCue.js';

const allVoices = {};

class Voice {
  // _parent = Tone;
  playing = false;
  timeout = null;
  #voicebox = null;

  constructor(name) {
    this.name = name;
    this.#voicebox = new Tone.Synth().toDestination();
  }

  timer(cb, sec) {
    this.timeout = setTimeout(cb, sec * 1000);
  }

  stop() {
    clearTimeout(this.timeout);

    this.#voicebox.triggerRelease();
    this.playing = false;
    this.cue.cutShort();
  }

  play(cue, cb) {
    if (cue.isNote) {
      this.#voicebox.triggerAttackRelease(...cue.params);
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

function getVoice(name = 'default') {
  let voice = allVoices[name];

  if (!voice) {
    voice = new Voice(name);
    allVoices[name] = voice;

    console.log('get', voice);
  }

  return voice;
}

export default getVoice;

window.addEventListener('load', function() {
  window.Tone = Tone;
  getVoice().start(33);
});
