<template lang="pug">
  #App(:class="pixels.classes")
    pre {{ pixels.toString() }}
</template>

<script>
  import Pixels from '@/libs/pixels';

  export default {
    name: 'app',
    components: {},
    data() {
      return {
        pixels: new Pixels(),
      };
    },
    computed: {},
    beforeMount() {
      window.glob.assigns({ app: this, pixels: this.pixels });
      this.pixels.watchWindow(true);
    },
    beforeDestroy() {
      this.pixels.unwatchWindow(); // prevent duplicates during dev
    },
  };
</script>

<style lang="scss">
  @import '@/scss/base.scss';

  body {
    background: silver;

    .mobile & {
      background: pink;
    }
    .small & {
      background: gray;
    }
    .large & {
      background: white;
    }
    .huge & {
      background: red;
    }
  }
  #App {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
</style>
