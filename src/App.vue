<template lang="pug">
  #App(:class="[orient, screen, avail, ppp, win]")
    Main
</template>

<script>
  import Main from '@/views/Main';
  import pixels from '@/libs/pixels';

  export default {
    name: 'app',
    components: {
      Main,
    },
    data() {
      return {
        pixels,
      };
    },
    computed: {
      screen() {
        return this.pixels.screen;
      },
      avail() {
        return this.pixels.avail;
      },
      win() {
        return this.pixels.win;
      },
      orient() {
        return this.pixels.orient;
      },
      ppp() {
        return this.pixels.ppp;
      },
    },
    mounted() {
      let W = window;
      let P = this.pixels;

      W.glob.assigns({ pixels: P });
      W.removeEventListener('resize', P.update.bind(P));
      W.addEventListener('resize', P.update.bind(P));
    },
  };
</script>

<style lang="scss">
  @import '@/scss/base.scss';

  body {
    background: silver;
  }
  #App {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
</style>
