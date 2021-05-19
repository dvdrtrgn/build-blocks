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
    props: {
      arg: {
        type: Number,
      },
    },
    computed: {
      note() {
        const note = makeNote(this.arg);

        if (this.arg !== note.midi) {
          this.$emit('limit', note.midi); // keep in bounds
          return { name: this.arg + ' out of bounds' };
        }

        return note;
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
