<template lang="pug">
  section.num4: .wrap

    h1 {{msg}}
  //-
</template>

<script>
  export default {
    name: 'Section4',
    props: {
      msg: String,
    },
  };
</script>

<style lang="scss">
  @import '@/scss/vars.scss';

  section.num4 {
    background: $color3;
  }
</style>
