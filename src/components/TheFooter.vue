<template lang="pug">
footer
  h2 footer
</template>

<script>
  export default {
    name: 'Footer',
  };
</script>

<style lang="scss">
  footer {
    background-color: rosybrown;
    height: 10vh;
    position: fixed;
    text-align: left;
    bottom: 0;
    width: 100%;
    z-index: 0;

    h1 {
      margin: 0;
    }
  }
</style>
