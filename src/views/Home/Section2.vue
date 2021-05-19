<template lang="pug">
  section.num2: .wrap

    h1 {{msg}}
    Neck
  //-
</template>

<script>
  import Neck from '@/guitar/Neck';

  export default {
    name: 'Section2',
    props: {
      msg: String,
    },
    components: {
      Neck,
    },
  };
</script>

<style lang="scss">
  @import '@/scss/vars.scss';

  section.num2 {
    background: $color3;
  }
</style>
