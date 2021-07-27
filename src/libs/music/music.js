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
import { lazy, walkProps } from './utils';

Tone.Transport.bpm.value = 150;
Tone.Transport.loop = true;
Tone.Transport.setLoopPoints('0m', '8m');

function eventsInfo() {
  const keys = Object.keys(Tone.Transport._scheduledEvents);
  return {
    count: keys.length,
    last: keys.at(-1),
  };
}

const Music = {
  start: Tone.start,
  clearAll: () => Tone.Transport.cancel(0),
  toggle: () => Tone.Transport.toggle(),
  play: () => Tone.Transport.start(),
  pause: () => Tone.Transport.pause(),
  stop: () => Tone.Transport.stop(),
  info: () => console.log(eventsInfo()),
  volume: Tone.Destination.volume,
  transport: Tone.Transport,
};

function initPart(obj) {
  let _private = obj.addPart;
  obj.part = _private();
  obj.clearPart = () => {
    obj.part.cancel(0);
  };
  obj.addPart = () => {
    obj.clearPart();
    obj.part = _private();
  };
}

function makeList() {
  Music.clearAll();

  const partList = {
    accent: makeAccent(-15),
    chords: makeChords(-30),
    melody: makeMelody(-30),
    snare: makeSnare(-25),
    bass: makeBass(0),
    kick: makeKick(-15),
  };

  walkProps(partList, initPart);

  console.log(eventsInfo(), partList);
  return partList;
}

const Parts = makeList();

Music.clearEvery = () => {
  walkProps(Parts, obj => obj.clearPart());
};
Music.addEvery = () => {
  walkProps(Parts, obj => obj.addPart());
};

// EXPOSE
export { Music, Vol, Parts, lazy };

window.Tone = Tone;
window.Foo = { Music, Vol, Parts, lazy };
