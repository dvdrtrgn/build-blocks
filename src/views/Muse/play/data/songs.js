/*global define, */
define([], function () {
  'use strict';

  var R = -999; // a sort of rest

  return {
    /*eslint indent: 0 */
    mary: [
      // rooted on first note -- mary in C major, would need E phrygian
      2, 1, 0, 1,   2, 2, 2, R,
      1, 1, 1, R,   2, 4, 4, R,
      2, 1, 0, 1,   2, 2, 2, 2,
      1, 1, 2, 1,   0, R, 7, R,
      // rooted on key (last) note -- mary in C major, would need C ionian
    ],
    gary: [
      2, 1, 0, 1,   2, 2, 2, R,
      3, 4, R, 5,   R, 6, 7,
    ],
  };
});
