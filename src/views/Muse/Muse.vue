<template lang="pug">
  section#Muse
    Piano
    Song(:notes='notes')
</template>

<script>
  import Bus from '@/bus';
  import Store from '@/store';

  import Piano from './Piano/_Piano';
  import Song from './Song/_Song';

  import getVoice from '@/libs/getVoice.js';
  import focusNext from '@/libs/focus-next.js';

  export default {
    components: {
      Piano,
      Song,
    },
    data() {
      return {
        notes: [],
        synth: getVoice(),
      };
    },
    methods: {
      beep() {
        this.synth.start('C2', 0);
      },
      pushCue(note) {
        if (note.duration >= 0.01) this.notes.push(note);
      },
      playNote(arg) {
        this.synth.play(arg, this.autoplay ? focusNext() : '');
      },
    },
    mounted() {
      Bus.$on('beep', this.beep);
      Bus.$on('pushCue', this.pushCue);
      Bus.$on('playNote', this.playNote);

      window._Store = Store;
    },
    computed: {
      autoplay() {
        return Store.getters.getAutoplay;
      },
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
