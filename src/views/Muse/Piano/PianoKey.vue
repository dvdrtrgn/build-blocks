<template>
  <button
    class="pianokey"
    :class="classObj"
    @keypress="play()"
    @mousedown="play()"
    @mouseup="stop()"
  >
    <span class="label" v-html="label"></span>
  </button>
</template>

<script>
  import Bus from '@/bus';
  import Store from '@/store';

  import getVoice from '@/libs/getVoice.js';

  export default {
    props: {
      pitch: {
        type: String,
        default: 'R',
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
        if (this.voice.running) return this.voice.stop();

        this.cue = this.voice.makeCue(this.pitch, this.maxtime);
        this.save();
      },
      save() {
        Bus.$emit('pushCue', this.cue);
      },
      stop() {
        if (this.voice.running) this.voice.stop();
        this.cue = {};
      },
    },
    computed: {
      maxtime: () => Number(Store.getters.getTime),
      ebony() {
        return this.pitch.includes('#');
      },
      label() {
        let text = this.pitch;

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
          bias: this.bias,
          playing: this.cue.playing,
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
    $short: $tall/1.6;
    $thin: $wide/1.5;
    $frac: $thin/7;

    background-color: white;
    border-radius: 3px;
    border-top: 0;
    color: black;
    cursor: pointer;
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

    &.playing {
      border-color: red !important;
      z-index: 1;
    }
    &.ebony {
      background-color: black;
      background-image: linear-gradient(182deg, black, #333);
      box-shadow: 0 $frac $frac rgba(grey, 0.5);
      // color: white;
      height: $short;
      margin: 0 $thin/-2;
      width: $thin;
      z-index: 2;

      &.left {
        left: -$frac;
      }
      &.right {
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
