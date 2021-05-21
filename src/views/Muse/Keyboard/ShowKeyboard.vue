<template>
  <section id="Keyboard">
    <h1>ShowKeyboard</h1>

    <div id="KeyboardButtons">
      <KeyboardButton v-for="pitch in scale" :pitch="pitch" :key="pitch" />
    </div>

    <label>
      Max Sustain
      <select @change="markTime" v-model.number="sustain">
        <option v-for="opt in seconds" :key="opt"> {{ opt }} </option>
      </select>
      + 1s decay
    </label>
  </section>
</template>

<script>
  import Store from '@/store';
  import Bus from '@/bus';
  import KeyboardButton from './KeyboardButton';

  import makeSynth from '../make-synth.js';

  export default {
    components: {
      KeyboardButton,
    },
    data() {
      return {
        sustain: Store.getters.getTime, // initial value
        synth: makeSynth(),
        scale: 'C4 C#4 D4 D#4 E4 F4 F#4 G4 G#4 A4 A#4 B4'.split(' '),
        seconds: [0, 1, 2, 3, 4],
        notes: [],
      };
    },
    methods: {
      beep() {
        this.synth.start('C2', this.sustain / 4);
      },
      updateTime() {
        Store.commit('setTime', this.sustain);
      },
      markTime() {
        this.updateTime();
        this.beep();
      },
      addNote(note) {
        if (note.duration >= 0.01) this.notes.push(note);
      },
    },
    mounted() {
      Bus.$on('playing', this.addNote);
    },
  };
</script>

<style lang="scss">
  // @import '@/scss/vars.scss';
  #Keyboard {
    line-height: 2;
    text-align: center;

    button {
      border: 2px outset gray;
      cursor: pointer;

      &:hover {
        background-color: silver;
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
