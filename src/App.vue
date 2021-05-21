<template lang="pug">
  #App

    Main

</template>

<script>
  import Main from '@/views/Main';

  export default {
    name: 'app',
    components: {
      Main,
    },
  };
</script>

<style lang="scss">
  @import '@/scss/base.scss';

  body {
    background: silver;
  }
  #App {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
</style>
