/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-11-03
  IDEA    Test play
  NOTE    ?
  TODO    ?

 */
import U from '../util';
import Play from '../index';
import Skew from './skew';
import SONGS from '../data/songs';


var NOM = 'Play_test';
var W = window;
var C = W.console;
C.debug(NOM, 'loaded');

// - - - - - - - - - - - - - - - - - -
// HELPERS

function shuffler(sort) {
  var bias = U.numalize(sort); // reverse(-1) < random(0) < normal(+1)

  return function () {
    var norm = Math.random() * 2 - 1;
    return Math.sign(norm + bias);
  };
}

function logRatios() {
  var ratios = Play.Mode.RATIO;
  var sumDrift = (a, b) => a + Math.abs(b);

  C.log('sumDrift', {
    ratios,
    frc: ratios.abs.map((e, i) => e - ratios.frc[i]).reduce(sumDrift).toFixed(8),
    pct: ratios.abs.map((e, i) => e - ratios.pct[i]).reduce(sumDrift).toFixed(8),
    num: ratios.abs.map((e, i) => e - ratios.num[i]).reduce(sumDrift).toFixed(8),
  });
}

// - - - - - - - - - - - - - - - - - -
// TESTING

var Test = {
  logRatios,
  bong: function () {
    W.tone = { // expose notes for testing
      a: Play.Tone.play(111, 3, 'triangle'),
      b: Play.Tone.play(333, 2, 0),
      c: Play.Tone.play(555, 1),
    };
  },
  toodle: function (mix) {
    var scale = Play.Mode.get('harmonic minor').freqs;
    var rando = shuffler(U.aorb(mix, 0.5));

    Play.notes(scale.sort(rando));
  },
  twinkle: function () {
    Play.notes([683, 1290, 574, 5133], 99);
  },
  mary: Skew.init(SONGS.gary),
};

function init() {
  try {
    // Play.Mixer.init();

    // Test.twinkle();
    // Test.bong();
    // Test.toodle();
  } catch (err) {
    C.warn(NOM, 'oh well', err);
  }
  return Test;
}

export default init();

/*



 */
