<template>
  <button @focus="play(note)">
    {{ note.pitch
    }}<small>({{ note.duration.toFixed(1).replace('0.', '.') }}s)</small>
  </button>
</template>

<script>
  import makeSynth from './make-synth.js';

  export default {
    props: ['note'],
    data() {
      return {
        synth: makeSynth(),
      };
    },
    methods: {
      play(arg) {
        this.$emit('play', arg);
      },
    },
  };
</script>

<style lang="scss">
  #ShowNotes {
    button {
      display: inline-block;
      font-size: 120%;
      padding: 0 0.4rem;
      white-space: nowrap;

      small {
        font-size: 66%;
      }
    }
  }
</style>
