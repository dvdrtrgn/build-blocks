<template>
  <section id="Piano">
    <h1>Piano</h1>

    <label>
      Max Sustain
      <select @change="markTime" v-model.number="sustain">
        <option v-for="opt in seconds" :key="opt" :value="opt">
          {{ opt }}s
        </option>
      </select>
      <small> (w/1s decay)</small>
    </label>

    <div class="keylist">
      <PianoKey v-for="pitch in scale" :pitch="pitch" :key="pitch" />
    </div>
  </section>
</template>

<script>
  import Store from '@/store';
  import Bus from '@/bus';
  import PianoKey from './PianoKey';

  import makeSynth from '@/libs/make-synth.js';

  export default {
    components: {
      PianoKey,
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
  #Piano {
    line-height: 2;
    text-align: center;
  }
</style>
