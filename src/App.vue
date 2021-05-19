<template lang="pug">
  #App
    NoteInfo
    Home
  //-
</template>

<script>
  import NoteInfo from '@/views/NoteInfo';
  import Home from '@/views/Home';

  export default {
    name: 'app',
    components: {
      Home,
      NoteInfo,
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
