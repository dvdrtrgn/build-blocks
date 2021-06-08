/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-10-16
  IDEA    Calculate frequencies from a note for any named mode
  NOTE    ?
  TODO    ?
 */

import Notes from './notes';
import SCALES from './data/scales';

var NOM = 'Mode';
var W = window;
var C = W.console;
C.debug(NOM, 'loaded');

// - - - - - - - - - - - - - - - - - -

var API = {
  _: NOM,
  // ...Notes, /// spread props
  SCALES,
};

// - - - - - - - - - - - - - - - - - -
// HELPERS

function getStepName(e) {
  return SCALES.steps[e] || e;
}

function makeSteps(hrz) { // start from a note and get all 12 semitones
  hrz = (Number(hrz) || Notes.METRIC_C);
  return Notes.RATES.map(e => (e * hrz));
}

function resolveName(nom) {
  var all = SCALES._all;

  if (Number(nom)) nom = all[(nom | 0) % all.length];
  else String(nom).toLowerCase();

  if (SCALES._alias[nom]) nom = SCALES._alias[nom];
  return (nom || 'ionian');
}

function resolveNumber(nom) {
  var num = SCALES._all.indexOf(resolveName(nom));
  return (num > 0) ? num : 0;
}

// - - - - - - - - - - - - - - - - - -
// MAKERS

function makeIntervals(nom) {
  var step = 0;

  var mode = SCALES[resolveName(nom)];
  if (!mode) throw 'bad mode: ' + nom;

  return mode.map(e => step += e);
}

// filter needed intervals from any scale
function makeMode(nom, hrz) {
  var name = resolveName(nom);
  var ivals = makeIntervals(name);
  var semis = makeSteps(hrz || Notes.METRIC_C);
  var freqs = ivals.map(e => semis[e]);
  var mode = {
    name, freqs, ivals, semis,
  };

  return mode;
}

function translateSteps(steps) {
  return steps.map(getStepName);
}

function getData(nom) { // UNUSED for now
  var mode = SCALES[resolveName(nom)];
  var ivls = makeIntervals(nom);

  return {
    name: nom,
    count: (ivls.length - 1),
    index: ivls,
    intervals: mode,
    steps: translateSteps(mode),
  };
}

// - - - - - - - - - - - - - - - - - -
// CONSTRUCT

Object.assign(API, {
  data: getData,
  get: makeMode,
  list: SCALES._all.slice(),
  resolveName: resolveName,
  resolveNumber: resolveNumber,
}, Notes);

export default API;

/*

  https://en.wikipedia.org/wiki/Twelfth_root_of_two
  var RATE = 18904 / 17843;
  var APRX = [1, 16 / 15, 9 / 8, 6 / 5, 5 / 4, 4 / 3, 7 / 5, 3 / 2, 8 / 5, 5 / 3, 9 / 5, 15 / 8, 2];
  var ATOA = [3520, 3729, 3951, 4186, 4435, 4699, 4978, 5274, 5588, 5920, 6272, 6645, 7040];

 */
