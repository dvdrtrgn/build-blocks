<template>
  <div>
    <form action="" @submit.prevent="">
      <p>REPRESENT NOTE</p>
      <input type="number" v-model="arg" @change="process" />

      <div>name {{ note.name }}</div>
      <div>octave {{ note.octave }}</div>
      <div>frequency {{ note.frequency }}</div>
      <div>midi {{ note.midi }}</div>
    </form>
  </div>
</template>

<script>
  /* eslint-disable no-console */
  import makeNote from '@/guitar/makeNote.js';

  export default {
    data() {
      return {
        arg: '69',
        note: {},
      };
    },
    methods: {
      process() {
        this.note = makeNote(this.arg);
        this.arg = this.note.midi; // keep in bounds
      },
    },
    mounted() {
      this.process();
    },
  };
</script>

<style lang="scss" scoped>
  input {
    text-align: center;
  }
</style>
