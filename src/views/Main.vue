<template lang="pug">
  main#Main
    span.hand 👌🏿

    ShowMuse

</template>

<script>
  import ShowMuse from './Muse/_';

  export default {
    components: {
      ShowMuse,
    },
  };
</script>

<style lang="scss">
  .hand {
    font-size: 9rem;
    left: 0;
    line-height: 1.2;
    position: absolute;
    top: 0;
  }
</style>
