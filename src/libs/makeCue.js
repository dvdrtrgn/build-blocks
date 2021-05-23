import * as Tone from 'tone';

function aprox(num) {
  return Math.round((Number(num) + Number.EPSILON) * 10) / 10;
}

class Cue {
  name = '';
  _start = 0;
  _end = 0;

  constructor(name, duration) {
    let now = Tone.now();

    this._start = now;
    this._end = now;

    this.name = name;
    this.duration = duration;
  }

  cutShort() {
    this._end = Tone.now();
  }

  vitals() {
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
    let val = this._end - this._start;
    return aprox(val);
  }
  set duration(val) {
    this._end = this._start + Number(val);
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

function make(name, duration) {
  let self = new Cue(name, parseFloat(duration));

  return self;
}

export default make;
