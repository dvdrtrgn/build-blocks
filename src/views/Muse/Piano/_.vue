<template>
  <section id="Piano">
    <h1>Input</h1>

    <label class="bezel">
      Octave
      <select v-model.number="octave_num">
        <option v-for="num in 5" :key="num">
          {{ num }}
        </option>
      </select>
    </label>

    <div class="pianolist bezel">
      <PianoOctave :octave="octave1" />
      <PianoOctave :octave="octave2" />
      <PianoOctave :octave="octave3" />
    </div>

    <label class="bezel">
      Max Sustain
      <select @change="updateSustain" v-model.number="sustain">
        <option v-for="num in sustains" :key="num" :value="num">
          {{ num }}s
        </option>
      </select>
      <small> (w/1s decay) </small>
    </label>
  </section>
</template>

<script>
  import Store from '@/store';
  import Bus from '@/bus';
  import PianoOctave from './PianoOctave';

  import makeSynth from '@/libs/make-synth.js';
  import Octave from '@/libs/octave-model.js';

  export default {
    components: {
      PianoOctave,
    },
    data() {
      return {
        sustain: Store.getters.getTime, // initial value
        synth: makeSynth(),
        sustains: [0, 1, 2, 3, 4],
        octave_num: 3,
        notes: [],
      };
    },
    methods: {
      beep() {
        this.synth.start('C2', this.sustain / 4);
      },
      storeSustain() {
        Store.commit('setTime', this.sustain);
      },
      updateSustain() {
        this.storeSustain();
        this.beep();
      },
      addNote(note) {
        if (note.duration >= 0.01) this.notes.push(note);
      },
    },
    computed: {
      octave1() {
        return Octave.make(this.octave_num + 0);
      },
      octave2() {
        return Octave.make(this.octave_num + 1);
      },
      octave3() {
        return Octave.make(this.octave_num + 2);
      },
    },
    mounted() {
      Bus.$on('playing', this.addNote);
    },
  };
</script>

<style lang="scss">
  #Piano {
    line-height: 2;
    text-align: center;
  }
</style>
