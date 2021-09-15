<template>
  <main>
    <form action="" @submit.prevent="">
      <p>
        Note Info
        <input type="number" v-model.number="num" />
      </p>
      <DisplayNotes @limit="backprop" :arg="num + 1" />
      <br />
      <DisplayNotes @limit="backprop" :arg="num" />
      <br />
      <DisplayNotes @limit="backprop" :arg="num - 1" />
    </form>
  </main>
</template>

<script>
  /* eslint-disable no-console */
  import DisplayNotes from './DisplayNotes';

  export default {
    components: {
      DisplayNotes,
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

<style lang="scss">
  #Notate main {
    font-size: xx-small;
    input {
      text-align: center;
    }
  }
</style>
