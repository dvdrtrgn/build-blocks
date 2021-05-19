<template>
  <div>
    <form action="" @submit.prevent="">
      <p>Note Info <input type="number" v-model="num" /></p>
      <Info :arg="num" />
    </form>
  </div>
</template>

<script>
  /* eslint-disable no-console */
  import Info from './Info';

  export default {
    components: {
      Info,
    },
    data() {
      return {
        num: '60',
      };
    },
    methods: {},
  };
</script>

<style lang="scss" scoped>
  input {
    text-align: center;
  }
</style>
