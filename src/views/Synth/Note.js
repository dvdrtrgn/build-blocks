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

  export() {
    let { pitch, duration } = this;

    duration = parseFloat(duration.toPrecision(3));

    return { pitch, duration };
  }

  get params() {
    return [this.pitch, this.duration, this.delay];
  }
  get duration() {
    return this.end - this.start;
  }
  get delay() {
    return Tone.now();
  }
}

export default Note;