<template>
  <span>
    <span v-show="note.name">Note {{ note.name }}</span>
    <span v-show="note.octave != null">octave: {{ note.octave }}</span>
    <span v-show="note.frequency">frequency: {{ note.frequency }}</span>
    <span v-show="note.midi">midi: {{ note.midi }}</span>
  </span>
</template>

<script>
  /* eslint-disable no-console */
  import modelNote from './libs/model-note.js';

  export default {
    props: {
      arg: {
        type: Number,
      },
    },
    computed: {
      note() {
        const note = modelNote(this.arg);

        console.log('note', note);

        if (this.arg !== note.midi) {
          this.$emit('limit', note.midi); // keep in bounds
          return {
            name: `"${this.arg}" is out of bounds, "${note.midi}" is the limit!`,
          };
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
