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

    <label class="bezel">
      Max Sustain
      <select @change="updateSustain" v-model.number="sustain">
        <option v-for="num in sustains" :key="num" :value="num">
          {{ num }}s
        </option>
      </select>
      <small> (w/1s decay) </small>
    </label>

    <div class="pianolist bezel" tabindex="0">
      <PianoOctave :octave="octave1" />
      <PianoOctave :octave="octave2" />
      <PianoOctave :octave="octave3" />
    </div>
  </section>
</template>

<script>
  import bus from '../../bus';
  import glob from '../../glob';
  import store from '../../store';
  import octave from '../../libs/octave-model.js';

  glob.exposes({ octave });

  import PianoOctave from './PianoOctave';

  export default {
    components: {
      PianoOctave,
    },
    data() {
      return {
        sustain: store.getters.getTime, // initial value
        sustains: [0, 1, 2, 3, 4],
        octave_num: 3,
      };
    },
    methods: {
      storeSustain() {
        store.commit('setTime', this.sustain);
      },
      updateSustain() {
        this.storeSustain();
        bus.$emit('beep');
      },
    },
    computed: {
      octave1() {
        return octave.make(this.octave_num + 0);
      },
      octave2() {
        return octave.make(this.octave_num + 1);
      },
      octave3() {
        return octave.make(this.octave_num + 2);
      },
    },
  };
</script>

<style lang="scss">
  $root: 1.2rem;

  #Piano {
    line-height: 2;
    text-align: center;

    .pianolist > :nth-child(3) {
      @media (max-width: $root * 30) {
        display: none;
      }
    }
    .pianolist > :nth-child(2) {
      @media (max-width: $root * 20) {
        display: none;
      }
    }
  }
</style>
