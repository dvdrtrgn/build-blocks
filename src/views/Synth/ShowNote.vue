<template>
  <span @focus="play(note)" tabindex="0">
    {{ note.pitch }}
    <small>{{ note.duration.toFixed(1) }}s</small>
  </span>
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

<style lang="scss" scoped>
  span {
    border: 3px outset purple;
    cursor: pointer;
    display: inline-block;
    line-height: 1;
    padding: 0.2rem;
    white-space: nowrap;

    &:focus {
      border-color: red;
    }
    small {
      font-size: 66%;
    }
  }
</style>
