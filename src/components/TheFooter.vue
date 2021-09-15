<template>
  <footer>
    <slot />
  </footer>
</template>

<script>
  export default {};
</script>

<style lang="scss">
  footer {
    background-color: rosybrown;
    height: 5vh;
    position: fixed;
    text-align: left;
    bottom: 0;
    width: 100%;
    z-index: 0;
  }
</style>
