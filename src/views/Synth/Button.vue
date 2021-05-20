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
  import synth from './synth.js';

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
        synth: synth.make(),
      };
    },
    methods: {
      playTone() {
        if (this.playing && this.toggle) return this.synth.stop();

        this.synth.start(this.pitch, this.duration);
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
    border: 1px solid silver;

    &.playing {
      color: red;
    }
    &.toggle {
      font-weight: bold;
    }
  }
</style>
