<template>
  <div>
    <form action="" @submit.prevent="">
      <p>Note Info <input type="number" v-model="arg" @change="process" /></p>
      <span>name: {{ note.name }}</span>
      <span>octave: {{ note.octave }}</span>
      <span>frequency: {{ note.frequency }}</span>
      <span>midi: {{ note.midi }}</span>
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
  span {
    border: 1px solid gray;
    padding: 0 1rem;
  }
</style>
