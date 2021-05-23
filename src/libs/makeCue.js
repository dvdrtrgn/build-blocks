import * as Tone from 'tone';

function aprox(num) {
  return Math.round((Number(num) + Number.EPSILON) * 10) / 10;
}

class Cue {
  #pitch = '';

  constructor(pitch, duration) {
    let now = Tone.now();

    this.time = 0;
    this.pitch = pitch;
    this._start = now;
    this._end = now;
    this.duration = duration;
  }

  cutShort() {
    this._end = Tone.now();
  }

  vitals() {
    return [this.pitch, this.time].join(' ');
  }

  get params() {
    return [this.pitch, this.duration, this.delay];
  }

  get pitch() {
    return this.#pitch;
  }
  set pitch(val) {
    if (val == '0' || val == 'R') val = 0;
    this.#pitch = val;
  }

  get duration() {
    let val = this._end - this._start;
    this.time = aprox(val); // for quick read
    return val;
  }
  set duration(val) {
    this._end = this._start + Number(val);
    this.time = aprox(this.duration); // for quick read
  }

  get delay() {
    return Tone.now();
  }
  get name() {
    return this.rest ? 'R' : this.pitch;
  }
  get rest() {
    return this.pitch == '0';
  }
}

function make(pitch, duration) {
  let self = new Cue(pitch, parseFloat(duration));

  return self;
}

export default make;
