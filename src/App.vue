<template lang="pug">
  #App(:class="pixels.classArray")
    pre {{ pixels.classArray }}
</template>

<script>
  import pixels from '@/libs/pixels';

  export default {
    name: 'app',
    components: {},
    data() {
      return {
        pixels,
      };
    },
    computed: {},
    beforeMount() {
      window.glob.assigns({ app: this, pixels: this.pixels });
      window.addEventListener('resize', this.pixels.update);
    },
    beforeDestroy() {
      // prevent duplicates during dev
      window.removeEventListener('resize', this.pixels.update);
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
