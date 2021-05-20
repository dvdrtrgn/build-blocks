<template lang="pug">
  section.num1: .wrap

    p Key of C
      Button(
        v-for='pitch in scale' :pitch='pitch' :key='pitch'
        @playing='addNote'
      ) {{ pitch }}

      label Sustain
        select(@change='markTime' v-model='duration')
          option(v-for='opt in seconds') {{ opt }}
        | + 1s decay
    p
      ShowNotes(:notes='notes')
  //-
</template>

<script>
  import Store from '@/store';
  import Button from './Button';
  import ShowNotes from './ShowNotes';

  import makeSynth from './make-synth.js';

  export default {
    components: {
      Button,
      ShowNotes,
    },
    data() {
      return {
        duration: Store.getters.getTime, // initial value
        synth: makeSynth(),
        scale: 'C4 D4 E4 F4 G4 A4 B4 C5'.split(' '),
        seconds: [0, 1, 2, 3, 4],
        notes: [],
      };
    },
    methods: {
      beep() {
        this.synth.start('C2', this.duration / 2);
      },
      updateTime() {
        Store.commit('setTime', this.duration);
      },
      markTime() {
        this.updateTime();
        this.beep();
      },
      addNote(note) {
        if (note.duration >= 0.01) this.notes.push(note);
      },
    },
  };
</script>

<style lang="scss">
  @import '@/scss/vars.scss';

  section.num1 {
    background: $color4;
  }
  section {
    line-height: 2;

    button {
      border: 2px solid gray;
      cursor: pointer;
      margin: 2px;

      &:hover {
        background-color: gray;
        color: white;
      }
      &:focus {
        border-color: purple;
      }
    }
    select {
      -webkit-appearance: menulist;
    }
  }
</style>
