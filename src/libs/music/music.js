import * as Tone from 'tone';
import { lazy, walkProps } from './utils';
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

function eventsInfo() {
  const keys = Object.keys(Tone.Transport._scheduledEvents);
  return {
    count: keys.length,
    last: keys.at(-1),
  };
}

const Synth = {
  ensure: () => Tone.start(),
  clearAll: () => Tone.Transport.cancel(0),
  toggle: () => Tone.Transport.toggle(),
  play: () => Tone.Transport.start(),
  pause: () => Tone.Transport.pause(),
  stop: () => Tone.Transport.stop(),
  info: () => console.log(eventsInfo()),
  volume: Tone.Destination.volume,
  transport: Tone.Transport,
};

function makePart(obj) {
  obj.part = new Tone.Part(function(time, value) {
    try {
      obj.trigger(time, value);
    } catch (err) {
      console.log(err.message);
    }
  }, obj.data).start(0);
}

function initPart(obj) {
  makePart(obj);

  obj.addPart = () => {
    obj.clearPart();
    makePart(obj);
  };
  obj.clearPart = () => {
    obj.part.cancel(0);
  };

  if (typeof obj.vol === 'number') {
    obj.vol = new Tone.Volume(obj.vol).toDestination();
    obj.synth.connect(obj.vol);
  }
}

function makeList() {
  Synth.clearAll();

  const partList = {
    accent: makeAccent(-15),
    chords: makeChords(-20),
    melody: makeMelody(-10),
    snare: makeSnare(-15),
    bass: makeBass(-5),
    kick: makeKick(-10),
  };

  walkProps(partList, initPart);

  console.log(eventsInfo(), partList);
  return partList;
}

const Parts = makeList();

Synth.addEvery = () => {
  walkProps(Parts, obj => obj.addPart());
};
Synth.clearEvery = () => {
  walkProps(Parts, obj => obj.clearPart());
};

// EXPOSE
export { Synth, Vol, Parts, lazy };

window.Tone = Tone;
window.Foo = { Synth, Vol, Parts, lazy };
