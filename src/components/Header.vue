<template lang="pug">
  nav.header

    .primary: .wrap
      img(alt='blah blah' src='@/assets/stock/wf1line.svg')

    .secondary: .wrap
      h1 {{msg}}

</template>

<script>
  export default {
    name: 'Header',
    props: {
      msg: String,
    },
  };
</script>

<style lang="scss">
  @import '@/scss/vars.scss';

  nav.header {
    height: 10vh;
    position: fixed;
    text-align: left;
    top: 0;
    width: 100%;

    h1 {
      margin: 0;
    }

    .primary {
      background: $color1;
      height: 6vh;
      padding-top: 1.7vh;

      img {
        transform: scaleX(-1);
        width: 12em;
      }
    }
    .secondary {
      background: white;
      height: 4vh;
      padding-top: 0.7vh;
    }
  }
</style>
