<template>
  <button
    class="playbutton"
    :class="[bias, { playing: playing, toggle: toggle, ebony: ebony }]"
    @mousedown="playTone()"
    @keypress="playTone()"
    @mouseup="stopTone()"
    @keyeup="stopTone()"
  >
    <span class="label" v-html="label"></span>
  </button>
</template>

<script>
  import Store from '@/store';
  import Bus from '@/bus';

  import makeSynth from '@/libs/make-synth.js';

  export default {
    props: {
      pitch: {
        type: String,
        default: 'C4',
      },
      toggle: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        synth: makeSynth(),
      };
    },
    methods: {
      playTone() {
        if (this.playing && this.toggle) return this.synth.stop();

        this.synth.start(this.pitch, this.duration);
        // console.log(this.synth);
        Bus.$emit('playing', this.synth.note);
      },
      stopTone() {
        if (this.playing) this.synth.stop();
      },
    },
    computed: {
      duration: () => Number(Store.getters.getTime),
      playing() {
        return this.synth.playing;
      },
      ebony() {
        return this.pitch.includes('#');
      },
      label() {
        let text = this.pitch.toString().replace('#', '');
        let html = text.replace(/(\d)/, '<br>$1');

        return html;
      },
      bias() {
        let letter = this.pitch.slice(0, 1);

        if (letter === 'C' || letter === 'F') return 'left';
        if (letter === 'D' || letter === 'A') return 'right';
        return '';
      },
    },
  };
</script>

<style lang="scss">
  $root: 1.2rem;

  .playbutton {
    $tall: $root * 12;
    $short: $root * 7.5;
    $wide: $root * 2.3;
    $thin: $root * 1.7;

    background-color: white;
    border-radius: 3px;
    border-width: 1px;
    color: black;
    font-size: $root;
    height: $tall;
    line-height: 1;
    margin: -0.5px;
    position: relative;
    vertical-align: top;
    width: $wide;
    z-index: 1;

    .label {
      bottom: 0.5rem;
      left: 0;
      overflow-wrap: break-word;
      position: absolute;
      width: 100%;
    }
    &.playing {
      border-color: red !important;
    }
    &.toggle {
      font-weight: bold;
    }
    &.ebony {
      background-color: black;
      color: white;
      height: $short;
      margin: 0 $thin / -2;
      width: $thin;
      z-index: 2;
      &.left {
        left: -0.2rem;
      }
      &.right {
        left: 0.2rem;
      }
    }
  }
</style>
