import * as Tone from 'tone';

class Note {
  constructor(pitch, duration) {
    let now = Tone.now();

    this.pitch = pitch || 'C4';
    this.start = now;
    this.end = now + (duration || 0.01);
  }

  cutShort(time) {
    time = time || Tone.now();
    if (time < this.end) this.end = time;
  }

  vitals() {
    let { pitch, duration } = this;

    duration = parseFloat(duration.toPrecision(3));

    return [pitch, duration].join(' ');
  }

  get params() {
    return [this.pitch, this.duration, this.delay];
  }
  get duration() {
    return this.end - this.start;
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
