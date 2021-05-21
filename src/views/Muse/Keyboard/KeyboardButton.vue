<template>
  <button
    class="playbutton"
    :class="{ playing: playing, toggle: toggle, flat: flat }"
    @mousedown="playTone()"
    @keydown="playTone()"
    @mouseup="stopTone()"
    @keyeup="stopTone()"
  >
    <span class="label" v-html="label"></span>
  </button>
</template>

<script>
  import Store from '@/store';
  import Bus from '@/bus';

  import makeSynth from '../make-synth.js';

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
      flat() {
        return this.pitch.includes('#');
      },
      label() {
        let text = this.pitch.toString();

        text = text.replace('#', '');
        let html = text.replace(/(\d)/, '<br>$1');

        return html;
      },
    },
  };
</script>

<style lang="scss">
  .playbutton {
    $base: 1rem;
    $tall: $base * 12;
    $short: $base * 7;
    $wide: $base * 3;
    $thin: $base * 2.2;

    background-color: white;
    border-width: 1px;
    color: black;
    height: $tall;
    line-height: 1;
    margin: 0;
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
    &.flat {
      background-color: black;
      color: white;
      height: $short;
      margin: 0 $thin / -2;
      width: $thin;
      z-index: 2;
    }
  }
</style>
