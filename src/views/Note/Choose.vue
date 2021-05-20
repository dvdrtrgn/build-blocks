<template>
  <div>
    <form action="" @submit.prevent="">
      <p>
        Note Info
        <input type="number" v-model.number="num" />
      </p>
      <Display @limit="backprop" :arg="num + 1" />
      <br />
      <Display @limit="backprop" :arg="num" />
      <br />
      <Display @limit="backprop" :arg="num - 1" />
    </form>
  </div>
</template>

<script>
  /* eslint-disable no-console */
  import Display from './Display';

  export default {
    components: {
      Display,
    },
    data() {
      return {
        num: 60,
      };
    },
    methods: {
      backprop(val) {
        this.num = val;
      },
    },
  };
</script>

<style lang="scss" scoped>
  input {
    text-align: center;
  }
</style>
