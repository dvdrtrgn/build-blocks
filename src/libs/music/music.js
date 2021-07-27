import * as Tone from 'tone';
import db from './db';
import {
  makeAccent,
  makeChords,
  makeMelody,
  makeSnare,
  makeBass,
  makeKick,
} from './parts/';

Tone.Transport.bpm.value = 150;
Tone.Transport.loop = true;
Tone.Transport.setLoopPoints('0m', '8m');

const list = {
  accent: makeAccent(-15),
  chords: makeChords(-30),
  melody: makeMelody(-30),
  snare: makeSnare(-25),
  bass: makeBass(0),
  kick: makeKick(-15),
};

Object.keys(list).map(key => {
  const obj = list[key];

  obj.part = obj.addPart();
  obj.clearPart = () => obj.part.clear(0);
});

console.log(list);
window.foolist = list;

export default {
  // scheduleEvents,
  // resetTransport,
};
export { list, db };

export function lazy(name, self, obj) {
  setInterval(() => (self['lazy_' + name] = obj[name]), 333);
  return obj[name];
}
