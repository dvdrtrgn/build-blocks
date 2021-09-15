<template>
  <header class="flexed">
    <slot />
  </header>
</template>

<script>
  export default {};
</script>

<style lang="scss">
  header {
    background: steelblue;
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
