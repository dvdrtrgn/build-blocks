<template lang="pug">
  section#Music
    <button id="play-button">Play/Pause</button>
</template>

<script>
  import bus from '@/bus';
  import glob from '@/glob';
  import store from '@/store';

  // import Play from './play/index.js';

  glob.exposes({ bus, store });

  export default {
    components: {},
    data() {
      return {};
    },
    methods: {},
    mounted() {},
    computed: {},
  };
</script>

<style lang="scss"></style>
