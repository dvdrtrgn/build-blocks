import * as Tone from 'tone';

function aprox(num) {
  return Math.round((Number(num) + Number.EPSILON) * 10) / 10;
}

class Note {
  constructor(pitch, duration) {
    let now = Tone.now();

    this.time = 0;
    this.pitch = pitch;
    this.start = now;
    this.end = now;
    this.duration = duration;
  }

  cutShort() {
    this.end = Tone.now();
  }

  vitals() {
    let { pitch, time } = this;

    return [pitch, time].join(' ');
  }

  get params() {
    return [this.pitch, this.duration, this.delay];
  }
  get duration() {
    let val = this.end - this.start;
    this.time = aprox(val); // for quick read
    return val;
  }
  set duration(val) {
    this.end = this.start + Number(val);
    this.time = aprox(this.duration); // for quick read
  }
  get delay() {
    return Tone.now();
  }
}

function make(pitch, duration) {
  let self = new Note(pitch, parseFloat(duration));

  return self;
}

export default make;
