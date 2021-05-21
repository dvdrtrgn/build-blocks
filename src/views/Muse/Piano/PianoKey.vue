<template>
  <button
    class="pianokey"
    :class="[bias, classObj]"
    @mousedown="playTone()"
    @mouseup="stopTone()"
    @keypress="playTone()"
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
        let text = this.pitch.toString();

        if (this.ebony) {
          text = text.replace('#', '').replace(/(\d)/, '<br>$1');
        }
        return text;
      },
      bias() {
        let letter = this.pitch.slice(0, 1);

        if (letter === 'C' || letter === 'F') return 'left';
        if (letter === 'D' || letter === 'A') return 'right';
        return '';
      },
      classObj() {
        return {
          playing: this.playing,
          toggle: this.toggle,
          ebony: this.ebony,
        };
      },
    },
  };
</script>

<style lang="scss">
  $root: 1.2rem;
  $tall: $root * 12;
  $wide: $root * 2.2;

  #Piano .pianokey {
    $short: $tall / 1.6;
    $thin: $wide / 1.5;

    background-color: white;
    border-radius: 3px;
    border-top: 0;
    color: black;
    font-size: $root;
    height: $tall;
    line-height: 1;
    margin: -0.5px;
    position: relative;
    vertical-align: top;
    width: $wide;
    z-index: 0;

    &:hover,
    &:focus {
      border-style: solid;
      z-index: 1;
    }

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
      // color: white;
      height: $short;
      margin: 0 $thin / -2;
      width: $thin;
      z-index: 2;

      &.left {
        left: $thin / -7;
      }
      &.right {
        left: $thin / 7;
      }
    }
  }
</style>
