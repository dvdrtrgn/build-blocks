<template lang="pug">
  .neck
    String(
      v-for='(string, index) in strings'
      :str='string'
      :key='index'
    )
</template>

<script>
  import String from './String';

  export default {
    name: 'Neck',
    components: {
      String,
    },
    data: () => {
      return {
        strings: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'].reverse(),
      };
    },
    props: {
      msg: String,
    },
  };
</script>

<style lang="scss">
  @import '@/scss/vars.scss';

  .neck {
    border: 2px solid white;
  }
</style>
