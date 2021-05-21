<template lang="pug">
  section#ShowMuse
    h1 ShowMuse

    Keyboard

    Song(:notes='notes')

</template>

<script>
  import Bus from '@/bus';
  import Keyboard from './Keyboard/_';
  import Song from './Song/_';

  import makeSynth from '@/libs/make-synth.js';

  export default {
    components: {
      Keyboard,
      Song,
    },
    data() {
      return {
        synth: makeSynth(),
        notes: [],
      };
    },
    methods: {
      beep() {
        this.synth.start('C2', this.sustain / 2);
      },
      addNote(note) {
        if (note.duration >= 0.01) this.notes.push(note);
      },
    },
    mounted() {
      Bus.$on('playing', this.addNote);
    },
  };
</script>

<style lang="scss">
  // @import '@/scss/vars.scss';
  #ShowMuse {
    line-height: 2;
    text-align: center;

    button {
      border: 2px outset gray;

      &:hover {
        border-color: yellow;
      }
      &:focus {
        border-color: cyan;
      }
    }
    select {
      -webkit-appearance: menulist;
    }
  }
</style>
