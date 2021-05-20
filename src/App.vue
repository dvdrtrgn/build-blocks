<template lang="pug">
  #App
    Play
    NoteInfo
    //- Home
  //-
</template>

<script>
  import NoteInfo from '@/views/Note/Choose';
  import Play from '@/views/Synth/Play';
  import Home from '@/views/Home';

  export default {
    name: 'app',
    components: {
      Home,
      NoteInfo,
      Play,
    },
  };
</script>

<style lang="scss">
  @import '@/scss/base.scss';

  body {
    background: silver;
    margin: 0;
  }
  #App {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
  }
  section {
    text-align: left;
    min-height: 20vh;
  }
</style>
