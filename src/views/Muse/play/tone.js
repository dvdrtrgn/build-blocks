/*global define, AudioContext, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-10-16
  IDEA    Ease the creation of a waveform in AudioContext
  NOTE    ?
  TODO    ?

 */
define(['jquery', './notes'], function ($, Notes) {
  'use strict';

  var NOM = 'Tone';
  var W = window;
  var C = W.console;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -

  var DF = {
    playing: false,
    decay: 1,
    octave: 0,
    pitch: 0,
    shape: 0,
  };
  var WAVE = ['sine', 'square', 'sawtooth', 'triangle'];
  var ZERO = 0.00001;

  var API = {
    _: NOM,
    // ...Notes, /// spread props
  };

  var Context = new AudioContext();

  var Resolve = {
    shape: function (shape) {
      shape = shape || 0;
      if (typeof shape === 'string') {
        shape = shape.toLowerCase();
        return (WAVE.includes(shape)) ? shape : null;
      }
      if (typeof shape === 'number') {
        shape = Math.round(shape);
        return WAVE[shape % WAVE.length];
      }
      return 'sine';
    },
    number: function (num) {
      return Number(num) || 1;
    },
    power: function (num) {
      return Number(num) || 0;
    },
  };

  // - - - - - - - - - - - - - - - - - -
  // CONFIG

  function genConfig(pitch, decay, shape) {
    return $.extend({}, DF, {
      decay: Number(decay || 1),
      pitch: Number(pitch || 0),
      shape: Resolve.shape(shape),
    });
  }

  // - - - - - - - - - - - - - - - - - -
  // CONSTRUCT

  function Init(self) {
    self = (self || this);

    self.size = Context.createGain();
    self.wave = Context.createOscillator();

    self.size.connect(Context.destination);
    self.wave.connect(self.size);

    self.wave.type = self.shape;
    self.wave.frequency.value = self.pitch;

    return self;
  }

  function Stop(self) {
    self = (self || this);

    var end = Context.currentTime + (self._.decay || ZERO);

    self.size.gain.exponentialRampToValueAtTime(ZERO, end);
    self._.playing = false;

    return self;
  }

  function Play(self) {
    Init(self = self || this);

    if (!self._.pitch) return self; // rest!

    self.wave.frequency.value *= Math.pow(2, self._.octave);
    self.wave.start();
    self._.playing = true;

    return Stop(self);
  }

  function setProp(self, key, val) {
    var out;

    switch (key) {
    case 'decay':
    case 'pitch':
      out = Resolve.number(val);
      break;
    case 'octave':
      out = Resolve.power(val);
      break;
    case 'shape':
      out = Resolve.shape(val);
      break;
    }
    if (out === null) throw `bad ${key}: ${val}`;
    else self._[key] = out;
    return self;
  }

  function initTone(_) {
    _ = _ || genConfig();
    var play, stop, timeout;
    var self = {
      _,
      get decay() {
        return _.decay;
      },
      get octave() {
        return _.octave;
      },
      get pitch() {
        return _.pitch;
      },
      get shape() {
        return _.shape;
      },
      set decay(num) {
        self.set('decay', num);
      },
      set octave(num) {
        self.set('octave', num);
      },
      set pitch(num) {
        self.set('pitch', num);
      },
      set shape(etc) {
        self.set('shape', etc);
      },
      play: function () {
        W.clearTimeout(timeout);
        timeout = W.setTimeout(play, 1);
        return self;
      },
      stop: function () {
        if (!_.playing) return self;
        return stop();
      },
      oct: function (pow) {
        return self.set('octave', pow);
      },
      set: function (key, val) {
        return setProp(self, key, val);
      },
    };

    play = Play.bind(self);
    stop = Stop.bind(self);

    return self;
  }

  $.extend(API, {
    make: function (pitch, decay, shape) {
      return initTone(genConfig(pitch, decay, shape));
    },
    play: function (pitch, decay, shape) {
      return API.make(pitch, decay, shape).play();
    },
  }, Notes);

  return API;
});

/*



 */
