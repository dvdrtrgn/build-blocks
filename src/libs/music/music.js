import * as Tone from 'tone';
import {
  makeHigh,
  makeNorm,
  makeMelody,
  makeSnare,
  makeBass,
  makeKick,
} from './parts';

Tone.Transport.bpm.value = 150;

const MAX = 0;

function hasStarted() {
  return Tone.Transport.state === 'started';
}

function tryToggle() {
  if (!this.started) {
    Tone.start().then(() => {
      Tone.Transport.start();
    });
    this.started = true;
  } else {
    Tone.Transport.stop();
    this.started = false;
  }
}

let IDX = 0;
let list;

function dispose() {
  Tone.Transport.cancel(0);
}

function remakeList() {
  list = {
    '.': 'music_misc' + IDX++,
    Tone,
    highChordPart: makeHigh(MAX - 10),
    normChordPart: makeNorm(MAX - 25),
    melodyPart: makeMelody(MAX - 15),
    snarePart: makeSnare(MAX - 20),
    bassPart: makeBass(MAX - 0),
    kickPart: makeKick(MAX - 10),
  };
  // window[list['.']] = list;
  console.log(list);
}

remakeList();

export { list };

export default {
  started: hasStarted(),
  tryToggle,
  remakeList,
  dispose
};
