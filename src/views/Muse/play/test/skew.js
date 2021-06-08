/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-11-03
  IDEA    Test play
  NOTE    ?
  TODO    ?

 */

import U from '../util';
import Play from '../index';

var SONG = [];
var W = window;
var C = W.console;

function Test(mode, skew, root) {
  skew = skew || 0;
  C.log({mode, skew});

  Play.sing({
    mode, root, skew,
    notes: SONG.map(n => n + skew),
    // speed: 222,
  });
}

function double(mode, skew) {
  Test(mode, skew); //                  steps normal  root c
  Test(mode, skew + 7); //              steps octave  root c
}

export default {
  U,
  init: function (song) {
    SONG = song;
    return this;
  },
  mode: function (mode, skew) {
    mode = Play.Mode.resolveNumber(mode);
    skew = (skew || 0) * -1;
    double(mode, skew);
  },
  modeskew: function (mode, skew) {
    mode = Play.Mode.resolveNumber(mode);
    skew = (skew || 0) * -1;
    mode = (mode || 0) - skew;
    double(mode, skew);
  },
  orient: function () {
    double(9, 0);
  },
  same: function () {
    Test(0, 0, 512); //    mode ionian    steps normal  root c
    Test(2, 5, 645.12); // mode phrygian  steps offset  root e
  },
  funky: function () {
    Test(0, 0, 512); //    mode ionian    steps normal  root c
    Test(2, 0, 645.12); // mode phrygian  steps normal  root e
  },
  resi: function (hrz) {
    Test(0, 0, hrz); //    mode ionian    steps normal
    Test(2, -2, hrz); //   mode phrygian  steps offset
  },
  barber: function (mode, hrz) {
    mode = U.aorb(mode, 'locrian');
    Test(mode, -1, hrz);
    Test(mode, 1, hrz);
    Test(mode, 3, hrz);
  },
  discord: function (hrz) {
    Test(0, 2, hrz); //    mode ionian    steps offset
    Test(6, 4, hrz); //    mode locrian   steps offset
  },
};

/*



 */
