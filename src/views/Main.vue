<template>
  <main>
    <h1 class="hand">👌🏿</h1>
    <Synth />
  </main>
</template>

<script>
  // import Muse from './Muse.vue';
  import Synth from './Synth.vue';

  window.App = Synth;

  export default {
    components: {
      // Muse,
      Synth,
    },
  };
</script>

<style lang="scss">
  $root: 1.2rem;

  main {
    padding-top: 10vh;
    padding-bottom: 10vh;
  }

  .dev {
    color: steelblue;
    opacity: 0.8;
  }

  .hand {
    font-size: 9 * $root;
    left: 0;
    opacity: 0.2;
    position: absolute;
    top: 0;
    z-index: -1;
  }

  // @font-face {
  //   font-family: 'Bravura';
  //   src: url('../assets/Bravura.woff2');
  //   font-weight: 400;
  //   font-style: normal;
  //   font-stretch: normal;
  // }
</style>
