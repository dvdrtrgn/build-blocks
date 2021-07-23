/*

  report corresponding interval (based on C major) for a named note

*/
const INDEX = 'R C C# D D# E F F# G G# A A# B'.split(' ');
const IVALS = ' Ton m2 M2 m3 M3 P4 tri P5 m6 M6 m7 M7';

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
