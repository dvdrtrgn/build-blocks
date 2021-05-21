<template lang="pug">
  section#Muse
    Piano
    Song(:notes='notes')
</template>

<script>
  import Bus from '@/bus';
  import Piano from './Piano/_';
  import Song from './Song/_';

  import makeSynth from '@/libs/make-synth.js';

  export default {
    components: {
      Piano,
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

    :hover {
      border-color: yellow;
    }
    :focus {
      border-color: cyan;
    }

    button {
      border: 2px outset silver;
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

  .bezel {
    // rounded wrappers
    background-color: rgba(white, 0.5);
    border: 1px solid silver;
    border-radius: 1rem;
    padding: 0.5rem;
  }
</style>
