<template>
  <button
    :class="classObj"
    @keypress.enter="play()"
    @mousedown="play()"
    @mouseup="stop()"
  >
    <span class="label" v-html="makeLabel"></span>
    <!-- <i class="interval" v-html="asText.interval"></i> -->
  </button>
</template>

<script>
  import bus from '@/bus';
  import glob from '@/glob';
  import store from '@/store';
  import makeCue from '@/libs/makeCue.js';
  import getVoice from '@/libs/getVoice.js';

  glob.exposes({ bus, store, getVoice });

  export default {
    props: {
      pitch: {
        default: 'R',
        type: String,
      },
    },
    data() {
      return {
        cue: {},
        voice: getVoice('piano'),
      };
    },
    methods: {
      play() {
        if (this.voice.running) {
          this.stop();
        } else {
          this.cue = this.voice.makeCue(this.pitch, this.maxtime);
          this.record();
        }
      },
      record() {
        bus.$emit('pushCue', this.cue);
      },
      stop() {
        this.cue = {};
        this.voice.stop();
      },
    },
    computed: {
      maxtime: () => Number(store.getters.getTime),
      isEbony() {
        return this.pitch.includes('#');
      },
      asCue() {
        return makeCue(this.pitch);
      },
      asText() {
        return this.mode === 'interval' ? this.asCue.interval : this.pitch;
      },
      mode() {
        return store.getters.getMode;
      },
      makeLabel() {
        let str = this.asText;
        if (this.isEbony) {
          str = str.replace(/#\d/, '#');
          str = str.replace(/(.)/g, '<br>$1');
        }
        return str;
      },
      getBias() {
        if (!this.isEbony) return '';
        let letter = this.pitch.slice(0, 1);
        if (letter === 'C' || letter === 'F') return '-l';
        if (letter === 'D' || letter === 'A') return '-r';
        return ''; // G key
      },
      classObj() {
        return {
          [this.getBias]: true,
          ebony: this.isEbony,
          playing: this.cue.playing,
        };
      },
    },
  };
</script>

<style lang="scss">
  $root: 1.2rem;
  $tall: $root * 12;
  $wide: $root * 2.2;

  #Piano button {
    $short: $tall/1.6;
    $thin: $wide/1.5;
    $frac: $thin/7;

    background-color: white;
    border-radius: 3px;
    cursor: pointer;
    font-size: $root;
    height: $tall;
    margin: -0.5px;
    position: relative;
    vertical-align: top;
    width: $wide;

    &:active {
      background-image: linear-gradient(180deg, #ddd, #fff);
    }
    &:hover,
    &:focus {
      border-style: solid;
      z-index: 1;
    }
    &.playing {
      border-color: red;
      z-index: 1;
    }

    &.ebony {
      background-image: linear-gradient(180deg, black, #333);
      border-top: 0;
      box-shadow: 0 $frac $frac rgba(grey, 0.5);
      color: white;
      height: $short;
      margin: 0 $thin/-2;
      width: $thin;
      z-index: 2;

      &.-l {
        left: -$frac;
      }
      &.-r {
        left: $frac;
      }
    }

    .label {
      bottom: 0.5rem;
      left: 0;
      overflow-wrap: break-word;
      position: absolute;
      width: 100%;
    }
  }
</style>
