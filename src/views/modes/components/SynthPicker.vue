<template>
  <label>
    Synth:
    <select v-model="selected">
      <option value="" disabled>Select One</option>
      <option v-for="name in names" :key="name">{{ name }}</option>
    </select>
  </label>
</template>

<script>
  import Synths from '../libs/synths/index.js';
  import Toner from '../libs/tone_wrap.js';

  export default {
    props: ['modelSynth'],
    emits: ['update:modelSynth'],
    methods: {
      play() {
        Toner.playSequence();
        // this.$nextTick(() => {});
      },
    },
    computed: {
      names() {
        return Synths.names;
      },
      selected: {
        get() {
          return this.modelSynth;
        },
        set(val) {
          this.$emit('update:modelSynth', val);
        },
      },
    },
    watch: {
      selected() {
        Toner.setSynth(this.selected);
        this.play();
      },
    },
    created() {
      Toner.setSynth(this.selected);
    },
  };
</script>
