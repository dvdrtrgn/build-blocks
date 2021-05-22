import * as Tone from 'tone';

function aprox(num) {
  return Math.round((Number(num) + Number.EPSILON) * 100) / 100;
}

class Note {
  constructor(pitch, duration) {
    let now = Tone.now();

    this.pitch = pitch || 'C4';
    this.start = now;
    this.end = now;
    this.duration = duration || 0.01;
  }

  cutShort(time) {
    time = time || Tone.now();
    if (time < this.end) this.end = time;
  }

  vitals() {
    let { pitch, aprox } = this;

    return [pitch, aprox].join(' ');
  }

  get params() {
    return [this.pitch, this.duration, this.delay];
  }
  get duration() {
    let val = this.end - this.start;
    this.aprox = aprox(val); // for quick read
    return val;
  }
  set duration(val) {
    this.end = this.start + Number(val);
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
