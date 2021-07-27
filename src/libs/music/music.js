import * as Tone from 'tone';
import Vol from './Vol';
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

function makeList() {
  Tone.Transport.cancel(0);

  const Parts = {
    accent: makeAccent(-15),
    chords: makeChords(-30),
    melody: makeMelody(-30),
    snare: makeSnare(-25),
    bass: makeBass(0),
    kick: makeKick(-15),
  };

  Object.keys(Parts).map(key => {
    const obj = Parts[key];

    obj.part = obj.addPart();
    obj.clearPart = () => obj.part.cancel(0);
  });

  console.log(Parts);

  return Parts;
}

const Parts = makeList();

function lazy(name, self, obj) {
  setInterval(() => (self['lazy_' + name] = obj[name]), 333);
  return obj[name];
}

const Music = {
  start: Tone.start,
  clear: () => Tone.Transport.cancel(0),
  toggle: () => Tone.Transport.toggle(),
  play: () => Tone.Transport.start(),
  pause: () => Tone.Transport.pause(),
  stop: () => Tone.Transport.stop(),
  volume: Tone.Destination.volume,
  transport: Tone.Transport,
};

// EXPOSE
export { Music, Vol, Parts, lazy };

window.Parts = Parts;
window.Tone = Tone;
