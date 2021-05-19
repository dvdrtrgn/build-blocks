<template lang="pug">
  span
    button(@click='playTone' :class="{playing: playing}") <slot>Synth {{ pitch }}</slot>
</template>

<script>
  /* eslint-disable no-console */
  import Store from '@/store';
  import * as Tone from 'tone';

  export default {
    data() {
      return {
        duration: Store.getters.getTime,
        synth: false,
        playing: false,
      };
    },
    props: {
      msg: String,
      pitch: {
        type: String,
        default: 'C4',
      },
      singular: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      getVoice() {
        this.synth = new Tone.Synth().toDestination();
      },
      playTone() {
        if (!this.singular || !this.synth) this.getVoice();

        this.synth.triggerAttackRelease(this.pitch, this.duration);
        this.playing = true;

        setTimeout(() => (this.playing = false), this.duration * 1000);
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
  }
</style>
