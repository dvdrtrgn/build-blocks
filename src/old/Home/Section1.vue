<template lang="pug">
  section.num1: .wrap

    h1 {{msg}}
  //-
</template>

<script>
  export default {
    name: 'Section1',
    props: {
      msg: String,
    },
  };
</script>

<style lang="scss">
  @import '@/scss/vars.scss';

  section.num1 {
    background: $color3;
  }
</style>
