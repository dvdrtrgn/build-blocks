import * as Tone from 'tone';
import {
  makeHigh,
  makeNorm,
  makeMelody,
  makeSnare,
  makeBass,
  makeKick,
} from './parts/';

Tone.Transport.bpm.value = 150;
Tone.Transport.loop = true;
Tone.Transport.setLoopPoints('0m', '8m');

const MAX = 0;

let IDX = 0;
let list;

function clearEvents() {
  Tone.Transport.cancel(0);
}

function scheduleEvents() {
  clearEvents(1);
  list = {
    '.': 'music_list' + IDX++,
    highChordPart: makeHigh(MAX - 10),
    normChordPart: makeNorm(MAX - 25),
    melodyPart: makeMelody(MAX - 15),
    snarePart: makeSnare(MAX - 20),
    bassPart: makeBass(MAX + 5),
    kickPart: makeKick(MAX - 10),
  };
  window[list['.']] = list;
  console.log(list);
}

scheduleEvents();

export { list };

export default {
  scheduleEvents,
  clearEvents,
};
