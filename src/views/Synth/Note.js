import * as Tone from 'tone';

class Note {
  constructor(pitch, duration) {
    let now = Tone.now();

    this.pitch = pitch || 'C4';
    this.duration = duration || 0.01;
    this.start = now;
    this.end = now + this.duration;
  }

  cutShort(time) {
    time = time || Tone.now();
    if (time < this.end) this.end = time;
  }

  get params() {
    return [this.pitch, this.duration, this.delay];
  }
  get length() {
    return this.end - this.start;
  }
  get delay() {
    return Tone.now();
  }
}

export default Note;
