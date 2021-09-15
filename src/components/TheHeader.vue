<template lang="pug">
header
  h1 header
  slot
</template>

<script>
  export default {
    name: 'Header',
  };
</script>

<style lang="scss">
  @import '@/scss/vars.scss';

  header {
    background: $color1;
    height: 10vh;
    position: fixed;
    text-align: left;
    top: 0;
    width: 100%;
    z-index: 0;

    h1 {
      margin: 0;
    }
  }
</style>
