<template>
  <button class="songnote" @focus="play(note)">
    <span class="icon">♩</span>
    <span class="editable pitch" @click="edit(note, 'pitch')">{{
      note.pitch
    }}</span>
    <span class="editable duration" @click="edit(note, 'duration')"
      >{{ note.duration.toFixed(1).replace('0.', '.') }}s</span
    >
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
      play(note) {
        this.$emit('play', note);
      },
      edit(note, prop) {
        let val = note[prop];
        let out = prompt('Edit ' + prop, val);
        if (out && val != out) note[prop] = out;
      },
    },
  };
</script>

<style lang="scss">
  .songnote {
    $small: 0.3rem;

    display: inline-block;
    font-size: 120%;
    line-height: 1;
    padding: $small;
    white-space: nowrap;

    .icon {
      margin: -$small;
    }
    .duration {
      font-size: 66%;
    }
    .editable {
      padding: $small/2 $small;

      &:hover {
        background-color: darkgreen;
      }
    }
    .pitch {
      font-size: 96%;
      margin-top: 1rem;
    }
  }
</style>
