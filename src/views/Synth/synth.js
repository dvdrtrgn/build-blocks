import * as Tone from 'tone';

class Wrapper {
  constructor() {
    this.voice = new Tone.Synth().toDestination();
    this.schedule = null;
    this.playing = false;
    this.pitch = 'C4';
    this.duration = 1;
  }

  timer(fn) {
    this.schedule = setTimeout(fn, this.duration * 1000);
  }
  stop() {
    clearTimeout(this.schedule);

    this.voice.triggerRelease();
    this.playing = false;
  }
  start(pitch, duration) {
    if (this.playing) this.stop();

    this.pitch = pitch || this.pitch;
    this.duration = duration || this.duration;

    this.voice.triggerAttackRelease(this.pitch, this.duration);
    this.playing = true;

    this.timer(() => (this.playing = false));
  }
}

function synth() {
  const self = new Wrapper();
  // console.log('new synth wrapper', self);
  return self;
}

export default synth;
