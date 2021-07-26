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

const list = {
  high: makeHigh(-15),
  norm: makeNorm(-30),
  melody: makeMelody(-20),
  snare: makeSnare(-25),
  bass: makeBass(0),
  kick: makeKick(-15),
};

console.log(list);
window.foolist = list;

export default {
  // scheduleEvents,
  // resetTransport,
};
export { list };
