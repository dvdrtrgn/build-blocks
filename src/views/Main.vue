<template lang="pug">
  main
    h1.hand 👌🏿

    ShowMuse

</template>

<script>
  import ShowMuse from './Muse/ShowMuse';

  export default {
    components: {
      ShowMuse,
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
