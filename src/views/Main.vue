<template lang="pug">
  main
    h1.hand 👌🏿
    Muse
    Drag

</template>

<script>
  import Muse from './Muse/Muse.vue';
  import Drag from './Muse/drag/Dragtest.vue';

  export default {
    components: {
      Muse,
      Drag,
    },
  };
</script>

<style lang="scss">
  $root: 1.2rem;

  @font-face {
    font-family: 'Bravura';
    src: url('../assets/Bravura.woff2');
    font-weight: 400;
    font-style: normal;
    font-stretch: normal;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .dev {
    color: steelblue;
    opacity: 0.8;
  }

  .hand {
    font-size: 9 * $root;
    left: 0;
    position: absolute;
    top: 0;
  }
</style>
