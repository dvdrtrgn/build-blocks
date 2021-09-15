<template>
  <main class="flexed">
    <form action="" @submit.prevent="">
      <h1>
        Note number
        <input type="number" v-model.number="num" />
      </h1>

      <table>
        <DisplayNotes @limit="backprop" :arg="num + 1" />
        <DisplayNotes @limit="backprop" :arg="num" />
        <DisplayNotes @limit="backprop" :arg="num - 1" />
      </table>
    </form>
  </main>
</template>

<script>
  /* eslint-disable no-console */
  import DisplayNotes from './components/DisplayNotes.vue';

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
    text-align: center;

    input {
      text-align: center;
    }
    table {
      margin-top: 1rem;
      margin-bottom: 10rem;
    }
  }
</style>
