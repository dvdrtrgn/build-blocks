/*global define, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  CHANGED 2018-10-31
  IDEA    Make mixer playground
  NOTE    ?
  TODO    ?

 */
define(['jquery', './mode',
], function ($, Mode) {
  'use strict';

  var NOM = 'Mixer';
  var W = window;
  var C = W.console;
  C.debug(NOM, 'loaded');

  // - - - - - - - - - - - - - - - - - -
  var DF = {
    template: null,
  };
  var EL = {
    player: '.mixer .player',
    template: '.template',
    mixers: '',
  };
  var API = {
    init: null,
    _: NOM,
    DF: DF,
    EL: EL,
    Mode: Mode,
  };

  // - - - - - - - - - - - - - - - - - -
  // HELPERS

  function makeOption(nom, num, ele) {
    return ele.text(nom).val(num);
  }

  function shareVals(e1, e2) {
    e1.on('change', () => e2.val(e1.val()));
    e2.on('change', () => e1.val(e2.val()));
  }

  function bindSlide(slide, max, menu) {
    slide.attr('max', max);
    shareVals(slide, menu);
  }

  // - - - - - - - - - - - - - - - - - -
  // main

  function prepTemplate(tmp) {
    var sel = tmp.find('select');
    var opt = sel.find('option').detach();
    Mode.list.map((e, i) => { // fill menu
      makeOption(e, i, opt.clone()).appendTo(sel);
    });
    tmp.removeClass('template').detach();
  }

  function bindMode(ele) {
    var slide = ele.find('.pickMode');
    var menu = ele.find('.showMode');
    var opts = menu.find('option');
    bindSlide(slide, opts.length - 1, menu);
  }

  function bindSkew(ele) {
    var slide = ele.find('.pickSkew');
    var menu = ele.find('.showSkew');
    shareVals(slide, menu);
  }

  function bindActive(ele, bool) {
    var check = ele.find('.activate');
    check.on('change', function () {
      var ison = check.get(0).checked;
      ele.toggleClass('active', ison);
    });
    if (bool) check.click();
  }

  function bindThis(i, e) {
    var mix = $(e);

    bindMode(mix.find('.mode')); // make slider move menu
    bindSkew(mix.find('.skew'));
    bindActive(mix, !i);
  }

  function dupeMixer(temp) {
    var all = [1, 2, 3];
    all = all.map(function (e) {
      var ele = temp.clone().addClass('-' + e);
      return ele.appendTo(EL.player).get(0);
    });
    return $(all).each(bindThis);
  }

  // - - - - - - - - - - - - - - - - - -
  // CONSTRUCT

  function bind() {
    $.reify(EL);
    prepTemplate(EL.template);

    EL.mixers = dupeMixer(EL.template);

  }

  function init() {
    bind();

    API.init = 'INITED';
    return API;
  }

  $.extend(API, {
    init: init,
    addSong: function (song) {
      // associate song with menu item
      // store for mode and skew arguments
      C.log(song);
    },
  });

  return API;
});

/*



 */
