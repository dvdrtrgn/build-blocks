<template lang="pug">
  section#Muse
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
  #Muse {
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
    big {
      font-size: 120%;
    }
    small {
      font-size: 80%;
    }
    select {
      -webkit-appearance: menulist;
    }
  }
</style>
