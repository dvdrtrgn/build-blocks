/*
  A Cue is basically a note with a time component
  it models the pitch and duration
  it also provides meta data, labels, rest (no pitch)

*/
import * as Tone from 'tone';
import interval from './interval';

function aprox(num) {
  return Math.round((Number(num) + Number.EPSILON) * 10) / 10;
}

class Cue {
  name = '';
  playing = false;
  _end = 0;
  #start = 0;

  constructor(name, duration) {
    let now = Tone.now();

    this.#start = now;
    this._end = now;

    this.name = name;
    this.duration = duration;

    this.interval = interval.lookup(this.label);
  }

  cutShort() {
    this._end = Tone.now();
    delete this.cutShort; // one use only
  }

  toString() {
    return [this.name, this.duration].join(' ');
  }

  get params() {
    return [this.name, this.duration, this.delay];
  }

  set name(val) {
    if (val == 0 || val == 'R') val = '0'; // Hack for rests
    this.name = val;
  }

  get duration() {
    return aprox(this._end - this.#start);
  }
  set duration(val) {
    this._end = this.#start + Number(val);
  }

  get delay() {
    return Tone.now();
  }
  get label() {
    return this.isRest ? 'R' : this.name;
  }
  get isNote() {
    return this.name != '0';
  }
  get isRest() {
    return this.name == '0';
  }
}

function makeCue(name, duration) {
  let self = new Cue(name, parseFloat(duration));

  // console.log('make', self);

  return self;
}

export default makeCue;
