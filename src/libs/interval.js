/*

  report corresponding interval (based on C major) for a named note

*/
const INDEX = 'R C C# D D# E F F# G G# A A# B'.split(' ');
const IVALS = ' Ton min2 Maj2 min3 Maj3 4th Tri 5th min6 Maj6 min7 Maj7';

function lookup(name) {
  if (name.replace) {
    var ltrs = name.replace(/\d/g, '');
    var ordinal = INDEX.indexOf(ltrs);
    var interval = IVALS.split(' ')[ordinal];
  }
  return interval;
  // console.log(name, ltrs, ordinal, interval);
}

export default {
  lookup,
};
