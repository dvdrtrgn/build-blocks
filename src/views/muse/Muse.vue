<template>
  <main>
    <Piano />
    <Song />
  </main>
</template>

<script>
  import bus from './libs/bus';
  import glob from './libs/glob';
  import store from '../../helpers/store';
  import getVoice from './libs/getVoice.js';
  import focusNext from './libs/focus-next.js';

  import Piano from './components/Piano.vue';
  import Song from './components/Song.vue';

  // import Play from './play/index.js';

  glob.exposes({ bus, store });

  export default {
    components: {
      Piano,
      Song,
    },
    data() {
      return {
        voice: getVoice('muse'),
      };
    },
    methods: {
      beep() {
        this.voice.makeCue('C2', 0);
      },
      playNote(arg) {
        this.voice.play(arg, focusNext(this.autoplay));
      },
    },
    mounted() {
      bus.$on('beep', this.beep);
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
  @import '@/scss/base.scss';
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

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
