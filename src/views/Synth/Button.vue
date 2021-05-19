<template lang="pug">
  span
    button(@click='playTone' :class="{playing: playing}")
      slot Synth {{ pitch }}
</template>

<script>
  /* eslint-disable no-console */
  import Store from '@/store';
  import * as Tone from 'tone';

  export default {
    props: {
      pitch: {
        type: String,
        default: 'C2',
      },
    },
    data() {
      return {
        synth: false,
        playing: false,
        schedule: null,
      };
    },
    methods: {
      newVoice() {
        console.log('newVoice');
        this.synth = new Tone.Synth().toDestination();
      },
      stopTone() {
        clearTimeout(this.schedule);
        this.synth.triggerRelease();
        this.playing = false;
      },
      playTone() {
        if (!this.synth) this.newVoice();
        if (this.playing) this.stopTone();

        this.synth.triggerAttackRelease(this.pitch, this.duration);
        this.playing = true;

        this.timer(() => (this.playing = false));
      },
      timer(fn) {
        this.schedule = setTimeout(fn, this.duration * 1000);
      },
    },
    computed: {
      duration() {
        return Number(Store.getters.getTime);
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
