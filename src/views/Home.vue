<template>
  <main class="flexed">
    <div class="hand tweek">👌🏿</div>
  </main>
</template>

<script>
  export default {
    components: {},
  };
</script>

<style lang="scss">
  #Home main {
    $root: 1.2rem;

    .hand {
      font-size: 12 * $root;
      z-index: -1;
    }
    .tweek {
      animation-name: tweek;
      animation-duration: 3s;
      animation-direction: alternate;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in;
    }
    @keyframes tweek {
      from {
        transform: rotate(-9deg);
      }
      to {
        transform: rotate(9deg);
      }
    }
  }
</style>
