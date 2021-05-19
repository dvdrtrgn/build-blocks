<template lang="pug">
  span
    button(@click='playTone' :class="{playing: playing, toggle: toggle}")
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
        default: 'C2',
      },
      toggle: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        voice: synth(),
      };
    },
    methods: {
      playTone() {
        if (this.playing && this.toggle) return this.voice.stop();

        this.voice.start(this.pitch, this.duration);
      },
    },
    computed: {
      duration: () => Number(Store.getters.getTime),
      playing() {
        return this.voice.playing;
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
