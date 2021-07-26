import * as Tone from 'tone';
import {
  makeHigh,
  makeNorm,
  makeMelody,
  makeSnare,
  makeBass,
  makeKick,
} from './parts/';

const MAX = 0;
let IDX = 0;
let list;

function resetTransport() {
  Tone.Transport.cancel(0);
  Tone.Transport.bpm.value = 150;
  Tone.Transport.loop = true;
  Tone.Transport.setLoopPoints('0m', '8m');
}

function scheduleEvents() {
  resetTransport();
  list = {
    '.': 'music_list' + IDX++,
    high: makeHigh(MAX - 10),
    norm: makeNorm(MAX - 25),
    melody: makeMelody(MAX - 15),
    snare: makeSnare(MAX - 20),
    bass: makeBass(MAX + 5),
    kick: makeKick(MAX - 10),
  };
  window[list['.']] = list;
  console.log(list);
}

export default {
  scheduleEvents,
  resetTransport,
};
export { list };
