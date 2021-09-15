<template>
  <header>
    <slot />
  </header>
</template>

<script>
  export default {};
</script>

<style lang="scss">
  @import '@/scss/vars.scss';

  header {
    background: $color1;
    height: 7vh;
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
