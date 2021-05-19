<template lang="pug">
  #App
    Convert
    Home
  //-
</template>

<script>
  import Convert from '@/views/Convert';
  import Home from '@/views/Home';

  export default {
    name: 'app',
    components: {
      Home,
      Convert,
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
