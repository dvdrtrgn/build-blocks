/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-10-16
  IDEA    Collect and calculate note frequencies
  NOTE    ?
  TODO    ?

 */
define(['jquery'], function ($) {
  'use strict';

  var NOM = 'Notes';
  var W = window;
  var C = W.console;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  var C3 = 128;
  var C4 = 256;
  var C5 = 512;
  var C6 = 1024;
  var METRIC_C = C5;
  var MIDDLE_C = 261.625;

  var INTONATION = Math.pow(2, 1 / 12);
  var RATIO = {
    abs: new Array(13).fill(INTONATION).map(Math.pow), // Math.pow signature maps perfectly
    frc: new Array(13).fill(18904 / 17843).map(Math.pow),
    num: [1, 1.0595, 1.1225, 1.189, 1.26, 1.335, 1.414, 1.4983, 1.5874, 1.682, 1.782, 1.8877, 2],
    pct: new Array(13).fill(1.0595).map(Math.pow),
  };
  var RATES = RATIO.abs;

  var API = {
    C3,
    C4,
    C5,
    C6,
    INTONATION,
    METRIC_C,
    MIDDLE_C,
    RATES,
  };

  // - - - - - - - - - - - - - - - - - -
  // HELPERS

  // function makeNoteDescriptors() {
  /* abstract freqs
  give note a letter
  give it a "sound" do,re,me,fa,so,la,ti,do
  method for frequency

  i want to do more with a note

  */
  // }

  // - - - - - - - - - - - - - - - - - -
  // CONSTRUCT

  $.extend(API, {});

  return API;
});

/*

  take a tonic note frequency
    note {
      frequency: 0,
      label: '',
      calcHigherSemitone(),
      createTone(),
    }

  calc a scale of semitones from a tonic to form an octave
    scale [0..12] 0 being the tonic

  filter an octave scale to make a mode
    mode {
      freqs: [],
      intervals: [],
      name: '',
      number: 0,
      semis: [],
    }


scale degree syllables

0   'Doh'
1           +Dee / -Rah
2   'Ray'
3           +Ree / -May
4   'Mee'
5   'Fah'
6           +Fee / -Sah
7   'Soh'
8           +See / -Lay
9   'Lah'
10          +Lee / -Tah
11  'Tee'
12  'Doh'


do dia ré ria mi fa fia so sia la lia ti do
do ti toa la loa so soa fa mi moa ré roa do


 */
