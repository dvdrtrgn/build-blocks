/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-10-16
  IDEA    Make playback of mode tones
  NOTE    ?
  TODO    ?

 */

import $ from 'jquery';
import U from './util';
import Mode from './mode';
import Notes from './notes';
import Tone from './tone';

import Tests from './test/all';

var NOM = 'Play';
var W = window;
var C = W.console;
C.debug(NOM, 'loaded');

// - - - - - - - - - - - - - - - - - -

var API = {
  init: null,
  _: NOM,
  Mode,
  Notes,
  Tone,
  speed: 250, // quarter second beats
  tests: Tests,
};

// - - - - - - - - - - - - - - - - - -
// HELPERS

function delayBy(fn, num) {
  W.setTimeout(fn, num * API.speed);
}

function playNoteAt(tone, time) {
  delayBy(function () {
    Tone.make(tone, 2).play(); // 2s is about right
  }, time);
}

function playArray(notes, speed) {
  API.speed = (speed || 250);

  notes.map((e, i) => {
    playNoteAt(e, i);
  });
}

function resolveMyOctaves(mode) {
  return U.resolveOctaves.bind(mode.freqs);
  // how do you convert from a note number to freq
  // can it be done, go from freq to a num?
  // interesting as it could be used to approx a named note
}

function makeSong(cf) {
  var mode = Mode.get(cf.mode, cf.root);
  var calc = resolveMyOctaves(mode);
  var freqs = cf.notes.map(calc); // notes are mode-steps (not chromatic steps)
  var song = {
    _: NOM + ':makeSong',
    configs: cf,
    mode,
    freqs,
  };
  return song;
}

function playMode(nom, rest) {
  var scale = Mode.get(nom).freqs;

  rest = Number(rest) || 0; // rest for no beats

  delayBy(function () {
    playArray(scale);
  }, rest);
}

function makeButton(mode) {
  var btn = $('<button>')
    .addClass('player')
    .data('mode', mode)
    .text(mode);
  return btn;
}

function makeButtonsOn(ele, perRow = 7) {
  Mode.list.map((e, i) => {
    var btn = makeButton(e);
    var wrap = !(i % perRow);
    var eles = wrap ? $('<br>').add(btn) : btn;

    ele.append(eles);
  });
}

// - - - - - - - - - - - - - - - - - -
// CONSTRUCT

function appendButtonsTo(ele) {
  ele = $(ele);
  if (!ele.length) throw 'where?';

  makeButtonsOn(ele);

  ele.on('click', 'button.player', function (evt) {
    var btn = $(evt.currentTarget);
    var str = btn.data('mode');
    playMode(str);
  });
}

function bind(ele) {
  ele = $(ele);
  if (!ele.length) ele = $('main');

  appendButtonsTo(ele);
}

function init(sel) {
  bind(sel);

  API.init = 'INITED';

  if (W._dbug > 0) {
    // require(['play/test/all'], obj => API.tests = obj);
  }
  return API;
}

Object.assign(API, {
  init: init,
  addButtons: appendButtonsTo,
  mode: playMode,
  notes: playArray,
  sing: function (cf) {
    if (typeof cf !== 'object') throw 'missing config';
    if (!Array.isArray(cf.notes)) throw 'no notes, huh?';
    // if (!cf.notes.every(isNumber)) throw 'numbers only';

    var song = makeSong(cf);

    playArray(song.freqs, cf.speed);

    C.log(NOM, 'sing', song);
  },
});

export default API;

/*

  var SYM = {
    flat: '♭',
    sharp: '♯',
    natural: '♮',
    quarter: '♩',
    eighth: '♪',
  };
  var FLATS =  'a B b c D d E e f G g A a';
  var SHARPS = 'a A b c C d D e f F g G a';

 */
