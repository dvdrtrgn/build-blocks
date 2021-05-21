<template>
  <button
    class="playbutton"
    :class="{ playing: playing, toggle: toggle }"
    @mousedown="playTone()"
    @mouseout="stopTone()"
  >
    <slot> Synth {{ pitch }} </slot>
  </button>
</template>

<script>
  import Store from '@/store';
  import Bus from '@/bus';

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
    },
  };
</script>

<style lang="scss">
  .playbutton {
    background-color: white;
    border-width: 1px;
    height: 10rem;

    &.playing {
      border-color: red;
    }
    &.toggle {
      font-weight: bold;
    }
  }
</style>
