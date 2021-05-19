<template>
  <span>
    <span>name: {{ note.name }}</span>
    <span>octave: {{ note.octave }}</span>
    <span>frequency: {{ note.frequency }}</span>
    <span>midi: {{ note.midi }}</span>
  </span>
</template>

<script>
  /* eslint-disable no-console */
  import makeNote from '@/guitar/makeNote.js';

  export default {
    props: ['arg'],
    data() {
      return {};
    },
    methods: {
      process() {
        this.note = makeNote(this.arg);
        // this.arg = this.note.midi; // keep in bounds
      },
    },
    mounted() {},
    computed: {
      note() {
        return makeNote(this.arg);
      },
    },
  };
</script>

<style lang="scss" scoped>
  span span {
    border: 1px solid gray;
    padding: 0 1rem;
  }
</style>
