<template>
  <div>
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
        this.synth.play(arg);
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
