<template>
  <section id="Piano">
    <h1>Piano</h1>

    <label>
      Octave
      <select v-model.number="octave_num">
        <option v-for="num in octaves" :key="num">
          {{ num }}
        </option>
      </select>
    </label>

    <div class="keylist">
      <PianoKey v-for="pitch in octave" :pitch="pitch" :key="pitch" />
    </div>

    <label>
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
  import PianoKey from './PianoKey';

  import makeSynth from '@/libs/make-synth.js';
  import Octave from '@/libs/octave-model.js';

  export default {
    components: {
      PianoKey,
    },
    data() {
      return {
        sustain: Store.getters.getTime, // initial value
        synth: makeSynth(),
        octaves: Octave.list,
        sustains: [0, 1, 2, 3, 4],
        octave_num: 4,
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
      octave() {
        return Octave.make(this.octave_num);
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
