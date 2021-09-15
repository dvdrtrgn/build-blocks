<template>
  <tr v-if="note.midi">
    <td v-show="note.name">Name {{ note.name }}</td>
    <td v-show="note.octave != null">octave: {{ note.octave }}</td>
    <td v-show="note.frequency">frequency: {{ note.frequency }}</td>
    <td v-show="note.midi">midi: {{ note.midi }}</td>
  </tr>
</template>

<script>
  /* eslint-disable no-console */
  import modelNote from '../libs/model-note.js';

  export default {
    props: {
      arg: {
        type: Number,
      },
    },
    computed: {
      note() {
        let note = modelNote(this.arg);

        if (this.arg !== note.midi) {
          console.log(
            `"${this.arg}" is out of bounds, "${note.midi}" is the limit!`
          );
          this.$emit('limit', note.midi); // keep in bounds
          note = {};
        }

        return note;
      },
    },
  };
</script>

<style lang="scss" scoped>
  td {
    border: 1px solid gray;
    font-size: small;
    padding: 0 1rem;
  }
</style>
