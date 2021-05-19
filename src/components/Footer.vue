<template lang="pug">
  nav.footer: .wrap
    h1 {{msg}}
  //-
</template>

<script>
  export default {
    name: 'Footer',
    props: {
      msg: String,
    },
  };
</script>

<style lang="scss">
  nav.footer {
    background-color: silver;
    min-height: 10vh;

    h1 {
      margin: 0;
    }
  }
</style>
