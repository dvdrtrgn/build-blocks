<template>
  <span @focus="play(note)" tabindex="0">
    {{ note.pitch }}
    <small>{{ note.duration.toFixed(1) }}s</small>
  </span>
</template>

<script>
  import synth from './synth.js';

  export default {
    props: ['note'],
    data() {
      return {
        synth: synth.make(),
      };
    },
    methods: {
      play(arg) {
        let self = document.activeElement;

        function gotoNext() {
          let next = self.nextElementSibling;
          if (next) {
            console.log('going to next', next);
            next.focus();
          } else {
            self.parentElement.focus();
          }
        }
        this.synth.play(arg, gotoNext);
      },
    },
  };
</script>

<style lang="scss" scoped>
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
