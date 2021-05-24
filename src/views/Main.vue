<template lang="pug">
  main
    h1.hand 👌🏿

    Muse

</template>

<script>
  import Muse from './Muse/Muse';

  window.glob.assigns({});

  export default {
    components: {
      Muse,
    },
  };

  window.yelp = function(arg, clr) {
    let c = 'background: black; color: yellow; font-size: 200%;';
    if (clr) console.clear();
    if (arg === 0) debugger;
    else console.log('%cYELP', c, arg);
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
