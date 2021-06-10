<template lang="pug">
  section.num3: .wrap

    h1 {{msg}}
  //-
</template>

<script>
  export default {
    name: 'Section3',
    props: {
      msg: String,
    },
  };
</script>

<style lang="scss">
  @import '@/scss/vars.scss';

  section.num3 {
    background: $color4;
  }
</style>
