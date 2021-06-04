<template lang="pug">
  #App(:class="classes")
    pre {{ classes }}
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
    computed: {
      classes() {
        return this.pixels.classes;
      },
    },
    beforeMount() {
      window.glob.assigns({ app: this, pixels: this.pixels });
      this.pixels.watch();
    },
    beforeDestroy() {
      this.pixels.unwatch(); // prevent duplicates during dev
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
