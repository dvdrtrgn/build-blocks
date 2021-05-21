<template>
  <section id="Keyboard">
    <h1>Keyboard</h1>
    <p>Key of C</p>

    <div id="KeyboardButtons">
      <KeyboardButton v-for="pitch in scale" :pitch="pitch" :key="pitch">
        {{ pitch }}
      </KeyboardButton>
    </div>

    <label>
      Sustain
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
        scale: 'C4 D4 E4 F4 G4 A4 B4 C5'.split(' '),
        seconds: [0, 1, 2, 3, 4],
        notes: [],
      };
    },
    methods: {
      beep() {
        this.synth.start('C2', this.sustain / 2);
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
      margin: 2px;

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
