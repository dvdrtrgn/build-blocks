<template lang="pug">
  section#Muse
    //- Piano
    Song(:notes='notes')
</template>

<script>
  import bus from '@/bus';
  import glob from '@/glob';
  import store from '@/store';
  import getVoice from '@/libs/getVoice.js';
  import focusNext from '@/libs/focus-next.js';

  import Play from './play/index.js';

  glob.exposes({ store, bus, getVoice, focusNext, Play });

  import Piano from './Piano/_Piano';
  import Song from './Song/_Song';

  export default {
    components: {
      Piano,
      Song,
    },
    data() {
      return {
        notes: [],
        voice: getVoice('muse'),
      };
    },
    methods: {
      beep() {
        this.voice.makeCue('C2', 0);
      },
      pushCue(note) {
        if (note.duration >= 0.01) this.notes.push(note);
      },
      playNote(arg) {
        this.voice.play(arg, this.autoplay ? focusNext() : '');
      },
    },
    mounted() {
      bus.$on('beep', this.beep);
      bus.$on('pushCue', this.pushCue);
      bus.$on('playNote', this.playNote);
    },
    computed: {
      autoplay() {
        return store.getters.getAutoplay;
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
    label {
      white-space: nowrap;
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
    position: relative;
  }
</style>
