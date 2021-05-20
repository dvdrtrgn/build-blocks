<template lang="pug">
  span
    button(
      @mousedown='playTone'
      @mouseout='stopTone'
      :class="{playing: playing, toggle: toggle}"
    )
      slot Synth {{ pitch }}
</template>

<script>
  /* eslint-disable no-console */
  import Store from '@/store';

  import makeSynth from './make-synth.js';

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
        this.$emit('playing', this.synth.note);
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
    },
  };
</script>

<style lang="scss" scoped>
  button {
    background-color: white;
    border: 1px solid silver;
    height: 10rem;

    &:hover {
      background-color: gray;
    }
    &.playing {
      border-color: red;
    }
    &.toggle {
      font-weight: bold;
    }
  }
</style>
