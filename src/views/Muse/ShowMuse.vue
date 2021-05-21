<template lang="pug">
  section#ShowMuse
    h1 ShowMuse

    Keyboard

    ShowSong(:notes='notes')

</template>

<script>
  import Bus from '@/bus';
  import Keyboard from './Keyboard/ShowKeyboard';
  import ShowSong from './Song/ShowSong';

  import makeSynth from './make-synth.js';

  export default {
    components: {
      Keyboard,
      ShowSong,
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
      cursor: pointer;
      margin: 2px;

      &:hover {
        background-color: silver;
        color: white;
      }
      &:focus {
        border-color: purple;
      }
    }
    select {
      -webkit-appearance: menulist;
    }
  }
</style>
