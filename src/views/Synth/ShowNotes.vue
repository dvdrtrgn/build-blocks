<template>
  <div>
    <button @click="dump">export</button>
    <button @click="clear">clear</button>
    <hr />
    <span
      v-for="note in notes"
      :key="note.start"
      @focus="play(note)"
      tabindex="0"
    >
      {{ note.pitch }}
      <small>{{ note.duration.toFixed(1) }}s</small>
    </span>
  </div>
</template>

<script>
  import synth from './synth.js';

  export default {
    props: ['notes'],
    data() {
      return {
        synth: synth.make(),
      };
    },
    methods: {
      play(arg) {
        function gotoNext() {
          console.log('gotoNext!');
        }
        this.synth.play(arg, gotoNext);
      },
      clear() {
        this.notes.length = 0;
        this.notes.pop(); // trigger the update
      },
      dump() {
        let dump = this.notes.map(e => e.export());

        dump = JSON.stringify(dump);

        console.log(dump);
      },
    },
  };
</script>

<style lang="scss" scoped>
  div {
    columns: 1;
  }
  span {
    border: 3px outset purple;
    cursor: pointer;
    display: inline-block;
    line-height: 1;
    padding: 0.2rem;
    white-space: nowrap;

    &:focus {
      border-color: red;
    }
    small {
      font-size: 66%;
    }
  }
</style>
